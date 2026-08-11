<template>
  <div class="dot-chart">
    <div class="dot-chart__grid" :style="{ height: height + 'px' }">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="dot-chart__col"
        :class="{ 'is-active': hoverIndex === i }"
        @mouseenter="hoverIndex = i"
        @mouseleave="hoverIndex = null"
      >
        <div class="dot-chart__tooltip" v-if="hoverIndex === i">{{ formatValue(item.value) }}</div>
        <div class="dot-chart__dots">
          <span
            v-for="d in rows"
            :key="d"
            class="dot-chart__dot"
            :class="{ 'is-filled': (rows - d) < filledCount(item.value) }"
          />
        </div>
        <div class="dot-chart__label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  data: { label: string; value: number }[]
  rows?: number
  height?: number
  formatValue?: (v: number) => string
}>()

const hoverIndex = ref<number | null>(null)
const rows = props.rows || 14
const height = props.height || 200

const maxVal = computed(() => Math.max(...props.data.map(d => d.value), 1))

function filledCount(value: number) {
  return Math.max(1, Math.round((value / maxVal.value) * rows))
}

function formatValue(v: number) {
  if (props.formatValue) return props.formatValue(v)
  return String(v)
}
</script>

<style scoped>
.dot-chart { width: 100%; }
.dot-chart__grid {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  width: 100%;
}
.dot-chart__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  cursor: pointer;
}
.dot-chart__tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--text);
  color: var(--bg);
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
  z-index: 5;
  animation: dot-tooltip-in 0.15s ease;
}
.dot-chart__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--text);
}
@keyframes dot-tooltip-in { from { opacity: 0; transform: translateX(-50%) translateY(2px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

.dot-chart__dots {
  display: flex;
  flex-direction: column-reverse;
  gap: 3px;
  flex: 1;
  justify-content: flex-start;
  padding-bottom: 2px;
}
.dot-chart__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bg-subtle);
  transition: all 0.15s ease;
  flex-shrink: 0;
}
.dot-chart__dot.is-filled {
  background: var(--accent);
  opacity: 0.28;
}
/* Top-most filled dots get full opacity for a gradient feel */
.dot-chart__dot.is-filled:nth-last-child(-n+4) { opacity: 0.55; }
.dot-chart__dot.is-filled:nth-last-child(-n+2) { opacity: 0.85; }
.dot-chart__dot.is-filled:last-child { opacity: 1; }

.dot-chart__col.is-active .dot-chart__dot.is-filled {
  background: var(--accent);
  opacity: 1 !important;
}
.dot-chart__col.is-active .dot-chart__dot:not(.is-filled) {
  background: var(--accent-subtle);
}

.dot-chart__label {
  font-size: 10px;
  font-weight: 500;
  color: var(--text-muted);
  margin-top: 10px;
}
.dot-chart__col.is-active .dot-chart__label {
  color: var(--accent);
  font-weight: 700;
}
</style>
