<template>
  <div class="dash">
    <!-- Page header -->
    <div class="dash__head">
      <div>
        <h1 class="dash__title">Global Dashboard</h1>
        <p class="dash__sub">Barcha binolar bo'yicha umumiy ko'rsatkichlar</p>
      </div>
      <div class="dash__head-right">
        <button class="dash__export" @click="() => {}"><Download :size="15" /> Eksport</button>
        <button class="dash__refresh" @click="refresh"><RefreshCw :size="15" :class="{ 'animate-spin': refreshing }" /> Yangilash</button>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="dash__kpis">
      <div v-for="kpi in kpis" :key="kpi.label" class="dash__kpi">
        <div class="dash__kpi-top">
          <div class="dash__kpi-icon" :style="{ background: kpi.bg, color: kpi.color }">
            <component :is="kpi.icon" :size="20" />
          </div>
          <div class="dash__kpi-trend" :class="kpi.trend > 0 ? 'dash__kpi-trend--up' : 'dash__kpi-trend--down'">
            <TrendingUp v-if="kpi.trend > 0" :size="13" />
            <TrendingDown v-else :size="13" />
            {{ Math.abs(kpi.trend) }}%
          </div>
        </div>
        <div class="dash__kpi-val">{{ kpi.value }}</div>
        <div class="dash__kpi-label">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="dash__charts">
      <div class="dash__chart-card">
        <div class="dash__chart-head">
          <h3 class="dash__chart-title">Daromat dinamikasi</h3>
          <div class="dash__chart-tabs">
            <button :class="{ active: chartTab === 'month' }" @click="chartTab = 'month'">Oy</button>
            <button :class="{ active: chartTab === 'quarter' }" @click="chartTab = 'quarter'">Chorak</button>
            <button :class="{ active: chartTab === 'year' }" @click="chartTab = 'year'">Yil</button>
          </div>
        </div>
        <div class="dash__chart-body">
          <div class="dash__chart-bars">
            <div v-for="(bar, i) in chartData" :key="i" class="dash__chart-bar">
              <div class="dash__chart-bar-fill" :style="{ height: bar.height + '%' }"></div>
              <div class="dash__chart-bar-label">{{ bar.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="dash__chart-card">
        <div class="dash__chart-head">
          <h3 class="dash__chart-title">Binolar bo'yicha daromat</h3>
        </div>
        <div class="dash__chart-body">
          <div v-for="(item, i) in buildingRevenue" :key="i" class="dash__progress-row">
            <div class="dash__progress-head">
              <span class="dash__progress-name">{{ item.name }}</span>
              <span class="dash__progress-val">{{ item.value }}M UZS</span>
            </div>
            <div class="dash__progress-bar">
              <div class="dash__progress-fill" :style="{ width: item.percent + '%', background: item.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent activity + Buildings table -->
    <div class="dash__bottom">
      <div class="dash__card">
        <div class="dash__card-head">
          <h3 class="dash__card-title">So'nggi faollik</h3>
          <NuxtLink to="/admin/audit" class="dash__card-link">Barchasi →</NuxtLink>
        </div>
        <div class="dash__activity">
          <div v-for="(act, i) in activities" :key="i" class="dash__activity-item">
            <div class="dash__activity-dot" :style="{ background: act.color }"></div>
            <div class="dash__activity-info">
              <span class="dash__activity-text">{{ act.text }}</span>
              <span class="dash__activity-time">{{ act.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dash__card">
        <div class="dash__card-head">
          <h3 class="dash__card-title">Binolar holati</h3>
          <NuxtLink to="/management/buildings" class="dash__card-link">Barchasi →</NuxtLink>
        </div>
        <div class="dash__buildings">
          <div v-for="(b, i) in buildings" :key="i" class="dash__building">
            <div class="dash__building-img">
              <img :src="b.image" :alt="b.name" />
            </div>
            <div class="dash__building-info">
              <span class="dash__building-name">{{ b.name }}</span>
              <span class="dash__building-occ">{{ b.occupied }}/{{ b.total }} unit</span>
            </div>
            <div class="dash__building-bar">
              <div class="dash__building-bar-fill" :style="{ width: (b.occupied / b.total * 100) + '%' }"></div>
            </div>
            <span class="dash__building-pct">{{ Math.round(b.occupied / b.total * 100) }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Wallet, FileText, Users, TrendingUp, TrendingDown, Download, RefreshCw } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const refreshing = ref(false)
const chartTab = ref('month')

const kpis = [
  { label: 'Jami daromat', value: '247.8M UZS', trend: 12, icon: Wallet, bg: 'rgba(15,118,110,0.1)', color: 'var(--accent)' },
  { label: 'Faol shartnomalar', value: '184', trend: 8, icon: FileText, bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  { label: 'Bandlik darajasi', value: '81%', trend: 5, icon: Building2, bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  { label: 'Ijarachilar', value: '192', trend: -3, icon: Users, bg: 'rgba(239,68,68,0.1)', color: '#ef4444' },
]

const chartData = [
  { label: 'Yan', height: 65 }, { label: 'Fev', height: 72 }, { label: 'Mar', height: 68 },
  { label: 'Apr', height: 80 }, { label: 'May', height: 85 }, { label: 'Iyn', height: 78 },
  { label: 'Iyl', height: 92 }, { label: 'Avg', height: 88 }, { label: 'Sen', height: 95 },
  { label: 'Okt', height: 90 }, { label: 'Noy', height: 82 }, { label: 'Dek', height: 98 },
]

const buildingRevenue = [
  { name: 'Tashkent City', value: 85, percent: 100, color: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' },
  { name: 'Trillant Tower', value: 62, percent: 73, color: 'linear-gradient(90deg, var(--accent), var(--accent))' },
  { name: 'Savdo Markaz', value: 48, percent: 56, color: 'linear-gradient(90deg, var(--accent), var(--accent))' },
  { name: 'Logistika Markaz', value: 32, percent: 38, color: 'linear-gradient(90deg, #c7d2fe, var(--accent))' },
]

const activities = [
  { text: 'Yangi shartnoma imzolandi — Ofis 205', time: '5 daqiqa oldin', color: '#10b981' },
  { text: 'Ariza qabul qilindi — Savdo maydoni GF', time: '23 daqiqa oldin', color: 'var(--accent)' },
  { text: 'To\'lov amalga oshirildi — 15.2M UZS', time: '1 soat oldin', color: '#10b981' },
  { text: 'Servis so\'rovi yopildi — Trillant Tower', time: '2 soat oldin', color: '#f59e0b' },
  { text: 'Yangi ijarachi ro\'yxatdan o\'tdi', time: '3 soat oldin', color: 'var(--accent)' },
]

const buildings = [
  { name: 'Tashkent City', occupied: 193, total: 240, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3b441d5a2_generated_image.png' },
  { name: 'Trillant Tower', occupied: 68, total: 85, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { name: 'Savdo Markaz', occupied: 42, total: 60, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png' },
  { name: 'Logistika Markaz', occupied: 28, total: 40, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3731e4525_generated_image.png' },
]

function refresh() {
  refreshing.value = true
  setTimeout(() => refreshing.value = false, 1000)
}
</script>

<style scoped>
.dash { max-width: 1280px; margin: 0 auto; }

/* Head */
.dash__head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 16px; }
.dash__title { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 4px; }
.dark .dash__title { color: white; }
.dash__sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .dash__sub { color: #a1a1aa; }
.dash__head-right { display: flex; gap: 8px; }
.dash__export, .dash__refresh {
  display: inline-flex; align-items: center; gap: 7px; padding: 10px 16px;
  border-radius: 11px; font-size: 13px; font-weight: 500; border: none; cursor: pointer;
  transition: all 0.25s;
}
.dash__export { background: rgba(0,0,0,0.04); color: #52525b; }
.dark .dash__export { background: rgba(255,255,255,0.06); color: #a1a1aa; }
.dash__export:hover { background: rgba(0,0,0,0.08); }
.dark .dash__export:hover { background: rgba(255,255,255,0.1); }
.dash__refresh { background: var(--accent); color: white; box-shadow: none; }
.dash__refresh:hover { transform: translateY(-1px); box-shadow: none; }

/* KPIs */
.dash__kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.dash__kpi {
  padding: 22px; border-radius: 18px; background: white; border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.3s;
}
.dark .dash__kpi { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.dash__kpi:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(15,118,110,0.08); transform: translateY(-3px); }
.dark .dash__kpi:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(15,118,110,0.1); }
.dash__kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.dash__kpi-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.dash__kpi-trend { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 7px; }
.dash__kpi-trend--up { background: rgba(16,185,129,0.1); color: #10b981; }
.dash__kpi-trend--down { background: rgba(239,68,68,0.1); color: #ef4444; }
.dash__kpi-val { font-size: 26px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; }
.dark .dash__kpi-val { color: white; }
.dash__kpi-label { font-size: 13px; color: #71717a; margin-top: 4px; }
.dark .dash__kpi-label { color: #a1a1aa; }

/* Charts */
.dash__charts { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; margin-bottom: 20px; }
.dash__chart-card { padding: 22px; border-radius: 18px; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.dark .dash__chart-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.dash__chart-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.dash__chart-title { font-size: 15px; font-weight: 700; color: #18181b; margin: 0; }
.dark .dash__chart-title { color: white; }
.dash__chart-tabs { display: flex; gap: 4px; background: rgba(0,0,0,0.04); padding: 3px; border-radius: 9px; }
.dark .dash__chart-tabs { background: rgba(255,255,255,0.04); }
.dash__chart-tabs button { padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 500; color: #71717a; background: none; border: none; cursor: pointer; transition: all 0.25s; }
.dark .dash__chart-tabs button { color: #a1a1aa; }
.dash__chart-tabs button.active { background: white; color: #18181b; box-shadow: 0 1px 2px rgba(0,0,0,0.06); font-weight: 600; }
.dark .dash__chart-tabs button.active { background: rgba(255,255,255,0.08); color: white; }

/* Bar chart */
.dash__chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 200px; padding-top: 10px; }
.dash__chart-bar { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; }
.dash__chart-bar-fill { width: 100%; max-width: 28px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, var(--accent), var(--accent)); transition: all 0.4s ease; min-height: 4px; }
.dash__chart-bar-fill:hover { background: linear-gradient(180deg, var(--accent), var(--accent-hover)); }
.dash__chart-bar-label { font-size: 10px; color: #a1a1aa; font-weight: 500; }

/* Progress rows */
.dash__progress-row { margin-bottom: 16px; }
.dash__progress-row:last-child { margin-bottom: 0; }
.dash__progress-head { display: flex; justify-content: space-between; margin-bottom: 8px; }
.dash__progress-name { font-size: 13px; font-weight: 500; color: #52525b; }
.dark .dash__progress-name { color: #d4d4d8; }
.dash__progress-val { font-size: 13px; font-weight: 700; color: #18181b; }
.dark .dash__progress-val { color: white; }
.dash__progress-bar { height: 8px; border-radius: 4px; background: rgba(0,0,0,0.04); overflow: hidden; }
.dark .dash__progress-bar { background: rgba(255,255,255,0.06); }
.dash__progress-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }

/* Bottom */
.dash__bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.dash__card { padding: 22px; border-radius: 18px; background: white; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.dark .dash__card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.dash__card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.dash__card-title { font-size: 15px; font-weight: 700; color: #18181b; margin: 0; }
.dark .dash__card-title { color: white; }
.dash__card-link { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 500; }
.dash__card-link:hover { text-decoration: underline; }

/* Activity */
.dash__activity { display: flex; flex-direction: column; gap: 14px; }
.dash__activity-item { display: flex; align-items: flex-start; gap: 12px; }
.dash__activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
.dash__activity-info { display: flex; flex-direction: column; gap: 2px; }
.dash__activity-text { font-size: 13px; color: #3f3f46; font-weight: 500; }
.dark .dash__activity-text { color: #d4d4d8; }
.dash__activity-time { font-size: 12px; color: #a1a1aa; }

/* Buildings */
.dash__buildings { display: flex; flex-direction: column; gap: 14px; }
.dash__building { display: flex; align-items: center; gap: 12px; }
.dash__building-img { width: 48px; height: 48px; border-radius: 10px; overflow: hidden; flex-shrink: 0; }
.dash__building-img img { width: 100%; height: 100%; object-fit: cover; }
.dash__building-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.dash__building-name { font-size: 13px; font-weight: 600; color: #18181b; }
.dark .dash__building-name { color: white; }
.dash__building-occ { font-size: 12px; color: #a1a1aa; }
.dash__building-bar { flex: 1; max-width: 120px; height: 6px; border-radius: 3px; background: rgba(0,0,0,0.04); overflow: hidden; }
.dark .dash__building-bar { background: rgba(255,255,255,0.06); }
.dash__building-bar-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent), var(--accent-hover)); transition: width 0.5s; }
.dash__building-pct { font-size: 13px; font-weight: 700; color: #18181b; min-width: 36px; text-align: right; }
.dark .dash__building-pct { color: white; }

/* Responsive */
@media (max-width: 1024px) {
  .dash__kpis { grid-template-columns: 1fr 1fr; }
  .dash__charts { grid-template-columns: 1fr; }
  .dash__bottom { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .dash__kpis { grid-template-columns: 1fr; }
}
</style>
