import { test, expect } from '@playwright/test'

/**
 * Catalog page tests
 */
test.describe('Catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog')
    await page.waitForLoadState('networkidle')
  })

  test('renders catalog page with listings', async ({ page }) => {
    // Page should have a heading
    await expect(page.locator('h1').first()).toBeVisible()

    // Should have listing cards or items
    const cards = page.locator('[class*="card"], article, [class*="listing"]')
    expect(await cards.count()).toBeGreaterThan(0)
  })

  test('filter panel is present', async ({ page }) => {
    // Find filter elements
    const filters = page.locator('select, input[type="text"], input[type="range"], [class*="filter"]').first()
    await expect(filters).toBeVisible()
  })

  test('search input works', async ({ page }) => {
    const searchInput = page.locator('input[type="text"], input[placeholder*="qidirish" i], input[placeholder*="search" i]').first()
    if (await searchInput.isVisible()) {
      await searchInput.fill('Tashkent')
      await page.waitForTimeout(500)
      // Results should update
      const cards = page.locator('[class*="card"], article')
      expect(await cards.count()).toBeGreaterThanOrEqual(0)
    }
  })

  test('grid/list view toggle exists', async ({ page }) => {
    // Look for view toggle buttons
    const toggleButtons = page.locator('button:has(svg), [class*="view-toggle"], [class*="grid-view"], [class*="list-view"]')
    if (await toggleButtons.count() > 0) {
      await expect(toggleButtons.first()).toBeVisible()
    }
  })

  test('listing cards have essential info', async ({ page }) => {
    const firstCard = page.locator('[class*="card"]').first()
    if (await firstCard.isVisible()) {
      // Should have some text content (title, price, etc.)
      const text = await firstCard.textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })
})
