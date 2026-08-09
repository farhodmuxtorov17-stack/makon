<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Binolar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} bino</p></div>
      <button class="btn-primary btn-sm">+ Yangi bino</button>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1"><SearchInput v-model="search" placeholder="Bino nomi bo'yicha qidirish..." /></div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="ACTIVE">Faol</option>
        <option value="MAINTENANCE">Ta'mirda</option>
        <option value="INACTIVE">Nofaol</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th>Nomi</th><th>Manzil</th><th>Qavatlar</th><th>Unitlar</th><th>Bandlik</th><th>Holat</th><th class="text-right">Amallar</th></tr>
          </thead>
          <tbody>
            <tr v-for="b in pagedBuildings" :key="b.id" class="cursor-pointer" @click="navigateTo(`/management/buildings/${b.id}`)">
              <td class="font-medium text-neutral-900">{{ b.name }}</td>
              <td class="text-neutral-500">{{ b.address }}</td>
              <td class="text-neutral-500">{{ b.floors }}</td>
              <td class="text-neutral-500">{{ b.unitCount || '—' }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="w-16 h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div class="h-full bg-success-500 rounded-full" :style="{ width: occupancyPercent(b) + '%' }" />
                  </div>
                  <span class="text-xs text-neutral-500">{{ occupancyPercent(b) }}%</span>
                </div>
              </td>
              <td><StatusBadge :status="b.status" :dot="true" /></td>
              <td class="text-right"><button class="btn-ghost btn-icon" @click.stop="navigateTo(`/management/buildings/${b.id}`)"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" @update:page="page = $event" />
      <EmptyState v-if="!filtered.length" title="Binolar topilmadi" description="Filtrlarni o'zgartirib ko'ring" icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="b in pagedBuildings" :key="b.id" class="card p-4" @click="navigateTo(`/management/buildings/${b.id}`)">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-neutral-900">{{ b.name }}</span>
          <StatusBadge :status="b.status" :dot="true" />
        </div>
        <p class="text-sm text-neutral-500 mb-2">{{ b.address }}</p>
        <div class="flex items-center gap-4 text-xs text-neutral-400">
          <span>{{ b.floors }} qavat</span>
          <span>{{ b.unitCount || '—' }} unit</span>
          <div class="flex items-center gap-1.5">
            <div class="w-12 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div class="h-full bg-success-500 rounded-full" :style="{ width: occupancyPercent(b) + '%' }" />
            </div>
            <span>{{ occupancyPercent(b) }}%</span>
          </div>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Binolar topilmadi" icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())

const search = ref('')
const statusFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const filtered = computed(() => {
  let r = buildingStore.buildings
  if (statusFilter.value !== 'ALL') r = r.filter(b => b.status === statusFilter.value)
  if (search.value) r = r.filter(b => b.name?.toLowerCase().includes(search.value.toLowerCase()) || b.address?.toLowerCase().includes(search.value.toLowerCase()))
  return r
})

const pagedBuildings = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

function occupancyPercent(b: any) {
  const units = buildingStore.units.filter(u => u.buildingId === b.id)
  if (!units.length) return 0
  return Math.round((units.filter(u => ['RENTED', 'SOLD'].includes(u.status)).length / units.length) * 100)
}
</script>
