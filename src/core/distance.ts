import type { Detection } from './inference';

export interface DistanceResult {
    min: number; // Meters
    max: number; // Meters
    desc: string; // "~0.7-1.8 km"
}

export class DistanceEstimator {
    // Configurable assumptions
    // Blow height range: [2m, 6m] (e.g. Humpback/Blue)
    private BLOW_HEIGHT_MIN = 2.0;
    private BLOW_HEIGHT_MAX = 6.0;

    // HFOV/VFOV of typical smartphone (iPhone Wide ~ 60-70 deg HFOV)
    // We assume roughly 45 deg VFOV for 16:9 ?
    // 2 * atan( (h/2) / f )
    // Let's approximate: Field of View (Vertical) in Radians
    private VFOV_RAD = 45 * (Math.PI / 180);

    estimate(det: Detection): DistanceResult {
        // det.h is normalized height (0.0 - 1.0) of the frame height
        // angular_size_rad = det.h * VFOV_RAD
        const angularSize = det.h * this.VFOV_RAD;

        if (angularSize <= 0) return { min: 0, max: 0, desc: "Unknown" };

        // Distance = RealHeight / tan(AngularSize)
        // Approx: Distance = RealHeight / AngularSize (small angle approximation)

        // Min distance corresponds to Max assumed height (Wait? No)
        // distance = height / angle. 
        // If angle is fixed:
        // dist_min = HEIGHT_MIN / angle
        // dist_max = HEIGHT_MAX / angle

        const distMin = this.BLOW_HEIGHT_MIN / Math.tan(angularSize);
        const distMax = this.BLOW_HEIGHT_MAX / Math.tan(angularSize);

        // Convert to KM for display if large
        const minKm = (distMin / 1000).toFixed(1);
        const maxKm = (distMax / 1000).toFixed(1);

        return {
            min: Math.floor(distMin),
            max: Math.floor(distMax),
            desc: `~${minKm}-${maxKm} km`
        };
    }
}
