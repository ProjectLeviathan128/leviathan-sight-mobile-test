/**
 * Leviathan Systems - Pipeline Status Registry
 * 
 * Central status tracking for all subsystems.
 * EVERY subsystem reports here. NOTHING fails silently.
 */

// ============================================================================
// Types
// ============================================================================

export type SubsystemState =
    | 'initializing'  // Starting up
    | 'active'        // Fully operational
    | 'degraded'      // Working but with limitations
    | 'failed'        // Not working, reason provided
    | 'unavailable';  // Not available on this device/browser

export interface SubsystemStatus {
    state: SubsystemState;
    reason: string;
    lastUpdate: number;
    confidence?: number;  // 0-1 for applicable subsystems
    extra?: string;       // Additional context
}

export interface PipelineStatus {
    camera: SubsystemStatus;
    sensors: SubsystemStatus;
    inference: SubsystemStatus;
    horizon: SubsystemStatus;
    ekf: SubsystemStatus;
    heading: SubsystemStatus;
    localization: SubsystemStatus;
}

// ============================================================================
// Status Icons (for UI)
// ============================================================================

export const STATE_ICONS: Record<SubsystemState, string> = {
    initializing: '⏳',
    active: '●',
    degraded: '⚠',
    failed: '✖',
    unavailable: '○',
};

export const STATE_COLORS: Record<SubsystemState, string> = {
    initializing: '#64b5f6',  // Blue
    active: '#4caf50',        // Green
    degraded: '#ffc107',      // Yellow
    failed: '#f44336',        // Red
    unavailable: '#9e9e9e',   // Gray
};

// ============================================================================
// Singleton Pipeline Status
// ============================================================================

function createInitialStatus(reason: string): SubsystemStatus {
    return {
        state: 'initializing',
        reason,
        lastUpdate: Date.now(),
    };
}

export const pipelineStatus: PipelineStatus = {
    camera: createInitialStatus('Waiting for camera access'),
    sensors: createInitialStatus('Waiting for sensor permission'),
    inference: createInitialStatus('Loading model'),
    horizon: createInitialStatus('Waiting for video'),
    ekf: createInitialStatus('Waiting for IMU data'),
    heading: createInitialStatus('Waiting for location'),
    localization: createInitialStatus('Waiting for heading'),
};

// ============================================================================
// Status Update API
// ============================================================================

type SubsystemKey = keyof PipelineStatus;

/**
 * Update a subsystem's status
 * Always logs to console for debugging
 */
export function updateStatus(
    subsystem: SubsystemKey,
    state: SubsystemState,
    reason: string,
    confidence?: number,
    extra?: string
): void {
    const prev = pipelineStatus[subsystem];

    pipelineStatus[subsystem] = {
        state,
        reason,
        lastUpdate: Date.now(),
        confidence,
        extra,
    };

    // Always log state changes
    if (prev.state !== state || prev.reason !== reason) {
        const icon = STATE_ICONS[state];
        console.log(`[Pipeline] ${subsystem}: ${icon} ${state.toUpperCase()} - ${reason}`);
    }

    // Notify listeners
    notifyListeners(subsystem);
}

/**
 * Mark a subsystem as active
 */
export function setActive(subsystem: SubsystemKey, reason: string, confidence?: number): void {
    updateStatus(subsystem, 'active', reason, confidence);
}

/**
 * Mark a subsystem as degraded (working with limitations)
 */
export function setDegraded(subsystem: SubsystemKey, reason: string, confidence?: number): void {
    updateStatus(subsystem, 'degraded', reason, confidence);
}

/**
 * Mark a subsystem as failed
 */
export function setFailed(subsystem: SubsystemKey, reason: string): void {
    updateStatus(subsystem, 'failed', reason);
}

/**
 * Mark a subsystem as unavailable
 */
export function setUnavailable(subsystem: SubsystemKey, reason: string): void {
    updateStatus(subsystem, 'unavailable', reason);
}

// ============================================================================
// Status Listeners (for UI updates)
// ============================================================================

type StatusListener = (subsystem: SubsystemKey, status: SubsystemStatus) => void;
const listeners: StatusListener[] = [];

export function addStatusListener(listener: StatusListener): () => void {
    listeners.push(listener);
    return () => {
        const idx = listeners.indexOf(listener);
        if (idx >= 0) listeners.splice(idx, 1);
    };
}

function notifyListeners(subsystem: SubsystemKey): void {
    const status = pipelineStatus[subsystem];
    for (const listener of listeners) {
        try {
            listener(subsystem, status);
        } catch (e) {
            console.error('[Pipeline] Listener error:', e);
        }
    }
}

// ============================================================================
// Status Queries
// ============================================================================

/**
 * Get overall pipeline health
 */
export function getPipelineHealth(): 'healthy' | 'degraded' | 'critical' {
    const statuses = Object.values(pipelineStatus);

    const failed = statuses.filter(s => s.state === 'failed').length;
    const degraded = statuses.filter(s => s.state === 'degraded').length;

    if (failed >= 2) return 'critical';
    if (failed >= 1 || degraded >= 3) return 'degraded';
    return 'healthy';
}

export function getStatusSummary(): string {
    const lines: string[] = [];

    const keys = Object.keys(pipelineStatus) as (keyof PipelineStatus)[];
    for (const key of keys) {
        const status = pipelineStatus[key];
        const icon = STATE_ICONS[status.state];
        const conf = status.confidence !== undefined ? ` (${(status.confidence * 100).toFixed(0)}%)` : '';
        lines.push(`${icon} ${key}: ${status.reason}${conf}`);
    }

    return lines.join('\n');
}

/**
 * Check if a subsystem is operational (active or degraded)
 */
export function isOperational(subsystem: SubsystemKey): boolean {
    const state = pipelineStatus[subsystem].state;
    return state === 'active' || state === 'degraded';
}

/**
 * Get all failed subsystems
 */
export function getFailedSystems(): SubsystemKey[] {
    return (Object.keys(pipelineStatus) as SubsystemKey[])
        .filter(k => pipelineStatus[k].state === 'failed');
}

// Export for debugging
if (typeof window !== 'undefined') {
    (window as any).pipelineStatus = pipelineStatus;
    (window as any).getStatusSummary = getStatusSummary;
}
