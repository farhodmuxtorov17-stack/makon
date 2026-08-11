<template>
  <div class="kpi-card group" :class="{ 'kpi-card--clickable': to }" @click="handleClick">
    <div class="flex items-start justify-between mb-3">
      <div class="kpi-icon" :style="{ background: iconBg, color: iconColor }">
        <component :is="icon" :size="18" :stroke-width="2" />
      </div>
      <div v-if="trend !== undefined" class="kpi-trend" :class="trend >= 0 ? 'is-up' : 'is-down'">
        <component :is="trend >= 0 ? ArrowUpRight : ArrowDownRight" :size="11" :stroke-width="2.5" />
        {{ Math.abs(trend) }}%
      </div>
      <ArrowRight v-if="to" :size="14" class="kpi-arrow" :style="{ color: iconColor }" />
    </div>
    <div class="kpi-value">{{ value }}</div>
    <div class="kpi-label">{{ label }}</div>
    <div v-if="sub" class="kpi-sub">{{ sub }}</div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  icon: any
  label: string
  value: string | number
  trend?: number
  sub?: string
  iconBg?: string
  iconColor?: string
  to?: string
}>()

function handleClick() {
  if (props.to) navigateTo(props.to)
}
</script>

<style scoped>
.kpi-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 20px 22px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.kpi-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.kpi-card:hover::after { opacity: 1; }
:global(.dark) .kpi-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.06);
}
.kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.06);
  border-color: rgba(99,102,241,0.15);
}
:global(.dark) .kpi-card:hover {
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
  border-color: rgba(99,102,241,0.15);
}

.kpi-card--clickable {
  cursor: pointer;
}
.kpi-card--clickable:hover {
  border-color: rgba(99,102,241,0.25);
  box-shadow: 0 12px 32px rgba(99,102,241,0.1);
  transform: translateY(-4px);
}
.kpi-arrow {
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  transform: translateX(-4px);
}
.kpi-card--clickable:hover .kpi-arrow {
  opacity: 1;
  transform: translateX(0);
}

.kpi-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s;
}
.kpi-card:hover .kpi-icon { transform: scale(1.08); }

.kpi-trend {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: -0.01em;
}
.kpi-trend.is-up { color: #059669; background: rgba(16,185,129,0.08); }
.kpi-trend.is-down { color: #dc2626; background: rgba(239,68,68,0.08); }

.kpi-value {
  font-size: 26px;
  font-weight: 800;
  color: #18181b;
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-feature-settings: 'tnum';
  transition: color 0.3s;
}
:global(.dark) .kpi-value { color: #fafafa; }

.kpi-label {
  font-size: 12px;
  font-weight: 500;
  color: #71717a;
  margin-top: 4px;
  letter-spacing: -0.005em;
}
.kpi-sub {
  font-size: 11px;
  color: #a1a1aa;
  margin-top: 2px;
}
</style>
