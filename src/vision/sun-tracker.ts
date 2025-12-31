/**
 * Leviathan Systems - Sun Tracker
 * Visual detection of sun position in camera frame
 * 
 * Reference: Section 4.3 of Leviathan Systems spec
 */

import type { IntrinsicMatrix, Vector2 } from '../core/types';
import { createCanvas2D, type Canvas2DContext } from '../core/canvas2d';

// ============================================================================
// Configuration
// ============================================================================

interface SunTrackerConfig {
    /** Brightness threshold for sun detection (0-255) */
    brightnessThreshold: number;
    /** Minimum blob size to consider as sun (pixels) */
    minBlobSize: number;
    /** Maximum blob size to consider as sun (pixels) */
    maxBlobSize: number;
    /** Saturation threshold (low saturation = sun glare) */
    saturationThreshold: number;
}

const DEFAULT_CONFIG: SunTrackerConfig = {
    brightnessThreshold: 250,
    minBlobSize: 20,
    maxBlobSize: 5000,
    saturationThreshold: 50,
};

// ============================================================================
// Sun Detection Result
// ============================================================================

export interface SunDetection {
    /** Centroid X in pixels */
    u: number;
    /** Centroid Y in pixels */
    v: number;
    /** Blob area in pixels */
    area: number;
    /** Detection confidence [0, 1] */
    confidence: number;
    /** Relative bearing from camera center (radians) */
    relativeBearing: number;
    /** Relative elevation from camera center (radians) */
    relativeElevation: number;
}

// ============================================================================
// Sun Tracker Class
// ============================================================================

export class SunTracker {
    private config: SunTrackerConfig;
    private tempCanvasCtx: Canvas2DContext;

    constructor(config: Partial<SunTrackerConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        // Use safe canvas factory for iOS compatibility
        this.tempCanvasCtx = createCanvas2D(320, 240, { willReadFrequently: true });
    }

    /**
     * Detect the sun in an image
     * 
     * @param source - Image source (video element, canvas, or ImageData)
     * @param intrinsics - Camera intrinsic matrix
     * @returns Sun detection result or null if not found
     */
    detect(
        source: HTMLVideoElement | HTMLCanvasElement | ImageData,
        intrinsics: IntrinsicMatrix
    ): SunDetection | null {
        // Get image data at reduced resolution for speed
        const imageData = this.getImageData(source);
        if (!imageData) return null;

        // Find bright pixels
        const brightPixels = this.findBrightPixels(imageData);
        if (brightPixels.length === 0) return null;

        // Compute centroid
        const centroid = this.computeCentroid(brightPixels);
        if (!centroid) return null;

        // Scale back to original resolution
        const scaleX = (source instanceof ImageData ? source.width :
            source instanceof HTMLVideoElement ? source.videoWidth : source.width) / imageData.width;
        const scaleY = (source instanceof ImageData ? source.height :
            source instanceof HTMLVideoElement ? source.videoHeight : source.height) / imageData.height;

        const u = centroid.x * scaleX;
        const v = centroid.y * scaleY;

        // Calculate relative bearing and elevation
        const { relativeBearing, relativeElevation } = this.getRelativeAngles(u, v, intrinsics);

        // Compute confidence based on blob size and saturation
        const confidence = this.computeConfidence(brightPixels.length, imageData.width * imageData.height);

        return {
            u,
            v,
            area: brightPixels.length * scaleX * scaleY,
            confidence,
            relativeBearing,
            relativeElevation,
        };
    }

    /**
     * Get relative bearing (horizontal angle from camera center)
     * Positive = sun is to the right
     */
    getRelativeBearing(sunPixel: Vector2, intrinsics: IntrinsicMatrix): number {
        const dx = sunPixel.x - intrinsics.cx;
        return Math.atan2(dx, intrinsics.fx);
    }

    /**
     * Get relative elevation (vertical angle from camera center)
     * Positive = sun is above center
     */
    getRelativeElevation(sunPixel: Vector2, intrinsics: IntrinsicMatrix): number {
        const dy = intrinsics.cy - sunPixel.y; // Flip Y (image Y is down)
        return Math.atan2(dy, intrinsics.fy);
    }

    // ========================================================================
    // Helper Methods
    // ========================================================================

    private getImageData(source: HTMLVideoElement | HTMLCanvasElement | ImageData): ImageData | null {
        if (source instanceof ImageData) {
            return source;
        }

        const width = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
        const height = source instanceof HTMLVideoElement ? source.videoHeight : source.height;

        if (width === 0 || height === 0) return null;

        // Use reduced resolution
        const workingWidth = Math.min(320, width);
        const workingHeight = Math.round(workingWidth * (height / width));

        const tempCanvas = this.tempCanvasCtx.canvas;
        const tempCtx = this.tempCanvasCtx.ctx;

        // Resize if needed
        if (tempCanvas.width !== workingWidth || tempCanvas.height !== workingHeight) {
            tempCanvas.width = workingWidth;
            tempCanvas.height = workingHeight;
        }

        tempCtx.drawImage(source, 0, 0, workingWidth, workingHeight);
        return tempCtx.getImageData(0, 0, workingWidth, workingHeight);
    }

    private findBrightPixels(imageData: ImageData): Vector2[] {
        const { data, width, height } = imageData;
        const brightPixels: Vector2[] = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                // Check brightness (max RGB)
                const brightness = Math.max(r, g, b);
                if (brightness < this.config.brightnessThreshold) continue;

                // Check saturation (low saturation = white/glare)
                const min = Math.min(r, g, b);
                const saturation = brightness > 0 ? ((brightness - min) / brightness) * 255 : 0;
                if (saturation > this.config.saturationThreshold) continue;

                brightPixels.push({ x, y });
            }
        }

        // Check blob size
        if (brightPixels.length < this.config.minBlobSize ||
            brightPixels.length > this.config.maxBlobSize) {
            return [];
        }

        return brightPixels;
    }

    private computeCentroid(pixels: Vector2[]): Vector2 | null {
        if (pixels.length === 0) return null;

        let sumX = 0, sumY = 0;
        for (const p of pixels) {
            sumX += p.x;
            sumY += p.y;
        }

        return {
            x: sumX / pixels.length,
            y: sumY / pixels.length,
        };
    }

    private getRelativeAngles(u: number, v: number, intrinsics: IntrinsicMatrix): {
        relativeBearing: number;
        relativeElevation: number;
    } {
        const dx = u - intrinsics.cx;
        const dy = intrinsics.cy - v; // Flip Y

        return {
            relativeBearing: Math.atan2(dx, intrinsics.fx),
            relativeElevation: Math.atan2(dy, intrinsics.fy),
        };
    }

    private computeConfidence(blobSize: number, imageSize: number): number {
        // Confidence based on blob size relative to image
        // Ideal size is ~0.1% of image
        const sizeRatio = blobSize / imageSize;
        const idealRatio = 0.001;

        if (sizeRatio < idealRatio * 0.1) return 0.3; // Too small
        if (sizeRatio > idealRatio * 10) return 0.5;  // Too large

        return 0.8 + 0.2 * Math.exp(-Math.abs(Math.log(sizeRatio / idealRatio)));
    }
}
