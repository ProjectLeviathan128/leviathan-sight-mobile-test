import { CameraManager } from './core/camera';
import { InferenceEngine } from './core/inference';
import { appState, AppState } from './core/state';
import { Renderer } from './ui/render';
import { TemporalFilter } from './core/temporal';
import { DistanceEstimator } from './core/distance';
import { Recorder } from './core/recorder';
import { SensorManager } from './core/sensors';
// type Detection removed


// DOM Elements
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

// Modules
const camera = new CameraManager();
const inference = new InferenceEngine();
const renderer = new Renderer(canvas);
const temporal = new TemporalFilter();
const distanceEst = new DistanceEstimator();
const recorder = new Recorder();
const sensors = new SensorManager();

// State
let isRecording = false;
let confidenceThreshold = 0.5; // Fixed or slider? User removed slider.
let sessionStartTime = Date.now();
let frameCount = 0;
let lastFpsTime = Date.now();
let lastRecTime = 0;

// Initialize
async function init() {
  appState.state = AppState.LOADING;

  // UI Helpers
  // updateSessionTimer(); 
  // setInterval(updateSessionTimer, 1000); // Removed timer from UI in html update

  // Camera
  try {
    camera.mount(container);
    await camera.start();
  } catch (e) {
    console.error(e);
    zoneA.model.textContent = '● CAM ERROR';
    zoneA.model.style.color = '#ff5252';
    return;
  }

  // Inference
  await inference.init('yolo11n-blow.onnx'); // Try finding the real model
  if (inference.useMock) {
    zoneA.model.textContent = '● MOCK';
    zoneA.model.style.color = '#ffc107';
  } else {
    zoneA.model.textContent = '● LOADED';
    zoneA.model.style.color = '#4caf50';
  }

  // Sensors
  await sensors.requestPermission(); // Might need user gesture but init is async.
  // Ideally request permission on first interaction, but let's try auto-start or button.
  // iOS requires interaction. We'll add a start button or just try.
  // Actually the user said "Button to request camera + sensor permissions" in MVP.
  // For now we try on load, if fails, we rely on user tapping something?
  // Let's add a global tap handler to init sensors if not active.
  document.body.addEventListener('click', () => {
    if (!sensors.permissionGranted) sensors.requestPermission();
  }, { once: true });

  appState.state = AppState.READY;

  // Resize canvas to match window
  resize();
  window.addEventListener('resize', resize);

  // Loop
  requestAnimationFrame(loop);
}

function resize() {
  renderer.resize(window.innerWidth, window.innerHeight);
}

// Main Loop
async function loop() {
  if (appState.state === AppState.ERROR) return;

  const now = Date.now();
  frameCount++;

  if (now - lastFpsTime >= 1000) {
    zoneA.fps.textContent = `${frameCount} FPS`;
    frameCount = 0;
    lastFpsTime = now;
  }

  // 0. Update HUD (Sensors)
  zoneA.heading.textContent = sensors.getHeadingString();
  zoneA.zoom.textContent = `${camera.currentZoom}x`;

  // 1. Inference
  const rawDetections = await inference.run(camera.videoElement, 0.1);

  // 2. Temporal Logic
  const trackedDetections = temporal.update(rawDetections);

  // 3. Filter
  const visibleDetections = trackedDetections.filter(d => d.confidence >= confidenceThreshold);

  // 4. State & Record
  if (visibleDetections.length > 0) {
    if (appState.state !== AppState.EVENT && appState.state !== AppState.DETECTING) {
      appState.state = AppState.DETECTING;
    }

    if (isRecording && now - lastRecTime > 2000) {
      const best = visibleDetections.sort((a, b) => b.confidence - a.confidence)[0];
      const dist = distanceEst.estimate(best);
      recorder.capture(best, dist, canvas);
      lastRecTime = now;

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
  }

  // 5. Render
  renderer.draw(visibleDetections);

  // 6. Debug
  if (debugOverlay.classList.contains('visible')) {
    const lastEvents = recorder.getRecentEvents();
    const stats = {
      state: appState.state,
      heading: sensors.orientation.alpha?.toFixed(1),
      zoom: camera.currentZoom,
      events: recorder.events.length,
      last: lastEvents[0] ? lastEvents[0].event_id.substring(0, 4) : 'None'
    };
    debugStats.textContent = JSON.stringify(stats, null, 2);
  }

  requestAnimationFrame(loop);
}

// UI Interactions
zoneC.btnZoom1.addEventListener('click', () => camera.setZoom(1));
zoneC.btnZoom4.addEventListener('click', () => camera.setZoom(4));

zoneC.btnRecord.addEventListener('click', () => {
  isRecording = !isRecording;
  zoneC.btnRecord.classList.toggle('active', isRecording);
  zoneC.btnRecord.textContent = isRecording ? 'ARMED' : 'REC';
});

// Swipe Down Logic
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

init();
