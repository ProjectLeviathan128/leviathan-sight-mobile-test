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
import { clipRecorder } from './core/clip-recorder';

// Leviathan Systems modules
import { HorizonDetector } from './vision/horizon';
import { AttitudeEKF } from './fusion/ekf';
import { HeaveCompensator } from './fusion/wave-filter';
import { VisualCompass } from './nav/compass';
import { HUDRenderer } from './ui/hud';

// Diagnostics
import { DiagnosticsPanel } from './diagnostics/DiagnosticsPanel';

// Pipeline Status (central status registry - nothing fails silently)
import {
  setActive,
  setDegraded,
  setFailed,
  updateStatus,
  pipelineStatus,
  isOperational
} from './core/pipeline-status';
import { initStatusPanel } from './ui/status-panel';

// Tests - exposed to window for browser console execution
import { runPipelineTests } from './__tests__/pipeline.test';
import { runE2ETest } from './__tests__/e2e.test';

// Expose tests to window
if (typeof window !== 'undefined') {
  (window as any).runPipelineTests = runPipelineTests;
  (window as any).runE2ETest = runE2ETest;
}

import type { HorizonLine, Orientation, HeadingEstimate, AttitudeState } from './core/types';

// ============================================================================
// Health Status Tracking (must be before any other code that might crash)
// ============================================================================

interface HealthState {
  fatalError: string | null;
  secureContext: boolean;
  camera: 'uninitialized' | 'requesting' | 'granted' | 'denied' | 'error';
  sensors: 'unknown' | 'ios-needs-tap' | 'granted' | 'denied';
  model: 'loading' | 'loaded' | 'mock' | 'error';
  lastHeartbeat: number;
}

const healthState: HealthState = {
  fatalError: null,
  secureContext: typeof window !== 'undefined' && window.isSecureContext,
  camera: 'uninitialized',
  sensors: 'unknown',
  model: 'loading',
  lastHeartbeat: Date.now(),
};

// Global error handlers - catch any uncaught errors
window.addEventListener('error', (event) => {
  const msg = `${event.message} at ${event.filename}:${event.lineno}`;
  healthState.fatalError = msg.substring(0, 200);
  console.error('[Health] Uncaught error:', msg);
  updateHealthOverlay();
});

window.addEventListener('unhandledrejection', (event) => {
  const msg = `Promise rejected: ${event.reason}`;
  healthState.fatalError = msg.substring(0, 200);
  console.error('[Health] Unhandled rejection:', event.reason);
  updateHealthOverlay();
});

// Health overlay update function
function updateHealthOverlay() {
  const overlay = document.getElementById('health-overlay');
  if (!overlay) return;

  const now = Date.now();
  const heartbeatAge = now - healthState.lastHeartbeat;

  overlay.innerHTML = `
    <div style="font-size:10px;line-height:1.4;">
      ${healthState.fatalError ? `<div style="color:#ff5252;">⚠️ ${healthState.fatalError}</div>` : ''}
      <div>secure: ${healthState.secureContext ? '✓' : '✗'}</div>
      <div>camera: ${healthState.camera}</div>
      <div>sensors: ${healthState.sensors}</div>
      <div>model: ${healthState.model}</div>
      <div>heartbeat: ${heartbeatAge > 1000 ? '⚠️ ' + heartbeatAge + 'ms' : '✓'}</div>
    </div>
  `;
}

// Check if iOS and needs user gesture for sensors
function checkIOSSensorPermission(): boolean {
  return typeof (DeviceOrientationEvent as any).requestPermission === 'function' ||
    typeof (DeviceMotionEvent as any).requestPermission === 'function';
}

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
const iosSensorBtn = document.getElementById('ios-sensor-btn') as HTMLButtonElement;

// ============================================================================
// Module Instances (wrapped to catch initialization errors)
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

// Get HUD canvas (separate from detection canvas to prevent clearing)
const hudCanvas = document.getElementById('hud-canvas') as HTMLCanvasElement;
if (!hudCanvas) {
  console.warn('[Main] HUD canvas not found, will use detection canvas');
}

// Leviathan Systems modules - each initialized separately to prevent cascade failures
// Each reports its status to the pipeline status system
let horizonDetector: HorizonDetector | null = null;
let attitudeEKF: AttitudeEKF | null = null;
let heaveComp: HeaveCompensator | null = null;
let visualCompass: VisualCompass | null = null;
let hudRenderer: HUDRenderer | null = null;
let blowLocalizer: BlowLocalizer | null = null;

// Initialize HorizonDetector
try {
  horizonDetector = new HorizonDetector();
  updateStatus('horizon', 'initializing', 'Waiting for video ready');
  console.log('[Leviathan] HorizonDetector initialized');
} catch (e) {
  setFailed('horizon', `Init failed: ${e}`);
  console.error('[Leviathan] HorizonDetector init failed:', e);
}

// Initialize AttitudeEKF
try {
  attitudeEKF = new AttitudeEKF();
  updateStatus('ekf', 'initializing', 'Waiting for IMU data');
  console.log('[Leviathan] AttitudeEKF initialized');
} catch (e) {
  setFailed('ekf', `Init failed: ${e}`);
  console.error('[Leviathan] AttitudeEKF init failed:', e);
}

// Initialize HeaveCompensator
try {
  heaveComp = new HeaveCompensator(3.0); // 3m nominal observer height
  console.log('[Leviathan] HeaveCompensator initialized');
} catch (e) {
  console.error('[Leviathan] HeaveCompensator init failed:', e);
}

// Initialize VisualCompass
try {
  visualCompass = new VisualCompass();
  updateStatus('heading', 'initializing', 'Waiting for GPS location');
  console.log('[Leviathan] VisualCompass initialized');
} catch (e) {
  setFailed('heading', `Init failed: ${e}`);
  console.error('[Leviathan] VisualCompass init failed:', e);
}

// Initialize HUDRenderer - use separate HUD canvas if available
try {
  hudRenderer = new HUDRenderer(hudCanvas || canvas);
  console.log('[Leviathan] HUDRenderer initialized');
} catch (e) {
  console.error('[Leviathan] HUDRenderer init failed:', e);
}

// Initialize BlowLocalizer
try {
  blowLocalizer = new BlowLocalizer();
  updateStatus('localization', 'initializing', 'Waiting for heading data');
  console.log('[Leviathan] BlowLocalizer initialized');
} catch (e) {
  setFailed('localization', `Init failed: ${e}`);
  console.error('[Leviathan] BlowLocalizer init failed:', e);
}

updateHealthOverlay();

// Diagnostics panel - always created (works even if other modules fail)
const diagnosticsPanel = new DiagnosticsPanel(inference);
diagnosticsPanel.mount();

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
  updateHealthOverlay();

  // Initialize status panel for real-time observability
  initStatusPanel({ detailed: true, position: 'top-left' });

  // Check secure context
  if (!healthState.secureContext) {
    console.warn('[Leviathan] Not a secure context - some features may be blocked');
  }

  // Camera
  healthState.camera = 'requesting';
  updateStatus('camera', 'initializing', 'Requesting access');
  updateHealthOverlay();
  try {
    camera.mount(container);
    await camera.start();
    healthState.camera = 'granted';
    setActive('camera', 'Camera active');

    // Update intrinsics for actual video resolution
    const videoEl = camera.videoElement;
    if (videoEl.videoWidth > 0) {
      intrinsics.updateForResolution(videoEl.videoWidth, videoEl.videoHeight);
    } else {
      // Video not ready yet - wait for metadata
      await new Promise<void>((resolve) => {
        videoEl.addEventListener('loadedmetadata', () => {
          intrinsics.updateForResolution(videoEl.videoWidth, videoEl.videoHeight);
          resolve();
        }, { once: true });
        // Timeout fallback
        setTimeout(resolve, 2000);
      });
    }

    // Connect video to diagnostics panel for live camera test
    diagnosticsPanel.setVideoElement(videoEl);

    // Initialize clip recorder with camera stream for pre-roll buffer
    const stream = (videoEl as any).srcObject as MediaStream;
    if (stream) {
      clipRecorder.init(stream);
    }
  } catch (e) {
    console.error('Camera init failed:', e);
    healthState.camera = 'error';
    setFailed('camera', `Access denied or error: ${e}`);
    zoneA.model.textContent = '● CAM ERROR';
    zoneA.model.style.color = '#ff5252';
    updateHealthOverlay();
    return;
  }

  // Inference (YOLO blow detection)
  updateStatus('inference', 'initializing', 'Loading model...');
  await inference.init('best.onnx');
  if (inference.useMock) {
    healthState.model = 'mock';
    setDegraded('inference', 'Using mock mode (no real model)');
    zoneA.model.textContent = '● MOCK';
    zoneA.model.style.color = '#ffc107';
  } else {
    healthState.model = 'loaded';
    setActive('inference', 'Model loaded');
    zoneA.model.textContent = '● LOADED';
    zoneA.model.style.color = '#4caf50';
  }
  updateHealthOverlay();

  // Sensors - check if iOS needs user gesture
  if (checkIOSSensorPermission()) {
    healthState.sensors = 'ios-needs-tap';
    updateStatus('sensors', 'initializing', 'iOS requires tap - tap button to enable');
    iosSensorBtn.style.display = 'block';
    iosSensorBtn.addEventListener('click', async () => {
      const granted = await sensors.requestPermission();
      healthState.sensors = granted ? 'granted' : 'denied';
      if (granted) {
        setActive('sensors', 'Sensors granted');
        iosSensorBtn.style.display = 'none';
        const imu = sensors.getLatestIMU();
        if (imu && attitudeEKF) {
          attitudeEKF.initializeFromAccel(imu.accelWithGravity, Date.now());
          setActive('ekf', 'Initialized from accelerometer');
        }
      } else {
        setFailed('sensors', 'User denied sensor permission');
      }
      updateHealthOverlay();
    });
  } else {
    // Non-iOS: auto-request
    const granted = await sensors.requestPermission();
    healthState.sensors = granted ? 'granted' : 'denied';

    // Desktop fallback: if no real sensors available, use mock mode
    if (!granted) {
      console.log('[Leviathan] Real sensors not available - starting mock mode for desktop testing');
      sensors.startMockMode();
      healthState.sensors = 'granted';
      setDegraded('sensors', 'Using mock sensors (desktop mode)');
      (window as any).__LEVIATHAN_SIM_MODE__ = true;

      // Initialize EKF from mock sensor data
      setTimeout(() => {
        const imu = sensors.getLatestIMU();
        if (imu && attitudeEKF) {
          attitudeEKF.initializeFromAccel(imu.accelWithGravity, Date.now());
          setDegraded('ekf', 'Initialized from mock sensors');
          console.log('[Leviathan] EKF initialized from mock sensors');
        }
      }, 100);
    } else {
      setActive('sensors', 'Real sensors active');
    }
  }
  updateHealthOverlay();

  // Initialize EKF from accelerometer if available
  const imu = sensors.getLatestIMU();
  if (imu && attitudeEKF) {
    attitudeEKF.initializeFromAccel(imu.accelWithGravity, Date.now());
  }

  // Setup geolocation for visual compass AND blow localization
  if ('geolocation' in navigator) {
    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        visualCompass?.setLocation(lat, lon);
        blowLocalizer?.setObserverPosition({ latitude: lat, longitude: lon, accuracy: pos.coords.accuracy });
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
        visualCompass?.setLocation(lat, lon);
        blowLocalizer?.setObserverPosition({ latitude: lat, longitude: lon, accuracy: pos.coords.accuracy });
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
  hudRenderer?.resize(window.innerWidth, window.innerHeight);
}

// ============================================================================
// Main Loop
// ============================================================================

async function loop() {
  if (appState.state === AppState.ERROR) return;

  const now = Date.now();
  frameCount++;

  // Update heartbeat for health monitoring
  healthState.lastHeartbeat = now;

  // FPS counter + periodic health overlay update
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
    if (attitudeEKF) {
      attitudeEKF.processSamples(imuSamples);
    }

    // Update heave compensator
    const latestIMU = sensors.getLatestIMU();
    if (latestIMU && heaveComp) {
      heaveComp.update(latestIMU.accel, now);
    }

    lastEKFUpdateTime = now;
  }

  // ========================================================================
  // HORIZON DETECTION (Throttled)
  // ========================================================================

  if (horizonDetector && now - lastHorizonTime >= HORIZON_INTERVAL_MS) {
    const result = horizonDetector.detect(
      camera.videoElement,
      K,
      heaveComp?.getStableHeight() ?? 3.0
    );

    if (result.horizon) {
      currentHorizon = result.horizon;
      setActive('horizon', `Detected (conf: ${(result.horizon.confidence * 100).toFixed(0)}%)`, result.horizon.confidence);

      // Update EKF with horizon measurement
      if (attitudeEKF) {
        attitudeEKF.updateWithHorizon(result.horizon.roll, result.horizon.pitch);
        const diag = attitudeEKF.getDiagnostics();
        if (diag.initialized) {
          const rejRate = (diag.rejectionRate * 100).toFixed(0);
          setActive('ekf', `Fusing (${rejRate}% rejected)`);
        }
      }
    } else {
      // Log and report why horizon detection failed
      const reason = result.failureReason || 'unknown';
      console.warn('[Horizon] Detection failed:', reason);
      if (reason.includes('confidence')) {
        setDegraded('horizon', `Low confidence: ${reason}`);
      } else if (reason.includes('image data')) {
        setDegraded('horizon', 'Video not ready');
      } else {
        setDegraded('horizon', reason);
      }
    }

    lastHorizonTime = now;
  }

  // Get fused orientation from EKF
  if (attitudeEKF) {
    currentAttitudeState = attitudeEKF.getState();
    currentOrientation = currentAttitudeState.orientation;
  }

  // ========================================================================
  // HEADING ESTIMATION
  // ========================================================================

  // Try visual compass update
  if (visualCompass) {
    visualCompass.updateFromCamera(camera.videoElement, K);
    // Get fused heading (visual + magnetic)
    const magneticHeading = sensors.getMagneticHeading();
    currentHeading = visualCompass.getHeading(magneticHeading);

    if (currentHeading) {
      if (currentHeading.source === 'visual_compass') {
        setActive('heading', `Sun tracking: ${currentHeading.heading.toFixed(0)}°`, currentHeading.confidence);
      } else if (currentHeading.source === 'fused') {
        setActive('heading', `Fused: ${currentHeading.heading.toFixed(0)}°`, currentHeading.confidence);
      } else {
        setDegraded('heading', `Mag only: ${currentHeading.heading.toFixed(0)}°`, currentHeading.confidence);
      }
    }
  } else {
    // Fallback to magnetic-only heading
    const magneticHeading = sensors.getMagneticHeading();
    if (magneticHeading !== null) {
      currentHeading = {
        heading: magneticHeading,
        source: 'magnetometer',
        confidence: 0.5,
        uncertainty: 15
      };
      setDegraded('heading', `Mag fallback: ${magneticHeading.toFixed(0)}°`, 0.5);
    } else {
      // No heading available at all
      setDegraded('heading', 'No heading source available');
    }
  }

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
    if (blowLocalizer) {
      lastBlowLocation = blowLocalizer.localize(
        best,
        K,
        currentHeading,
        currentOrientation,
        camera.currentZoom
      );

      // Update localization status
      if (lastBlowLocation) {
        const uncertainty = lastBlowLocation.uncertainty.positionMeters;
        if (uncertainty < 200) {
          setActive('localization', `${lastBlowLocation.distance}m @ ${lastBlowLocation.bearing}° (±${uncertainty}m)`);
        } else {
          setDegraded('localization', `~${lastBlowLocation.distance}m @ ${lastBlowLocation.bearing}° (±${uncertainty}m)`);
        }
      } else if (!currentHeading) {
        setDegraded('localization', 'Blocked: no heading data');
      } else {
        setDegraded('localization', 'Detection but localize failed');
      }
    }

    // Start video clip recording on first detection
    if (appState.state === AppState.DETECTING && !clipRecorder.getLatestClip()?.id?.includes(String(now).slice(0, -4))) {
      const eventId = lastBlowLocation?.eventId || `BLOW-${Date.now().toString(16).toUpperCase()}`;
      clipRecorder.startClip(eventId, best.confidence);
    }

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

      // Stop clip recording when detection ends
      clipRecorder.stopClip();
    }
    lastBlowLocation = null;
  }

  // ========================================================================
  // RENDERING
  // ========================================================================

  // Priority 4: Draw HUD first, then detection boxes on top
  // (HUD clears canvas, so detection boxes must come after)
  if (hudRenderer) {
    hudRenderer.render(
      currentOrientation,
      currentHeading,
      currentHorizon,
      currentAttitudeState ?? undefined
    );
  }

  // Draw detection boxes on top of HUD
  renderer.draw(visibleDetections);

  // Debug overlay
  if (debugOverlay.classList.contains('visible')) {
    const lastEvents = recorder.getRecentEvents();
    const ekfDiag = attitudeEKF?.getDiagnostics();
    const stats = {
      state: appState.state,
      heading: currentHeading?.heading.toFixed(1),
      headingSrc: currentHeading?.source,
      pitch: currentOrientation ? (currentOrientation.pitch * 180 / Math.PI).toFixed(1) : null,
      roll: currentOrientation ? (currentOrientation.roll * 180 / Math.PI).toFixed(1) : null,
      horizonConf: currentHorizon?.confidence.toFixed(2),
      heave: heaveComp?.getInstantaneousHeight().toFixed(2) ?? 'N/A',
      ekfReject: ekfDiag ? (ekfDiag.rejectionRate * 100).toFixed(1) + '%' : 'N/A',
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

