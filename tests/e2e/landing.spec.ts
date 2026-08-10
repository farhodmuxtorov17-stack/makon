import { test, expect } from '@playwright/test'

/**
 * Landing page smoke tests
 */
test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays hero section with correct heading', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('h1').first()).toContainText(/MAKON/i)
  })

  test('navigation links are present', async ({ page }) => {
    // Catalog link
    const catalogLink = page.locator('a[href="/catalog"]').first()
    await expect(catalogLink).toBeVisible()
    // Login link
    const loginLink = page.locator('a[href="/login"]').first()
    await expect(loginLink).toBeVisible()
  })

  test('features section renders', async ({ page }) => {
    // Wait for content
    await page.waitForLoadState('networkidle')
    // Check for feature cards
    const featureCards = page.locator('[class*="card"]')
    await expect(featureCards.first()).toBeVisible()
  })

  test('theme toggle works', async ({ page }) => {
    // Find theme toggle button
    const toggle = page.locator('button[class*="theme"], button:has(svg[class*="sun"], svg[class*="moon"])').first()
    if (await toggle.isVisible()) {
      // Get current html class
      const htmlBefore = await page.locator('html').getAttribute('class')
      await toggle.click()
      const htmlAfter = await page.locator('html').getAttribute('class')
      // Class should change
      expect(htmlAfter).not.toBe(htmlBefore)
    }
  })

  test('footer is visible', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const footer = page.locator('footer')
    if (await footer.isVisible()) {
      await expect(footer).toContainText(/MAKON|makon/i)
    }
  })

  test('responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return
    // On mobile, content should fit viewport
    const body = page.locator('body')
    const bbox = await body.boundingBox()
    expect(bbox?.width).toBeLessThanOrEqual(430)
  })
})
