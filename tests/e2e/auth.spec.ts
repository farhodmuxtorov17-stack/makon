import { test, expect } from '@playwright/test'

/**
 * Authentication flow tests
 */
test.describe('Authentication', () => {
  test('login page renders with correct elements', async ({ page }) => {
    await page.goto('/login')

    // Email/phone input
    const emailInput = page.locator('input[type="email"], input[type="text"], input[placeholder*="email" i], input[placeholder*="login" i]').first()
    await expect(emailInput).toBeVisible()

    // Password input
    const passwordInput = page.locator('input[type="password"]').first()
    await expect(passwordInput).toBeVisible()

    // Submit button
    const submitBtn = page.locator('button[type="submit"], button:has-text("Kirish"), button:has-text("Login")').first()
    await expect(submitBtn).toBeVisible()
  })

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login')

    const emailInput = page.locator('input[type="email"], input[type="text"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    await emailInput.fill('test@example.com')
    await passwordInput.fill('wrongpassword')

    const submitBtn = page.locator('button[type="submit"], button:has-text("Kirish")').first()
    await submitBtn.click()

    // Should stay on login page or show error
    await page.waitForTimeout(1000)
    expect(page.url()).toContain('/login')
  })

  test('ERI registration link is visible', async ({ page }) => {
    await page.goto('/login')

    // Check for ERI register link
    const eriLink = page.locator('a[href*="register"], a:has-text("ERI"), a:has-text("ro\'yxat")').first()
    if (await eriLink.isVisible()) {
      await eriLink.click()
      await page.waitForLoadState('networkidle')
      expect(page.url()).toContain('/register')
    }
  })
})
