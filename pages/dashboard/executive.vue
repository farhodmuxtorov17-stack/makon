<template>
  <div class="dash">
    <!-- Page header -->
    <div class="dash__head">
      <div class="dash__head-left">
        <div class="dash__head-icon"><Building2 :size="20" /></div>
        <div>
          <h1 class="dash__title">Super rahbar</h1>
          <p class="dash__sub">Barcha {{ buildings.length }} ta biznes markaz</p>
        </div>
      </div>
      <div class="dash__head-right">
        <select v-model="scopeFilter" class="dash__select">
          <option value="">Barcha obyektlar</option>
          <option v-for="b in buildings" :key="b.name" :value="b.name">{{ b.name }}</option>
        </select>
        <button class="dash__date">
          <Calendar :size="14" /> Bugun, {{ today }}
        </button>
      </div>
    </div>

    <!-- KPI cards with sparklines -->
    <div class="dash__kpis">
      <div v-for="kpi in kpis" :key="kpi.label" class="dash__kpi">
        <div class="dash__kpi-top">
          <span class="dash__kpi-label">{{ kpi.label }}</span>
          <span class="dash__kpi-trend" :class="kpi.trend > 0 ? 'dash__kpi-trend--up' : 'dash__kpi-trend--down'">
            <TrendingUp v-if="kpi.trend > 0" :size="11" />
            <TrendingDown v-else :size="11" />
            {{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <div class="dash__kpi-val">{{ kpi.value }}</div>
        <div class="dash__kpi-spark">
          <Sparkline :data="kpi.spark" :color="kpi.color" :height="32" />
        </div>
      </div>
    </div>

    <!-- Map + Donut + Bar chart row -->
    <div class="dash__row3">
      <!-- Map -->
      <div class="dash__panel dash__panel--map">
        <div class="dash__panel-head">
          <h3 class="dash__panel-title">Bandlik xaritasi</h3>
        </div>
        <div class="dash__map">
          <div class="dash__map-grid"></div>
          <div
            v-for="(b, i) in buildings" :key="i"
            class="dash__map-pin"
            :style="{ left: b.mapX + '%', top: b.mapY + '%' }"
            :title="b.name"
          >
            <MapPin :size="22" :fill="b.occupancy > 85 ? '#2563EB' : '#F59E0B'" :stroke="'white'" stroke-width="1.5" />
          </div>
        </div>
      </div>

      <!-- Donut -->
      <div class="dash__panel">
        <div class="dash__panel-head">
          <h3 class="dash__panel-title">Portfel ko'rinishi</h3>
        </div>
        <div class="dash__donut-wrap">
          <div class="dash__donut-svg">
            <DonutChart :values="[{ value: occupiedArea, color: '#2563EB' }, { value: vacantArea, color: '#93C5FD' }]" />
            <div class="dash__donut-center">
              <div class="dash__donut-total">{{ formatArea(totalArea) }}</div>
              <div class="dash__donut-total-label">Jami maydon</div>
            </div>
          </div>
          <div class="dash__donut-legend">
            <div class="dash__donut-legend-item">
              <span class="dash__donut-dot" style="background:#2563EB"></span>
              <div>
                <div class="dash__donut-legend-label">Band</div>
                <div class="dash__donut-legend-val">{{ formatArea(occupiedArea) }} ({{ Math.round(occupiedArea/totalArea*100) }}%)</div>
              </div>
            </div>
            <div class="dash__donut-legend-item">
              <span class="dash__donut-dot" style="background:#93C5FD"></span>
              <div>
                <div class="dash__donut-legend-label">Vacant</div>
                <div class="dash__donut-legend-val">{{ formatArea(vacantArea) }} ({{ Math.round(vacantArea/totalArea*100) }}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bar + line -->
      <div class="dash__panel">
        <div class="dash__panel-head">
          <h3 class="dash__panel-title">Portfel dinamikasi</h3>
        </div>
        <div class="dash__bars">
          <div v-for="(m, i) in dynamicsData" :key="i" class="dash__bars-col">
            <div class="dash__bars-stack">
              <div class="dash__bars-seg dash__bars-seg--occ" :style="{ height: (m.occupied / maxDynamics * 100) + '%' }"></div>
              <div class="dash__bars-seg dash__bars-seg--vac" :style="{ height: (m.vacant / maxDynamics * 100) + '%' }"></div>
            </div>
            <span class="dash__bars-label">{{ m.month }}</span>
          </div>
        </div>
        <div class="dash__bars-legend">
          <span><i style="background:#2563EB"></i> Band maydon</span>
          <span><i style="background:#BFDBFE"></i> Vacant maydon</span>
        </div>
      </div>
    </div>

    <!-- Buildings comparison -->
    <div class="dash__panel">
      <div class="dash__panel-head">
        <h3 class="dash__panel-title">Obyektlar taqqoslanishi</h3>
      </div>
      <div class="dash__compare-grid">
        <div v-for="(b, i) in buildings" :key="i" class="dash__compare-card">
          <div class="dash__compare-img">
            <img :src="b.image" :alt="b.name" loading="lazy" />
          </div>
          <div class="dash__compare-name">{{ b.name }}</div>
          <div class="dash__compare-metrics">
            <div class="dash__compare-row">
              <span class="dash__compare-metric-label">Bandlik</span>
              <span class="dash__compare-metric-val">{{ b.occupancy }}%</span>
            </div>
            <div class="dash__compare-track"><div class="dash__compare-fill dash__compare-fill--occ" :style="{ width: b.occupancy + '%' }"></div></div>

            <div class="dash__compare-row">
              <span class="dash__compare-metric-label">Vacancy</span>
              <span class="dash__compare-metric-val">{{ 100 - b.occupancy }}%</span>
            </div>
            <div class="dash__compare-track"><div class="dash__compare-fill dash__compare-fill--vac" :style="{ width: (100 - b.occupancy) + '%' }"></div></div>

            <div class="dash__compare-row">
              <span class="dash__compare-metric-label">Qarzdorlik</span>
              <span class="dash__compare-metric-val">{{ b.debt }} mln</span>
            </div>
          </div>
          <NuxtLink :to="`/buildings/${b.slug}`" class="dash__compare-link">Batafsil →</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, TrendingDown, Calendar, MapPin } from 'lucide-vue-next'
import Sparkline from '~/components/Sparkline.vue'
import DonutChart from '~/components/DonutChart.vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const scopeFilter = ref('')
const today = '11.08.2026'

const kpis = [
  { label: "Bandlik (o'rtacha)", value: '87%', trend: 4.2, color: '#2563EB', spark: [78, 80, 79, 82, 84, 83, 85, 86, 85, 87] },
  { label: 'Vacancy', value: '13%', trend: -2.1, color: '#F59E0B', spark: [22, 20, 21, 18, 16, 17, 15, 14, 15, 13] },
  { label: 'Qarzdorlik', value: '125.4 mln', trend: 6.3, color: '#EF4444', spark: [95, 100, 98, 105, 110, 108, 115, 118, 120, 125] },
  { label: 'Servis arizalari', value: '156', trend: -8.0, color: '#8B5CF6', spark: [190, 185, 178, 172, 168, 165, 160, 158, 157, 156] },
  { label: "To'lovlar (bugun)", value: '824.6 mln', trend: 12.5, color: '#3B82F6', spark: [600, 650, 630, 700, 690, 720, 750, 740, 800, 824] },
]

const buildings = [
  { name: 'MAKON Business Center', slug: 'makon-bc', occupancy: 92, debt: 18.2, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3b441d5a2_generated_image.png', mapX: 22, mapY: 30 },
  { name: "Navro'z Business Center", slug: 'navroz-bc', occupancy: 85, debt: 22.5, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png', mapX: 62, mapY: 20 },
  { name: 'City Plaza', slug: 'city-plaza', occupancy: 88, debt: 27.4, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png', mapX: 40, mapY: 62 },
  { name: 'Tashkent Finance Center', slug: 'tashkent-finance-center', occupancy: 80, debt: 31.6, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3731e4525_generated_image.png', mapX: 75, mapY: 68 },
  { name: 'Green Park Office', slug: 'green-park-office', occupancy: 90, debt: 25.7, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/a34b512d2_generated_image.png', mapX: 15, mapY: 78 },
]

const totalArea = 182560
const occupiedArea = 158640
const vacantArea = 23920

const dynamicsData = [
  { month: 'Yan', occupied: 148, vacant: 22 },
  { month: 'Fev', occupied: 151, vacant: 21 },
  { month: 'Mar', occupied: 153, vacant: 20 },
  { month: 'Apr', occupied: 156, vacant: 24 },
  { month: 'May', occupied: 158, vacant: 24 },
]
const maxDynamics = Math.max(...dynamicsData.map(d => d.occupied + d.vacant))

function formatArea(v: number) { return v.toLocaleString('ru-RU') + ' m²' }
</script>

<style scoped>
.dash { max-width: 1360px; margin: 0 auto; }

/* Head */
.dash__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.dash__head-left { display: flex; align-items: center; gap: 12px; }
.dash__head-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash__title { font-size: 20px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin: 0; }
.dark .dash__title { color: white; }
.dash__sub { font-size: 13px; color: #71717a; margin: 2px 0 0; }
.dark .dash__sub { color: #a1a1aa; }
.dash__head-right { display: flex; gap: 10px; align-items: center; }
.dash__select {
  padding: 9px 14px; border-radius: 10px; font-size: 13px; font-weight: 500;
  border: 1px solid rgba(0,0,0,0.08); background: white; color: #18181b; cursor: pointer;
}
.dark .dash__select { background: #1c1c1e; border-color: rgba(255,255,255,0.08); color: white; }
.dash__date {
  display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px;
  border-radius: 10px; font-size: 13px; font-weight: 500; border: 1px solid rgba(0,0,0,0.08);
  background: white; color: #52525b; cursor: pointer;
}
.dark .dash__date { background: #1c1c1e; border-color: rgba(255,255,255,0.08); color: #a1a1aa; }

/* KPIs with sparklines */
.dash__kpis { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 20px; }
@media (max-width: 1100px) { .dash__kpis { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .dash__kpis { grid-template-columns: repeat(2, 1fr); } }
.dash__kpi {
  padding: 16px 18px; border-radius: 16px; background: white; border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.25s;
}
.dark .dash__kpi { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.dash__kpi:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.06); }
.dash__kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.dash__kpi-label { font-size: 11.5px; color: #71717a; font-weight: 500; }
.dark .dash__kpi-label { color: #a1a1aa; }
.dash__kpi-trend { display: inline-flex; align-items: center; gap: 2px; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 6px; }
.dash__kpi-trend--up { background: rgba(16,185,129,0.1); color: #10b981; }
.dash__kpi-trend--down { background: rgba(239,68,68,0.1); color: #ef4444; }
.dash__kpi-val { font-size: 22px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin-bottom: 8px; }
.dark .dash__kpi-val { color: white; }
.dash__kpi-spark { height: 32px; }

/* 3-col row */
.dash__row3 { display: grid; grid-template-columns: 1.3fr 1fr 1fr; gap: 16px; margin-bottom: 20px; }
@media (max-width: 1024px) { .dash__row3 { grid-template-columns: 1fr; } }
.dash__panel {
  padding: 20px; border-radius: 18px; background: white; border: 1px solid rgba(0,0,0,0.05);
}
.dark .dash__panel { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.dash__panel-head { margin-bottom: 14px; }
.dash__panel-title { font-size: 14px; font-weight: 700; color: #18181b; margin: 0; }
.dark .dash__panel-title { color: white; }

/* Map */
.dash__panel--map { position: relative; }
.dash__map { position: relative; height: 240px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #eef2f5, #e2e8ec); }
.dark .dash__map { background: linear-gradient(135deg, #1a1a1c, #232326); }
.dash__map-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 24px 24px;
}
.dark .dash__map-grid { background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px); }
.dash__map-pin { position: absolute; transform: translate(-50%, -100%); filter: drop-shadow(0 3px 6px rgba(0,0,0,0.25)); transition: transform 0.2s; cursor: pointer; }
.dash__map-pin:hover { transform: translate(-50%, -100%) scale(1.2); }

/* Donut */
.dash__donut-wrap { display: flex; align-items: center; gap: 16px; }
.dash__donut-svg { position: relative; width: 108px; height: 108px; flex-shrink: 0; }
.dash__donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.dash__donut-total { font-size: 13px; font-weight: 800; color: #18181b; }
.dark .dash__donut-total { color: white; }
.dash__donut-total-label { font-size: 8.5px; color: #a1a1aa; margin-top: 1px; text-align: center; }
.dash__donut-legend { display: flex; flex-direction: column; gap: 12px; }
.dash__donut-legend-item { display: flex; align-items: center; gap: 8px; }
.dash__donut-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.dash__donut-legend-label { font-size: 11.5px; color: #71717a; }
.dash__donut-legend-val { font-size: 13px; font-weight: 700; color: #18181b; }
.dark .dash__donut-legend-val { color: white; }

/* Bars */
.dash__bars { display: flex; align-items: flex-end; justify-content: space-between; height: 160px; gap: 8px; margin-bottom: 12px; }
.dash__bars-col { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; height: 100%; justify-content: flex-end; }
.dash__bars-stack { width: 60%; display: flex; flex-direction: column; height: 100%; justify-content: flex-end; border-radius: 4px; overflow: hidden; }
.dash__bars-seg--occ { background: #2563EB; }
.dash__bars-seg--vac { background: #BFDBFE; }
.dash__bars-label { font-size: 10.5px; color: #a1a1aa; }
.dash__bars-legend { display: flex; gap: 16px; font-size: 11px; color: #71717a; }
.dash__bars-legend span { display: inline-flex; align-items: center; gap: 5px; }
.dash__bars-legend i { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }

/* Compare cards */
.dash__compare-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
@media (max-width: 1100px) { .dash__compare-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 700px) { .dash__compare-grid { grid-template-columns: repeat(2, 1fr); } }
.dash__compare-card {
  border-radius: 14px; overflow: hidden; border: 1px solid rgba(0,0,0,0.05);
  background: #fafafa; padding-bottom: 14px; transition: all 0.2s;
}
.dark .dash__compare-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.06); }
.dash__compare-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.08); }
.dash__compare-img { height: 90px; overflow: hidden; }
.dash__compare-img img { width: 100%; height: 100%; object-fit: cover; }
.dash__compare-name { font-size: 12.5px; font-weight: 700; color: #18181b; padding: 10px 12px 6px; line-height: 1.3; }
.dark .dash__compare-name { color: white; }
.dash__compare-metrics { padding: 0 12px; }
.dash__compare-row { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; margin-bottom: 3px; }
.dash__compare-metric-label { font-size: 10.5px; color: #a1a1aa; }
.dash__compare-metric-val { font-size: 11px; font-weight: 700; color: #18181b; }
.dark .dash__compare-metric-val { color: white; }
.dash__compare-track { height: 4px; border-radius: 2px; background: rgba(0,0,0,0.06); overflow: hidden; }
.dark .dash__compare-track { background: rgba(255,255,255,0.08); }
.dash__compare-fill { height: 100%; border-radius: 2px; }
.dash__compare-fill--occ { background: #2563EB; }
.dash__compare-fill--vac { background: #f59e0b; }
.dash__compare-link { display: block; text-align: center; font-size: 11px; font-weight: 600; color: var(--accent, #2563EB); margin-top: 12px; text-decoration: none; }
</style>
