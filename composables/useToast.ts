import { ref } from 'vue'

interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
}

const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  function show(type: Toast['type'], title: string, message?: string) {
    const id = nextId++
    toasts.value.push({ id, type, title, message })
    setTimeout(() => dismiss(id), 4000)
  }

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    success: (t: string, m?: string) => show('success', t, m),
    error: (t: string, m?: string) => show('error', t, m),
    info: (t: string, m?: string) => show('info', t, m),
    warning: (t: string, m?: string) => show('warning', t, m),
    dismiss,
  }
}
