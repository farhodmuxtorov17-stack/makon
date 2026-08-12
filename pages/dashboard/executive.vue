<template>
  <div class="space-y-6 animate-fade-up">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">DASHBOARD / EXECUTIVE</div>
        <h1 class="page-title">Ish stoli</h1>
        <p class="text-sm text-ink-400 mt-1">{{ store.buildings.length }} ta biznes markaz · {{ totalUnits }} ta unit</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn btn-secondary btn-md" @click="() => {}">
          <Download :size="16" /> Eksport
        </button>
        <button class="btn btn-primary btn-md" @click="navigateTo('/management/buildings')">
          <Plus :size="16" /> Yangi obyekt
        </button>
      </div>
    </div>

    <!-- Premium KPI Strip -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="24" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalUnits }}</div>
          <div class="dash-kpi__label">Jami unitlar</div>
        </div>
        <div class="dash-kpi__trend dash-kpi__trend--up"><ArrowUpRight :size="14" /> +12</div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Home :size="24" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ occupiedUnits }}</div>
          <div class="dash-kpi__label">Band</div>
        </div>
        <div class="dash-kpi__trend dash-kpi__trend--up"><ArrowUpRight :size="14" /> +8</div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="24" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ vacantUnits }}</div>
          <div class="dash-kpi__label">Bo'sh</div>
        </div>
        <div class="dash-kpi__trend dash-kpi__trend--down"><ArrowDownRight :size="14" /> -3</div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="24" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ store.applications.length }}</div>
          <div class="dash-kpi__label">Arizalar</div>
        </div>
        <div class="dash-kpi__trend dash-kpi__trend--up"><ArrowUpRight :size="14" /> +5</div>
      </div>
      <div class="dash-kpi dash-kpi--rose">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="24" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeContracts }}</div>
          <div class="dash-kpi__label">Aktiv shartnomalar</div>
        </div>
        <div class="dash-kpi__trend dash-kpi__trend--up"><ArrowUpRight :size="14" /> +2</div>
      </div>
    </div>

    <!-- Occupancy + Buildings Table -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="card p-5 lg:col-span-1 flex flex-col">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Bandlik darajasi</h3>
            <p class="text-xs text-ink-400 mt-0.5">O'tgan oyga nisbatan +4.2%</p>
          </div>
          <div class="stat-pill stat-pill--success"><TrendingUp :size="14" /><span>{{ occupancyRate }}%</span></div>
        </div>
        <div class="flex items-center justify-center py-6 flex-1">
          <div class="relative w-[180px] h-[180px]">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-subtle)" stroke-width="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#occ-grad)" stroke-width="8" stroke-linecap="round" :stroke-dasharray="`${occupancyRate * 2.64} 999`" style="transition: stroke-dasharray 1s var(--ease-out);" />
              <defs>
                <linearGradient id="occ-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#60A5FA" /><stop offset="100%" stop-color="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-3xl font-extrabold text-ink-900 dark:text-white tabular-nums">{{ occupancyRate }}%</div>
              <div class="text-xs text-ink-400 mt-1">to'liq bandlik</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div class="text-center p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div class="text-lg font-bold text-emerald-500 tabular-nums">{{ occupiedUnits }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Band</div>
          </div>
          <div class="text-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <div class="text-lg font-bold text-amber-500 tabular-nums">{{ vacantUnits }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Bo'sh</div>
          </div>
          <div class="text-center p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <div class="text-lg font-bold text-purple-500 tabular-nums">{{ store.buildings.length }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Binolar</div>
          </div>
        </div>
      </div>

      <div class="card overflow-hidden lg:col-span-2 flex flex-col">
        <div class="px-5 py-4 border-b border-ink-100 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Binolar bo'yicha</h3>
          <NuxtLink to="/management/buildings" class="text-xs text-brand-500 hover:underline font-medium">Barchasi →</NuxtLink>
        </div>
        <table class="data-table flex-1">
          <thead>
            <tr>
              <th>Bino</th><th>Tuman</th><th class="text-right">Unitlar</th><th class="text-right">Bandlik</th><th class="text-right">Bo'sh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="building in store.buildings" :key="building.id" class="cursor-pointer" @click="navigateTo(`/management/buildings/${building.id}`)">
              <td class="font-medium text-ink-900 dark:text-white">{{ building.name }}</td>
              <td class="text-ink-400">{{ building.district }}</td>
              <td class="text-right tabular-nums">{{ building.totalUnits }}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <div class="w-16 h-1.5 rounded-full bg-ink-100 dark:bg-white/5 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700" :class="getOccupancyPct(building) > 85 ? 'bg-emerald-500' : 'bg-amber-500'" :style="{ width: getOccupancyPct(building) + '%' }" />
                  </div>
                  <span class="text-sm font-medium tabular-nums" :class="getOccupancyPct(building) > 85 ? 'text-emerald-500' : 'text-amber-500'">{{ getOccupancyPct(building) }}%</span>
                </div>
              </td>
              <td class="text-right text-ink-400 tabular-nums">{{ building.vacantUnits }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recent Applications -->
    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-ink-100 dark:border-white/10 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-semibold text-ink-900 dark:text-white">So'nggi arizalar</h3>
          <p class="text-xs text-ink-400 mt-0.5">Oxirgi 5 ta ariza</p>
        </div>
        <NuxtLink to="/management/applications" class="text-xs text-brand-500 hover:underline font-medium">Barchasi →</NuxtLink>
      </div>
      <table class="data-table">
        <thead>
          <tr><th>Nomer</th><th>Ism</th><th>Unit</th><th class="text-right">Status</th></tr>
        </thead>
        <tbody>
          <tr v-for="app in recentApplications" :key="app.id" class="cursor-pointer" @click="navigateTo(`/applications/${app.id}/offer`)">
            <td class="font-medium text-ink-900 dark:text-white">{{ app.number }}</td>
            <td class="text-ink-600 dark:text-ink-300">{{ app.applicantName }}</td>
            <td class="text-ink-400">{{ app.unitNumber }}</td>
            <td class="text-right"><span class="badge" :class="statusBadge(app.status)">{{ statusLabel(app.status) }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN'],  layout: "admin", middleware: "role" })
import {
  Building2, Home, Grid3x3, FileText, FileSignature,
  Download, Plus, TrendingUp, ArrowUpRight, ArrowDownRight
} from 'lucide-vue-next'

const store = useMakonStore()

const totalUnits = computed(() => store.buildings.reduce((s, b) => s + b.totalUnits, 0))
const occupiedUnits = computed(() => store.buildings.reduce((s, b) => s + b.occupiedUnits, 0))
const vacantUnits = computed(() => store.buildings.reduce((s, b) => s + b.vacantUnits, 0))
const activeContracts = computed(() => store.contracts.filter(c => c.status === 'ACTIVE').length)
const occupancyRate = computed(() => totalUnits.value ? Math.round(occupiedUnits.value / totalUnits.value * 100) : 0)
const recentApplications = computed(() => store.applications.slice(0, 5))

function getOccupancyPct(b: any) {
  return b.totalUnits ? Math.round(b.occupiedUnits / b.totalUnits * 100) : 0
}

function statusLabel(s: string) {
  return { SUBMITTED: 'Yangi', OPERATION_APPROVED: 'Operatsiya', FINANCE_APPROVED: 'Moliya', DRAFT_READY: 'Qoralama', PARTIALLY_SIGNED: 'Imzolanmoqda', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad', NEED_INFO: 'Info' }[s] || s
}

function statusBadge(s: string) {
  return { SUBMITTED: 'bg-blue-500/10 text-blue-500', OPERATION_APPROVED: 'bg-amber-500/10 text-amber-500', FINANCE_APPROVED: 'bg-amber-500/10 text-amber-500', DRAFT_READY: 'bg-purple-500/10 text-purple-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', ACTIVE: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500', NEED_INFO: 'bg-orange-500/10 text-orange-500' }[s] || ''
}
</script>

<style scoped>
.dash-kpi {
  position: relative; background: var(--bg-card); border: 1px solid var(--border);
  border-radius: 18px; padding: 18px; display: flex; align-items: center; gap: 14px;
  overflow: hidden; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.03), 0 1px 2px rgba(0,0,0,0.02);
}
.dash-kpi:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03); }
.dash-kpi__glow { position: absolute; top: -40%; right: -30%; width: 120px; height: 120px; border-radius: 50%; opacity: 0.08; filter: blur(30px); pointer-events: none; transition: opacity 0.3s; }
.dash-kpi:hover .dash-kpi__glow { opacity: 0.18; }
.dash-kpi--blue .dash-kpi__glow { background: #3B82F6; }
.dash-kpi--emerald .dash-kpi__glow { background: #10B981; }
.dash-kpi--amber .dash-kpi__glow { background: #F59E0B; }
.dash-kpi--violet .dash-kpi__glow { background: #8B5CF6; }
.dash-kpi--rose .dash-kpi__glow { background: #F43F5E; }
.dash-kpi__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi--blue .dash-kpi__icon { background: rgba(59,130,246,0.08); color: #3B82F6; }
.dash-kpi--emerald .dash-kpi__icon { background: rgba(16,185,129,0.08); color: #10B981; }
.dash-kpi--amber .dash-kpi__icon { background: rgba(245,158,11,0.08); color: #F59E0B; }
.dash-kpi--violet .dash-kpi__icon { background: rgba(139,92,246,0.08); color: #8B5CF6; }
.dash-kpi--rose .dash-kpi__icon { background: rgba(244,63,94,0.08); color: #F43F5E; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 24px; font-weight: 800; line-height: 1.1; color: var(--text); letter-spacing: -0.02em; }
.dash-kpi__label { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.dash-kpi__trend { position: absolute; top: 12px; right: 14px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 2px; }
.dash-kpi__trend--up { color: #10B981; }
.dash-kpi__trend--down { color: #EF4444; }
.dark .dash-kpi { background: rgba(24,24,27,0.6); border-color: rgba(255,255,255,0.06); }
.dark .dash-kpi:hover { border-color: rgba(255,255,255,0.1); }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th { text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); padding: 12px 20px; background: var(--bg-subtle); border-bottom: 1px solid var(--border); }
.data-table td { padding: 14px 20px; font-size: 14px; border-bottom: 1px solid var(--border); transition: background 0.15s; }
.data-table tbody tr:last-child td { border-bottom: none; }
.data-table tbody tr:hover { background: var(--bg-subtle); }
.stat-pill { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; }
.stat-pill--success { background: rgba(16,185,129,0.08); color: #10B981; }
.badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600; }
</style>
