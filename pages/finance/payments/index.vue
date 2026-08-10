<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">To'lovlar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} to'lov</p></div>
      <button class="btn btn-primary btn-sm">+ Yangi to'lov</button>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <div class="card p-4"><p class="text-xs text-neutral-500">Jami to'lovlar</p><p class="text-lg md:text-xl font-bold mt-1 text-success-600">{{ formatNumber(totalPaid) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
      <div class="card p-4"><p class="text-xs text-neutral-500">Bu oy</p><p class="text-lg md:text-xl font-bold mt-1 text-primary-600">{{ formatNumber(thisMonth) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
      <div class="card p-4"><p class="text-xs text-neutral-500">Kutilmoqda</p><p class="text-lg md:text-xl font-bold mt-1 text-warning-600">{{ filtered.filter(p => p.status === 'PENDING').length }}</p><p class="text-xs text-neutral-400 mt-0.5">ta to'lov</p></div>
    </div>

    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Invoys yoki mijoz bo'yicha..." /></div>
      <select v-model="methodFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha usullar</option>
        <option value="CARD">Karta</option>
        <option value="BANK">Bank o'tkazmasi</option>
        <option value="CASH">Naqd</option>
        <option value="ONLINE">Onlayn</option>
      </select>
    </div>

    <!-- Desktop -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead><tr><th>Sana</th><th>Invoys</th><th>Mijoz</th><th>Summa</th><th>Usul</th><th>Holat</th></tr></thead>
          <tbody>
            <tr v-for="p in pagedPayments" :key="p.id">
              <td class="text-neutral-500 text-xs">{{ formatDate(p.paidAt || p.createdAt) }}</td>
              <td class="font-mono text-xs">{{ invoiceNumber(p.invoiceId) }}</td>
              <td class="text-neutral-500">{{ invoiceTenant(p.invoiceId) }}</td>
              <td class="font-mono font-bold">{{ formatNumber(p.amount) }}</td>
              <td><span class="badge-neutral">{{ methodLabel(p.method) }}</span></td>
              <td><StatusBadge :status="p.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="To'lovlar topilmadi" icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-3">
      <div v-for="p in pagedPayments" :key="p.id" class="card p-4">
        <div class="flex items-center justify-between mb-1"><span class="font-mono text-xs">{{ invoiceNumber(p.invoiceId) }}</span><StatusBadge :status="p.status" :dot="true" /></div>
        <p class="text-sm text-neutral-500">{{ invoiceTenant(p.invoiceId) }}</p>
        <div class="flex items-center justify-between mt-2"><span class="font-mono font-bold">{{ formatNumber(p.amount) }} so'm</span><span class="badge-neutral">{{ methodLabel(p.method) }}</span></div>
        <p class="text-xs text-neutral-400 mt-1">{{ formatDate(p.paidAt || p.createdAt) }}</p>
      </div>
      <EmptyState v-if="!filtered.length" title="To'lovlar topilmadi" icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const payments = computed(() => financeStore.payments)
const filtered = computed(() => {
  let r = payments.value
  if (methodFilter.value !== 'ALL') r = r.filter(p => p.method === methodFilter.value)
  if (search.value) {
    r = r.filter(p => {
      const inv = financeStore.invoices.find(i => i.id === p.invoiceId)
      const num = inv?.number || ''
      const c = financeStore.contracts.find(c => c.id === inv?.contractId)
      const tenant = c?.tenantName || ''
      return num.toLowerCase().includes(search.value.toLowerCase()) || tenant.toLowerCase().includes(search.value.toLowerCase())
    })
  }
  return r
})
const pagedPayments = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
const totalPaid = computed(() => payments.value.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0))
const thisMonth = computed(() => {
  const m = new Date().getMonth()
  return payments.value.filter(p => new Date(p.paidAt || p.createdAt).getMonth() === m && p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0)
})
function invoiceNumber(id: string) { return financeStore.invoices.find(i => i.id === id)?.number || id }
function invoiceTenant(invId: string) {
  const inv = financeStore.invoices.find(i => i.id === invId)
  const c = financeStore.contracts.find(c => c.id === inv?.contractId)
  return c?.tenantName || '—'
}
function methodLabel(m: string) { return ({ CARD: 'Karta', BANK: 'Bank', CASH: 'Naqd', ONLINE: 'Onlayn' }[m] || m) }
</script>
