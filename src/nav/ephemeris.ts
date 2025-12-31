/**
 * Leviathan Systems - Solar Ephemeris
 * Sun position calculation for visual compass
 * 
 * Reference: Section 4.3 of Leviathan Systems spec
 * Simplified Solar Position Algorithm (SPA) implementation
 */

import type { SunPosition } from '../core/types';
import { DEG_TO_RAD, RAD_TO_DEG } from '../core/types';

// ============================================================================
// Constants
// ============================================================================

const JULIAN_EPOCH = 2451545.0; // J2000.0 (Jan 1, 2000, 12:00 TT)

// ============================================================================
// Solar Ephemeris Class
// ============================================================================

export class SolarEphemeris {
    /**
     * Calculate sun position in the sky
     * 
     * @param latitude - Observer latitude in degrees (-90 to 90)
     * @param longitude - Observer longitude in degrees (-180 to 180)
     * @param date - Date/time for calculation (default: now)
     * @returns Sun azimuth and elevation
     */
    getSunPosition(latitude: number, longitude: number, date: Date = new Date()): SunPosition {
        // Convert latitude/longitude to radians
        const latRad = latitude * DEG_TO_RAD;
        const _lonRad = longitude * DEG_TO_RAD; // Reserved for future precision

        // Get Julian Date
        const jd = this.dateToJulianDate(date);
        const jc = (jd - JULIAN_EPOCH) / 36525; // Julian centuries from J2000

        // Mean solar longitude (degrees)
        const L0 = this.normalizeAngle(280.46646 + 36000.76983 * jc + 0.0003032 * jc * jc);

        // Mean anomaly of the Sun (degrees)
        const M = this.normalizeAngle(357.52911 + 35999.05029 * jc - 0.0001537 * jc * jc);
        const Mrad = M * DEG_TO_RAD;

        // Equation of center (degrees)
        const C = (1.914602 - 0.004817 * jc - 0.000014 * jc * jc) * Math.sin(Mrad)
            + (0.019993 - 0.000101 * jc) * Math.sin(2 * Mrad)
            + 0.000289 * Math.sin(3 * Mrad);

        // Sun's true longitude (degrees)
        const sunTrueLong = L0 + C;

        // Sun's apparent longitude (degrees)
        const omega = 125.04 - 1934.136 * jc;
        const sunApparentLong = sunTrueLong - 0.00569 - 0.00478 * Math.sin(omega * DEG_TO_RAD);

        // Mean obliquity of the ecliptic (degrees)
        const epsilon0 = 23.439291111 - 0.0130042 * jc - 0.00000016 * jc * jc;

        // Corrected obliquity
        const epsilon = epsilon0 + 0.00256 * Math.cos(omega * DEG_TO_RAD);
        const epsilonRad = epsilon * DEG_TO_RAD;

        // Sun's right ascension
        const sunApparentLongRad = sunApparentLong * DEG_TO_RAD;
        const rightAscension = Math.atan2(
            Math.cos(epsilonRad) * Math.sin(sunApparentLongRad),
            Math.cos(sunApparentLongRad)
        );

        // Sun's declination
        const declination = Math.asin(Math.sin(epsilonRad) * Math.sin(sunApparentLongRad));

        // Greenwich Mean Sidereal Time (GMST)
        const D = jd - JULIAN_EPOCH;
        const T = D / 36525;
        let gmst = 280.46061837 + 360.98564736629 * D + 0.000387933 * T * T - T * T * T / 38710000;
        gmst = this.normalizeAngle(gmst);

        // Local Sidereal Time
        const lst = (gmst + longitude) * DEG_TO_RAD;

        // Hour angle
        const hourAngle = lst - rightAscension;

        // Local horizontal coordinates
        const sinAlt = Math.sin(latRad) * Math.sin(declination)
            + Math.cos(latRad) * Math.cos(declination) * Math.cos(hourAngle);
        const altitude = Math.asin(sinAlt);

        const cosAz = (Math.sin(declination) - Math.sin(altitude) * Math.sin(latRad))
            / (Math.cos(altitude) * Math.cos(latRad));

        // Clamp to valid range to avoid NaN
        const clampedCosAz = Math.max(-1, Math.min(1, cosAz));
        let azimuth = Math.acos(clampedCosAz);

        // Correct azimuth for hour angle
        if (Math.sin(hourAngle) > 0) {
            azimuth = 2 * Math.PI - azimuth;
        }

        const elevationDeg = altitude * RAD_TO_DEG;
        const azimuthDeg = azimuth * RAD_TO_DEG;

        return {
            azimuth: azimuthDeg,
            elevation: elevationDeg,
            visible: elevationDeg > -0.833, // Sun is "visible" when above horizon (with refraction correction)
        };
    }

    /**
     * Get sunrise and sunset times for a location
     */
    getSunTimes(latitude: number, longitude: number, date: Date = new Date()): {
        sunrise: Date | null;
        sunset: Date | null;
        solarNoon: Date;
    } {
        // Start of day in UTC
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0));

        // Find solar noon (sun at highest point)
        const timezoneOffset = longitude / 15; // hours
        const solarNoon = new Date(startOfDay.getTime() + (12 - timezoneOffset) * 3600000);

        // Get sun position at noon
        const _noonPosition = this.getSunPosition(latitude, longitude, solarNoon);

        // Calculate hour angle for sunrise/sunset
        const latRad = latitude * DEG_TO_RAD;
        const declination = this.getSolarDeclination(this.dateToJulianDate(date));

        // cos(hour angle) = -tan(lat) * tan(dec) + sin(-0.833°) / (cos(lat) * cos(dec))
        const cosH = (Math.sin(-0.833 * DEG_TO_RAD) - Math.sin(latRad) * Math.sin(declination))
            / (Math.cos(latRad) * Math.cos(declination));

        if (cosH > 1) {
            // Sun never rises (polar night)
            return { sunrise: null, sunset: null, solarNoon };
        }

        if (cosH < -1) {
            // Sun never sets (midnight sun)
            return { sunrise: null, sunset: null, solarNoon };
        }

        const hourAngle = Math.acos(cosH) * RAD_TO_DEG / 15; // Convert to hours

        const sunrise = new Date(solarNoon.getTime() - hourAngle * 3600000);
        const sunset = new Date(solarNoon.getTime() + hourAngle * 3600000);

        return { sunrise, sunset, solarNoon };
    }

    /**
     * Check if the sun is currently visible (daytime)
     */
    isDaytime(latitude: number, longitude: number, date: Date = new Date()): boolean {
        const position = this.getSunPosition(latitude, longitude, date);
        return position.visible;
    }

    // ========================================================================
    // Helper Methods
    // ========================================================================

    /**
     * Convert JavaScript Date to Julian Date
     */
    private dateToJulianDate(date: Date): number {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();
        const hour = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

        // Julian Date calculation
        let a = Math.floor((14 - month) / 12);
        let y = year + 4800 - a;
        let m = month + 12 * a - 3;

        let jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4)
            - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

        return jdn + (hour - 12) / 24;
    }

    /**
     * Get solar declination for a Julian Date
     */
    private getSolarDeclination(jd: number): number {
        const jc = (jd - JULIAN_EPOCH) / 36525;

        const L0 = this.normalizeAngle(280.46646 + 36000.76983 * jc);
        const M = this.normalizeAngle(357.52911 + 35999.05029 * jc);
        const Mrad = M * DEG_TO_RAD;

        const C = (1.914602 - 0.004817 * jc) * Math.sin(Mrad)
            + 0.019993 * Math.sin(2 * Mrad);

        const sunTrueLong = (L0 + C) * DEG_TO_RAD;
        const epsilon = 23.439291111 * DEG_TO_RAD;

        return Math.asin(Math.sin(epsilon) * Math.sin(sunTrueLong));
    }

    /**
     * Normalize angle to 0-360 degrees
     */
    private normalizeAngle(angle: number): number {
        angle = angle % 360;
        if (angle < 0) angle += 360;
        return angle;
    }
}

// ============================================================================
// Singleton instance for convenience
// ============================================================================

export const solarEphemeris = new SolarEphemeris();

/**
 * Get current sun position (convenience function)
 */
export function getSunPosition(latitude: number, longitude: number): SunPosition {
    return solarEphemeris.getSunPosition(latitude, longitude);
}
