import * as ort from 'onnxruntime-web';

export interface Detection {
    x: number; // Normalized 0-1
    y: number; // Normalized 0-1
    w: number; // Normalized 0-1
    h: number; // Normalized 0-1
    confidence: number;
    classId: number;
    label: string;
}

export class InferenceEngine {
    session: ort.InferenceSession | null = null;
    inputShape = [1, 3, 640, 640];
    enabled: boolean = false;
    useMock: boolean = false; // Fallback if model not found

    // Mock state
    private lastMockUpdate = 0;
    private mockDetections: Detection[] = [];

    constructor() {
        // Set setting for Wasm
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';
    }

    async init(modelPath: string = './yolo11n-blow.onnx') {
        try {
            console.log(`Loading model from ${modelPath}...`);
            this.session = await ort.InferenceSession.create(modelPath, {
                executionProviders: ['webgpu', 'wasm'],
            });
            console.log('Model loaded successfully (WebGPU/WASM)');
            this.enabled = true;
        } catch (e) {
            console.warn('Failed to load ONNX model. Switching to MOCK mode.', e);
            this.useMock = true;
            this.enabled = true;
        }
    }

    async run(_video: HTMLVideoElement | HTMLCanvasElement, confThreshold: number = 0.5): Promise<Detection[]> {
        if (!this.enabled) return [];

        if (this.useMock) {
            return this.runMock(confThreshold);
        }

        if (!this.session) return [];

        try {
            // TODO: Real preprocessing and inference
            // For now, return empty as we likely won't hit this path without a model
            // Implementing full preprocessing for YOLOv11 requires canvas manipulation
            // and tensor creation.
            return [];
        } catch (e) {
            console.error('Inference error:', e);
            return [];
        }
    }

    private runMock(confThreshold: number): Detection[] {
        const now = Date.now();

        // Change mock detections every 2 seconds
        if (now - this.lastMockUpdate > 2000) {
            this.lastMockUpdate = now;

            // 30% chance of a blow
            if (Math.random() < 0.3) {
                const x = 0.2 + Math.random() * 0.6; // keep central
                const y = 0.4 + Math.random() * 0.2; // horizon area
                const conf = 0.6 + Math.random() * 0.39; // 0.6 - 0.99

                this.mockDetections = [{
                    x: x,
                    y: y,
                    w: 0.05, // Small blow
                    h: 0.1,  // Tall
                    confidence: conf,
                    classId: 0,
                    label: 'whale_blow'
                }];
            } else {
                this.mockDetections = [];
            }
        }

        // Return only those meeting threshold
        return this.mockDetections.filter(d => d.confidence >= confThreshold);
    }
}
