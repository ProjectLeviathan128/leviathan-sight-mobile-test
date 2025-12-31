export interface OrientationData {
    alpha: number | null; // Compass heading (0-360)
    beta: number | null;  // Front/Back tilt (-180 to 180)
    gamma: number | null; // Left/Right tilt (-90 to 90)
    absolute: boolean;
}

export interface MotionData {
    accelX: number | null;
    accelY: number | null;
    accelZ: number | null;
}

export class SensorManager {
    orientation: OrientationData = { alpha: 0, beta: 0, gamma: 0, absolute: false };
    motion: MotionData = { accelX: 0, accelY: 0, accelZ: 0 };
    available: boolean = false;
    permissionGranted: boolean = false;

    constructor() {
        this.handleOrientation = this.handleOrientation.bind(this);
        this.handleMotion = this.handleMotion.bind(this);
    }

    async requestPermission(): Promise<boolean> {
        // iOS 13+ requires permission for DeviceOrientation
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const response = await (DeviceOrientationEvent as any).requestPermission();
                if (response === 'granted') {
                    this.permissionGranted = true;
                    this.start();
                    return true;
                } else {
                    console.warn('Permission denied');
                    return false;
                }
            } catch (e) {
                console.error(e);
                return false;
            }
        } else {
            // Non-iOS or older
            this.permissionGranted = true;
            this.start();
            return true;
        }
    }

    start() {
        if (!this.permissionGranted) return;
        window.addEventListener('deviceorientation', this.handleOrientation);
        window.addEventListener('devicemotion', this.handleMotion);
        this.available = true;
    }

    stop() {
        window.removeEventListener('deviceorientation', this.handleOrientation);
        window.removeEventListener('devicemotion', this.handleMotion);
    }

    private handleOrientation(event: DeviceOrientationEvent) {
        // iOS Safari webkitCompassHeading
        let heading = event.alpha;
        if ((event as any).webkitCompassHeading) {
            heading = (event as any).webkitCompassHeading;
            this.orientation.absolute = true;
        }

        this.orientation.alpha = heading;
        this.orientation.beta = event.beta;
        this.orientation.gamma = event.gamma;
    }

    private handleMotion(event: DeviceMotionEvent) {
        this.motion.accelX = event.accelerationIncludingGravity?.x || 0;
        this.motion.accelY = event.accelerationIncludingGravity?.y || 0;
        this.motion.accelZ = event.accelerationIncludingGravity?.z || 0;
    }

    getHeadingString(): string {
        if (this.orientation.alpha === null) return "---°";
        return `${Math.round(this.orientation.alpha)}°`;
    }
}
