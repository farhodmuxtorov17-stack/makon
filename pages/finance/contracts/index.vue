
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Shartnomalar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ contracts.length }} ta shartnoma</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi shartnoma</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="stat.bg">
            <component :is="stat.icon" :size="18" :class="stat.color" />
          </div>
          <div>
            <div class="text-lg font-bold text-white">{{ stat.value }}</div>
            <div class="text-xs text-ink-500">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" class="input pl-10" placeholder="Shartnoma nomeri..." />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Barcha holatlar</option>
          <option value="DRAFT">Qoralama</option>
          <option value="REVIEW">Ko'rib chiqilmoqda</option>
          <option value="ERI_PENDING">ERI kutilmoqda</option>
          <option value="SIGNED">Imzolangan</option>
          <option value="ACTIVE">Faol</option>
          <option value="EXPIRED">Muddati tugagan</option>
        </select>
        <select v-model="filterType" class="input w-auto">
          <option value="">Hammasi</option>
          <option value="RENT">Ijara</option>
          <option value="SALE">Sotuv</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Nomer</th>
              <th>Tashkilot</th>
              <th>Turi</th>
              <th>Boshlanish</th>
              <th>Tugash</th>
              <th>Oylik</th>
              <th>ERI</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered" :key="c.id" class="table-row-hover">
              <td class="text-white font-medium font-mono text-xs">{{ c.number }}</td>
              <td class="text-white">{{ c.tenantName }}</td>
              <td>
                <span class="badge" :class="c.type === 'RENT' ? 'badge-brand' : 'badge-success'">
                  {{ c.type === 'RENT' ? 'Ijara' : 'Sotuv' }}
                </span>
              </td>
              <td class="text-ink-400">{{ formatDate(c.startDate) }}</td>
              <td class="text-ink-400">{{ c.endDate ? formatDate(c.endDate) : '—' }}</td>
              <td class="text-white">{{ formatPriceShort(c.monthlyRent) }}</td>
              <td>
                <div class="flex items-center gap-1.5">
                  <ShieldCheck :size="14" :class="c.eriDocumentId ? 'text-emerald-400' : 'text-ink-600'" />
                  <span class="text-xs" :class="c.eriDocumentId ? 'text-emerald-400' : 'text-ink-500'">
                    {{ c.eriDocumentId ? 'Imzolangan' : 'Kutilmoqda' }}
                  </span>
                </div>
              </td>
              <td><span class="badge" :class="statusClass(c.status)">{{ statusLabel(c.status) }}</span></td>
              <td>
                <NuxtLink :to="`/finance/contracts/${c.id}`" class="text-brand-400 hover:text-brand-300 text-sm">
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
import { Plus, Search, ShieldCheck, FileText, CheckCircle2, Clock, XCircle } from 'lucide-vue-next'
import { contracts } from '~/utils/mockData'
import type { ContractStatus } from '~/types'

const { formatPriceShort, formatDate } = useFormat()

const search = ref('')
const filterStatus = ref('')
const filterType = ref('')

const stats = [
  { label: 'Jami', value: contracts.length, icon: FileText, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { label: 'Faol', value: contracts.filter(c => c.status === 'ACTIVE').length, icon: CheckCircle2, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { label: 'ERI kutilmoqda', value: contracts.filter(c => c.status === 'ERI_PENDING').length, icon: Clock, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { label: 'Muddati o\'tgan', value: contracts.filter(c => c.status === 'EXPIRED').length, icon: XCircle, bg: 'bg-red-500/10', color: 'text-red-400' },
]

function statusLabel(s: ContractStatus) {
  const m: Record<ContractStatus, string> = {
    DRAFT: 'Qoralama', REVIEW: 'Ko\'rib chiqilmoqda', ERI_PENDING: 'ERI kutilmoqda',
    SIGNED: 'Imzolangan', ACTIVE: 'Faol', EXPIRED: 'Muddati tugagan',
    TERMINATED: 'Bekor qilingan', COMPLETED: 'Yakunlangan',
  }
  return m[s]
}

function statusClass(s: ContractStatus) {
  const m: Record<ContractStatus, string> = {
    DRAFT: 'badge-neutral', REVIEW: 'badge-info', ERI_PENDING: 'badge-warning',
    SIGNED: 'badge-brand', ACTIVE: 'badge-success', EXPIRED: 'badge-danger',
    TERMINATED: 'badge-neutral', COMPLETED: 'badge-neutral',
  }
  return m[s]
}

const filtered = computed(() => {
  let r = [...contracts]
  if (search.value) r = r.filter(c => c.number.toLowerCase().includes(search.value.toLowerCase()))
  if (filterStatus.value) r = r.filter(c => c.status === filterStatus.value)
  if (filterType.value) r = r.filter(c => c.type === filterType.value)
  return r
})
</script>
