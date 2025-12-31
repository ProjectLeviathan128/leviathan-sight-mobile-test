/**
 * Simple on-screen logger for mobile debugging
 */
export class MobileLogger {
    private static instance: MobileLogger;
    private container: HTMLDivElement;
    private logContent: HTMLPreElement;
    private isVisible: boolean = false;

    private constructor() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100vw';
        this.container.style.height = '50vh';
        this.container.style.backgroundColor = 'rgba(0,0,0,0.8)';
        this.container.style.color = '#0f0';
        this.container.style.fontFamily = 'monospace';
        this.container.style.fontSize = '12px';
        this.container.style.overflowY = 'scroll';
        this.container.style.zIndex = '9999';
        this.container.style.padding = '10px';
        this.container.style.pointerEvents = 'none'; // Click through
        this.container.style.display = 'none';

        this.logContent = document.createElement('pre');
        this.logContent.style.margin = '0';
        this.logContent.style.whiteSpace = 'pre-wrap';

        this.container.appendChild(this.logContent);
        document.body.appendChild(this.container);

        // Triple tap to toggle anywhere
        let taps = 0;
        document.addEventListener('touchstart', () => {
            taps++;
            setTimeout(() => taps = 0, 500);
            if (taps === 3) this.toggle();
        });
    }

    static getInstance(): MobileLogger {
        if (!MobileLogger.instance) {
            MobileLogger.instance = new MobileLogger();
        }
        return MobileLogger.instance;
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.container.style.display = this.isVisible ? 'block' : 'none';
        this.container.style.pointerEvents = this.isVisible ? 'auto' : 'none';
    }

    log(message: string) {
        // Also log to console
        console.log(message);

        const line = typeof message === 'string' ? message : JSON.stringify(message);
        this.logContent.textContent += `> ${line}\n`;
        this.container.scrollTop = this.container.scrollHeight;
    }

    error(message: string) {
        console.error(message);
        const line = typeof message === 'string' ? message : JSON.stringify(message);
        this.logContent.textContent += `[ERR] ${line}\n`;
        this.container.scrollTop = this.container.scrollHeight;
    }
}

export const mobileLogger = MobileLogger.getInstance();
