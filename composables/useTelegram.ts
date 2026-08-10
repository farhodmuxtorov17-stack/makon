/**
 * Telegram Mini App composable
 * Detects Telegram WebApp environment and provides safe area, theme, and navigation utilities.
 */

export function useTelegram() {
  const isTelegram = ref(false)
  const platform = ref<'ios' | 'android' | 'desktop' | 'web'>('web')
  const themeParams = ref<Record<string, string>>({})
  const safeArea = reactive({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  })
  const viewport = reactive({
    height: 0,
    width: 0,
    isExpanded: false,
    stableHeight: 0,
  })

  function init() {
    if (!import.meta.client) return

    const tg = (window as any).Telegram?.WebApp
    if (!tg) return

    isTelegram.value = true
    platform.value = tg.platform || 'web'
    themeParams.value = tg.themeParams || {}
    viewport.height = tg.viewportHeight || window.innerHeight
    viewport.width = tg.viewportWidth || window.innerWidth
    viewport.isExpanded = tg.isExpanded || false
    viewport.stableHeight = tg.viewportStableHeight || tg.viewportHeight || window.innerHeight

    // Safe area insets
    const safe = (tg.safeAreaInset || {})
    safeArea.top = safe.top || 0
    safeArea.bottom = safe.bottom || 0
    safeArea.left = safe.left || 0
    safeArea.right = safe.right || 0

    // Signal ready
    tg.ready()
    tg.expand()

    // Listen for viewport changes
    tg.onEvent('viewportChanged', (event: any) => {
      viewport.height = event.height
      viewport.width = event.width
      viewport.isExpanded = event.isExpanded
      viewport.stableHeight = event.stableHeight
    })
  }

  function hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.HapticFeedback) return
    tg.HapticFeedback.impactOccurred(type)
  }

  function hapticNotify(type: 'success' | 'warning' | 'error') {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.HapticFeedback) return
    tg.HapticFeedback.notificationOccurred(type)
  }

  function setBackButton(visible: boolean) {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.BackButton) return
    if (visible) {
      tg.BackButton.show()
    } else {
      tg.BackButton.hide()
    }
  }

  function onBackButton(callback: () => void) {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.BackButton) return
    tg.BackButton.onClick(callback)
  }

  function offBackButton(callback: () => void) {
    const tg = (window as any).Telegram?.WebApp
    if (!tg?.BackButton) return
    tg.BackButton.offClick(callback)
  }

  function closeApp() {
    const tg = (window as any).Telegram?.WebApp
    if (tg) tg.close()
  }

  function setHeaderColor(color: string) {
    const tg = (window as any).Telegram?.WebApp
    if (tg?.setHeaderColor) tg.setHeaderColor(color)
  }

  function setBgColor(color: string) {
    const tg = (window as any).Telegram?.WebApp
    if (tg?.setBackgroundColor) tg.setBackgroundColor(color)
  }

  return {
    isTelegram,
    platform,
    themeParams,
    safeArea,
    viewport,
    init,
    hapticFeedback,
    hapticNotify,
    setBackButton,
    onBackButton,
    offBackButton,
    closeApp,
    setHeaderColor,
    setBgColor,
  }
}
