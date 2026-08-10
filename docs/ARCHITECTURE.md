# Архитектура MAKON

## Обзор

MAKON построен на **Nuxt 3** с статической генерацией (SSG), что обеспечивает максимальную производительность и SEO-оптимизацию для публичных страниц, сохраняя при этом полную интерактивность в админ-панели.

## Слои

```
┌─────────────────────────────────────────────────┐
│                  Presentation                    │
│  Vue 3 SFC · TailwindCSS · Lucide Icons          │
│  Layouts: public · auth · admin                  │
├─────────────────────────────────────────────────┤
│                   State                         │
│  Pinia Stores: auth · makon                      │
│  useState: currentRole · sidebar                 │
├─────────────────────────────────────────────────┤
│                   Routing                       │
│  Nuxt Pages (file-based) · Middleware: auth      │
│  57 pages · 8 role-based navigations             │
├─────────────────────────────────────────────────┤
│                   Data                          │
│  Static mock data (no API in v1.0)              │
│  Composables: useApi (prepared for backend)     │
├─────────────────────────────────────────────────┤
│                   Build                         │
│  Nitro prerender · GitHub Pages · SPA fallback  │
└─────────────────────────────────────────────────┘
```

## Layout-система

### `layouts/public.vue`
- Полноэкранный layout без сайдбара
- Используется для: лендинг, каталог, здание, юнит, листинг
- Прозрачный хедер с логотипом и навигацией

### `layouts/auth.vue`
- Центрированный контент на градиентном фоне
- Используется для: логин, ERI-регистрация
- Тёмный/светлый режим

### `layouts/admin.vue`
- Sticky-сайдбар (260px) с навигацией по роли
- Glassmorphism-хедер с RoleSwitcher + ThemeToggle
- Mobile: drawer-сайдбар с overlay
- 8 наборов навигации (по ролям)

## Ролевая модель

```typescript
type UserRole =
  | 'SUPER_HEAD'        // Глобальный дашборд, все read
  | 'ADMIN'             // Пользователи, роли, настройки
  | 'BUILDING_MANAGER'  // Здания, юниты, листинги
  | 'ACCOUNTANT'        // Финансы, инвойсы, склад
  | 'FACILITY'          // Work orders, материалы
  | 'WAREHOUSE_OPERATOR'// Склад, выдача
  | 'CONTENT_OPERATOR'  // Контент, визуальные настройки
  | 'TENANT_OWNER'      // Кабинет, договоры, счётчики
```

Навигация динамически меняется через `allNavItems[currentRole]` в `layouts/admin.vue`.

## Тёмный/светлый режим

- Реализован через `@nuxtjs/color-mode`
- Конфигурация: `preference: 'light'`, `classSuffix: ''`
- Storage key: `makon-theme`
- CSS: все компоненты используют `dark:` variants TailwindCSS
- Компонент `ThemeToggle.vue` — переключатель в хедере

## Цветовая система

```javascript
brand: {
  50: '#eef2ff',  // Lightest
  500: '#6366f1', // Primary (indigo)
  950: '#1e1b4b', // Darkest
}
ink: {
  50: '#fafafa',  // Lightest background
  500: '#71717a', // Secondary text
  950: '#09090b', // Darkest background
}
```

## Данные (v1.0)

В версии 1.0 все данные — статичные моки внутри `<script setup>` каждого page-компонента. Это позволяет:
- Полностью функциональный UI без бэкенда
- Быстрый рендеринг (SSG)
- Лёгкий переход к реальному API (заменить `const data = ref({...})` на `const { data } = await useAsyncData(...)`)

### Подготовка к API

```typescript
// composables/useApi.ts — заготовка для будущего бэкенда
export function useApi() {
  const baseUrl = useRuntimeConfig().public.apiBase

  async function fetchCatalog() { /* ... */ }
  async function fetchBuilding(slug: string) { /* ... */ }
  async function fetchAdminData(action: string) { /* ... */ }

  return { fetchCatalog, fetchBuilding, fetchAdminData }
}
```

## CI/CD

```
Push to main
    │
    ├──→ CI Workflow
    │    ├── Lint (ESLint)
    │    └── Build (nuxt generate)
    │
    └──→ Deploy Workflow
         ├── Build static site
         ├── Add SPA fallback + .nojekyll
         ├── Upload artifact
         └── Deploy to GitHub Pages
```

## Паттерны кода

### Страница (page)
```vue
<template>
  <div class="space-y-6">
    <!-- Header with title + actions -->
    <!-- Stats cards -->
    <!-- Filters -->
    <!-- Data table / grid -->
    <!-- Modals -->
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'lucide-vue-next'
definePageMeta({ layout: 'admin', middleware: 'auth' })
// Static mock data
const data = ref({ ... })
// Computed filters
// Functions
</script>
```

### Компонент
```vue
<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: []; created: [item: any] }>()
</script>
```

## Производительность

- **SSG**: prerender `/` и `/catalog` при сборке
- **Lazy images**: `loading="lazy"` на всех изображениях
- **Code splitting**: автоматически через Nuxt
- **Font preconnect**: Google Fonts с preconnect
- **CSS**: Tailwind purged, минимальный размер

## Безопасность

- **Auth middleware**: проверка на всех админ-страницах
- **Role-based navigation**: доступ только к разрешённым модулям
- **localStorage**: только user-объект (без токенов в v1.0)
- **Внешние действия**: в v1.0 нет (всё статичное)
