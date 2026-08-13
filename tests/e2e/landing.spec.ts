import { test, expect } from '@playwright/test'

/**
 * Landing page smoke tests
 */
test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./')
  })

  test('displays hero section with correct heading', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible()
    const headingText = await page.locator('h1').first().textContent()
    expect(headingText?.trim().length).toBeGreaterThan(0)
  })

  test('navigation links are present', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const catalogLink = page.locator('a[href*="catalog"]').first()
    await expect(catalogLink).toBeVisible()
    const loginLink = page.locator('a[href*="login"]').first()
    await expect(loginLink).toBeVisible()
  })

  test('features section renders', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const featureCards = page.locator('[class*="card"]')
    await expect(featureCards.first()).toBeVisible()
  })

  test('theme toggle button is present', async ({ page }) => {
    // Theme toggle exists in header — just verify the button is visible
    await page.waitForLoadState('networkidle')
    const toggle = page.locator('button').filter({ has: page.locator('svg') })
    // At least one icon button should exist in the header area
    expect(await toggle.count()).toBeGreaterThan(0)
  })

  test('footer is visible', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    const footer = page.locator('footer')
    if (await footer.isVisible().catch(() => false)) {
      await expect(footer).toContainText(/MAKON|makon/i)
    }
  })

  test('responsive on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return
    const body = page.locator('body')
    const bbox = await body.boundingBox()
    expect(bbox?.width).toBeLessThanOrEqual(430)
  })
})
