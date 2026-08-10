<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] space-y-2 w-80 max-w-[calc(100vw-2rem)]">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id"
          class="bg-white rounded-xl shadow-xl border p-4 flex items-start gap-3 cursor-pointer"
          :class="borderClass(t.type)"
          @click="dismiss(t.id)">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" :class="iconBg(t.type)">
            <CheckCircle2 v-if="t.type === 'success'" :size="18" :class="iconColor(t.type)" />
            <XCircle v-else-if="t.type === 'error'" :size="18" :class="iconColor(t.type)" />
            <Info v-else-if="t.type === 'info'" :size="18" :class="iconColor(t.type)" />
            <AlertTriangle v-else :size="18" :class="iconColor(t.type)" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm text-ink-900">{{ t.title }}</p>
            <p v-if="t.message" class="text-xs text-ink-500 mt-0.5">{{ t.message }}</p>
          </div>
          <X :size="16" class="text-ink-300 hover:text-ink-500 flex-shrink-0 mt-0.5" />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-vue-next'

const { toasts, dismiss } = useToast()

function borderClass(t: string) {
  return { success: 'border-emerald-200', error: 'border-rose-200', info: 'border-brand-200', warning: 'border-amber-200' }[t] || 'border-ink-200'
}
function iconBg(t: string) {
  return { success: 'bg-emerald-50', error: 'bg-rose-50', info: 'bg-brand-50', warning: 'bg-amber-50' }[t] || 'bg-ink-100'
}
function iconColor(t: string) {
  return { success: 'text-emerald-600', error: 'text-rose-600', info: 'text-brand-600', warning: 'text-amber-600' }[t] || 'text-ink-500'
}
</script>
