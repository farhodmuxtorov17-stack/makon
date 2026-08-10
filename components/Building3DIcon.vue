<template>
  <component :is="iconType" :size="size" :stroke-width="1.5" class="text-ink-400" />
</template>

<script setup lang="ts">
import { Building, Building2, Hotel } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  type?: string
  color?: string
  size?: number
}>(), {
  type: 'tower',
  color: '#6366f1',
  size: 48,
})

const iconType = computed(() => {
  const map: Record<string, any> = { tower: Building2, block: Building, complex: Hotel }
  return map[props.type] || Building2
})
</script>
