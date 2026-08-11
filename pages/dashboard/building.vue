<template>
  <div class="bdash">
    <!-- Header -->
    <div class="bdash__head">
      <div class="bdash__head-left">
        <div class="bdash__head-icon"><Building2 :size="20" /></div>
        <div>
          <h1 class="bdash__title">Bino rahbari</h1>
          <p class="bdash__sub">{{ selectedBuilding.name }}</p>
        </div>
      </div>
      
      <div class="bdash__head-right">
        <div class="bdash__select-wrap">
          <span class="bdash__select-label">Obyekt tanlash</span>
          <select v-model="selectedId" class="bdash__select">
            <option v-for="b in buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
          </select>
        </div>
        <button class="bdash__date"><Calendar :size="14" /> Bugun, {{ today }}</button>
      </div>
    </div>

    <!-- Metrics -->
    <div class="bdash__kpis">
      <div v-for="kpi in kpis" :key="kpi.label" class="bdash__kpi">
        <div class="bdash__kpi-top">
          <span class="bdash__kpi-label">{{ kpi.label }}</span>
          <span class="bdash__kpi-trend" :class="kpi.trend > 0 ? 'bdash__kpi-trend--up' : 'bdash__kpi-trend--down'">
            <TrendingUp v-if="kpi.trend > 0" :size="11" />
            <TrendingDown v-else :size="11" />
            {{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <div class="bdash__kpi-val">{{ kpi.value }}</div>
        <div class="bdash__kpi-spark"><Sparkline :data="kpi.spark" :color="kpi.color" :height="30" /></div>
      </div>
    </div>

    <!-- 3-col row -->
    <div class="bdash__row3">
      <!-- Bugungi muammolar -->
      <div class="bdash__panel">
        <div class="bdash__panel-head"><h3 class="bdash__panel-title">Bugungi muammolar</h3></div>
        <div class="bdash__issues">
          <div v-for="(iss, i) in issues" :key="i" class="bdash__issue-row">
            <span class="bdash__issue-icon" :style="{ background: iss.bg, color: iss.color }"><component :is="iss.icon" :size="14" /></span>
            <span class="bdash__issue-label">{{ iss.label }}</span>
            <span class="bdash__issue-count" :style="{ color: iss.color }">{{ iss.count }}</span>
          </div>
        </div>
        <NuxtLink to="/management/service-requests" class="bdash__panel-link">Batafsil →</NuxtLink>
      </div>

      <!-- Qavatlar bo'yicha bandlik -->
      <div class="bdash__panel">
        <div class="bdash__panel-head"><h3 class="bdash__panel-title">Qavatlar bo'yicha bandlik</h3></div>
        <div class="bdash__floors-wrap">
          <div class="bdash__floors-list">
            <div v-for="f in floors" :key="f.num" class="bdash__floor-row">
              <span class="bdash__floor-label">{{ f.num }}-qavat</span>
              <div class="bdash__floor-track"><div class="bdash__floor-fill" :style="{ width: f.occupied + '%', background: f.occupied > 90 ? '#10B981' : f.occupied > 80 ? '#2563EB' : '#F59E0B' }"></div></div>
              <span class="bdash__floor-pct">{{ f.occupied }}%</span>
            </div>
          </div>
          </div>
      </div>

      <!-- So'nggi arizalar -->
      <div class="bdash__panel">
        <div class="bdash__panel-head"><h3 class="bdash__panel-title">So'nggi arizalar</h3></div>
        <div class="bdash__requests">
          <div v-for="(r, i) in recentRequests" :key="i" class="bdash__request-row">
            <div class="bdash__request-info">
              <div class="bdash__request-title">{{ r.title }}</div>
              <div class="bdash__request-meta">{{ r.unit }} · {{ r.time }}</div>
            </div>
            <span class="bdash__request-badge" :class="`bdash__request-badge--${r.statusClass}`">{{ r.status }}</span>
          </div>
        </div>
        <NuxtLink to="/management/service-requests" class="bdash__panel-link">Batafsil →</NuxtLink>
      </div>
    </div>

    <!-- 2-col row -->
    <div class="bdash__row2">
      <!-- Qarzdorlik ogohlantirishlari -->
      <div class="bdash__panel">
        <div class="bdash__panel-head"><h3 class="bdash__panel-title">Qarzdorlik ogohlantirishlari</h3></div>
        <div class="bdash__debts">
          <div v-for="(d, i) in debts" :key="i" class="bdash__debt-row">
            <span class="bdash__debt-name">{{ d.name }}</span>
            <span class="bdash__debt-amount">{{ d.amount }} mln</span>
            <span class="bdash__debt-days">{{ d.days }} kun kechikkan</span>
          </div>
        </div>
        <NuxtLink to="/finance/debts" class="bdash__panel-link">Batafsil →</NuxtLink>
      </div>

      <!-- Tasdiqlash kutilmoqda -->
      <div class="bdash__panel">
        <div class="bdash__panel-head"><h3 class="bdash__panel-title">Tasdiqlash kutilmoqda</h3></div>
        <div class="bdash__approvals">
          <div v-for="(a, i) in approvals" :key="i" class="bdash__approval-row">
            <div class="bdash__approval-info">
              <div class="bdash__approval-title">{{ a.title }}</div>
              <div class="bdash__approval-meta">{{ a.who }} · {{ a.detail }}</div>
            </div>
            <span class="bdash__approval-time">{{ a.time }}</span>
          </div>
        </div>
        <NuxtLink to="/finance/approvals" class="bdash__panel-link">Batafsil →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, TrendingDown, Calendar, CreditCard, Wrench, ClipboardCheck, FileClock } from 'lucide-vue-next'
import Sparkline from '~/components/Sparkline.vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const today = '11.08.2026'
const selectedId = ref('b1')

const buildings = [
  { id: 'b1', name: 'MAKON Business Center' },
  { id: 'b2', name: "Navro'z Business Center" },
  { id: 'b3', name: 'City Plaza' },
]
const selectedBuilding = computed(() => buildings.find(b => b.id === selectedId.value) || buildings[0])

const kpis = [
  { label: 'Bandlik', value: '92%', trend: 3.1, color: '#2563EB', spark: [86, 87, 88, 89, 90, 89, 91, 90, 92, 92] },
  { label: 'Vacancy', value: '8%', trend: -1.4, color: '#F59E0B', spark: [14, 13, 12, 12, 11, 12, 10, 10, 9, 8] },
  { label: "Bugungi to'lovlar", value: '128.4 mln', trend: 9.2, color: '#3B82F6', spark: [95, 100, 98, 105, 110, 108, 115, 118, 122, 128] },
  { label: 'Qarzdorlik', value: '18.2 mln', trend: 4.8, color: '#EF4444', spark: [14, 15, 14.5, 15.5, 16, 16.5, 17, 17.5, 17.8, 18.2] },
  { label: 'Servis arizalari', value: '14', trend: -12.0, color: '#8B5CF6', spark: [22, 21, 20, 19, 18, 17, 16, 15, 15, 14] },
]

const issues = [
  { label: "Kechikkan to'lovlar", count: 3, icon: CreditCard, bg: 'rgba(239,68,68,0.1)', color: '#EF4444' },
  { label: 'Servis arizalari (ochiq)', count: 4, icon: Wrench, bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' },
  { label: 'Tasdiqlash kutilmoqda', count: 2, icon: ClipboardCheck, bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
  { label: 'Shartnoma yakuni yaqin', count: 5, icon: FileClock, bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6' },
]

const floors = [
  { num: 7, occupied: 95 },
  { num: 6, occupied: 90 },
  { num: 5, occupied: 85 },
  { num: 4, occupied: 92 },
  { num: 3, occupied: 88 },
  { num: 2, occupied: 80 },
  { num: 1, occupied: 75 },
]
const floorsReversed = computed(() => [...floors].reverse())

const recentRequests = [
  { title: 'Ofisda konditsioner nosoz', unit: '702-ofis', time: 'Bugun, 09:15', status: 'Yangi', statusClass: 'new' },
  { title: 'Tozalash xizmati', unit: '514-ofis', time: 'Bugun, 08:40', status: 'Jarayonda', statusClass: 'progress' },
  { title: 'Elektr rozetka ishlamayapti', unit: '309-ofis', time: 'Bugun, 08:10', status: 'Yangi', statusClass: 'new' },
  { title: 'Avtoturargoh kartasi', unit: 'A-128', time: 'Kecha, 17:45', status: 'Yakunlandi', statusClass: 'done' },
]

const debts = [
  { name: 'Alpha Solutions', amount: 12.6, days: 7 },
  { name: 'Beta Trade', amount: 4.8, days: 5 },
  { name: 'Gamma LLC', amount: 0.8, days: 1 },
]

const approvals = [
  { title: 'Yangi ijara shartnomasi', who: 'Techno Group', detail: '36.0 m²', time: 'Bugun, 10:30' },
  { title: "Qo'shimcha xizmat", who: 'Marketing Pro', detail: 'Park joyi', time: 'Bugun, 09:45' },
  { title: 'Reklama joyi', who: 'Cafe Central', detail: '1-qavat', time: 'Bugun, 09:20' },
]
</script>

<style scoped>
.bdash { max-width: 1360px; margin: 0 auto; }

/* Head */
.bdash__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
.bdash__head-left { display: flex; align-items: center; gap: 12px; }
.bdash__head-icon { width: 40px; height: 40px; border-radius: 12px; background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bdash__title { font-size: 20px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin: 0; }
.dark .bdash__title { color: white; }
.bdash__sub { font-size: 13px; color: #71717a; margin: 2px 0 0; }
.dark .bdash__sub { color: #a1a1aa; }
.bdash__head-right { display: flex; gap: 10px; align-items: center; }
.bdash__select-wrap { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08); background: white; }
.dark .bdash__select-wrap { background: #1c1c1e; border-color: rgba(255,255,255,0.08); }
.bdash__select-label { font-size: 11px; color: #a1a1aa; white-space: nowrap; }
.bdash__select { font-size: 13px; font-weight: 600; border: none; background: transparent; color: #18181b; cursor: pointer; outline: none; }
.dark .bdash__select { color: white; }
.dark .bdash__select option { background: #1c1c1e; }
.bdash__date {
  display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px;
  border-radius: 10px; font-size: 13px; font-weight: 500; border: 1px solid rgba(0,0,0,0.08);
  background: white; color: #52525b; cursor: pointer;
}
.dark .bdash__date { background: #1c1c1e; border-color: rgba(255,255,255,0.08); color: #a1a1aa; }

/* KPIs */
.bdash__kpis { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 20px; }
@media (max-width: 1100px) { .bdash__kpis { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .bdash__kpis { grid-template-columns: repeat(2, 1fr); } }
.bdash__kpi { padding: 16px 18px; border-radius: 16px; background: white; border: 1px solid rgba(0,0,0,0.05); transition: all 0.25s; }
.dark .bdash__kpi { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.bdash__kpi:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,0.06); }
.bdash__kpi-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.bdash__kpi-label { font-size: 11.5px; color: #71717a; font-weight: 500; }
.dark .bdash__kpi-label { color: #a1a1aa; }
.bdash__kpi-trend { display: inline-flex; align-items: center; gap: 2px; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 6px; }
.bdash__kpi-trend--up { background: rgba(16,185,129,0.1); color: #10b981; }
.bdash__kpi-trend--down { background: rgba(239,68,68,0.1); color: #ef4444; }
.bdash__kpi-val { font-size: 21px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin-bottom: 8px; }
.dark .bdash__kpi-val { color: white; }
.bdash__kpi-spark { height: 30px; }

/* Panels */
.bdash__row3 { display: grid; grid-template-columns: 1fr 1.3fr 1fr; gap: 16px; margin-bottom: 20px; }
.bdash__row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 1024px) { .bdash__row3, .bdash__row2 { grid-template-columns: 1fr; } }
.bdash__panel { padding: 20px; border-radius: 18px; background: white; border: 1px solid rgba(0,0,0,0.05); display: flex; flex-direction: column; }
.dark .bdash__panel { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.bdash__panel-head { margin-bottom: 14px; }
.bdash__panel-title { font-size: 14px; font-weight: 700; color: #18181b; margin: 0; }
.dark .bdash__panel-title { color: white; }
.bdash__panel-link { display: block; text-align: right; font-size: 12px; font-weight: 600; color: var(--accent, #2563EB); margin-top: 14px; text-decoration: none; }

/* Issues list */
.bdash__issues { display: flex; flex-direction: column; gap: 10px; flex: 1; }
.bdash__issue-row { display: flex; align-items: center; gap: 10px; }
.bdash__issue-icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bdash__issue-label { flex: 1; font-size: 12.5px; color: #52525b; }
.dark .bdash__issue-label { color: #d4d4d8; }
.bdash__issue-count { font-size: 15px; font-weight: 800; }

/* Floors + tower */
.bdash__floors-wrap { display: flex; gap: 12px; flex: 1; }
.bdash__floors-list { flex: 1; display: flex; flex-direction: column; gap: 6px; justify-content: center; }
.bdash__floor-row { display: flex; align-items: center; gap: 8px; }
.bdash__floor-label { font-size: 10.5px; color: #a1a1aa; width: 44px; flex-shrink: 0; }
.bdash__floor-track { flex: 1; height: 6px; border-radius: 3px; background: rgba(0,0,0,0.06); overflow: hidden; }
.dark .bdash__floor-track { background: rgba(255,255,255,0.08); }
.bdash__floor-fill { height: 100%; border-radius: 3px; }
.bdash__floor-pct { font-size: 10.5px; font-weight: 700; color: #52525b; width: 30px; text-align: right; flex-shrink: 0; }
.dark .bdash__floor-pct { color: #d4d4d8; }
.bdash__tower { width: 76px; display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.bdash__tower-roof { width: 44px; height: 4px; border-radius: 2px 2px 0 0; background: rgba(0,0,0,0.15); }
.dark .bdash__tower-roof { background: rgba(255,255,255,0.2); }
.bdash__tower-floor { width: 48px; height: 15px; border: 1px solid rgba(255,255,255,0.4); border-top: none; }
.bdash__tower-base { display: flex; gap: 20px; margin-top: 4px; font-size: 16px; }

/* Requests */
.bdash__requests { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.bdash__request-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.bdash__request-title { font-size: 12.5px; font-weight: 600; color: #18181b; line-height: 1.3; }
.dark .bdash__request-title { color: white; }
.bdash__request-meta { font-size: 11px; color: #a1a1aa; margin-top: 2px; }
.bdash__request-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px; flex-shrink: 0; white-space: nowrap; }
.bdash__request-badge--new { background: rgba(59,130,246,0.1); color: #3b82f6; }
.bdash__request-badge--progress { background: rgba(245,158,11,0.1); color: #f59e0b; }
.bdash__request-badge--done { background: rgba(16,185,129,0.1); color: #10b981; }

/* Debts */
.bdash__debts { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.bdash__debt-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 12px; border-radius: 10px; background: rgba(239,68,68,0.04); }
.bdash__debt-name { font-size: 12.5px; font-weight: 600; color: #18181b; flex: 1; }
.dark .bdash__debt-name { color: white; }
.bdash__debt-amount { font-size: 12.5px; font-weight: 700; color: #18181b; }
.dark .bdash__debt-amount { color: white; }
.bdash__debt-days { font-size: 11px; font-weight: 600; color: #ef4444; white-space: nowrap; }

/* Approvals */
.bdash__approvals { display: flex; flex-direction: column; gap: 12px; flex: 1; }
.bdash__approval-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 12px; border-radius: 10px; background: rgba(59,130,246,0.04); }
.bdash__approval-title { font-size: 12.5px; font-weight: 600; color: #18181b; }
.dark .bdash__approval-title { color: white; }
.bdash__approval-meta { font-size: 11px; color: #a1a1aa; margin-top: 2px; }
.bdash__approval-time { font-size: 11px; font-weight: 600; color: #71717a; white-space: nowrap; }
</style>
