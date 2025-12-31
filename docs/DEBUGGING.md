# Debugging Guide

This document explains how to run and debug the Leviathan Sight mobile web app on real devices.

## Running with HTTPS (Required for iOS)

iOS Safari requires HTTPS for camera, motion sensors, and geolocation. Choose one method:

### Option 1: Vite Built-in HTTPS (Recommended)

```bash
npx vite --host --https
```

This generates a self-signed certificate. Accept the browser warning on first load.

### Option 2: Use vite-plugin-mkcert

```bash
npm install -D vite-plugin-mkcert
```

Add to `vite.config.ts`:
```typescript
import mkcert from 'vite-plugin-mkcert';
export default { plugins: [mkcert()] };
```

### Option 3: Tunnel Service

Use ngrok, Cloudflare Tunnel, or similar:
```bash
npx ngrok http 5173
```

## Health Status Overlay

A diagnostic overlay appears in the **top-left corner** showing:

| Field | Meaning |
|-------|---------|
| `secure` | `✓` = HTTPS/localhost, `✗` = features may be blocked |
| `camera` | `uninitialized` → `requesting` → `granted`/`denied`/`error` |
| `sensors` | `ios-needs-tap` (tap button) → `granted`/`denied` |
| `model` | `loading` → `loaded`/`mock`/`error` |
| `heartbeat` | `✓` if main loop running, `⚠️ Xms` if stalled |

If any field shows an error, check the browser console for details.

## iOS-Specific Notes

### Sensor Permissions

iOS 13+ requires **two separate** permissions:
1. **DeviceOrientationEvent** - compass/heading
2. **DeviceMotionEvent** - gyroscope/accelerometer

Both must be granted from a **user gesture** (button tap). The "Tap to Enable Sensors" button handles this.

### OffscreenCanvas

iOS Safari has limited OffscreenCanvas support. The app uses a fallback to HTMLCanvasElement when OffscreenCanvas fails.

### Known Limitations

- Camera zoom may be limited on some iOS devices
- WebGPU not available on older iOS (falls back to WASM)
- Compass may require calibration if heading is inaccurate

## Troubleshooting

### "Nothing works" / blank screen
1. Check health overlay for errors
2. Verify HTTPS (check `secure: ✓`)
3. On iOS, tap the sensor permission button

### Sensors not updating
1. Verify `sensors: granted` in overlay
2. On iOS, both orientation AND motion must be granted
3. Try reloading and tapping permission button again

### Model shows "error"
- Check console for ONNX loading errors
- Verify `best.onnx` exists in `/public/`
- Model falls back to mock mode if loading fails

### Camera shows "error"
- Verify HTTPS (camera blocked on HTTP)
- Check if another app is using the camera
- Try reloading the page
