/**
 * Leviathan Systems - Visual Compass
 * Heading estimation via sun tracking and magnetometer fusion
 * 
 * Reference: Section 4.3 of Leviathan Systems spec
 */

import type { HeadingEstimate, IntrinsicMatrix, SunPosition } from '../core/types';
import { RAD_TO_DEG, DEG_TO_RAD } from '../core/types';
import type { SunDetection } from '../vision/sun-tracker';
import { SunTracker } from '../vision/sun-tracker';
import { SolarEphemeris } from './ephemeris';

// ============================================================================
// Configuration
// ============================================================================

interface VisualCompassConfig {
    /** Minimum sun elevation for reliable heading (degrees) */
    minSunElevation: number;
    /** Weight for visual heading in fusion (0-1) */
    visualWeight: number;
    /** Weight for magnetic heading in fusion (0-1) */
    magneticWeight: number;
    /** Heading smoothing factor (0 = no smoothing, 1 = max smoothing) */
    smoothingFactor: number;
    /** Uncertainty for visual heading (degrees) */
    visualUncertainty: number;
    /** Uncertainty for magnetic heading (degrees) */
    magneticUncertainty: number;
}

const DEFAULT_CONFIG: VisualCompassConfig = {
    minSunElevation: 10,        // Sun should be at least 10° above horizon
    visualWeight: 0.7,          // Visual is more reliable on ships
    magneticWeight: 0.3,
    smoothingFactor: 0.8,
    visualUncertainty: 5,       // ±5° from sun tracker
    magneticUncertainty: 15,    // ±15° due to ship interference
};

// ============================================================================
// Visual Compass Class
// ============================================================================

export class VisualCompass {
    private config: VisualCompassConfig;
    private ephemeris: SolarEphemeris;
    private sunTracker: SunTracker;

    // State
    private lastHeading: number | null = null;
    private lastVisualHeading: number | null = null;
    private lastUpdateTime: number = 0;

    // Location (must be set for ephemeris)
    private latitude: number = 0;
    private longitude: number = 0;
    private locationSet: boolean = false;

    constructor(config: Partial<VisualCompassConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.ephemeris = new SolarEphemeris();
        this.sunTracker = new SunTracker();
    }

    /**
     * Set observer location (required for sun position calculation)
     */
    setLocation(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
        this.locationSet = true;
    }

    /**
     * Get current sun position
     */
    getSunPosition(): SunPosition | null {
        if (!this.locationSet) return null;
        return this.ephemeris.getSunPosition(this.latitude, this.longitude);
    }

    /**
     * Update heading from sun detection
     * 
     * @param source - Camera image
     * @param intrinsics - Camera intrinsic matrix
     * @returns Visual heading estimate or null if sun not visible
     */
    updateFromCamera(
        source: HTMLVideoElement | HTMLCanvasElement | ImageData,
        intrinsics: IntrinsicMatrix
    ): number | null {
        if (!this.locationSet) return null;

        // Get expected sun position from ephemeris
        const sunPosition = this.ephemeris.getSunPosition(this.latitude, this.longitude);
        if (!sunPosition.visible || sunPosition.elevation < this.config.minSunElevation) {
            return null; // Sun too low or not visible
        }

        // Detect sun in camera
        const sunDetection = this.sunTracker.detect(source, intrinsics);
        if (!sunDetection) return null;

        // Calculate vessel heading from sun position
        const heading = this.computeHeadingFromSun(sunDetection, sunPosition, intrinsics);

        this.lastVisualHeading = heading;
        this.lastUpdateTime = Date.now();

        return heading;
    }

    /**
     * Compute heading from sun detection and ephemeris
     * 
     * Formula: Heading = Sun Azimuth - Relative Bearing
     */
    private computeHeadingFromSun(
        detection: SunDetection,
        sunPosition: SunPosition,
        _intrinsics: IntrinsicMatrix
    ): number {
        // Sun's true azimuth from North (degrees)
        const sunAzimuth = sunPosition.azimuth;

        // Sun's relative bearing from camera optical axis (radians to degrees)
        const relativeBearing = detection.relativeBearing * RAD_TO_DEG;

        // Heading = Sun Azimuth - Relative Bearing
        // (If sun is on our right, relative bearing is positive, so heading is less than sun azimuth)
        let heading = sunAzimuth - relativeBearing;

        // Normalize to 0-360
        heading = ((heading % 360) + 360) % 360;

        return heading;
    }

    /**
     * Fuse visual heading with magnetic heading
     * 
     * @param magneticHeading - Heading from magnetometer (degrees, 0-360)
     * @returns Fused heading estimate
     */
    fuseWithMagnetic(magneticHeading: number | null): HeadingEstimate {
        const now = Date.now();
        const visualStale = now - this.lastUpdateTime > 5000; // 5 second staleness

        // If we have no valid inputs, return based on what's available
        if (this.lastVisualHeading === null && magneticHeading === null) {
            return {
                heading: this.lastHeading ?? 0,
                source: 'magnetometer',
                confidence: 0,
                uncertainty: 180, // No confidence
            };
        }

        // Visual only
        if (magneticHeading === null || !isFinite(magneticHeading)) {
            if (this.lastVisualHeading !== null && !visualStale) {
                this.lastHeading = this.smoothHeading(this.lastVisualHeading);
                return {
                    heading: this.lastHeading,
                    source: 'visual_compass',
                    confidence: 0.8,
                    uncertainty: this.config.visualUncertainty,
                };
            }
        }

        // Magnetic only
        if (this.lastVisualHeading === null || visualStale) {
            const smoothed = this.smoothHeading(magneticHeading!);
            this.lastHeading = smoothed;
            return {
                heading: smoothed,
                source: 'magnetometer',
                confidence: 0.5,
                uncertainty: this.config.magneticUncertainty,
            };
        }

        // Both available: weighted fusion
        const fusedHeading = this.fuseHeadings(
            this.lastVisualHeading,
            magneticHeading!,
            this.config.visualWeight,
            this.config.magneticWeight
        );

        const smoothed = this.smoothHeading(fusedHeading);
        this.lastHeading = smoothed;

        // Fused uncertainty (simplified)
        const fusedUncertainty = Math.sqrt(
            (this.config.visualWeight * this.config.visualUncertainty) ** 2 +
            (this.config.magneticWeight * this.config.magneticUncertainty) ** 2
        ) / (this.config.visualWeight + this.config.magneticWeight);

        return {
            heading: smoothed,
            source: 'fused',
            confidence: 0.9,
            uncertainty: fusedUncertainty,
        };
    }

    /**
     * Get heading estimate (convenience method)
     */
    getHeading(magneticHeading: number | null = null): HeadingEstimate {
        return this.fuseWithMagnetic(magneticHeading);
    }

    /**
     * Check if visual compass is currently available
     */
    isAvailable(): boolean {
        if (!this.locationSet) return false;
        const sunPosition = this.ephemeris.getSunPosition(this.latitude, this.longitude);
        return sunPosition.visible && sunPosition.elevation >= this.config.minSunElevation;
    }

    // ========================================================================
    // Helper Methods
    // ========================================================================

    /**
     * Fuse two heading values using weighted circular mean
     */
    private fuseHeadings(
        heading1: number,
        heading2: number,
        weight1: number,
        weight2: number
    ): number {
        // Convert to radians
        const rad1 = heading1 * DEG_TO_RAD;
        const rad2 = heading2 * DEG_TO_RAD;

        // Weighted circular mean
        const x = weight1 * Math.cos(rad1) + weight2 * Math.cos(rad2);
        const y = weight1 * Math.sin(rad1) + weight2 * Math.sin(rad2);

        let fused = Math.atan2(y, x) * RAD_TO_DEG;
        fused = ((fused % 360) + 360) % 360;

        return fused;
    }

    /**
     * Apply smoothing to heading (temporal low-pass)
     */
    private smoothHeading(newHeading: number): number {
        if (this.lastHeading === null) {
            return newHeading;
        }

        // Handle wrap-around at 0/360
        let delta = newHeading - this.lastHeading;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const smoothed = this.lastHeading + delta * (1 - this.config.smoothingFactor);
        return ((smoothed % 360) + 360) % 360;
    }
}
