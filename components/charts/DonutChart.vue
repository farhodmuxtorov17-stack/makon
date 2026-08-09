<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :viewBox="`0 0 ${size} ${size}`" class="w-full h-full -rotate-90">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        stroke="#f1f5f9"
        :stroke-width="strokeWidth"
      />
      <circle
        v-for="(seg, i) in computedSegments"
        :key="i"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="seg.color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="`${seg.arc} ${circumference - seg.arc}`"
        :stroke-dashoffset="seg.offset"
        stroke-linecap="round"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <p class="text-2xl font-bold text-neutral-900 font-display">{{ total }}</p>
      <p class="text-xs text-neutral-500">jami</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    segments: { label: string; value: number; color: string }[]
    size?: number
  }>(),
  { size: 160 }
)

const strokeWidth = 18
const radius = computed(() => (props.size - strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const total = computed(() => props.segments.reduce((s, seg) => s + seg.value, 0))

const computedSegments = computed(() => {
  let offset = 0
  return props.segments.map((seg) => {
    const ratio = total.value > 0 ? seg.value / total.value : 0
    const arc = ratio * circumference.value
    const result = { ...seg, arc, offset: -offset }
    offset += arc
    return result
  })
})
</script>
