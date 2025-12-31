/**
 * Leviathan Systems - Horizon Detection
 * Ettinger statistical region-based sea-sky horizon detection
 * 
 * Reference: Section 3 of Leviathan Systems spec
 * Based on: Ettinger et al. "Towards Flight of an Autonomous Aerial Vehicle"
 */

import type { HorizonLine, HorizonResult, IntrinsicMatrix } from '../core/types';
import { DEG_TO_RAD, EARTH_RADIUS_M, REFRACTION_COEFFICIENT, RAD_TO_DEG } from '../core/types';

// ============================================================================
// Configuration
// ============================================================================

interface HorizonConfig {
    /** Coarse search image size (power of 2 recommended) */
    coarseSize: number;
    /** Roll angle search range (radians) */
    rollRange: number;
    /** Roll angle search step (radians) */
    rollStep: number;
    /** Pitch search range as fraction of image height */
    pitchRange: number;
    /** Pitch search steps */
    pitchSteps: number;
    /** Brightness threshold for glare detection (0-255) */
    glareThreshold: number;
    /** Minimum saturation for glare (0-255), pixels below are potential glare */
    glareSaturationMax: number;
    /** Minimum confidence to accept detection */
    minConfidence: number;
}

const DEFAULT_CONFIG: HorizonConfig = {
    coarseSize: 64,
    rollRange: 30 * DEG_TO_RAD, // ±30°
    rollStep: 2 * DEG_TO_RAD,   // 2° steps
    pitchRange: 0.4,            // Search ±40% of image height
    pitchSteps: 20,
    glareThreshold: 245,
    glareSaturationMax: 30,
    minConfidence: 0.3,
};

// ============================================================================
// Horizon Detector Class
// ============================================================================

export class HorizonDetector {
    private config: HorizonConfig;
    private coarseCanvas: OffscreenCanvas;
    private coarseCtx: OffscreenCanvasRenderingContext2D;
    private tempCanvas: OffscreenCanvas;
    private tempCtx: OffscreenCanvasRenderingContext2D;

    constructor(config: Partial<HorizonConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };

        // Pre-allocate canvases for processing
        this.coarseCanvas = new OffscreenCanvas(this.config.coarseSize, this.config.coarseSize);
        this.coarseCtx = this.coarseCanvas.getContext('2d', { willReadFrequently: true })!;

        this.tempCanvas = new OffscreenCanvas(640, 480);
        this.tempCtx = this.tempCanvas.getContext('2d', { willReadFrequently: true })!;
    }

    /**
     * Detect the sea-sky horizon in an image
     * 
     * @param source - Image source (video element, canvas, or ImageData)
     * @param intrinsics - Camera intrinsic matrix for angle calculations
     * @param observerHeight - Observer height above sea level (meters) for dip correction
     * @returns Horizon detection result with line parameters and attitude
     */
    detect(
        source: HTMLVideoElement | HTMLCanvasElement | ImageData,
        intrinsics: IntrinsicMatrix,
        observerHeight: number = 3
    ): HorizonResult {
        const startTime = performance.now();

        try {
            // Step 1: Get image data at working resolution
            const imageData = this.getImageData(source);
            if (!imageData) {
                return {
                    horizon: null,
                    processingTime: performance.now() - startTime,
                    glareMasked: false,
                    failureReason: 'Failed to get image data',
                };
            }

            // Step 2: Apply glare masking
            const { data: maskedData, glareMasked } = this.maskGlare(imageData);

            // Step 3: Downsample for coarse search
            const coarseData = this.downsample(maskedData);

            // Step 4: Coarse grid search for best horizon line
            const coarseResult = this.coarseSearch(coarseData);

            // Step 5: Fine refinement around best coarse result
            const fineResult = this.fineRefine(maskedData, coarseResult);

            if (fineResult.confidence < this.config.minConfidence) {
                return {
                    horizon: null,
                    processingTime: performance.now() - startTime,
                    glareMasked,
                    failureReason: `Low confidence: ${fineResult.confidence.toFixed(2)}`,
                };
            }

            // Step 6: Convert to full-resolution coordinates and compute attitude
            const horizon = this.computeHorizonLine(
                fineResult,
                maskedData.width,
                maskedData.height,
                intrinsics,
                observerHeight
            );

            return {
                horizon,
                processingTime: performance.now() - startTime,
                glareMasked,
            };
        } catch (e) {
            return {
                horizon: null,
                processingTime: performance.now() - startTime,
                glareMasked: false,
                failureReason: `Error: ${e}`,
            };
        }
    }

    /**
     * Extract ImageData from various sources
     */
    private getImageData(source: HTMLVideoElement | HTMLCanvasElement | ImageData): ImageData | null {
        if (source instanceof ImageData) {
            return source;
        }

        const width = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
        const height = source instanceof HTMLVideoElement ? source.videoHeight : source.height;

        if (width === 0 || height === 0) return null;

        // Use working resolution (not full res to save compute)
        const workingWidth = Math.min(640, width);
        const workingHeight = Math.round(workingWidth * (height / width));

        this.tempCanvas.width = workingWidth;
        this.tempCanvas.height = workingHeight;

        this.tempCtx.drawImage(source, 0, 0, workingWidth, workingHeight);
        return this.tempCtx.getImageData(0, 0, workingWidth, workingHeight);
    }

    /**
     * Mask sun glare regions using HSV thresholding
     * High Value + Low Saturation = likely glare
     */
    private maskGlare(imageData: ImageData): { data: ImageData; glareMasked: boolean } {
        const { data, width, height } = imageData;
        const output = new ImageData(new Uint8ClampedArray(data), width, height);
        let glareMasked = false;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Quick HSV-like check: high brightness, low saturation
            const maxVal = Math.max(r, g, b);
            const minVal = Math.min(r, g, b);
            const saturation = maxVal === 0 ? 0 : ((maxVal - minVal) / maxVal) * 255;

            if (maxVal > this.config.glareThreshold && saturation < this.config.glareSaturationMax) {
                // Mark as neutral gray (exclude from statistics)
                output.data[i] = 128;
                output.data[i + 1] = 128;
                output.data[i + 2] = 128;
                output.data[i + 3] = 0; // Mark alpha=0 to exclude
                glareMasked = true;
            }
        }

        return { data: output, glareMasked };
    }

    /**
     * Downsample image for coarse search
     */
    private downsample(imageData: ImageData): ImageData {
        const size = this.config.coarseSize;
        this.coarseCanvas.width = size;
        this.coarseCanvas.height = size;

        // Draw scaled down
        this.coarseCtx.drawImage(
            this.createImageBitmap(imageData) as any, // Fallback without bitmap
            0, 0, size, size
        );

        // Fallback: use putImageData with manual scaling
        const scaleX = imageData.width / size;
        const scaleY = imageData.height / size;
        const output = new ImageData(size, size);

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                const srcX = Math.floor(x * scaleX);
                const srcY = Math.floor(y * scaleY);
                const srcIdx = (srcY * imageData.width + srcX) * 4;
                const dstIdx = (y * size + x) * 4;

                output.data[dstIdx] = imageData.data[srcIdx];
                output.data[dstIdx + 1] = imageData.data[srcIdx + 1];
                output.data[dstIdx + 2] = imageData.data[srcIdx + 2];
                output.data[dstIdx + 3] = imageData.data[srcIdx + 3];
            }
        }

        return output;
    }

    /**
     * Helper to create ImageBitmap (polyfill-safe)
     */
    private createImageBitmap(imageData: ImageData): ImageData {
        return imageData; // Simplified fallback
    }

    /**
     * Coarse grid search for horizon line
     * Searches over roll angles and vertical offsets
     */
    private coarseSearch(imageData: ImageData): { roll: number; offset: number; score: number } {
        const { rollRange, rollStep, pitchRange, pitchSteps } = this.config;
        const { width: _width, height } = imageData;

        let bestRoll = 0;
        let bestOffset = height / 2;
        let bestScore = Infinity;

        // Search over roll angles
        for (let roll = -rollRange; roll <= rollRange; roll += rollStep) {
            // Search over vertical offsets (pitch)
            const offsetMin = height * (0.5 - pitchRange);
            const offsetMax = height * (0.5 + pitchRange);
            const offsetStep = (offsetMax - offsetMin) / pitchSteps;

            for (let offset = offsetMin; offset <= offsetMax; offset += offsetStep) {
                const score = this.computeLineScore(imageData, roll, offset);

                if (score < bestScore) {
                    bestScore = score;
                    bestRoll = roll;
                    bestOffset = offset;
                }
            }
        }

        return { roll: bestRoll, offset: bestOffset, score: bestScore };
    }

    /**
     * Fine refinement using gradient descent from coarse result
     */
    private fineRefine(
        imageData: ImageData,
        coarse: { roll: number; offset: number; score: number }
    ): { roll: number; offset: number; confidence: number } {
        let { roll, offset } = coarse;
        const { height } = imageData;

        // Gradient descent refinement
        const rollDelta = 0.5 * DEG_TO_RAD;
        const offsetDelta = 2;
        const maxIterations = 10;

        let currentScore = this.computeLineScore(imageData, roll, offset);

        for (let i = 0; i < maxIterations; i++) {
            let improved = false;

            // Try small adjustments
            const candidates = [
                { r: roll + rollDelta, o: offset },
                { r: roll - rollDelta, o: offset },
                { r: roll, o: offset + offsetDelta },
                { r: roll, o: offset - offsetDelta },
                { r: roll + rollDelta, o: offset + offsetDelta },
                { r: roll - rollDelta, o: offset - offsetDelta },
            ];

            for (const { r, o } of candidates) {
                const score = this.computeLineScore(imageData, r, o);
                if (score < currentScore) {
                    roll = r;
                    offset = o;
                    currentScore = score;
                    improved = true;
                }
            }

            if (!improved) break;
        }

        // Convert score to confidence (lower score = higher confidence)
        // Normalize based on typical variance ranges
        const confidence = Math.max(0, Math.min(1, 1 - currentScore / 10000));

        // Clamp offset to valid range
        offset = Math.max(0, Math.min(height, offset));

        return { roll, offset, confidence };
    }

    /**
     * Compute Ettinger-style intra-class variance score for a line
     * Lower score = better separation between sky and sea
     */
    private computeLineScore(imageData: ImageData, roll: number, offsetPixels: number): number {
        const { data, width, height } = imageData;

        // Statistics for sky (above line) and sea (below line)
        let skySum = 0, skyCount = 0;
        let seaSum = 0, seaCount = 0;
        let skySumSq = 0, seaSumSq = 0;

        // For each pixel, determine if it's above or below the horizon line
        const cos_r = Math.cos(roll);
        const sin_r = Math.sin(roll);
        const cx = width / 2;
        const cy = height / 2;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;

                // Skip masked pixels (alpha = 0)
                if (data[idx + 3] === 0) continue;

                // Grayscale luminance
                const gray = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];

                // Transform point relative to image center
                const dx = x - cx;
                const dy = y - cy;

                // Rotate by roll and check against offset
                // Line equation: y' = offsetPixels where y' is in rotated coords
                const yRotated = -dx * sin_r + dy * cos_r + cy;

                if (yRotated < offsetPixels) {
                    // Above line = sky
                    skySum += gray;
                    skySumSq += gray * gray;
                    skyCount++;
                } else {
                    // Below line = sea
                    seaSum += gray;
                    seaSumSq += gray * gray;
                    seaCount++;
                }
            }
        }

        // Compute variances
        if (skyCount < 10 || seaCount < 10) {
            return Infinity; // Not enough pixels
        }

        const skyMean = skySum / skyCount;
        const seaMean = seaSum / seaCount;
        const skyVar = skySumSq / skyCount - skyMean * skyMean;
        const seaVar = seaSumSq / seaCount - seaMean * seaMean;

        // Intra-class variance (weighted by pixel count)
        const totalCount = skyCount + seaCount;
        const intraClassVar = (skyCount * skyVar + seaCount * seaVar) / totalCount;

        // Also penalize if means are too similar (no clear separation)
        const meanDiff = Math.abs(skyMean - seaMean);
        const separationPenalty = meanDiff < 10 ? 1000 : 0;

        return intraClassVar + separationPenalty;
    }

    /**
     * Convert detection result to HorizonLine with attitude angles
     */
    private computeHorizonLine(
        result: { roll: number; offset: number; confidence: number },
        _imageWidth: number,
        imageHeight: number,
        intrinsics: IntrinsicMatrix,
        observerHeight: number
    ): HorizonLine {
        // Roll is directly from the line angle
        const roll = -result.roll; // Negative because image Y is inverted

        // Compute pitch from offset
        // Offset is distance from center in pixels
        const offsetFromCenter = result.offset - imageHeight / 2;

        // Convert pixel offset to angle using focal length
        const rawPitchAngle = Math.atan(offsetFromCenter / intrinsics.fy);

        // Compute dip angle for observer height
        const Reff = EARTH_RADIUS_M * REFRACTION_COEFFICIENT;
        const dipAngle = Math.acos(Reff / (Reff + observerHeight));

        // Corrected pitch = raw pitch + dip (horizon appears below true horizontal)
        const pitch = rawPitchAngle + dipAngle;

        return {
            angle: result.roll,
            offset: result.offset,
            confidence: result.confidence,
            roll,
            pitch,
        };
    }

    /**
     * Get roll angle in degrees (convenience method)
     */
    static getRollDegrees(horizon: HorizonLine): number {
        return horizon.roll * RAD_TO_DEG;
    }

    /**
     * Get pitch angle in degrees (convenience method)
     */
    static getPitchDegrees(horizon: HorizonLine): number {
        return horizon.pitch * RAD_TO_DEG;
    }
}

// ============================================================================
// Horizon Line Utilities
// ============================================================================

/**
 * Calculate the gravity vector in camera frame from horizon line
 * This is used as a measurement for the EKF
 */
export function horizonToGravityVector(
    horizon: HorizonLine
): { x: number; y: number; z: number } {
    // In camera frame, gravity should point "down"
    // If camera is level, gravity = [0, 1, 0] (Y-down convention)
    // Roll rotates gravity in the Y-Z plane
    // Pitch rotates gravity in the X-Y plane

    const { roll, pitch } = horizon;

    // Construct gravity vector based on roll and pitch
    const g: { x: number; y: number; z: number } = {
        x: Math.sin(pitch),
        y: Math.cos(pitch) * Math.cos(roll),
        z: Math.cos(pitch) * Math.sin(roll),
    };

    return g;
}

/**
 * Compute horizon distance for stadiametric reference
 */
export function computeHorizonDistance(
    observerHeightMeters: number,
    refractionK: number = REFRACTION_COEFFICIENT
): number {
    return Math.sqrt(2 * refractionK * EARTH_RADIUS_M * observerHeightMeters);
}
