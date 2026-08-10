<template>
  <span v-if="dot" class="status-dot" :class="variantClass">
    {{ label }}
  </span>
  <span v-else class="badge" :class="badgeClass">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string
  variant: string
  label: string
  dot?: boolean
}>()

const variantClass = computed(() => {
  const map: Record<string, string> = {
    success: 'status-success',
    warning: 'status-warning',
    danger: 'status-danger',
    info: 'status-info',
    neutral: 'status-neutral',
  }
  return map[props.variant] || 'status-neutral'
})

const badgeClass = computed(() => {
  const map: Record<string, string> = {
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    neutral: 'badge-neutral',
  }
  return map[props.variant] || 'badge-neutral'
})
</script>
