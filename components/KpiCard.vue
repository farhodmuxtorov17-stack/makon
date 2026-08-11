<template>
  <div class="kpi-card" :class="variant">
    <div class="kpi-card__top">
      <div class="kpi-card__icon" :style="{ background: iconBg, color: iconColor }">
        <component :is="icon" :size="20" />
      </div>
      <div v-if="trend !== undefined" class="kpi-card__trend" :class="trend >= 0 ? 'trend-up' : 'trend-down'">
        <component :is="trend >= 0 ? ArrowUpRight : ArrowDownRight" :size="13" />
        {{ Math.abs(trend) }}%
      </div>
    </div>
    <div class="kpi-card__value">{{ value }}</div>
    <div class="kpi-card__label">{{ label }}</div>
    <div v-if="sub" class="kpi-card__sub">{{ sub }}</div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, ArrowDownRight } from 'lucide-vue-next'

const props = defineProps<{
  icon: any
  label: string
  value: string | number
  trend?: number
  sub?: string
  variant?: string
  iconBg?: string
  iconColor?: string
}>()

const iconBg = props.iconBg || 'rgba(99,102,241,0.1)'
const iconColor = props.iconColor || '#6366f1'
</script>

<style scoped>
.kpi-card {
  background: white;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid rgba(0,0,0,0.06);
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}
.dark .kpi-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.kpi-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.06); transform: translateY(-1px); }
.kpi-card__top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.kpi-card__icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.kpi-card__trend { display: flex; align-items: center; gap: 2px; font-size: 12px; font-weight: 700; padding: 3px 8px; border-radius: 8px; }
.trend-up { color: #10b981; background: rgba(16,185,129,0.1); }
.trend-down { color: #ef4444; background: rgba(239,68,68,0.1); }
.kpi-card__value { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; line-height: 1.2; }
.dark .kpi-card__value { color: white; }
.kpi-card__label { font-size: 12px; color: #71717a; margin-top: 4px; }
.kpi-card__sub { font-size: 11px; color: #a1a1aa; margin-top: 2px; }
</style>
