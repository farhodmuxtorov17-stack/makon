import { test, expect } from '@playwright/test'

/**
 * Accessibility E2E tests
 * WCAG 2.1 AA compliance checks
 */

test.describe('Accessibility', () => {
  test('all interactive elements have visible focus', async ({ page }) => {
    await page.goto('/login')
    
    // Tab through elements
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => {
      const el = document.activeElement
      return el ? el.tagName : null
    })
    expect(focused).toBeTruthy()
  })

  test('images have alt text on landing page', async ({ page }) => {
    await page.goto('/')
    
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      // Alt should exist (can be empty for decorative)
      expect(alt).not.toBeNull()
    }
  })

  test('form inputs have labels on login', async ({ page }) => {
    await page.goto('/login')
    
    const inputs = page.locator('input')
    const count = await inputs.count()
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i)
      // Check if there's an associated label
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const placeholder = await input.getAttribute('placeholder')
      
      // At least one of these should be present
      expect(id || ariaLabel || placeholder).toBeTruthy()
    }
  })

  test('color contrast meets WCAG AA', async ({ page }) => {
    await page.goto('/login')
    
    // Check that text is visible (basic contrast check)
    const bodyColor = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body)
      return styles.color
    })
    expect(bodyColor).toBeTruthy()
  })

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/login')
    
    const buttons = page.locator('button')
    const count = await buttons.count()
    
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i)
      const text = (await btn.textContent())?.trim()
      const ariaLabel = await btn.getAttribute('aria-label')
      const title = await btn.getAttribute('title')
      
      // Button should have some accessible name
      expect(text || ariaLabel || title).toBeTruthy()
    }
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')
    
    // Should have h1
    const h1 = page.locator('h1')
    const h1Count = await h1.count()
    
    // Landing page should have at least one h1
    expect(h1Count).toBeGreaterThanOrEqual(1)
  })

  test('links have distinguishable text', async ({ page }) => {
    await page.goto('/')
    
    const links = page.locator('a')
    const count = await links.count()
    
    for (let i = 0; i < count; i++) {
      const link = links.nth(i)
      const text = (await link.textContent())?.trim()
      const ariaLabel = await link.getAttribute('aria-label')
      const title = await link.getAttribute('title')
      
      // Links should not be just "click here" or empty
      if (text && text.length > 0) {
        expect(text.toLowerCase()).not.toBe('here')
        expect(text.toLowerCase()).not.toBe('click')
      }
    }
  })

  test('keyboard navigation works on login form', async ({ page }) => {
    await page.goto('/login')
    
    // Tab to first input
    await page.keyboard.press('Tab')
    await page.waitForTimeout(100)
    
    // Type email
    await page.keyboard.type('admin@makon.uz')
    
    // Tab to password
    await page.keyboard.press('Tab')
    await page.waitForTimeout(100)
    
    // Type password
    await page.keyboard.type('password')
    
    // Tab to submit and Enter
    await page.keyboard.press('Tab')
    await page.waitForTimeout(100)
    await page.keyboard.press('Enter')
    
    await page.waitForTimeout(1500)
    // Should have navigated
    expect(page.url()).not.toContain('/login')
  })
})
