<template>
  <div class="kpi-scene-3d" :style="{ width: size + 'px', height: size + 'px' }">
    <svg viewBox="0 0 64 64" :width="size" :height="size" style="overflow: visible">
      <defs>
        <linearGradient :id="`f-${type}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="c.frontTop" />
          <stop offset="100%" :stop-color="c.frontBottom" />
        </linearGradient>
        <linearGradient :id="`s-${type}`" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" :stop-color="c.sideTop" />
          <stop offset="100%" :stop-color="c.sideBottom" />
        </linearGradient>
        <linearGradient :id="`t-${type}`" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" :stop-color="c.topStart" />
          <stop offset="100%" :stop-color="c.topEnd" />
        </linearGradient>
        <radialGradient :id="`coin-${type}`" cx="0.35" cy="0.35" r="0.65">
          <stop offset="0%" stop-color="#fef9c3" />
          <stop offset="40%" stop-color="#facc15" />
          <stop offset="100%" stop-color="#a16207" />
        </radialGradient>
      </defs>

      <!-- Ground shadow -->
      <ellipse cx="32" cy="55" rx="20" ry="3" fill="rgba(0,0,0,0.12)" />

      <!-- Extra building behind (buildings type) -->
      <g v-if="type === 'buildings'">
        <rect x="44" y="26" width="12" height="26" :fill="`url(#s-${type})`" rx="1" />
        <path d="M 44 26 L 48 22 L 60 22 L 56 26 Z" :fill="`url(#t-${type})`" />
        <path d="M 56 26 L 60 22 L 60 48 L 56 52 Z" :fill="c.sideBottom" />
        <rect v-for="(w, i) in extraWindows" :key="'e'+i" :x="w.x" :y="w.y" width="3" height="4" rx="0.5" :fill="w.lit ? c.windowLit : 'rgba(0,0,0,0.25)'" />
      </g>

      <!-- Main building -->
      <g class="bld">
        <!-- Side face -->
        <path d="M 42 18 L 50 12 L 50 46 L 42 52 Z" :fill="`url(#s-${type})`" />
        <!-- Top face -->
        <path d="M 14 18 L 22 12 L 50 12 L 42 18 Z" :fill="`url(#t-${type})`" />
        <!-- Front face -->
        <rect x="14" y="18" width="28" height="34" :fill="`url(#f-${type})`" rx="1.5" />
        <!-- Windows -->
        <g class="wins">
          <rect v-for="(w, i) in winList" :key="i"
            :x="w.x" :y="w.y" width="4" height="5" rx="0.5"
            :fill="w.lit ? c.windowLit : 'rgba(0,0,0,0.25)'"
            :class="{ 'win-lit': w.lit }" :style="{ animationDelay: (i * 0.3) + 's' }" />
        </g>
      </g>

      <!-- Revenue: coins falling -->
      <g v-if="type === 'revenue'">
        <circle cx="49" cy="12" r="2.8" :fill="`url(#coin-${type})`" class="coin c1" />
        <circle cx="55" cy="8" r="2.3" :fill="`url(#coin-${type})`" class="coin c2" />
        <circle cx="52" cy="12" r="2.5" :fill="`url(#coin-${type})`" class="coin c3" />
        <circle cx="47" cy="8" r="2" :fill="`url(#coin-${type})`" class="coin c4" />
        <circle cx="56" cy="14" r="2" :fill="`url(#coin-${type})`" class="coin c5" />
      </g>

      <!-- Overdue: warning pulse -->
      <g v-if="type === 'overdue'">
        <circle cx="32" cy="7" r="4.5" :fill="c.accent" class="warn-pulse" />
        <rect x="31" y="4.5" width="2" height="4" rx="0.5" fill="white" />
        <circle cx="32" cy="10" r="0.8" fill="white" />
      </g>

      <!-- Applications: floating document -->
      <g v-if="type === 'applications'" class="doc-float">
        <rect x="42" y="3" width="10" height="12" rx="1" fill="white" :stroke="c.accent" stroke-width="0.6" />
        <line x1="44" y1="6" x2="50" y2="6" :stroke="c.accent" stroke-width="0.5" />
        <line x1="44" y1="8" x2="50" y2="8" :stroke="c.accent" stroke-width="0.5" />
        <line x1="44" y1="10" x2="48" y2="10" :stroke="c.accent" stroke-width="0.5" />
        <circle cx="49" cy="14" r="2.5" :fill="c.accent" class="doc-badge" />
        <path d="M 47.5 14 L 48.5 15 L 50.5 13" stroke="white" stroke-width="0.8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>

      <!-- Occupancy: green checkmark badge -->
      <g v-if="type === 'occupancy'">
        <circle cx="44" cy="13" r="5" :fill="c.accent" class="occ-badge" />
        <path d="M 41.5 13 L 43.5 15 L 47 11" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>

      <!-- Paid: gold seal -->
      <g v-if="type === 'paid'">
        <circle cx="44" cy="13" r="5" fill="#f59e0b" class="occ-badge" />
        <path d="M 41.5 13 L 43.5 15 L 47 11" stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </g>

      <!-- Inventory: floating package -->
      <g v-if="type === 'inventory'" class="pkg-float">
        <path d="M 44 5 L 50 2 L 56 5 L 50 8 Z" fill="#fbbf24" />
        <path d="M 44 5 L 44 13 L 50 16 L 50 8 Z" fill="#d97706" />
        <path d="M 56 5 L 56 13 L 50 16 L 50 8 Z" fill="#b45309" />
        <line x1="47" y1="3.5" x2="47" y2="11.5" stroke="#92400e" stroke-width="0.4" />
        <line x1="53" y1="3.5" x2="53" y2="11.5" stroke="#92400e" stroke-width="0.4" />
      </g>

      <!-- Units: for rent sign -->
      <g v-if="type === 'units'">
        <rect x="38" y="8" width="8" height="6" rx="0.5" fill="white" :stroke="c.accent" stroke-width="0.4" class="sign-float" />
        <text x="42" y="12.5" text-anchor="middle" font-size="3" :fill="c.accent" font-weight="bold">FOR</text>
      </g>

      <!-- Signing: pen writing on document -->
      <g v-if="type === 'signing'" class="sign-anim">
        <rect x="40" y="4" width="11" height="13" rx="1" fill="white" :stroke="c.accent" stroke-width="0.5" />
        <line x1="42" y1="7" x2="49" y2="7" :stroke="c.accent" stroke-width="0.4" />
        <line x1="42" y1="9" x2="49" y2="9" :stroke="c.accent" stroke-width="0.4" />
        <line x1="42" y1="11" x2="47" y2="11" :stroke="c.accent" stroke-width="0.4" />
        <path d="M 50 2 L 56 8 L 54 10 L 48 4 Z" fill="var(--accent)" />
        <path d="M 54 10 L 56 8 L 57 9 L 55 11 Z" fill="var(--accent-hover)" />
      </g>

      <!-- Contract: ERI shield with lock -->
      <g v-if="type === 'contract'" class="eri-shield">
        <path d="M 44 3 L 54 3 L 54 11 Q 54 15 49 17 Q 44 15 44 11 Z" fill="var(--accent)" />
        <path d="M 47 7 L 51 7 L 51 10 Q 51 12 49 13 Q 47 12 47 10 Z" fill="none" stroke="white" stroke-width="0.8" />
        <rect x="48" y="8" width="2" height="2" fill="white" rx="0.3" />
        <circle cx="49" cy="11" r="1" fill="white" />
      </g>

      <!-- Service: wrench/gear -->
      <g v-if="type === 'service'" class="gear-spin">
        <circle cx="48" cy="9" r="4" fill="none" :stroke="c.accent" stroke-width="1" />
        <circle cx="48" cy="9" r="1.5" :fill="c.accent" />
        <g v-for="i in 6" :key="'t'+i">
          <rect :x="47.4" :y="3" width="1.2" height="2.5" :fill="c.accent" :transform="`rotate(${i * 60}, 48, 9)`" />
        </g>
      </g>

      <!-- Debt: falling coins with red warning -->
      <g v-if="type === 'debt'">
        <circle cx="49" cy="10" r="2.5" fill="#f43f5e" class="warn-pulse" />
        <text x="49" y="11.5" text-anchor="middle" font-size="3.5" fill="white" font-weight="bold">!</text>
        <circle cx="55" cy="6" r="2" fill="#fb7185" class="coin c3" opacity="0.6" />
        <circle cx="45" cy="6" r="1.5" fill="#fda4af" class="coin c1" opacity="0.5" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: 'revenue' | 'occupancy' | 'buildings' | 'units' | 'overdue' | 'applications' | 'paid' | 'inventory' | 'signing' | 'contract' | 'service' | 'debt'
  size?: number
}>(), { size: 56 })

const palettes: Record<string, any> = {
  revenue: {
    frontTop: 'var(--accent)', frontBottom: 'var(--accent-hover)',
    sideTop: 'var(--accent)', sideBottom: '#3730a3',
    topStart: '#a5b4fc', topEnd: 'var(--accent)',
    accent: '#f59e0b', windowLit: '#fde68a',
  },
  occupancy: {
    frontTop: '#34d399', frontBottom: '#059669',
    sideTop: '#10b981', sideBottom: '#047857',
    topStart: '#6ee7b7', topEnd: '#34d399',
    accent: '#10b981', windowLit: '#d1fae5',
  },
  buildings: {
    frontTop: '#60a5fa', frontBottom: '#2563eb',
    sideTop: '#3b82f6', sideBottom: '#1d4ed8',
    topStart: '#93c5fd', topEnd: '#60a5fa',
    accent: '#3b82f6', windowLit: '#dbeafe',
  },
  units: {
    frontTop: '#a5b4fc', frontBottom: 'var(--accent-hover)',
    sideTop: 'var(--accent)', sideBottom: '#3730a3',
    topStart: '#c7d2fe', topEnd: '#a5b4fc',
    accent: 'var(--accent)', windowLit: '#e0e7ff',
  },
  overdue: {
    frontTop: '#f87171', frontBottom: '#dc2626',
    sideTop: '#ef4444', sideBottom: '#991b1b',
    topStart: '#fca5a5', topEnd: '#f87171',
    accent: '#ef4444', windowLit: '#fecaca',
  },
  applications: {
    frontTop: '#c084fc', frontBottom: '#7c3aed',
    sideTop: '#a78bfa', sideBottom: '#5b21b6',
    topStart: '#d8b4fe', topEnd: '#c084fc',
    accent: 'var(--accent)', windowLit: '#ede9fe',
  },
  paid: {
    frontTop: '#34d399', frontBottom: '#059669',
    sideTop: '#10b981', sideBottom: '#047857',
    topStart: '#6ee7b7', topEnd: '#34d399',
    accent: '#10b981', windowLit: '#d1fae5',
  },
  inventory: {
    frontTop: '#fbbf24', frontBottom: '#d97706',
    sideTop: '#f59e0b', sideBottom: '#b45309',
    topStart: '#fcd34d', topEnd: '#fbbf24',
    accent: '#f59e0b', windowLit: '#fef3c7',
  },
  signing: {
    frontTop: '#fbbf24', frontBottom: '#d97706',
    sideTop: '#f59e0b', sideBottom: '#b45309',
    topStart: '#fcd34d', topEnd: '#fbbf24',
    accent: '#f59e0b', windowLit: '#fef3c7',
  },
  contract: {
    frontTop: '#c084fc', frontBottom: '#7c3aed',
    sideTop: '#a78bfa', sideBottom: '#5b21b6',
    topStart: '#d8b4fe', topEnd: '#c084fc',
    accent: 'var(--accent)', windowLit: '#ede9fe',
  },
  service: {
    frontTop: '#22d3ee', frontBottom: '#0891b2',
    sideTop: '#06b6d4', sideBottom: '#0e7490',
    topStart: '#67e8f9', topEnd: '#22d3ee',
    accent: '#06b6d4', windowLit: '#cffafe',
  },
  debt: {
    frontTop: '#fb7185', frontBottom: '#e11d48',
    sideTop: '#f43f5e', sideBottom: '#be123c',
    topStart: '#fda4af', topEnd: '#fb7185',
    accent: '#f43f5e', windowLit: '#ffe4e6',
  },
}

const c = computed(() => palettes[props.type])

const allWins = [
  { x: 17, y: 22 }, { x: 25, y: 22 }, { x: 33, y: 22 },
  { x: 17, y: 30 }, { x: 25, y: 30 }, { x: 33, y: 30 },
  { x: 17, y: 38 }, { x: 25, y: 38 }, { x: 33, y: 38 },
  { x: 17, y: 46 }, { x: 25, y: 46 }, { x: 33, y: 46 },
]

const litPatterns: Record<string, number[]> = {
  revenue: [1,0,1, 1,1,0, 0,1,1, 1,0,1],
  occupancy: [1,1,1, 1,0,1, 1,1,1, 1,1,1],
  buildings: [1,1,0, 0,1,1, 1,0,1, 0,1,1],
  units: [1,0,1, 1,1,1, 0,1,0, 1,1,1],
  overdue: [0,1,0, 0,0,1, 1,0,0, 0,1,0],
  applications: [1,0,0, 0,1,0, 0,0,1, 1,0,0],
  paid: [1,1,1, 1,1,1, 1,1,1, 1,1,1],
  inventory: [1,1,0, 1,1,1, 0,1,1, 1,0,1],
  signing: [1,0,1, 0,1,1, 1,0,1, 0,1,0],
  contract: [1,1,0, 0,1,1, 1,0,1, 1,1,0],
  service: [0,1,1, 1,0,1, 1,1,0, 0,1,1],
  debt: [0,1,0, 1,0,0, 0,1,0, 1,0,0],
}

const winList = computed(() => {
  const pattern = litPatterns[props.type] || []
  return allWins.map((w, i) => ({ ...w, lit: pattern[i] === 1 }))
})

const extraWins = [
  { x: 47, y: 30 }, { x: 52, y: 30 },
  { x: 47, y: 36 }, { x: 52, y: 36 },
  { x: 47, y: 42 }, { x: 52, y: 42 },
]
const extraWindows = computed(() => {
  const pattern = [1,0, 0,1, 1,1]
  return extraWins.map((w, i) => ({ ...w, lit: pattern[i] === 1 }))
})
</script>

<style scoped>
.kpi-scene-3d { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

/* All animations removed for cleaner, professional look */
.coin { opacity: 0.8; }
.warn-pulse { opacity: 0.9; }
.doc-float, .pkg-float, .sign-float { opacity: 0.9; }
.doc-badge, .occ-badge { opacity: 0.95; }
.win-lit { opacity: 0.9; }

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>
