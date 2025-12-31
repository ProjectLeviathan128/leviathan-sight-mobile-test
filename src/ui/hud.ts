/**
 * Leviathan Systems - Heads-Up Display (HUD)
 * Artificial horizon, compass, and ranging overlays
 */

import type { HorizonLine, Orientation, HeadingEstimate, AttitudeState } from '../core/types';
import { RAD_TO_DEG } from '../core/types';

// ============================================================================
// Configuration
// ============================================================================

interface HUDConfig {
    /** Show artificial horizon line */
    showHorizon: boolean;
    /** Show pitch ladder */
    showPitchLadder: boolean;
    /** Show compass rose */
    showCompass: boolean;
    /** Show debug info */
    showDebug: boolean;
    /** Horizon line color */
    horizonColor: string;
    /** Pitch ladder color */
    pitchLadderColor: string;
    /** Text color */
    textColor: string;
    /** Line width */
    lineWidth: number;
    /** Font size */
    fontSize: number;
}

const DEFAULT_CONFIG: HUDConfig = {
    showHorizon: true,
    showPitchLadder: true,
    showCompass: true,
    showDebug: false,
    horizonColor: '#00ff88',
    pitchLadderColor: 'rgba(0, 255, 136, 0.5)',
    textColor: '#ffffff',
    lineWidth: 2,
    fontSize: 14,
};

// ============================================================================
// HUD Renderer Class
// ============================================================================

export class HUDRenderer {
    private config: HUDConfig;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number = 0;
    private height: number = 0;

    constructor(canvas: HTMLCanvasElement, config: Partial<HUDConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    /**
     * Resize canvas to match container
     */
    resize(width: number, height: number): void {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Render the complete HUD
     */
    render(
        orientation: Orientation | null,
        heading: HeadingEstimate | null,
        horizon: HorizonLine | null,
        state?: AttitudeState
    ): void {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Draw horizon line (from visual detection)
        if (this.config.showHorizon && horizon) {
            this.drawHorizonLine(horizon);
        }

        // Draw artificial horizon (from fused orientation)
        if (this.config.showPitchLadder && orientation) {
            this.drawArtificialHorizon(orientation);
        }

        // Draw compass
        if (this.config.showCompass && heading) {
            this.drawCompass(heading);
        }

        // Draw debug info
        if (this.config.showDebug && state) {
            this.drawDebugInfo(state, heading);
        }
    }

    /**
     * Draw the detected horizon line
     */
    private drawHorizonLine(horizon: HorizonLine): void {
        const { roll, pitch, confidence } = horizon;
        const cx = this.width / 2;
        const cy = this.height / 2;

        // Calculate line endpoints
        // The horizon line extends across the screen, offset by pitch and rotated by roll
        const lineLength = Math.max(this.width, this.height) * 1.5;

        // Pitch offset (pixels per degree, roughly)
        const pixelsPerDegree = this.height / 60; // Assume ~60° VFOV
        const yOffset = pitch * RAD_TO_DEG * pixelsPerDegree;

        // Rotate line endpoints
        const cos_r = Math.cos(-roll);
        const sin_r = Math.sin(-roll);

        const x1 = cx - lineLength * cos_r;
        const y1 = cy + yOffset - lineLength * sin_r;
        const x2 = cx + lineLength * cos_r;
        const y2 = cy + yOffset + lineLength * sin_r;

        // Draw line
        this.ctx.strokeStyle = this.config.horizonColor;
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.globalAlpha = 0.3 + 0.7 * confidence;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();

        this.ctx.globalAlpha = 1;

        // Draw confidence indicator
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = `${this.config.fontSize}px monospace`;
        this.ctx.fillText(
            `HOR ${(confidence * 100).toFixed(0)}%`,
            10,
            this.height - 60
        );
    }

    /**
     * Draw artificial horizon with pitch ladder
     */
    private drawArtificialHorizon(orientation: Orientation): void {
        const { roll, pitch } = orientation;
        const cx = this.width / 2;
        const cy = this.height / 2;

        // Save context for rotation
        this.ctx.save();
        this.ctx.translate(cx, cy);
        this.ctx.rotate(-roll);

        // Pitch offset
        const pixelsPerDegree = this.height / 60;
        const pitchDeg = pitch * RAD_TO_DEG;

        // Draw pitch ladder
        this.ctx.strokeStyle = this.config.pitchLadderColor;
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = `${this.config.fontSize - 2}px monospace`;
        this.ctx.textAlign = 'right';

        for (let deg = -30; deg <= 30; deg += 10) {
            if (deg === 0) continue;

            const y = (deg - pitchDeg) * pixelsPerDegree;
            const ladderWidth = Math.abs(deg) >= 20 ? 50 : 80;

            this.ctx.beginPath();
            this.ctx.moveTo(-ladderWidth, y);
            this.ctx.lineTo(-20, y);
            this.ctx.moveTo(20, y);
            this.ctx.lineTo(ladderWidth, y);
            this.ctx.stroke();

            // Labels
            this.ctx.fillText(`${deg}`, -ladderWidth - 5, y + 4);
        }

        // Draw center horizon line
        this.ctx.strokeStyle = this.config.horizonColor;
        this.ctx.lineWidth = this.config.lineWidth + 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-this.width / 3, -pitchDeg * pixelsPerDegree);
        this.ctx.lineTo(this.width / 3, -pitchDeg * pixelsPerDegree);
        this.ctx.stroke();

        // Draw center reference
        this.ctx.strokeStyle = this.config.textColor;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-30, 0);
        this.ctx.lineTo(-10, 0);
        this.ctx.lineTo(-10, 10);
        this.ctx.moveTo(30, 0);
        this.ctx.lineTo(10, 0);
        this.ctx.lineTo(10, 10);
        this.ctx.stroke();

        this.ctx.restore();

        // Draw roll indicator arc at top
        this.drawRollIndicator(roll);

        // Display values
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = `${this.config.fontSize}px monospace`;
        this.ctx.textAlign = 'left';
        this.ctx.fillText(
            `ROLL ${(roll * RAD_TO_DEG).toFixed(1)}°`,
            10,
            this.height - 40
        );
        this.ctx.fillText(
            `PITCH ${(pitch * RAD_TO_DEG).toFixed(1)}°`,
            10,
            this.height - 20
        );
    }

    /**
     * Draw roll indicator arc
     */
    private drawRollIndicator(roll: number): void {
        const cx = this.width / 2;
        const radius = 80;
        const top = 50;

        this.ctx.save();
        this.ctx.translate(cx, top);

        // Draw arc background
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, Math.PI * 0.7, Math.PI * 0.3, true);
        this.ctx.stroke();

        // Draw tick marks
        this.ctx.strokeStyle = this.config.textColor;
        for (let deg = -60; deg <= 60; deg += 10) {
            const angle = ((deg + 90) * Math.PI) / 180;
            const innerR = deg % 30 === 0 ? radius - 15 : radius - 10;
            this.ctx.beginPath();
            this.ctx.moveTo(Math.cos(angle) * innerR, -Math.sin(angle) * innerR);
            this.ctx.lineTo(Math.cos(angle) * radius, -Math.sin(angle) * radius);
            this.ctx.stroke();
        }

        // Draw current roll pointer
        const rollAngle = ((roll * RAD_TO_DEG - 90) * Math.PI) / 180;
        this.ctx.fillStyle = this.config.horizonColor;
        this.ctx.beginPath();
        this.ctx.moveTo(Math.cos(rollAngle) * (radius + 5), -Math.sin(rollAngle) * (radius + 5));
        this.ctx.lineTo(
            Math.cos(rollAngle - 0.1) * (radius + 15),
            -Math.sin(rollAngle - 0.1) * (radius + 15)
        );
        this.ctx.lineTo(
            Math.cos(rollAngle + 0.1) * (radius + 15),
            -Math.sin(rollAngle + 0.1) * (radius + 15)
        );
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
    }

    /**
     * Draw compass rose
     */
    private drawCompass(heading: HeadingEstimate): void {
        const cx = this.width / 2;
        const top = 30;

        // Draw heading value
        this.ctx.fillStyle = this.config.textColor;
        this.ctx.font = `bold ${this.config.fontSize + 4}px monospace`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            `${heading.heading.toFixed(0)}°`,
            cx,
            top
        );

        // Draw compass tape
        const tapeWidth = this.width * 0.6;
        const tapeLeft = cx - tapeWidth / 2;
        const tapeY = top + 20;

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        this.ctx.moveTo(tapeLeft, tapeY);
        this.ctx.lineTo(tapeLeft + tapeWidth, tapeY);
        this.ctx.stroke();

        // Draw compass ticks
        this.ctx.font = `${this.config.fontSize - 2}px monospace`;
        const degreesVisible = 60; // Show ±30° around heading
        const pixelsPerDegree = tapeWidth / degreesVisible;

        for (let deg = -180; deg <= 180; deg += 10) {
            let displayDeg = heading.heading + deg;
            displayDeg = ((displayDeg % 360) + 360) % 360;

            if (Math.abs(deg) > 30) continue;

            const x = cx + deg * pixelsPerDegree;

            // Tick mark
            const tickHeight = deg % 30 === 0 ? 10 : 5;
            this.ctx.beginPath();
            this.ctx.moveTo(x, tapeY);
            this.ctx.lineTo(x, tapeY + tickHeight);
            this.ctx.stroke();

            // Label for major ticks
            if (deg % 30 === 0) {
                const label = this.getCardinalLabel(displayDeg);
                this.ctx.fillText(label, x, tapeY + 22);
            }
        }

        // Draw center indicator
        this.ctx.fillStyle = this.config.horizonColor;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, tapeY - 5);
        this.ctx.lineTo(cx - 5, tapeY - 12);
        this.ctx.lineTo(cx + 5, tapeY - 12);
        this.ctx.closePath();
        this.ctx.fill();

        // Source and confidence
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.font = `${this.config.fontSize - 4}px monospace`;
        this.ctx.fillText(
            `${heading.source.toUpperCase()} ±${heading.uncertainty.toFixed(0)}°`,
            cx,
            tapeY + 38
        );
    }

    /**
     * Get cardinal direction label
     */
    private getCardinalLabel(degrees: number): string {
        degrees = Math.round(degrees);
        if (degrees === 0 || degrees === 360) return 'N';
        if (degrees === 90) return 'E';
        if (degrees === 180) return 'S';
        if (degrees === 270) return 'W';
        return `${degrees}`;
    }

    /**
     * Draw debug information
     */
    private drawDebugInfo(state: AttitudeState, heading: HeadingEstimate | null): void {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(this.width - 180, 10, 170, 100);

        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '12px monospace';
        this.ctx.textAlign = 'left';

        const lines = [
            `σ_roll: ${(state.rollStd * RAD_TO_DEG).toFixed(2)}°`,
            `σ_pitch: ${(state.pitchStd * RAD_TO_DEG).toFixed(2)}°`,
            `σ_yaw: ${(state.yawStd * RAD_TO_DEG).toFixed(2)}°`,
            heading ? `HDG src: ${heading.source}` : 'HDG: N/A',
            `t: ${state.timestamp}`,
        ];

        lines.forEach((line, i) => {
            this.ctx.fillText(line, this.width - 170, 28 + i * 16);
        });
    }

    /**
     * Toggle configuration option
     */
    setOption<K extends keyof HUDConfig>(key: K, value: HUDConfig[K]): void {
        this.config[key] = value;
    }
}
