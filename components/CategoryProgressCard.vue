<template>
  <div class="cpc">
    <div class="cpc__top">
      <span class="cpc__label">{{ label }}</span>
      <span class="cpc__trend" :class="trend >= 0 ? 'cpc__trend--up' : 'cpc__trend--down'">
        <ArrowUp v-if="trend >= 0" :size="10" />
        <ArrowDown v-else :size="10" />
        {{ Math.abs(trend) }}%
      </span>
    </div>
    <div class="cpc__body">
      <div class="cpc__ring">
        <svg viewBox="0 0 64 64" class="cpc__ring-svg">
          <circle cx="32" cy="32" r="27" class="cpc__ring-bg" />
          <circle
            cx="32" cy="32" r="27"
            class="cpc__ring-fg"
            :style="{ stroke: color, strokeDasharray: circumference, strokeDashoffset: offset }"
          />
        </svg>
        <div class="cpc__ring-icon" :style="{ color }">
          <component :is="icon" :size="18" />
        </div>
      </div>
      <div class="cpc__value" :style="{ color }">{{ value }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUp, ArrowDown } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number
  trend?: number
  color?: string
  icon?: any
}>()

const trend = computed(() => props.trend ?? 0)
const color = computed(() => props.color || 'var(--accent)')
const radius = 27
const circumference = 2 * Math.PI * radius
const offset = computed(() => circumference - (props.value / 100) * circumference)
</script>

<style scoped>
.cpc {
  background: var(--card-bg, #fff);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.25s;
}
.dark .cpc { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.cpc:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
.cpc__top { display: flex; align-items: center; justify-content: space-between; }
.cpc__label { font-size: 12px; font-weight: 600; color: #6b7280; }
.dark .cpc__label { color: #a1a1aa; }
.cpc__trend { display: flex; align-items: center; gap: 2px; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 6px; }
.cpc__trend--up { color: #10b981; background: rgba(16,185,129,0.1); }
.cpc__trend--down { color: #ef4444; background: rgba(239,68,68,0.1); }
.cpc__body { display: flex; align-items: center; gap: 14px; }
.cpc__ring { position: relative; width: 60px; height: 60px; flex-shrink: 0; }
.cpc__ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.cpc__ring-bg { fill: none; stroke: rgba(0,0,0,0.06); stroke-width: 5; }
.dark .cpc__ring-bg { stroke: rgba(255,255,255,0.08); }
.cpc__ring-fg { fill: none; stroke-width: 5; stroke-linecap: round; transition: stroke-dashoffset 0.6s ease; }
.cpc__ring-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
.cpc__value { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
</style>
