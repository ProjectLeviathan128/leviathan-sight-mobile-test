/**
 * Leviathan Systems - Blow Localizer
 * Computes exact geographic location of detected whale blows
 * 
 * Combines:
 * - Detection bounding box (pixel position)
 * - Camera intrinsics (focal length adjusted for zoom)
 * - Vessel heading (from visual compass / magnetometer)
 * - Stadiametric distance (from apparent blow height)
 * - GPS location (vessel position)
 * 
 * Outputs: Lat/Lon of the blow with uncertainty estimates
 */

import type { Detection } from './inference';
import type { IntrinsicMatrix, HeadingEstimate, Orientation, Vector3 } from './types';
import { DEG_TO_RAD, RAD_TO_DEG, EARTH_RADIUS_M } from './types';

// ============================================================================
// Types
// ============================================================================

export interface GeoPosition {
    latitude: number;   // degrees
    longitude: number;  // degrees
    altitude?: number;  // meters above sea level
    accuracy?: number;  // meters (horizontal uncertainty)
}

export interface BlowLocation {
    /** Geographic position of the blow */
    position: GeoPosition;

    /** Distance from observer (meters) */
    distance: number;
    distanceMin: number;
    distanceMax: number;

    /** True bearing from observer (degrees, 0-360) */
    bearing: number;

    /** Relative bearing from bow/camera center (degrees, + = right) */
    relativeBearing: number;

    /** Detection confidence [0, 1] */
    confidence: number;

    /** Timestamp of detection (ms since epoch) */
    timestamp: number;

    /** Unique event ID */
    eventId: string;

    /** Zoom factor at time of detection */
    zoomFactor: number;

    /** Uncertainty estimates */
    uncertainty: {
        distancePercent: number;  // % uncertainty in distance
        bearingDegrees: number;   // ° uncertainty in bearing
        positionMeters: number;   // meters radius of uncertainty
    };
}

export interface BlowLocalizerConfig {
    /** Minimum assumed blow height (meters) - e.g., 2m for smaller whales */
    blowHeightMin: number;
    /** Maximum assumed blow height (meters) - e.g., 9m for large Blue whale */
    blowHeightMax: number;
    /** Species-specific default height if known */
    defaultBlowHeight: number;
    /** Observer height above sea level (meters) */
    observerHeight: number;
}

const DEFAULT_CONFIG: BlowLocalizerConfig = {
    blowHeightMin: 2.0,      // Minimum (Minke, small humpback)
    blowHeightMax: 9.0,      // Maximum (Blue whale)
    defaultBlowHeight: 4.5,  // Typical humpback
    observerHeight: 3.0,     // 3m eye height on boat
};

// ============================================================================
// Blow Localizer Class
// ============================================================================

export class BlowLocalizer {
    private config: BlowLocalizerConfig;
    private observerPosition: GeoPosition | null = null;
    private eventCounter: number = 0;

    constructor(config: Partial<BlowLocalizerConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * Update the observer's GPS position
     * Call this continuously from the geolocation API
     */
    setObserverPosition(position: GeoPosition): void {
        this.observerPosition = position;
    }

    /**
     * Update observer height (e.g., if user specifies boat deck height)
     */
    setObserverHeight(heightMeters: number): void {
        this.config.observerHeight = heightMeters;
    }

    /**
     * Localize a detected blow
     * 
     * @param detection - YOLO detection with bounding box
     * @param intrinsics - Camera intrinsic matrix (zoom-adjusted)
     * @param heading - Current heading estimate
     * @param orientation - Current vessel orientation (roll, pitch)
     * @param zoomFactor - Current zoom level
     * @returns Complete blow location or null if localization failed
     */
    localize(
        detection: Detection,
        intrinsics: IntrinsicMatrix,
        heading: HeadingEstimate | null,
        orientation: Orientation | null,
        zoomFactor: number = 1.0
    ): BlowLocation | null {
        const timestamp = Date.now();

        if (!this.observerPosition) {
            console.warn('[BlowLocalizer] No observer position set');
            return null;
        }

        if (!heading) {
            console.warn('[BlowLocalizer] No heading available');
            return null;
        }

        // ========================================================================
        // Step 1: Calculate relative bearing from detection position
        // ========================================================================

        // Detection center in pixels (normalized 0-1 → pixels)
        const detCenterX = detection.x * intrinsics.width;
        const detCenterY = detection.y * intrinsics.height;

        // Offset from principal point (image center)
        const dx = detCenterX - intrinsics.cx;

        // Relative bearing: angle from optical axis (radians)
        // Positive = blow is to the right of center
        const relativeBearingRad = Math.atan2(dx, intrinsics.fx);
        const relativeBearingDeg = relativeBearingRad * RAD_TO_DEG;

        // ========================================================================
        // Step 2: Calculate true bearing to blow
        // ========================================================================

        // True bearing = vessel heading + relative bearing
        let trueBearing = heading.heading + relativeBearingDeg;
        trueBearing = ((trueBearing % 360) + 360) % 360;

        // ========================================================================
        // Step 3: Calculate distance using stadiametric ranging
        // ========================================================================

        // Detection height in pixels
        const detHeightPixels = detection.h * intrinsics.height;

        // Angular size of detection (radians)
        const angularSize = 2 * Math.atan(detHeightPixels / (2 * intrinsics.fy));

        if (angularSize <= 0.001) {
            console.warn('[BlowLocalizer] Detection too small for ranging');
            return null;
        }

        // Stadiametric formula: Distance = RealHeight / tan(angularSize)
        // For small angles: Distance ≈ RealHeight / angularSize
        const distanceBest = this.config.defaultBlowHeight / Math.tan(angularSize);
        const distanceMin = this.config.blowHeightMin / Math.tan(angularSize);
        const distanceMax = this.config.blowHeightMax / Math.tan(angularSize);

        // Apply pitch correction if orientation available
        let correctedDistance = distanceBest;
        if (orientation) {
            // If looking down, blow is closer than apparent
            // If looking up, blow is farther
            // cos(pitch) correction factor
            const pitchCorrection = Math.cos(orientation.pitch);
            correctedDistance = distanceBest * Math.max(0.5, Math.min(2.0, 1 / pitchCorrection));
        }

        // ========================================================================
        // Step 4: Project to geographic coordinates
        // ========================================================================

        const targetPosition = this.projectPosition(
            this.observerPosition,
            trueBearing,
            correctedDistance
        );

        // ========================================================================
        // Step 5: Calculate uncertainties
        // ========================================================================

        // Distance uncertainty: dominated by unknown blow height
        const distancePercent = ((distanceMax - distanceMin) / correctedDistance) * 100;

        // Bearing uncertainty: combination of heading uncertainty + detection position
        const pixelBearingError = 3 / intrinsics.fx * RAD_TO_DEG; // ~3 pixels = bearing error
        const bearingUncertainty = Math.sqrt(
            heading.uncertainty ** 2 + pixelBearingError ** 2
        );

        // Position uncertainty: distance × sin(bearing error) + distance error
        const positionUncertainty = Math.sqrt(
            (correctedDistance * Math.sin(bearingUncertainty * DEG_TO_RAD)) ** 2 +
            ((distanceMax - distanceMin) / 2) ** 2
        );

        // ========================================================================
        // Step 6: Build result
        // ========================================================================

        const eventId = this.generateEventId(timestamp);

        return {
            position: targetPosition,
            distance: Math.round(correctedDistance),
            distanceMin: Math.round(distanceMin),
            distanceMax: Math.round(distanceMax),
            bearing: Math.round(trueBearing * 10) / 10,
            relativeBearing: Math.round(relativeBearingDeg * 10) / 10,
            confidence: detection.confidence,
            timestamp,
            eventId,
            zoomFactor,
            uncertainty: {
                distancePercent: Math.round(distancePercent),
                bearingDegrees: Math.round(bearingUncertainty * 10) / 10,
                positionMeters: Math.round(positionUncertainty),
            },
        };
    }

    /**
     * Project a position at a given bearing and distance from origin
     * Uses spherical Earth approximation (Haversine)
     */
    private projectPosition(
        origin: GeoPosition,
        bearingDeg: number,
        distanceMeters: number
    ): GeoPosition {
        const lat1 = origin.latitude * DEG_TO_RAD;
        const lon1 = origin.longitude * DEG_TO_RAD;
        const brng = bearingDeg * DEG_TO_RAD;
        const d = distanceMeters / EARTH_RADIUS_M;

        const lat2 = Math.asin(
            Math.sin(lat1) * Math.cos(d) +
            Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
        );

        const lon2 = lon1 + Math.atan2(
            Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
            Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
        );

        return {
            latitude: lat2 * RAD_TO_DEG,
            longitude: ((lon2 * RAD_TO_DEG + 540) % 360) - 180, // Normalize to [-180, 180]
            altitude: 0, // Sea level
        };
    }

    /**
     * Generate unique event ID
     */
    private generateEventId(timestamp: number): string {
        this.eventCounter++;
        const timeHex = timestamp.toString(16).slice(-8);
        const counter = this.eventCounter.toString(16).padStart(4, '0');
        return `BLOW-${timeHex}-${counter}`.toUpperCase();
    }

    /**
     * Format location for display
     */
    static formatLocation(loc: BlowLocation): string {
        const lat = loc.position.latitude.toFixed(5);
        const lon = loc.position.longitude.toFixed(5);
        const dist = loc.distance < 1000
            ? `${loc.distance}m`
            : `${(loc.distance / 1000).toFixed(1)}km`;
        return `${lat}°, ${lon}° @ ${dist} bearing ${loc.bearing}°`;
    }

    /**
     * Format for logging/export
     */
    static toJSON(loc: BlowLocation): object {
        return {
            event_id: loc.eventId,
            timestamp: new Date(loc.timestamp).toISOString(),
            position: {
                lat: loc.position.latitude,
                lon: loc.position.longitude,
            },
            distance_m: loc.distance,
            distance_range: { min: loc.distanceMin, max: loc.distanceMax },
            bearing_deg: loc.bearing,
            relative_bearing_deg: loc.relativeBearing,
            confidence: loc.confidence,
            zoom: loc.zoomFactor,
            uncertainty: loc.uncertainty,
        };
    }
}

// ============================================================================
// Singleton instance for global access
// ============================================================================

export const blowLocalizer = new BlowLocalizer();
