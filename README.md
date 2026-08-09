# MAKON — Real Estate Management Platform

Zamonaviy ko'chmulk boshqaruvi platformasi. Nuxt 3, TailwindCSS, TypeScript va Pinia asosida qurilgan.

## Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Framework | Nuxt 3 (SSR)          |
| Styling   | TailwindCSS 3.4       |
| Language  | TypeScript 5.4        |
| State     | Pinia 2               |
| Charts    | Custom SVG components |
| Linting   | ESLint + Prettier     |
| Git Hooks | Husky + lint-staged   |

## Modules

- **Landing** — Public landing page + catalog
- **Auth** — Login/parol + ERI (elektron raqamli imzo)
- **Dashboard** — Executive dashboard with charts & stats
- **Buildings** — Building registry, floors, units
- **Listings** — Rental/sale listings management
- **Applications** — Application workflow (submit → finance review → offer → ERI → approve)
- **Finance** — Contracts, invoices, payments, billing periods, approvals
- **Service** — Service requests, work orders, material requests
- **Warehouse** — Inventory management, suppliers, transactions
- **Meters** — Utility meters and readings
- **Reports** — Export & reporting center
- **Admin** — Users, monitoring, backups, settings

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

**Demo credentials:** `admin` / `admin123`

## Project Structure

```
makon/
├── assets/css/        # Global styles
├── components/
│   ├── charts/        # SVG chart components
│   └── ui/            # Reusable UI components
├── layouts/           # Page layouts
├── middleware/        # Route guards
├── pages/             # File-based routing (50+ screens)
│   ├── dashboard/
│   ├── management/
│   ├── finance/
│   ├── service/
│   ├── warehouse/
│   ├── admin/
│   └── ...
├── stores/            # Pinia state stores
├── types/             # TypeScript definitions
└── utils/             # Helpers
```

## License

Proprietary — © 2025 MAKON
