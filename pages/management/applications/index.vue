
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Arizalar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ applications.length }} ta ariza</p>
      </div>
    </div>

    <!-- Funnel -->
    <div class="card p-6">
      <h3 class="text-white font-semibold mb-4">Ariza funnelsi</h3>
      <div class="flex items-center gap-2 overflow-x-auto pb-2">
        <div v-for="(stage, i) in funnelStages" :key="stage.id" class="flex items-center gap-2 flex-shrink-0">
          <div
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all"
            :class="stage.count > 0 ? 'bg-white/5 border-white/10' : 'opacity-40'"
          >
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="stage.bg">
              <span class="text-xs font-bold" :class="stage.color">{{ stage.count }}</span>
            </div>
            <div>
              <div class="text-sm text-white font-medium">{{ stage.label }}</div>
            </div>
          </div>
          <ChevronRight v-if="i < funnelStages.length - 1" :size="16" class="text-ink-700" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-white/5 flex items-center gap-3">
        <div class="relative flex-1 max-w-xs">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" class="input pl-10" placeholder="Ariza nomeri..." />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Barcha holatlar</option>
          <option v-for="s in statuses" :key="s.id" :value="s.id">{{ s.label }}</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Tashkilot</th>
              <th>Turi</th>
              <th>Taklif</th>
              <th>Sana</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in filtered" :key="a.id" class="table-row-hover">
              <td class="text-white font-medium font-mono text-xs">{{ a.number }}</td>
              <td class="text-white">{{ a.applicantName }}</td>
              <td>
                <span class="badge" :class="a.type === 'RENT' ? 'badge-brand' : 'badge-success'">
                  {{ a.type === 'RENT' ? 'Ijara' : 'Sotuv' }}
                </span>
              </td>
              <td class="text-white">{{ formatPriceShort(a.offeredPrice) }}</td>
              <td class="text-ink-400">{{ formatDate(a.submittedAt) }}</td>
              <td><span class="badge" :class="statusClass(a.status)">{{ statusLabel(a.status) }}</span></td>
              <td>
                <NuxtLink :to="`/applications/${a.id}`" class="text-brand-400 hover:text-brand-300 text-sm">
                  Ko'rish →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Search, ChevronRight } from 'lucide-vue-next'
import { applications } from '~/utils/mockData'
import type { ApplicationStatus } from '~/types'

const { formatPriceShort, formatDate } = useFormat()

const search = ref('')
const filterStatus = ref('')

const statuses = [
  { id: 'DRAFT', label: 'Qoralama' },
  { id: 'SUBMITTED', label: 'Yuborilgan' },
  { id: 'BUILDING_REVIEW', label: 'Bino ko\'rigi' },
  { id: 'FINANCE_REVIEW', label: 'Moliya ko\'rigi' },
  { id: 'OFFER_SENT', label: 'Taklif yuborilgan' },
  { id: 'OFFER_ACCEPTED', label: 'Taklif qabul' },
  { id: 'DOCUMENTS', label: 'Hujjatlar' },
  { id: 'ERI_PENDING', label: 'ERI kutilmoqda' },
  { id: 'APPROVED', label: 'Tasdiqlangan' },
  { id: 'REJECTED', label: 'Rad etilgan' },
  { id: 'CANCELLED', label: 'Bekor qilingan' },
  { id: 'COMPLETED', label: 'Yakunlangan' },
]

const funnelStages = [
  { id: 'SUBMITTED', label: 'Yuborilgan', count: applications.filter(a => a.status === 'SUBMITTED').length, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { id: 'BUILDING_REVIEW', label: 'Bino ko\'rigi', count: applications.filter(a => a.status === 'BUILDING_REVIEW').length, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { id: 'FINANCE_REVIEW', label: 'Moliya ko\'rigi', count: applications.filter(a => a.status === 'FINANCE_REVIEW').length, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { id: 'OFFER_SENT', label: 'Taklif', count: applications.filter(a => a.status === 'OFFER_SENT').length, bg: 'bg-purple-500/10', color: 'text-purple-400' },
  { id: 'ERI_PENDING', label: 'ERI', count: applications.filter(a => a.status === 'ERI_PENDING').length, bg: 'bg-orange-500/10', color: 'text-orange-400' },
  { id: 'APPROVED', label: 'Tasdiqlangan', count: applications.filter(a => a.status === 'APPROVED').length, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { id: 'REJECTED', label: 'Rad', count: applications.filter(a => a.status === 'REJECTED').length, bg: 'bg-red-500/10', color: 'text-red-400' },
]

function statusLabel(s: ApplicationStatus) {
  const m: Record<ApplicationStatus, string> = {
    DRAFT: 'Qoralama', SUBMITTED: 'Yuborilgan', BUILDING_REVIEW: 'Bino ko\'rigi',
    FINANCE_REVIEW: 'Moliya ko\'rigi', OFFER_SENT: 'Taklif yuborilgan',
    OFFER_ACCEPTED: 'Taklif qabul', DOCUMENTS: 'Hujjatlar', ERI_PENDING: 'ERI kutilmoqda',
    APPROVED: 'Tasdiqlangan', REJECTED: 'Rad etilgan', CANCELLED: 'Bekor qilingan',
    COMPLETED: 'Yakunlangan',
  }
  return m[s]
}

function statusClass(s: ApplicationStatus) {
  const m: Record<ApplicationStatus, string> = {
    DRAFT: 'badge-neutral', SUBMITTED: 'badge-info', BUILDING_REVIEW: 'badge-brand',
    FINANCE_REVIEW: 'badge-warning', OFFER_SENT: 'badge-brand', OFFER_ACCEPTED: 'badge-brand',
    DOCUMENTS: 'badge-info', ERI_PENDING: 'badge-warning', APPROVED: 'badge-success',
    REJECTED: 'badge-danger', CANCELLED: 'badge-neutral', COMPLETED: 'badge-neutral',
  }
  return m[s]
}

const filtered = computed(() => {
  let r = [...applications]
  if (search.value) r = r.filter(a => a.number.toLowerCase().includes(search.value.toLowerCase()))
  if (filterStatus.value) r = r.filter(a => a.status === filterStatus.value)
  return r
})
</script>
