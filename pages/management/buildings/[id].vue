<template>
  <div class="space-y-6">
    <NuxtLink
      to="/management/buildings"
      class="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Binolar
    </NuxtLink>

    <div v-if="building" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h1 class="text-2xl font-bold font-display text-neutral-900">{{ building.name }}</h1>
              <p class="text-sm text-neutral-500 mt-1">
                {{ building.address }}, {{ building.city }}
              </p>
            </div>
            <StatusBadge :status="building.isPublished ? 'PUBLISHED' : 'DRAFT'" :dot="true" />
          </div>
          <div class="grid grid-cols-4 gap-4 mt-6">
            <div class="text-center p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Maydon</p>
              <p class="text-lg font-bold text-neutral-900">
                {{ formatNumber(building.totalArea) }} m²
              </p>
            </div>
            <div class="text-center p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Qavatlar</p>
              <p class="text-lg font-bold text-neutral-900">{{ building.floorsCount }}</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Unitlar</p>
              <p class="text-lg font-bold text-neutral-900">{{ units.length }}</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Listinglar</p>
              <p class="text-lg font-bold text-neutral-900">{{ listings.length }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="font-semibold">Qavatlar rejasi</h3></div>
          <div class="card-body grid grid-cols-4 md:grid-cols-6 gap-2">
            <div
              v-for="f in floors"
              :key="f.id"
              class="p-3 rounded-xl border border-neutral-200 hover:border-primary-300 cursor-pointer text-center transition-colors"
            >
              <p class="text-sm font-bold text-neutral-900">{{ f.number }}</p>
              <p class="text-xs text-neutral-500">{{ Math.round(f.area) }} m²</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="font-semibold">Unitlar</h3></div>
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th>Raqam</th>
                  <th>Maydon</th>
                  <th>Foydalanish</th>
                  <th>Taklif</th>
                  <th>Narx</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="u in units" :key="u.id">
                  <td class="font-mono font-medium">{{ u.number }}</td>
                  <td>{{ u.area }} m²</td>
                  <td class="text-neutral-500">{{ usageLabel(u.usageType) }}</td>
                  <td class="text-neutral-500">{{ offerLabel(u.offerType) }}</td>
                  <td class="font-mono">{{ formatNumber(u.basePrice) }}</td>
                  <td><StatusBadge :status="u.status" :dot="true" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="card p-5">
          <h3 class="font-semibold mb-3">Ma'lumotlar</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-neutral-500">Turi</span><span class="font-medium">{{ typeLabel(building.type) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Tuman</span><span class="font-medium">{{ building.district }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Yaratilgan</span><span class="font-medium">{{ formatDate(building.createdAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-500">Yangilangan</span><span class="font-medium">{{ formatDate(building.updatedAt) }}</span>
            </div>
          </div>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold mb-2">Tavsif</h3>
          <p class="text-sm text-neutral-500">
            {{ building.publicDescription || 'Tavsif kiritilmagan' }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <button class="btn-secondary">Tahrirlash</button>
          <button class="btn-ghost text-danger-600 hover:bg-danger-50">Arxivlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const buildingStore = useBuildingStore()
onMounted(() => buildingStore.initMockData())

const building = computed(() => buildingStore.buildingById(route.params.id as string))
const floors = computed(() => buildingStore.floorsByBuilding(route.params.id as string))
const units = computed(() => buildingStore.unitsByBuilding(route.params.id as string))
const listings = computed(() => buildingStore.listingsByBuilding(route.params.id as string))

const usageLabel = (t: string) =>
  ({
    OFFICE: 'Ofis',
    RETAIL: 'Savdo',
    WAREHOUSE: 'Ombor',
    RESIDENTIAL: 'Turar',
    PARKING: 'Parkovka',
    MIXED: 'Aralash',
  })[t] || t
const offerLabel = (t: string) => ({ RENT: 'Ijara', SALE: 'Sotuv', BOTH: 'Ijara/Sotuv' })[t] || t
const typeLabel = (t: string) =>
  ({
    BUSINESS_CENTER: 'Biznes markaz',
    OFFICE: 'Ofis',
    SHOPPING: 'Savdo',
    WAREHOUSE: 'Ombor',
    RESIDENTIAL: 'Turar joy',
    MIXED: 'Aralash',
  })[t] || t
</script>
