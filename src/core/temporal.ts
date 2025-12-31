import type { Detection } from './inference';
import { v4 as uuidv4 } from 'uuid';

interface Track {
    id: string;
    hits: number;
    misses: number;
    lastDet: Detection;
    history: Detection[];
}

export class TemporalFilter {
    private tracks: Track[] = [];
    private maxMisses = 5;
    private minHits = 2; // Require 2 consecutive frames to show? 
    // Actually, distinct blows might be short.

    update(detections: Detection[]): Detection[] {
        const matches: { trackIdx: number, detIdx: number }[] = [];
        const unmatchedTracks = new Set(this.tracks.map((_, i) => i));
        const unmatchedDets = new Set(detections.map((_, i) => i));

        // Greedy matching by IoU
        detections.forEach((det, detIdx) => {
            let bestIoU = 0;
            let bestTrackIdx = -1;

            this.tracks.forEach((track, trackIdx) => {
                if (!unmatchedTracks.has(trackIdx)) return;
                const iou = this.getIoU(det, track.lastDet);
                if (iou > 0.3 && iou > bestIoU) { // 0.3 threshold
                    bestIoU = iou;
                    bestTrackIdx = trackIdx;
                }
            });

            if (bestTrackIdx !== -1) {
                matches.push({ trackIdx: bestTrackIdx, detIdx });
                unmatchedTracks.delete(bestTrackIdx);
                unmatchedDets.delete(detIdx);
            }
        });

        // Update matches
        matches.forEach(({ trackIdx, detIdx }) => {
            const track = this.tracks[trackIdx];
            track.hits++;
            track.misses = 0;
            track.lastDet = detections[detIdx];
            track.history.push(detections[detIdx]);
            if (track.history.length > 10) track.history.shift();
        });

        // New Tracks
        unmatchedDets.forEach(detIdx => {
            this.tracks.push({
                id: uuidv4(),
                hits: 1,
                misses: 0,
                lastDet: detections[detIdx],
                history: [detections[detIdx]]
            });
        });

        // Update Misses and Prune
        for (let i = this.tracks.length - 1; i >= 0; i--) {
            if (unmatchedTracks.has(i)) {
                this.tracks[i].misses++;
                if (this.tracks[i].misses > this.maxMisses) {
                    this.tracks.splice(i, 1);
                }
            }
        }

        // Return detections from valid tracks
        // A track is valid if hits >= minHits OR high initial confidence
        const activeDetections: Detection[] = [];
        this.tracks.forEach(track => {
            // "Rapid appearance" -> High confidence ( > 0.8) passes immediately
            if (track.hits >= this.minHits || track.lastDet.confidence > 0.8) {
                activeDetections.push(track.lastDet);
            }
        });

        return activeDetections;
    }

    private getIoU(d1: Detection, d2: Detection): number {
        const x1 = Math.max(d1.x - d1.w / 2, d2.x - d2.w / 2);
        const y1 = Math.max(d1.y - d1.h / 2, d2.y - d2.h / 2);
        const x2 = Math.min(d1.x + d1.w / 2, d2.x + d2.w / 2);
        const y2 = Math.min(d1.y + d1.h / 2, d2.y + d2.h / 2);

        if (x2 < x1 || y2 < y1) return 0;
        const intersection = (x2 - x1) * (y2 - y1);
        const area1 = d1.w * d1.h;
        const area2 = d2.w * d2.h;
        return intersection / (area1 + area2 - intersection);
    }
}
