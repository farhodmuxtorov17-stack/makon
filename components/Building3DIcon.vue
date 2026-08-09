<template>
  <div class="w-full h-full flex items-center justify-center" :style="{ '--bld-color': color }">
    <svg :viewBox="`0 0 ${size} ${size}`" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient :id="`front-${id}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="bldColor" stop-opacity="0.9" />
          <stop offset="100%" :stop-color="darkColor" stop-opacity="1" />
        </linearGradient>
        <linearGradient :id="`side-${id}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="darkColor" stop-opacity="0.85" />
          <stop offset="100%" :stop-color="darkColor" stop-opacity="1" />
        </linearGradient>
        <linearGradient :id="`top-${id}`" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" :stop-color="lightColor" stop-opacity="1" />
          <stop offset="100%" :stop-color="bldColor" stop-opacity="1" />
        </linearGradient>
        <linearGradient :id="`win-${id}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffc94a" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#f99007" stop-opacity="0.6" />
        </linearGradient>
      </defs>

      <!-- Isometric base -->
      <ellipse :cx="size / 2" :cy="size * 0.85" :rx="size * 0.3" :ry="size * 0.06" fill="#000" opacity="0.1" />

      <!-- Building type: tower -->
      <template v-if="type === 'tower'">
        <!-- Side face -->
        <path :d="`M ${size * 0.55} ${size * 0.3} L ${size * 0.72} ${size * 0.22} L ${size * 0.72} ${size * 0.82} L ${size * 0.55} ${size * 0.9} Z`" :fill="`url(#side-${id})`" />
        <!-- Front face -->
        <path :d="`M ${size * 0.55} ${size * 0.3} L ${size * 0.38} ${size * 0.38} L ${size * 0.38} ${size * 0.98} L ${size * 0.55} ${size * 0.9} Z`" :fill="`url(#front-${id})`" />
        <!-- Top face -->
        <path :d="`M ${size * 0.55} ${size * 0.3} L ${size * 0.72} ${size * 0.22} L ${size * 0.55} ${size * 0.14} L ${size * 0.38} ${size * 0.22} L ${size * 0.55} ${size * 0.3} Z`" :fill="`url(#top-${id})`" />

        <!-- Windows front -->
        <g v-for="r in 5" :key="'fw' + r">
          <rect
            :x="size * 0.42" :y="size * (0.42 + r * 0.09)"
            :width="size * 0.06" :height="size * 0.05"
            :fill="`url(#win-${id})`" :opacity="windows[r - 1] ? 0.9 : 0.25" rx="1"
            transform="skewY(-22)"
          />
        </g>
        <!-- Windows side -->
        <g v-for="r in 5" :key="'sw' + r">
          <rect
            :x="size * 0.6" :y="size * (0.34 + r * 0.09)"
            :width="size * 0.06" :height="size * 0.05"
            :fill="`url(#win-${id})`" :opacity="windows[r + 4] ? 0.8 : 0.2" rx="1"
            transform="skewY(22)"
          />
        </g>
        <!-- Antenna -->
        <line :x1="size * 0.55" :y1="size * 0.14" :x2="size * 0.55" :y2="size * 0.04" :stroke="lightColor" stroke-width="1.5" />
        <circle :cx="size * 0.55" :cy="size * 0.04" r="2" fill="#ffc94a" />
      </template>

      <!-- Building type: block (wide) -->
      <template v-else-if="type === 'block'">
        <!-- Side face -->
        <path :d="`M ${size * 0.6} ${size * 0.38} L ${size * 0.75} ${size * 0.3} L ${size * 0.75} ${size * 0.82} L ${size * 0.6} ${size * 0.9} Z`" :fill="`url(#side-${id})`" />
        <!-- Front face -->
        <path :d="`M ${size * 0.6} ${size * 0.38} L ${size * 0.3} ${size * 0.46} L ${size * 0.3} ${size * 0.98} L ${size * 0.6} ${size * 0.9} Z`" :fill="`url(#front-${id})`" />
        <!-- Top face -->
        <path :d="`M ${size * 0.6} ${size * 0.38} L ${size * 0.75} ${size * 0.3} L ${size * 0.45} ${size * 0.22} L ${size * 0.3} ${size * 0.3} L ${size * 0.6} ${size * 0.38} Z`" :fill="`url(#top-${id})`" />

        <!-- Windows front -->
        <g v-for="r in 3" :key="'bfw' + r">
          <rect
            v-for="c in 3" :key="'bfw' + r + c"
            :x="size * (0.34 + c * 0.08)" :y="size * (0.5 + r * 0.12)"
            :width="size * 0.04" :height="size * 0.06"
            :fill="`url(#win-${id})`" :opacity="windows[(r - 1) * 3 + c - 1] ? 0.9 : 0.25" rx="1"
            transform="skewY(-22)"
          />
        </g>
        <!-- Windows side -->
        <g v-for="r in 3" :key="'bsw' + r">
          <rect
            v-for="c in 2" :key="'bsw' + r + c"
            :x="size * (0.63 + c * 0.06)" :y="size * (0.42 + r * 0.12)"
            :width="size * 0.04" :height="size * 0.06"
            :fill="`url(#win-${id})`" :opacity="windows[9 + (r - 1) * 2 + c - 1] ? 0.8 : 0.2" rx="1"
            transform="skewY(22)"
          />
        </g>
      </template>

      <!-- Building type: complex (two buildings) -->
      <template v-else>
        <!-- Smaller building behind -->
        <path :d="`M ${size * 0.65} ${size * 0.28} L ${size * 0.75} ${size * 0.22} L ${size * 0.75} ${size * 0.82} L ${size * 0.65} ${size * 0.88} Z`" :fill="`url(#side-${id})`" />
        <path :d="`M ${size * 0.65} ${size * 0.28} L ${size * 0.55} ${size * 0.34} L ${size * 0.55} ${size * 0.94} L ${size * 0.65} ${size * 0.88} Z`" :fill="`url(#front-${id})`" opacity="0.75" />

        <!-- Main building -->
        <path :d="`M ${size * 0.5} ${size * 0.36} L ${size * 0.65} ${size * 0.28} L ${size * 0.65} ${size * 0.82} L ${size * 0.5} ${size * 0.9} Z`" :fill="`url(#side-${id})`" />
        <path :d="`M ${size * 0.5} ${size * 0.36} L ${size * 0.3} ${size * 0.44} L ${size * 0.3} ${size * 0.98} L ${size * 0.5} ${size * 0.9} Z`" :fill="`url(#front-${id})`" />
        <path :d="`M ${size * 0.5} ${size * 0.36} L ${size * 0.65} ${size * 0.28} L ${size * 0.45} ${size * 0.2} L ${size * 0.3} ${size * 0.28} L ${size * 0.5} ${size * 0.36} Z`" :fill="`url(#top-${id})`" />

        <!-- Windows front -->
        <g v-for="r in 4" :key="'cw' + r">
          <rect
            v-for="c in 2" :key="'cw' + r + c"
            :x="size * (0.34 + c * 0.07)" :y="size * (0.5 + r * 0.1)"
            :width="size * 0.05" :height="size * 0.05"
            :fill="`url(#win-${id})`" :opacity="windows[(r - 1) * 2 + c - 1] ? 0.9 : 0.25" rx="1"
            transform="skewY(-22)"
          />
        </g>
      </template>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'tower' | 'block' | 'complex'
  color?: string
  size?: number
}>(), {
  type: 'tower',
  color: '#6356f7',
  size: 100,
})

const id = Math.random().toString(36).substring(7)

const colorMap: Record<string, { color: string; dark: string; light: string }> = {
  '#6356f7': { color: '#6356f7', dark: '#4334c0', light: '#9aa3ff' },
  '#10b981': { color: '#10b981', dark: '#047857', light: '#6ee7b7' },
  '#f99007': { color: '#f99007', dark: '#b74b05', light: '#ffc94a' },
  '#0ea5e9': { color: '#0ea5e9', dark: '#0369a1', light: '#7dd3fc' },
  '#f43f5e': { color: '#f43f5e', dark: '#be123c', light: '#fda4af' },
  '#8b5cf6': { color: '#8b5cf6', dark: '#6d28d9', light: '#c4b5fd' },
}

const colors = computed(() => colorMap[props.color] || colorMap['#6356f7'])
const bldColor = computed(() => colors.value.color)
const darkColor = computed(() => colors.value.dark)
const lightColor = computed(() => colors.value.light)

const windows = computed(() => {
  // Deterministic random windows based on id
  const seed = id.charCodeAt(0)
  return Array.from({ length: 20 }, (_, i) => (seed + i * 7) % 3 > 0)
})
</script>
