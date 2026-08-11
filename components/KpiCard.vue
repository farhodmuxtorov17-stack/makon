<template>
  <div class="kpi-card group" :class="{ 'kpi-card--clickable': to }" @click="handleClick">
    <div class="flex items-start justify-between mb-3">
      <div class="kpi-icon" :style="{ background: iconBg, color: iconColor }">
        <component :is="icon" :size="18" :stroke-width="1.75" />
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
  background: var(--bg-card, #fff);
  border-radius: 14px;
  padding: 20px;
  border: 1px solid var(--border, rgba(0,0,0,0.07));
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.03));
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}
.kpi-card:hover {
  border-color: var(--border-strong, rgba(0,0,0,0.12));
  box-shadow: var(--shadow-md, 0 2px 8px rgba(0,0,0,0.04));
}
.kpi-card--clickable { cursor: pointer; }
.kpi-card--clickable:hover {
  transform: translateY(-1px);
}
.kpi-arrow {
  opacity: 0;
  transition: opacity 0.2s, transform 0.2s;
  transform: translateX(-4px);
}
.kpi-card--clickable:hover .kpi-arrow {
  opacity: 0.6;
  transform: translateX(0);
}

.kpi-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-trend {
  display: inline-flex;
  align-items: center;
  gap: 1px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 5px;
}
.kpi-trend.is-up { color: #059669; background: rgba(16,185,129,0.08); }
.kpi-trend.is-down { color: #DC2626; background: rgba(220,38,38,0.08); }

.kpi-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text, #1C1917);
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-feature-settings: 'tnum';
}

.kpi-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary, #57534E);
  margin-top: 4px;
}
.kpi-sub {
  font-size: 11px;
  color: var(--text-muted, #A8A29E);
  margin-top: 2px;
}
</style>
