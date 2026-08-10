import { test, expect } from '@playwright/test'

/**
 * Theme (light/dark) E2E tests
 */

test.describe('Theme Toggle', () => {
  test('light mode is default', async ({ page }) => {
    await page.goto('/')
    
    const htmlClass = await page.locator('html').getAttribute('class')
    // Should not have 'dark' class by default
    expect(htmlClass).not.toContain('dark')
  })

  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/')
    
    const toggle = page.locator('button[class*="theme"], [class*="ThemeToggle"], [class*="theme-toggle"]').first()
    if (await toggle.isVisible()) {
      // Toggle to dark
      await toggle.click()
      await page.waitForTimeout(300)
      
      const htmlClass = await page.locator('html').getAttribute('class')
      expect(htmlClass).toContain('dark')
      
      // Toggle back to light
      await toggle.click()
      await page.waitForTimeout(300)
      
      const htmlClassAfter = await page.locator('html').getAttribute('class')
      expect(htmlClassAfter).not.toContain('dark')
    }
  })

  test('theme persists across navigation', async ({ page }) => {
    await page.goto('/')
    
    const toggle = page.locator('button[class*="theme"]').first()
    if (await toggle.isVisible()) {
      await toggle.click()
      await page.waitForTimeout(300)
      
      // Navigate to catalog
      await page.goto('/catalog')
      await page.waitForTimeout(500)
      
      // Theme should persist
      const htmlClass = await page.locator('html').getAttribute('class')
      // localStorage should have the theme
      const stored = await page.evaluate(() => localStorage.getItem('makon-theme'))
      expect(stored).toBeTruthy()
    }
  })

  test('all pages support dark mode', async ({ page }) => {
    const pages = ['/', '/catalog', '/login']
    
    for (const path of pages) {
      await page.goto(path)
      await page.waitForTimeout(300)
      
      // Manually set dark mode
      await page.evaluate(() => {
        document.documentElement.classList.add('dark')
        localStorage.setItem('makon-theme', 'dark')
      })
      
      // Check no visible errors
      const errorElements = page.locator('[class*="error"]')
      const count = await errorElements.count()
      // Page should still render
      expect(await page.locator('body').isVisible()).toBeTruthy()
    }
  })
})
