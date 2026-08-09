// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{ts,js}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Brand — premium violet-blue
        brand: {
          50: '#f5f7ff',
          100: '#eceeff',
          200: '#dae0ff',
          300: '#bcc6ff',
          400: '#9aa3ff',
          500: '#7c84fc',
          600: '#6356f7',
          700: '#5340e3',
          800: '#4334c0',
          900: '#382e9c',
          950: '#241a5c',
        },
        // Surface — refined dark
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b1b8c8',
          400: '#8690a8',
          500: '#67708a',
          600: '#525a72',
          700: '#434a5e',
          800: '#3a3f50',
          900: '#1a1d28',
          950: '#0f1117',
        },
        // Warm accent — amber gold
        gold: {
          50: '#fffaeb',
          100: '#fff1c6',
          200: '#ffe088',
          300: '#ffc94a',
          400: '#ffb220',
          500: '#f99007',
          600: '#dd6c02',
          700: '#b74b05',
          800: '#94380c',
          900: '#7a2e0d',
        },
        // Emerald
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Rose
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Sky
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Legacy aliases for backward compat
        primary: {
          50: '#f5f7ff', 100: '#eceeff', 200: '#dae0ff', 300: '#bcc6ff',
          400: '#9aa3ff', 500: '#7c84fc', 600: '#6356f7', 700: '#5340e3',
          800: '#4334c0', 900: '#382e9c', 950: '#241a5c',
        },
        neutral: {
          50: '#f6f7f9', 100: '#eceef2', 200: '#d5d9e2', 300: '#b1b8c8',
          400: '#8690a8', 500: '#67708a', 600: '#525a72', 700: '#434a5e',
          800: '#3a3f50', 900: '#1a1d28', 950: '#0f1117',
        },
        accent: {
          50: '#fffaeb', 100: '#fff1c6', 200: '#ffe088', 300: '#ffc94a',
          400: '#ffb220', 500: '#f99007', 600: '#dd6c02', 700: '#b74b05',
          800: '#94380c', 900: '#7a2e0d',
        },
        success: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
          800: '#065f46', 900: '#064e3b',
        },
        warning: {
          50: '#fffaeb', 100: '#fff1c6', 200: '#ffe088', 300: '#ffc94a',
          400: '#ffb220', 500: '#f99007', 600: '#dd6c02', 700: '#b74b05',
          800: '#94380c', 900: '#7a2e0d',
        },
        danger: {
          50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
          400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
          800: '#9f1239', 900: '#881337',
        },
        info: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e',
        },
      },
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px 0 rgb(15 17 23 / 0.04)',
        'sm': '0 1px 3px 0 rgb(15 17 23 / 0.06), 0 1px 2px -1px rgb(15 17 23 / 0.04)',
        DEFAULT: '0 2px 8px -1px rgb(15 17 23 / 0.06), 0 4px 16px -4px rgb(15 17 23 / 0.05)',
        'md': '0 4px 20px -2px rgb(15 17 23 / 0.08), 0 8px 32px -6px rgb(15 17 23 / 0.06)',
        'lg': '0 8px 40px -4px rgb(15 17 23 / 0.10), 0 16px 64px -8px rgb(15 17 23 / 0.08)',
        'xl': '0 16px 80px -8px rgb(15 17 23 / 0.12), 0 32px 128px -16px rgb(15 17 23 / 0.10)',
        '2xl': '0 32px 128px -16px rgb(15 17 23 / 0.16)',
        'inner': 'inset 0 2px 4px 0 rgb(15 17 23 / 0.04)',
        'glow': '0 0 0 3px rgb(99 86 247 / 0.12), 0 4px 24px -4px rgb(99 86 247 / 0.24)',
        'glow-lg': '0 0 0 4px rgb(99 86 247 / 0.10), 0 8px 48px -4px rgb(99 86 247 / 0.30)',
        'glow-danger': '0 0 0 3px rgb(244 63 94 / 0.12)',
        'glow-success': '0 0 0 3px rgb(16 185 129 / 0.12)',
        'glow-gold': '0 0 0 3px rgb(249 144 7 / 0.12), 0 4px 24px -4px rgb(249 144 7 / 0.20)',
        'card': '0 1px 3px 0 rgb(15 17 23 / 0.04), 0 1px 2px -1px rgb(15 17 23 / 0.03)',
        'card-hover': '0 4px 24px -2px rgb(15 17 23 / 0.08), 0 2px 8px -1px rgb(15 17 23 / 0.04)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 .5H40' fill='none' stroke='%23e2e8f0' stroke-width='0.5'/%3E%3Cpath d='M.5 0V40' fill='none' stroke='%23e2e8f0' stroke-width='0.5'/%3E%3C/svg%3E\")",
        'grid-dark': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 .5H40' fill='none' stroke='%23ffffff' stroke-opacity='0.04' stroke-width='0.5'/%3E%3Cpath d='M.5 0V40' fill='none' stroke='%23ffffff' stroke-opacity='0.04' stroke-width='0.5'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
