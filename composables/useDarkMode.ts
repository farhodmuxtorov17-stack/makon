const DARK_KEY = 'makon-dark'
const isDark = ref(false)

export function useDarkMode() {
  if (import.meta.client) {
    const stored = localStorage.getItem(DARK_KEY)
    if (stored === 'true' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true
    }
    watchEffect(() => {
      document.documentElement.classList.toggle('dark', isDark.value)
      localStorage.setItem(DARK_KEY, String(isDark.value))
    })
  }
  return {
    isDark,
    toggle: () => isDark.value = !isDark.value,
  }
}
