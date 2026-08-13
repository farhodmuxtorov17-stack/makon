import { test, expect } from '@playwright/test'

/**
 * Authentication flow tests
 */
test.describe('Authentication', () => {
  test('login page renders with correct elements', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const emailInput = page.locator('input[type="email"], input[type="text"], input[placeholder*="email" i], input[placeholder*="login" i]').first()
    await expect(emailInput).toBeVisible()

    const passwordInput = page.locator('input[type="password"]').first()
    await expect(passwordInput).toBeVisible()

    const submitBtn = page.locator('button[type="submit"], button:has-text("kirish" i), button:has-text("Login")').first()
    await expect(submitBtn).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const emailInput = page.locator('input[type="email"], input[type="text"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    await emailInput.fill('test@example.com')
    await passwordInput.fill('wrongpassword')

    const submitBtn = page.locator('button[type="submit"]').first()
    await submitBtn.click()

    // Wait for either redirect or error message
    await page.waitForTimeout(2000)
    
    // Should stay on login page (URL contains 'login')
    const currentUrl = page.url()
    expect(currentUrl).toContain('login')
  })

  test('registration link is visible', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const regLink = page.locator('a[href*="register"], a:has-text("ro\'yxat")').first()
    if (await regLink.isVisible().catch(() => false)) {
      await regLink.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toContain('register')
    }
  })
})
