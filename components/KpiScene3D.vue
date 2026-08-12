<template>
  <div class="kpi-miniature" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- Real building photo as miniature -->
    <div class="kmini__photo" :style="photoStyle">
      <div class="kmini__tint" :style="{ background: tintGradient }"></div>
      <!-- Metric badge overlay -->
      <div class="kmini__badge" :style="{ background: c.badge }">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <!-- Icon per type -->
          <template v-if="type === 'revenue' || type === 'paid'">
            <line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </template>
          <template v-else-if="type === 'occupancy'">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </template>
          <template v-else-if="type === 'buildings'">
            <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.1"/><line x1="15" y1="6" x2="15" y2="6.1"/><line x1="9" y1="10" x2="9" y2="10.1"/><line x1="15" y1="10" x2="15" y2="10.1"/><line x1="9" y1="14" x2="9" y2="14.1"/><line x1="15" y1="14" x2="15" y2="14.1"/>
          </template>
          <template v-else-if="type === 'units'">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </template>
          <template v-else-if="type === 'overdue' || type === 'debt'">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </template>
          <template v-else-if="type === 'applications'">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
          </template>
          <template v-else-if="type === 'inventory'">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
          </template>
          <template v-else-if="type === 'signing' || type === 'contract'">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </template>
          <template v-else-if="type === 'service'">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          </template>
          <template v-else>
            <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.1"/><line x1="15" y1="6" x2="15" y2="6.1"/><line x1="9" y1="10" x2="9" y2="10.1"/><line x1="15" y1="10" x2="15" y2="10.1"/>
          </template>
        </svg>
      </div>
    </div>
    <!-- Glassmorphism bottom bar -->
    <div class="kmini__bar" :style="{ background: c.barGradient }">
      <span class="kmini__label">{{ c.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
const props = withDefaults(defineProps<{
  type: 'revenue' | 'occupancy' | 'buildings' | 'units' | 'overdue' | 'applications' | 'paid' | 'inventory' | 'signing' | 'contract' | 'service' | 'debt'
  size?: number
}>(), { size: 56 })

const photoMap: Record<string, string> = {
  revenue: '/buildings/real_tashkent-skyline.jpg',
  occupancy: '/buildings/real_tashkent-night.jpg',
  buildings: '/buildings/real_finance-center.jpg',
  units: '/buildings/real_nest-one.jpg',
  overdue: '/buildings/real_tashkent-street.jpg',
  applications: '/buildings/real_tashkent-skyline2.jpg',
  paid: '/buildings/real_tashkent-skyline3.jpg',
  inventory: '/buildings/real_tashkent-city.jpg',
  signing: '/buildings/real_nest-one2.jpg',
  contract: '/buildings/real_tashkent-skyline.jpg',
  service: '/buildings/real_tashkent-night.jpg',
  debt: '/buildings/real_finance-center.jpg',
}

const photoUrl = computed(() => photoMap[props.type] || photoMap.buildings)
const photoStyle = computed(() => ({ background: `url(${img(photoUrl.value)}) center/cover` }))

const palettes: Record<string, any> = {
  revenue: { badge: 'linear-gradient(135deg, #f59e0b, #d97706)', barGradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)', label: 'Rev', tint: 'rgba(245,158,11,0.15)' },
  occupancy: { badge: 'linear-gradient(135deg, #10b981, #059669)', barGradient: 'linear-gradient(90deg, #10b981, #34d399)', label: 'Occ', tint: 'rgba(16,185,129,0.15)' },
  buildings: { badge: 'linear-gradient(135deg, #3b82f6, #2563eb)', barGradient: 'linear-gradient(90deg, #3b82f6, #60a5fa)', label: 'Bldg', tint: 'rgba(59,130,246,0.15)' },
  units: { badge: 'linear-gradient(135deg, #6366f1, #4f46e5)', barGradient: 'linear-gradient(90deg, #6366f1, #818cf8)', label: 'Unit', tint: 'rgba(99,102,241,0.15)' },
  overdue: { badge: 'linear-gradient(135deg, #ef4444, #dc2626)', barGradient: 'linear-gradient(90deg, #ef4444, #f87171)', label: 'Over', tint: 'rgba(239,68,68,0.2)' },
  applications: { badge: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', barGradient: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', label: 'App', tint: 'rgba(139,92,246,0.15)' },
  paid: { badge: 'linear-gradient(135deg, #10b981, #059669)', barGradient: 'linear-gradient(90deg, #059669, #34d399)', label: 'Paid', tint: 'rgba(16,185,129,0.15)' },
  inventory: { badge: 'linear-gradient(135deg, #f59e0b, #d97706)', barGradient: 'linear-gradient(90deg, #d97706, #fbbf24)', label: 'Inv', tint: 'rgba(217,119,6,0.15)' },
  signing: { badge: 'linear-gradient(135deg, #f59e0b, #d97706)', barGradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)', label: 'Sign', tint: 'rgba(245,158,11,0.15)' },
  contract: { badge: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', barGradient: 'linear-gradient(90deg, #7c3aed, #a78bfa)', label: 'Ctr', tint: 'rgba(124,58,237,0.15)' },
  service: { badge: 'linear-gradient(135deg, #06b6d4, #0891b2)', barGradient: 'linear-gradient(90deg, #06b6d4, #22d3ee)', label: 'Svc', tint: 'rgba(6,182,212,0.15)' },
  debt: { badge: 'linear-gradient(135deg, #f43f5e, #e11d48)', barGradient: 'linear-gradient(90deg, #e11d48, #fb7185)', label: 'Debt', tint: 'rgba(244,63,94,0.2)' },
}

const c = computed(() => palettes[props.type])
const tintGradient = computed(() => `linear-gradient(180deg, ${c.value.tint} 0%, transparent 50%, ${c.value.tint} 100%)`)
</script>

<style scoped>
.kpi-miniature {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-miniature:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}

.kmini__photo {
  position: relative;
  width: 100%;
  height: 75%;
  overflow: hidden;
}
.kmini__tint {
  position: absolute;
  inset: 0;
  mix-blend-mode: multiply;
  pointer-events: none;
}

.kmini__badge {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.kmini__badge svg {
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
}

.kmini__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}
.kmini__label {
  color: white;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
</style>
