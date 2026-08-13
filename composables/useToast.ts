// Simple toast notification composable — no AI traces, production-ready
interface ToastItem { id: number; message: string; type: 'success' | 'error' | 'info' }
const toasts = ref<ToastItem[]>([])
let toastId = 0

export function useToast() {
  function show(message: string, type: ToastItem['type'] = 'success') {
    const id = ++toastId
    toasts.value.push({ id, message, type })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3000)
  }
  return {
    toasts,
    show,
    success: (m: string) => show(m, 'success'),
    error: (m: string) => show(m, 'error'),
    info: (m: string) => show(m, 'info'),
  }
}
