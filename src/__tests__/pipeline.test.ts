/**
 * Leviathan Systems - Full Pipeline Integration Tests
 * 
 * Simulates iPhone-like conditions and tests the complete pipeline:
 * Camera → Horizon Detection → EKF Fusion → HUD Rendering
 * 
 * Run with: runPipelineTests() in browser console
 */

import { HorizonDetector } from '../vision/horizon';
import { AttitudeEKF } from '../fusion/ekf';
import { HUDRenderer } from '../ui/hud';
import { SensorManager } from '../core/sensors';
import { IntrinsicsManager } from '../core/intrinsics';
import { VisualCompass } from '../nav/compass';
import { BlowLocalizer } from '../core/localization';
import type { IntrinsicMatrix, HorizonLine, Orientation, HeadingEstimate } from '../core/types';
import { STANDARD_GRAVITY, DEG_TO_RAD, RAD_TO_DEG } from '../core/types';

// ============================================================================
// Test Utilities
// ============================================================================

/**
 * Create iPhone 14 Pro camera intrinsics (main wide camera)
 */
function createiPhoneIntrinsics(): IntrinsicMatrix {
    // iPhone 14 Pro main: 24mm equiv, ~1.22 μm sensor pixels
    // At 1920x1080 video: fx ≈ 1500, fy ≈ 1500
    return {
        fx: 1500,
        fy: 1500,
        cx: 960,
        cy: 540,
        width: 1920,
        height: 1080,
    };
}

/**
 * Create synthetic sea-sky image with precise horizon line
 */
function createSeaSkyImage(
    width: number,
    height: number,
    horizonY: number,
    rollDeg: number = 0,
    addNoise: boolean = false
): ImageData {
    const data = new Uint8ClampedArray(width * height * 4);
    const rollRad = rollDeg * DEG_TO_RAD;
    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Apply roll rotation
            const dx = x - cx;
            const dy = y - cy;
            const yRotated = -dx * Math.sin(rollRad) + dy * Math.cos(rollRad) + cy;

            const idx = (y * width + x) * 4;

            // Add gradient and noise for realism
            const noise = addNoise ? Math.random() * 20 - 10 : 0;

            if (yRotated < horizonY) {
                // Sky: blue gradient from light to medium
                const skyGrad = Math.max(0, Math.min(1, (horizonY - yRotated) / horizonY));
                data[idx] = Math.min(255, 100 + skyGrad * 50 + noise);     // R
                data[idx + 1] = Math.min(255, 160 + skyGrad * 50 + noise); // G
                data[idx + 2] = Math.min(255, 220 + skyGrad * 20 + noise); // B
                data[idx + 3] = 255; // A
            } else {
                // Sea: dark blue-green gradient
                const seaGrad = Math.max(0, Math.min(1, (yRotated - horizonY) / (height - horizonY)));
                data[idx] = Math.min(255, 10 + seaGrad * 20 + noise);      // R
                data[idx + 1] = Math.min(255, 50 + seaGrad * 50 + noise);  // G
                data[idx + 2] = Math.min(255, 80 + seaGrad * 40 + noise);  // B
                data[idx + 3] = 255; // A
            }
        }
    }

    return new ImageData(data, width, height);
}

/**
 * Simulate iPhone IMU data at 100Hz for a given duration
 */
function generateIMUSequence(
    durationMs: number,
    rollDeg: number = 0,
    pitchDeg: number = 0,
    yawRateDegPerSec: number = 0
): Array<{ timestamp: number; gyro: { x: number; y: number; z: number }; accelWithGravity: { x: number; y: number; z: number } }> {
    const samples = [];
    const intervalMs = 10; // 100Hz
    const startTime = Date.now();

    const rollRad = rollDeg * DEG_TO_RAD;
    const pitchRad = pitchDeg * DEG_TO_RAD;
    const yawRateRad = yawRateDegPerSec * DEG_TO_RAD;

    for (let t = 0; t < durationMs; t += intervalMs) {
        // Gravity vector rotated by roll/pitch
        const g = STANDARD_GRAVITY;
        const gx = g * Math.sin(rollRad);
        const gy = -g * Math.sin(pitchRad) * Math.cos(rollRad);
        const gz = g * Math.cos(pitchRad) * Math.cos(rollRad);

        samples.push({
            timestamp: startTime + t,
            gyro: { x: 0, y: 0, z: yawRateRad },
            accel: { x: 0, y: 0, z: 0 },
            accelWithGravity: { x: gx, y: gy, z: gz },
        });
    }

    return samples;
}

// ============================================================================
// Integration Tests
// ============================================================================

export interface TestResult {
    name: string;
    passed: boolean;
    message: string;
    details?: Record<string, any>;
}

export function runPipelineTests(): { passed: number; failed: number; results: TestResult[] } {
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #00BCD4');
    console.log('%c  🌊 Leviathan Pipeline Integration Tests', 'color: #00BCD4; font-weight: bold; font-size: 18px');
    console.log('%c  Simulating iPhone at Sea', 'color: #00BCD4');
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #00BCD4');

    const results: TestResult[] = [];
    let passed = 0;
    let failed = 0;

    function addResult(result: TestResult) {
        results.push(result);
        if (result.passed) {
            console.log(`✅ ${result.name}: ${result.message}`);
            passed++;
        } else {
            console.log(`❌ ${result.name}: ${result.message}`);
            if (result.details) {
                console.log('   Details:', result.details);
            }
            failed++;
        }
    }

    // ========================================================================
    // TEST 1: Horizon Detection - Level Horizon
    // ========================================================================
    console.log('\n%c📐 Test Group 1: Horizon Detection', 'color: #2196F3; font-weight: bold');

    try {
        const detector = new HorizonDetector();
        const intrinsics = createiPhoneIntrinsics();

        // Create level horizon image (horizon at center)
        const image = createSeaSkyImage(640, 480, 240, 0, true);
        const result = detector.detect(image, intrinsics, 3);

        if (result.horizon) {
            const rollDeg = result.horizon.roll * RAD_TO_DEG;
            const pitchDeg = result.horizon.pitch * RAD_TO_DEG;

            addResult({
                name: 'Level Horizon Detection',
                passed: Math.abs(rollDeg) < 5 && Math.abs(pitchDeg) < 15,
                message: `Roll: ${rollDeg.toFixed(1)}°, Pitch: ${pitchDeg.toFixed(1)}°, Conf: ${result.horizon.confidence.toFixed(2)}`,
                details: { roll: rollDeg, pitch: pitchDeg, confidence: result.horizon.confidence }
            });
        } else {
            addResult({
                name: 'Level Horizon Detection',
                passed: false,
                message: `Failed: ${result.failureReason}`,
            });
        }
    } catch (e) {
        addResult({ name: 'Level Horizon Detection', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 2: Horizon Detection - Tilted 15° Roll
    // ========================================================================
    try {
        const detector = new HorizonDetector();
        const intrinsics = createiPhoneIntrinsics();

        const image = createSeaSkyImage(640, 480, 240, 15, true);
        const result = detector.detect(image, intrinsics, 3);

        if (result.horizon) {
            const rollDeg = result.horizon.roll * RAD_TO_DEG;
            // Image roll of 15° should give -15° detected roll (image tilted right = ship rolled left)
            const expectedRoll = -15;

            addResult({
                name: 'Tilted Horizon (15°)',
                passed: Math.abs(rollDeg - expectedRoll) < 8,
                message: `Detected: ${rollDeg.toFixed(1)}°, Expected: ~${expectedRoll}°`,
                details: { detected: rollDeg, expected: expectedRoll }
            });
        } else {
            addResult({
                name: 'Tilted Horizon (15°)',
                passed: false,
                message: `Failed: ${result.failureReason}`,
            });
        }
    } catch (e) {
        addResult({ name: 'Tilted Horizon (15°)', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 3: EKF Initialization from Gravity
    // ========================================================================
    console.log('\n%c🧭 Test Group 2: EKF Sensor Fusion', 'color: #FF9800; font-weight: bold');

    try {
        const ekf = new AttitudeEKF();

        // Simulate device tilted 10° roll, 5° pitch
        const rollRad = 10 * DEG_TO_RAD;
        const pitchRad = 5 * DEG_TO_RAD;
        const g = STANDARD_GRAVITY;
        const accel = {
            x: g * Math.sin(rollRad),
            y: -g * Math.sin(pitchRad),
            z: g * Math.cos(rollRad) * Math.cos(pitchRad)
        };

        ekf.initializeFromAccel(accel, Date.now());
        const state = ekf.getState();
        const detectedRoll = state.orientation.roll * RAD_TO_DEG;
        const detectedPitch = state.orientation.pitch * RAD_TO_DEG;

        addResult({
            name: 'EKF Init from Gravity',
            passed: Math.abs(detectedRoll - 10) < 5 && Math.abs(detectedPitch - 5) < 5,
            message: `Roll: ${detectedRoll.toFixed(1)}° (exp 10°), Pitch: ${detectedPitch.toFixed(1)}° (exp 5°)`,
            details: { roll: detectedRoll, pitch: detectedPitch }
        });
    } catch (e) {
        addResult({ name: 'EKF Init from Gravity', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 4: EKF Gyro Integration
    // ========================================================================
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();

        // Start level
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Rotate at 10°/s yaw for 1 second = 10° total
        const yawRateRad = 10 * DEG_TO_RAD;
        for (let t = 0; t < 1000; t += 10) {
            ekf.predict({ x: 0, y: 0, z: yawRateRad }, now + t);
        }

        const state = ekf.getState();
        const yawDeg = state.orientation.yaw * RAD_TO_DEG;

        addResult({
            name: 'EKF Gyro Integration',
            passed: Math.abs(yawDeg - 10) < 3,
            message: `Yaw after 1s @ 10°/s: ${yawDeg.toFixed(1)}° (exp ~10°)`,
            details: { yaw: yawDeg, expected: 10 }
        });
    } catch (e) {
        addResult({ name: 'EKF Gyro Integration', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 5: EKF + Horizon Fusion
    // ========================================================================
    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();

        // Start with wrong attitude
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Feed "true" horizon measurements at 5° roll
        const trueRollRad = 5 * DEG_TO_RAD;
        const truePitchRad = 2 * DEG_TO_RAD;

        // Simulate 50 horizon updates (5 seconds at 10Hz)
        for (let i = 0; i < 50; i++) {
            ekf.predict({ x: 0, y: 0, z: 0 }, now + i * 100);
            ekf.updateWithHorizon(trueRollRad, truePitchRad);
        }

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;
        const pitchDeg = state.orientation.pitch * RAD_TO_DEG;

        addResult({
            name: 'EKF + Horizon Fusion',
            passed: Math.abs(rollDeg - 5) < 2 && Math.abs(pitchDeg - 2) < 2,
            message: `Converged to Roll: ${rollDeg.toFixed(1)}° (exp 5°), Pitch: ${pitchDeg.toFixed(1)}° (exp 2°)`,
            details: { roll: rollDeg, pitch: pitchDeg, rollStd: state.rollStd * RAD_TO_DEG, pitchStd: state.pitchStd * RAD_TO_DEG }
        });
    } catch (e) {
        addResult({ name: 'EKF + Horizon Fusion', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 6: Full Pipeline - Horizon → EKF → State
    // ========================================================================
    console.log('\n%c🔗 Test Group 3: Full Pipeline Integration', 'color: #9C27B0; font-weight: bold');

    try {
        const detector = new HorizonDetector();
        const ekf = new AttitudeEKF();
        const intrinsics = createiPhoneIntrinsics();
        const now = Date.now();

        // Initialize EKF
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Create image with 8° roll
        const targetRoll = 8;
        const image = createSeaSkyImage(640, 480, 240, targetRoll, true);

        // Detect horizon
        const horizonResult = detector.detect(image, intrinsics, 3);

        if (horizonResult.horizon) {
            // Feed to EKF multiple times to converge
            for (let i = 0; i < 20; i++) {
                ekf.predict({ x: 0, y: 0, z: 0 }, now + i * 100);
                ekf.updateWithHorizon(horizonResult.horizon.roll, horizonResult.horizon.pitch);
            }

            const state = ekf.getState();
            const fusedRoll = state.orientation.roll * RAD_TO_DEG;
            // Expected: negative of image roll
            const expectedRoll = -targetRoll;

            addResult({
                name: 'Full Pipeline (Image → EKF)',
                passed: Math.abs(fusedRoll - expectedRoll) < 5,
                message: `Image: ${targetRoll}° roll → Horizon: ${(horizonResult.horizon.roll * RAD_TO_DEG).toFixed(1)}° → EKF: ${fusedRoll.toFixed(1)}°`,
                details: {
                    imageRoll: targetRoll,
                    horizonRoll: horizonResult.horizon.roll * RAD_TO_DEG,
                    ekfRoll: fusedRoll,
                    expected: expectedRoll
                }
            });
        } else {
            addResult({
                name: 'Full Pipeline (Image → EKF)',
                passed: false,
                message: `Horizon detection failed: ${horizonResult.failureReason}`,
            });
        }
    } catch (e) {
        addResult({ name: 'Full Pipeline (Image → EKF)', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 7: Blow Localization with Known Heading
    // ========================================================================
    console.log('\n%c📍 Test Group 4: Localization', 'color: #4CAF50; font-weight: bold');

    try {
        const localizer = new BlowLocalizer();
        const intrinsics = createiPhoneIntrinsics();

        // Set observer at known position (San Francisco Bay)
        localizer.setObserverPosition({ latitude: 37.8, longitude: -122.4 });

        // Mock detection at center of frame
        const detection = {
            x: 0.5, y: 0.5, w: 0.05, h: 0.1,
            confidence: 0.9, classId: 0, label: 'whale_blow'
        };

        // Mock heading: looking due North
        const heading: HeadingEstimate = {
            heading: 0, source: 'magnetometer', confidence: 0.8, uncertainty: 5
        };

        // Mock orientation: level
        const orientation: Orientation = { roll: 0, pitch: 0, yaw: 0 };

        const location = localizer.localize(detection, intrinsics, heading, orientation, 1.0);

        if (location) {
            // Blow should be north of observer
            const latDiff = location.position.latitude - 37.8;

            addResult({
                name: 'Blow Localization',
                passed: latDiff > 0 && location.bearing >= 355 || location.bearing <= 5,
                message: `Distance: ${location.distance}m, Bearing: ${location.bearing}°, Lat diff: ${(latDiff * 111000).toFixed(0)}m`,
                details: {
                    distance: location.distance,
                    bearing: location.bearing,
                    position: location.position
                }
            });
        } else {
            addResult({
                name: 'Blow Localization',
                passed: false,
                message: 'Localization returned null',
            });
        }
    } catch (e) {
        addResult({ name: 'Blow Localization', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 8: Sensor Mock Mode
    // ========================================================================
    console.log('\n%c📱 Test Group 5: Mock Sensors (Desktop Simulation)', 'color: #E91E63; font-weight: bold');

    try {
        const sensors = new SensorManager();
        sensors.startMockMode();

        // Wait a bit for mock data to generate
        const startTime = Date.now();
        while (Date.now() - startTime < 100) {
            // Busy wait
        }

        const imu = sensors.getLatestIMU();
        sensors.stopMockMode();

        if (imu) {
            const gMag = Math.sqrt(
                imu.accelWithGravity.x ** 2 +
                imu.accelWithGravity.y ** 2 +
                imu.accelWithGravity.z ** 2
            );

            addResult({
                name: 'Mock Sensor Generation',
                passed: Math.abs(gMag - STANDARD_GRAVITY) < 0.5,
                message: `Generated IMU data, |g| = ${gMag.toFixed(2)} m/s² (expected ~9.81)`,
                details: { gravity: gMag, sample: imu }
            });
        } else {
            addResult({
                name: 'Mock Sensor Generation',
                passed: false,
                message: 'No IMU data generated',
            });
        }
    } catch (e) {
        addResult({ name: 'Mock Sensor Generation', passed: false, message: `Exception: ${e}` });
    }

    // ========================================================================
    // TEST 9: Numerical Stability Under Stress
    // ========================================================================
    console.log('\n%c⚡ Test Group 6: Stress Tests', 'color: #FF5722; font-weight: bold');

    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // Run 10,000 iterations with random inputs
        for (let i = 0; i < 10000; i++) {
            const gyro = {
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2,
            };
            ekf.predict(gyro, now + i * 10);

            if (i % 10 === 0) {
                ekf.updateWithHorizon(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.2
                );
            }
        }

        const state = ekf.getState();
        const isStable =
            isFinite(state.orientation.roll) &&
            isFinite(state.orientation.pitch) &&
            isFinite(state.orientation.yaw) &&
            state.rollStd > 0 && isFinite(state.rollStd) &&
            state.pitchStd > 0 && isFinite(state.pitchStd);

        addResult({
            name: 'EKF 10K Iteration Stress',
            passed: isStable,
            message: isStable ? 'Stable after 10,000 iterations' : 'UNSTABLE - NaN or Inf detected',
            details: {
                roll: state.orientation.roll * RAD_TO_DEG,
                pitch: state.orientation.pitch * RAD_TO_DEG,
                rollStd: state.rollStd * RAD_TO_DEG,
                pitchStd: state.pitchStd * RAD_TO_DEG
            }
        });
    } catch (e) {
        addResult({ name: 'EKF 10K Iteration Stress', passed: false, message: `Exception (likely covariance issue): ${e}` });
    }

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n%c═══════════════════════════════════════════════════════════', 'color: #00BCD4');
    if (failed === 0) {
        console.log(`%c✅ ALL ${passed} TESTS PASSED!`, 'color: #4CAF50; font-weight: bold; font-size: 16px');
    } else {
        console.log(`%c❌ ${failed}/${passed + failed} TESTS FAILED`, 'color: #f44336; font-weight: bold; font-size: 16px');
        console.log('%cFailing tests indicate pipeline issues that need fixing.', 'color: #f44336');
    }
    console.log('%c═══════════════════════════════════════════════════════════', 'color: #00BCD4');

    return { passed, failed, results };
}

// Export for browser console
if (typeof window !== 'undefined') {
    (window as any).runPipelineTests = runPipelineTests;
    console.log('🧪 Pipeline tests loaded. Run `runPipelineTests()` in console.');
}
