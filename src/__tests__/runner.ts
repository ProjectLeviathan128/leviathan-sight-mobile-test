/**
 * Leviathan Systems - Test Runner
 * 
 * Runs all tests in the browser console and reports results
 */

import { runHorizonTests } from './horizon.test';
import { runEKFTests } from './ekf.test';

export interface TestSuiteResult {
    name: string;
    passed: number;
    failed: number;
    results: string[];
}

/**
 * Run all test suites
 */
export function runAllTests(): TestSuiteResult[] {
    console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50');
    console.log('%c  Leviathan Systems Test Suite', 'color: #4CAF50; font-weight: bold; font-size: 16px');
    console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50');

    const suites: TestSuiteResult[] = [];

    // Run Horizon Tests
    console.log('\n%c📐 Horizon Detection Tests', 'color: #2196F3; font-weight: bold');
    const horizonResults = runHorizonTests();
    suites.push({ name: 'Horizon Detection', ...horizonResults });

    for (const line of horizonResults.results) {
        console.log(line);
    }
    console.log(`Horizon: ${horizonResults.passed}/${horizonResults.passed + horizonResults.failed} passed`);

    // Run EKF Tests
    console.log('\n%c🧭 EKF Tests', 'color: #FF9800; font-weight: bold');
    const ekfResults = runEKFTests();
    suites.push({ name: 'Attitude EKF', ...ekfResults });

    for (const line of ekfResults.results) {
        console.log(line);
    }
    console.log(`EKF: ${ekfResults.passed}/${ekfResults.passed + ekfResults.failed} passed`);

    // Summary
    const totalPassed = suites.reduce((sum, s) => sum + s.passed, 0);
    const totalFailed = suites.reduce((sum, s) => sum + s.failed, 0);

    console.log('\n%c═══════════════════════════════════════════════════════', 'color: #4CAF50');
    if (totalFailed === 0) {
        console.log(`%c✅ All ${totalPassed} tests passed!`, 'color: #4CAF50; font-weight: bold');
    } else {
        console.log(`%c❌ ${totalFailed}/${totalPassed + totalFailed} tests failed`, 'color: #f44336; font-weight: bold');
    }
    console.log('%c═══════════════════════════════════════════════════════', 'color: #4CAF50');

    return suites;
}

// Export for browser console testing
if (typeof window !== 'undefined') {
    (window as any).runAllTests = runAllTests;
    console.log('🧪 Test runner loaded. Run `runAllTests()` in console to execute tests.');
}
