import type { Config } from '@playwright/test'

/**
 * Playwright E2E test configuration for MAKON
 * 
 * Run: npx playwright test
 * UI:  npx playwright test --ui
 * Report: npx playwright show-report
 */

const config: Config = {
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'uz-UZ',
    timezone: 'Asia/Tashkent',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    // --- Desktop browsers ---
    {
      name: 'chromium-desktop',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox-desktop',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit-desktop',
      use: { browserName: 'webkit' },
    },

    // --- Mobile (Telegram Mini App simulation) ---
    {
      name: 'mobile-chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 390, height:844 },
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      },
    },
    {
      name: 'mobile-safari',
      use: {
        browserName: 'webkit',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },

    // --- Tablet ---
    {
      name: 'tablet-landscape',
      use: {
        browserName: 'chromium',
        viewport: { width: 1194, height: 834 },
        isMobile: false,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
}

export default config
