<template>
  <svg viewBox="0 0 120 120" class="donut">
    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="16" />
    <circle
      v-for="(seg, i) in segments" :key="i"
      cx="60" cy="60" r="50" fill="none"
      :stroke="seg.color" stroke-width="16"
      :stroke-dasharray="`${seg.length} ${circumference - seg.length}`"
      :stroke-dashoffset="seg.offset"
      stroke-linecap="round"
      transform="rotate(-90 60 60)"
      class="donut__seg"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  values: { value: number; color: string }[]
}>()

const circumference = 2 * Math.PI * 50

const segments = computed(() => {
  const total = props.values.reduce((s, v) => s + v.value, 0) || 1
  let cursor = 0
  return props.values.map(v => {
    const length = (v.value / total) * circumference
    const offset = -cursor
    cursor += length
    return { length, offset, color: v.color }
  })
})
</script>

<style scoped>
.donut { width: 100%; height: 100%; }
.donut__seg { transition: stroke-dasharray 0.6s ease; }
</style>
