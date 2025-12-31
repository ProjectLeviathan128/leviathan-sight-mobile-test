
import { AttitudeEKF } from './src/fusion/ekf';

const ekf = new AttitudeEKF();
ekf.initializeFromAccel({ x: 0, y: 0, z: 9.81 }, Date.now());

console.log("Starting EKF Stability Verification...");
console.log("Initial State:", JSON.stringify(ekf.getState(), null, 2));

const ITERATIONS = 10000;
const DT_MS = 10;

// Simulate stationary device with noise
for (let i = 0; i < ITERATIONS; i++) {
    const timestamp = Date.now() + i * DT_MS;

    // Bias random walk simulation
    const gyro = { x: 0.001 * Math.random(), y: -0.001 * Math.random(), z: 0.0005 * Math.random() };

    ekf.predict(gyro, timestamp);

    if (i % 10 === 0) {
        // Gravity update
        ekf.updateWithGravity({ x: 0.0 + (Math.random() - 0.5) * 0.1, y: 0.0 + (Math.random() - 0.5) * 0.1, z: 9.8 + (Math.random() - 0.5) * 0.1 });
    }

    if (i % 50 === 0) {
        // Horizon update
        ekf.updateWithHorizon(0, 0);
    }
}

const finalState = ekf.getState();
console.log("Final State:", JSON.stringify(finalState, null, 2));
console.log("EKF survived " + ITERATIONS + " iterations.");
console.log("Covariance diagonals:",
    ekf['state'].covariance[0][0],
    ekf['state'].covariance[1][1],
    ekf['state'].covariance[2][2],
    ekf['state'].covariance[3][3],
    ekf['state'].covariance[4][4],
    ekf['state'].covariance[5][5]
);

// Check if covariance exploded or vanished
const trace = ekf['state'].covariance[0][0] + ekf['state'].covariance[1][1] + ekf['state'].covariance[2][2];
if (trace > 100 || trace < 1e-10) {
    console.error("FAILURE: Covariance trace suspicious: " + trace);
    process.exit(1);
}

// Check diagnostics
const diag = ekf.getDiagnostics();
console.log("Diagnostics:", JSON.stringify(diag, null, 2));

console.log("SUCCESS: EKF is stable.");
