/**
 * Leviathan Systems - Core Types
 * Maritime spatial estimation type definitions
 */

// ============================================================================
// Coordinate Frames (per Section 2.1 of spec)
// ============================================================================

export const CoordinateFrame = {
    /** World frame: North-East-Down (NED) tangent to WGS-84 ellipsoid */
    WORLD_NED: 'WORLD_NED',
    /** Vessel body frame: Surge-Sway-Heave (X=bow, Y=starboard, Z=keel) */
    BODY: 'BODY',
    /** Camera frame: Z=optical axis forward, X=right, Y=down */
    CAMERA: 'CAMERA',
    /** Device sensor frame: Y=top-of-screen, X=right, Z=out (portrait) */
    SENSOR: 'SENSOR',
} as const;

export type CoordinateFrame = typeof CoordinateFrame[keyof typeof CoordinateFrame];

// ============================================================================
// Vector & Matrix Types
// ============================================================================

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Vector2 {
    x: number;
    y: number;
}

/** 3x3 matrix in row-major order */
export type Matrix3x3 = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
];

/** Quaternion: [w, x, y, z] where w is scalar part */
export interface Quaternion {
    w: number;
    x: number;
    y: number;
    z: number;
}

// ============================================================================
// Orientation & Attitude
// ============================================================================

/** Euler angles in radians (Tait-Bryan convention: ZYX) */
export interface Orientation {
    /** Roll: rotation about X (surge) axis, radians */
    roll: number;
    /** Pitch: rotation about Y (sway) axis, radians */
    pitch: number;
    /** Yaw/Heading: rotation about Z (heave) axis, radians from North */
    yaw: number;
}

/** Attitude state with uncertainty */
export interface AttitudeState {
    orientation: Orientation;
    /** Standard deviation of roll estimate (radians) */
    rollStd: number;
    /** Standard deviation of pitch estimate (radians) */
    pitchStd: number;
    /** Standard deviation of yaw estimate (radians) */
    yawStd: number;
    /** Timestamp of state (ms since epoch) */
    timestamp: number;
}

// ============================================================================
// Camera Intrinsics (per Section 2.2.1)
// ============================================================================

/** Pinhole camera intrinsic matrix parameters */
export interface IntrinsicMatrix {
    /** Focal length in horizontal pixels */
    fx: number;
    /** Focal length in vertical pixels */
    fy: number;
    /** Principal point X (optical center) */
    cx: number;
    /** Principal point Y (optical center) */
    cy: number;
    /** Image width in pixels */
    width: number;
    /** Image height in pixels */
    height: number;
}

// ============================================================================
// Horizon Detection (per Section 3)
// ============================================================================

/** Detected horizon line in image coordinates */
export interface HorizonLine {
    /** Angle of horizon line from horizontal (radians) - corresponds to roll */
    angle: number;
    /** Perpendicular distance from principal point (pixels) */
    offset: number;
    /** Detection confidence [0, 1] */
    confidence: number;
    /** Derived roll angle (radians) */
    roll: number;
    /** Derived pitch angle (radians), corrected for dip */
    pitch: number;
}

/** Result of horizon detection with metadata */
export interface HorizonResult {
    horizon: HorizonLine | null;
    /** Processing time (ms) */
    processingTime: number;
    /** Was glare masking applied */
    glareMasked: boolean;
    /** Reason for null result if applicable */
    failureReason?: string;
}

// ============================================================================
// Ranging (per Section 5)
// ============================================================================

export interface RangeEstimate {
    /** Minimum estimated distance (meters) */
    min: number;
    /** Maximum estimated distance (meters) */
    max: number;
    /** Best estimate distance (meters) */
    best: number;
    /** Method used for estimation */
    method: 'horizon_dip' | 'stadiametric' | 'unknown';
    /** Confidence [0, 1] */
    confidence: number;
    /** Human-readable description */
    description: string;
}

// ============================================================================
// IMU Data (per Section 6)
// ============================================================================

export interface IMUSample {
    /** Timestamp (ms since epoch) */
    timestamp: number;
    /** Angular velocity (rad/s) in sensor frame */
    gyro: Vector3;
    /** Linear acceleration (m/s²) in sensor frame */
    accel: Vector3;
    /** Acceleration including gravity (m/s²) */
    accelWithGravity: Vector3;
}

export interface MagnetometerSample {
    /** Timestamp (ms since epoch) */
    timestamp: number;
    /** Magnetic field vector (μT) in sensor frame */
    field: Vector3;
    /** Calibration accuracy (0=uncalibrated, 3=high) */
    accuracy: number;
}

// ============================================================================
// Navigation (per Section 4)
// ============================================================================

export interface SunPosition {
    /** Azimuth from True North (degrees, 0-360) */
    azimuth: number;
    /** Elevation above horizon (degrees, -90 to 90) */
    elevation: number;
    /** Is sun above horizon */
    visible: boolean;
}

export interface HeadingEstimate {
    /** True heading from North (degrees, 0-360) */
    heading: number;
    /** Source of heading estimate */
    source: 'visual_compass' | 'magnetometer' | 'fused';
    /** Confidence [0, 1] */
    confidence: number;
    /** Standard deviation (degrees) */
    uncertainty: number;
}

// ============================================================================
// Constants
// ============================================================================

export const EARTH_RADIUS_M = 6_371_000; // meters
export const STANDARD_GRAVITY = 9.80665; // m/s²
export const REFRACTION_COEFFICIENT = 1.17; // k for standard maritime
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;

// ============================================================================
// Utility Functions
// ============================================================================

/** Create identity quaternion */
export function quatIdentity(): Quaternion {
    return { w: 1, x: 0, y: 0, z: 0 };
}

/** Quaternion multiplication: q1 * q2 */
export function quatMultiply(q1: Quaternion, q2: Quaternion): Quaternion {
    return {
        w: q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z,
        x: q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
        y: q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
        z: q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,
    };
}

/** Normalize quaternion to unit length */
export function quatNormalize(q: Quaternion): Quaternion {
    const norm = Math.sqrt(q.w * q.w + q.x * q.x + q.y * q.y + q.z * q.z);
    if (norm < 1e-10) return quatIdentity();
    return { w: q.w / norm, x: q.x / norm, y: q.y / norm, z: q.z / norm };
}

/** Quaternion conjugate (inverse for unit quaternion) */
export function quatConjugate(q: Quaternion): Quaternion {
    return { w: q.w, x: -q.x, y: -q.y, z: -q.z };
}

/** Convert quaternion to Euler angles (ZYX convention) */
export function quatToEuler(q: Quaternion): Orientation {
    // Roll (x-axis rotation)
    const sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
    const cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
    const roll = Math.atan2(sinr_cosp, cosr_cosp);

    // Pitch (y-axis rotation)
    const sinp = 2 * (q.w * q.y - q.z * q.x);
    const pitch = Math.abs(sinp) >= 1
        ? Math.sign(sinp) * Math.PI / 2
        : Math.asin(sinp);

    // Yaw (z-axis rotation)
    const siny_cosp = 2 * (q.w * q.z + q.x * q.y);
    const cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);

    return { roll, pitch, yaw };
}

/** Convert Euler angles to quaternion (ZYX convention) */
export function eulerToQuat(euler: Orientation): Quaternion {
    const { roll, pitch, yaw } = euler;
    const cr = Math.cos(roll / 2);
    const sr = Math.sin(roll / 2);
    const cp = Math.cos(pitch / 2);
    const sp = Math.sin(pitch / 2);
    const cy = Math.cos(yaw / 2);
    const sy = Math.sin(yaw / 2);

    return quatNormalize({
        w: cr * cp * cy + sr * sp * sy,
        x: sr * cp * cy - cr * sp * sy,
        y: cr * sp * cy + sr * cp * sy,
        z: cr * cp * sy - sr * sp * cy,
    });
}

/** Rotate vector by quaternion */
export function quatRotateVector(q: Quaternion, v: Vector3): Vector3 {
    const qv: Quaternion = { w: 0, x: v.x, y: v.y, z: v.z };
    const result = quatMultiply(quatMultiply(q, qv), quatConjugate(q));
    return { x: result.x, y: result.y, z: result.z };
}

/** Vector dot product */
export function vec3Dot(a: Vector3, b: Vector3): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

/** Vector cross product */
export function vec3Cross(a: Vector3, b: Vector3): Vector3 {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
    };
}

/** Vector magnitude */
export function vec3Magnitude(v: Vector3): number {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

/** Normalize vector */
export function vec3Normalize(v: Vector3): Vector3 {
    const mag = vec3Magnitude(v);
    if (mag < 1e-10) return { x: 0, y: 0, z: 0 };
    return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
}

/** Vector subtraction */
export function vec3Sub(a: Vector3, b: Vector3): Vector3 {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

/** Vector addition */
export function vec3Add(a: Vector3, b: Vector3): Vector3 {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

/** Scalar multiplication */
export function vec3Scale(v: Vector3, s: number): Vector3 {
    return { x: v.x * s, y: v.y * s, z: v.z * s };
}
