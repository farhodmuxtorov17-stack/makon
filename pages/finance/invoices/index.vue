
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Invoyslar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ invoices.length }} ta invoice · {{ formatPriceShort(totalAmount) }} so'm</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi invoice</button>
      </div>
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
          <input v-model="search" class="input pl-10" placeholder="Invoice nomeri..." />
        </div>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Barcha holatlar</option>
          <option value="PAID">To'langan</option>
          <option value="PARTIALLY_PAID">Qisman to'langan</option>
          <option value="OVERDUE">Muddati o'tgan</option>
          <option value="ISSUED">Berilgan</option>
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
              <th>Davr</th>
              <th>Summa</th>
              <th>Qoldiq</th>
              <th>Muddat</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in filtered" :key="inv.id" class="table-row-hover">
              <td class="text-white font-medium font-mono text-xs">{{ inv.number }}</td>
              <td>{{ getOrgName(inv.organizationId) }}</td>
              <td class="text-ink-400">{{ inv.period }}</td>
              <td class="text-white">{{ formatPriceShort(inv.amount) }}</td>
              <td :class="inv.balance > 0 ? 'text-amber-400' : 'text-emerald-400'">
                {{ formatPriceShort(inv.balance) }}
              </td>
              <td class="text-ink-400">{{ formatDate(inv.dueDate) }}</td>
              <td><span class="badge" :class="statusClass(inv.status)">{{ statusLabel(inv.status) }}</span></td>
              <td>
                <button class="text-ink-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5">
                  <Eye :size="16" />
                </button>
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
import { Plus, Download, Search, Eye, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-vue-next'
import { invoices, contracts } from '~/utils/mockData'
import type { InvoiceStatus } from '~/types'

const { formatPriceShort, formatDate } = useFormat()

const search = ref('')
const filterStatus = ref('')

const totalAmount = computed(() => invoices.reduce((s, i) => s + i.amount, 0))

const stats = [
  { label: 'Jami', value: formatPriceShort(totalAmount.value), icon: FileText, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { label: 'To\'langan', value: '4', icon: CheckCircle2, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { label: 'Qisman', value: '1', icon: Clock, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { label: 'Muddati o\'tgan', value: '2', icon: AlertTriangle, bg: 'bg-red-500/10', color: 'text-red-400' },
]

function getOrgName(id: string) {
  const c = contracts.find(c => c.organizationId === id)
  return c?.tenantName || '—'
}

function statusLabel(s: InvoiceStatus) {
  const m: Record<InvoiceStatus, string> = {
    DRAFT: 'Qoralama',
    ISSUED: 'Berilgan',
    PARTIALLY_PAID: 'Qisman',
    PAID: 'To\'langan',
    OVERDUE: 'Muddati o\'tgan',
    CANCELLED: 'Bekor qilingan',
  }
  return m[s]
}

function statusClass(s: InvoiceStatus) {
  const m: Record<InvoiceStatus, string> = {
    DRAFT: 'badge-neutral',
    ISSUED: 'badge-info',
    PARTIALLY_PAID: 'badge-warning',
    PAID: 'badge-success',
    OVERDUE: 'badge-danger',
    CANCELLED: 'badge-neutral',
  }
  return m[s]
}

const filtered = computed(() => {
  let r = [...invoices]
  if (search.value) r = r.filter(i => i.number.toLowerCase().includes(search.value.toLowerCase()))
  if (filterStatus.value) r = r.filter(i => i.status === filterStatus.value)
  return r
})
</script>
