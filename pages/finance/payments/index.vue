<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">To'lovlar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ filtered.length }} to'lov</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" :stroke-width="2" />
        Yangi to'lov
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-success-50 flex items-center justify-center">
            <Wallet :size="18" :stroke-width="2" class="text-success-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(totalPaid) }}</p>
            <p class="text-xs text-ink-500">Jami to'lovlar, so'm</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
            <CalendarClock :size="18" :stroke-width="2" class="text-brand-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(thisMonth) }}</p>
            <p class="text-xs text-ink-500">Bu oy, so'm</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-warning-50 flex items-center justify-center">
            <Hourglass :size="18" :stroke-width="2" class="text-warning-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">
              {{ filtered.filter((p) => p.status === 'PENDING').length }}
            </p>
            <p class="text-xs text-ink-500">Kutilmoqda, ta</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="Invoys yoki mijoz bo'yicha..." />
      </div>
      <select v-model="methodFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha usullar</option>
        <option value="CARD">Karta</option>
        <option value="BANK">Bank o'tkazmasi</option>
        <option value="CASH">Naqd</option>
        <option value="ONLINE">Onlayn</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Invoys</th>
              <th>Mijoz</th>
              <th>Summa</th>
              <th>Usul</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in pagedPayments" :key="p.id" class="cursor-pointer">
              <td class="text-ink-500 text-xs">{{ formatDate(p.paidAt || p.createdAt) }}</td>
              <td class="font-mono text-xs text-ink-900">{{ invoiceNumber(p.invoiceId) }}</td>
              <td class="text-ink-700">{{ invoiceTenant(p.invoiceId) }}</td>
              <td class="font-mono font-bold text-ink-900">{{ formatNumber(p.amount) }}</td>
              <td>
                <span class="badge badge-neutral">
                  <component :is="methodIcon(p.method)" :size="12" :stroke-width="2" />
                  {{ methodLabel(p.method) }}
                </span>
              </td>
              <td><StatusBadge :status="p.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        @update:page="page = $event"
      />
      <EmptyState
        v-if="!filtered.length"
        title="To'lovlar topilmadi"
        icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2"
      />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="p in pagedPayments" :key="p.id" class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-xs font-medium text-ink-900">{{
            invoiceNumber(p.invoiceId)
          }}</span>
          <StatusBadge :status="p.status" :dot="true" />
        </div>
        <p class="text-sm text-ink-700">{{ invoiceTenant(p.invoiceId) }}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="font-mono font-bold text-ink-900">{{ formatNumber(p.amount) }} so'm</span>
          <span class="badge badge-neutral">
            <component :is="methodIcon(p.method)" :size="12" :stroke-width="2" />
            {{ methodLabel(p.method) }}
          </span>
        </div>
        <p class="text-xs text-ink-400 mt-1.5">{{ formatDate(p.paidAt || p.createdAt) }}</p>
      </div>
      <EmptyState
        v-if="!filtered.length"
        title="To'lovlar topilmadi"
        icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Plus,
  Wallet,
  CalendarClock,
  Hourglass,
  CreditCard,
  Landmark,
  Banknote,
  Globe,
} from 'lucide-vue-next'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const search = ref('')
const methodFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const filtered = computed(() => {
  let r = financeStore.payments
  if (methodFilter.value !== 'ALL') r = r.filter((p) => p.method === methodFilter.value)
  if (search.value)
    r = r.filter(
      (p) =>
        invoiceNumber(p.invoiceId)?.toLowerCase().includes(search.value.toLowerCase()) ||
        invoiceTenant(p.invoiceId)?.toLowerCase().includes(search.value.toLowerCase())
    )
  return r
})
const pagedPayments = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)
const totalPaid = computed(() =>
  financeStore.payments.filter((p) => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0)
)
const thisMonth = computed(() => {
  const now = new Date()
  return financeStore.payments
    .filter((p) => {
      const d = new Date(p.paidAt || p.createdAt)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((s, p) => s + p.amount, 0)
})

const invoiceNumber = (id: string) => financeStore.invoices.find((i) => i.id === id)?.number || id
const invoiceTenant = (id: string) => {
  const inv = financeStore.invoices.find((i) => i.id === id)
  if (!inv) return '—'
  const c = financeStore.contracts.find((c) => c.id === inv.contractId)
  return c?.tenantName || '—'
}

function methodLabel(m: string) {
  return { CARD: 'Karta', BANK: "Bank o'kazmasi", CASH: 'Naqd', ONLINE: 'Onlayn' }[m] || m
}
function methodIcon(m: string) {
  return { CARD: CreditCard, BANK: Landmark, CASH: Banknote, ONLINE: Globe }[m] || CreditCard
}
</script>
