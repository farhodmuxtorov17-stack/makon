<template>
  <div
    :class="[
      'card p-5 hover:shadow-md transition-shadow cursor-pointer group',
      active ? '!border-primary-300 ring-2 ring-primary-100' : '',
    ]"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between mb-3">
      <div
        :class="[
          'w-11 h-11 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110',
          colorClass,
        ]"
      >
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
      <slot name="action" />
    </div>
    <h3 class="font-semibold text-neutral-900 text-sm">{{ title }}</h3>
    <p v-if="description" class="text-xs text-neutral-500 mt-1">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    icon?: string
    color?: string
    active?: boolean
  }>(),
  {
    color: 'primary',
    active: false,
  }
)

defineEmits(['click'])

const iconPath = computed(
  () =>
    props.icon ||
    'M4 8V4m0 0H0m4 0h4M4 4v8a2 2 0 002 2h12a2 2 0 002-2V4M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4'
)

const colors: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-primary-50', text: 'text-primary-600' },
  success: { bg: 'bg-success-50', text: 'text-success-600' },
  warning: { bg: 'bg-warning-50', text: 'text-warning-600' },
  danger: { bg: 'bg-danger-50', text: 'text-danger-600' },
  info: { bg: 'bg-info-50', text: 'text-info-600' },
  accent: { bg: 'bg-accent-50', text: 'text-accent-600' },
}

const colorClass = computed(() => colors[props.color]?.bg || 'bg-neutral-100')
const iconColorClass = computed(() => colors[props.color]?.text || 'text-neutral-600')
</script>
