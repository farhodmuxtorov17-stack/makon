<div align="center">

<img src="https://img.shields.io/badge/MAKON-Platform-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0zIDlsOS03IDkgN3YxMWEyIDIgMCAwIDEtMiAyaC0xNGEyIDIgMCAwIDEtMi0yeiIvPjwvc3ZnPg==" />

# MAKON — Tijoriy Ko'chmas mulk platformasi

### Toshkentdagi premium biznes markazlari, ofislar va ombor maydonlari uchun yagona boshqaruv tizimi

[![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00DC82?style=flat-square&logo=nuxtdotjs&logoColor=white)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=flat-square&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![License](https://img.shields.io/badge/License-Proprietary-6366f1?style=flat-square)](./LICENSE)

</div>

---

## 📋 Mundarija

- [Loyiha haqida](#-loyiha-haqida)
- [Xususiyatlari](#-xususiyatlari)
- [Texnik stek](#-texnik-stek)
- [Arxitektura](#-arxitektura)
- [Modullar](#-modullar)
- [Rollar va huquqlar](#-rollar-va-huquqlar)
- [ERI integratsiyasi](#-eri-integratsiyasi)
- [O'rnatish](#-ornatish)
- [Lokal ishga tushirish](#-lokal-ishga-tushirish)
- [Loyiha tuzilmasi](#-loyiha-tuzilmasi)
- [Konfiguratsiya](#-konfiguratsiya)
- [Build & Deploy](#-build--deploy)
- [Codestyle](#-codestyle)
- [Hissa qo'shish](#-hissa-qoshish)
- [Litsenziya](#-litsenziya)

---

## 🏢 Loyiha haqida

**MAKON** — bu Toshkent shahridagi tijoriy ko.*chmas mulk obyektlarini boshqarish uchun mo'ljallangan to'liq funksional platforma. Tashkent City, Trillant Tower, IT Park, Piramit va boshqa premium binolardagi ofis, savdo va ombor maydonlarini yagona tizimda boshqaradi.

Platforma quyidagi jarayonlarni avtomatlashtiradi:
- 🏗️ Binolar va unitlarni boshqarish (pasport, qavatlar, galereya)
- 📋 Listinglar va public katalog
- 📝 Arizalar (ijara/sotib olish) va ko'p bosqichli tasdiqlash
- 📄 Shartnomalar va ERI elektron imzo
- 💰 Moliya (invoyslar, qarzdorlik, davrlar, tasdiqlar)
- 🔧 Facility (work orderlar, material so'rovlari)
- 📦 Ombor boshqaruvi (materiallar, zaxiralar)
- ⚡ Hisoblagichlar (elektr, suv, gaz)
- 📊 Hisobotlar va dashboardlar
- 👥 Foydalanuvchilar va rollar (RBAC)
- 🔒 Audit jurnali va monitoring

---

## ✨ Xususiyatlari

### Premium UI/UX
- **Inter font** — professional tipografiya
- **Light/Dark mode** — to'liq qo'llab-quvvatlash
- **ApexCharts** — interaktiv grafiklar (area, bar, donut, radialBar)
- **Lucide Icons** — izchil ikonkalar
- **Responsive** — mobile-first dizayn
- **Kanban board** — work orderlar uchun
- **Timeline** — ERI imzo va audit jarayonlari

### Real Tashkent landmark integration
- Tashkent City Business Center
- Trillant Tower
- IT Park Tashkent
- Piramit
- Savdo Markaz
- Bektemir Sanoat

### ERI (Elektron Ro'yxatdan o'tish Identifikatori)
- 4 bosqichli ro'yxatdan o'tish wizard
- Sertifikatdan avtomatik ma'lumot olish
- SHA-256 raqamli xesh va tamg'a
- Ko'p tomonlama elektron imzo (tenant + landlord)

---

## 🛠 Texnik stek

| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| **Nuxt 3** | 3.12+ | SSG framework, routing, SSR/SSG |
| **Vue 3** | 3.4+ | UI framework (Composition API) |
| **TypeScript** | 5.4+ | Type safety |
| **Tailwind CSS** | 3.4+ | Utility-first styling |
| **Pinia** | 2.1+ | State management |
| **Lucide Vue** | 0.400+ | Icon system |
| **ApexCharts** | 3.x | Data visualization |
| **Nuxt Color Mode** | 4.0+ | Dark/light theme |

---

## 🏗 Arxitektura

```
┌─────────────────────────────────────────────────────────────┐
│                     Nuxt 3 (SSG Mode)                        │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Public  │  │  Admin   │  │  Auth    │  │ Telegram│     │
│  │  Layout  │  │  Layout  │  │  Layout  │  │  Layout  │     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│       │              │              │              │          │
│  ┌────▼──────────────▼──────────────▼──────────────▼──┐     │
│  │                   Pages (58)                        │     │
│  │  Landing │ Catalog │ Buildings │ Units │ Login      │     │
│  │  Cabinet │ Contracts │ Finance │ Facility │ Reports │     │
│  │  Admin │ Meters │ ERI Registration │ Dashboard       │     │
│  └──────────────────────┬──────────────────────────────┘     │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐     │
│  │              Components & Composables                │     │
│  │  MakonChart │ CatalogMap │ FilterPanel │ RoleSwitcher│     │
│  │  CreateBuildingModal │ CreateListingModal           │     │
│  │  StatusBar │ ThemeToggle │ TgNavBar                  │     │
│  └──────────────────────┬──────────────────────────────┘     │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐     │
│  │                 Pinia Stores                         │     │
│  │  auth │ makon (buildings, units, contracts, listings)│     │
│  └──────────────────────┬──────────────────────────────┘     │
│                         │                                    │
│  ┌──────────────────────▼──────────────────────────────┐     │
│  │              Base44 Backend (API)                    │     │
│  │  Entities: Building, Listing, Application,           │     │
│  │  Contract, Invoice, ServiceRequest                    │     │
│  └─────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Modullar

### Public moduli
| Route | Tavsif |
|-------|--------|
| `/` | Landing page — hero, VIP karusel, ob'ekt turlari |
| `/catalog` | Tijoriy katalogi — filtr, qidiruv, xarita, grid/list view |
| `/buildings/:slug` | Bino public sahifasi |
| `/units/:slug` | Unit public sahifasi |
| `/login` | Tizimga kirish |
| `/register/eri` | ERI orqali ro'yxatdan o'tish (4 bosqich) |

### Cabinet moduli (Ijarachi)
| Route | Tavsif |
|-------|--------|
| `/cabinet` | Dashboard — KPI, to'lov chart, unitlar, arizalar |
| `/cabinet/units` | Mening unitlarim — foto kartalar |
| `/cabinet/applications` | Ariza va hujjatlar — timeline, ERI status |
| `/cabinet/contracts` | Shartnomalarim |
| `/cabinet/services` | Hisob va servis — tariflar, invoyslar |
| `/cabinet/meter-readings` | Hisoblagich ko'rsatkichlari |
| `/cabinet/service-requests/new` | Yangi servis so'rov |

### Management moduli (Bino Rahbari)
| Route | Tavsif |
|-------|--------|
| `/management/buildings` | Binolar ro'yxati (card/table view) |
| `/management/buildings/:id` | Bino pasporti, qavatlar, galereya, hujjatlar |
| `/management/buildings/:id/units` | Unitlar boshqaruvi |
| `/management/units` | Barcha unitlar |
| `/management/listings` | Listinglar boshqaruvi |
| `/management/applications` | Arizalar monitoring |
| `/management/contracts` | Shartnomalar boshqaruvi |
| `/management/service-requests` | Servis so'rovlari |
| `/management/floor-plans` | Reja importi |
| `/management/visual-settings` | Vizual sozlamalar |

### Finance moduli (Buxgalter)
| Route | Tavsif |
|-------|--------|
| `/finance/periods` | Moliya davrlari |
| `/finance/invoices` | Invoyslar — KPI, chart, tablar, qidiruv |
| `/finance/debts` | Qarzdorlik |
| `/finance/approvals` | Tasdiqlash jarayoni |
| `/finance/inventory` | Ombor — kategoriyalar, zaxira statusi |
| `/finance/stock-issues` | Material berish |

### Facility moduli (Pudratchi)
| Route | Tavsif |
|-------|--------|
| `/facility/work-orders` | Work orderlar — Kanban board |
| `/facility/material-requests` | Material so'rovlari |

### Dashboard va Hisobotlar
| Route | Tavsif |
|-------|--------|
| `/dashboard/executive` | Global dashboard — 6 KPI, 4 chart, SLA, alerts |
| `/dashboard/building` | Bino dashboardi |
| `/reports` | Hisobotlar — 5 KPI, 4 chart, building table |

### Admin moduli
| Route | Tavsif |
|-------|--------|
| `/admin/users` | Foydalanuvchilar — KPI, filter, table |
| `/admin/roles` | Rollar — 5 rol, huquqlar matritsasi |
| `/admin/audit` | Audit jurnali — timeline, filter |
| `/admin/monitoring` | Monitoring — health, API chart, online users |
| `/admin/settings` | Tizim sozlamalari |
| `/admin/backups` | Rezerv nusxalar |
| `/admin/notification-templates` | Shablonlar |
| `/admin/login-history` | Kirish tarixi |

---

## 🔐 Rollar va huquqlar

| Rol | O'zbekcha | Foydalanuvchilar | Asosiy huquqlar |
|-----|-----------|------------------|-----------------|
| `SUPER_HEAD` | Super Rahbar | 2 | To'liq CRUD, tasdiqlash, admin |
| `BUILDING_MANAGER` | Bino Rahbari | 3 | Bino/unit/listing CRUD, arizalar |
| `ACCOUNTANT` | Buxgalter | 2 | Invoys, moliya, tasdiqlash |
| `FACILITY` | Pudratchi | 3 | Work orderlar, materiallar |
| `TENANT_OWNER` | Ijarachi | 12 | Cabinet, arizalar, shartnomalar |

### Huquqlar matritsasi (12 modul × 5 amal)
- **Ko'rish** — barcha rollar
- **Yaratish** — Rahbar, Bino Rahbari, Buxgalter, Pudratchi
- **Tahrir** — Rahbar, Bino Rahbari, Pudratchi
- **O'chirish** — faqat Super Rahbar
- **Tasdiqlash** — Rahbar, Bino Rahbari, Buxgalter

---

## 🔑 ERI integratsiyasi

MAKON O'zbekiston Respublikasining ERI (Elektron Ro'yxatdan o'tish Identifikatori) tizimi bilan integratsiyalangan.

### Jarayon:
1. **Sertifikat tanlash** — foydalanuvchi ERI sertifikatini yuklaydi
2. **Ma'lumot olish** — tizim provayderdan STIR, tashkilot nomi, vakil F.I.O, JShShIR olish
3. **Hisob yaratish** — email, telefon, parol o'rnatish
4. **Shartnoma imzolash** — ERI orqali elektron imzo (tenant + landlord)

### Xavfsizlik:
- SHA-256 raqamli xesh har bir shartnoma uchun
- Sertifikat muddati tekshiruvi
- Bir STIR — bitta profil
- Parollar shifrlangan holda saqlanadi

---

## 🚀 O'rnatish

### Talablar
- Node.js 18+
- npm / pnpm / yarn

### O'rnatish

```bash
# Reponi klonlash
git clone https://github.com/farhodmuxtorov17-stack/makon.git
cd makon

# Bog'liqliklarni o'rnatish
npm install
```

---

## 💻 Lokal ishga tushirish

```bash
# Dev server (http://localhost:3000/makon/)
npm run dev

# Production build (SSG)
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## 📁 Loyiha tuzilmasi

```
makon/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline (lint + build)
│       └── deploy.yml           # Deploy to GitHub Pages
├── assets/
│   └── css/
│       └── main.css            # Global styles, Tailwind layers, components
├── components/
│   ├── MakonChart.vue          # ApexCharts wrapper (area/bar/donut/radialBar)
│   ├── CatalogMap.vue          # Leaflet map with price bubbles
│   ├── CreateBuildingModal.vue # Create building modal
│   ├── CreateListingModal.vue  # Create listing modal
│   ├── FilterPanel.vue         # Catalog filter panel
│   ├── RoleSwitcher.vue        # Role switcher (demo)
│   ├── StatusBar.vue           # Status bar component
│   ├── TgNavBar.vue            # Telegram navigation bar
│   └── ThemeToggle.vue         # Dark/light toggle
├── composables/
│   ├── useFormat.ts            # Formatting utilities
│   └── useMakonApi.ts          # API composable
├── functions/                  # Backend functions (Base44)
│   ├── getDashboardData.ts
│   ├── getFinanceReport.ts
│   ├── getBuildingAnalytics.ts
│   └── sendNotification.ts
├── layouts/
│   ├── admin.vue               # Admin layout (sidebar + header)
│   ├── auth.vue                # Auth layout (centered)
│   ├── public.vue              # Public layout (header + footer)
│   └── telegram.vue            # Telegram WebApp layout
├── middleware/
│   └── auth.ts                 # Authentication guard
├── pages/                       # 58 pages across 12 modules
│   ├── index.vue               # Landing page
│   ├── catalog/index.vue       # Commercial catalog
│   ├── login.vue               # Login page
│   ├── register/eri.vue         # ERI registration wizard
│   ├── cabinet/                # Tenant portal (7 pages)
│   ├── contracts/              # Contracts module (3 pages)
│   ├── dashboard/              # Dashboards (3 pages)
│   ├── finance/                # Finance module (6 pages)
│   ├── facility/               # Facility module (2 pages)
│   ├── management/             # Management module (10 pages)
│   ├── admin/                  # Admin module (8 pages)
│   ├── meters/                 # Meters module
│   ├── reports/                # Reports module
│   ├── notifications/          # Notifications
│   ├── profile/                # User profile
│   └── buildings/              # Public building pages
├── plugins/
│   └── apexcharts.client.ts    # ApexCharts registration
├── stores/
│   ├── auth.ts                 # Auth store (login, logout, user)
│   └── makon.ts                # Makon store (buildings, units, contracts)
├── types/
│   └── index.ts                # TypeScript type definitions
├── nuxt.config.ts              # Nuxt configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

---

## ⚙️ Konfiguratsiya

### Nuxt Config (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'makon-theme',
  },
  app: {
    baseURL: '/makon/',
    head: {
      title: 'MAKON — Ko\'chmas mulk platformasi',
      htmlAttrs: { lang: 'uz' },
      // ... SEO meta tags
    },
  },
})
```

### Tailwind Config

Custom color palette:
- **brand**: Indigo (#6366f1 — #4f46e5)
- **ink**: Zinc scale (50-950)
- Custom component classes: `.btn`, `.card`, `.badge`, `.glass`

---

## 📦 Build & Deploy

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### GitHub Pages Deploy

The project auto-deploys to GitHub Pages on push to `main`:
- Build: `nuxt generate` (SSG)
- Output: `.output/public/`
- URL: `https://farhodmuxtorov17-stack.github.io/makon/`

### Manual Deploy

```bash
npm run build
# Deploy .output/public/ to any static host
```

---

## 📐 Codestyle

### Naming
- **Pages**: kebab-case (`floor-plans/index.vue`)
- **Components**: PascalCase (`MakonChart.vue`)
- **Composables**: camelCase with `use` prefix (`useFormat.ts`)
- **Stores**: camelCase (`auth.ts`, `makon.ts`)
- **Types**: PascalCase interfaces

### Structure
- `<script setup lang="ts">` — always TypeScript
- Composition API — no Options API
- `definePageMeta` for layout and middleware
- `defineProps` with TypeScript interfaces

### CSS
- Tailwind utility classes in templates
- Custom component classes in `main.css` `@layer components`
- Scoped `<style>` for component-specific styles
- No inline styles (except dynamic values)

---

## 🤝 Hissa qo'shish

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention
```
feat:     new feature
fix:      bug fix
docs:     documentation
style:    formatting
refactor: code refactoring
test:     tests
chore:    build/tooling
```

---

## 📄 Litsenziya

Proprietary — © 2026 MAKON Management MChJ. All rights reserved.

---

<div align="center">

**MAKON** — Toshkentning premium tijoriy ko.*chmas mulk platformasi

Made with ❤️ in Tashkent, Uzbekistan 🇺🇿

</div>
