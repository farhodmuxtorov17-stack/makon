<template>
  <svg :viewBox="`0 0 ${width} ${height}`" class="sparkline" preserveAspectRatio="none">
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="color" stop-opacity="0.35" />
        <stop offset="100%" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="areaPath" :fill="`url(#${gradId})`" stroke="none" />
    <path :d="linePath" fill="none" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: number[]
  color?: string
  width?: number
  height?: number
}>()

const width = props.width || 100
const height = props.height || 32
const color = props.color || '#0f766e'
const gradId = 'spark-' + Math.random().toString(36).slice(2, 9)

const points = computed(() => {
  const data = props.data
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  return data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - 4) - 2
    return [x, y]
  })
})

const linePath = computed(() => {
  return points.value.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ')
})

const areaPath = computed(() => {
  const pts = points.value
  if (!pts.length) return ''
  const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ')
  return `${line} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`
})
</script>

<style scoped>
.sparkline { width: 100%; height: 100%; display: block; }
</style>
