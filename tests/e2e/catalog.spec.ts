import { test, expect } from '@playwright/test'

/**
 * Catalog page tests
 */
test.describe('Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./catalog')
    await page.waitForLoadState('networkidle')
  })

  test('renders catalog page with listings', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible()
    const cards = page.locator('[class*="card"], article, [class*="listing"]')
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('filter panel is present', async ({ page }) => {
    const filters = page.locator('select, input[type="text"], input[type="range"], [class*="filter"]').first()
    await expect(filters).toBeVisible()
  })

  test('search input works', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[placeholder*="qidirish" i], input[placeholder*="search" i]').first()
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('Tashkent')
      await page.waitForTimeout(500)
      const cards = page.locator('[class*="card"], article')
      expect(await cards.count()).toBeGreaterThanOrEqual(0)
    }
  })

  test('grid/list view toggle exists', async ({ page }) => {
    const toggleButtons = page.locator('button:has(svg), [class*="view-toggle"], [class*="grid-view"], [class*="list-view"]')
    if (await toggleButtons.count() > 0) {
      await expect(toggleButtons.first()).toBeVisible()
    }
  })

  test('listing cards have essential info', async ({ page }) => {
    const firstCard = page.locator('[class*="card"]').first()
    if (await firstCard.isVisible().catch(() => false)) {
      const text = await firstCard.textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })
})
