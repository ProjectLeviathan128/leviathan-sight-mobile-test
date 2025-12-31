/**
 * Leviathan Systems - Dynamic Camera Intrinsics Manager
 * Handles focal length adaptation for zoom and intrinsic matrix calculations
 * 
 * Reference: Section 2.2.1 & 8.1 of Leviathan Systems spec
 */

import type { IntrinsicMatrix } from './types';

// ============================================================================
// iPhone Camera Constants (Approximate for Wide Camera)
// These values are estimates; actual calibration recommended for precision
// ============================================================================

/** iPhone wide camera approximate focal length (mm) */
const BASE_FOCAL_LENGTH_MM = 4.25;

/** iPhone wide camera sensor width (mm) - approximate for 12MP sensor */
const SENSOR_WIDTH_MM = 4.8;

/** iPhone wide camera sensor height (mm) */
const SENSOR_HEIGHT_MM = 3.6;

/** Default capture resolution width */
const DEFAULT_WIDTH = 1920;

/** Default capture resolution height */
const DEFAULT_HEIGHT = 1080;

/** Approximate horizontal FOV for iPhone wide camera (degrees) */
export const IPHONE_HFOV_DEG = 69;

/** Approximate vertical FOV for iPhone wide camera (degrees) */
export const IPHONE_VFOV_DEG = 42;

// ============================================================================
// Intrinsics Manager Class
// ============================================================================

export class IntrinsicsManager {
    private baseIntrinsics: IntrinsicMatrix;
    private currentZoom: number = 1.0;
    private currentIntrinsics: IntrinsicMatrix;

    constructor(width: number = DEFAULT_WIDTH, height: number = DEFAULT_HEIGHT) {
        // Calculate focal length in pixels from sensor dimensions
        // f_pixels = f_mm * (image_width_pixels / sensor_width_mm)
        const fxBase = (BASE_FOCAL_LENGTH_MM / SENSOR_WIDTH_MM) * width;
        const fyBase = (BASE_FOCAL_LENGTH_MM / SENSOR_HEIGHT_MM) * height;

        // Principal point assumed at image center
        const cx = width / 2;
        const cy = height / 2;

        this.baseIntrinsics = {
            fx: fxBase,
            fy: fyBase,
            cx,
            cy,
            width,
            height,
        };

        this.currentIntrinsics = { ...this.baseIntrinsics };
    }

    /**
     * Update intrinsics for a new zoom factor
     * iOS videoZoomFactor effectively scales the focal length
     * 
     * @param zoomFactor - The current zoom level (1.0 = no zoom)
     */
    updateForZoom(zoomFactor: number): void {
        this.currentZoom = Math.max(1.0, zoomFactor);

        // When zooming, the effective focal length increases
        // while the image dimensions stay the same (digital crop/scale)
        this.currentIntrinsics = {
            ...this.baseIntrinsics,
            fx: this.baseIntrinsics.fx * this.currentZoom,
            fy: this.baseIntrinsics.fy * this.currentZoom,
        };
    }

    /**
     * Update for a different resolution
     * Used when switching video modes
     */
    updateForResolution(width: number, height: number): void {
        const scaleX = width / DEFAULT_WIDTH;
        const scaleY = height / DEFAULT_HEIGHT;

        this.baseIntrinsics = {
            fx: this.baseIntrinsics.fx * scaleX,
            fy: this.baseIntrinsics.fy * scaleY,
            cx: width / 2,
            cy: height / 2,
            width,
            height,
        };

        // Re-apply current zoom
        this.updateForZoom(this.currentZoom);
    }

    /**
     * Get the current intrinsic matrix
     */
    getIntrinsics(): IntrinsicMatrix {
        return { ...this.currentIntrinsics };
    }

    /**
     * Get the 3x3 K matrix for projective geometry
     */
    getKMatrix(): [[number, number, number], [number, number, number], [number, number, number]] {
        const { fx, fy, cx, cy } = this.currentIntrinsics;
        return [
            [fx, 0, cx],
            [0, fy, cy],
            [0, 0, 1],
        ];
    }

    /**
     * Get current zoom factor
     */
    getZoom(): number {
        return this.currentZoom;
    }

    /**
     * Get vertical field of view in radians
     * VFOV = 2 * atan(height / (2 * fy))
     */
    getVFOV(): number {
        return 2 * Math.atan(this.currentIntrinsics.height / (2 * this.currentIntrinsics.fy));
    }

    /**
     * Get horizontal field of view in radians
     * HFOV = 2 * atan(width / (2 * fx))
     */
    getHFOV(): number {
        return 2 * Math.atan(this.currentIntrinsics.width / (2 * this.currentIntrinsics.fx));
    }

    /**
     * Convert pixel coordinates to normalized camera coordinates
     * @param u - Pixel x coordinate
     * @param v - Pixel y coordinate
     * @returns Normalized coordinates (x, y) where optical axis is (0, 0)
     */
    pixelToNormalized(u: number, v: number): { x: number; y: number } {
        const { fx, fy, cx, cy } = this.currentIntrinsics;
        return {
            x: (u - cx) / fx,
            y: (v - cy) / fy,
        };
    }

    /**
     * Convert normalized camera coordinates to pixel coordinates
     * @param x - Normalized x
     * @param y - Normalized y
     * @returns Pixel coordinates (u, v)
     */
    normalizedToPixel(x: number, y: number): { u: number; v: number } {
        const { fx, fy, cx, cy } = this.currentIntrinsics;
        return {
            u: x * fx + cx,
            v: y * fy + cy,
        };
    }

    /**
     * Get angular size of a pixel (radians per pixel)
     * Useful for stadiametric ranging precision calculations
     */
    getPixelAngularSize(): { horizontal: number; vertical: number } {
        return {
            horizontal: this.getHFOV() / this.currentIntrinsics.width,
            vertical: this.getVFOV() / this.currentIntrinsics.height,
        };
    }

    /**
     * Calculate the dip angle for a given observer height
     * δ = arccos(R / (R + h)) ≈ sqrt(2h / R) for small h
     * 
     * @param heightMeters - Observer height above sea level (meters)
     * @param refractionK - Refraction coefficient (default 1.17 for standard maritime)
     * @returns Dip angle in radians
     */
    static calculateDipAngle(heightMeters: number, refractionK: number = 1.17): number {
        const R = 6_371_000; // Earth radius in meters
        const Reff = R * refractionK; // Effective radius with refraction
        return Math.acos(Reff / (Reff + heightMeters));
    }

    /**
     * Calculate horizon distance for a given observer height
     * d = sqrt(2 * k * R * h)
     * 
     * @param heightMeters - Observer height above sea level (meters)
     * @param refractionK - Refraction coefficient (default 1.17)
     * @returns Distance to horizon in meters
     */
    static calculateHorizonDistance(heightMeters: number, refractionK: number = 1.17): number {
        const R = 6_371_000;
        return Math.sqrt(2 * refractionK * R * heightMeters);
    }
}

// ============================================================================
// Digiscoping Support (External Optics)
// ============================================================================

export interface DigiscopeConfig {
    /** Magnification of external scope eyepiece */
    scopeMagnification: number;
    /** Calibration constant K_sys = D * H_pix / H_real from boresight */
    calibrationConstant?: number;
}

/**
 * Create intrinsics for a digiscoping setup
 * Effective focal length = camera focal length × scope magnification
 */
export function createDigiscopeIntrinsics(
    baseIntrinsics: IntrinsicMatrix,
    config: DigiscopeConfig
): IntrinsicMatrix {
    return {
        ...baseIntrinsics,
        fx: baseIntrinsics.fx * config.scopeMagnification,
        fy: baseIntrinsics.fy * config.scopeMagnification,
    };
}
