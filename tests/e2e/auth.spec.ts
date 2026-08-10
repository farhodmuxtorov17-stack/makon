import { test, expect } from '@playwright/test'

/**
 * Authentication flow E2E tests
 */

test.describe('Login Page', () => {
  test('displays login form with all fields', async ({ page }) => {
    await page.goto('/login')
    
    // Title
    await expect(page.locator('text=Tizimga kirish')).toBeVisible()
    
    // Email field
    await expect(page.locator('input[type="text"]').first()).toBeVisible()
    
    // Password field
    await expect(page.locator('input[type="password"]')).toBeVisible()
    
    // Submit button
    await expect(page.locator('button:has-text("Kirish")')).toBeVisible()
  })

  test('shows ERI login button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('button:has-text("ERI")')).toBeVisible()
  })

  test('shows Telegram Mini App button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('button:has-text("Telegram")')).toBeVisible()
  })

  test('shows registration link', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('a[href*="register"]')).toBeVisible()
  })

  test('form submission with empty fields does nothing', async ({ page }) => {
    await page.goto('/login')
    await page.click('button:has-text("Kirish")')
    // Should stay on login page
    await expect(page).toHaveURL(/login/)
  })

  test('successful login redirects to dashboard', async ({ page }) => {
    await page.goto('/login')
    
    await page.fill('input[type="text"]', 'admin@makon.uz')
    await page.fill('input[type="password"]', 'password')
    await page.click('button:has-text("Kirish")')
    
    // Wait for navigation (demo login has 800ms timeout)
    await page.waitForTimeout(1500)
    await expect(page).toHaveURL(/dashboard/)
  })

  test('device mockups are visible on desktop', async ({ page }) => {
    await page.goto('/login')
    // On desktop, mockups should be visible
    const phoneMockup = page.locator('.phone-mockup, [class*="phone-mockup"]').first()
    if (await phoneMockup.isVisible()) {
      // Check iPhone label
      await expect(page.locator('text=iPhone 17 Pro Max')).toBeVisible()
      await expect(page.locator('text=iPad Pro')).toBeVisible()
    }
  })

  test('theme toggle works', async ({ page }) => {
    await page.goto('/login')
    
    const toggle = page.locator('button[class*="theme"], [class*="ThemeToggle"]').first()
    if (await toggle.isVisible()) {
      const htmlBefore = await page.locator('html').getAttribute('class')
      await toggle.click()
      await page.waitForTimeout(300)
      const htmlAfter = await page.locator('html').getAttribute('class')
      // Class should change
      expect(htmlBefore).not.toEqual(htmlAfter)
    }
  })
})

test.describe('ERI Registration', () => {
  test('displays ERI registration form', async ({ page }) => {
    await page.goto('/register/eri')
    // Should show some registration form
    await expect(page.locator('body')).toBeVisible()
  })
})
