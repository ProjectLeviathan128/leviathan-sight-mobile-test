/**
 * Leviathan Systems - Safe Canvas Factory
 * Cross-browser compatible canvas creation with OffscreenCanvas fallback
 * 
 * Addresses iOS Safari incompatibility with OffscreenCanvas
 */

export interface Canvas2DContext {
    canvas: OffscreenCanvas | HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
}

/**
 * Create a 2D canvas context with automatic fallback.
 * 
 * Priority:
 * 1. OffscreenCanvas (if available and context works)
 * 2. HTMLCanvasElement (DOM-based fallback)
 * 
 * @param width - Canvas width in pixels
 * @param height - Canvas height in pixels
 * @param opts - Optional 2D context settings (e.g., { willReadFrequently: true })
 * @returns Canvas and 2D context pair
 * @throws Error if 2D context is not supported at all
 */
export function createCanvas2D(
    width: number,
    height: number,
    opts?: CanvasRenderingContext2DSettings
): Canvas2DContext {
    // Try OffscreenCanvas first (better performance, works in workers)
    if (typeof OffscreenCanvas !== 'undefined') {
        try {
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext('2d', opts);
            if (ctx) {
                return { canvas, ctx };
            }
            // Context is null - fall through to HTMLCanvasElement
            console.warn('[canvas2d] OffscreenCanvas 2D context returned null, falling back to HTMLCanvasElement');
        } catch (e) {
            // OffscreenCanvas creation failed - fall through
            console.warn('[canvas2d] OffscreenCanvas failed:', e);
        }
    }

    // Fallback: HTMLCanvasElement
    if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', opts);
        if (ctx) {
            return { canvas, ctx };
        }
    }

    // Neither works - critical failure
    throw new Error('[canvas2d] 2D canvas context not supported in this environment');
}

/**
 * Type guard to check if a canvas is OffscreenCanvas
 */
export function isOffscreenCanvas(
    canvas: OffscreenCanvas | HTMLCanvasElement
): canvas is OffscreenCanvas {
    return typeof OffscreenCanvas !== 'undefined' && canvas instanceof OffscreenCanvas;
}
