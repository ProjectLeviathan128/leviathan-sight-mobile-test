/**
 * Leviathan Systems - Model Health Diagnostics
 * 
 * Utilities for verifying ONNX model integrity and runtime health on iOS Safari.
 */

import * as ort from 'onnxruntime-web';

// =============================================================================
// Expected Model Hash (compute once and paste here)
// SHA-256 of /public/best.onnx - update when model changes
// =============================================================================
export const EXPECTED_MODEL_SHA256 = 'pending-verification';

// =============================================================================
// Types
// =============================================================================

export interface FetchResult {
    ok: boolean;
    status: number;
    statusText: string;
    contentLength: number | null;
    actualBytes: number;
    buffer: ArrayBuffer | null;
    error: string | null;
    headers: Record<string, string>;
}

export interface SessionInfo {
    inputs: Array<{ name: string; dims: (number | string)[] }>;
    outputs: Array<{ name: string; dims: (number | string)[] }>;
}

export interface ModelInitResult {
    success: boolean;
    fetchResult: FetchResult | null;
    sha256: string | null;
    hashMatch: boolean;
    backend: string;
    backendFallbackReason: string | null;
    sessionInfo: SessionInfo | null;
    error: string | null;
    durationMs: number;
}

export interface SanityRunResult {
    success: boolean;
    inputShape: number[];
    outputShapes: Array<{ name: string; dims: number[] }>;
    outputsFinite: boolean;
    durationMs: number;
    error: string | null;
}

export interface GoldenTestResult {
    passed: boolean;
    preprocessDims: number[];
    outputShapes: Array<{ name: string; dims: number[] }>;
    boxCount: number;
    confidenceStats: { min: number; max: number; mean: number } | null;
    durationMs: number;
    error: string | null;
}

export interface DiagnosticsState {
    // Environment
    userAgent: string;
    isIOS: boolean;
    isSecureContext: boolean;

    // Model Fetch
    modelUrl: string | null;
    fetchResult: FetchResult | null;

    // Model Integrity
    sha256: string | null;
    hashMatch: boolean;
    expectedHash: string;

    // ORT Backend
    backend: string | null;
    backendFallbackReason: string | null;
    ortSettings: {
        numThreads: number;
        simd: boolean;
        wasmPaths: string;
    };

    // Session
    sessionInfo: SessionInfo | null;

    // Runtime
    lastInferenceMs: number | null;
    lastInferenceTimestamp: number | null;

    // Errors
    lastError: string | null;
    lastErrorStack: string | null;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Detect iOS Safari
 */
export function isIOSSafari(): boolean {
    const ua = navigator.userAgent;
    return /iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua);
}

/**
 * Detect any iOS browser
 */
export function isIOS(): boolean {
    return /iPhone|iPad|iPod/.test(navigator.userAgent);
}

/**
 * Compute SHA-256 hash of an ArrayBuffer using Web Crypto API
 */
export async function computeSha256(buffer: ArrayBuffer): Promise<string> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Resolve model URL to absolute HTTPS URL
 */
export function resolveModelUrl(path: string = '/best.onnx'): string {
    return new URL(path, window.location.href).toString();
}

/**
 * Fetch model as ArrayBuffer with full diagnostics
 */
export async function fetchModelBuffer(url: string): Promise<FetchResult> {
    const result: FetchResult = {
        ok: false,
        status: 0,
        statusText: '',
        contentLength: null,
        actualBytes: 0,
        buffer: null,
        error: null,
        headers: {},
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-cache', // Ensure fresh fetch for diagnostics
        });

        result.status = response.status;
        result.statusText = response.statusText;
        result.ok = response.ok;

        // Capture headers
        response.headers.forEach((value, key) => {
            result.headers[key.toLowerCase()] = value;
        });

        // Content-Length if available
        const contentLengthHeader = response.headers.get('Content-Length');
        if (contentLengthHeader) {
            result.contentLength = parseInt(contentLengthHeader, 10);
        }

        if (!response.ok) {
            result.error = `HTTP ${response.status}: ${response.statusText}`;
            return result;
        }

        // Read as ArrayBuffer
        const buffer = await response.arrayBuffer();
        result.buffer = buffer;
        result.actualBytes = buffer.byteLength;

    } catch (e) {
        const err = e as Error;
        result.error = `Fetch failed: ${err.message}`;

        // Detect common issues
        if (err.message.includes('Failed to fetch')) {
            result.error += ' (Possible CORS, network, or mixed-content issue)';
        }
    }

    return result;
}

/**
 * Extract input/output metadata from an ORT session
 */
export function describeOrtSession(session: ort.InferenceSession): SessionInfo {
    const inputs: SessionInfo['inputs'] = [];
    const outputs: SessionInfo['outputs'] = [];

    for (const name of session.inputNames) {
        // Note: ORT-web doesn't expose tensor dims directly from session
        // We record the names; dims come from actual tensor inspection
        inputs.push({ name, dims: ['unknown'] });
    }

    for (const name of session.outputNames) {
        outputs.push({ name, dims: ['unknown'] });
    }

    return { inputs, outputs };
}

/**
 * Create initial diagnostics state
 */
export function createDiagnosticsState(): DiagnosticsState {
    return {
        userAgent: navigator.userAgent,
        isIOS: isIOS(),
        isSecureContext: window.isSecureContext,

        modelUrl: null,
        fetchResult: null,

        sha256: null,
        hashMatch: false,
        expectedHash: EXPECTED_MODEL_SHA256,

        backend: null,
        backendFallbackReason: null,
        ortSettings: {
            numThreads: ort.env.wasm.numThreads ?? 0,
            simd: Boolean(ort.env.wasm.simd ?? true),
            wasmPaths: String(ort.env.wasm.wasmPaths || ''),
        },

        sessionInfo: null,

        lastInferenceMs: null,
        lastInferenceTimestamp: null,

        lastError: null,
        lastErrorStack: null,
    };
}

/**
 * Check if outputs contain only finite values
 */
export function checkOutputsFinite(data: Float32Array): boolean {
    for (let i = 0; i < Math.min(data.length, 10000); i++) {
        if (!Number.isFinite(data[i])) {
            return false;
        }
    }
    return true;
}

/**
 * Format bytes to human readable
 */
export function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
