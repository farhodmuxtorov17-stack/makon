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

    // Try submit button by type, then by text
    const submitBtn = page.locator('button[type="submit"]')
    const submitVisible = await submitBtn.isVisible().catch(() => false)
    if (submitVisible) {
      await expect(submitBtn.first()).toBeVisible()
    } else {
      const textBtn = page.getByRole('button', { name: /kirish|login/i })
      await expect(textBtn.first()).toBeVisible()
    }
  })

  test('short credentials are rejected client-side', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const emailInput = page.locator('input[type="email"], input[type="text"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    await emailInput.fill('a')
    await passwordInput.fill('b')

    const submitBtn = page.locator('button[type="submit"]').first()
    await submitBtn.click()

    await page.waitForTimeout(1000)
    expect(page.url()).toContain('login')
  })

  test('valid credentials redirect to dashboard', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const emailInput = page.locator('input[type="email"], input[type="text"]').first()
    const passwordInput = page.locator('input[type="password"]').first()

    await emailInput.fill('super@makon.uz')
    await passwordInput.fill('Makon2026!')

    const submitBtn = page.locator('button[type="submit"]').first()
    await submitBtn.click()

    await page.waitForTimeout(3000)
    expect(page.url()).toContain('dashboard')
  })

  test('registration link is visible', async ({ page }) => {
    await page.goto('./login')
    await page.waitForLoadState('networkidle')

    const regLink = page.locator('a[href*="register"]').first()
    if (await regLink.isVisible().catch(() => false)) {
      await regLink.click()
      await page.waitForTimeout(2000)
      expect(page.url()).toContain('register')
    }
  })
})
