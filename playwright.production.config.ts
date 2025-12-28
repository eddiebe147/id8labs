import { defineConfig, devices } from '@playwright/test';

/**
 * Production-specific Playwright configuration
 * Use with: PLAYWRIGHT_BASE_URL=https://id8labs.app npx playwright test --config=playwright.production.config.ts
 */
export default defineConfig({
  testDir: './e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry for flaky tests */
  retries: 1,

  /* Use 2 workers for production tests */
  workers: 2,

  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list'],
  ],

  /* Shared settings */
  use: {
    /* Base URL for production */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://id8labs.app',

    /* Collect trace on first retry */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Timeout for actions - increased for production */
    actionTimeout: 15000,

    /* Timeout for navigation - increased for production */
    navigationTimeout: 45000,
  },

  /* Only test on Chromium for production tests (faster) */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* NO webServer for production - we're testing the live site */
  // webServer: undefined,

  /* Increased timeouts for production */
  timeout: 60000,
  expect: {
    timeout: 15000,
  },

  /* Output folder for test artifacts */
  outputDir: 'test-results',
});
