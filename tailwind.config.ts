import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDFA', 100: '#CCFBF1', 200: '#99F6E4', 300: '#5EEAD4',
          400: '#2DD4BF', 500: '#14B8A6', 600: '#0D9488', 700: '#0F766E',
          800: '#115E56', 900: '#134E4A', 950: '#042F2E',
        },
        ink: {
          50: '#FAFAF9', 100: '#F5F5F4', 200: '#E7E5E4', 300: '#D6D3D1',
          400: '#A8A29E', 500: '#78716C', 600: '#57534E', 700: '#44403C',
          800: '#292524', 900: '#1C1917', 950: '#0C0A09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'xs': ['11px', '16px'],
        'sm': ['13px', '20px'],
        'base': ['14px', '22px'],
        'lg': ['15px', '24px'],
        'xl': ['17px', '26px'],
        '2xl': ['20px', '28px'],
        '3xl': ['26px', '32px'],
      },
      borderRadius: {
        'xl': '10px',
        '2xl': '14px',
        '3xl': '16px',
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0,0,0,0.03)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.04)',
        'drawer': '0 -12px 40px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in': 'slide-in 0.25s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
