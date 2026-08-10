# MAKON Architecture

## Overview

MAKON is a **Static Site Generation (SSG)** application built with Nuxt 3. It generates pre-rendered HTML pages at build time, with client-side hydration for interactivity.

## System Architecture

```
                    ┌─────────────────────────┐
                    │    GitHub Pages (CDN)     │
                    │   .output/public/ (SSG)   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │     Nuxt 3 Application    │
                    │   (SSG + Client Hydration)│
                    └────────────┬────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
  ┌───────▼───────┐    ┌────────▼────────┐   ┌────────▼────────┐
  │   Public Routes│    │  Admin Routes    │   │  Auth Routes    │
  │  / /catalog   │    │  /admin/*        │   │  /login         │
  │  /buildings/* │    │  /dashboard/*    │   │  /register/eri  │
  │  /units/*     │    │  /finance/*      │   └─────────────────┘
  └───────────────┘    │  /facility/*     │
                       │  /management/*   │
                       │  /cabinet/*      │
                       │  /contracts/*    │
                       │  /reports        │
                       └─────────────────┘
```

## Layer Breakdown

### 1. Layouts Layer
```
layouts/
├── public.vue     → Header + Footer (landing, catalog, building pages)
├── admin.vue       → Sidebar + Topbar (all authenticated modules)
├── auth.vue        → Centered card (login, ERI registration)
└── telegram.vue    → Telegram WebApp container
```

The `admin.vue` layout contains:
- **Role-based sidebar** — navigation items change per role
- **Topbar** — role switcher, theme toggle, notifications bell
- **Mobile responsive** — collapsible sidebar with overlay

### 2. Pages Layer (58 pages)

Pages follow Nuxt's file-based routing:

| Pattern | Route | Example |
|---------|-------|---------|
| `pages/index.vue` | `/` | Landing page |
| `pages/catalog/index.vue` | `/catalog` | Commercial catalog |
| `pages/buildings/[slug].vue` | `/buildings/:slug` | Dynamic building page |
| `pages/contracts/[id].vue` | `/contracts/:id` | Contract detail |
| `pages/finance/invoices/index.vue` | `/finance/invoices` | Invoices list |

### 3. Components Layer

| Component | Purpose |
|-----------|---------|
| `MakonChart.vue` | ApexCharts wrapper — area/bar/donut/radialBar/pie |
| `CatalogMap.vue` | Leaflet map with price markers |
| `CreateBuildingModal.vue` | Modal form for creating buildings |
| `CreateListingModal.vue` | Modal form for creating listings |
| `FilterPanel.vue` | Reusable filter panel |
| `RoleSwitcher.vue` | Demo role switcher for admin layout |
| `StatusBar.vue` | Status indicator bar |
| `TgNavBar.vue` | Telegram WebApp navigation |
| `ThemeToggle.vue` | Dark/light mode toggle |

### 4. State Layer (Pinia)

```
stores/
├── auth.ts    → login(), logout(), user, isAuthenticated
└── makon.ts   → buildings[], units[], contracts[], listings[]
```

### 5. Middleware

```
middleware/
└── auth.ts    → Redirects to /login if not authenticated
```

### 6. Backend Functions (Base44)

```
functions/
├── getDashboardData.ts       → Aggregated KPI data
├── getFinanceReport.ts        → Finance reporting data
├── getBuildingAnalytics.ts    → Per-building analytics
└── sendNotification.ts        → Push notifications
```

## Data Flow

```
User Action → Page (Vue) → Composable → Store (Pinia)
                                      ↓
                              Base44 Entity API
                                      ↓
                              Base44 Database
```

### Example: Creating an Invoice
1. User clicks "Yangi invoys" on `/finance/invoices`
2. Modal opens with form
3. On submit → `createEntityRecords('Invoice', data)`
4. Invoice record created in Base44 database
5. Store updates with new invoice
6. UI re-renders with updated list

## Theme System

MAKON uses `@nuxtjs/color-mode` for dark/light theme:

```typescript
// nuxt.config.ts
colorMode: {
  preference: 'light',
  fallback: 'light',
  classSuffix: '',  // Uses .dark class on <html>
  storageKey: 'makon-theme',
}
```

CSS is structured with Tailwind layers:
- `@layer base` — global resets, typography, scrollbar
- `@layer components` — .btn, .card, .badge, .glass
- `@layer utilities` — custom utilities

Dark mode uses `.dark` prefix on `<html>` element.

## Chart System

`MakonChart.vue` wraps `vue3-apexcharts`:

```vue
<MakonChart
  type="area"           <!-- area | bar | line | donut | radialBar | pie -->
  :series="series"     <!-- Array of { name, data } -->
  :categories="months"  <!-- X-axis labels -->
  :height="280"
  :colors="['#6366f1']"
  :stacked="false"
/>
```

Charts auto-detect dark mode and adjust grid/label colors.

## ERI Integration Flow

```
┌─────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────┐
│ Step 1  │────▶│    Step 2    │────▶│    Step 3    │────▶│  Step 4  │
│ ERI     │     │ Confirm      │     │ Account      │     │ Success  │
│ Upload  │     │ Data         │     │ Setup        │     │          │
└─────────┘     └──────────────┘     └──────────────┘     └──────────┘
   │                  │                    │
   ▼                  ▼                    ▼
 Loading          Display TIN,        Password strength
 animation        org name, PINFL     meter, validation
```

## Security Considerations

- **RBAC**: 5 roles with 12-module × 5-action permission matrix
- **Auth middleware**: All admin routes protected
- **ERI**: SHA-256 hashing for contracts
- **No secrets in client**: Backend functions handle API keys
- **Row-level security**: Entity access scoped per user

## Performance

- **SSG**: Pre-rendered HTML, zero server cost
- **Code splitting**: Nuxt automatic per-route splitting
- **Lazy loading**: `client-only` for charts
- **Font preconnect**: Google Fonts with `preconnect`
- **Image optimization**: Unsplash with `w=` and `q=` params

## Build Pipeline

```
npm run build
  → nuxt generate
    → Pre-render all routes
    → Generate static HTML
    → Output to .output/public/
  → Deploy to GitHub Pages
```
