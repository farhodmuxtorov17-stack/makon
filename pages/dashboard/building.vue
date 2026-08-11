<template>
  <div class="space-y-6">
    <!-- Hero with building image -->
    <div class="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 h-44">
      <img :src="selectedBuilding.gallery[0]" :alt="selectedBuilding.name" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/70 to-ink-950/30"></div>
      <div class="relative h-full p-6 flex items-end">
        <div class="text-white">
          <div class="flex items-center gap-2 mb-2">
            <span class="badge bg-white/15 text-white border border-white/20 backdrop-blur-md">{{ typeLabel(selectedBuilding.type) }}</span>
            <span class="badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">{{ selectedBuilding.vacantUnits }} bo'sh</span>
          </div>
          <h1 class="text-2xl font-bold text-white">{{ selectedBuilding.name }}</h1>
          <p class="text-white/60 text-sm mt-0.5 flex items-center gap-1">
            <MapPin :size="14" /> {{ selectedBuilding.district }}, {{ selectedBuilding.city }} · {{ selectedBuilding.floorsCount }} qavat · {{ selectedBuilding.totalUnits }} unit
          </p>
        </div>
        <select v-model="selectedId" class="ml-auto bg-white/10 text-white text-sm rounded-xl px-3 py-2 border border-white/20 bg-white/10">
          <option v-for="b in buildings" :key="b.id" :value="b.id" class="text-ink-900">{{ b.name }}</option>
        </select>
      </div>
    </div>

    <!-- KPI Row -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card">
        <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" :style="{ background: kpi.color }"></div>
        <div class="flex items-start justify-between mb-2">
          <KpiCard :icon="kpi.icon || Building2" :label="kpi.label" :value="kpi.value" :trend="kpi.trend" :icon-bg="kpi.iconBg" :icon-color="kpi.iconColor" />
          <span v-if="kpi.trend" class="text-xs font-bold flex items-center gap-0.5" :class="kpi.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
            <ArrowUpRight v-if="kpi.trend > 0" :size="12" />{{ Math.abs(kpi.trend) }}%
          </span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ kpi.value }}</div>
        <div class="text-xs text-ink-500 mt-0.5">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card-premium p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Tushum dinamikasi</h3>
          <div class="flex items-center gap-3 text-xs text-ink-500">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-500"></span> Tushum</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> To'langan</span>
          </div>
        </div>
        <MakonChart type="area" :series="revenueSeries" :categories="months" :height="260" :colors="['#6366f1', '#10b981']" />
      </div>

      <div class="card-premium p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bandlik</h3>
        <MakonChart type="donut" :series="occupancyData" :donutLabels="['Band', 'Bo\'sh']" :height="200" :colors="['#6366f1', '#e4e4e7']" />
        <div class="text-center mt-2">
          <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ occupancyPercent }}%</div>
          <div class="text-xs text-ink-500">Umumiy bandlik darajasi</div>
        </div>
      </div>
    </div>

    <!-- Floor heatmap + Recent activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Floor heatmap -->
      <div class="card-premium p-6 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Qavat bo'yicha bandlik</h3>
          <div class="flex items-center gap-3 text-xs">
            <span class="flex items-center gap-1.5 text-ink-500"><span class="w-3 h-3 rounded bg-emerald-500/60"></span> Band</span>
            <span class="flex items-center gap-1.5 text-ink-500"><span class="w-3 h-3 rounded bg-amber-500/30"></span> Bo'sh</span>
          </div>
        </div>
        <div class="space-y-1.5 max-h-[340px] overflow-y-auto tg-hide-scrollbar">
          <div v-for="floor in floors" :key="floor.num" class="flex items-center gap-3 group cursor-pointer rounded-lg p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <span class="text-xs text-ink-500 w-12 font-medium">{{ floor.num }}-qavat</span>
            <div class="flex-1 h-7 rounded-lg overflow-hidden flex bg-black/5 dark:bg-white/5">
              <div class="h-full transition-all duration-500" :style="{ width: floor.occupied + '%', background: floor.occupied > 85 ? '#10b981' : floor.occupied > 65 ? '#6366f1' : '#f59e0b', opacity: 0.7 }"></div>
            </div>
            <div class="text-xs text-ink-500 w-20 text-right">
              <span class="font-medium text-ink-700 dark:text-ink-200">{{ floor.occupied }}%</span>
              · {{ floor.vacant }} bo'sh
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="space-y-4">
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-3">Tezkor amallar</h3>
          <div class="space-y-2">
            <NuxtLink to="/management/units" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-brand-500/5 transition-colors group">
              <div class="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center"><Layers :size="16" class="text-brand-500" /></div>
              <div class="flex-1"><div class="text-sm font-medium text-ink-900 dark:text-white">Unitlar boshqaruvi</div><div class="text-xs text-ink-500">{{ selectedBuilding.totalUnits }} ta unit</div></div>
              <ArrowRight :size="16" class="text-ink-400 group-hover:text-brand-500 transition-colors" />
            </NuxtLink>
            <NuxtLink to="/management/listings" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-brand-500/5 transition-colors group">
              <div class="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center"><Tag :size="16" class="text-amber-500" /></div>
              <div class="flex-1"><div class="text-sm font-medium text-ink-900 dark:text-white">Listinglar</div><div class="text-xs text-ink-500">Bo'sh maydon e'lonlari</div></div>
              <ArrowRight :size="16" class="text-ink-400 group-hover:text-brand-500 transition-colors" />
            </NuxtLink>
            <NuxtLink to="/management/service-requests" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-brand-500/5 transition-colors group">
              <div class="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center"><Wrench :size="16" class="text-red-500" /></div>
              <div class="flex-1"><div class="text-sm font-medium text-ink-900 dark:text-white">Servis so'rovlari</div><div class="text-xs text-ink-500">{{ slaList.length }} ta ochiq</div></div>
              <ArrowRight :size="16" class="text-ink-400 group-hover:text-brand-500 transition-colors" />
            </NuxtLink>
            <NuxtLink :to="`/buildings/${selectedBuilding.slug}`" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-brand-500/5 transition-colors group">
              <div class="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center"><MapPin :size="16" class="text-indigo-500" /></div>
              <div class="flex-1"><div class="text-sm font-medium text-ink-900 dark:text-white">Bino sahifasi</div><div class="text-xs text-ink-500">Ochiq ko'rinish</div></div>
              <ArrowRight :size="16" class="text-ink-400 group-hover:text-brand-500 transition-colors" />
            </NuxtLink>
          </div>
        </div>

        <!-- SLA status -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-3">SLA holati</h3>
          <div class="space-y-2">
            <div v-for="sr in slaList" :key="sr.id" class="flex items-center gap-3 p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="srSlaClass(sr.sla)">
                <Clock :size="14" :class="srSlaColor(sr.sla)" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-medium text-ink-900 dark:text-white truncate">{{ sr.number }}</div>
                <div class="text-[11px] text-ink-500 truncate">{{ sr.category }} · {{ sr.unit }}</div>
              </div>
              <span class="text-xs font-medium flex-shrink-0" :class="srSlaColor(sr.sla)">{{ sr.timeLeft }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Queue -->
    <div class="card-premium p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Ariza navbati</h3>
        <NuxtLink to="/management/applications" class="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
          Barchasi <ArrowRight :size="14" />
        </NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="pb-3 font-medium">Ariza</th>
              <th class="pb-3 font-medium">Unit</th>
              <th class="pb-3 font-medium">Turi</th>
              <th class="pb-3 font-medium">Holati</th>
              <th class="pb-3 font-medium text-right">Vaqt</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in appQueue" :key="app.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer">
              <td class="py-3"><span class="font-medium text-ink-900 dark:text-white">{{ app.number }}</span></td>
              <td class="py-3 text-ink-600 dark:text-ink-400">{{ app.unit }}</td>
              <td class="py-3 text-ink-600 dark:text-ink-400">{{ app.type }}</td>
              <td class="py-3"><span class="badge text-xs" :class="appBadge(app.status)">{{ appLabel(app.status) }}</span></td>
              <td class="py-3 text-right text-xs text-ink-500">{{ app.time }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import {
  CheckCircle2, AlertCircle, Tag, FileText, Wrench, Clock, Layers,
  MapPin, ArrowRight, ArrowUpRight, TrendingUp, Users
} from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const buildings = computed(() => makonStore.buildings.filter(b => !b.id.startsWith('_deleted')))
const selectedId = ref(buildings.value[0]?.id || 'b1')
const selectedBuilding = computed(() => buildings.value.find(b => b.id === selectedId.value) || buildings.value[0])

function typeLabel(t: string) { return BUILDING_TYPE_LABELS[t]?.uz || t }

const occupancyPercent = computed(() => {
  const b = selectedBuilding.value
  return Math.round((b.occupiedUnits / b.totalUnits) * 100)
})

const kpis = computed(() => [
  { scene: 'occupancy', label: 'Band unitlar', value: selectedBuilding.value.occupiedUnits, trend: 3 },
  { scene: 'units', label: 'Bo\'sh unitlar', value: selectedBuilding.value.vacantUnits, trend: -2 },
  { scene: 'applications', label: 'Aktiv listinglar', value: 28, trend: 5 },
  { scene: 'applications', label: 'Ariza navbati', value: 12, trend: 1 },
  { scene: 'overdue', label: 'Ochiq servis', value: 5, trend: -1 },
])

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const revenueSeries = [
  { name: 'Tushum (mln so\'m)', data: [85, 92, 98, 105, 112, 118] },
  { name: 'To\'langan (mln so\'m)', data: [78, 88, 95, 102, 108, 115] },
]
const occupancyData = computed(() => [selectedBuilding.value.occupiedUnits, selectedBuilding.value.vacantUnits])

const floors = [
  { num: 12, occupied: 95, vacant: 2 },
  { num: 11, occupied: 88, vacant: 4 },
  { num: 10, occupied: 92, vacant: 3 },
  { num: 9, occupied: 85, vacant: 5 },
  { num: 8, occupied: 90, vacant: 4 },
  { num: 7, occupied: 78, vacant: 8 },
  { num: 6, occupied: 82, vacant: 6 },
  { num: 5, occupied: 95, vacant: 2 },
  { num: 4, occupied: 70, vacant: 10 },
  { num: 3, occupied: 88, vacant: 4 },
  { num: 2, occupied: 95, vacant: 2 },
  { num: 1, occupied: 60, vacant: 15 },
]

const appQueue = [
  { id: 'a1', number: 'APP-089', unit: 'A-1201', type: 'Ijara', time: '1 soat oldin', status: 'SUBMITTED' },
  { id: 'a2', number: 'APP-087', unit: 'C-805', type: 'Ijara', time: '3 soat oldin', status: 'OPERATION_REVIEW' },
  { id: 'a3', number: 'APP-085', unit: 'B-402', type: 'Sotib olish', time: '5 soat oldin', status: 'FINANCE_REVIEW' },
  { id: 'a4', number: 'APP-083', unit: 'D-301', type: 'Ijara', time: '1 kun oldin', status: 'DRAFT_READY' },
  { id: 'a5', number: 'APP-081', unit: 'E-201', type: 'Ijara', time: '2 kun oldin', status: 'SIGNED' },
]

const slaList = [
  { id: 's1', number: 'SR-2026-008', category: 'Elektr', unit: 'A-1201', sla: 'OK', timeLeft: '3h qoldi' },
  { id: 's2', number: 'SR-2026-007', category: 'Sanitariya', unit: 'C-805', sla: 'WARNING', timeLeft: '45m qoldi' },
  { id: 's3', number: 'SR-2026-006', category: 'Konditsioner', unit: 'B-402', sla: 'BREACH', timeLeft: '2h o\'tdi' },
]

function appLabel(s: string) { return { SUBMITTED: 'Yangi', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy', DRAFT_READY: 'Loyiha', SIGNED: 'Imzolangan' }[s] || s }
function appBadge(s: string) { return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', DRAFT_READY: 'badge-warning', SIGNED: 'badge-success' }[s] || 'badge-neutral' }
function srSlaClass(s: string) { return { OK: 'bg-emerald-500/10', WARNING: 'bg-amber-500/10', BREACH: 'bg-red-500/10' }[s] || 'bg-black/5' }
function srSlaColor(s: string) { return { OK: 'text-emerald-500', WARNING: 'text-amber-500', BREACH: 'text-red-500' }[s] || 'text-ink-500' }
</script>
