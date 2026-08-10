import { test, expect } from '@playwright/test'

/**
 * Dark mode / theme tests
 */
test.describe('Theme', () => {
  test('dark mode can be toggled on landing', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const html = page.locator('html')
    const classBefore = (await html.getAttribute('class')) || ''

    // Find and click theme toggle
    const toggle = page.locator('button').filter({ has: page.locator('svg') }).filter({ hasText: /sun|moon|Sun|Moon/i }).first()
    if (await toggle.isVisible()) {
      await toggle.click()
      await page.waitForTimeout(300)
      const classAfter = (await html.getAttribute('class')) || ''
      expect(classAfter).not.toBe(classBefore)
    }
  })

  test('dark mode persists across navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Enable dark mode if not already
    const html = page.locator('html')
    const initialClass = (await html.getAttribute('class')) || ''
    const isDark = initialClass.includes('dark')

    if (!isDark) {
      const toggle = page.locator('button').filter({ has: page.locator('svg') }).first()
      if (await toggle.isVisible()) {
        await toggle.click()
        await page.waitForTimeout(300)
      }
    }

    // Navigate to catalog
    await page.goto('/catalog')
    await page.waitForLoadState('networkidle')

    // Dark mode should persist
    const newClass = (await html.getAttribute('class')) || ''
    const isStillDark = newClass.includes('dark')
    expect(isStillDark).toBe(true)
  })

  test('all pages render without horizontal scroll', async ({ page }) => {
    const routes = ['/', '/catalog', '/login']

    for (const route of routes) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
    }
  })
})
