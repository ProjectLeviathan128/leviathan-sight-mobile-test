/**
 * Leviathan Systems - Diagnostics Panel
 * 
 * Collapsible UI overlay for model health monitoring and self-testing.
 * Works on iOS Safari and Android Chrome.
 */

import { InferenceEngine, type Detection } from '../core/inference';
import {
    createDiagnosticsState,
    formatBytes,
    isIOS,
    EXPECTED_MODEL_SHA256,
    type DiagnosticsState,
    type GoldenTestResult,
} from './model_health';

// =============================================================================
// DiagnosticsPanel Class
// =============================================================================

export class DiagnosticsPanel {
    private container: HTMLDivElement;
    private contentDiv: HTMLDivElement;
    private statusDiv: HTMLDivElement;
    private testCanvas: HTMLCanvasElement;
    private testCtx: CanvasRenderingContext2D;

    private engine: InferenceEngine;
    private state: DiagnosticsState;

    private isExpanded: boolean = false;
    private liveTestRunning: boolean = false;
    private liveTestAnimationId: number | null = null;
    private videoElement: HTMLVideoElement | null = null;

    constructor(engine: InferenceEngine) {
        this.engine = engine;
        this.state = createDiagnosticsState();

        // Create main container
        this.container = document.createElement('div');
        this.container.id = 'diagnostics-panel';
        this.container.className = 'diag-panel collapsed';

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'diag-toggle';
        toggleBtn.innerHTML = '📊';
        toggleBtn.title = 'Toggle Diagnostics Panel';
        toggleBtn.addEventListener('click', () => this.toggle());

        // Create content area
        this.contentDiv = document.createElement('div');
        this.contentDiv.className = 'diag-content';

        // Status display
        this.statusDiv = document.createElement('div');
        this.statusDiv.className = 'diag-status';

        // Test canvas for golden test
        this.testCanvas = document.createElement('canvas');
        this.testCanvas.className = 'diag-test-canvas';
        this.testCanvas.width = 320;
        this.testCanvas.height = 240;
        this.testCtx = this.testCanvas.getContext('2d')!;

        // Button container
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'diag-buttons';

        // Init Model button
        const initBtn = document.createElement('button');
        initBtn.textContent = 'Init Model';
        initBtn.addEventListener('click', () => this.initModel());

        // Self-Test button
        const testBtn = document.createElement('button');
        testBtn.textContent = 'Run Self-Test';
        testBtn.addEventListener('click', () => this.runSelfTest());

        // Live Camera Test button
        const liveBtn = document.createElement('button');
        liveBtn.id = 'diag-live-btn';
        liveBtn.textContent = 'Start Live Test';
        liveBtn.addEventListener('click', () => this.toggleLiveTest());

        // Copy JSON button
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy JSON';
        copyBtn.addEventListener('click', () => this.copyDiagnosticsJSON());

        buttonsDiv.appendChild(initBtn);
        buttonsDiv.appendChild(testBtn);
        buttonsDiv.appendChild(liveBtn);
        buttonsDiv.appendChild(copyBtn);

        // Assemble
        this.contentDiv.appendChild(this.statusDiv);
        this.contentDiv.appendChild(buttonsDiv);
        this.contentDiv.appendChild(this.testCanvas);

        this.container.appendChild(toggleBtn);
        this.container.appendChild(this.contentDiv);

        // Initial status render
        this.renderStatus();
    }

    // =========================================================================
    // Public Methods
    // =========================================================================

    mount(parent: HTMLElement = document.body): void {
        parent.appendChild(this.container);
    }

    toggle(): void {
        this.isExpanded = !this.isExpanded;
        this.container.classList.toggle('collapsed', !this.isExpanded);
        this.container.classList.toggle('expanded', this.isExpanded);
    }

    setVideoElement(video: HTMLVideoElement): void {
        this.videoElement = video;
    }

    // =========================================================================
    // Actions
    // =========================================================================

    private async initModel(): Promise<void> {
        this.updateStatus('Initializing model...');

        try {
            const result = await this.engine.initFromUrl('/best.onnx');

            // Update state
            this.state.modelUrl = result.fetchResult?.headers['content-location'] || '/best.onnx';
            this.state.fetchResult = result.fetchResult;
            this.state.sha256 = result.sha256;
            this.state.hashMatch = result.hashMatch;
            this.state.backend = result.backend;
            this.state.backendFallbackReason = result.backendFallbackReason;
            this.state.sessionInfo = result.sessionInfo;

            if (!result.success) {
                this.state.lastError = result.error;
            }

            this.renderStatus();

        } catch (e) {
            const err = e as Error;
            this.state.lastError = err.message;
            this.state.lastErrorStack = err.stack || null;
            this.renderStatus();
        }
    }

    private async runSelfTest(): Promise<void> {
        this.updateStatus('Running self-test...');

        const result: GoldenTestResult = {
            passed: false,
            preprocessDims: [1, 3, 640, 640],
            outputShapes: [],
            boxCount: 0,
            confidenceStats: null,
            durationMs: 0,
            error: null,
        };

        const startTime = performance.now();

        try {
            // Load test image
            const testImage = new Image();
            testImage.crossOrigin = 'anonymous';

            await new Promise<void>((resolve, reject) => {
                testImage.onload = () => resolve();
                testImage.onerror = () => reject(new Error('Failed to load test image'));
                testImage.src = '/model_test.png';
            });

            // Draw to canvas
            this.testCanvas.width = testImage.width;
            this.testCanvas.height = testImage.height;
            this.testCtx.drawImage(testImage, 0, 0);

            // Run inference using same pipeline
            const { detections, inferenceMs } = await this.engine.runOnCanvas(
                this.testCanvas,
                0.1, // Lower threshold to catch weak detections
                0.45
            );

            result.boxCount = detections.length;
            this.state.lastInferenceMs = inferenceMs;
            this.state.lastInferenceTimestamp = Date.now();

            // Get output shapes from session info
            const sessionInfo = this.engine.getSessionInfo();
            if (sessionInfo) {
                result.outputShapes = sessionInfo.outputs.map(o => ({
                    name: o.name,
                    dims: o.dims.map(d => typeof d === 'number' ? d : 0),
                }));
            }

            // Compute confidence stats
            if (detections.length > 0) {
                const confs = detections.map(d => d.confidence);
                result.confidenceStats = {
                    min: Math.min(...confs),
                    max: Math.max(...confs),
                    mean: confs.reduce((a, b) => a + b, 0) / confs.length,
                };
            }

            // Draw boxes on canvas
            this.drawDetections(detections);

            // Determine pass/fail
            // PASS if: session works, outputs present, no exceptions
            const sanityResult = await this.engine.sanityRun();
            result.passed = sanityResult.success && sanityResult.outputsFinite;

            if (result.passed) {
                this.updateStatus(`✅ PASS - ${result.boxCount} boxes, ${inferenceMs.toFixed(1)}ms`);
            } else {
                this.updateStatus(`❌ FAIL - ${sanityResult.error || 'Invalid outputs'}`);
            }

        } catch (e) {
            const err = e as Error;
            result.error = err.message;
            this.updateStatus(`❌ FAIL - ${err.message}`);
        }

        result.durationMs = performance.now() - startTime;
        this.renderStatus();
    }

    private toggleLiveTest(): void {
        const btn = document.getElementById('diag-live-btn');

        if (this.liveTestRunning) {
            // Stop
            this.liveTestRunning = false;
            if (this.liveTestAnimationId) {
                cancelAnimationFrame(this.liveTestAnimationId);
                this.liveTestAnimationId = null;
            }
            if (btn) btn.textContent = 'Start Live Test';
            this.updateStatus('Live test stopped');
        } else {
            // Start
            if (!this.videoElement) {
                this.updateStatus('No video element set');
                return;
            }
            this.liveTestRunning = true;
            if (btn) btn.textContent = 'Stop Live Test';
            this.runLiveTestLoop();
        }
    }

    private async runLiveTestLoop(): Promise<void> {
        if (!this.liveTestRunning || !this.videoElement) return;

        const frameStart = performance.now();

        try {
            // Draw current video frame to test canvas
            this.testCanvas.width = 320;
            this.testCanvas.height = 240;
            this.testCtx.drawImage(this.videoElement, 0, 0, 320, 240);

            // Run inference
            const { detections, inferenceMs } = await this.engine.runOnCanvas(
                this.testCanvas,
                0.25,
                0.45
            );

            // Draw boxes
            this.drawDetections(detections);

            // Update state
            this.state.lastInferenceMs = inferenceMs;
            this.state.lastInferenceTimestamp = Date.now();

            // Calculate FPS
            const frameTime = performance.now() - frameStart;
            const fps = Math.round(1000 / Math.max(frameTime, 1));

            this.updateStatus(`Live: ${fps} FPS | ${inferenceMs.toFixed(0)}ms | ${detections.length} det`);

        } catch (e) {
            const err = e as Error;
            this.state.lastError = err.message;
            this.updateStatus(`❌ ${err.message}`);
        }

        // Throttle to ~10 FPS max
        const elapsed = performance.now() - frameStart;
        const delay = Math.max(100 - elapsed, 0);

        if (this.liveTestRunning) {
            this.liveTestAnimationId = window.setTimeout(() => {
                requestAnimationFrame(() => this.runLiveTestLoop());
            }, delay) as unknown as number;
        }
    }

    private async copyDiagnosticsJSON(): Promise<void> {
        const diagnostics = {
            timestamp: new Date().toISOString(),
            ...this.state,
            engine: {
                lastInferenceMs: this.engine.lastInferenceMs,
                lastInferenceTimestamp: this.engine.lastInferenceTimestamp,
                backendUsed: this.engine.backendUsed,
                modelSha256: this.engine.modelSha256,
                sessionInfo: this.engine.getSessionInfo(),
            },
        };

        try {
            await navigator.clipboard.writeText(JSON.stringify(diagnostics, null, 2));
            this.updateStatus('📋 Copied to clipboard');
        } catch (e) {
            // Fallback for iOS
            const text = JSON.stringify(diagnostics, null, 2);
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.updateStatus('📋 Copied (fallback)');
        }
    }

    // =========================================================================
    // Rendering
    // =========================================================================

    private updateStatus(message: string): void {
        const statusLine = this.statusDiv.querySelector('.diag-status-line');
        if (statusLine) {
            statusLine.textContent = message;
        }
    }

    private renderStatus(): void {
        const s = this.state;
        const e = this.engine;

        this.statusDiv.innerHTML = `
            <div class="diag-status-line">${s.lastError ? '⚠️ ' + s.lastError : 'Ready'}</div>
            <table class="diag-table">
                <tr><td>secureContext:</td><td>${s.isSecureContext ? '✓' : '✗'}</td></tr>
                <tr><td>iOS:</td><td>${s.isIOS ? '✓' : '✗'}</td></tr>
                <tr><td>modelUrl:</td><td class="diag-mono">${s.modelUrl || '-'}</td></tr>
                <tr><td>fetch status:</td><td>${s.fetchResult?.ok ? '✓ ok' : (s.fetchResult?.error || '-')}</td></tr>
                <tr><td>bytes:</td><td>${s.fetchResult ? formatBytes(s.fetchResult.actualBytes) : '-'}</td></tr>
                <tr><td>SHA-256:</td><td class="diag-mono">${s.sha256 ? s.sha256.substring(0, 12) + '...' : '-'}</td></tr>
                <tr><td>hash match:</td><td>${s.sha256 ? (s.hashMatch ? '✓' : '✗ expected ' + EXPECTED_MODEL_SHA256.substring(0, 8)) : '-'}</td></tr>
                <tr><td>backend:</td><td>${s.backend || '-'}</td></tr>
                ${s.backendFallbackReason ? `<tr><td>fallback:</td><td class="diag-warn">${s.backendFallbackReason.substring(0, 30)}...</td></tr>` : ''}
                <tr><td>ORT threads:</td><td>${s.ortSettings.numThreads}</td></tr>
                <tr><td>inputs:</td><td>${s.sessionInfo?.inputs.map(i => i.name).join(', ') || '-'}</td></tr>
                <tr><td>outputs:</td><td>${s.sessionInfo?.outputs.map(o => o.name).join(', ') || '-'}</td></tr>
                <tr><td>last infer:</td><td>${e.lastInferenceMs ? e.lastInferenceMs.toFixed(1) + 'ms' : '-'}</td></tr>
                <tr><td>last time:</td><td>${e.lastInferenceTimestamp ? new Date(e.lastInferenceTimestamp).toLocaleTimeString() : '-'}</td></tr>
            </table>
            ${!s.isSecureContext ? '<div class="diag-warning">⚠️ Not HTTPS - camera/model may fail on iOS</div>' : ''}
        `;
    }

    private drawDetections(detections: Detection[]): void {
        // Set up canvas for drawing boxes
        const w = this.testCanvas.width;
        const h = this.testCanvas.height;

        this.testCtx.strokeStyle = '#00ff00';
        this.testCtx.lineWidth = 2;
        this.testCtx.font = '12px monospace';
        this.testCtx.fillStyle = '#00ff00';

        for (const det of detections) {
            // Convert normalized coords to canvas coords
            const x = (det.x - det.w / 2) * w;
            const y = (det.y - det.h / 2) * h;
            const bw = det.w * w;
            const bh = det.h * h;

            this.testCtx.strokeRect(x, y, bw, bh);
            this.testCtx.fillText(
                `${det.label} ${(det.confidence * 100).toFixed(0)}%`,
                x,
                y - 4
            );
        }
    }
}
