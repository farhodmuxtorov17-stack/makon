# Вклад в проект MAKON

🎉 Спасибо за интерес к вкладу в MAKON! Этот документ поможет вам начать.

---

## 🚀 Быстрый старт для контрибьюторов

```bash
# Форкните репозиторий
git clone https://github.com/ВАШ_НИК/makon.git
cd makon

# Установите зависимости
npm install

# Создайте ветку для фичи
git checkout -b feature/amazing-feature

# Запустите dev-сервер
npm run dev

# После изменений — lint
npm run lint

# Запушьте
git push origin feature/amazing-feature

# Откройте Pull Request
```

---

## 📏 Стандарты кода (ESLint)

### Vue / TypeScript

- Используйте `<script setup lang="ts">` для всех новых компонентов
- `definePageMeta` должен быть первым вызовом в page-компоненте
- Используйте TypeScript-типы из `types/index.ts`
- Имена компонентов: PascalCase (`CreateBuildingModal.vue`)
- Имена страниц: kebab-case в путях (`meter-readings`, `visual-settings`)

### TailwindCSS

- Используйте компонентные классы: `.card`, `.btn`, `.input`, `.badge`
- Тёмный режим: всегда добавляйте `dark:` варианты
- Цвета: только `brand-*`, `ink-*` и семантические (`emerald`, `amber`, `red`)
- Responsive: mobile-first (`sm:`, `md:`, `lg:`)

### Иконки

- Только `lucide-vue-next`
- Размеры: 14 (inline), 16 (button), 18 (header), 20 (stats), 24 (features)
- Импортируйте только нужные иконки: `import { Bell, X } from 'lucide-vue-next'`

---

## 🎨 Дизайн-гайдлайны

### Принципы

1. **Премиальная простота** — Linear / Stripe эстетика, не SaaS-шаблон
2. **Контент важнее хрома** — больше пространства, меньше границ
3. **Тёмный режим обязателен** — все компоненты должны работать в обоих режимах
4. **Двуязычность** — контентные поля: `titleUz` + `titleRu`
5. **Mobile-first** — сначала мобайл, потом desktop

### Компоненты

| Компонент | Когда использовать |
|-----------|-------------------|
| `.card` | Базовый контейнер |
| `.btn-primary` | Главное действие на странице (1 per page) |
| `.btn-secondary` | Вторичные действия |
| `.btn-ghost` | Третичные, hover-действия |
| `.badge-*` | Статусы, метки, категории |
| `.input` | Все текстовые поля, селекты |

### Запрещено

- ❌ Inline-стили (`style="..."`) кроме динамических значений
- ❌ CSS-модули (только Tailwind)
- ❌ Ручные SVG-иконки (только Lucide)
- ❌ Градиенты-фоны для обычных карточек
- ❌ `!important`
- ❌ `@apply` в template (только в CSS-файлах)

---

## 📝 Коммиты

Мы используем [Conventional Commits](https://www.conventionalcommits.org/):

```
<тип>(<область>): <описание>

<опциональное тело>
```

### Типы

| Тип | Описание |
|-----|----------|
| `feat` | Новая функция |
| `fix` | Исправление бага |
| `docs` | Документация |
| `style` | Форматирование, пробелы (без логики) |
| `refactor` | Рефакторинг без изменения поведения |
| `perf` | Улучшение производительности |
| `test` | Тесты |
| `chore` | Сборка, зависимости, конфиг |

### Примеры

```
feat(finance): add invoice PDF export modal
fix(meters): fix consumption calculation when reading is lower than previous
docs: update architecture diagram for v1.0
style(catalog): adjust card padding for mobile
```

---

## 🧪 Перед Pull Request

- [ ] `npm run lint` — без ошибок
- [ ] `npm run build` — сборка проходит
- [ ] Тёмный режим работает
- [ ] Мобильная вёрстка корректна
- [ ] Нет console.error в dev-режиме
- [ ] Добавлены/обновлены типы в `types/index.ts` если нужно

---

## 🐛 Сообщение о баге

Используйте [шаблон баг-репорта](https://github.com/farhodmuxtorov17-stack/makon/issues/new?template=bug-report.yml).

## ✨ Запрос функции

Используйте [шаблон feature request](https://github.com/farhodmuxtorov17-stack/makon/issues/new?template=feature-request.yml).

---

## 🌿 Ветвление

```
main          → Production (авто-деплой на GitHub Pages)
feature/*     → Новые функции
fix/*         → Исправления багов
hotfix/*      → Срочные фиксы
docs/*        → Документация
```

---

## ❓ Вопросы

- Откройте [Discussion](https://github.com/farhodmuxtorov17-stack/makon/discussions)
- Или [Telegram-группу](https://t.me/makon_platform)

---

Спасибо за вклад в MAKON! 🚀
