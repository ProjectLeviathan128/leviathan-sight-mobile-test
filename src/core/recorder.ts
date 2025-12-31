import type { Detection } from './inference';
import type { DistanceResult } from './distance';
import type { BlowLocation } from './localization';
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
    zoom: number;
    distance_estimate_m: number[]; // [min, max]
    distance_best_m: number | null;
    location: {
        observer: { lat: number | null; lon: number | null };
        blow: { lat: number | null; lon: number | null };
    };
    bearing_deg: number | null;
    relative_bearing_deg: number | null;
    uncertainty: {
        distance_percent: number | null;
        bearing_deg: number | null;
        position_m: number | null;
    };
    notes: string;
    thumbnail?: string;
}

export class Recorder {
    events: LeviathanEvent[] = [];

    /**
     * Capture a blow event with full localization data
     */
    captureWithLocation(
        det: Detection,
        dist: DistanceResult,
        location: BlowLocation | null,
        canvas: HTMLCanvasElement,
        zoom: number = 1.0
    ): LeviathanEvent {
        // Create a thumbnail
        const thumbCanvas = document.createElement('canvas');
        const margin = 0.5;
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
            event_id: location?.eventId ?? uuidv4(),
            event_type: 'whale_blow',
            timestamp: new Date().toISOString(),
            confidence: det.confidence,
            bbox: [det.x, det.y, det.w, det.h],
            resolution: [canvas.width, canvas.height],
            device: 'leviathan_mobile_v1.0',
            optics: zoom > 1 ? `digital_${zoom}x` : 'native',
            zoom: zoom,
            distance_estimate_m: [dist.min, dist.max],
            distance_best_m: location?.distance ?? null,
            location: {
                observer: {
                    lat: location ? this.getStoredObserverLat() : null,
                    lon: location ? this.getStoredObserverLon() : null,
                },
                blow: {
                    lat: location?.position.latitude ?? null,
                    lon: location?.position.longitude ?? null,
                },
            },
            bearing_deg: location?.bearing ?? null,
            relative_bearing_deg: location?.relativeBearing ?? null,
            uncertainty: {
                distance_percent: location?.uncertainty.distancePercent ?? null,
                bearing_deg: location?.uncertainty.bearingDegrees ?? null,
                position_m: location?.uncertainty.positionMeters ?? null,
            },
            notes: location ? `Localized at ${location.bearing.toFixed(0)}° bearing, ${location.distance}m distance` : 'Localization unavailable',
            thumbnail: thumbCanvas.toDataURL('image/jpeg', 0.7)
        };

        this.events.push(event);
        this.persist();

        console.log('[Leviathan] Blow Event Captured:', event);
        return event;
    }

    /**
     * Legacy capture method (backwards compatible)
     */
    capture(det: Detection, dist: DistanceResult, canvas: HTMLCanvasElement): LeviathanEvent {
        return this.captureWithLocation(det, dist, null, canvas, 1.0);
    }

    /**
     * Get formatted location string for HUD
     */
    static formatEventLocation(event: LeviathanEvent): string {
        if (!event.location.blow.lat || !event.location.blow.lon) {
            return 'Location pending...';
        }
        const lat = event.location.blow.lat.toFixed(5);
        const lon = event.location.blow.lon.toFixed(5);
        const dist = event.distance_best_m
            ? event.distance_best_m < 1000
                ? `${event.distance_best_m}m`
                : `${(event.distance_best_m / 1000).toFixed(1)}km`
            : '?';
        return `${lat}°, ${lon}° @ ${dist}`;
    }

    /**
     * Get recent events
     */
    getRecentEvents(): LeviathanEvent[] {
        return this.events.slice(-10).reverse();
    }

    /**
     * Export all events as JSON
     */
    exportJSON(): string {
        return JSON.stringify(this.events, null, 2);
    }

    /**
     * Export as CSV for analysis
     */
    exportCSV(): string {
        const headers = [
            'event_id', 'timestamp', 'confidence',
            'observer_lat', 'observer_lon',
            'blow_lat', 'blow_lon',
            'bearing_deg', 'distance_m',
            'zoom', 'uncertainty_m'
        ].join(',');

        const rows = this.events.map(e => [
            e.event_id,
            e.timestamp,
            e.confidence.toFixed(3),
            e.location.observer.lat?.toFixed(6) ?? '',
            e.location.observer.lon?.toFixed(6) ?? '',
            e.location.blow.lat?.toFixed(6) ?? '',
            e.location.blow.lon?.toFixed(6) ?? '',
            e.bearing_deg?.toFixed(1) ?? '',
            e.distance_best_m ?? '',
            e.zoom,
            e.uncertainty.position_m ?? ''
        ].join(','));

        return [headers, ...rows].join('\n');
    }

    /**
     * Store observer position for later reference
     */
    private observerLat: number | null = null;
    private observerLon: number | null = null;

    setObserverPosition(lat: number, lon: number): void {
        this.observerLat = lat;
        this.observerLon = lon;
    }

    private getStoredObserverLat(): number | null {
        return this.observerLat;
    }

    private getStoredObserverLon(): number | null {
        return this.observerLon;
    }

    private persist(): void {
        try {
            localStorage.setItem('leviathan_events', JSON.stringify(this.events.slice(-100)));
        } catch (e) {
            // Storage quota exceeded, ignore
        }
    }

    /**
     * Load events from localStorage
     */
    loadFromStorage(): void {
        try {
            const stored = localStorage.getItem('leviathan_events');
            if (stored) {
                this.events = JSON.parse(stored);
            }
        } catch (e) {
            // ignore
        }
    }
}
