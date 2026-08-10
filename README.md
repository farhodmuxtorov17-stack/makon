<div align="center">

<img src="public/makon/favicon.svg" width="120" height="120" alt="MAKON Logo" />

# MAKON

### Premium Real Estate Management Platform

**Узбекистанча · 18 модуль · 57 страница · 8 ролей · 322 логических таблица**

[![CI](https://github.com/farhodmuxtorov17-stack/makon/actions/workflows/ci.yml/badge.svg)](https://github.com/farhodmuxtorov17-stack/makon/actions/workflows/ci.yml)
[![Deploy](https://github.com/farhodmuxtorov17-stack/makon/actions/workflows/deploy.yml/badge.svg)](https://github.com/farhodmuxtorov17-stack/makon/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](LICENSE)
[![Made with Nuxt 3](https://img.shields.io/badge/Made_with-Nuxt_3-00DC82.svg)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/farhodmuxtorov17-stack/makon?style=social)](https://github.com/farhodmuxtorov17-stack/makon)

</div>

---

## 📱 Telegram Mini App

MAKON полностью адаптирован для работы как **Telegram Mini App** — все 8 ролей могут комфортно работать через Telegram.

### Возможности

- ✅ **Telegram WebApp SDK** — интеграция с `telegram-web-app.js`
- ✅ **Safe Area** — поддержка `env(safe-area-inset-*)` для всех устройств
- ✅ **Status Bar** — реалистичный iOS-style status bar (время, Wi-Fi, батарея)
- ✅ **Navigation Bar** — нижняя навигация с кнопкой "Назад" и tabs
- ✅ **Haptic Feedback** — тактильная отдача при взаимодействии
- ✅ **Theme Sync** — синхронизация темы с Telegram
- ✅ **Viewport** — корректная высота `100dvh` для Mini App

### Экран авторизации

На странице входа отображаются **реалистичные мокапы устройств**:

| Устройство | Ориентация | Контент |
|-----------|-----------|---------|
| iPhone 17 Pro Max | Вертикальная | Кабинет арендатора: KPI, договоры, инвойсы, навигация |
| iPad Pro 11" | Горизонтальная | Executive dashboard: KPI, график, активность |

### Компоненты

- `StatusBar.vue` — реалистичный status bar (Dynamic Island, Wi-Fi, батарея)
- `TgNavBar.vue` — нижняя навигация с кнопкой "Назад" и role-based tabs
- `useTelegram.ts` — composable для Telegram WebApp API
- `layouts/telegram.vue` — layout для Mini App режима


---

## 📋 Содержание

- [О проекте](#-о-проекте)
- [Возможности](#-возможности)
- [Технологии](#️-технологии)
- [Архитектура](#-архитектура)
- [Структура проекта](#-структура-проекта)
- [Быстрый старт](#-быстрый-старт)
- [Скрипты](#-скрипты)
- [Дизайн-система](#-дизайн-система)
- [Роли и доступ](#-роли-и-доступ)
- [Модули](#-модули)
- [Документация](#-документация)
- [Roadmap](#-roadmap)
- [Вклад в проект](#-вклад-в-проект)
- [Лицензия](#-лицензия)

---

## 🏢 О проекте

**MAKON** — это комплексная платформа для управления коммерческой недвижимостью премиум-класса в Ташкенте. Платформа объединяет весь жизненный цикл управления недвижимостью: от публичного каталога и подачи заявок до подписания договоров через ERI (Электронную Рамочную Подпись), финансового учёта, управления объектами и аналитики.

### Ключевые объекты

- **Tashkent City** — 12 этажей, 420 юнитов, 45 000 м²
- **Trillant Tower** — 18 этажей, 180 юнитов, 28 000 м²
- **IT Park** — 8 этажей, 150 юнитов, 18 000 м²
- **Piramit** — 10 этажей, 90 юнитов, 15 000 м²

---

## ✨ Возможности

### 🏗 Управление объектами
- Иерархия: Здание → Этаж → Юнит → Листинг
- 3D визуализация зданий и 2D планы этажей
- Импорт планов этажей с автоматическим распознаванием
- Галереи изображений и виртуальные туры

### 📋 Заявки и договоры
- Полный конвейер: Заявка → Оффер → ERI-подпись → Договор
- Многоязычные описания (UZ / RU)
- Версионирование договоров и история изменений
- PDF-экспорт и архивирование

### 💰 Финансы
- Периоды начисления и автоматическая генерация инвойсов
- Контроль задолженностей и просрочек
- Многоуровневое утверждение (approvals)
- Складской учёт (inventory) с минимумами и алертами

### 🔧 Эксплуатация
- Service requests с SLA-мониторингом
- Work orders и назначение исполнителей
- Material requests со склада
- Рейтинги и обратная связь

### 📊 Аналитика
- Executive dashboard с KPI
- Building dashboard с метриками здания
- Воронка заявок и конверсия
- Производительность по зданиям с SLA-бейджами

### ⚙️ Администрирование
- 8 ролей с гранулярными правами
- Audit journal всех действий
- Мониторинг системы в реальном времени
- Резервное копирование и восстановление
- Шаблоны уведомлений

---

## 🛠️ Технологии

| Категория | Технология | Версия |
|-----------|-----------|--------|
| **Фреймворк** | [Nuxt 3](https://nuxt.com) | 3.21+ |
| **Язык** | [TypeScript](https://www.typescriptlang.org/) | 5.4+ |
| **Стили** | [TailwindCSS](https://tailwindcss.com) | 3.4+ |
| **State** | [Pinia](https://pinia.vuejs.org/) | 2.1+ |
| **Иконки** | [Lucide](https://lucide.dev/) | 0.400+ |
| **Тёмная тема** | [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) | 4.0+ |
| **Шрифты** | Inter, JetBrains Mono | — |
| **CI/CD** | GitHub Actions | — |
| **Хостинг** | GitHub Pages | — |

---

## 🏗 Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                        Публичная часть                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │
│  │  Лендинг │  │ Каталог  │  │ Bино стр.│  │  Unit/Liting │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
              ┌────────▼────────┐
              │   Авторизация    │
              │   + ERI регист.  │
              └────────┬────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                     Админ-панель (8 ролей)                    │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │Dashboard│ │Управление│ │ Финансы │ │Эксплуат.│ │Отчёты  │ │
│  │         │ │ здания   │ │         │ │         │ │        │ │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └────────┘ │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│  │  ERI    │ │Админ    │ │Монитор. │ │Кабинет  │            │
│  │ подписи │ │ панель  │ │система  │ │иждарача │            │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Принципы проектирования

1. **Тёмный/Светлый режим** — полная поддержка через `@nuxtjs/color-mode`
2. **Адаптивность** — mobile-first, breakpoint-aware на всех страницах
3. **Роль-based UI** — навигация и доступ меняются по роли пользователя
4. **Статический-first** — SSR + prerendering, моковые данные на фронтенде
5. **Двуязычность** — все контентные поля дублированы (UZ/RU)

---

## 📁 Структура проекта

```
makon/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Линтинг + сборка
│   │   └── deploy.yml          # Деплой на GitHub Pages
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.yml
│   │   ├── feature-request.yml
│   │   └── config.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── assets/
│   └── css/
│       └── main.css            # Глобальные стили, компонентные классы
├── components/
│   ├── CreateBuildingModal.vue # Модалка создания здания
│   ├── CreateListingModal.vue  # Модалка создания листинга
│   ├── RoleSwitcher.vue        # Переключатель ролей (демо)
│   └── ThemeToggle.vue         # Кнопка тёмного/светлого режима
├── composables/
│   └── useApi.ts               # API-композбл (заготовка)
├── layouts/
│   ├── admin.vue               # Layout с сайдбаром (8 ролей)
│   ├── auth.vue                # Layout для логина/регистрации
│   └── public.vue             # Layout для публичных страниц
├── middleware/
│   └── auth.ts                 # Middleware авторизации
├── pages/
│   ├── index.vue               # 🏠 Лендинг
│   ├── catalog/                # 📂 Публичный каталог
│   ├── buildings/              # 🏢 Страница здания + 3D
│   ├── units/                  # 📐 Страница юнита
│   ├── listings/               # 🏷 Страница листинга
│   ├── login.vue               # 🔐 Вход
│   ├── register/               # 📝 ERI-регистрация
│   ├── profile/                # 👤 Профиль
│   ├── dashboard/              # 📊 Дашборды (executive + building)
│   ├── management/             # ⚙️ Управление (buildings, units,
│   │                           #    listings, applications, etc.)
│   ├── contracts/              # 📜 Договоры
│   ├── applications/           # 📋 Заявки
│   ├── finance/                # 💰 Финансы (periods, invoices,
│   │                           #    debts, approvals, inventory)
│   ├── facility/               # 🔧 Эксплуатация (work-orders, materials)
│   ├── meters/                 # ⚡ Счётчики
│   ├── eri/                    # ✍️ ERI-подписи
│   ├── cabinet/                # 🏠 Кабинет иждарача
│   ├── admin/                  # 🔑 Админ (users, roles, audit,
│   │                           #    monitoring, backups, settings)
│   ├── reports/                # 📈 Отчёты и аналитика
│   └── notifications/          # 🔔 Уведомления
├── stores/
│   ├── auth.ts                 # Auth store (Pinia)
│   └── makon.ts                # Global app store
├── types/
│   └── index.ts                # TypeScript типы и константы
├── app.vue                     # Root component
├── nuxt.config.ts              # Nuxt конфигурация
├── tailwind.config.ts          # Tailwind + цвета brand/ink
└── package.json
```

---

## 🚀 Быстрый старт

### Требования

- **Node.js** 18+ (рекомендуется 20)
- **npm** 10+

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/farhodmuxtorov17-stack/makon.git
cd makon

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Откройте [http://localhost:3000/makon](http://localhost:3000/makon) в браузере.

### Сборка

```bash
# Статическая генерация (GitHub Pages)
npm run build

# Предпросмотр production-сборки
npm run preview
```

### Деплой

Проект автоматически деплоится на GitHub Pages при пуше в `main`.

**Live:** [https://farhodmuxtorov17-stack.github.io/makon/](https://farhodmuxtorov17-stack.github.io/makon/)

---

## 📜 Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск dev-сервера (HMR) |
| `npm run build` | Статическая генерация в `.output/public` |
| `npm run preview` | Локальный предпросмотр production-сборки |
| `npm run lint` | ESLint проверка |

---

## 🎨 Дизайн-система

### Цвета

| Токен | HEX | Использование |
|-------|-----|--------------|
| `brand-500` | `#6366f1` | Основной акцент (индико) |
| `brand-600` | `#4f46e5` | Hover-состояния |
| `ink-950` | `#09090b` | Фон тёмного режима |
| `ink-900` | `#18181b` | Карты в тёмном режиме |
| `ink-500` | `#71717a` | Вторичный текст |
| `emerald-500` | `#10b981` | Успех, активный статус |
| `amber-500` | `#f59e0b` | Предупреждение, ожидание |
| `red-500` | `#ef4444` | Ошибка, просрочка |

### Компонентные классы

```css
.card        /* Базовая карточка: rounded-2xl, border, padding */
.btn        /* Кнопка: px-4 py-2, rounded-xl, font-medium */
.btn-primary /* brand-500 bg, white text */
.btn-secondary /* secondary bg */
.input      /* Форма ввода: w-full, rounded-xl, border */
.badge      /* Метка: inline-flex, rounded-full, px-2 */
.toggle     /* Чекбокс-переключатель */
```

### Типографика

- **Заголовки:** Inter, font-weight 700
- **Основной текст:** Inter, font-weight 400-500
- **Код:** JetBrains Mono

---

## 🔐 Роли и доступ

| Роль | Назначение | Доступ |
|------|-----------|--------|
| `SUPER_HEAD` | Супер-руководитель | Все модули (read), отчёты, аудит |
| `ADMIN` | Администратор | Пользователи, роли, настройки, бэкапы |
| `BUILDING_MANAGER` | Менеджер здания | Здания, юниты, листинги, заявки, счётчики |
| `ACCOUNTANT` | Бухгалтер | Финансы, инвойсы, долги, склад |
| `FACILITY` | Подрядчик | Work orders, material requests |
| `WAREHOUSE_OPERATOR` | Кладовщик | Склад, выдача материалов |
| `CONTENT_OPERATOR` | Контент-менеджер | Здания (read), визуальные настройки |
| `TENANT_OWNER` | Арендатор | Кабинет, юниты, заявки, договоры, счётчики |

---

## 📦 Модули

### Публичные

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Лендинг | `/` | Hero, фичи, тарифы, отзывы, FAQ |
| Каталог | `/catalog` | Фильтры, сортировка, карточки зданий |
| Здание | `/buildings/:slug` | Галерея, листинги, описание, 3D |
| Юнит | `/units/:slug` | Детальная страница единицы |
| Листинг | `/listings/:id` | Фотогалерея, заявка, виртуальный тур |

### Авторизация

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Вход | `/login` | Авторизация + переключатель ролей |
| ERI | `/register/eri` | Регистрация юр. лица через ERI |

### Управление

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Дашборд | `/dashboard/executive`, `/dashboard/building` | KPI, графики, воронки |
| Здания | `/management/buildings` | CRUD, детальная страница, юниты |
| Юниты | `/management/units` | Таблица всех юнитов со статусами |
| Листинги | `/management/listings` | CRUD листингов, статусы |
| Заявки | `/management/applications` | Конвейер обработки заявок |
| Сервис | `/management/service-requests` | Заявки на обслуживание |
| Договоры | `/contracts` | Список, детальная страница, активация |
| ERI-подписи | `/eri/signatures` | Очередь подписания |
| Планы этажей | `/management/floor-plans` | Импорт 2D-планов |
| Визуальные настройки | `/management/visual-settings` | 4 вкладки: каталог, здание, листинг, тема |

### Финансы

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Периоды | `/finance/periods` | Месячные периоды начисления |
| Инвойсы | `/finance/invoices` | Все инвойсы, статусы оплаты |
| Задолженности | `/finance/debts` | Просроченные и рисковые долги |
| Утверждения | `/finance/approvals` | Многоуровневые approvals |
| Склад | `/finance/inventory` | Материалы, минимумы, алерты |
| Выдача | `/finance/stock-issues` | Выдача материалов со склада |

### Эксплуатация

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Work orders | `/facility/work-orders` | Заявки с SLA-мониторингом |
| Material requests | `/facility/material-requests` | Запрос материалов со склада |

### Кабинет арендатора

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Кабинет | `/cabinet` | KPI, заявки, договоры, инвойсы |
| Мои юниты | `/cabinet/units` | Список арендованных единиц |
| Заявки | `/cabinet/applications` | История заявок и документов |
| Договоры | `/cabinet/contracts` | Договоры с прогресс-баром |
| Сервис | `/cabinet/services` | Сервис-заявки |
| Счётчики | `/cabinet/meter-readings` | Ввод показаний |

### Администрирование

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Пользователи | `/admin/users` | CRUD + детальная страница |
| Роли | `/admin/roles` | 8 ролей, матрица прав |
| Аудит | `/admin/audit` | Журнал всех действий |
| Мониторинг | `/admin/monitoring` | Системные метрики |
| Бэкапы | `/admin/backups` | Резервные копии |
| История входов | `/admin/login-history` | Логи авторизации |
| Шаблоны | `/admin/notification-templates` | Шаблоны уведомлений |
| Настройки | `/admin/settings` | Конфигурация системы |

### Аналитика и уведомления

| Модуль | Страницы | Описание |
|--------|---------|----------|
| Отчёты | `/reports` | KPI, тренды, воронка, производительность |
| Уведомления | `/notifications` | Фильтры, read/unread, deep links |

---

## 📚 Документация

| Документ | Описание |
|----------|----------|
| [Архитектура](docs/ARCHITECTURE.md) | Системная архитектура, паттерны, решения |
| [Дизайн-система](docs/DESIGN-SYSTEM.md) | Цвета, типографика, компоненты |
| [Страницы](docs/PAGES.md) | Полный реестр всех 57 страниц |
| [Вклад в проект](CONTRIBUTING.md) | Гайд по контрибуции |
| [Changelog](CHANGELOG.md) | История изменений |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Правила сообщества |
| [Безопасность](SECURITY.md) | Политика безопасности |

---

## 🗺 Roadmap

- [x] **v1.0** — Полный фронтенд (57 страниц, 18 модулей)
- [x] **v1.0** — Тёмный/светлый режим
- [x] **v1.0** — Интерактивные модалки (создание здания/листинга)
- [x] **v1.0** — 8 ролей с ролевой навигацией
- [x] **v1.0** — ERI-флоу (регистрация → подпись → активация)
- [ ] **v1.1** — Backend API (Base44 backend functions)
- [ ] **v1.2** — Реальная ERI интеграция
- [ ] **v1.3** — Мобильное приложение (PWA)
- [ ] **v2.0** — Банковая интеграция и автоплатежи
- [ ] **v2.0** — IoT-интеграция (умные счётчики)

---

## 🤝 Вклад в проект

Мы приветствуем вклад! Пожалуйста, прочитайте [CONTRIBUTING.md](CONTRIBUTING.md) перед началом работы.

### Способы помочь

- 🐛 [Сообщить о баге](https://github.com/farhodmuxtorov17-stack/makon/issues/new?template=bug-report.yml)
- ✨ [Предложить фичу](https://github.com/farhodmuxtorov17-stack/makon/issues/new?template=feature-request.yml)
- 📝 Улучшить документацию
- 🎨 Улучшить дизайн
- 🔧 Отправить Pull Request

---

## 📄 Лицензия

Этот проект распространяется под лицензией **MIT**. См. [LICENSE](LICENSE).

---

<div align="center">

**Сделано с ❤️ в Ташкенте, Узбекистан**

[⭐ Поставьте звезду](https://github.com/farhodmuxtorov17-stack/makon) · [🍴 Форк](https://github.com/farhodmuxtorov17-stack/makon/fork) · [📖 Документация](docs/ARCHITECTURE.md)

</div>
