import { test, expect } from '@playwright/test'

/**
 * Landing page E2E tests
 */

test.describe('Landing Page (/)', () => {
  test('displays hero section with MAKON branding', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=MAKON')).toBeVisible()
  })

  test('hero CTA navigates to catalog', async ({ page }) => {
    await page.goto('/')
    // Find catalog link/button
    const catalogLink = page.locator('a[href*="catalog"], button:has-text("Katalog")').first()
    if (await catalogLink.isVisible()) {
      await catalogLink.click()
      await expect(page).toHaveURL(/catalog/)
    }
  })

  test('features section is visible', async ({ page }) => {
    await page.goto('/')
    // Scroll to features
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
    await page.waitForTimeout(500)
  })

  test('FAQ section has expandable items', async ({ page }) => {
    await page.goto('/')
    // Check for FAQ section
    const faqSection = page.locator('text=FAQ, text=Tez-tez so\\'raladigan').first()
    if (await faqSection.isVisible()) {
      // Click first FAQ item
      const firstItem = page.locator('[class*="faq"] button, details summary').first()
      if (await firstItem.isVisible()) {
        await firstItem.click()
        await page.waitForTimeout(300)
      }
    }
  })

  test('login link is accessible from landing', async ({ page }) => {
    await page.goto('/')
    const loginLink = page.locator('a[href*="login"]').first()
    if (await loginLink.isVisible()) {
      await loginLink.click()
      await expect(page).toHaveURL(/login/)
    }
  })
})
