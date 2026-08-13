<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between mb-6">
      <div>
        <div class="eyebrow">Arizalar</div>
        <h1 class="page-title">Arizalar</h1>
      </div>
      <NuxtLink to="/applications/new" class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi ariza
      </NuxtLink>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ applications.length }}</div>
          <div class="dash-kpi__label">Jami arizalar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Clock :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.SUBMITTED }}</div>
          <div class="dash-kpi__label">Yangi</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.ACTIVE }}</div>
          <div class="dash-kpi__label">Faol</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--rose">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><XCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ statusCounts.REJECTED }}</div>
          <div class="dash-kpi__label">Rad etilgan</div>
        </div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap gap-3 mb-4">
      <input v-model="search" placeholder="Nomer, arizachi nomi..." class="input flex-1" />
      <select v-model="statusFilter" class="input max-w-[200px]">
        <option value="">Barcha status</option>
        <option value="SUBMITTED">Yangi</option>
        <option value="OPERATION_APPROVED">Operatsiya tasdiqlagan</option>
        <option value="FINANCE_APPROVED">Moliya tasdiqlagan</option>
        <option value="DRAFT_READY">Qoralama tayyor</option>
        <option value="PARTIALLY_SIGNED">Qisman imzolangan</option>
        <option value="SIGNED">Imzolangan</option>
        <option value="ACTIVE">Faol</option>
        <option value="REJECTED">Rad etilgan</option>
        <option value="NEED_INFO">Qo'shimcha ma'lumot</option>
      </select>
      <select v-model="typeFilter" class="input max-w-[160px]">
        <option value="">Barcha turlar</option>
        <option value="RENT">Ijara</option>
        <option value="SALE">Sotuv</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100">
            <th class="text-left text-xs text-ink-400 px-4 py-3">NOMER</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">ARIZACHI</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">BINO / UNIT</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">TUR</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">NARX</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">SANA</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">STATUS</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">AMAL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in filteredApps" :key="app.id" class="border-b border-ink-50 hover:bg-ink-50 cursor-pointer" @click="navigateTo(`/applications/${app.id}`)">
            <td class="px-4 py-3 text-sm font-medium text-ink-900">{{ app.number }}</td>
            <td class="px-4 py-3 text-sm text-ink-600">{{ app.applicantName }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ app.buildingName }} · {{ app.unitNumber }}</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="app.type === 'RENT' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'">
                {{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}
              </span>
            </td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900">{{ formatPrice(app) }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ formatDate(app.createdDate) }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <NuxtLink :to="`/applications/${app.id}`" class="text-brand-500 text-sm hover:underline">Ko'rish</NuxtLink>
            </td>
          </tr>
          <tr v-if="filteredApps.length === 0">
            <td colspan="8" class="text-center py-8 text-ink-400 text-sm">Arizalar topilmadi</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMakonStore } from '~/stores/makon'
import { FileText, Clock, CheckCircle, XCircle, Plus } from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'OPERATOR'], layout: 'admin', middleware: 'role' })

const store = useMakonStore()
const { applications } = store

const search = ref('')
const statusFilter = ref('')
const typeFilter = ref('')

const statusCounts = computed(() => {
  const counts: Record<string, number> = {}
  for (const app of applications) {
    counts[app.status] = (counts[app.status] || 0) + 1
  }
  return counts
})

const filteredApps = computed(() => {
  return applications.filter(app => {
    if (search.value) {
      const q = search.value.toLowerCase()
      if (!app.number.toLowerCase().includes(q) && !app.applicantName.toLowerCase().includes(q)) return false
    }
    if (statusFilter.value && app.status !== statusFilter.value) return false
    if (typeFilter.value && app.type !== typeFilter.value) return false
    return true
  })
})

function statusClass(status: string) {
  const map: Record<string, string> = {
    SUBMITTED: 'bg-amber-50 text-amber-600',
    OPERATION_APPROVED: 'bg-blue-50 text-blue-600',
    FINANCE_APPROVED: 'bg-indigo-50 text-indigo-600',
    DRAFT_READY: 'bg-purple-50 text-purple-600',
    PARTIALLY_SIGNED: 'bg-cyan-50 text-cyan-600',
    SIGNED: 'bg-emerald-50 text-emerald-600',
    ACTIVE: 'bg-green-50 text-green-600',
    REJECTED: 'bg-red-50 text-red-600',
    NEED_INFO: 'bg-orange-50 text-orange-600'
  }
  return map[status] || 'bg-gray-50 text-gray-600'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    SUBMITTED: 'Yangi',
    OPERATION_APPROVED: 'Operatsiya tasdiqlagan',
    FINANCE_APPROVED: 'Moliya tasdiqlagan',
    DRAFT_READY: 'Qoralama tayyor',
    PARTIALLY_SIGNED: 'Qisman imzo',
    SIGNED: 'Imzolangan',
    ACTIVE: 'Faol',
    REJECTED: 'Rad etilgan',
    NEED_INFO: "Qo'shimcha ma'lumot"
  }
  return map[status] || status
}

function formatPrice(app: any) {
  const val = app.offeredPrice?.toLocaleString('ru-RU') || '—'
  return `${val} ${app.currency || ''}`
}

function formatDate(date: string) {
  if (!date) return '—'
  try {
    return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  } catch { return date }
}
</script>
