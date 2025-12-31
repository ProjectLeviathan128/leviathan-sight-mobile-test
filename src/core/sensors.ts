import type { IMUSample, Vector3 } from './types';

// ============================================================================
// Browser Orientation Data (unchanged interface for compatibility)
// ============================================================================

export interface OrientationData {
    alpha: number | null; // Compass heading (0-360)
    beta: number | null;  // Front/Back tilt (-180 to 180)
    gamma: number | null; // Left/Right tilt (-90 to 90)
    absolute: boolean;
}

export interface MotionData {
    accelX: number | null;
    accelY: number | null;
    accelZ: number | null;
}

// ============================================================================
// Enhanced Sensor Manager with High-Frequency IMU Buffering
// ============================================================================

/** Maximum samples to keep in ring buffer */
const IMU_BUFFER_SIZE = 100;

export class SensorManager {
    // Legacy compatibility
    orientation: OrientationData = { alpha: 0, beta: 0, gamma: 0, absolute: false };
    motion: MotionData = { accelX: 0, accelY: 0, accelZ: 0 };
    available: boolean = false;
    permissionGranted: boolean = false;

    // High-frequency IMU buffer (ring buffer)
    private imuBuffer: IMUSample[] = [];
    private imuBufferIndex: number = 0;

    // Latest IMU sample for quick access
    private latestIMU: IMUSample | null = null;

    // Timing
    private lastMotionTime: number = 0;
    private sampleInterval: number = 0; // Estimated sampling interval (ms)

    constructor() {
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleMotion = this.handleMotion.bind(this);
    }

    async requestPermission(): Promise<boolean> {
        // iOS 13+ requires permission for DeviceOrientation
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    this.permissionGranted = true;
                    this.start();
                    return true;
                } else {
                    console.warn('Orientation permission denied');
                    return false;
                }
            } catch (e) {
                console.error('Orientation permission error:', e);
                return false;
            }
        } else {
            // Non-iOS or older browsers
            this.permissionGranted = true;
            this.start();
            return true;
        }
    }

    start() {
        if (!this.permissionGranted) return;
        window.addEventListener('deviceorientation', this.handleOrientation);
        window.addEventListener('devicemotion', this.handleMotion);
        this.available = true;
        console.log('[SensorManager] Started listening for IMU events');
    }

    stop() {
        window.removeEventListener('deviceorientation', this.handleOrientation);
        window.removeEventListener('devicemotion', this.handleMotion);
        this.available = false;
    }

    private handleOrientation(event: DeviceOrientationEvent) {
        // iOS Safari webkitCompassHeading provides absolute heading
        let heading = event.alpha;
        let isAbsolute = event.absolute || false;

        if ((event as any).webkitCompassHeading !== undefined) {
            heading = (event as any).webkitCompassHeading;
            isAbsolute = true;
        }

        this.orientation = {
            alpha: heading,
            beta: event.beta,
            gamma: event.gamma,
            absolute: isAbsolute,
        };

        // Note: DeviceOrientation doesn't provide raw magnetometer field
        // Raw field would need to use Magnetometer API (not widely supported)
        if (isAbsolute && heading !== null) {
            // Magnetometer data available via webkitCompassHeading
        }
    }

    private handleMotion(event: DeviceMotionEvent) {
        const now = Date.now();

        // Track sampling interval
        if (this.lastMotionTime > 0) {
            const dt = now - this.lastMotionTime;
            // Exponential moving average
            this.sampleInterval = this.sampleInterval * 0.9 + dt * 0.1;
        }
        this.lastMotionTime = now;

        // Extract gyroscope (angular velocity in rad/s)
        const rotationRate = event.rotationRate;
        const gyro: Vector3 = {
            x: rotationRate?.alpha ? rotationRate.alpha * (Math.PI / 180) : 0, // deg/s to rad/s
            y: rotationRate?.beta ? rotationRate.beta * (Math.PI / 180) : 0,
            z: rotationRate?.gamma ? rotationRate.gamma * (Math.PI / 180) : 0,
        };

        // Extract accelerometer (m/s²)
        // acceleration = linear acceleration (gravity removed)
        // accelerationIncludingGravity = raw sensor reading
        const accel: Vector3 = {
            x: event.acceleration?.x || 0,
            y: event.acceleration?.y || 0,
            z: event.acceleration?.z || 0,
        };

        const accelWithGravity: Vector3 = {
            x: event.accelerationIncludingGravity?.x || 0,
            y: event.accelerationIncludingGravity?.y || 0,
            z: event.accelerationIncludingGravity?.z || 0,
        };

        // Create IMU sample
        const sample: IMUSample = {
            timestamp: now,
            gyro,
            accel,
            accelWithGravity,
        };

        // Store in ring buffer
        if (this.imuBuffer.length < IMU_BUFFER_SIZE) {
            this.imuBuffer.push(sample);
        } else {
            this.imuBuffer[this.imuBufferIndex] = sample;
            this.imuBufferIndex = (this.imuBufferIndex + 1) % IMU_BUFFER_SIZE;
        }

        this.latestIMU = sample;

        // Update legacy motion for compatibility
        this.motion = {
            accelX: accelWithGravity.x,
            accelY: accelWithGravity.y,
            accelZ: accelWithGravity.z,
        };
    }

    // ========================================================================
    // Public API for Sensor Fusion
    // ========================================================================

    /**
     * Get the most recent IMU sample
     */
    getLatestIMU(): IMUSample | null {
        return this.latestIMU;
    }

    /**
     * Get all IMU samples since a given timestamp
     * Ordered oldest-to-newest
     */
    getIMUSamplesSince(sinceTimestamp: number): IMUSample[] {
        return this.imuBuffer
            .filter(s => s.timestamp > sinceTimestamp)
            .sort((a, b) => a.timestamp - b.timestamp);
    }

    /**
     * Get the estimated IMU sampling rate (Hz)
     */
    getSampleRate(): number {
        if (this.sampleInterval <= 0) return 0;
        return 1000 / this.sampleInterval;
    }

    /**
     * Get magnetic heading (degrees, 0-360) if available
     * Returns null if magnetometer data is unavailable or uncalibrated
     */
    getMagneticHeading(): number | null {
        if (!this.orientation.absolute || this.orientation.alpha === null) {
            return null;
        }
        return this.orientation.alpha;
    }

    /**
     * Get pitch from device orientation (degrees)
     * Note: This is the browser's orientation estimate, not fused
     */
    getDevicePitch(): number | null {
        return this.orientation.beta;
    }

    /**
     * Get roll from device orientation (degrees)
     * Note: This is the browser's orientation estimate, not fused
     */
    getDeviceRoll(): number | null {
        return this.orientation.gamma;
    }

    /**
     * Get gravity vector estimate from accelerometer
     * Uses low-pass filtered acceleration including gravity
     * Returned in sensor frame (Y=up when device upright)
     */
    getGravityVector(): Vector3 | null {
        if (!this.latestIMU) return null;

        // When stationary, accelWithGravity ≈ gravity
        // We could apply low-pass filtering here
        return this.latestIMU.accelWithGravity;
    }

    // ========================================================================
    // Legacy API (for compatibility)
    // ========================================================================

    getHeadingString(): string {
        if (this.orientation.alpha === null) return "---°";
        return `${Math.round(this.orientation.alpha)}°`;
    }

    getPitchString(): string {
        if (this.orientation.beta === null) return "---°";
        return `${Math.round(this.orientation.beta)}°`;
    }

    getRollString(): string {
        if (this.orientation.gamma === null) return "---°";
        return `${Math.round(this.orientation.gamma)}°`;
    }
}
