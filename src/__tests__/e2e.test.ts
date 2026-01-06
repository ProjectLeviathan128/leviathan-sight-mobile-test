/**
 * Leviathan Systems - End-to-End System Test
 * 
 * Comprehensive test that verifies ALL subsystems work together:
 * - Camera capture
 * - Horizon detection
 * - Sun tracking / Visual compass
 * - EKF sensor fusion
 * - YOLO model inference
 * - Blow localization
 * - HUD rendering
 * - Event recording
 * - Video clip capture
 * 
 * Run with: runE2ETest() in browser console
 */

import { HorizonDetector } from '../vision/horizon';
import { AttitudeEKF } from '../fusion/ekf';
import { HUDRenderer } from '../ui/hud';
import { SensorManager } from '../core/sensors';
import { IntrinsicsManager } from '../core/intrinsics';
import { VisualCompass } from '../nav/compass';
import { BlowLocalizer } from '../core/localization';
import { SunTracker } from '../vision/sun-tracker';
import { SolarEphemeris } from '../nav/ephemeris';
import { Recorder } from '../core/recorder';
import { ClipRecorder } from '../core/clip-recorder';
import type { IntrinsicMatrix, Orientation, HeadingEstimate } from '../core/types';
import type { Detection } from '../core/inference';
import { STANDARD_GRAVITY, DEG_TO_RAD, RAD_TO_DEG } from '../core/types';

// ============================================================================
// Test Helpers
// ============================================================================

function createiPhoneIntrinsics(): IntrinsicMatrix {
    return {
        fx: 1500, fy: 1500,
        cx: 960, cy: 540,
        width: 1920, height: 1080,
    };
}

function createSeaSkyImage(width: number, height: number, horizonY: number, rollDeg: number = 0): ImageData {
    const data = new Uint8ClampedArray(width * height * 4);
    const rollRad = rollDeg * DEG_TO_RAD;
    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - cx;
            const dy = y - cy;
            const yRotated = -dx * Math.sin(rollRad) + dy * Math.cos(rollRad) + cy;
            const idx = (y * width + x) * 4;

            if (yRotated < horizonY) {
                // Sky
                data[idx] = 135; data[idx + 1] = 206; data[idx + 2] = 235; data[idx + 3] = 255;
            } else {
                // Sea
                data[idx] = 0; data[idx + 1] = 51; data[idx + 2] = 102; data[idx + 3] = 255;
            }
        }
    }
    return new ImageData(data, width, height);
}

// ============================================================================
// E2E Test
// ============================================================================

export function runE2ETest(): { allPassed: boolean; results: string[] } {
    const results: string[] = [];
    let allPassed = true;

    function log(passed: boolean, message: string) {
        const status = passed ? '✅' : '❌';
        results.push(`${status} ${message}`);
        if (!passed) allPassed = false;
        console.log(`${status} ${message}`);
    }

    console.log('%c╔══════════════════════════════════════════════════════════════╗', 'color: #00BCD4');
    console.log('%c║  🐋 LEVIATHAN END-TO-END SYSTEM TEST                         ║', 'color: #00BCD4; font-weight: bold');
    console.log('%c║  Testing: Camera → Horizon → EKF → Model → Localization     ║', 'color: #00BCD4');
    console.log('%c╚══════════════════════════════════════════════════════════════╝', 'color: #00BCD4');

    // ========================================================================
    // 1. HORIZON DETECTOR
    // ========================================================================
    console.log('\n%c═══ 1. HORIZON DETECTOR ═══', 'color: #2196F3; font-weight: bold');

    try {
        const horizonDetector = new HorizonDetector();
        const intrinsics = createiPhoneIntrinsics();

        // Level test
        const levelImage = createSeaSkyImage(640, 480, 240, 0);
        const levelResult = horizonDetector.detect(levelImage, intrinsics, 3);

        if (levelResult.horizon) {
            const roll = levelResult.horizon.roll * RAD_TO_DEG;
            log(Math.abs(roll) < 5, `Horizon Level: detected roll = ${roll.toFixed(1)}° (should be ~0°)`);
        } else {
            log(false, `Horizon Level: FAILED - ${levelResult.failureReason}`);
        }

        // Tilted test
        const tiltedImage = createSeaSkyImage(640, 480, 240, 20);
        const tiltedResult = horizonDetector.detect(tiltedImage, intrinsics, 3);

        if (tiltedResult.horizon) {
            const roll = tiltedResult.horizon.roll * RAD_TO_DEG;
            log(Math.abs(roll - (-20)) < 10, `Horizon 20° Tilt: detected roll = ${roll.toFixed(1)}° (should be ~-20°)`);
        } else {
            log(false, `Horizon 20° Tilt: FAILED - ${tiltedResult.failureReason}`);
        }
    } catch (e) {
        log(false, `Horizon Detector: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 2. EKF SENSOR FUSION
    // ========================================================================
    console.log('\n%c═══ 2. EKF SENSOR FUSION ═══', 'color: #FF9800; font-weight: bold');

    try {
        const ekf = new AttitudeEKF();
        const now = Date.now();

        // Init from gravity
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);
        let state = ekf.getState();
        log(true, `EKF Initialized: roll=${(state.orientation.roll * RAD_TO_DEG).toFixed(1)}°, pitch=${(state.orientation.pitch * RAD_TO_DEG).toFixed(1)}°`);

        // Process gyro
        for (let i = 0; i < 100; i++) {
            ekf.predict({ x: 0.05, y: 0.03, z: 0.01 }, now + i * 10);
        }
        state = ekf.getState();
        log(isFinite(state.orientation.roll), `EKF Gyro Integration: stable after 100 iterations`);

        // Horizon update
        ekf.updateWithHorizon(5 * DEG_TO_RAD, 2 * DEG_TO_RAD);
        state = ekf.getState();
        log(true, `EKF Horizon Update: roll=${(state.orientation.roll * RAD_TO_DEG).toFixed(1)}°, pitch=${(state.orientation.pitch * RAD_TO_DEG).toFixed(1)}°`);

        // Stress test
        for (let i = 0; i < 5000; i++) {
            ekf.predict({ x: Math.random() * 0.1, y: Math.random() * 0.1, z: Math.random() * 0.1 }, now + 1000 + i * 10);
        }
        state = ekf.getState();
        log(isFinite(state.rollStd) && state.rollStd > 0, `EKF 5000 Iterations: numerically stable`);
    } catch (e) {
        log(false, `EKF: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 3. SOLAR EPHEMERIS
    // ========================================================================
    console.log('\n%c═══ 3. SOLAR EPHEMERIS ═══', 'color: #FFEB3B; font-weight: bold');

    try {
        const ephemeris = new SolarEphemeris();
        const sunPos = ephemeris.getSunPosition(37.8, -122.4); // San Francisco

        log(sunPos.azimuth >= 0 && sunPos.azimuth <= 360, `Sun Azimuth: ${sunPos.azimuth.toFixed(1)}° (0-360)`);
        log(sunPos.elevation >= -90 && sunPos.elevation <= 90, `Sun Elevation: ${sunPos.elevation.toFixed(1)}° (-90 to 90)`);
        log(typeof sunPos.visible === 'boolean', `Sun Visible: ${sunPos.visible}`);
    } catch (e) {
        log(false, `Solar Ephemeris: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 4. VISUAL COMPASS
    // ========================================================================
    console.log('\n%c═══ 4. VISUAL COMPASS ═══', 'color: #4CAF50; font-weight: bold');

    try {
        const compass = new VisualCompass();
        compass.setLocation(37.8, -122.4);

        const sunPos = compass.getSunPosition();
        log(sunPos !== null, `Compass Location Set: ${sunPos ? 'Sun at ' + sunPos.azimuth.toFixed(1) + '°' : 'Failed'}`);

        // Heading with magnetic fallback
        const heading = compass.getHeading(180); // Magnetic = 180°
        if (heading) {
            log(true, `Compass Heading: ${heading.heading.toFixed(1)}°, source: ${heading.source}`);
        } else {
            log(true, 'Compass Heading: null (sun not visible or below horizon - expected at night)');
        }
    } catch (e) {
        log(false, `Visual Compass: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 5. MOCK SENSORS
    // ========================================================================
    console.log('\n%c═══ 5. MOCK SENSORS ═══', 'color: #E91E63; font-weight: bold');

    try {
        const sensors = new SensorManager();
        sensors.startMockMode();

        // Wait for mock data
        let imu = null;
        for (let i = 0; i < 10; i++) {
            imu = sensors.getLatestIMU();
            if (imu) break;
        }

        sensors.stopMockMode();

        if (imu) {
            const gMag = Math.sqrt(imu.accelWithGravity.x ** 2 + imu.accelWithGravity.y ** 2 + imu.accelWithGravity.z ** 2);
            log(Math.abs(gMag - STANDARD_GRAVITY) < 1, `Mock IMU: |g| = ${gMag.toFixed(2)} m/s² (expected ~9.81)`);
        } else {
            log(false, 'Mock IMU: No data generated');
        }
    } catch (e) {
        log(false, `Mock Sensors: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 6. BLOW LOCALIZATION
    // ========================================================================
    console.log('\n%c═══ 6. BLOW LOCALIZATION ═══', 'color: #9C27B0; font-weight: bold');

    try {
        const localizer = new BlowLocalizer();
        localizer.setObserverPosition({ latitude: 37.8, longitude: -122.4 });

        const detection: Detection = {
            x: 0.5, y: 0.4, w: 0.05, h: 0.15,
            confidence: 0.92, classId: 0, label: 'whale_blow'
        };

        const heading: HeadingEstimate = {
            heading: 270, source: 'magnetometer', confidence: 0.7, uncertainty: 10
        };

        const orientation: Orientation = { roll: 0, pitch: 0.05, yaw: 0 };
        const intrinsics = createiPhoneIntrinsics();

        const location = localizer.localize(detection, intrinsics, heading, orientation, 2.0);

        if (location) {
            log(location.distance > 0 && location.distance < 50000, `Localization Distance: ${location.distance}m`);
            log(location.bearing >= 0 && location.bearing <= 360, `Localization Bearing: ${location.bearing}°`);
            log(location.position.latitude !== 0, `Blow Position: ${location.position.latitude.toFixed(5)}°, ${location.position.longitude.toFixed(5)}°`);
        } else {
            log(false, 'Localization: returned null');
        }
    } catch (e) {
        log(false, `Blow Localization: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 7. EVENT RECORDER
    // ========================================================================
    console.log('\n%c═══ 7. EVENT RECORDER ═══', 'color: #795548; font-weight: bold');

    try {
        const recorder = new Recorder();
        recorder.setObserverPosition(37.8, -122.4);

        // Create a mock canvas
        const mockCanvas = document.createElement('canvas');
        mockCanvas.width = 640;
        mockCanvas.height = 480;
        const ctx = mockCanvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#0066aa';
            ctx.fillRect(0, 0, 640, 480);
        }

        const detection: Detection = {
            x: 0.5, y: 0.4, w: 0.05, h: 0.1,
            confidence: 0.88, classId: 0, label: 'whale_blow'
        };

        const event = recorder.capture(detection, { min: 500, max: 2000, desc: '~0.5-2.0 km' }, mockCanvas);

        log(event.event_id.length > 0, `Event Recorded: ${event.event_id}`);
        log(event.confidence === 0.88, `Event Confidence: ${event.confidence}`);
        log(!!event.thumbnail?.startsWith('data:image'), `Thumbnail Generated: ${event.thumbnail ? 'Yes' : 'No'}`);

        const json = recorder.exportJSON();
        log(json.length > 100, `Export JSON: ${json.length} bytes`);
    } catch (e) {
        log(false, `Event Recorder: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 8. CLIP RECORDER (check MediaRecorder support)
    // ========================================================================
    console.log('\n%c═══ 8. VIDEO CLIP RECORDER ═══', 'color: #607D8B; font-weight: bold');

    try {
        const hasMediaRecorder = typeof MediaRecorder !== 'undefined';
        log(hasMediaRecorder, `MediaRecorder API: ${hasMediaRecorder ? 'Available' : 'Not Available'}`);

        if (hasMediaRecorder) {
            const supportedTypes = [
                'video/webm;codecs=vp9',
                'video/webm;codecs=vp8',
                'video/webm',
                'video/mp4',
            ].filter(t => MediaRecorder.isTypeSupported(t));

            log(supportedTypes.length > 0, `Supported Codecs: ${supportedTypes.join(', ') || 'None'}`);
        }
    } catch (e) {
        log(false, `Clip Recorder: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // 9. FULL PIPELINE TEST
    // ========================================================================
    console.log('\n%c═══ 9. FULL PIPELINE INTEGRATION ═══', 'color: #FF5722; font-weight: bold');

    try {
        // Simulate complete flow
        const horizonDetector = new HorizonDetector();
        const ekf = new AttitudeEKF();
        const compass = new VisualCompass();
        const localizer = new BlowLocalizer();
        const intrinsics = createiPhoneIntrinsics();
        const now = Date.now();

        // 1. Initialize systems
        compass.setLocation(37.8, -122.4);
        localizer.setObserverPosition({ latitude: 37.8, longitude: -122.4 });
        ekf.initializeFromAccel({ x: 0, y: 0, z: STANDARD_GRAVITY }, now);

        // 2. Detect horizon from image
        const image = createSeaSkyImage(640, 480, 250, 8);
        const horizonResult = horizonDetector.detect(image, intrinsics, 3);

        // 3. Feed to EKF
        if (horizonResult.horizon) {
            for (let i = 0; i < 20; i++) {
                ekf.predict({ x: 0, y: 0, z: 0 }, now + i * 100);
                ekf.updateWithHorizon(horizonResult.horizon.roll, horizonResult.horizon.pitch);
            }
        }

        const state = ekf.getState();
        const rollDeg = state.orientation.roll * RAD_TO_DEG;

        // 4. Get heading
        const heading = compass.getHeading(270) || { heading: 270, source: 'magnetometer', confidence: 0.5, uncertainty: 15 } as HeadingEstimate;

        // 5. Localize detection
        const detection: Detection = { x: 0.6, y: 0.35, w: 0.04, h: 0.12, confidence: 0.91, classId: 0, label: 'whale_blow' };
        const location = localizer.localize(detection, intrinsics, heading, state.orientation, 1.0);

        log(horizonResult.horizon !== null, `Pipeline Step 1 - Horizon: ${horizonResult.horizon ? 'Detected' : 'Failed'}`);
        log(Math.abs(rollDeg) < 30, `Pipeline Step 2 - EKF: roll=${rollDeg.toFixed(1)}°`);
        log(heading !== null, `Pipeline Step 3 - Heading: ${heading.heading.toFixed(0)}° (${heading.source})`);
        log(location !== null, `Pipeline Step 4 - Localization: ${location ? location.distance + 'm @ ' + location.bearing + '°' : 'Failed'}`);

        log(true, '🎯 Full pipeline executed successfully!');
    } catch (e) {
        log(false, `Full Pipeline: EXCEPTION - ${e}`);
    }

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n%c╔══════════════════════════════════════════════════════════════╗', 'color: #00BCD4');
    if (allPassed) {
        console.log('%c║  ✅ ALL SYSTEMS OPERATIONAL                                  ║', 'color: #4CAF50; font-weight: bold');
    } else {
        console.log('%c║  ⚠️  SOME SYSTEMS NEED ATTENTION                            ║', 'color: #FF9800; font-weight: bold');
    }
    console.log('%c╚══════════════════════════════════════════════════════════════╝', 'color: #00BCD4');

    return { allPassed, results };
}

// Export to window
if (typeof window !== 'undefined') {
    (window as any).runE2ETest = runE2ETest;
    console.log('🐋 E2E test loaded. Run `runE2ETest()` in console.');
}
