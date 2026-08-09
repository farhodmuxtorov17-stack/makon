<template>
  <div class="p-6">
    <div class="text-xs text-neutral-400 font-mono mb-4">
      {{ `data: ${JSON.stringify(props.data).slice(0, 50)}` }}
    </div>
    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full">
      <defs>
        <linearGradient :id="`${gradId}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
        </linearGradient>
      </defs>
      <!-- Grid lines -->
      <line
        v-for="i in 5"
        :key="'grid-' + i"
        :x1="padding"
        :y1="padding + ((height - padding * 2) / 4) * (i - 1)"
        :x2="width - padding"
        :y2="padding + ((height - padding * 2) / 4) * (i - 1)"
        stroke="#f1f5f9"
        stroke-width="1"
      />
      <!-- Y labels -->
      <text
        v-for="(label, i) in yLabels"
        :key="'y-' + i"
        :x="padding - 8"
        :y="padding + ((height - padding * 2) / 4) * i + 4"
        text-anchor="end"
        class="text-[10px] fill-neutral-400 font-mono"
      >
        {{ label }}
      </text>
      <!-- X labels -->
      <text
        v-for="(d, i) in data"
        :key="'x-' + i"
        :x="xPos(i)"
        :y="height - 8"
        text-anchor="middle"
        class="text-[10px] fill-neutral-400"
      >
        {{ d.month }}
      </text>
      <!-- Area -->
      <path :d="areaPath" :fill="`url(#${gradId})`" />
      <!-- Line -->
      <path
        :d="linePath"
        fill="none"
        stroke="#6366f1"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <!-- Dots -->
      <circle
        v-for="(d, i) in data"
        :key="'dot-' + i"
        :cx="xPos(i)"
        :cy="yPos(d.value)"
        r="3"
        fill="#6366f1"
        class="transition-all hover:r-5"
      />
      <!-- Values on hover -->
      <text
        v-for="(d, i) in data"
        :key="'val-' + i"
        :x="xPos(i)"
        :y="yPos(d.value) - 8"
        text-anchor="middle"
        class="text-[9px] fill-neutral-600 font-mono opacity-0 hover:opacity-100"
      >
        {{ formatShort(d.value) }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ data: { month: string; value: number }[] }>()

const width = 600
const height = 240
const padding = 40
const gradId = `grad-${Math.random().toString(36).slice(2, 8)}`

const maxVal = computed(() => Math.max(...props.data.map((d) => d.value)) * 1.1)
const minVal = computed(() => Math.min(...props.data.map((d) => d.value)) * 0.9)

const xStep = computed(() => (width - padding * 2) / Math.max(props.data.length - 1, 1))

function xPos(i: number) {
  return padding + xStep.value * i
}
function yPos(val: number) {
  const range = maxVal.value - minVal.value || 1
  return padding + (1 - (val - minVal.value) / range) * (height - padding * 2)
}

const linePath = computed(() =>
  props.data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xPos(i)} ${yPos(d.value)}`).join(' ')
)

const areaPath = computed(
  () =>
    `${linePath.value} L ${xPos(props.data.length - 1)} ${height - padding} L ${xPos(0)} ${height - padding} Z`
)

const yLabels = computed(() => {
  const range = maxVal.value - minVal.value || 1
  return [
    maxVal.value,
    maxVal.value - range * 0.25,
    maxVal.value - range * 0.5,
    maxVal.value - range * 0.75,
    minVal.value,
  ].map((v) => formatShort(v))
})

function formatShort(v: number): string {
  if (v >= 1000000000) return `${(v / 1000000000).toFixed(1)} mlrd`
  if (v >= 1000000) return `${(v / 1000000).toFixed(0)} mln`
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`
  return String(v)
}
</script>
