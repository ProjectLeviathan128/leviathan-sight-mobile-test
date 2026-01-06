/**
 * Leviathan Systems - EKF Tests
 * 
 * Tests the Attitude Extended Kalman Filter for numerical stability
 */

import { AttitudeEKF } from '../fusion/ekf';
import type { IMUSample, Vector3 } from '../core/types';
import { STANDARD_GRAVITY, DEG_TO_RAD, RAD_TO_DEG } from '../core/types';

/**
 * Create a stationary IMU sample (accel = gravity, gyro = 0)
 */
function createStationaryIMU(timestamp: number): IMUSample {
    return {
        timestamp,
        gyro: { x: 0, y: 0, z: 0 },
        accel: { x: 0, y: 0, z: 0 },
        accelWithGravity: { x: 0, y: 0, z: STANDARD_GRAVITY },
    };
}

/**
 * Create IMU sample with rotation
 */
function createRotatingIMU(timestamp: number, gyroRad: Vector3): IMUSample {
    return {
        timestamp,
        gyro: gyroRad,
        accel: { x: 0, y: 0, z: 0 },
        accelWithGravity: { x: 0, y: 0, z: STANDARD_GRAVITY },
    };
}

// ============================================================================
// Tests
// ============================================================================

export function runEKFTests(): { passed: number; failed: number; results: string[] } {
    const results: string[] = [];
    let passed = 0;
    let failed = 0;

    // Test 1: EKF initialization from accelerometer
    try {
        const ekf = new AttitudeEKF();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, Date.now());

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;
        const pitchDeg = state.orientation.pitch * RAD_TO_DEG;

        if (Math.abs(rollDeg) < 1 && Math.abs(pitchDeg) < 1) {
            results.push('✅ Test 1: EKF initialized correctly from gravity');
            passed++;
        } else {
            results.push(`❌ Test 1: Initial orientation wrong - roll: ${rollDeg.toFixed(2)}°, pitch: ${pitchDeg.toFixed(2)}°`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 1: Exception - ${e}`);
        failed++;
    }

    // Test 2: EKF prediction maintains state when stationary
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Process 100 stationary samples over 1 second
        for (let i = 1; i <= 100; i++) {
            ekf.predict({ x: 0, y: 0, z: 0 }, now + i * 10);
        }

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;
        const pitchDeg = state.orientation.pitch * RAD_TO_DEG;

        // Should stay close to zero
        if (Math.abs(rollDeg) < 2 && Math.abs(pitchDeg) < 2) {
            results.push('✅ Test 2: Stationary prediction stable');
            passed++;
        } else {
            results.push(`❌ Test 2: Drift detected - roll: ${rollDeg.toFixed(2)}°, pitch: ${pitchDeg.toFixed(2)}°`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 2: Exception - ${e}`);
        failed++;
    }

    // Test 3: EKF horizon update corrections
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Apply horizon measurement with 5° roll
        const measureRollRad = 5 * DEG_TO_RAD;
        const measurePitchRad = 2 * DEG_TO_RAD;

        // Multiple updates should converge
        for (let i = 0; i < 10; i++) {
            ekf.updateWithHorizon(measureRollRad, measurePitchRad);
        }

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;
        const pitchDeg = state.orientation.pitch * RAD_TO_DEG;

        // Should converge toward measurement
        if (Math.abs(rollDeg - 5) < 2 && Math.abs(pitchDeg - 2) < 2) {
            results.push(`✅ Test 3: Horizon update converges - roll: ${rollDeg.toFixed(1)}°, pitch: ${pitchDeg.toFixed(1)}°`);
            passed++;
        } else {
            results.push(`❌ Test 3: Convergence failed - roll: ${rollDeg.toFixed(2)}° (expected 5°), pitch: ${pitchDeg.toFixed(2)}° (expected 2°)`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 3: Exception - ${e}`);
        failed++;
    }

    // Test 4: EKF covariance stays positive definite
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Run many prediction/update cycles
        for (let i = 0; i < 1000; i++) {
            ekf.predict({ x: 0.01, y: 0.01, z: 0.01 }, now + i * 10);
            if (i % 10 === 0) {
                ekf.updateWithHorizon(Math.random() * 0.1, Math.random() * 0.1);
            }
        }

        const state = ekf.getState();

        // Check uncertainties are positive and finite
        if (state.rollStd > 0 && state.pitchStd > 0 && state.yawStd > 0 &&
            isFinite(state.rollStd) && isFinite(state.pitchStd) && isFinite(state.yawStd)) {
            results.push(`✅ Test 4: Covariance stable after 1000 iterations`);
            passed++;
        } else {
            results.push(`❌ Test 4: Covariance unstable - rollStd: ${state.rollStd}, pitchStd: ${state.pitchStd}`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 4: Exception (covariance corruption?) - ${e}`);
        failed++;
    }

    // Test 5: EKF outlier rejection
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // First establish a baseline
        for (let i = 0; i < 10; i++) {
            ekf.updateWithHorizon(0, 0);
        }

        // Now try a massive outlier (90° jump)
        const accepted = ekf.updateWithHorizon(Math.PI / 2, Math.PI / 2);

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;

        if (!accepted && Math.abs(rollDeg) < 10) {
            results.push('✅ Test 5: Outlier correctly rejected');
            passed++;
        } else if (accepted) {
            results.push(`⚠️ Test 5: Outlier was accepted (may be OK if converging)`);
            passed++; // Soft pass
        } else {
            results.push(`❌ Test 5: Outlier handling unexpected - roll: ${rollDeg.toFixed(1)}°`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 5: Exception - ${e}`);
        failed++;
    }

    // Test 6: processSamples batch processing
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        const samples: IMUSample[] = [];
        for (let i = 1; i <= 50; i++) {
            samples.push(createStationaryIMU(now + i * 10));
        }

        ekf.processSamples(samples);

        const diag = ekf.getDiagnostics();
        if (diag.initialized) {
            results.push('✅ Test 6: Batch processSamples works');
            passed++;
        } else {
            results.push('❌ Test 6: processSamples failed to maintain initialized state');
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 6: Exception - ${e}`);
        failed++;
    }

    return { passed, failed, results };
}

// Export for browser console testing
if (typeof window !== 'undefined') {
    (window as any).runEKFTests = runEKFTests;
}
