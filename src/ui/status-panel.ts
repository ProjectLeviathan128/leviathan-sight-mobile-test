/**
 * Leviathan Systems - Status Panel
 * 
 * Real-time pipeline observability overlay.
 * Shows status of all 7 subsystems with live updates.
 * 
 * REQUIREMENT: A user must be able to answer "What is the system doing right now?"
 */

import {
    pipelineStatus,
    addStatusListener,
    STATE_ICONS,
    STATE_COLORS,
    getPipelineHealth,
    type SubsystemStatus,
    type SubsystemState
} from '../core/pipeline-status';

// ============================================================================
// Configuration
// ============================================================================

interface StatusPanelConfig {
    /** Show detailed reasons (vs compact mode) */
    detailed: boolean;
    /** Auto-collapse after N seconds of healthy state */
    autoCollapseDelay: number;
    /** Position on screen */
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const DEFAULT_CONFIG: StatusPanelConfig = {
    detailed: true,
    autoCollapseDelay: 10,
    position: 'top-left',
};

// ============================================================================
// Subsystem Labels and Icons
// ============================================================================

const SUBSYSTEM_INFO: Record<string, { label: string; icon: string }> = {
    camera: { label: 'Camera', icon: '📷' },
    sensors: { label: 'Sensors', icon: '📡' },
    inference: { label: 'Inference', icon: '🧠' },
    horizon: { label: 'Horizon', icon: '📐' },
    ekf: { label: 'EKF', icon: '🧭' },
    heading: { label: 'Heading', icon: '🔄' },
    localization: { label: 'Localize', icon: '📍' },
};

// ============================================================================
// Status Panel Class
// ============================================================================

export class StatusPanel {
    private container: HTMLElement;
    private config: StatusPanelConfig;
    private isCollapsed: boolean = false;
    private lastHealthyTime: number = 0;
    private unsubscribe: (() => void) | null = null;

    constructor(containerId: string = 'pipeline-status-panel', config: Partial<StatusPanelConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };

        // Get or create container
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            document.body.appendChild(container);
        }
        this.container = container;

        // Apply styles
        this.applyStyles();

        // Initial render
        this.render();

        // Subscribe to updates
        this.unsubscribe = addStatusListener(() => this.render());

        // Check for auto-collapse
        setInterval(() => this.checkAutoCollapse(), 1000);
    }

    private applyStyles(): void {
        const pos = this.config.position;
        const isTop = pos.includes('top');
        const isLeft = pos.includes('left');

        this.container.style.cssText = `
      position: fixed;
      ${isTop ? 'top: 60px' : 'bottom: 80px'};
      ${isLeft ? 'left: 10px' : 'right: 10px'};
      z-index: 9999;
      background: rgba(0, 0, 0, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      padding: 8px 12px;
      font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
      font-size: 11px;
      color: #fff;
      min-width: 200px;
      max-width: 280px;
      user-select: none;
      -webkit-user-select: none;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: opacity 0.3s, transform 0.3s;
    `;
    }

    private render(): void {
        const health = getPipelineHealth();
        const healthColor = health === 'healthy' ? '#4caf50' : health === 'degraded' ? '#ffc107' : '#f44336';

        let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
        <span style="font-weight: bold; color: ${healthColor};">PIPELINE ${health.toUpperCase()}</span>
        <span style="cursor: pointer; opacity: 0.7;" onclick="this.parentElement.parentElement.style.display='none'">✕</span>
      </div>
    `;

        for (const [key, info] of Object.entries(SUBSYSTEM_INFO)) {
            const status = pipelineStatus[key as keyof typeof pipelineStatus];
            html += this.renderSubsystem(key, info, status);
        }

        // Add simulation mode indicator if active
        if ((window as any).__LEVIATHAN_SIM_MODE__) {
            html += `
        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); color: #64b5f6;">
          🎮 SIMULATION MODE ACTIVE
        </div>
      `;
        }

        this.container.innerHTML = html;

        // Track healthy time
        if (health === 'healthy') {
            if (this.lastHealthyTime === 0) this.lastHealthyTime = Date.now();
        } else {
            this.lastHealthyTime = 0;
            this.isCollapsed = false;
        }
    }

    private renderSubsystem(key: string, info: { label: string; icon: string }, status: SubsystemStatus): string {
        const stateIcon = STATE_ICONS[status.state];
        const stateColor = STATE_COLORS[status.state];

        const confStr = status.confidence !== undefined
            ? ` <span style="opacity: 0.7">${(status.confidence * 100).toFixed(0)}%</span>`
            : '';

        if (this.config.detailed) {
            return `
        <div style="display: flex; align-items: flex-start; margin: 4px 0; gap: 6px;">
          <span style="width: 18px; text-align: center;">${info.icon}</span>
          <span style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            <span style="color: ${stateColor};">${stateIcon}</span>
            ${info.label}${confStr}
          </span>
        </div>
        <div style="margin-left: 24px; color: rgba(255,255,255,0.6); font-size: 10px; margin-bottom: 4px;">
          ${status.reason}
        </div>
      `;
        }

        return `
      <div style="display: flex; align-items: center; margin: 3px 0; gap: 6px;">
        <span style="width: 16px; text-align: center;">${info.icon}</span>
        <span style="color: ${stateColor}; width: 12px;">${stateIcon}</span>
        <span style="flex: 1; opacity: 0.9;">${info.label}${confStr}</span>
      </div>
    `;
    }

    private checkAutoCollapse(): void {
        if (this.config.autoCollapseDelay <= 0) return;

        const health = getPipelineHealth();
        if (health === 'healthy' && this.lastHealthyTime > 0) {
            const elapsed = (Date.now() - this.lastHealthyTime) / 1000;
            if (elapsed > this.config.autoCollapseDelay && !this.isCollapsed) {
                this.collapse();
            }
        }
    }

    collapse(): void {
        this.isCollapsed = true;
        this.container.style.opacity = '0.3';
        this.container.style.transform = 'scale(0.9)';

        // Expand on hover
        this.container.onmouseenter = () => {
            this.container.style.opacity = '1';
            this.container.style.transform = 'scale(1)';
        };
        this.container.onmouseleave = () => {
            if (this.isCollapsed) {
                this.container.style.opacity = '0.3';
                this.container.style.transform = 'scale(0.9)';
            }
        };
    }

    expand(): void {
        this.isCollapsed = false;
        this.container.style.opacity = '1';
        this.container.style.transform = 'scale(1)';
    }

    setPosition(position: StatusPanelConfig['position']): void {
        this.config.position = position;
        this.applyStyles();
    }

    setDetailed(detailed: boolean): void {
        this.config.detailed = detailed;
        this.render();
    }

    dispose(): void {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.container.innerHTML = '';
    }
}

// ============================================================================
// Singleton instance
// ============================================================================

let statusPanelInstance: StatusPanel | null = null;

export function initStatusPanel(config?: Partial<StatusPanelConfig>): StatusPanel {
    if (!statusPanelInstance) {
        statusPanelInstance = new StatusPanel('pipeline-status-panel', config);
    }
    return statusPanelInstance;
}

export function getStatusPanel(): StatusPanel | null {
    return statusPanelInstance;
}
