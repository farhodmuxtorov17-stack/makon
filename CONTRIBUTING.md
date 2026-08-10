# Contributing to MAKON

Thank you for your interest in contributing to MAKON! This document outlines the process and guidelines for contributing.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- Git

### Setup
```bash
git clone https://github.com/farhodmuxtorov17-stack/makon.git
cd makon
npm install
npm run dev
```

The dev server starts at `http://localhost:3000/makon/`

## 📋 Development Workflow

### 1. Create a Branch
```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/issue-description
```

### 2. Make Changes
- Follow the existing code style
- Use TypeScript throughout
- Use `<script setup lang="ts">` in all Vue components
- Use Tailwind utility classes for styling
- Use Lucide icons (`lucide-vue-next`)

### 3. Test Your Changes
```bash
npm run lint    # ESLint check
npm run build   # Production build (SSG)
```

Both must pass before committing.

### 4. Commit
Follow the conventional commits format:

| Type | Usage |
|------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code restructuring |
| `test:` | Adding tests |
| `chore:` | Build, tooling, dependencies |

Examples:
```
feat: add invoice export to Excel
fix: correct dark mode toggle on catalog page
docs: update README with ERI flow
refactor: extract chart options to composable
```

### 5. Push and PR
```bash
git push origin feat/your-feature-name
```

Open a Pull Request with:
- Clear title following commit convention
- Description of changes
- Screenshots for UI changes
- Related issue number (if applicable)

## 🎨 Design Guidelines

### Color Palette
- **Primary (brand)**: Indigo `#6366f1` → `#4f46e5`
- **Neutral (ink)**: Zinc scale (50-950)
- **Status**: emerald (success), amber (warning), red (danger), blue (info)

### Typography
- Font: **Inter** (Google Fonts)
- Headings: bold, tight letter-spacing (-0.03em)
- Body: normal weight, slight letter-spacing (-0.01em)

### Component Classes
Use predefined Tailwind component classes from `main.css`:
```html
<!-- Buttons -->
<button class="btn btn-primary btn-sm">Action</button>
<button class="btn btn-secondary btn-md">Action</button>
<button class="btn btn-ghost btn-lg">Action</button>

<!-- Cards -->
<div class="card p-5">Content</div>

<!-- Badges -->
<span class="badge badge-success">Faol</span>
<span class="badge badge-warning">Kutilmoqda</span>
<span class="badge badge-danger">Xato</span>
```

### Charts
Use the `MakonChart` component:
```vue
<MakonChart type="area" :series="series" :categories="months" :height="280" :colors="['#6366f1']" />
```

Supported types: `area`, `bar`, `line`, `donut`, `radialBar`, `pie`

## 🌍 Internationalization

The UI is in **Uzbek** (Latin script). Key conventions:
- Labels: short, clear Uzbek
- Status: consistent mapping functions (`statusLabel()`, `statusBadge()`)
- Currency: `so'm` (UZS)
- Date format: `dd MMM yyyy` (Russian locale for number formatting)

## 📦 Project Structure

See [README.md](./README.md) for the full directory structure.

Key rules:
- Pages in `pages/` follow Nuxt file-based routing
- Shared components in `components/`
- State in `stores/` (Pinia)
- Logic in `composables/`
- Backend functions in `functions/`
- Types in `types/`

## ✅ PR Checklist

- [ ] Code follows the style guidelines
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Commit messages follow conventional commits
- [ ] UI changes include screenshots
- [ ] Dark mode is supported
- [ ] Mobile responsive
- [ ] No console errors

## 🐛 Reporting Bugs

Open a GitHub Issue with:
1. **Title**: Clear, descriptive
2. **Environment**: Browser, OS, device
3. **Steps to reproduce**: Numbered list
4. **Expected vs actual behavior**
5. **Screenshots** (if applicable)

## 💡 Suggesting Features

Open a GitHub Issue with the `enhancement` label:
1. **Problem**: What problem does this solve?
2. **Solution**: Your proposed approach
3. **Alternatives**: Other options considered
4. **Mockups**: If UI-related

---

Thank you for contributing! 🙏
