<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="eyebrow">DASHBOARD / EXECUTIVE</div>
        <h1 class="page-title">Ish stoli</h1>
        <p class="text-sm text-ink-400 mt-0.5">{{ store.buildings.length }} ta biznes markaz</p>
      </div>
    </div>

    <!-- 3D KPI Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="card p-4 flex items-center gap-3">
        <Building2 :size="48" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" />
        <div>
          <div class="text-xs text-ink-400 mb-0.5">Jami unitlar</div>
          <div class="text-lg font-bold text-ink-900 dark:text-white">{{ totalUnits }}</div>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Home :size="48" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" />
        <div>
          <div class="text-xs text-ink-400 mb-0.5">Band</div>
          <div class="text-lg font-bold text-emerald-500">{{ totalOccupied }}</div>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Grid3x3 :size="48" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" />
        <div>
          <div class="text-xs text-ink-400 mb-0.5">Bo'sh</div>
          <div class="text-lg font-bold text-amber-500">{{ totalVacant }}</div>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <FileText :size="48" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" />
        <div>
          <div class="text-xs text-ink-400 mb-0.5">Arizalar</div>
          <div class="text-lg font-bold text-blue-500">{{ store.applications.length }}</div>
        </div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <FileSignature :size="48" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" />
        <div>
          <div class="text-xs text-ink-400 mb-0.5">Shartnomalar</div>
          <div class="text-lg font-bold text-ink-900 dark:text-white">{{ activeContracts }}</div>
        </div>
      </div>
    </div>

    <!-- Buildings table -->
    <div class="card overflow-hidden">
      <div class="px-4 py-3 border-b border-ink-100 dark:border-white/10">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Binolar bo'yicha</h3>
      </div>
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Bino</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Tuman</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Unitlar</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Bandlik</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Bo'sh</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in store.buildings" :key="b.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5 cursor-pointer" @click="navigateTo(`/management/buildings/${b.id}`)">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ b.name }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ b.district }}</td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ b.totalUnits }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-medium" :class="occupancyPct(b) > 85 ? 'text-emerald-500' : 'text-amber-500'">{{ occupancyPct(b) }}%</span>
            </td>
            <td class="px-4 py-3 text-right text-sm text-ink-400">{{ b.vacantUnits }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Recent applications -->
    <div class="card overflow-hidden mt-6">
      <div class="px-4 py-3 border-b border-ink-100 dark:border-white/10 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white">So'nggi arizalar</h3>
        <NuxtLink to="/management/applications" class="text-xs text-brand-500 hover:underline">Barchasi →</NuxtLink>
      </div>
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Nomer</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Ism</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in recentApps" :key="a.id" class="border-b border-ink-50 dark:border-white/5 cursor-pointer" @click="navigateTo(`/applications/${a.id}/offer`)">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ a.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ a.applicantName }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ a.unitNumber }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="appStatusClass(a.status)">{{ appStatusLabel(a.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
import { Building2, Home, Grid3x3, FileText, FileSignature } from 'lucide-vue-next'

const store = useMakonStore()

const totalUnits = computed(() => store.buildings.reduce((s, b) => s + b.totalUnits, 0))
const totalOccupied = computed(() => store.buildings.reduce((s, b) => s + b.occupiedUnits, 0))
const totalVacant = computed(() => store.buildings.reduce((s, b) => s + b.vacantUnits, 0))
const activeContracts = computed(() => store.contracts.filter(c => c.status === 'ACTIVE').length)
const recentApps = computed(() => store.applications.slice(0, 5))

function occupancyPct(b: any) {
  return b.totalUnits ? Math.round((b.occupiedUnits / b.totalUnits) * 100) : 0
}

function appStatusLabel(s: string) {
  return { SUBMITTED: 'Yangi', OPERATION_APPROVED: 'Operatsiya', FINANCE_APPROVED: 'Moliya', DRAFT_READY: 'Qoralama', PARTIALLY_SIGNED: 'Imzolanmoqda', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad', NEED_INFO: 'Info' }[s] || s
}
function appStatusClass(s: string) {
  return { SUBMITTED: 'bg-blue-500/10 text-blue-500', OPERATION_APPROVED: 'bg-amber-500/10 text-amber-500', FINANCE_APPROVED: 'bg-amber-500/10 text-amber-500', DRAFT_READY: 'bg-purple-500/10 text-purple-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', ACTIVE: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500', NEED_INFO: 'bg-orange-500/10 text-orange-500' }[s] || ''
}
</script>
