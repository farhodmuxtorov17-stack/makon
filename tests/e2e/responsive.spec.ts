import { test, expect } from '@playwright/test'

/**
 * Responsive layout E2E tests
 */

const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 17 Pro Max', width: 430, height: 932 },
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Pro 11', width: 834, height: 1194 },
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Desktop XL', width: 1920, height: 1080 },
]

test.describe('Responsive Layout', () => {
  for (const vp of viewports) {
    test(`renders correctly on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('./')
      await page.waitForLoadState('networkidle')
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    })
  }

  test('mobile sidebar is hidden by default', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('./login')
    await page.fill('input[type="text"]', 'super@makon.uz')
    await page.fill('input[type="password"]', 'Makon2026!')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)
    
    if (!page.url().includes('login')) {
      const sidebar = page.locator('aside, [class*="sidebar"]').first()
      if (await sidebar.isVisible().catch(() => false)) {
        const box = await sidebar.boundingBox()
        if (box) {
          // On mobile sidebar should be off-screen or collapsed
          const isOffscreen = box.x < 0 || box.x > 375
          expect(isOffscreen || box.width < 100).toBeTruthy()
        }
      }
    }
  })

  test('desktop shows persistent sidebar', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('./login')
    await page.fill('input[type="text"]', 'super@makon.uz')
    await page.fill('input[type="password"]', 'Makon2026!')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)
    
    if (!page.url().includes('login')) {
      const sidebar = page.locator('aside, [class*="sidebar"]').first()
      const isVisible = await sidebar.isVisible().catch(() => false)
      expect(isVisible).toBeTruthy()
    }
  })

  test('login page renders on all viewports', async ({ page }) => {
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto('./login')
      await page.waitForLoadState('networkidle')
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    }
  })
})
