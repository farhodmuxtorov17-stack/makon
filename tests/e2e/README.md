# E2E Tests — MAKON

Playwright end-to-end tests covering critical user flows.

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npx playwright test

# Run specific suite
npx playwright test landing
npx playwright test auth
npx playwright test catalog

# Run in UI mode (interactive)
npx playwright test --ui

# Run on specific browser
npx playwright test --project=chromium-desktop

# Run mobile tests only
npx playwright test --project=mobile-chrome

# Generate HTML report
npx playwright test && npx playwright show-report
```

## Test Coverage

| Suite | File | Tests |
|-------|------|-------|
| Landing | `landing.spec.ts` | Hero, CTA, features, FAQ, login link |
| Auth | `auth.spec.ts` | Form fields, ERI button, Telegram button, login flow, theme toggle |
| Catalog | `catalog.spec.ts` | Cards, filters, sort, navigation to detail |
| Navigation | `navigation.spec.ts` | Route access, auth guards, 404, mobile viewport |
| Theme | `theme.spec.ts` | Light/dark toggle, persistence, all pages |
| Responsive | `responsive.spec.ts` | 6 viewports, sidebar behavior, mockup visibility |
| Accessibility | `accessibility.spec.ts` | Focus, alt text, labels, contrast, heading hierarchy, keyboard nav |

## Browser Coverage

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chromium | ✅ | ✅ |
| Firefox | ✅ | — |
| WebKit (Safari) | ✅ | ✅ |

## Viewports Tested

| Device | Width | Height |
|--------|-------|--------|
| iPhone SE | 375 | 667 |
| iPhone 17 Pro Max | 430 | 932 |
| iPad Mini | 768 | 1024 |
| iPad Pro 11 | 834 | 1194 |
| Desktop | 1280 | 800 |
| Desktop XL | 1920 | 1080 |

## CI Integration

Tests run automatically in CI. To add to GitHub Actions:

```yaml
- name: Run E2E tests
  run: npx playwright test
```

See `playwright.config.ts` for full configuration.
