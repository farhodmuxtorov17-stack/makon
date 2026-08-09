# ARCHITECTURE

## Overview

MAKON is a real estate management platform built as a Nuxt 3 SSR application with a clean, modular architecture.

## Design Principles

1. **File-based routing** — Pages directory maps directly to routes
2. **Store-driven state** — Pinia stores encapsulate all domain data
3. **Type safety** — Full TypeScript with strict mode
4. **Component reuse** — Shared UI components in `components/ui/`
5. **Custom charts** — SVG-based charts with zero dependencies

## Data Flow

```
User → Page → Store → Mock Data → UI Components
```

All data is currently mocked in Pinia stores. The store layer is designed to be swapped with API calls without changing components.

## Key Patterns

- **StatusBadge** — Unified status rendering across all modules
- **StatCard** — Consistent KPI display
- **Modal** — Teleported dialog with transitions
- **Sidebar** — Collapsible navigation with role-based sections

## Security

- Route middleware guards authenticated routes
- Row-level security ready (store layer supports user scoping)
- ERI integration for digital signatures
