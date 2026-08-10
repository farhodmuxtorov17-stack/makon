<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Invoyslar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ filtered.length }} invoys</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm">
          <Download :size="16" :stroke-width="2" />
          Eksport
        </button>
        <button class="btn btn-primary btn-sm" @click="showNewModal = true">
          <Plus :size="16" :stroke-width="2" />
          Yangi invoys
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
            <Receipt :size="18" :stroke-width="2" class="text-brand-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(totalAmount) }}</p>
            <p class="text-xs text-ink-500">Jami, so'm</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-success-50 flex items-center justify-center">
            <CheckCircle2 :size="18" :stroke-width="2" class="text-success-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(paidAmount) }}</p>
            <p class="text-xs text-ink-500">To'langan, so'm</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-warning-50 flex items-center justify-center">
            <Clock :size="18" :stroke-width="2" class="text-warning-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(pendingAmount) }}</p>
            <p class="text-xs text-ink-500">Kutilmoqda, so'm</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-danger-50 flex items-center justify-center">
            <AlertCircle :size="18" :stroke-width="2" class="text-danger-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ formatNumber(overdueAmount) }}</p>
            <p class="text-xs text-ink-500">Muddati o'tgan, so'm</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="Invoys raqami bo'yicha qidirish..." />
      </div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="PENDING">Kutilmoqda</option>
        <option value="PAID">To'langan</option>
        <option value="OVERDUE">Muddati o'tgan</option>
        <option value="CANCELLED">Bekor qilingan</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Shartnoma</th>
              <th>Mijoz</th>
              <th>Summa</th>
              <th>Muddat</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="inv in pagedInvoices"
              :key="inv.id"
              class="cursor-pointer"
              @click="navigateTo(`/finance/invoices/${inv.id}`)"
            >
              <td class="font-mono text-xs font-medium text-ink-900">{{ inv.number }}</td>
              <td class="font-mono text-xs text-ink-500">{{ contractNumber(inv.contractId) }}</td>
              <td class="text-ink-700">{{ contractTenant(inv.contractId) }}</td>
              <td class="font-mono font-bold text-ink-900">{{ formatNumber(inv.amount) }}</td>
              <td class="text-ink-500 text-xs">{{ formatDate(inv.dueDate) }}</td>
              <td><StatusBadge :status="inv.status" :dot="true" /></td>
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
        title="Invoyslar topilmadi"
        description="Filtrlarni o'zgartirib ko'ring"
        icon="M9 14l6-6m-5.5.5h.01"
      />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div
        v-for="inv in pagedInvoices"
        :key="inv.id"
        class="card p-4"
        @click="navigateTo(`/finance/invoices/${inv.id}`)"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-xs font-medium text-ink-900">{{ inv.number }}</span>
          <StatusBadge :status="inv.status" :dot="true" />
        </div>
        <p class="text-sm text-ink-700">{{ contractTenant(inv.contractId) }}</p>
        <div class="flex items-center justify-between mt-2">
          <span class="font-mono font-bold text-ink-900">{{ formatNumber(inv.amount) }} so'm</span>
          <span class="text-xs text-ink-400">{{ formatDate(inv.dueDate) }}</span>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Invoyslar topilmadi" icon="M9 14l6-6m-5.5.5h.01" />
    </div>

    <!-- New invoice modal -->
    <Modal v-if="showNewModal" title="Yangi invoys" @close="showNewModal = false">
      <div class="space-y-4">
        <div>
          <label class="label">Shartnoma</label>
          <select class="input cursor-pointer">
            <option v-for="c in contracts" :key="c.id" :value="c.id">{{ c.number }}</option>
          </select>
        </div>
        <div>
          <label class="label">Summa (so'm)</label>
          <input type="number" class="input" placeholder="0" />
        </div>
        <div>
          <label class="label">Muddat</label>
          <input type="date" class="input" />
        </div>
      </div>
      <template #actions>
        <button class="btn btn-secondary" @click="showNewModal = false">Bekor qilish</button>
        <button class="btn btn-primary" @click="showNewModal = false">Yaratish</button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Download, Receipt, CheckCircle2, Clock, AlertCircle } from 'lucide-vue-next'
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
  if (statusFilter.value !== 'ALL') r = r.filter((i) => i.status === statusFilter.value)
  if (search.value)
    r = r.filter((i) => i.number?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})
const pagedInvoices = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)
const totalAmount = computed(() => financeStore.invoices.reduce((s, i) => s + i.amount, 0))
const paidAmount = computed(() =>
  financeStore.invoices.filter((i) => i.status === 'PAID').reduce((s, i) => s + i.amount, 0)
)
const pendingAmount = computed(() =>
  financeStore.invoices.filter((i) => i.status === 'PENDING').reduce((s, i) => s + i.amount, 0)
)
const overdueAmount = computed(() =>
  financeStore.invoices.filter((i) => i.status === 'OVERDUE').reduce((s, i) => s + i.amount, 0)
)
const contractNumber = (id: string) => financeStore.contracts.find((c) => c.id === id)?.number || id
const contractTenant = (id: string) =>
  financeStore.contracts.find((c) => c.id === id)?.tenantName || '—'
</script>
