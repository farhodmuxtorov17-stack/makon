<template>
  <div class="card p-5">
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center gap-3">
        <div :class="['w-11 h-11 rounded-2xl flex items-center justify-center', colorClass]">
          <svg
            class="w-5 h-5"
            :class="iconColorClass"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
          </svg>
        </div>
        <div>
          <p class="text-xs font-medium text-neutral-500">{{ label }}</p>
          <p class="text-2xl font-bold text-neutral-900 font-display mt-0.5">{{ displayValue }}</p>
        </div>
      </div>
    </div>
    <div v-if="trend" class="flex items-center gap-1 text-xs">
      <svg
        :class="trend > 0 ? 'text-success-500' : 'text-danger-500'"
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          v-if="trend > 0"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <span :class="trend > 0 ? 'text-success-600' : 'text-danger-600'" class="font-semibold">{{ Math.abs(trend) }}%</span>
      <span class="text-neutral-400">vs oldingi oy</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '~/utils'

const props = withDefaults(
  defineProps<{
    label: string
    value: number | string
    type?: 'number' | 'currency' | 'percent'
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'accent'
    icon?: string
    trend?: number | null
  }>(),
  {
    type: 'number',
    color: 'primary',
    trend: null,
  }
)

const iconPath = computed(
  () =>
    props.icon ||
    'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
)

const displayValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  if (props.type === 'currency') return formatCurrency(props.value)
  if (props.type === 'percent') return `${props.value}%`
  return formatNumber(props.value)
})

const colors: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600' },
  success: { bg: 'bg-success-50', text: 'text-success-600' },
  warning: { bg: 'bg-warning-50', text: 'text-warning-600' },
  danger: { bg: 'bg-danger-50', text: 'text-danger-600' },
  info: { bg: 'bg-info-50', text: 'text-info-600' },
  neutral: { bg: 'bg-neutral-100', text: 'text-neutral-600' },
  accent: { bg: 'bg-accent-50', text: 'text-accent-600' },
}

const colorClass = computed(() => colors[props.color]?.bg || 'bg-neutral-100')
const iconColorClass = computed(() => colors[props.color]?.text || 'text-neutral-600')

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(Math.round(amount)) + " so'm"
}
</script>
