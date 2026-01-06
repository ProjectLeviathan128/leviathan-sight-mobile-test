/**
 * Leviathan Systems - Horizon Detection Tests
 * 
 * Tests the Ettinger statistical horizon detection algorithm
 */

import { HorizonDetector } from '../vision/horizon';
import type { IntrinsicMatrix } from '../core/types';

// Mock intrinsics for iPhone wide camera
const mockIntrinsics: IntrinsicMatrix = {
    fx: 1000,
    fy: 1000,
    cx: 320,
    cy: 240,
    width: 640,
    height: 480,
};

/**
 * Create a synthetic sea-sky image
 * Top half = light blue (sky), bottom half = dark blue (sea)
 */
function createSeaSkyImage(
    width: number,
    height: number,
    horizonY: number = height / 2,
    rollDeg: number = 0
): ImageData {
    const data = new Uint8ClampedArray(width * height * 4);
    const rollRad = rollDeg * Math.PI / 180;
    const cx = width / 2;
    const cy = height / 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Apply roll rotation to determine if pixel is above/below horizon
            const dx = x - cx;
            const dy = y - cy;
            const yRotated = -dx * Math.sin(rollRad) + dy * Math.cos(rollRad) + cy;

            const idx = (y * width + x) * 4;

            if (yRotated < horizonY) {
                // Sky: light blue
                data[idx] = 135;     // R
                data[idx + 1] = 206; // G
                data[idx + 2] = 235; // B
                data[idx + 3] = 255; // A
            } else {
                // Sea: dark blue
                data[idx] = 0;       // R
                data[idx + 1] = 51;  // G
                data[idx + 2] = 102; // B
                data[idx + 3] = 255; // A
            }
        }
    }

    return new ImageData(data, width, height);
}

/**
 * Create a uniform gray image (no horizon)
 */
function createUniformImage(width: number, height: number): ImageData {
    const data = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 128;
        data[i + 1] = 128;
        data[i + 2] = 128;
        data[i + 3] = 255;
    }
    return new ImageData(data, width, height);
}

// ============================================================================
// Tests
// ============================================================================

export function runHorizonTests(): { passed: number; failed: number; results: string[] } {
    const results: string[] = [];
    let passed = 0;
    let failed = 0;

    const detector = new HorizonDetector();

    // Test 1: Detect horizon in centered sea-sky image
    try {
        const image = createSeaSkyImage(640, 480, 240, 0);
        const result = detector.detect(image, mockIntrinsics, 3);

        if (result.horizon) {
            const pitchDeg = result.horizon.pitch * 180 / Math.PI;
            const rollDeg = result.horizon.roll * 180 / Math.PI;

            if (Math.abs(rollDeg) < 5 && Math.abs(pitchDeg) < 10) {
                results.push('✅ Test 1: Centered horizon detected correctly');
                passed++;
            } else {
                results.push(`❌ Test 1: Horizon angles off - roll: ${rollDeg.toFixed(1)}°, pitch: ${pitchDeg.toFixed(1)}°`);
                failed++;
            }
        } else {
            results.push(`❌ Test 1: Failed to detect horizon - ${result.failureReason}`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 1: Exception - ${e}`);
        failed++;
    }

    // Test 2: Detect tilted horizon (10° roll)
    try {
        const image = createSeaSkyImage(640, 480, 240, 10);
        const result = detector.detect(image, mockIntrinsics, 3);

        if (result.horizon) {
            const rollDeg = result.horizon.roll * 180 / Math.PI;

            if (Math.abs(rollDeg - (-10)) < 5) { // Negative because image roll is inverted
                results.push('✅ Test 2: 10° roll detected correctly');
                passed++;
            } else {
                results.push(`❌ Test 2: Roll detection off - expected ~-10°, got ${rollDeg.toFixed(1)}°`);
                failed++;
            }
        } else {
            results.push(`❌ Test 2: Failed to detect tilted horizon - ${result.failureReason}`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 2: Exception - ${e}`);
        failed++;
    }

    // Test 3: No horizon in uniform image
    try {
        const image = createUniformImage(640, 480);
        const result = detector.detect(image, mockIntrinsics, 3);

        if (!result.horizon && result.failureReason?.includes('confidence')) {
            results.push('✅ Test 3: Correctly rejected uniform image (low confidence)');
            passed++;
        } else if (result.horizon && result.horizon.confidence < 0.5) {
            results.push('✅ Test 3: Detected but with low confidence (acceptable)');
            passed++;
        } else {
            results.push(`❌ Test 3: Should have low confidence for uniform image`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 3: Exception - ${e}`);
        failed++;
    }

    // Test 4: High horizon (sky dominant)
    try {
        const image = createSeaSkyImage(640, 480, 360, 0); // Horizon at 75% down
        const result = detector.detect(image, mockIntrinsics, 3);

        if (result.horizon) {
            const pitchDeg = result.horizon.pitch * 180 / Math.PI;
            results.push(`✅ Test 4: High horizon detected - pitch: ${pitchDeg.toFixed(1)}°`);
            passed++;
        } else {
            results.push(`❌ Test 4: Failed to detect high horizon - ${result.failureReason}`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 4: Exception - ${e}`);
        failed++;
    }

    // Test 5: Processing time reasonable
    try {
        const image = createSeaSkyImage(640, 480, 240, 0);
        const result = detector.detect(image, mockIntrinsics, 3);

        if (result.processingTime < 100) { // Should be under 100ms
            results.push(`✅ Test 5: Processing time OK (${result.processingTime.toFixed(1)}ms)`);
            passed++;
        } else {
            results.push(`❌ Test 5: Processing too slow (${result.processingTime.toFixed(1)}ms)`);
            failed++;
        }
    } catch (e) {
        results.push(`❌ Test 5: Exception - ${e}`);
        failed++;
    }

    return { passed, failed, results };
}

// Export for browser console testing
if (typeof window !== 'undefined') {
    (window as any).runHorizonTests = runHorizonTests;
}
