<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Invoyslar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} invoys</p></div>
      <div class="flex gap-2">
        <button class="btn-secondary btn-sm"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M4 20h16" /></svg> Eksport</button>
        <button class="btn-primary btn-sm" @click="showNewModal = true">+ Yangi invoys</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4"><p class="text-xs text-neutral-500">Jami</p><p class="text-lg md:text-xl font-bold mt-1 text-primary-600">{{ formatNumber(totalAmount) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
      <div class="card p-4"><p class="text-xs text-neutral-500">To'langan</p><p class="text-lg md:text-xl font-bold mt-1 text-success-600">{{ formatNumber(paidAmount) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
      <div class="card p-4"><p class="text-xs text-neutral-500">Kutilmoqda</p><p class="text-lg md:text-xl font-bold mt-1 text-warning-600">{{ formatNumber(pendingAmount) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
      <div class="card p-4"><p class="text-xs text-neutral-500">Muddati o'tgan</p><p class="text-lg md:text-xl font-bold mt-1 text-danger-600">{{ formatNumber(overdueAmount) }}</p><p class="text-xs text-neutral-400 mt-0.5">so'm</p></div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Invoys raqami bo'yicha qidirish..." /></div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="PENDING">Kutilmoqda</option>
        <option value="PAID">To'langan</option>
        <option value="OVERDUE">Muddati o'tgan</option>
        <option value="CANCELLED">Bekor qilingan</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Raqam</th><th>Shartnoma</th><th>Mijoz</th><th>Summa</th><th>Muddat</th><th>Holat</th></tr>
          </thead>
          <tbody>
            <tr v-for="inv in pagedInvoices" :key="inv.id" class="cursor-pointer" @click="navigateTo(`/finance/invoices/${inv.id}`)">
              <td class="font-mono text-xs font-medium">{{ inv.number }}</td>
              <td class="font-mono text-xs text-neutral-500">{{ contractNumber(inv.contractId) }}</td>
              <td class="text-neutral-500">{{ contractTenant(inv.contractId) }}</td>
              <td class="font-mono font-bold">{{ formatNumber(inv.amount) }}</td>
              <td class="text-neutral-500 text-xs">{{ formatDate(inv.dueDate) }}</td>
              <td><StatusBadge :status="inv.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="Invoyslar topilmadi" description="Filtrlarni o'zgartirib ko'ring" icon="M9 14l6-6m-5.5.5h.01" />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="inv in pagedInvoices" :key="inv.id" class="card p-4" @click="navigateTo(`/finance/invoices/${inv.id}`)">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-xs font-medium">{{ inv.number }}</span>
          <StatusBadge :status="inv.status" :dot="true" />
        </div>
        <p class="text-sm text-neutral-500">{{ contractTenant(inv.contractId) }}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="font-mono font-bold">{{ formatNumber(inv.amount) }} so'm</span>
          <span class="text-xs text-neutral-400">{{ formatDate(inv.dueDate) }}</span>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Invoyslar topilmadi" icon="M9 14l6-6m-5.5.5h.01" />
    </div>

    <!-- New invoice modal -->
    <Modal v-if="showNewModal" title="Yangi invoys" @close="showNewModal = false">
      <div class="space-y-4">
        <div><label class="label">Shartnoma</label><select class="input cursor-pointer"><option v-for="c in contracts" :key="c.id" :value="c.id">{{ c.number }}</option></select></div>
        <div><label class="label">Summa (so'm)</label><input type="number" class="input" placeholder="0" /></div>
        <div><label class="label">Muddat</label><input type="date" class="input" /></div>
      </div>
      <template #actions>
        <button class="btn-secondary" @click="showNewModal = false">Bekor</button>
        <button class="btn-primary" @click="showNewModal = false">Yaratish</button>
      </template>
    </Modal>
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
import Modal from '~/components/ui/Modal.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const search = ref('')
const statusFilter = ref('ALL')
const page = ref(1)
const perPage = 10
const showNewModal = ref(false)

const contracts = computed(() => financeStore.contracts)

const filtered = computed(() => {
  let r = financeStore.invoices
  if (statusFilter.value !== 'ALL') r = r.filter(i => i.status === statusFilter.value)
  if (search.value) r = r.filter(i => i.number?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})

const pagedInvoices = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

const totalAmount = computed(() => financeStore.invoices.reduce((s, i) => s + i.amount, 0))
const paidAmount = computed(() => financeStore.invoices.filter(i => i.status === 'PAID').reduce((s, i) => s + i.amount, 0))
const pendingAmount = computed(() => financeStore.invoices.filter(i => i.status === 'PENDING').reduce((s, i) => s + i.amount, 0))
const overdueAmount = computed(() => financeStore.invoices.filter(i => i.status === 'OVERDUE').reduce((s, i) => s + i.amount, 0))

const contractNumber = (id: string) => financeStore.contracts.find(c => c.id === id)?.number || id
const contractTenant = (id: string) => {
  const c = financeStore.contracts.find(c => c.id === id)
  return c?.tenantName || '—'
}
</script>
