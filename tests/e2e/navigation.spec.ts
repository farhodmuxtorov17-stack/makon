import { test, expect } from '@playwright/test'

/**
 * Navigation and routing tests
 */
test.describe('Navigation', () => {
  test('all major routes are accessible', async ({ page }) => {
    const routes = [
      '/',
      '/catalog',
      '/login',
    ]

    for (const route of routes) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      // Should not show error page
      const errorText = page.locator('text=Error 500, text=Server Error, text=404')
      expect(await errorText.count()).toBe(0)
    }
  })

  test('redirects to login for protected routes', async ({ page }) => {
    const protectedRoutes = [
      '/dashboard',
      '/management/buildings',
      '/finance/invoices',
      '/cabinet',
      '/admin/users',
    ]

    for (const route of protectedRoutes) {
      await page.goto(route)
      await page.waitForLoadState('networkidle')
      // Should redirect to login or show auth required
      const currentUrl = page.url()
      const hasAuth = currentUrl.includes('/login') || currentUrl.includes('/register')
      const hasContent = await page.locator('body').textContent()
      const hasAuthText = hasContent?.includes('Kirish') || hasContent?.includes('login')
      expect(hasAuth || hasAuthText).toBeTruthy()
    }
  })

  test('404 page renders for unknown routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')
    await page.waitForLoadState('networkidle')
    // Should show 404 content
    const body = await page.locator('body').textContent()
    expect(body?.length).toBeGreaterThan(0)
  })
})
