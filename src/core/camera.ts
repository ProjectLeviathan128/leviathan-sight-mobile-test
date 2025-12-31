export class CameraManager {
    videoElement: HTMLVideoElement;
    stream: MediaStream | null = null;
    isReady: boolean = false;

    constructor() {
        this.videoElement = document.createElement('video');
        // iOS requires playsinline for auto-play
        this.videoElement.setAttribute('playsinline', 'true');
        this.videoElement.setAttribute('muted', 'true');
        this.videoElement.autoplay = true;

        // We keep it in DOM but hidden or strictly for source
        // In the Zonal design, Zone B is the live view. 
        // We might want to render this video element into a canvas, 
        // OR just style this video element to be the background.
        // PRD says: "Live video full screen... Canvas overlay".
        // It's more efficient to just show the video element if we can, 
        // but for drawing boxes, we need a canvas on top.
        // Let's keep it simple: Video element is the background layer.
        this.videoElement.id = 'camera-feed';
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = '0';
        this.videoElement.style.left = '0';
        this.videoElement.style.width = '100%';
        this.videoElement.style.height = '100%';
        this.videoElement.style.objectFit = 'cover';
        this.videoElement.style.zIndex = '0'; // Bottom layer for Zone B
    }

    async start(): Promise<void> {
        if (this.stream) return;

        try {
            // "Highest resolution available"
            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: { ideal: 'environment' },
                    width: { ideal: 3840 }, // Try 4K
                    height: { ideal: 2160 }
                },
                audio: false
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.srcObject = this.stream;

            // Get track capability for zoom
            const track = this.stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities() as any; // Cast for custom props
            if (capabilities && capabilities.zoom) {
                this.zoomMin = capabilities.zoom.min;
                this.zoomMax = capabilities.zoom.max;
                this.isZoomSupported = true;
                console.log(`Zoom supported: ${this.zoomMin} - ${this.zoomMax}`);
            }

            return new Promise((resolve) => {
                this.videoElement.onloadedmetadata = () => {
                    this.videoElement.play().then(() => {
                        this.isReady = true;
                        resolve();
                    });
                };
            });
        } catch (error) {
            console.error('Camera access denied or failed:', error);
            throw error;
        }
    }

    // Zoom control
    isZoomSupported: boolean = false;
    zoomMin: number = 1;
    zoomMax: number = 1;
    currentZoom: number = 1;

    async setZoom(level: number) {
        if (!this.stream || !this.isZoomSupported) return;
        const track = this.stream.getVideoTracks()[0];

        // Clamp
        const zoom = Math.max(this.zoomMin, Math.min(this.zoomMax, level));

        try {
            await track.applyConstraints({
                advanced: [{ zoom: zoom } as any]
            });
            this.currentZoom = zoom;
        } catch (e) {
            console.warn('Zoom failed:', e);
        }
    }

    Stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            this.isReady = false;
        }
    }

    // Attach to DOM
    mount(container: HTMLElement) {
        container.appendChild(this.videoElement);
    }
}
