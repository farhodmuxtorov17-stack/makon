<template>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg" :class="colorClass">
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  label?: string
  dot?: boolean
}>()

const variantMap: Record<string, string> = {
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-rose-50 text-rose-700',
  info: 'bg-brand-50 text-brand-700',
  neutral: 'bg-ink-100 text-ink-600',
}

const dotMap: Record<string, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-brand-500',
  neutral: 'bg-ink-400',
}

const variant = computed(() => props.variant || 'neutral')
const colorClass = computed(() => variantMap[variant.value])
const dotClass = computed(() => dotMap[variant.value])
</script>
