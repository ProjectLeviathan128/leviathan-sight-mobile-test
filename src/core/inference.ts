/**
 * Leviathan Systems - YOLOv11 ONNX Inference Engine
 * Real-time whale blow detection using Ultralytics YOLOv11
 * 
 * Model: Trained with Ultralytics on Roboflow whale blow dataset
 * Runtime: ONNX Runtime Web (WebGPU/WASM)
 */

import * as ort from 'onnxruntime-web';
import { mobileLogger } from '../ui/logger';

export interface Detection {
    x: number; // Normalized center x (0-1)
    y: number; // Normalized center y (0-1)
    w: number; // Normalized width (0-1)
    h: number; // Normalized height (0-1)
    confidence: number;
    classId: number;
    label: string;
}

// Class labels for the blow detection model
const CLASS_LABELS = ['whale_blow'];

export class InferenceEngine {
    session: ort.InferenceSession | null = null;
    inputName: string = 'images';
    outputName: string = 'output0';
    inputShape = [1, 3, 640, 640]; // NCHW format
    enabled: boolean = false;
    useMock: boolean = false;

    // Preprocessing canvas
    private canvas: OffscreenCanvas;
    private ctx: OffscreenCanvasRenderingContext2D;

    // Mock state
    private lastMockUpdate = 0;
    private mockDetections: Detection[] = [];

    constructor() {
        // Set WASM paths for ONNX Runtime
        ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

        // Pre-allocate canvas for preprocessing
        this.canvas = new OffscreenCanvas(640, 640);
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
    }

    async init(modelPath: string = '/best.onnx') {
        try {
            mobileLogger.log(`[Leviathan] Loading YOLO ONNX model from ${modelPath}...`);

            // 1. Load Session
            const sessionOptions: ort.InferenceSession.SessionOptions = {
                executionProviders: ['webgpu', 'wasm'],
                graphOptimizationLevel: 'all',
                logSeverityLevel: 0, // Verbose logging
            };

            this.session = await ort.InferenceSession.create(modelPath, sessionOptions);

            // 2. Inspect & Log Tensor Details
            // 2. Inspect & Log Tensor Details
            mobileLogger.log('[Leviathan] Model Loaded Successfully');

            // Input Details
            mobileLogger.log('--- Inputs ---');
            this.inputName = this.session.inputNames[0];
            this.session.inputNames.forEach(name => {
                mobileLogger.log(`Name: "${name}"`);
            });

            // Output Details
            mobileLogger.log('--- Outputs ---');
            this.outputName = this.session.outputNames[0];
            this.session.outputNames.forEach(name => {
                mobileLogger.log(`Name: "${name}"`);
            });
            console.groupEnd();

            this.enabled = true;
            this.useMock = false;
        } catch (e) {
            mobileLogger.error(`[Leviathan] CRITICAL: Failed to load ONNX model. ${e}`);
            console.warn('[Leviathan] Falling back to MOCK mode for development.');
            this.useMock = true;
            this.enabled = true;
        }
    }

    async run(
        video: HTMLVideoElement | HTMLCanvasElement,
        confThreshold: number = 0.25,
        iouThreshold: number = 0.45
    ): Promise<Detection[]> {
        if (!this.enabled) return [];
        if (this.useMock) return this.runMock(confThreshold);
        if (!this.session) return [];

        try {
            // Preprocess: letterbox resize to 640x640
            const inputTensor = this.preprocess(video);

            // Run inference
            const feeds: Record<string, ort.Tensor> = {};
            feeds[this.inputName] = inputTensor;

            const results = await this.session.run(feeds);
            const output = results[this.outputName];

            // Postprocess: parse YOLOv11 output format and apply NMS
            const detections = this.postprocess(
                output.data as Float32Array,
                output.dims as number[],
                confThreshold,
                iouThreshold
            );

            // DEBUG LOGGING
            const maxScore = detections.length > 0 ? detections[0].confidence : 0;
            // sample input
            const inputData = inputTensor.data as Float32Array;
            const sampleInput = [inputData[0], inputData[100], inputData[1000]]; // Sample first few pixels

            // Log every 60 frames (~1 sec) to verify inputs are non-zero and outputs are valid
            if (Date.now() % 60 === 0 || detections.length > 0) {
                mobileLogger.log(`Conf: ${maxScore.toFixed(2)} | Input[0]: ${sampleInput[0].toFixed(3)} | Dets: ${detections.length}`);
            }

            return detections;

        } catch (e) {
            console.error('[Ultralytics] Inference error:', e);
            return [];
        }
    }

    /**
     * Preprocess image for YOLOv11:
     * 1. Letterbox resize to 640x640
     * 2. Convert to RGB float32 [0, 1]
     * 3. Transpose to NCHW format
     */
    private preprocess(source: HTMLVideoElement | HTMLCanvasElement): ort.Tensor {
        const [_, channels, height, width] = this.inputShape;

        // Get source dimensions
        const srcWidth = source instanceof HTMLVideoElement ? source.videoWidth : source.width;
        const srcHeight = source instanceof HTMLVideoElement ? source.videoHeight : source.height;

        // Calculate letterbox scale and padding
        const scale = Math.min(width / srcWidth, height / srcHeight);
        const newW = Math.round(srcWidth * scale);
        const newH = Math.round(srcHeight * scale);
        const padX = (width - newW) / 2;
        const padY = (height - newH) / 2;

        // Clear canvas with gray (letterbox color)
        this.ctx.fillStyle = '#808080';
        this.ctx.fillRect(0, 0, width, height);

        // Draw scaled image centered
        this.ctx.drawImage(source, padX, padY, newW, newH);

        // Get pixel data
        const imageData = this.ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        // Convert to NCHW float32 [0, 1]
        const floatData = new Float32Array(channels * height * width);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelIdx = (y * width + x) * 4;
                const r = pixels[pixelIdx] / 255.0;
                const g = pixels[pixelIdx + 1] / 255.0;
                const b = pixels[pixelIdx + 2] / 255.0;

                // NCHW layout: [batch, channel, height, width]
                floatData[0 * height * width + y * width + x] = r;
                floatData[1 * height * width + y * width + x] = g;
                floatData[2 * height * width + y * width + x] = b;
            }
        }

        return new ort.Tensor('float32', floatData, this.inputShape);
    }

    /**
     * Postprocess YOLOv11 output:
     * - Output shape: [1, 5 + num_classes, num_boxes] or [1, num_boxes, 5 + num_classes]
     * - Apply confidence threshold and NMS
     */
    private postprocess(
        data: Float32Array,
        dims: number[],
        confThreshold: number,
        iouThreshold: number
    ): Detection[] {
        const detections: Detection[] = [];

        // YOLOv11 output format: [1, 5+nc, num_boxes] where 5 = x,y,w,h,conf
        // or transposed [1, num_boxes, 5+nc]
        // We need to handle both cases

        let numBoxes: number;
        let numFeatures: number;
        let isTransposed: boolean;

        if (dims.length === 3) {
            if (dims[1] < dims[2]) {
                // [1, features, boxes] - original format
                numFeatures = dims[1];
                numBoxes = dims[2];
                isTransposed = false;
            } else {
                // [1, boxes, features] - transposed
                numBoxes = dims[1];
                numFeatures = dims[2];
                isTransposed = true;
            }
        } else {
            console.warn('[Ultralytics] Unexpected output dims:', dims);
            return [];
        }

        const numClasses = numFeatures - 4; // x, y, w, h + class scores

        for (let i = 0; i < numBoxes; i++) {
            let x: number, y: number, w: number, h: number;
            let classScores: number[] = [];

            if (isTransposed) {
                // [1, boxes, features]
                const offset = i * numFeatures;
                x = data[offset];
                y = data[offset + 1];
                w = data[offset + 2];
                h = data[offset + 3];
                for (let c = 0; c < numClasses; c++) {
                    classScores.push(data[offset + 4 + c]);
                }
            } else {
                // [1, features, boxes]
                x = data[0 * numBoxes + i];
                y = data[1 * numBoxes + i];
                w = data[2 * numBoxes + i];
                h = data[3 * numBoxes + i];
                for (let c = 0; c < numClasses; c++) {
                    classScores.push(data[(4 + c) * numBoxes + i]);
                }
            }

            // Find best class
            let maxScore = 0;
            let maxClassId = 0;
            for (let c = 0; c < classScores.length; c++) {
                if (classScores[c] > maxScore) {
                    maxScore = classScores[c];
                    maxClassId = c;
                }
            }

            if (maxScore > 0.1) {
                 // Log potential candidates (even if below display threshold)
                 // mobileLogger.log(`Raw candidate: ${maxScore.toFixed(2)}`);
            }

            if (maxScore < confThreshold) continue;

            // Convert from pixel coords to normalized (YOLOv11 outputs pixel coords)
            const det: Detection = {
                x: x / 640,
                y: y / 640,
                w: w / 640,
                h: h / 640,
                confidence: maxScore,
                classId: maxClassId,
                label: CLASS_LABELS[maxClassId] || `class_${maxClassId}`,
            };

            detections.push(det);
        }

        // Apply NMS
        return this.nms(detections, iouThreshold);
    }

    /**
     * Non-Maximum Suppression
     */
    private nms(detections: Detection[], iouThreshold: number): Detection[] {
        // Sort by confidence descending
        detections.sort((a, b) => b.confidence - a.confidence);

        const kept: Detection[] = [];
        const suppressed = new Set<number>();

        for (let i = 0; i < detections.length; i++) {
            if (suppressed.has(i)) continue;

            kept.push(detections[i]);

            for (let j = i + 1; j < detections.length; j++) {
                if (suppressed.has(j)) continue;

                const iou = this.computeIoU(detections[i], detections[j]);
                if (iou > iouThreshold) {
                    suppressed.add(j);
                }
            }
        }

        return kept;
    }

    /**
     * Intersection over Union
     */
    private computeIoU(a: Detection, b: Detection): number {
        // Convert center-width-height to corner format
        const ax1 = a.x - a.w / 2, ay1 = a.y - a.h / 2;
        const ax2 = a.x + a.w / 2, ay2 = a.y + a.h / 2;
        const bx1 = b.x - b.w / 2, by1 = b.y - b.h / 2;
        const bx2 = b.x + b.w / 2, by2 = b.y + b.h / 2;

        const interX1 = Math.max(ax1, bx1);
        const interY1 = Math.max(ay1, by1);
        const interX2 = Math.min(ax2, bx2);
        const interY2 = Math.min(ay2, by2);

        const interW = Math.max(0, interX2 - interX1);
        const interH = Math.max(0, interY2 - interY1);
        const interArea = interW * interH;

        const areaA = a.w * a.h;
        const areaB = b.w * b.h;
        const unionArea = areaA + areaB - interArea;

        return unionArea > 0 ? interArea / unionArea : 0;
    }

    /**
     * Mock mode for testing without model
     */
    private runMock(confThreshold: number): Detection[] {
        const now = Date.now();

        // Change mock detections every 2 seconds
        if (now - this.lastMockUpdate > 2000) {
            this.lastMockUpdate = now;

            // 30% chance of a blow
            if (Math.random() < 0.3) {
                const x = 0.2 + Math.random() * 0.6;
                const y = 0.4 + Math.random() * 0.2;
                const conf = 0.6 + Math.random() * 0.39;

                this.mockDetections = [{
                    x,
                    y,
                    w: 0.05,
                    h: 0.1,
                    confidence: conf,
                    classId: 0,
                    label: 'whale_blow'
                }];
            } else {
                this.mockDetections = [];
            }
        }

        return this.mockDetections.filter(d => d.confidence >= confThreshold);
    }
}

