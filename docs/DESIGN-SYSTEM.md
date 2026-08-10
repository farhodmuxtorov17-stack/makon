# Дизайн-система MAKON

## Философия

Дизайн-система MAKON вдохновлена принципами **Linear**, **Stripe** и **Vercel** — чистый, минималистичный интерфейс с акцентом на типографику, пространство и семантические цвета. Никаких градиентных "SaaS-шаблонов" — только премиальная, сдержанная эстетика.

---

## Цвета

### Brand (основной акцент)

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `brand-50` | `#eef2ff` | Lightest фон для акцентов |
| `brand-100` | `#e0e7ff` | Badge backgrounds |
| `brand-200` | `#c7d2fe` | Borders |
| `brand-300` | `#a5b4fc` | Hover states |
| `brand-400` | `#818cf8` | Secondary actions |
| `brand-500` | `#6366f1` | **Основной** |
| `brand-600` | `#4f46e5` | Button hover |
| `brand-700` | `#4338ca` | Active states |
| `brand-800` | `#3730a3` | Deep backgrounds |
| `brand-900` | `#312e81` | Dark themes |
| `brand-950` | `#1e1b4b` | Darkest |

### Ink (нейтральная шкала)

| Токен | HEX | Назначение |
|-------|-----|-----------|
| `ink-50` | `#fafafa` | Lightest background |
| `ink-100` | `#f4f4f5` | Card backgrounds (light) |
| `ink-200` | `#e4e4e7` | Borders (light) |
| `ink-300` | `#d4d4d8` | Disabled states |
| `ink-400` | `#a1a1aa` | Tertiary text |
| `ink-500` | `#71717a` | **Secondary text** |
| `ink-600` | `#52525b` | Body text |
| `ink-700` | `#3f3f46` | Headings (light) |
| `ink-800` | `#27272a` | Card backgrounds (dark) |
| `ink-900` | `#18181b` | **Dark mode bg** |
| `ink-950` | `#09090b` | Darkest background |

### Семантические

| Цвет | HEX | Использование |
|------|-----|--------------|
| `emerald-500` | `#10b981` | Success, PAID, ACTIVE, OK |
| `amber-500` | `#f59e0b` | Warning, PENDING, SLA risk |
| `red-500` | `#ef4444` | Error, OVERDUE, danger |
| `blue-500` | `#3b82f6` | Info, WATER meter |
| `orange-500` | `#f97316` | GAS meter |
| `purple-500` | `#a855f7` | Special badges |

---

## Типографика

### Шрифт

- **Основной:** Inter (system-ui fallback)
- **Моноширинный:** JetBrains Mono (ui-monospace fallback)

### Размеры

| Класс | Размер | Использование |
|-------|--------|--------------|
| `text-xs` | 12px | Badges, метаданные |
| `text-sm` | 14px | Body text, labels |
| `text-base` | 16px | Default |
| `text-lg` | 18px | Подзаголовки |
| `text-xl` | 20px | Section headers |
| `text-2xl` | 24px | Page titles |
| `text-3xl` | 30px | Hero subtitles |
| `text-4xl` | 36px | Hero titles |
| `text-6xl` | 60px | Landing hero |

---

## Компонентные классы

### Card

```css
.card {
  @apply bg-white dark:bg-ink-900 border border-black/5 dark:border-white/5
         rounded-2xl p-5 transition-all;
}

.card-hover:hover {
  @apply shadow-lg -translate-y-0.5;
}
```

### Button

```css
.btn { @apply px-4 py-2 rounded-xl font-medium text-sm transition-all; }
.btn-sm { @apply px-3 py-1.5 text-xs; }
.btn-lg { @apply px-6 py-3 text-base; }
.btn-primary { @apply bg-brand-500 hover:bg-brand-600 text-white; }
.btn-secondary { @apply bg-ink-100 dark:bg-ink-800 hover:bg-ink-200; }
.btn-ghost { @apply hover:bg-black/5 dark:hover:bg-white/5; }
.btn-danger { @apply bg-red-500 hover:bg-red-600 text-white; }
```

### Input

```css
.input {
  @apply w-full px-3 py-2 rounded-xl border border-black/10 dark:border-white/10
         bg-transparent text-sm focus:border-brand-500 focus:ring-2
         focus:ring-brand-500/20 outline-none transition-all;
}
```

### Badge

```css
.badge { @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium; }
.badge-brand { @apply bg-brand-500/10 text-brand-500; }
.badge-success { @apply bg-emerald-500/10 text-emerald-500; }
.badge-warning { @apply bg-amber-500/10 text-amber-500; }
.badge-danger { @apply bg-red-500/10 text-red-500; }
.badge-neutral { @apply bg-ink-500/10 text-ink-500; }
```

### Toggle

```css
.toggle {
  @apply w-9 h-5 appearance-none rounded-full bg-ink-200 dark:bg-ink-700
         relative cursor-pointer transition-colors
         checked:bg-brand-500 before:content-[''] before:absolute
         before:w-4 before:h-4 before:rounded-full before:bg-white
         before:top-0.5 before:left-0.5 before:transition-transform
         checked:before:translate-x-4;
}
```

---

## Отступы и радиусы

| Токен | Значение | Использование |
|-------|----------|--------------|
| `rounded-lg` | 8px | Small elements |
| `rounded-xl` | 12px | Buttons, inputs |
| `rounded-2xl` | 16px | Cards, modals |
| `rounded-full` | ∞ | Badges, avatars |

## Тени

- `shadow-sm` — subtle elevation
- `shadow-lg` — hover state on cards
- `shadow-xl` — modals, toasts

---

## Иконки

Используются иконки из **Lucide** (`lucide-vue-next`). Размеры:

| Size | Использование |
|------|--------------|
| 14px | Table actions, inline |
| 16px | Buttons, sidebar nav |
| 18px | Header actions |
| 20px | Stats cards |
| 24px | Feature blocks |
| 32px | Empty states |

---

## Анимации

```css
animate-fade-in   /* 0.3s ease-out opacity+translateY */
animate-slide-in  /* 0.25s ease-out translateX */
```

Toast-анимации: `toast-enter-active` / `toast-leave-to`

---

## Адаптивность

| Breakpoint | Ширина | Изменения |
|------------|--------|-----------|
| Default (mobile) | < 640px | 1 колонка, drawer sidebar |
| `sm:` | ≥ 640px | 2 колонки в некоторых grid |
| `md:` | ≥ 768px | 2-3 колонки, видимый sidebar |
| `lg:` | ≥ 1024px | Sticky sidebar, 3-4 колонки |
| `xl:` | ≥ 1280px | Max-width контейнера |

Все страницы — **mobile-first**. Сайдбар: drawer на mobile, sticky на desktop.
