<template>
  <div class="kpi-card group">
    <div class="flex items-start justify-between mb-3">
      <div class="kpi-icon" :style="{ background: iconBg, color: iconColor }">
        <component :is="icon" :size="18" :stroke-width="2" />
      </div>
      <div v-if="trend !== undefined" class="kpi-trend" :class="trend >= 0 ? 'is-up' : 'is-down'">
        <component :is="trend >= 0 ? ArrowUpRight : ArrowDownRight" :size="11" :stroke-width="2.5" />
        {{ Math.abs(trend) }}%
      </div>
    </div>
    <div class="kpi-value">{{ value }}</div>
    <div class="kpi-label">{{ label }}</div>
    <div v-if="sub" class="kpi-sub">{{ sub }}</div>
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
  iconBg?: string
  iconColor?: string
}>()
</script>

<style scoped>
.kpi-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
  transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
  position: relative;
  overflow: hidden;
}
:global(.dark) .kpi-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.06);
}
.kpi-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);
  border-color: rgba(99,102,241,0.1);
}
:global(.dark) .kpi-card:hover {
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  border-color: rgba(99,102,241,0.1);
}

.kpi-icon {
  width: 36px;
  height: 36px;
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
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  letter-spacing: -0.01em;
}
.kpi-trend.is-up { color: #059669; background: rgba(16,185,129,0.08); }
.kpi-trend.is-down { color: #dc2626; background: rgba(239,68,68,0.08); }

.kpi-value {
  font-size: 24px;
  font-weight: 800;
  color: #18181b;
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-feature-settings: 'tnum';
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
