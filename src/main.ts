/**
 * Leviathan Systems - Mobile Maritime Navigation
 * Main application entry point integrating all vision, fusion, and navigation modules
 */

import { CameraManager } from './core/camera';
import { InferenceEngine } from './core/inference';
import { appState, AppState } from './core/state';
import { Renderer } from './ui/render';
import { TemporalFilter } from './core/temporal';
import { DistanceEstimator } from './core/distance';
import { EnhancedDistanceEstimator } from './core/ranging';
import { Recorder } from './core/recorder';
import { SensorManager } from './core/sensors';
import { IntrinsicsManager } from './core/intrinsics';
import { BlowLocalizer, type BlowLocation } from './core/localization';

// Leviathan Systems modules
import { HorizonDetector } from './vision/horizon';
import { AttitudeEKF } from './fusion/ekf';
import { HeaveCompensator } from './fusion/wave-filter';
import { VisualCompass } from './nav/compass';
import { HUDRenderer } from './ui/hud';

import type { HorizonLine, Orientation, HeadingEstimate, AttitudeState } from './core/types';

// ============================================================================
// DOM Elements
// ============================================================================

const zoneA = {
  model: document.getElementById('status-model')!,
  fps: document.getElementById('status-fps')!,
  heading: document.getElementById('status-heading')!,
  zoom: document.getElementById('status-zoom')!,
};

const zoneC = {
  btnZoom1: document.getElementById('btn-zoom-1')!,
  btnZoom4: document.getElementById('btn-zoom-4')!,
  btnRecord: document.getElementById('btn-record')!,
};

const debugStats = document.getElementById('debug-stats')!;
const debugOverlay = document.getElementById('debug-overlay')!;
const canvas = document.getElementById('detection-canvas') as HTMLCanvasElement;
const container = document.getElementById('camera-container')!;

// ============================================================================
// Module Instances
// ============================================================================

// Core modules
const camera = new CameraManager();
const inference = new InferenceEngine();
const renderer = new Renderer(canvas);
const temporal = new TemporalFilter();
const distanceEst = new DistanceEstimator();
const enhancedRanger = new EnhancedDistanceEstimator();
const recorder = new Recorder();
const sensors = new SensorManager();
const intrinsics = new IntrinsicsManager();

// Leviathan Systems modules
const horizonDetector = new HorizonDetector();
const attitudeEKF = new AttitudeEKF();
const heaveComp = new HeaveCompensator(3.0); // 3m nominal observer height
const visualCompass = new VisualCompass();
const hudRenderer = new HUDRenderer(canvas);
const blowLocalizer = new BlowLocalizer();

// ============================================================================
// State Variables
// ============================================================================

let isRecording = false;
let confidenceThreshold = 0.5;
let frameCount = 0;
let lastFpsTime = Date.now();
let lastRecTime = 0;
let lastHorizonTime = 0;
let lastEKFUpdateTime = 0;

// Leviathan state
let currentHorizon: HorizonLine | null = null;
let currentOrientation: Orientation | null = null;
let currentHeading: HeadingEstimate | null = null;
let currentAttitudeState: AttitudeState | null = null;
let lastBlowLocation: BlowLocation | null = null;

// GPS tracking
let gpsWatchId: number | null = null;

// Processing rate control
const HORIZON_INTERVAL_MS = 100;  // 10 Hz for horizon detection
const EKF_MIN_INTERVAL_MS = 10;   // 100 Hz max for EKF

// ============================================================================
// Initialization
// ============================================================================

async function init() {
  appState.state = AppState.LOADING;

  // Camera
  try {
    camera.mount(container);
    await camera.start();

    // Update intrinsics for actual video resolution
    const videoEl = camera.videoElement;
    if (videoEl.videoWidth > 0) {
      intrinsics.updateForResolution(videoEl.videoWidth, videoEl.videoHeight);
    }
  } catch (e) {
    console.error('Camera init failed:', e);
    zoneA.model.textContent = '● CAM ERROR';
    zoneA.model.style.color = '#ff5252';
    return;
  }

  // Inference (YOLO blow detection)
  await inference.init('yolo11n-blow.onnx');
  if (inference.useMock) {
    zoneA.model.textContent = '● MOCK';
    zoneA.model.style.color = '#ffc107';
  } else {
    zoneA.model.textContent = '● LOADED';
    zoneA.model.style.color = '#4caf50';
  }

  // Sensors
  await sensors.requestPermission();
  document.body.addEventListener('click', () => {
    if (!sensors.permissionGranted) sensors.requestPermission();
  }, { once: true });

  // Initialize EKF from accelerometer if available
  const imu = sensors.getLatestIMU();
  if (imu) {
    attitudeEKF.initializeFromAccel(imu.accelWithGravity, Date.now());
  }

  // Setup geolocation for visual compass AND blow localization
  if ('geolocation' in navigator) {
    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        visualCompass.setLocation(lat, lon);
        blowLocalizer.setObserverPosition({ latitude: lat, longitude: lon, accuracy: pos.coords.accuracy });
        recorder.setObserverPosition(lat, lon);
        console.log(`[Leviathan] GPS: ${lat.toFixed(5)}, ${lon.toFixed(5)} ± ${pos.coords.accuracy?.toFixed(0)}m`);
      },
      (err) => console.warn('Geolocation unavailable:', err),
      { enableHighAccuracy: true }
    );

    // Start continuous GPS tracking
    gpsWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        visualCompass.setLocation(lat, lon);
        blowLocalizer.setObserverPosition({ latitude: lat, longitude: lon, accuracy: pos.coords.accuracy });
        recorder.setObserverPosition(lat, lon);
      },
      (err) => console.warn('GPS update failed:', err),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );
  }

  appState.state = AppState.READY;

  // Resize
  resize();
  window.addEventListener('resize', resize);

  // Start main loop
  requestAnimationFrame(loop);
}

function resize() {
  renderer.resize(window.innerWidth, window.innerHeight);
  hudRenderer.resize(window.innerWidth, window.innerHeight);
}

// ============================================================================
// Main Loop
// ============================================================================

async function loop() {
  if (appState.state === AppState.ERROR) return;

  const now = Date.now();
  frameCount++;

  // FPS counter
  if (now - lastFpsTime >= 1000) {
    zoneA.fps.textContent = `${frameCount} FPS`;
    frameCount = 0;
    lastFpsTime = now;
  }

  // Update intrinsics for current zoom
  intrinsics.updateForZoom(camera.currentZoom);
  const K = intrinsics.getIntrinsics();

  // ========================================================================
  // SENSOR FUSION PIPELINE (High Frequency)
  // ========================================================================

  // Process IMU samples for EKF prediction
  if (now - lastEKFUpdateTime >= EKF_MIN_INTERVAL_MS) {
    const imuSamples = sensors.getIMUSamplesSince(lastEKFUpdateTime);
    attitudeEKF.processSamples(imuSamples);

    // Update heave compensator
    const latestIMU = sensors.getLatestIMU();
    if (latestIMU) {
      heaveComp.update(latestIMU.accel, now);
    }

    lastEKFUpdateTime = now;
  }

  // ========================================================================
  // HORIZON DETECTION (Throttled)
  // ========================================================================

  if (now - lastHorizonTime >= HORIZON_INTERVAL_MS) {
    const result = horizonDetector.detect(
      camera.videoElement,
      K,
      heaveComp.getStableHeight()
    );

    if (result.horizon) {
      currentHorizon = result.horizon;

      // Update EKF with horizon measurement
      attitudeEKF.updateWithHorizon(result.horizon.roll, result.horizon.pitch);
    }

    lastHorizonTime = now;
  }

  // Get fused orientation from EKF
  currentAttitudeState = attitudeEKF.getState();
  currentOrientation = currentAttitudeState.orientation;

  // ========================================================================
  // HEADING ESTIMATION
  // ========================================================================

  // Try visual compass update
  visualCompass.updateFromCamera(camera.videoElement, K);

  // Get fused heading (visual + magnetic)
  const magneticHeading = sensors.getMagneticHeading();
  currentHeading = visualCompass.getHeading(magneticHeading);

  // Update HUD displays
  zoneA.heading.textContent = currentHeading
    ? `${currentHeading.heading.toFixed(0)}°`
    : sensors.getHeadingString();
  zoneA.zoom.textContent = `${camera.currentZoom}x`;

  // ========================================================================
  // DETECTION PIPELINE (Blow Detection)
  // ========================================================================

  const rawDetections = await inference.run(camera.videoElement, 0.1);
  const trackedDetections = temporal.update(rawDetections);
  const visibleDetections = trackedDetections.filter(d => d.confidence >= confidenceThreshold);

  // State management for detections
  if (visibleDetections.length > 0) {
    if (appState.state !== AppState.EVENT && appState.state !== AppState.DETECTING) {
      appState.state = AppState.DETECTING;
    }

    // Get best detection for localization
    const best = visibleDetections.sort((a, b) => b.confidence - a.confidence)[0];

    // Localize the blow (works at any zoom!)
    lastBlowLocation = blowLocalizer.localize(
      best,
      K,
      currentHeading,
      currentOrientation,
      camera.currentZoom
    );

    if (isRecording && now - lastRecTime > 2000) {
      const dist = distanceEst.estimate(best);
      recorder.captureWithLocation(best, dist, lastBlowLocation, canvas, camera.currentZoom);
      lastRecTime = now;

      // Log localization
      if (lastBlowLocation) {
        console.log(`[Leviathan] BLOW DETECTED @ ${lastBlowLocation.position.latitude.toFixed(5)}, ${lastBlowLocation.position.longitude.toFixed(5)} - ${lastBlowLocation.distance}m @ ${lastBlowLocation.bearing}°`);
      }

      zoneA.model.textContent = '● REC';
      zoneA.model.style.color = '#ff5252';
      setTimeout(() => {
        zoneA.model.textContent = inference.useMock ? '● MOCK' : '● LOADED';
        zoneA.model.style.color = inference.useMock ? '#ffc107' : '#4caf50';
      }, 500);
    }
  } else {
    if (appState.state === AppState.DETECTING) {
      appState.state = AppState.READY;
    }
    lastBlowLocation = null;
  }

  // ========================================================================
  // RENDERING
  // ========================================================================

  // Draw detection boxes
  renderer.draw(visibleDetections);

  // Draw Leviathan HUD overlay
  hudRenderer.render(
    currentOrientation,
    currentHeading,
    currentHorizon,
    currentAttitudeState ?? undefined
  );

  // Debug overlay
  if (debugOverlay.classList.contains('visible')) {
    const lastEvents = recorder.getRecentEvents();
    const ekfDiag = attitudeEKF.getDiagnostics();
    const stats = {
      state: appState.state,
      heading: currentHeading?.heading.toFixed(1),
      headingSrc: currentHeading?.source,
      pitch: currentOrientation ? (currentOrientation.pitch * 180 / Math.PI).toFixed(1) : null,
      roll: currentOrientation ? (currentOrientation.roll * 180 / Math.PI).toFixed(1) : null,
      horizonConf: currentHorizon?.confidence.toFixed(2),
      heave: heaveComp.getInstantaneousHeight().toFixed(2),
      ekfReject: (ekfDiag.rejectionRate * 100).toFixed(1) + '%',
      imuRate: sensors.getSampleRate().toFixed(0) + 'Hz',
      zoom: camera.currentZoom,
      events: recorder.events.length,
      last: lastEvents[0] ? lastEvents[0].event_id.substring(0, 4) : 'None'
    };
    debugStats.textContent = JSON.stringify(stats, null, 2);
  }

  requestAnimationFrame(loop);
}

// ============================================================================
// UI Event Handlers
// ============================================================================

zoneC.btnZoom1.addEventListener('click', () => camera.setZoom(1));
zoneC.btnZoom4.addEventListener('click', () => camera.setZoom(4));

zoneC.btnRecord.addEventListener('click', () => {
  isRecording = !isRecording;
  zoneC.btnRecord.classList.toggle('active', isRecording);
  zoneC.btnRecord.textContent = isRecording ? 'ARMED' : 'REC';
});

// Swipe gestures for debug overlay
let touchStartY = 0;
document.addEventListener('touchstart', e => touchStartY = e.touches[0].clientY);
document.addEventListener('touchend', e => {
  const touchEndY = e.changedTouches[0].clientY;
  if (touchEndY - touchStartY > 100) {
    if (!debugOverlay.classList.contains('visible')) debugOverlay.classList.add('visible');
  } else if (touchStartY - touchEndY > 100) {
    if (debugOverlay.classList.contains('visible')) debugOverlay.classList.remove('visible');
  }
});

// ============================================================================
// Start Application
// ============================================================================

init();

