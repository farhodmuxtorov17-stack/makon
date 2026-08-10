<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Arizalar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} ariza</p></div>
      <button class="btn btn-primary btn-sm">+ Yangi ariza</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center"><svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('PENDING') }}</p><p class="text-xs text-neutral-500">Kutilmoqda</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center"><svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('FINANCE_REVIEW') }}</p><p class="text-xs text-neutral-500">Moliya tekshiruvi</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center"><svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('OFFER') }}</p><p class="text-xs text-neutral-500">Taklif</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-success-50 flex items-center justify-center"><svg class="w-5 h-5 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg></div><div><p class="text-xl font-bold">{{ countByStatus('APPROVED') }}</p><p class="text-xs text-neutral-500">Tasdiqlangan</p></div></div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Ariza raqami yoki mijoz bo'yicha..." /></div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="PENDING">Kutilmoqda</option>
        <option value="FINANCE_REVIEW">Moliya tekshiruvi</option>
        <option value="OFFER">Taklif</option>
        <option value="ERI_SIGNING">ERI imzolash</option>
        <option value="APPROVED">Tasdiqlangan</option>
        <option value="REJECTED">Rad etilgan</option>
      </select>
      <select v-model="typeFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha turlar</option>
        <option value="RENT">Ijara</option>
        <option value="SALE">Sotuv</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Raqam</th><th>Mijoz</th><th>Turi</th><th>Listing</th><th>Sana</th><th>Holat</th></tr>
          </thead>
          <tbody>
            <tr v-for="app in pagedApps" :key="app.id" class="cursor-pointer" @click="navigateTo(`/applications/${app.id}`)">
              <td class="font-mono text-xs font-medium">{{ app.number }}</td>
              <td class="font-medium text-neutral-900">{{ app.applicantName }}</td>
              <td><span :class="app.type === 'RENT' ? 'badge-info' : 'badge-success'">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="text-neutral-500 text-xs">{{ listingTitle(app.listingId) }}</td>
              <td class="text-neutral-500 text-xs">{{ formatDate(app.createdAt) }}</td>
              <td><StatusBadge :status="app.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="Arizalar topilmadi" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="app in pagedApps" :key="app.id" class="card p-4" @click="navigateTo(`/applications/${app.id}`)">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-xs font-medium">{{ app.number }}</span>
          <StatusBadge :status="app.status" :dot="true" />
        </div>
        <p class="font-medium text-neutral-900">{{ app.applicantName }}</p>
        <div class="flex items-center justify-between mt-2">
          <span :class="app.type === 'RENT' ? 'badge-info' : 'badge-success'">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
          <span class="text-xs text-neutral-400">{{ formatDate(app.createdAt) }}</span>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Arizalar topilmadi" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { useBuildingStore } from '~/stores/building'
import { formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
const buildingStore = useBuildingStore()
onMounted(() => { financeStore.initMockData(); buildingStore.initMockData() })

const search = ref('')
const statusFilter = ref('ALL')
const typeFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const apps = computed(() => financeStore.applications)

const filtered = computed(() => {
  let r = apps.value
  if (statusFilter.value !== 'ALL') r = r.filter(a => a.status === statusFilter.value)
  if (typeFilter.value !== 'ALL') r = r.filter(a => a.type === typeFilter.value)
  if (search.value) r = r.filter(a => a.number?.toLowerCase().includes(search.value.toLowerCase()) || a.applicantName?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})

const pagedApps = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function countByStatus(status: string) { return apps.value.filter(a => a.status === status).length }
function listingTitle(id: string) { return buildingStore.listings.find(l => l.id === id)?.titleUz || '—' }
</script>
