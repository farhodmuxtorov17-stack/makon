<template>
  <div class="space-y-6 animate-fade-up">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between">
      <div>
        <div class="eyebrow">DASHBOARD / EXECUTIVE</div>
        <h1 class="page-title">Ish stoli</h1>
        <p class="text-sm text-ink-400 mt-1">{{ store.buildings.length }} ta biznes markaz · {{ totalUnits }} ta unit</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn btn-secondary btn-md">
          <Download :size="16" /> Eksport
        </button>
        <button class="btn btn-primary btn-md">
          <Plus :size="16" /> Yangi obyekt
        </button>
      </div>
    </div>

    <!-- ═══ KPI Strip ═══ -->
    <div class="kpi-strip">
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon">
          <Building2 :size="28" :stroke-width="1.5" class="text-blue-500" />
        </div>
        <div>
          <div class="kpi-strip__value">{{ totalUnits }}</div>
          <div class="kpi-strip__label">Jami unitlar</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(5,150,105,0.06)">
          <Home :size="28" :stroke-width="1.5" class="text-emerald-500" />
        </div>
        <div>
          <div class="kpi-strip__value text-emerald-500">{{ occupiedUnits }}</div>
          <div class="kpi-strip__label">Band</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(217,119,6,0.06)">
          <Grid3x3 :size="28" :stroke-width="1.5" class="text-amber-500" />
        </div>
        <div>
          <div class="kpi-strip__value text-amber-500">{{ vacantUnits }}</div>
          <div class="kpi-strip__label">Bo'sh</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(37,99,235,0.06)">
          <FileText :size="28" :stroke-width="1.5" class="text-blue-500" />
        </div>
        <div>
          <div class="kpi-strip__value text-blue-500">{{ store.applications.length }}</div>
          <div class="kpi-strip__label">Arizalar</div>
        </div>
      </div>
      <div class="kpi-strip__card">
        <div class="kpi-strip__icon" style="background: rgba(124,58,237,0.06)">
          <FileSignature :size="28" :stroke-width="1.5" class="text-purple-500" />
        </div>
        <div>
          <div class="kpi-strip__value text-purple-500">{{ activeContracts }}</div>
          <div class="kpi-strip__label">Aktiv shartnomalar</div>
        </div>
      </div>
    </div>

    <!-- ═══ Occupancy Rate + Quick Stats ═══ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Occupancy Donut -->
      <div class="card p-5 lg:col-span-1">
        <div class="section-header">
          <div>
            <div class="section-header__title">Bandlik darajasi</div>
            <div class="section-header__sub">O'tgan oyga nisbatan +4.2%</div>
          </div>
          <div class="stat-pill stat-pill--success">
            <TrendingUp :size="14" />
            <span>{{ occupancyRate }}%</span>
          </div>
        </div>
        <div class="flex items-center justify-center py-4">
          <div class="relative w-[180px] h-[180px]">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-subtle)" stroke-width="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="url(#occ-grad)" stroke-width="8" stroke-linecap="round"
                :stroke-dasharray="`${occupancyRate * 2.64} 999`"
                style="transition: stroke-dasharray 1s var(--ease-out);"
              />
              <defs>
                <linearGradient id="occ-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#60A5FA" />
                  <stop offset="100%" stop-color="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-3xl font-extrabold text-ink-900 dark:text-white tabular-nums">{{ occupancyRate }}%</div>
              <div class="text-xs text-ink-400 mt-1">to'liq bandlik</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 mt-4">
          <div class="text-center p-2.5 rounded-xl bg-emerald-500/5">
            <div class="text-lg font-bold text-emerald-500 tabular-nums">{{ occupiedUnits }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Band</div>
          </div>
          <div class="text-center p-2.5 rounded-xl bg-amber-500/5">
            <div class="text-lg font-bold text-amber-500 tabular-nums">{{ vacantUnits }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Bo'sh</div>
          </div>
          <div class="text-center p-2.5 rounded-xl bg-purple-500/5">
            <div class="text-lg font-bold text-purple-500 tabular-nums">{{ store.buildings.length }}</div>
            <div class="text-[11px] text-ink-400 mt-0.5">Binolar</div>
          </div>
        </div>
      </div>

      <!-- Buildings Table -->
      <div class="card overflow-hidden lg:col-span-2">
        <div class="px-5 py-4 border-b border-ink-100 dark:border-white/10 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Binolar bo'yicha</h3>
          <NuxtLink to="/management/buildings" class="text-xs text-brand-500 hover:underline font-medium">Barchasi →</NuxtLink>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Bino</th>
              <th>Tuman</th>
              <th class="text-right">Unitlar</th>
              <th class="text-right">Bandlik</th>
              <th class="text-right">Bo'sh</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="building in store.buildings" :key="building.id"
              class="cursor-pointer"
              @click="navigateTo(`/management/buildings/${building.id}`)"
            >
              <td class="font-medium text-ink-900 dark:text-white">{{ building.name }}</td>
              <td class="text-ink-400">{{ building.district }}</td>
              <td class="text-right tabular-nums">{{ building.totalUnits }}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-2">
                  <div class="w-16 h-1.5 rounded-full bg-ink-100 dark:bg-white/5 overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-700"
                      :class="getOccupancyPct(building) > 85 ? 'bg-emerald-500' : 'bg-amber-500'"
                      :style="{ width: getOccupancyPct(building) + '%' }"
                    />
                  </div>
                  <span class="text-sm font-medium tabular-nums" :class="getOccupancyPct(building) > 85 ? 'text-emerald-500' : 'text-amber-500'">
                    {{ getOccupancyPct(building) }}%
                  </span>
                </div>
              </td>
              <td class="text-right text-ink-400 tabular-nums">{{ building.vacantUnits }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══ Recent Applications ═══ -->
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
          <tr>
            <th>Nomer</th>
            <th>Ism</th>
            <th>Unit</th>
            <th class="text-right">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="app in recentApplications" :key="app.id"
            class="cursor-pointer"
            @click="navigateTo(`/applications/${app.id}/offer`)"
          >
            <td class="font-medium text-ink-900 dark:text-white">{{ app.number }}</td>
            <td class="text-ink-600 dark:text-ink-300">{{ app.applicantName }}</td>
            <td class="text-ink-400">{{ app.unitNumber }}</td>
            <td class="text-right">
              <span class="badge" :class="statusBadge(app.status)">
                {{ statusLabel(app.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, Home, Grid3x3, FileText, FileSignature,
  Download, Plus, TrendingUp
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
  return {
    SUBMITTED: 'Yangi', OPERATION_APPROVED: 'Operatsiya', FINANCE_APPROVED: 'Moliya',
    DRAFT_READY: 'Qoralama', PARTIALLY_SIGNED: 'Imzolanmoqda', SIGNED: 'Imzolangan',
    ACTIVE: 'Faol', REJECTED: 'Rad', NEED_INFO: 'Info'
  }[s] || s
}

function statusBadge(s: string) {
  return {
    SUBMITTED: 'badge-info', OPERATION_APPROVED: 'badge-warning', FINANCE_APPROVED: 'badge-warning',
    DRAFT_READY: 'badge-purple', PARTIALLY_SIGNED: 'badge-warning', SIGNED: 'badge-success',
    ACTIVE: 'badge-success', REJECTED: 'badge-danger', NEED_INFO: 'badge-warning'
  }[s] || 'badge-neutral'
}

definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
