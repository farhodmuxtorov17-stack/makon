<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Hisoblagichlar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} hisoblagich</p></div>
      <button class="btn-primary btn-sm">+ Yangi</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-warning-50 flex items-center justify-center"><svg class="w-5 h-5 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div><div><p class="text-xl font-bold">{{ countByType('ELECTRICITY') }}</p><p class="text-xs text-neutral-500">Elektr</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-info-50 flex items-center justify-center"><svg class="w-5 h-5 text-info-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.49 15a9 9 0 11-2.12-9.36L23 10M15 14l-3 3-3-3" /></svg></div><div><p class="text-xl font-bold">{{ countByType('WATER') }}</p><p class="text-xs text-neutral-500">Suv</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-danger-50 flex items-center justify-center"><svg class="w-5 h-5 text-danger-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.24 17 5.343 19.24 5.58 21 7.5 21 10c0 .997-.5 2-1 3" /></svg></div><div><p class="text-xl font-bold">{{ countByType('GAS') }}</p><p class="text-xs text-neutral-500">Gaz</p></div></div>
      <div class="card p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center"><svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7" /></svg></div><div><p class="text-xl font-bold">{{ countByType('HEAT') }}</p><p class="text-xs text-neutral-500">Issiqlik</p></div></div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Kod yoki seriya bo'yicha..." /></div>
      <select v-model="typeFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha turlar</option>
        <option value="ELECTRICITY">Elektr</option>
        <option value="WATER">Suv</option>
        <option value="GAS">Gaz</option>
        <option value="HEAT">Issiqlik</option>
      </select>
    </div>

    <!-- Desktop -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead><tr><th>Kod</th><th>Turi</th><th>Seriya</th><th>Bino</th><th>Unit</th><th>Faol</th><th>O'rnatilgan</th></tr></thead>
          <tbody>
            <tr v-for="m in pagedMeters" :key="m.id">
              <td class="font-mono text-xs font-medium">{{ m.code }}</td>
              <td><span class="badge-info">{{ typeLabel(m.type) }}</span></td>
              <td class="font-mono text-xs text-neutral-500">{{ m.serialNumber }}</td>
              <td class="text-neutral-500">{{ buildingName(m.buildingId) }}</td>
              <td class="text-neutral-500">{{ m.unitId || '—' }}</td>
              <td><span :class="m.isActive ? 'badge-success' : 'badge-neutral'">{{ m.isActive ? 'Faol' : 'Nofaol' }}</span></td>
              <td class="text-neutral-500 text-xs">{{ formatDate(m.installedAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="Hisoblagichlar topilmadi" icon="M13 10V3L4 14h7v7l9-11h-7z" />
    </div>

    <!-- Mobile -->
    <div class="md:hidden space-y-3">
      <div v-for="m in pagedMeters" :key="m.id" class="card p-4">
        <div class="flex items-center justify-between mb-1">
          <span class="font-mono text-xs font-medium">{{ m.code }}</span>
          <span :class="m.isActive ? 'badge-success' : 'badge-neutral'">{{ m.isActive ? 'Faol' : 'Nofaol' }}</span>
        </div>
        <div class="flex items-center justify-between mt-1">
          <span class="badge-info">{{ typeLabel(m.type) }}</span>
          <span class="font-mono text-xs text-neutral-400">{{ m.serialNumber }}</span>
        </div>
        <p class="text-xs text-neutral-500 mt-2">{{ buildingName(m.buildingId) }} · {{ m.unitId || '—' }}</p>
      </div>
      <EmptyState v-if="!filtered.length" title="Hisoblagichlar topilmadi" icon="M13 10V3L4 14h7v7l9-11h-7z" />
    </div>

    <!-- Recent readings -->
    <div class="card">
      <div class="card-header"><h3 class="font-semibold">So'nggi o'qishlar</h3></div>
      <div class="table-wrapper">
        <table class="table">
          <thead><tr><th>Hisoblagich</th><th>Qiymat</th><th>Sana</th><th>Holat</th></tr></thead>
          <tbody>
            <tr v-for="r in readings.slice(0, 10)" :key="r.id">
              <td class="font-mono text-xs">{{ meterCode(r.meterId) }}</td>
              <td class="font-mono font-bold">{{ r.value }}</td>
              <td class="text-neutral-500">{{ formatDate(r.readingAt) }}</td>
              <td><StatusBadge :status="r.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServiceStore } from '~/stores/service'
import { useBuildingStore } from '~/stores/building'
import { formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const serviceStore = useServiceStore()
const buildingStore = useBuildingStore()
onMounted(() => { serviceStore.initMockData(); buildingStore.initMockData() })

const search = ref('')
const typeFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const meters = computed(() => serviceStore.meters)
const readings = computed(() => serviceStore.meterReadings)

const filtered = computed(() => {
  let r = meters.value
  if (typeFilter.value !== 'ALL') r = r.filter(m => m.type === typeFilter.value)
  if (search.value) r = r.filter(m => m.code?.toLowerCase().includes(search.value.toLowerCase()) || m.serialNumber?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})
const pagedMeters = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function countByType(t: string) { return meters.value.filter(m => m.type === t).length }
const typeLabel = (t: string) => ({ ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz', HEAT: 'Issiqlik' }[t] || t)
const buildingName = (id: string) => buildingStore.buildingById(id)?.name || id
const meterCode = (id: string) => serviceStore.meters.find(m => m.id === id)?.code || id
</script>
