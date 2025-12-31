import type { Detection } from './inference';
import type { DistanceResult } from './distance';
import { v4 as uuidv4 } from 'uuid';

export interface LeviathanEvent {
    event_id: string;
    event_type: 'whale_blow';
    timestamp: string; // ISO
    confidence: number;
    bbox: number[]; // [x, y, w, h] normalized
    resolution: number[]; // [w, h]
    device: string;
    optics: string;
    distance_estimate_m: number[]; // [min, max]
    location: { lat: number | null, lon: number | null };
    notes: string;
    thumbnail?: string;
}

export class Recorder {
    events: LeviathanEvent[] = [];

    capture(det: Detection, dist: DistanceResult, canvas: HTMLCanvasElement): LeviathanEvent {
        // Create a thumbnail
        // We crop the blow + margin
        const thumbCanvas = document.createElement('canvas');
        const margin = 0.5; // 50% margin
        const sw = canvas.width;
        const sh = canvas.height;

        let x = (det.x - det.w / 2) * sw;
        let y = (det.y - det.h / 2) * sh;
        let w = det.w * sw;
        let h = det.h * sh;

        // Add margin
        x -= w * margin;
        y -= h * margin;
        w += w * (margin * 2);
        h += h * (margin * 2);

        thumbCanvas.width = 200;
        thumbCanvas.height = 200 * (h / w);
        const ctx = thumbCanvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(canvas, x, y, w, h, 0, 0, thumbCanvas.width, thumbCanvas.height);
        }

        const event: LeviathanEvent = {
            event_id: uuidv4(),
            event_type: 'whale_blow',
            timestamp: new Date().toISOString(),
            confidence: det.confidence,
            bbox: [det.x, det.y, det.w, det.h],
            resolution: [canvas.width, canvas.height],
            device: 'mobile_web_v0.1',
            optics: 'monocular_unknown',
            distance_estimate_m: [dist.min, dist.max],
            location: { lat: null, lon: null }, // TODO: Add navigator.geolocation
            notes: '',
            thumbnail: thumbCanvas.toDataURL('image/jpeg', 0.7)
        };

        this.events.push(event);
        // Persist to local storage?
        try {
            localStorage.setItem('leviathan_events', JSON.stringify(this.events.slice(-50)));
        } catch (e) {
            // ignore
        }

        console.log("Event Captured:", event);
        return event;
    }

    getRecentEvents(): LeviathanEvent[] {
        return this.events.slice(-10).reverse();
    }
}
