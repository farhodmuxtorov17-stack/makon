<template>
  <div class="space-y-6">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div><h1 class="text-2xl font-bold font-display">Binolar</h1><p class="text-sm text-neutral-500 mt-1">{{ filtered.length }} bino</p></div>
      <div class="flex items-center gap-2">
        <div class="flex p-1 rounded-xl bg-neutral-100">
          <button :class="['btn-icon !rounded-lg', view === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-neutral-400']" @click="view = 'grid'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </button>
          <button :class="['btn-icon !rounded-lg', view === 'table' ? 'bg-white shadow-sm text-primary-600' : 'text-neutral-400']" @click="view = 'table'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        <button class="btn-primary btn-sm">+ Yangi bino</button>
      </div>
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

    <!-- 3D card grid -->
    <div v-if="view === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="b in pagedBuildings"
        :key="b.id"
        class="card overflow-hidden cursor-pointer hover:shadow-md transition-shadow group"
        @click="navigateTo(`/management/buildings/${b.id}`)"
      >
        <div class="relative h-36 bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center overflow-hidden">
          <img src="/images/building-icon.png" alt="" class="h-28 w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform" />
          <div class="absolute top-2.5 right-2.5"><StatusBadge :status="b.status" :dot="true" /></div>
        </div>
        <div class="p-4">
          <p class="font-semibold text-neutral-900 truncate">{{ b.name }}</p>
          <p class="text-xs text-neutral-500 mt-0.5 truncate">{{ b.address }}</p>
          <div class="flex items-center gap-4 mt-3 text-xs text-neutral-400">
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
              {{ b.floors }} qavat
            </span>
            <span class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              {{ b.unitCount || '—' }} unit
            </span>
          </div>
          <div class="flex items-center gap-2 mt-3">
            <div class="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
              <div class="h-full bg-success-500 rounded-full" :style="{ width: occupancyPercent(b) + '%' }" />
            </div>
            <span class="text-xs font-medium text-neutral-500">{{ occupancyPercent(b) }}%</span>
          </div>
        </div>
      </div>
      <EmptyState v-if="!filtered.length" title="Binolar topilmadi" description="Filtrlarni o'zgartirib ko'ring" icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" class="sm:col-span-2 lg:col-span-3" />
      <Pagination v-if="filtered.length > perPage" :page="page" :per-page="perPage" :total="filtered.length" class="sm:col-span-2 lg:col-span-3" @update:page="page = $event" />
    </div>

    <!-- Desktop table -->
    <div v-else class="card hidden md:block">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr><th></th><th>Nomi</th><th>Manzil</th><th>Qavatlar</th><th>Unitlar</th><th>Bandlik</th><th>Holat</th><th class="text-right">Amallar</th></tr>
          </thead>
          <tbody>
            <tr v-for="b in pagedBuildings" :key="b.id" class="cursor-pointer" @click="navigateTo(`/management/buildings/${b.id}`)">
              <td class="w-12"><div class="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center overflow-hidden"><img src="/images/building-icon.png" class="h-7 w-auto object-contain" /></div></td>
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
    <div class="md:hidden space-y-3" v-if="view === 'table'">
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
const perPage = 9
const view = ref<'grid' | 'table'>('grid')

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
