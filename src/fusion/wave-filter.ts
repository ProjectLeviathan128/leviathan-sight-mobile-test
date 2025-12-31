/**
 * Leviathan Systems - Wave Filter
 * Low-pass filter for heave estimation and wave-induced motion smoothing
 * 
 * Reference: Section 7.1 of Leviathan Systems spec
 */

import type { Vector3 } from '../core/types';

// ============================================================================
// Configuration
// ============================================================================

interface WaveFilterConfig {
    /** Time constant for low-pass filter (seconds) */
    timeConstant: number;
    /** Cutoff frequency for heave estimation (Hz) */
    heaveCutoff: number;
    /** Expected dominant wave period (seconds) for adaptive filtering */
    expectedWavePeriod: number;
}

const DEFAULT_CONFIG: WaveFilterConfig = {
    timeConstant: 8.0,        // 8 second averaging (typical swell period)
    heaveCutoff: 0.2,         // 0.2 Hz = 5 second period
    expectedWavePeriod: 7.0,  // Typical wind wave period
};

// ============================================================================
// Simple Exponential Moving Average Filter
// ============================================================================

class ExponentialFilter {
    private alpha: number;
    private value: number | null = null;

    constructor(timeConstant: number, sampleRate: number) {
        // alpha = 1 - exp(-dt / tau)
        const dt = 1 / sampleRate;
        this.alpha = 1 - Math.exp(-dt / timeConstant);
    }

    update(newValue: number): number {
        if (this.value === null) {
            this.value = newValue;
        } else {
            this.value = this.alpha * newValue + (1 - this.alpha) * this.value;
        }
        return this.value;
    }

    getValue(): number {
        return this.value ?? 0;
    }

    reset(): void {
        this.value = null;
    }
}

// ============================================================================
// Wave Filter Class
// ============================================================================

export class WaveFilter {
    private config: WaveFilterConfig;

    // Heave estimation (vertical displacement)
    private heaveVelocity: number = 0;
    private heavePosition: number = 0;
    private lastTimestamp: number = 0;

    // Low-pass filters for smoothing
    private accelFilter: { x: ExponentialFilter; y: ExponentialFilter; z: ExponentialFilter };
    private heaveFilter: ExponentialFilter;

    // Baseline height (equilibrium)
    private _baselineHeight: number = 0;
    private heightHistory: number[] = [];
    private maxHistoryLength: number = 100;

    constructor(config: Partial<WaveFilterConfig> = {}, sampleRate: number = 60) {
        this.config = { ...DEFAULT_CONFIG, ...config };

        // Initialize filters
        this.accelFilter = {
            x: new ExponentialFilter(0.1, sampleRate), // Fast filter for accel
            y: new ExponentialFilter(0.1, sampleRate),
            z: new ExponentialFilter(0.1, sampleRate),
        };

        this.heaveFilter = new ExponentialFilter(this.config.timeConstant, sampleRate);
    }

    /**
     * Update with new accelerometer reading
     * 
     * @param accel - Linear acceleration (gravity removed) in world frame
     * @param timestamp - Timestamp in ms
     * @returns Current heave estimate (meters from baseline)
     */
    update(accel: Vector3, timestamp: number): number {
        if (this.lastTimestamp === 0) {
            this.lastTimestamp = timestamp;
            return 0;
        }

        const dt = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        if (dt <= 0 || dt > 1) {
            return this.heavePosition;
        }

        // Filter accelerometer noise
        const filteredAccel: Vector3 = {
            x: this.accelFilter.x.update(accel.x),
            y: this.accelFilter.y.update(accel.y),
            z: this.accelFilter.z.update(accel.z),
        };

        // Vertical acceleration (Z in world NED frame is down)
        // For device frame, we need to use the gravity-aligned component
        // Simplified: use Z component directly (assumes device is roughly level)
        const verticalAccel = filteredAccel.z;

        // Integrate acceleration to get velocity
        this.heaveVelocity += verticalAccel * dt;

        // Apply damping to velocity (prevents drift)
        const velocityDamping = 0.98;
        this.heaveVelocity *= velocityDamping;

        // Integrate velocity to get position
        this.heavePosition += this.heaveVelocity * dt;

        // Apply high-pass filter to remove low-frequency drift
        // Position should oscillate around zero
        const positionDamping = 0.995;
        this.heavePosition *= positionDamping;

        // Apply wave-period smoothing
        const smoothedHeave = this.heaveFilter.update(this.heavePosition);

        // Update baseline tracking
        this.updateBaseline(smoothedHeave);

        return smoothedHeave;
    }

    /**
     * Get current heave estimate (meters from baseline)
     */
    getHeave(): number {
        return this.heaveFilter.getValue();
    }

    /**
     * Get effective observer height accounting for heave
     * 
     * @param nominalHeight - Nominal observer height above sea level (meters)
     * @returns Effective height = nominal + heave
     */
    getEffectiveHeight(nominalHeight: number): number {
        return nominalHeight + this.getHeave();
    }

    /**
     * Get smoothed height using wave-period averaging
     * More stable for ranging calculations
     */
    getSmoothedHeight(nominalHeight: number): number {
        return nominalHeight + this.heaveFilter.getValue();
    }

    /**
     * Get estimated wave statistics
     */
    getWaveStatistics(): {
        significantWaveHeight: number;
        peakToPeak: number;
        periodEstimate: number;
    } {
        if (this.heightHistory.length < 10) {
            return {
                significantWaveHeight: 0,
                peakToPeak: 0,
                periodEstimate: this.config.expectedWavePeriod,
            };
        }

        // Calculate peak-to-peak from recent history
        const min = Math.min(...this.heightHistory);
        const max = Math.max(...this.heightHistory);
        const peakToPeak = max - min;

        // Significant wave height ≈ 0.64 × peak-to-peak (Rayleigh distribution)
        const significantWaveHeight = peakToPeak * 0.64;

        return {
            significantWaveHeight,
            peakToPeak,
            periodEstimate: this.config.expectedWavePeriod,
        };
    }

    /**
     * Track baseline for long-term drift correction
     */
    private updateBaseline(currentHeight: number): void {
        this.heightHistory.push(currentHeight);
        if (this.heightHistory.length > this.maxHistoryLength) {
            this.heightHistory.shift();
        }

        // Update baseline as running mean
        if (this.heightHistory.length > 0) {
            const sum = this.heightHistory.reduce((a, b) => a + b, 0);
            this._baselineHeight = sum / this.heightHistory.length;
        }
    }

    /**
     * Reset filter state
     */
    reset(): void {
        this.heaveVelocity = 0;
        this.heavePosition = 0;
        this.lastTimestamp = 0;
        this._baselineHeight = 0;
        this.heightHistory = [];
        this.accelFilter.x.reset();
        this.accelFilter.y.reset();
        this.accelFilter.z.reset();
        this.heaveFilter.reset();
    }

    /**
     * Set expected wave period for adaptive filtering
     */
    setExpectedWavePeriod(periodSeconds: number): void {
        this.config.expectedWavePeriod = periodSeconds;
    }
}

// ============================================================================
// Heave Compensator for Distance Estimation
// ============================================================================

export class HeaveCompensator {
    private waveFilter: WaveFilter;
    private nominalHeight: number;

    constructor(nominalHeightMeters: number, sampleRate: number = 60) {
        this.nominalHeight = nominalHeightMeters;
        this.waveFilter = new WaveFilter({}, sampleRate);
    }

    /**
     * Update with accelerometer reading
     */
    update(accel: Vector3, timestamp: number): void {
        this.waveFilter.update(accel, timestamp);
    }

    /**
     * Get instantaneous height (responsive to waves)
     */
    getInstantaneousHeight(): number {
        return this.waveFilter.getEffectiveHeight(this.nominalHeight);
    }

    /**
     * Get smoothed height (stable for ranging)
     */
    getStableHeight(): number {
        return this.waveFilter.getSmoothedHeight(this.nominalHeight);
    }

    /**
     * Get height uncertainty based on wave conditions
     */
    getHeightUncertainty(): number {
        const stats = this.waveFilter.getWaveStatistics();
        // 1σ ≈ Hs / 4 for Rayleigh distribution
        return stats.significantWaveHeight / 4;
    }

    /**
     * Set new nominal height
     */
    setNominalHeight(heightMeters: number): void {
        this.nominalHeight = heightMeters;
    }
}
