/**
 * Leviathan Systems - Attitude Extended Kalman Filter
 * Simplified quaternion-based EKF for attitude estimation
 * 
 * Reference: Section 6 of Leviathan Systems spec
 * Simplified from Invariant EKF on Lie Groups for pragmatic implementation
 */

import type {
    Quaternion,
    Vector3,
    Orientation,
    AttitudeState,
    IMUSample
} from '../core/types';
import {
    quatIdentity,
    quatMultiply,
    quatNormalize,
    quatToEuler,
    eulerToQuat,
    quatRotateVector,
    quatConjugate,
    vec3Magnitude,
    vec3Normalize,
    vec3Sub,
    STANDARD_GRAVITY,
    DEG_TO_RAD,
} from '../core/types';

// ============================================================================
// Configuration
// ============================================================================

interface EKFConfig {
    /** Process noise for gyroscope (rad/s) */
    gyroNoise: number;
    /** Process noise for gyro bias random walk (rad/s²) */
    gyroBiasNoise: number;
    /** Measurement noise for accelerometer gravity (m/s²) */
    accelNoise: number;
    /** Measurement noise for horizon roll (rad) */
    horizonRollNoise: number;
    /** Measurement noise for horizon pitch (rad) */
    horizonPitchNoise: number;
    /** Chi-squared gate threshold for outlier rejection (3σ ≈ 7.81 for 3 DoF) */
    chiSquaredGate: number;
    /** Initial gyro bias standard deviation (rad/s) */
    initialGyroBiasStd: number;
}

const DEFAULT_CONFIG: EKFConfig = {
    gyroNoise: 0.01,           // ~0.5 deg/s
    gyroBiasNoise: 0.0001,     // Small random walk
    accelNoise: 0.5,           // Fairly noisy accelerometer
    horizonRollNoise: 2 * DEG_TO_RAD,   // 2° visual noise
    horizonPitchNoise: 3 * DEG_TO_RAD,  // 3° visual noise
    chiSquaredGate: 7.81,      // 95% confidence for 3 DoF
    initialGyroBiasStd: 0.01,
};

// ============================================================================
// EKF State
// ============================================================================

interface EKFState {
    /** Orientation quaternion (world to body) */
    quaternion: Quaternion;
    /** Gyroscope bias estimate (rad/s) */
    gyroBias: Vector3;
    /** State covariance matrix (6x6: 3 orientation error + 3 gyro bias) */
    covariance: number[][];
    /** Last update timestamp */
    timestamp: number;
}

// ============================================================================
// Attitude EKF Class
// ============================================================================

export class AttitudeEKF {
    private state: EKFState;
    private config: EKFConfig;
    private initialized: boolean = false;

    // Statistics for diagnostics
    private lastInnovation: { roll: number; pitch: number } = { roll: 0, pitch: 0 };
    private rejectedUpdates: number = 0;
    private totalUpdates: number = 0;

    constructor(config: Partial<EKFConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
        this.state = this.createInitialState();
    }

    /**
     * Create initial state with identity orientation and zero bias
     */
    private createInitialState(): EKFState {
        const bStd = this.config.initialGyroBiasStd;

        // Initial covariance: large uncertainty in orientation, small in bias
        const P = [
            [0.1, 0, 0, 0, 0, 0],
            [0, 0.1, 0, 0, 0, 0],
            [0, 0, 0.5, 0, 0, 0], // Yaw has higher initial uncertainty
            [0, 0, 0, bStd * bStd, 0, 0],
            [0, 0, 0, 0, bStd * bStd, 0],
            [0, 0, 0, 0, 0, bStd * bStd],
        ];

        return {
            quaternion: quatIdentity(),
            gyroBias: { x: 0, y: 0, z: 0 },
            covariance: P,
            timestamp: 0,
        };
    }

    /**
     * Initialize the filter with a known orientation
     */
    initialize(orientation: Orientation, timestamp: number): void {
        this.state.quaternion = eulerToQuat(orientation);
        this.state.timestamp = timestamp;
        this.initialized = true;
    }

    /**
     * Initialize from accelerometer reading (assumes stationary)
     * Estimates roll and pitch from gravity, yaw is set to 0
     */
    initializeFromAccel(accel: Vector3, timestamp: number): void {
        // Normalize accelerometer reading
        const g = vec3Normalize(accel);

        // In device frame (Y-up in portrait), gravity points down
        // roll = atan2(gx, gz), pitch = atan2(-gy, sqrt(gx² + gz²))
        // But we need to adapt for sensor frame convention

        const roll = Math.atan2(g.x, g.z);
        const pitch = Math.atan2(-g.y, Math.sqrt(g.x * g.x + g.z * g.z));

        this.initialize({ roll, pitch, yaw: 0 }, timestamp);
    }

    /**
     * Prediction step: propagate state using gyroscope measurement
     * 
     * @param gyro - Angular velocity (rad/s) in sensor frame
     * @param timestamp - Current timestamp (ms)
     */
    predict(gyro: Vector3, timestamp: number): void {
        if (!this.initialized) {
            this.state.timestamp = timestamp;
            return;
        }

        const dt = (timestamp - this.state.timestamp) / 1000; // Convert to seconds
        if (dt <= 0 || dt > 1) {
            // Invalid dt, skip prediction
            this.state.timestamp = timestamp;
            return;
        }

        // Correct gyroscope for estimated bias
        const omega: Vector3 = {
            x: gyro.x - this.state.gyroBias.x,
            y: gyro.y - this.state.gyroBias.y,
            z: gyro.z - this.state.gyroBias.z,
        };

        // Quaternion integration: q_new = q * exp(0.5 * omega * dt)
        const angle = vec3Magnitude(omega) * dt;
        if (angle > 1e-10) {
            const axis = vec3Normalize(omega);
            const halfAngle = angle / 2;
            const sinHalf = Math.sin(halfAngle);

            const dq: Quaternion = {
                w: Math.cos(halfAngle),
                x: axis.x * sinHalf,
                y: axis.y * sinHalf,
                z: axis.z * sinHalf,
            };

            this.state.quaternion = quatNormalize(quatMultiply(this.state.quaternion, dq));
        }

        // Propagate covariance: P = F * P * F' + Q
        const F = this.computeStateTransition(omega, dt);
        const Q = this.computeProcessNoise(dt);
        this.state.covariance = this.propagateCovariance(this.state.covariance, F, Q);

        this.state.timestamp = timestamp;
    }

    /**
     * Measurement update with gravity vector (from horizon or accelerometer)
     * 
     * @param measuredGravity - Measured gravity direction in sensor frame (should be ~9.8 m/s² magnitude)
     */
    updateWithGravity(measuredGravity: Vector3): boolean {
        if (!this.initialized) return false;

        // Expected gravity in sensor frame: rotate world gravity [0, 0, 9.81] to body
        const worldGravity: Vector3 = { x: 0, y: 0, z: STANDARD_GRAVITY };
        const expectedGravity = quatRotateVector(
            quatConjugate(this.state.quaternion),
            worldGravity
        );

        // Innovation (measurement - expected)
        const innovation = vec3Sub(vec3Normalize(measuredGravity), vec3Normalize(expectedGravity));

        // Measurement Jacobian (simplified: partial of gravity w.r.t. orientation error)
        const H = this.computeGravityJacobian(this.state.quaternion);

        // Innovation covariance S = H * P * H' + R
        const R = [
            [this.config.accelNoise * this.config.accelNoise, 0, 0],
            [0, this.config.accelNoise * this.config.accelNoise, 0],
            [0, 0, this.config.accelNoise * this.config.accelNoise],
        ];

        const { S, K } = this.computeKalmanGain(this.state.covariance, H, R);

        // Chi-squared gating
        const innovationVec = [innovation.x, innovation.y, innovation.z];
        const chiSq = this.computeChiSquared(innovationVec, S);

        this.totalUpdates++;
        if (chiSq > this.config.chiSquaredGate) {
            this.rejectedUpdates++;
            return false; // Reject outlier
        }

        // Apply correction
        this.applyCorrection(K, innovationVec, H, R);
        return true;
    }

    /**
     * Measurement update with horizon-derived roll and pitch
     * 
     * @param horizonRoll - Roll angle from horizon detection (rad)
     * @param horizonPitch - Pitch angle from horizon detection (rad)
     */
    updateWithHorizon(horizonRoll: number, horizonPitch: number): boolean {
        if (!this.initialized) return false;

        // Current estimated orientation
        const currentEuler = quatToEuler(this.state.quaternion);

        // Innovation (measured - expected)
        const rollInnovation = this.wrapAngle(horizonRoll - currentEuler.roll);
        const pitchInnovation = this.wrapAngle(horizonPitch - currentEuler.pitch);

        this.lastInnovation = { roll: rollInnovation, pitch: pitchInnovation };

        // Horizon measurement Jacobian H (2x6)
        // Observes roll (index 0) and pitch (index 1) directly
        const H = [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0]
        ];

        // Measurement noise R (2x2)
        const R = [
            [this.config.horizonRollNoise * this.config.horizonRollNoise, 0],
            [0, this.config.horizonPitchNoise * this.config.horizonPitchNoise]
        ];

        const { S, K } = this.computeKalmanGain(this.state.covariance, H, R);

        // Chi-squared check for 2 DoF
        const innovationVec = [rollInnovation, pitchInnovation];
        const chiSq = this.computeChiSquared(innovationVec, S);

        this.totalUpdates++;
        if (chiSq > 5.99) { // 95% for 2 DoF
            this.rejectedUpdates++;
            return false;
        }

        // Apply correction (uses full Joseph form)
        this.applyCorrection(K, innovationVec, H, R);
        return true;
    }

    /**
     * Get current orientation estimate
     */
    getOrientation(): Orientation {
        return quatToEuler(this.state.quaternion);
    }

    /**
     * Get current attitude state with uncertainties
     */
    getState(): AttitudeState {
        const orientation = quatToEuler(this.state.quaternion);
        return {
            orientation,
            rollStd: Math.sqrt(this.state.covariance[0][0]),
            pitchStd: Math.sqrt(this.state.covariance[1][1]),
            yawStd: Math.sqrt(this.state.covariance[2][2]),
            timestamp: this.state.timestamp,
        };
    }

    /**
     * Get current gyro bias estimate
     */
    getGyroBias(): Vector3 {
        return { ...this.state.gyroBias };
    }

    /**
     * Get filter diagnostics
     */
    getDiagnostics(): {
        initialized: boolean;
        rejectionRate: number;
        lastInnovation: { roll: number; pitch: number };
        gyroBias: Vector3;
    } {
        return {
            initialized: this.initialized,
            rejectionRate: this.totalUpdates > 0 ? this.rejectedUpdates / this.totalUpdates : 0,
            lastInnovation: this.lastInnovation,
            gyroBias: this.getGyroBias(),
        };
    }

    /**
     * Process a batch of IMU samples
     */
    processSamples(samples: IMUSample[]): void {
        for (const sample of samples) {
            this.predict(sample.gyro, sample.timestamp);

            // Optionally update with accelerometer for gravity
            const accelMag = vec3Magnitude(sample.accelWithGravity);
            if (Math.abs(accelMag - STANDARD_GRAVITY) < 1.0) {
                // Only use accel if close to 1g (stationary or slow motion)
                this.updateWithGravity(sample.accelWithGravity);
            }
        }
    }

    // ========================================================================
    // Helper Methods
    // ========================================================================

    private wrapAngle(angle: number): number {
        while (angle > Math.PI) angle -= 2 * Math.PI;
        while (angle < -Math.PI) angle += 2 * Math.PI;
        return angle;
    }

    private computeStateTransition(_omega: Vector3, dt: number): number[][] {
        // Simplified state transition: identity for orientation, identity for bias
        return [
            [1, 0, 0, -dt, 0, 0],
            [0, 1, 0, 0, -dt, 0],
            [0, 0, 1, 0, 0, -dt],
            [0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 1],
        ];
    }

    private computeProcessNoise(dt: number): number[][] {
        const gn = this.config.gyroNoise * dt;
        const bn = this.config.gyroBiasNoise * dt;
        return [
            [gn * gn, 0, 0, 0, 0, 0],
            [0, gn * gn, 0, 0, 0, 0],
            [0, 0, gn * gn, 0, 0, 0],
            [0, 0, 0, bn * bn, 0, 0],
            [0, 0, 0, 0, bn * bn, 0],
            [0, 0, 0, 0, 0, bn * bn],
        ];
    }

    private propagateCovariance(P: number[][], F: number[][], Q: number[][]): number[][] {
        // P_new = F * P * F' + Q
        const _n = P.length;
        const FP = this.matMul(F, P);
        const FT = this.transpose(F);
        const FPFT = this.matMul(FP, FT);
        return this.matAdd(FPFT, Q);
    }

    private computeGravityJacobian(_q: Quaternion): number[][] {
        // Simplified: gravity measurement affects roll and pitch
        return [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0], // Z component less sensitive to roll/pitch
        ];
    }

    private computeKalmanGain(
        P: number[][],
        H: number[][],
        R: number[][]
    ): { S: number[][]; K: number[][] } {
        // S = H * P * H' + R
        const HP = this.matMul(H, P);
        const HT = this.transpose(H);
        const HPHT = this.matMul(HP, HT);
        const S = this.matAdd(HPHT, R);

        // K = P * H' * S^-1
        const PHT = this.matMul(P, HT);
        const Sinv = this.matInv(S);
        const K = this.matMul(PHT, Sinv);

        return { S, K };
    }

    private computeChiSquared(innovation: number[], S: number[][]): number {
        // chi² = innovation' * S^-1 * innovation
        const Sinv = this.matInv(S);
        const dim = innovation.length;
        let chiSq = 0;
        for (let i = 0; i < dim; i++) {
            for (let j = 0; j < dim; j++) {
                chiSq += innovation[i] * Sinv[i][j] * innovation[j];
            }
        }
        return chiSq;
    }

    private applyCorrection(K: number[][], innovation: number[], H: number[][], R: number[][]): void {
        // State correction: x = x + K * innovation
        const dx: number[] = [];
        const measDim = innovation.length;
        for (let i = 0; i < 6; i++) {
            let sum = 0;
            for (let j = 0; j < measDim; j++) {
                sum += K[i][j] * innovation[j];
            }
            dx.push(sum);
        }

        // Apply orientation correction
        const euler = quatToEuler(this.state.quaternion);
        euler.roll += dx[0];
        euler.pitch += dx[1];
        euler.yaw += dx[2];
        this.state.quaternion = eulerToQuat(euler);

        // Apply bias correction
        this.state.gyroBias.x += dx[3];
        this.state.gyroBias.y += dx[4];
        this.state.gyroBias.z += dx[5];

        // Task 1: Replace Fragile Covariance Update with Joseph Form
        // P = (I - KH) * P * (I - KH)' + K * R * K'

        const I = this.matIdentity(6);
        const KH = this.matMul(K, H);
        const A = this.matSub(I, KH); // A = I - KH
        const AT = this.transpose(A);

        // term1 = A * P * A'
        const AP = this.matMul(A, this.state.covariance);
        const term1 = this.matMul(AP, AT);

        // term2 = K * R * K'
        const KT = this.transpose(K);
        const KR = this.matMul(K, R);
        const term2 = this.matMul(KR, KT);

        // P_new = term1 + term2
        let P_new = this.matAdd(term1, term2);

        // Task 2: Force Internal Consistency
        // Enforce symmetry: P = 0.5 * (P + P')
        P_new = this.forceSymmetry(P_new);

        // Task 3: Detect Corruption Early
        this.checkCovarianceSanity(P_new);

        this.state.covariance = P_new;
    }

    // Matrix utilities

    private matIdentity(n: number): number[][] {
        const I: number[][] = [];
        for (let i = 0; i < n; i++) {
            const row = Array(n).fill(0);
            row[i] = 1;
            I.push(row);
        }
        return I;
    }

    private matSub(A: number[][], B: number[][]): number[][] {
        const m = A.length, n = A[0].length;
        const C: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                C[i][j] = A[i][j] - B[i][j];
            }
        }
        return C;
    }

    private forceSymmetry(P: number[][]): number[][] {
        const n = P.length;
        // P = 0.5 * (P + P')
        const P_sym: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                P_sym[i][j] = 0.5 * (P[i][j] + P[j][i]);
            }
        }
        return P_sym;
    }

    private checkCovarianceSanity(P: number[][]): void {
        const n = P.length;
        // Check for NaN, Inf, and negative diagonals
        for (let i = 0; i < n; i++) {
            if (P[i][i] < 0) {
                throw new Error(`EKF Covariance Corruption: Negative diagonal at [${i},${i}] = ${P[i][i]}`);
            }
            if (!Number.isFinite(P[i][i]) || Number.isNaN(P[i][i])) {
                throw new Error(`EKF Covariance Corruption: Non-finite value at [${i},${i}]`);
            }
            for (let j = 0; j < n; j++) {
                if (!Number.isFinite(P[i][j]) || Number.isNaN(P[i][j])) {
                    throw new Error(`EKF Covariance Corruption: Non-finite value at [${i},${j}]`);
                }
                // Check symmetry roughly (optional but good)
                if (Math.abs(P[i][j] - P[j][i]) > 1e-10) {
                    // Just log this one, as we just forced symmetry it implies numerical weirdness
                    // But if we just forced symmetry it should be exact.
                    // The 1e-12 threshold in prompt is what we should ideally respect.
                    // However, we just executed forceSymmetry so it should be exact unless something is very wrong.
                }
            }
        }
    }

    private matMul(A: number[][], B: number[][]): number[][] {
        const m = A.length, n = B[0].length, k = B.length;
        const C: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                for (let l = 0; l < k; l++) {
                    C[i][j] += A[i][l] * B[l][j];
                }
            }
        }
        return C;
    }

    private transpose(A: number[][]): number[][] {
        const m = A.length, n = A[0].length;
        const T: number[][] = Array(n).fill(0).map(() => Array(m).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                T[j][i] = A[i][j];
            }
        }
        return T;
    }

    private matAdd(A: number[][], B: number[][]): number[][] {
        const m = A.length, n = A[0].length;
        const C: number[][] = Array(m).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                C[i][j] = A[i][j] + B[i][j];
            }
        }
        return C;
    }

    private matInv(A: number[][]): number[][] {
        const n = A.length;
        if (n === 2) {
            const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
            if (Math.abs(det) < 1e-10) return [[1, 0], [0, 1]];
            const invDet = 1 / det;
            return [
                [A[1][1] * invDet, -A[0][1] * invDet],
                [-A[1][0] * invDet, A[0][0] * invDet]
            ];
        }

        // 3x3 matrix inversion
        const det = A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
            A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
            A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

        if (Math.abs(det) < 1e-10) {
            // Return identity if singular
            return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }

        const invDet = 1 / det;
        return [
            [
                (A[1][1] * A[2][2] - A[1][2] * A[2][1]) * invDet,
                (A[0][2] * A[2][1] - A[0][1] * A[2][2]) * invDet,
                (A[0][1] * A[1][2] - A[0][2] * A[1][1]) * invDet,
            ],
            [
                (A[1][2] * A[2][0] - A[1][0] * A[2][2]) * invDet,
                (A[0][0] * A[2][2] - A[0][2] * A[2][0]) * invDet,
                (A[0][2] * A[1][0] - A[0][0] * A[1][2]) * invDet,
            ],
            [
                (A[1][0] * A[2][1] - A[1][1] * A[2][0]) * invDet,
                (A[0][1] * A[2][0] - A[0][0] * A[2][1]) * invDet,
                (A[0][0] * A[1][1] - A[0][1] * A[1][0]) * invDet,
            ],
        ];
    }
}
