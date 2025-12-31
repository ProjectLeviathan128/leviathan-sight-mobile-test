import type { Detection } from '../core/inference';

export class Renderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // Ghosting history
    private history: { detections: Detection[], timestamp: number }[] = [];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not get canvas context");
        this.ctx = ctx;
    }

    resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    draw(detections: Detection[]) {
        // Clear frame
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Add current to history
        this.history.push({ detections: [...detections], timestamp: Date.now() });
        // Keep last 1 second (approx) or N frames
        const now = Date.now();
        this.history = this.history.filter(h => now - h.timestamp < 1000);

        // Draw Ghosting (older = more transparent)
        // We iterate backwards (newest first) but draw oldest first?
        // Actually drawing oldest first ensures newest is on top.
        this.history.forEach((frame) => {
            const age = now - frame.timestamp;
            const opacity = 1 - (age / 1000); // 1.0 -> 0.0
            if (opacity <= 0) return;

            frame.detections.forEach(det => {
                // If this is the *current* frame (age ~ 0), we draw it differently
                // isCurrent removed
                // Better: if age is very small
                if (age < 50) return; // Skip current frame in ghost loop, draw it later

                this.drawBox(det, opacity * 0.3, false); // Faint ghost
            });
        });

        // Draw Current Detections
        detections.forEach(det => {
            this.drawBox(det, 1.0, true);
        });
    }

    private drawBox(det: Detection, opacity: number, showLabel: boolean) {
        const { x, y, w, h, confidence } = det;
        const sw = this.canvas.width;
        const sh = this.canvas.height;

        const bx = (x - w / 2) * sw;
        const by = (y - h / 2) * sh;
        const bw = w * sw;
        const bh = h * sh;

        // Color based on confidence
        let color = '#ff5252'; // Red < 0.65
        if (confidence >= 0.85) color = '#4caf50'; // Green
        else if (confidence >= 0.65) color = '#ffc107'; // Yellow

        // Stroke
        this.ctx.strokeStyle = color;
        this.ctx.globalAlpha = opacity;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(bx, by, bw, bh);

        // Pulse effect for high confidence (current frame only)
        if (showLabel && confidence > 0.85) {
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 10;
            this.ctx.strokeRect(bx, by, bw, bh);
            this.ctx.shadowBlur = 0;
        }

        // Label
        if (showLabel) {
            this.ctx.fillStyle = color;
            this.ctx.font = '12px Inter, monospace';
            this.ctx.textBaseline = 'bottom';
            const label = `Blow · ${confidence.toFixed(2)}`;
            const textWidth = this.ctx.measureText(label).width;

            this.ctx.fillRect(bx, by - 16, textWidth + 8, 16);
            this.ctx.fillStyle = '#000';
            this.ctx.fillText(label, bx + 4, by - 2);
        }

        this.ctx.globalAlpha = 1.0;
    }
}
