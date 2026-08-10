# Реестр страниц

Всего: **57 страниц** в **18 модулях**

---

## Публичные (5 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 1 | `/` | `pages/index.vue` | Лендинг: hero, фичи, тарифы, отзывы, FAQ |
| 2 | `/catalog` | `pages/catalog/index.vue` | Каталог: фильтры, сортировка, карточки зданий |
| 3 | `/buildings/:slug` | `pages/buildings/[slug].vue` | Страница здания: галерея, листинги, 3D |
| 4 | `/buildings/:id/3d` | `pages/buildings/[id]/3d.vue` | 3D визуализация здания |
| 5 | `/units/:slug` | `pages/units/[slug].vue` | Детальная страница единицы |
| 6 | `/listings/:id` | `pages/listings/[id].vue` | Страница листинга: фото, заявка |
| 7 | `/floors/:id/plan` | `pages/floors/[id]/plan.vue` | 2D план этажа |

## Авторизация (2 страницы)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 8 | `/login` | `pages/login.vue` | Вход + переключатель ролей |
| 9 | `/register/eri` | `pages/register/eri.vue` | ERI-регистрация юр. лица |

## Дашборды (3 страницы)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 10 | `/dashboard` | `pages/dashboard/index.vue` | Redirect по роли |
| 11 | `/dashboard/executive` | `pages/dashboard/executive.vue` | Executive dashboard (KPI) |
| 12 | `/dashboard/building` | `pages/dashboard/building.vue` | Building dashboard (метрики) |

## Управление (13 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 13 | `/management/buildings` | `pages/management/buildings/index.vue` | Список зданий + создание |
| 14 | `/management/buildings/:id` | `pages/management/buildings/[id].vue` | Детальная страница здания |
| 15 | `/management/buildings/:id/units` | `pages/management/buildings/[id]/units.vue` | Юниты здания |
| 16 | `/management/units` | `pages/management/units/index.vue` | Все юниты (таблица) |
| 17 | `/management/listings` | `pages/management/listings/index.vue` | Список листингов + создание |
| 18 | `/management/applications` | `pages/management/applications/index.vue` | Конвейер заявок |
| 19 | `/management/contracts` | `pages/management/contracts/index.vue` | Управление договорами |
| 20 | `/management/service-requests` | `pages/management/service-requests/index.vue` | Сервис-заявки |
| 21 | `/management/floor-plans` | `pages/management/floor-plans/index.vue` | Импорт планов этажей |
| 22 | `/management/visual-settings` | `pages/management/visual-settings/index.vue` | Визуальные настройки (4 вкладки) |

## Заявки и договоры (5 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 23 | `/applications/new` | `pages/applications/new.vue` | Создание заявки |
| 24 | `/applications/:id/offer` | `pages/applications/[id]/offer.vue` | Коммерческий оффер |
| 25 | `/applications/:id/history` | `pages/applications/[id]/history.vue` | История заявки |
| 26 | `/contracts` | `pages/contracts/index.vue` | Список договоров |
| 27 | `/contracts/:id` | `pages/contracts/[id].vue` | Детальная страница договора |
| 28 | `/contracts/:id/activate` | `pages/contracts/[id]/activate.vue` | Активация договора |
| 29 | `/eri/signatures` | `pages/eri/signatures/index.vue` | Очередь ERI-подписей |

## Финансы (6 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 30 | `/finance/periods` | `pages/finance/periods/index.vue` | Периоды начисления |
| 31 | `/finance/invoices` | `pages/finance/invoices/index.vue` | Инвойсы |
| 32 | `/finance/debts` | `pages/finance/debts/index.vue` | Задолженности |
| 33 | `/finance/approvals` | `pages/finance/approvals/index.vue` | Утверждения |
| 34 | `/finance/inventory` | `pages/finance/inventory/index.vue` | Склад (inventory) |
| 35 | `/finance/stock-issues` | `pages/finance/stock-issues/index.vue` | Выдача материалов |

## Эксплуатация (2 страницы)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 36 | `/facility/work-orders` | `pages/facility/work-orders/index.vue` | Work orders + SLA |
| 37 | `/facility/material-requests` | `pages/facility/material-requests/index.vue` | Запросы материалов |

## Кабинет арендатора (6 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 38 | `/cabinet` | `pages/cabinet/index.vue` | KPI кабины |
| 39 | `/cabinet/units` | `pages/cabinet/units/index.vue` | Мои юниты |
| 40 | `/cabinet/applications` | `pages/cabinet/applications/index.vue` | Мои заявки |
| 41 | `/cabinet/contracts` | `pages/cabinet/contracts/index.vue` | Мои договоры |
| 42 | `/cabinet/services` | `pages/cabinet/services/index.vue` | Сервис и счёт |
| 43 | `/cabinet/service-requests/new` | `pages/cabinet/service-requests/new.vue` | Новая заявка |
| 44 | `/cabinet/meter-readings` | `pages/cabinet/meter-readings/index.vue` | Ввод показаний |

## Счётчики (1 страница)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 45 | `/meters` | `pages/meters/index.vue` | Счётчики + ввод показаний |

## Администрирование (8 страниц)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 46 | `/admin/users` | `pages/admin/users/index.vue` | Пользователи (список) |
| 47 | `/admin/users/:id` | `pages/admin/users/[id].vue` | Профиль пользователя |
| 48 | `/admin/roles` | `pages/admin/roles/index.vue` | Роли и права |
| 49 | `/admin/settings` | `pages/admin/settings/index.vue` | Настройки системы |
| 50 | `/admin/audit` | `pages/admin/audit/index.vue` | Audit journal |
| 51 | `/admin/monitoring` | `pages/admin/monitoring/index.vue` | Мониторинг системы |
| 52 | `/admin/backups` | `pages/admin/backups/index.vue` | Резервные копии |
| 53 | `/admin/login-history` | `pages/admin/login-history/index.vue` | История входов |
| 54 | `/admin/notification-templates` | `pages/admin/notification-templates/index.vue` | Шаблоны уведомлений |

## Аналитика и уведомления (2 страницы)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 55 | `/reports` | `pages/reports/index.vue` | Отчёты и аналитика |
| 56 | `/notifications` | `pages/notifications/index.vue` | Уведомления |

## Профиль (1 страница)

| # | Путь | Файл | Описание |
|---|------|------|----------|
| 57 | `/profile` | `pages/profile/index.vue` | Профиль + ERI-операции |
