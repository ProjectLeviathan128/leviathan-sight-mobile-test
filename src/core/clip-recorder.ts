/**
 * Leviathan Systems - Video Clip Recorder
 * 
 * Records video clips when blows are detected
 * Uses MediaRecorder API to capture camera feed
 */

export interface ClipMetadata {
    id: string;
    startTime: number;
    endTime: number;
    duration: number;
    blobs: Blob[];
    url: string | null;
    eventId: string | null;
    confidence: number;
    bearing?: number;
    distance?: number;
}

export class ClipRecorder {
    private mediaRecorder: MediaRecorder | null = null;
    private recordedChunks: Blob[] = [];
    private isRecording: boolean = false;
    private currentClipId: string | null = null;
    private clips: ClipMetadata[] = [];

    // Ring buffer for pre-roll (keeps last N seconds)
    private preRollBuffer: Blob[] = [];
    private preRollDurationSec: number = 3;
    private preRollRecorder: MediaRecorder | null = null;

    private stream: MediaStream | null = null;

    /**
     * Initialize the clip recorder with a media stream
     */
    init(stream: MediaStream): boolean {
        this.stream = stream;

        // Check if MediaRecorder is supported
        if (!window.MediaRecorder) {
            console.warn('[ClipRecorder] MediaRecorder not supported');
            return false;
        }

        // Determine best codec
        const mimeType = this.getSupportedMimeType();
        if (!mimeType) {
            console.warn('[ClipRecorder] No supported video codec found');
            return false;
        }

        console.log(`[ClipRecorder] Initialized with codec: ${mimeType}`);

        // Start pre-roll recording
        this.startPreRoll(mimeType);

        return true;
    }

    /**
     * Get supported MIME type for video recording
     */
    private getSupportedMimeType(): string | null {
        const mimeTypes = [
            'video/webm;codecs=vp9',
            'video/webm;codecs=vp8',
            'video/webm',
            'video/mp4',
        ];

        for (const mimeType of mimeTypes) {
            if (MediaRecorder.isTypeSupported(mimeType)) {
                return mimeType;
            }
        }
        return null;
    }

    /**
     * Start pre-roll buffer recording
     * Keeps the last N seconds of video always available
     */
    private startPreRoll(mimeType: string): void {
        if (!this.stream) return;

        try {
            this.preRollRecorder = new MediaRecorder(this.stream, {
                mimeType,
                videoBitsPerSecond: 2500000, // 2.5 Mbps
            });

            this.preRollRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.preRollBuffer.push(event.data);

                    // Keep only last N chunks (roughly 1 chunk per second)
                    const maxChunks = this.preRollDurationSec;
                    if (this.preRollBuffer.length > maxChunks) {
                        this.preRollBuffer.shift();
                    }
                }
            };

            // Record in 1-second chunks for pre-roll
            this.preRollRecorder.start(1000);
            console.log('[ClipRecorder] Pre-roll buffer started');

        } catch (e) {
            console.error('[ClipRecorder] Failed to start pre-roll:', e);
        }
    }

    /**
     * Start recording a clip (called when blow detected)
     * Includes pre-roll buffer
     */
    startClip(eventId: string, confidence: number): string | null {
        if (!this.stream || this.isRecording) {
            return null;
        }

        const mimeType = this.getSupportedMimeType();
        if (!mimeType) return null;

        try {
            this.currentClipId = `clip_${Date.now()}_${eventId.substring(0, 8)}`;
            this.isRecording = true;
            this.recordedChunks = [...this.preRollBuffer]; // Include pre-roll

            this.mediaRecorder = new MediaRecorder(this.stream, {
                mimeType,
                videoBitsPerSecond: 5000000, // 5 Mbps for main recording
            });

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = () => {
                this.finalizeClip(eventId, confidence);
            };

            // Record in 500ms chunks
            this.mediaRecorder.start(500);

            console.log(`[ClipRecorder] Started clip: ${this.currentClipId}`);
            return this.currentClipId;

        } catch (e) {
            console.error('[ClipRecorder] Failed to start clip:', e);
            this.isRecording = false;
            return null;
        }
    }

    /**
     * Stop recording current clip
     */
    stopClip(): void {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
        }
    }

    /**
     * Finalize the clip and create a downloadable blob
     */
    private finalizeClip(eventId: string, confidence: number): void {
        if (this.recordedChunks.length === 0) {
            console.warn('[ClipRecorder] No chunks recorded');
            return;
        }

        const mimeType = this.getSupportedMimeType() || 'video/webm';
        const blob = new Blob(this.recordedChunks, { type: mimeType });
        const url = URL.createObjectURL(blob);

        const clip: ClipMetadata = {
            id: this.currentClipId!,
            startTime: Date.now() - (this.recordedChunks.length * 500),
            endTime: Date.now(),
            duration: this.recordedChunks.length * 500,
            blobs: this.recordedChunks,
            url,
            eventId,
            confidence,
        };

        this.clips.push(clip);

        console.log(`[ClipRecorder] Clip finalized: ${clip.id}, ${(blob.size / 1024 / 1024).toFixed(2)}MB`);

        // Auto-download the clip
        this.downloadClip(clip);

        this.currentClipId = null;
        this.recordedChunks = [];
    }

    /**
     * Download a clip
     */
    downloadClip(clip: ClipMetadata): void {
        if (!clip.url) return;

        const a = document.createElement('a');
        a.href = clip.url;
        a.download = `${clip.id}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log(`[ClipRecorder] Downloaded: ${clip.id}`);
    }

    /**
     * Get all recorded clips
     */
    getClips(): ClipMetadata[] {
        return this.clips;
    }

    /**
     * Get the most recent clip
     */
    getLatestClip(): ClipMetadata | null {
        return this.clips.length > 0 ? this.clips[this.clips.length - 1] : null;
    }

    /**
     * Clean up resources
     */
    dispose(): void {
        if (this.preRollRecorder && this.preRollRecorder.state !== 'inactive') {
            this.preRollRecorder.stop();
        }
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }

        // Revoke all blob URLs
        for (const clip of this.clips) {
            if (clip.url) {
                URL.revokeObjectURL(clip.url);
            }
        }

        this.clips = [];
        this.preRollBuffer = [];
    }
}

// Singleton instance
export const clipRecorder = new ClipRecorder();
