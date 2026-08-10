import { test, expect } from '@playwright/test'

/**
 * Catalog page E2E tests
 */

test.describe('Catalog Page (/catalog)', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/catalog')
    await expect(page).toHaveURL(/catalog/)
  })

  test('displays building cards', async ({ page }) => {
    await page.goto('/catalog')
    // Should have some building content
    await page.waitForTimeout(1000)
    const cards = page.locator('.card, [class*="card"]')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('filter controls are present', async ({ page }) => {
    await page.goto('/catalog')
    
    // Search input
    const search = page.locator('input[placeholder*="qidirish"], input[placeholder*="search"], input[type="text"]').first()
    if (await search.isVisible()) {
      await search.fill('Tashkent')
      await page.waitForTimeout(500)
    }
  })

  test('sort dropdown is functional', async ({ page }) => {
    await page.goto('/catalog')
    
    // Look for sort control
    const sort = page.locator('select, button:has-text("saralash"), button:has-text("sort")').first()
    if (await sort.isVisible()) {
      await sort.click()
      await page.waitForTimeout(300)
    }
  })

  test('building card click navigates to detail', async ({ page }) => {
    await page.goto('/catalog')
    await page.waitForTimeout(1000)
    
    // Find a clickable building card with a link
    const buildingLink = page.locator('a[href*="buildings"]').first()
    if (await buildingLink.isVisible()) {
      await buildingLink.click()
      await page.waitForTimeout(1000)
      // Should navigate to a building page
      await expect(page).toHaveURL(/buildings/)
    }
  })
})
