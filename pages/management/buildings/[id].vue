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
        <div class="card overflow-hidden">
          <div class="h-48 bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center relative">
            <img src="/images/building-hero.png" alt="" class="h-40 w-auto object-contain drop-shadow-xl" />
            <span class="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wide text-primary-500 bg-white/80 px-2.5 py-1 rounded-full">3D ko'rinish</span>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h1 class="text-2xl font-bold font-display text-neutral-900">{{ building.name }}</h1>
                <p class="text-sm text-neutral-500 mt-1">
                  {{ building.address }}, {{ building.city }}
                </p>
              </div>
              <StatusBadge :status="building.isPublished ? 'PUBLISHED' : 'DRAFT'" :dot="true" />
            </div>
            <div class="grid grid-cols-4 gap-4">
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
        </div>

        <div class="card">
          <div class="card-header flex items-center justify-between">
            <h3 class="font-semibold">Qavatlar rejasi</h3>
            <span class="text-xs text-neutral-400">Qavatni tanlang</span>
          </div>
          <div class="card-body grid grid-cols-4 md:grid-cols-6 gap-2">
            <div
              v-for="f in floors"
              :key="f.id"
              :class="['p-3 rounded-xl border cursor-pointer text-center transition-colors', activeFloor === f.id ? 'border-primary-400 bg-primary-50' : 'border-neutral-200 hover:border-primary-300']"
              @click="activeFloor = f.id"
            >
              <p class="text-sm font-bold text-neutral-900">{{ f.number }}</p>
              <p class="text-xs text-neutral-500">{{ Math.round(f.area) }} m²</p>
            </div>
          </div>
        </div>

        <!-- Room sketch plan -->
        <div class="card">
          <div class="card-header flex items-center justify-between">
            <h3 class="font-semibold">Xonalar sketch rejasi</h3>
            <span class="text-xs text-neutral-400">{{ currentFloorLabel }}</span>
          </div>
          <div class="card-body">
            <svg viewBox="0 0 400 260" class="w-full h-auto rounded-xl bg-neutral-50 border border-neutral-100">
              <rect x="10" y="10" width="380" height="240" fill="none" stroke="#cbd5e1" stroke-width="2" />
              <line x1="10" y1="10" x2="150" y2="130" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="4 3" />
              <rect
                v-for="(room, i) in sketchRooms"
                :key="i"
                :x="room.x" :y="room.y" :width="room.w" :height="room.h"
                :fill="room.color" fill-opacity="0.12" :stroke="room.color" stroke-width="1.5" rx="4"
                class="cursor-pointer hover:fill-opacity-25 transition-all"
              />
              <text
                v-for="(room, i) in sketchRooms" :key="'t' + i"
                :x="room.x + room.w / 2" :y="room.y + room.h / 2 - 4"
                text-anchor="middle" font-size="11" font-weight="600" fill="#334155"
              >{{ room.label }}</text>
              <text
                v-for="(room, i) in sketchRooms" :key="'a' + i"
                :x="room.x + room.w / 2" :y="room.y + room.h / 2 + 12"
                text-anchor="middle" font-size="9" fill="#94a3b8"
              >{{ room.area }} m²</text>
              <!-- door marks -->
              <path d="M 190 130 a 10 10 0 0 1 10 -10" fill="none" stroke="#94a3b8" stroke-width="1" />
            </svg>
            <div class="flex flex-wrap gap-3 mt-3">
              <div v-for="(room, i) in sketchRooms" :key="'l' + i" class="flex items-center gap-1.5 text-xs text-neutral-500">
                <span class="w-2.5 h-2.5 rounded-sm" :style="{ background: room.color }" />
                {{ room.label }}
              </div>
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
import { computed, onMounted, ref } from 'vue'
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

const activeFloor = ref<string | null>(null)
onMounted(() => {
  if (floors.value.length) activeFloor.value = floors.value[0].id
})

const currentFloorLabel = computed(() => {
  const f = floors.value.find(fl => fl.id === activeFloor.value)
  return f ? `${f.number}-qavat` : ''
})

const roomColors = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899', '#22c55e', '#0ea5e9']
const sketchRooms = computed(() => {
  const floorUnits = units.value.filter(u => u.floorId === activeFloor.value).slice(0, 6)
  const source = floorUnits.length ? floorUnits : units.value.slice(0, 4)
  const layout = [
    { x: 20, y: 20, w: 160, h: 100 },
    { x: 190, y: 20, w: 190, h: 60 },
    { x: 190, y: 90, w: 90, h: 90 },
    { x: 290, y: 90, w: 90, h: 90 },
    { x: 20, y: 130, w: 160, h: 100 },
    { x: 20, y: 230, w: 0, h: 0 },
  ]
  return source.map((u, i) => ({
    ...layout[i % layout.length],
    label: u.number || `Xona ${i + 1}`,
    area: u.area || 20,
    color: roomColors[i % roomColors.length],
  })).filter(r => r.w > 0)
})

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
