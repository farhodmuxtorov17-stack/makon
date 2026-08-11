<template>
  <div class="space-y-6">
    <!-- Hero Header -->
    <div class="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5" style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%);">
      
      
      <div class="relative p-6 lg:p-8 text-white">
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p class="text-white/60 text-sm font-medium mb-1">Super Rahbar Paneli</p>
            <h1 class="text-3xl font-bold text-white tracking-tight">Global Dashboard</h1>
            <p class="text-white/70 text-sm mt-1.5">Barcha obyektlar bo'yicha strategik monitoring va real vaqt rejimi</p>
          </div>
          <div class="flex items-center gap-2">
            <select v-model="period" class="text-sm rounded-xl px-3 py-2 bg-white/15 border border-white/20 text-white backdrop-blur-md cursor-pointer">
              <option value="month" class="text-ink-900">Oylik</option>
              <option value="quarter" class="text-ink-900">Choraklik</option>
              <option value="year" class="text-ink-900">Yillik</option>
            </select>
            <button class="btn btn-sm bg-white/15 text-white border border-white/20 hover:bg-white/25 backdrop-blur-md">
              <Download :size="14" /> Eksport
            </button>
          </div>
        </div>

        <!-- Quick stats inline -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div v-for="qs in quickStats" :key="qs.label" class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div class="text-white/60 text-xs">{{ qs.label }}</div>
            <div class="text-xl font-bold mt-0.5">{{ qs.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- KPI Cards with 3D Scene Icons -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div v-for="kpi in kpis" :key="kpi.label" class="kpi-card" :style="{ '--accent': kpi.color }">
        <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" :style="{ background: kpi.color }"></div>
        <div class="flex items-start justify-between mb-3">
          <!-- 3D Scene Icon -->
          <KpiScene3D :type="kpi.scene" :size="56" />
          <div v-if="kpi.trend" class="text-xs font-bold flex items-center gap-0.5" :class="kpi.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
            <component :is="kpi.trend > 0 ? ArrowUpRight : ArrowDownRight" :size="14" />
            {{ Math.abs(kpi.trend) }}%
          </div>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">{{ kpi.value }}</div>
        <div class="text-xs text-ink-500 mt-0.5">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Map + Side Panel -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Interactive Map -->
      <div class="card-premium p-0 lg:col-span-2 overflow-hidden">
        <div class="p-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-ink-900 dark:text-white">Obyektlar xaritasi</h3>
            <p class="text-xs text-ink-500 mt-0.5">Toshkent shahri bo'ylab {{ buildings.length }} ta faol bino</p>
          </div>
          <div class="flex items-center gap-2">
            <button
              v-for="t in mapTypes" :key="t.value"
              @click="mapType = t.value"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="mapType === t.value ? 'bg-brand-500 text-white' : 'bg-black/5 text-ink-500 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'"
            >
              {{ t.label }}
            </button>
          </div>
        </div>
        <div class="relative h-[420px]">
          <ClientOnly>
            <LMap
              ref="mapRef"
              :zoom="12"
              :center="[41.2995, 69.2405]"
              style="height: 100%; width: 100%;"
              @ready="onMapReady"
            >
              <LTileLayer :url="tileUrl" attribution="" />
              <LMarker
                v-for="b in buildings" :key="b.id"
                :lat-lng="[b.lat, b.lng]"
                @click="selectBuilding(b)"
              >
                <LIcon :icon-url="pinIcon(b)" :icon-size="[40, 40]" :icon-anchor="[20, 36]" />
                <LPopup>
                  <div class="p-2 min-w-[200px]">
                    <div class="font-bold text-sm text-ink-900 mb-1">{{ b.name }}</div>
                    <div class="text-xs text-ink-500 mb-2">{{ b.district }}, {{ b.address }}</div>
                    <div class="grid grid-cols-3 gap-2 text-center">
                      <div class="bg-black/5 rounded-lg p-1.5">
                        <div class="text-sm font-bold text-ink-900">{{ b.totalUnits }}</div>
                        <div class="text-[10px] text-ink-500">Unitlar</div>
                      </div>
                      <div class="bg-emerald-500/10 rounded-lg p-1.5">
                        <div class="text-sm font-bold text-emerald-600">{{ b.occupiedUnits }}</div>
                        <div class="text-[10px] text-ink-500">Band</div>
                      </div>
                      <div class="bg-brand-500/10 rounded-lg p-1.5">
                        <div class="text-sm font-bold text-brand-600">{{ b.vacantUnits }}</div>
                        <div class="text-[10px] text-ink-500">Bo'sh</div>
                      </div>
                    </div>
                    <button @click="navigateToBuilding(b)" class="mt-2 w-full py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-colors">
                      Bino sahifasiga o'tish →
                    </button>
                  </div>
                </LPopup>
              </LMarker>
            </LMap>
          </ClientOnly>
        </div>
      </div>

      <!-- Live Activity Feed -->
      <div class="card-premium p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-ink-900 dark:text-white">Faollik oqimi</h3>
          <div class="flex items-center gap-1.5 text-xs text-emerald-500">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Real vaqt
          </div>
        </div>
        <div class="space-y-3 max-h-[420px] overflow-y-auto tg-hide-scrollbar">
          <div v-for="act in activities" :key="act.id" class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :style="{ background: act.bg }">
              <component :is="act.icon" :size="16" :style="{ color: act.color }" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-ink-800 dark:text-ink-100 leading-snug">{{ act.title }}</p>
              <p class="text-xs text-ink-400 mt-0.5">{{ act.time }}</p>
            </div>
          </div>
        </div>
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
        <MakonChart type="area" :series="revenueSeries" :categories="months" :height="280" :colors="['#6366f1', '#10b981']" />
      </div>

      <div class="card-premium p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bandlik darajasi</h3>
        <MakonChart type="donut" :series="occupancyData" :donutLabels="['Band', 'Bo\'sh']" :height="280" :colors="['#6366f1', '#e4e4e7']" />
        <div class="grid grid-cols-2 gap-3 mt-4">
          <div class="text-center p-3 rounded-xl bg-brand-500/5">
            <div class="text-lg font-bold text-ink-900 dark:text-white">1,089</div>
            <div class="text-xs text-ink-500">Band unitlar</div>
          </div>
          <div class="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-lg font-bold text-ink-900 dark:text-white">159</div>
            <div class="text-xs text-ink-500">Bo'sh unitlar</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buildings Grid -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-xl font-bold text-ink-900 dark:text-white">Obyektlar</h2>
          <p class="text-sm text-ink-500 mt-0.5">Barcha binolar bo'yicha holat va statistika</p>
        </div>
        <NuxtLink to="/management/buildings" class="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1">
          Barchasini ko'rish <ArrowRight :size="14" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="b in buildings" :key="b.id" :to="`/buildings/${b.slug}`"
          class="card-premium card-hover group block"
        >
          <!-- Image -->
          <div class="relative h-44 overflow-hidden rounded-t-3xl">
            <img :src="b.gallery[0]" :alt="b.name" class="w-full h-full object-cover building-card-img" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <!-- Status badge -->
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-md" :class="b.isPublished ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'">
                {{ b.isPublished ? 'Faol' : 'Arxiv' }}
              </span>
            </div>
            <!-- Name on image -->
            <div class="absolute bottom-3 left-4 right-4">
              <h3 class="text-white font-bold text-lg leading-tight">{{ b.name }}</h3>
              <p class="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                <MapPin :size="12" /> {{ b.district }}, {{ b.city }}
              </p>
            </div>
          </div>

          <!-- Stats -->
          <div class="p-4">
            <!-- Occupancy bar -->
            <div class="mb-3">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="text-ink-500">Bandlik</span>
                <span class="font-bold" :class="occupancyPercent(b) > 80 ? 'text-emerald-500' : occupancyPercent(b) > 60 ? 'text-amber-500' : 'text-red-500'">
                  {{ occupancyPercent(b) }}%
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-bar-fill" :style="{ width: occupancyPercent(b) + '%', background: occupancyPercent(b) > 80 ? '#10b981' : occupancyPercent(b) > 60 ? '#f59e0b' : '#ef4444' }"></div>
              </div>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="p-2 rounded-xl bg-black/5 dark:bg-white/5">
                <div class="text-sm font-bold text-ink-900 dark:text-white">{{ b.totalUnits }}</div>
                <div class="text-[10px] text-ink-500">Jami</div>
              </div>
              <div class="p-2 rounded-xl bg-emerald-500/5">
                <div class="text-sm font-bold text-emerald-600 dark:text-emerald-400">{{ b.occupiedUnits }}</div>
                <div class="text-[10px] text-ink-500">Band</div>
              </div>
              <div class="p-2 rounded-xl bg-brand-500/5">
                <div class="text-sm font-bold text-brand-600 dark:text-brand-400">{{ b.vacantUnits }}</div>
                <div class="text-[10px] text-ink-500">Bo'sh</div>
              </div>
            </div>

            <!-- Bottom info -->
            <div class="flex items-center justify-between mt-3 pt-3 border-t border-black/5 dark:border-white/5">
              <div class="flex items-center gap-1.5 text-xs text-ink-500">
                <Layers :size="14" /> {{ b.floorsCount }} qavat
              </div>
              <div class="flex items-center gap-1.5 text-xs text-ink-500">
                <Maximize :size="14" /> {{ b.totalArea.toLocaleString() }} m²
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Bottom row: SLA + Alerts + Material -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card-premium p-6">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Servis SLA</h3>
        <MakonChart type="radialBar" :series="[94]" :height="200" :colors="['#10b981']" />
        <div class="grid grid-cols-3 gap-2 mt-2">
          <div class="text-center p-2 rounded-xl bg-emerald-500/5">
            <div class="text-sm font-bold text-emerald-500">94%</div>
            <div class="text-[10px] text-ink-500">Ichida</div>
          </div>
          <div class="text-center p-2 rounded-xl bg-amber-500/5">
            <div class="text-sm font-bold text-amber-500">4%</div>
            <div class="text-[10px] text-ink-500">Yaqin</div>
          </div>
          <div class="text-center p-2 rounded-xl bg-red-500/5">
            <div class="text-sm font-bold text-red-500">2%</div>
            <div class="text-[10px] text-ink-500">Buzilgan</div>
          </div>
        </div>
      </div>

      <div class="card-premium p-6">
        <div class="flex items-center gap-2 mb-4">
          <AlertCircle :size="18" class="text-red-500" />
          <h3 class="font-semibold text-ink-900 dark:text-white">Muddati o'tgan to'lovlar</h3>
        </div>
        <div class="space-y-2">
          <div v-for="alert in overdueAlerts" :key="alert.id" class="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
            <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Receipt :size="14" class="text-red-500" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ alert.tenant }}</div>
              <div class="text-xs text-ink-500">{{ alert.days }} kun o'tdi · {{ alert.amount }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-premium p-6">
        <div class="flex items-center gap-2 mb-4">
          <Package :size="18" class="text-amber-500" />
          <h3 class="font-semibold text-ink-900 dark:text-white">Material tasdiqlari</h3>
        </div>
        <div class="space-y-2">
          <div v-for="req in materialQueue" :key="req.id" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <Package :size="16" class="text-amber-500 flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-ink-900 dark:text-white truncate">{{ req.workOrder }}</div>
              <div class="text-xs text-ink-500">{{ req.building }} · {{ req.date }}</div>
            </div>
            <span class="badge badge-warning text-xs flex-shrink-0">{{ req.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, Layers, CheckCircle2, TrendingUp, AlertCircle, FileText,
  Receipt, Package, Download, ArrowUpRight, ArrowDownRight, ArrowRight,
  MapPin, Maximize, Users, DollarSign, Activity as ActivityIcon,
  ScrollText, Wrench, Eye
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const buildings = computed(() => makonStore.buildings.filter(b => !b.id.startsWith('_deleted')))

const period = ref('month')
const mapType = ref('street')
const selectedBuildingId = ref<string | null>(null)
const mapRef = ref()

const mapTypes = [
  { value: 'street', label: 'Ko\'cha' },
    { value: 'satellite', label: "Sun'iy yo'ldosh" }
]

const tileUrls: Record<string, string> = {
  street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
}

const tileUrl = computed(() => tileUrls[mapType.value])

function onMapReady() {
  // Map is ready
}

function pinIcon(b: any) {
  const color = b.occupiedUnits / b.totalUnits > 0.8 ? '#10b981' : b.occupiedUnits / b.totalUnits > 0.5 ? '#6366f1' : '#f59e0b'
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="18" r="16" fill="${color}" stroke="white" stroke-width="2.5"/>
    <text x="20" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="white" font-family="Inter,sans-serif">${b.totalUnits - b.vacantUnits}</text>
    <path d="M20 34 L14 24 L26 24 Z" fill="${color}" stroke="white" stroke-width="1"/>
  </svg>`
  return 'data:image/svg+xml;base64,' + btoa(svg)
}

function selectBuilding(b: any) {
  selectedBuildingId.value = b.id
}

function navigateToBuilding(b: any) {
  navigateTo(`/buildings/${b.slug}`)
}

function occupancyPercent(b: any) {
  return Math.round((b.occupiedUnits / b.totalUnits) * 100)
}

const quickStats = [
  { label: 'Jami tushum (oy)', value: '1.42 mlr so\'m' },
  { label: 'To\'lov darajasi', value: '94.2%' },
  { label: 'Faol shartnomalar', value: '1,089' },
  { label: 'Yangi arizalar (hafta)', value: '18' },
]

const kpis = [
  { scene: 'buildings', label: 'Binolar', value: '24', trend: 8, color: '#3b82f6' },
  { scene: 'units', label: 'Jami unitlar', value: '1,248', trend: 3, color: '#6366f1' },
  { scene: 'occupancy', label: 'Bandlik', value: '87.3%', trend: 2, color: '#10b981' },
  { scene: 'revenue', label: 'Oylik tushum', value: '1.42 mlr', trend: 12, color: '#f59e0b' },
  { scene: 'overdue', label: 'Muddati o\'tgan', value: '42', trend: -5, color: '#ef4444' },
  { scene: 'applications', label: 'Aktiv arizalar', value: '18', trend: 4, color: '#8b5cf6' },
]

const months = ['Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const revenueSeries = [
  { name: 'Tushum (mln so\'m)', data: [980, 1050, 1120, 1180, 1280, 1420] },
  { name: 'To\'langan (mln so\'m)', data: [850, 980, 1050, 1100, 1220, 1380] },
]
const occupancyData = [1089, 159]
const buildingRevenueSeries = [{ name: 'Tushum', data: [320, 580, 280, 180, 60] }]
const buildingNames = ['Trillant', 'Tashkent City', 'IT Park', 'Silk Road', 'Sergeli']
const funnelSeries = [{ name: 'Arizalar', data: [18, 12, 8, 5, 3] }]
const funnelLabels = ['Yangi', 'Tasdiqlangan', 'Shartnoma tayyor', 'Imzolangan', 'Aktiv']

const overdueAlerts = [
  { id: 1, tenant: 'Alpha Logistics LLC', days: 32, amount: '4,200,000 so\'m' },
  { id: 2, tenant: 'Nest One Boutique', days: 18, amount: '2,800,000 so\'m' },
  { id: 3, tenant: 'TechHub Solutions', days: 7, amount: '1,500,000 so\'m' },
  { id: 4, tenant: 'Global Trade Co.', days: 3, amount: '890,000 so\'m' },
]

const materialQueue = [
  { id: 1, workOrder: 'WO-2026-089', building: 'Trillant Tower A', date: '12-Aug', amount: '3.2M' },
  { id: 2, workOrder: 'WO-2026-091', building: 'IT Park Plaza', date: '14-Aug', amount: '1.8M' },
  { id: 3, workOrder: 'WO-2026-093', building: 'Tashkent City', date: '15-Aug', amount: '5.4M' },
]

const activities = [
  { id: 1, icon: ScrollText, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', title: 'Yangi shartnoma #C-2026-089 imzolandi — Trillant Tower A', time: '5 daqiqa avval' },
  { id: 2, icon: FileText, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', title: 'Alpha Logistics LLC ariza topshirdi — 420 m² ofis', time: '18 daqiqa avval' },
  { id: 3, icon: Receipt, color: '#10b981', bg: 'rgba(16,185,129,0.1)', title: 'Invoys #INV-0891 to\'landi — 3,200,000 so\'m', time: '1 soat avval' },
  { id: 4, icon: Wrench, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', title: 'Servis so\'rovi yangi — IT Park, HVAC ta\'mirlash', time: '2 soat avval' },
  { id: 5, icon: Eye, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', title: 'Listing ko\'rildi 142 marta — Silk Road Galleria', time: '3 soat avval' },
  { id: 6, icon: Users, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', title: 'Yangi ijarachi ro\'yxatga olindi — Nest One Boutique', time: '4 soat avval' },
  { id: 7, icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', title: 'To\'lov muddati o\'tdi — Global Trade Co.', time: '5 soat avval' },
  { id: 8, icon: ActivityIcon, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', title: 'Tungi hisoblash yakunlandi — 24 bino', time: '8 soat avval' },
]
</script>
