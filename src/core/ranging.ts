/**
 * Leviathan Systems - Maritime Ranging Module
 * Horizon dip and stadiametric distance estimation
 * 
 * Reference: Section 5 of Leviathan Systems spec
 */

import type { HorizonLine, IntrinsicMatrix, RangeEstimate } from './types';
import { EARTH_RADIUS_M, REFRACTION_COEFFICIENT } from './types';

// ============================================================================
// Horizon Dip Ranging
// ============================================================================

/**
 * Compute effective Earth radius accounting for atmospheric refraction
 */
export function effectiveEarthRadius(refractionK: number = REFRACTION_COEFFICIENT): number {
    // Standard: k ≈ 1.17 for maritime conditions
    // R_eff = R * k (increases apparent horizon distance)
    return EARTH_RADIUS_M * refractionK;
}

/**
 * Compute geometric distance to horizon from observer height
 * d = √(2 * R_eff * h + h²)
 */
export function distanceToHorizon(observerHeightMeters: number, refractionK: number = REFRACTION_COEFFICIENT): number {
    const R = effectiveEarthRadius(refractionK);
    const h = observerHeightMeters;
    return Math.sqrt(2 * R * h + h * h);
}

/**
 * Compute theoretical horizon dip angle from observer height
 * α = arccos(R / (R + h))
 */
export function horizonDipAngle(observerHeightMeters: number, refractionK: number = REFRACTION_COEFFICIENT): number {
    const R = effectiveEarthRadius(refractionK);
    const h = observerHeightMeters;
    return Math.acos(R / (R + h));
}

/**
 * Compute range to a point on the water from horizon dip measurement
 * 
 * @param observerHeight - Observer height above waterline (meters)
 * @param horizonOffsetPixels - Horizon offset from optical center (pixels, + below)
 * @param pitch - Current camera pitch estimate (radians)
 * @param intrinsics - Camera intrinsics
 * @returns Range estimate with uncertainty
 */
export function computeHorizonDipRange(
    observerHeight: number,
    horizonOffsetPixels: number,
    pitch: number,
    intrinsics: IntrinsicMatrix
): RangeEstimate {
    // Convert horizon offset in pixels to angle from optical center
    const horizonAngleFromOpticalAxis = Math.atan2(horizonOffsetPixels, intrinsics.fy);

    // Total depression angle = camera pitch + horizon angle in image
    const depressionAngle = pitch + horizonAngleFromOpticalAxis;

    // Theoretical horizon dip at observer height
    const theoreticalDip = horizonDipAngle(observerHeight);
    const horizonDistance = distanceToHorizon(observerHeight);

    let distance: number;
    let uncertainty: number;

    if (depressionAngle < theoreticalDip - 0.001) {
        // Looking above geometric horizon
        distance = horizonDistance;
        uncertainty = distance * 0.5;
    } else if (depressionAngle < 0.005) {
        // Nearly horizontal
        distance = horizonDistance;
        uncertainty = distance * 0.3;
    } else {
        // Looking down at water closer than horizon
        distance = observerHeight / Math.tan(depressionAngle);

        // Uncertainty from angle measurement
        const angleError = 0.005; // ~0.3°
        const rangeVariation = Math.abs(
            observerHeight / Math.tan(depressionAngle + angleError) -
            observerHeight / Math.tan(depressionAngle - angleError)
        ) / 2;
        uncertainty = Math.max(rangeVariation, distance * 0.05);
    }

    // Clamp to valid range
    distance = Math.max(1, Math.min(50000, distance));

    return {
        min: Math.max(1, distance - uncertainty),
        max: distance + uncertainty,
        best: distance,
        method: 'horizon_dip',
        confidence: Math.min(1, Math.max(0, 1 - uncertainty / distance)),
        description: formatRange(distance)
    };
}

// ============================================================================
// Stadiametric Ranging
// ============================================================================

/**
 * Compute range using stadiametric formula: D = (f * H_real) / H_pix
 * 
 * @param targetHeightMeters - Known real-world height of target
 * @param pixelHeight - Height of target in pixels
 * @param intrinsics - Camera intrinsics (with zoom-adjusted focal length)
 * @returns Range estimate with uncertainty
 */
export function computeStadiametricRange(
    targetHeightMeters: number,
    pixelHeight: number,
    intrinsics: IntrinsicMatrix
): RangeEstimate {
    if (pixelHeight < 10 || targetHeightMeters <= 0) {
        return {
            min: 0,
            max: Infinity,
            best: Infinity,
            method: 'stadiametric',
            confidence: 0,
            description: 'Unknown'
        };
    }

    // D = (f * H_real) / H_pix
    const distance = (intrinsics.fy * targetHeightMeters) / pixelHeight;

    // Uncertainty propagation
    // δD/D = √[(δf/f)² + (δH_real/H_real)² + (δH_pix/H_pix)²]
    const focalError = 0.02;           // 2% intrinsics error
    const sizeError = 0.15;            // 15% target size uncertainty
    const pixelError = 3 / pixelHeight; // ~3 pixel detection error

    const relativeUncertainty = Math.sqrt(
        focalError * focalError +
        sizeError * sizeError +
        pixelError * pixelError
    );

    const uncertainty = distance * relativeUncertainty;

    return {
        min: Math.max(1, distance - uncertainty),
        max: distance + uncertainty,
        best: distance,
        method: 'stadiametric',
        confidence: Math.min(1, Math.max(0, 1 - relativeUncertainty)),
        description: formatRange(distance)
    };
}

// ============================================================================
// Common Target Sizes
// ============================================================================

export const WHALE_BLOW_HEIGHT = { min: 2, max: 6, typical: 3.5 };  // meters
export const HUMPBACK_BLOW = { min: 2.5, max: 4, typical: 3 };
export const BLUE_WHALE_BLOW = { min: 4, max: 9, typical: 6 };
export const SMALL_BOAT_LENGTH = 6;
export const MEDIUM_VESSEL_LENGTH = 20;
export const BUOY_HEIGHT = 2;
export const HUMAN_HEIGHT = 1.75;

// ============================================================================
// Enhanced Distance Estimator Class
// ============================================================================

export class EnhancedDistanceEstimator {
    private smoothedRange: number | null = null;
    private smoothingAlpha = 0.3;

    /**
     * Estimate range to a whale blow detection
     * Uses proper stadiametric formula with intrinsics
     */
    estimateBlowRange(
        normalizedHeight: number, // 0-1 of frame height
        intrinsics: IntrinsicMatrix,
        blowHeightRange = WHALE_BLOW_HEIGHT
    ): RangeEstimate {
        // Convert normalized height to pixels
        const pixelHeight = normalizedHeight * intrinsics.height;

        if (pixelHeight < 5) {
            return {
                min: 0,
                max: Infinity,
                best: Infinity,
                method: 'stadiametric',
                confidence: 0,
                description: 'Too small'
            };
        }

        // Compute range for min and max blow heights
        const rangeForMin = computeStadiametricRange(blowHeightRange.min, pixelHeight, intrinsics);
        const rangeForMax = computeStadiametricRange(blowHeightRange.max, pixelHeight, intrinsics);
        const rangeForTypical = computeStadiametricRange(blowHeightRange.typical, pixelHeight, intrinsics);

        // Apply smoothing
        const smoothed = this.applySmoothing(rangeForTypical.best);

        return {
            min: Math.min(rangeForMin.min, rangeForMax.min),
            max: Math.max(rangeForMin.max, rangeForMax.max),
            best: smoothed,
            method: 'stadiametric',
            confidence: rangeForTypical.confidence * 0.8, // Reduce confidence for blow height uncertainty
            description: formatRangeWithBrackets(rangeForMin.best, rangeForMax.best)
        };
    }

    /**
     * Compute horizon range from current horizon detection
     */
    estimateHorizonRange(
        horizon: HorizonLine | null,
        intrinsics: IntrinsicMatrix,
        observerHeight: number
    ): RangeEstimate | null {
        if (!horizon) return null;

        const offsetFromCenter = horizon.offset - intrinsics.height / 2;
        return computeHorizonDipRange(observerHeight, offsetFromCenter, horizon.pitch, intrinsics);
    }

    private applySmoothing(newValue: number): number {
        if (!isFinite(newValue) || newValue <= 0) {
            return this.smoothedRange ?? newValue;
        }

        if (this.smoothedRange !== null) {
            // Reject large jumps
            if (Math.abs(newValue - this.smoothedRange) / this.smoothedRange > 0.3) {
                return this.smoothedRange;
            }
            this.smoothedRange = this.smoothingAlpha * newValue + (1 - this.smoothingAlpha) * this.smoothedRange;
        } else {
            this.smoothedRange = newValue;
        }

        return this.smoothedRange;
    }

    reset(): void {
        this.smoothedRange = null;
    }
}

// ============================================================================
// Utility Functions  
// ============================================================================

function formatRange(meters: number): string {
    if (!isFinite(meters) || meters <= 0) return 'Unknown';
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
}

function formatRangeWithBrackets(minMeters: number, maxMeters: number): string {
    const minStr = formatRange(minMeters);
    const maxStr = formatRange(maxMeters);
    if (minStr === maxStr) return minStr;
    return `${minStr}-${maxStr}`;
}
