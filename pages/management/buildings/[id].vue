<template>
  <div class="space-y-6">
    <NuxtLink to="/management/buildings" class="text-sm text-ink-400 hover:text-ink-600 flex items-center gap-1.5 group">
      <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Binolar
    </NuxtLink>

    <div v-if="building" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <!-- 3D Building Hero -->
        <div class="card overflow-hidden animate-fade-in-up">
          <div class="relative h-56 flex items-center justify-center overflow-hidden">
            <!-- Background gradient -->
            <div class="absolute inset-0" :class="buildingBgClass" />
            <div class="absolute inset-0 bg-grid-pattern opacity-20" />
            <!-- Glow -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-30 blur-3xl" :style="{ background: buildingColor }" />
            <!-- 3D Building -->
            <div class="relative w-36 h-36 animate-float">
              <Building3DIcon :type="buildingType" :color="buildingColor" :size="160" />
            </div>
            <!-- Badge -->
            <div class="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-sm text-xs font-bold text-ink-600 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              3D ko'rinish
            </div>
            <div class="absolute top-4 right-4">
              <StatusBadge :status="building.isPublished ? 'PUBLISHED' : 'DRAFT'" :dot="true" />
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between mb-5">
              <div>
                <h1 class="text-2xl font-bold font-display text-ink-900 tracking-tight">{{ building.name }}</h1>
                <p class="text-sm text-ink-400 mt-1 flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ building.address }}, {{ building.city }}
                </p>
              </div>
            </div>

            <!-- Stats grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div class="text-center p-4 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-50/50">
                <p class="text-xs text-ink-400 font-medium uppercase tracking-wider">Maydon</p>
                <p class="text-xl font-bold text-ink-900 font-display mt-1">{{ formatNumber(building.totalArea) }} m²</p>
              </div>
              <div class="text-center p-4 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-50/50">
                <p class="text-xs text-ink-400 font-medium uppercase tracking-wider">Qavatlar</p>
                <p class="text-xl font-bold text-ink-900 font-display mt-1">{{ building.floorsCount }}</p>
              </div>
              <div class="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-50/50">
                <p class="text-xs text-ink-400 font-medium uppercase tracking-wider">Unitlar</p>
                <p class="text-xl font-bold text-ink-900 font-display mt-1">{{ units.length }}</p>
              </div>
              <div class="text-center p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-50/50">
                <p class="text-xs text-ink-400 font-medium uppercase tracking-wider">Listinglar</p>
                <p class="text-xl font-bold text-ink-900 font-display mt-1">{{ listings.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Floor selector -->
        <div class="card animate-fade-in-up">
          <div class="card-header">
            <div>
              <h3 class="font-semibold text-ink-900">Qavatlar rejasi</h3>
              <p class="text-xs text-ink-400 mt-0.5">Qavatni tanlang</p>
            </div>
          </div>
          <div class="card-body grid grid-cols-4 md:grid-cols-6 gap-2">
            <div
              v-for="f in floors"
              :key="f.id"
              :class="['p-3.5 rounded-xl border-2 cursor-pointer text-center transition-all', activeFloor === f.id ? 'border-brand-400 bg-brand-50 shadow-sm' : 'border-ink-200 hover:border-brand-300 hover:bg-ink-50']"
              @click="activeFloor = f.id"
            >
              <p class="text-sm font-bold text-ink-900">{{ f.number }}</p>
              <p class="text-xs text-ink-400">{{ Math.round(f.area) }} m²</p>
            </div>
          </div>
        </div>

        <!-- Room sketch plan -->
        <div class="card animate-fade-in-up">
          <div class="card-header">
            <div>
              <h3 class="font-semibold text-ink-900">Xonalar sketch rejasi</h3>
              <p class="text-xs text-ink-400 mt-0.5">{{ currentFloorLabel }}</p>
            </div>
            <span class="px-2.5 py-1 rounded-lg bg-ink-100 text-xs font-semibold text-ink-500">2D sketch</span>
          </div>
          <div class="card-body">
            <svg viewBox="0 0 400 260" class="w-full h-auto rounded-xl bg-ink-50/50 border border-ink-100">
              <!-- Outer walls -->
              <rect x="10" y="10" width="380" height="240" fill="white" stroke="#b1b8c8" stroke-width="2.5" rx="2" />
              <!-- Grid lines -->
              <line x1="10" y1="10" x2="150" y2="130" stroke="#d5d9e2" stroke-width="0.5" stroke-dasharray="4 3" />
              <line x1="390" y1="10" x2="250" y2="130" stroke="#d5d9e2" stroke-width="0.5" stroke-dasharray="4 3" />

              <!-- Rooms -->
              <rect
                v-for="(room, i) in sketchRooms"
                :key="i"
                :x="room.x" :y="room.y" :width="room.w" :height="room.h"
                :fill="room.color" fill-opacity="0.12" :stroke="room.color" stroke-width="1.5" rx="4"
                class="cursor-pointer transition-all hover:fill-opacity-25"
              />
              <!-- Room labels -->
              <text
                v-for="(room, i) in sketchRooms" :key="'t' + i"
                :x="room.x + room.w / 2" :y="room.y + room.h / 2 - 4"
                text-anchor="middle" font-size="11" font-weight="600" fill="#334155"
              >{{ room.label }}</text>
              <text
                v-for="(room, i) in sketchRooms" :key="'a' + i"
                :x="room.x + room.w / 2" :y="room.y + room.h / 2 + 12"
                text-anchor="middle" font-size="9" fill="#8690a8"
              >{{ room.area }} m²</text>
              <!-- Door arcs -->
              <path d="M 190 130 a 10 10 0 0 1 10 -10" fill="none" stroke="#8690a8" stroke-width="1" />
              <path d="M 190 130 a 10 10 0 0 0 -10 -10" fill="none" stroke="#8690a8" stroke-width="1" />
            </svg>

            <!-- Legend -->
            <div class="flex flex-wrap gap-3 mt-4">
              <div v-for="(room, i) in sketchRooms" :key="'l' + i" class="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-ink-50">
                <span class="w-3 h-3 rounded-sm" :style="{ background: room.color }" />
                <span class="text-xs font-medium text-ink-600">{{ room.label }}</span>
                <span class="text-xs text-ink-400">{{ room.area }} m²</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Units table -->
        <div class="card animate-fade-in-up">
          <div class="card-header">
            <div>
              <h3 class="font-semibold text-ink-900">Unitlar</h3>
              <p class="text-xs text-ink-400 mt-0.5">{{ units.length }} ta unit</p>
            </div>
          </div>
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr><th>Raqam</th><th>Maydon</th><th>Foydalanish</th><th>Taklif</th><th>Narx</th><th>Holat</th></tr>
              </thead>
              <tbody>
                <tr v-for="u in units" :key="u.id">
                  <td class="font-mono font-semibold text-ink-900">{{ u.number }}</td>
                  <td class="text-ink-500">{{ u.area }} m²</td>
                  <td><span class="badge-neutral">{{ usageLabel(u.usageType) }}</span></td>
                  <td><span :class="u.offerType === 'RENT' ? 'badge-info' : 'badge-success'">{{ offerLabel(u.offerType) }}</span></td>
                  <td class="font-mono font-semibold text-ink-900">{{ formatNumber(u.basePrice) }}</td>
                  <td><StatusBadge :status="u.status" :dot="true" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <div class="card p-5 animate-fade-in-up">
          <h3 class="font-semibold text-ink-900 mb-4">Ma'lumotlar</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center">
              <span class="text-ink-400">Turi</span>
              <span class="font-semibold text-ink-900">{{ typeLabel(building.type) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-ink-400">Tuman</span>
              <span class="font-semibold text-ink-900">{{ building.district }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-ink-400">Yaratilgan</span>
              <span class="font-semibold text-ink-900">{{ formatDate(building.createdAt) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-ink-400">Yangilangan</span>
              <span class="font-semibold text-ink-900">{{ formatDate(building.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <div class="card p-5 animate-fade-in-up">
          <h3 class="font-semibold text-ink-900 mb-2">Tavsif</h3>
          <p class="text-sm text-ink-400 leading-relaxed">
            {{ building.publicDescription || 'Tavsif kiritilmagan' }}
          </p>
        </div>

        <div class="flex flex-col gap-2">
          <button class="btn btn-outline">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            Tahrirlash
          </button>
          <button class="btn-ghost text-rose-600 hover:bg-rose-50">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Arxivlash
          </button>
        </div>
      </div>
    </div>

    <div v-else class="card p-12 text-center">
      <p class="text-ink-400">Bino topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useBuildingStore } from '~/stores/building'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import Building3DIcon from '~/components/Building3DIcon.vue'

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

const buildingColors = ['#6356f7', '#10b981', '#f99007', '#0ea5e9', '#f43f5e', '#8b5cf6']
const buildingColor = computed(() => {
  const id = route.params.id as string
  const idx = (id?.charCodeAt(0) || 0) % buildingColors.length
  return buildingColors[idx]
})

const buildingType = computed<'tower' | 'block' | 'complex'>(() => {
  if (!building.value) return 'tower'
  if (building.value.floorsCount >= 12) return 'tower'
  if (building.value.floorsCount <= 5) return 'block'
  return 'complex'
})

const buildingBgClass = computed(() => {
  const c = buildingColor.value
  const map: Record<string, string> = {
    '#6356f7': 'bg-gradient-to-br from-brand-50 via-white to-brand-50',
    '#10b981': 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50',
    '#f99007': 'bg-gradient-to-br from-gold-50 via-white to-gold-50',
    '#0ea5e9': 'bg-gradient-to-br from-sky-50 via-white to-sky-50',
    '#f43f5e': 'bg-gradient-to-br from-rose-50 via-white to-rose-50',
    '#8b5cf6': 'bg-gradient-to-br from-purple-50 via-white to-purple-50',
  }
  return map[c] || 'bg-gradient-to-br from-ink-50 via-white to-ink-50'
})

const roomColors = ['#6356f7', '#10b981', '#f99007', '#0ea5e9', '#f43f5e', '#8b5cf6']
const sketchRooms = computed(() => {
  const floorUnits = units.value.filter(u => u.floorId === activeFloor.value).slice(0, 6)
  const source = floorUnits.length ? floorUnits : units.value.slice(0, 4)
  const layout = [
    { x: 20, y: 20, w: 160, h: 100 },
    { x: 190, y: 20, w: 190, h: 60 },
    { x: 190, y: 90, w: 90, h: 90 },
    { x: 290, y: 90, w: 90, h: 90 },
    { x: 20, y: 130, w: 160, h: 100 },
  ]
  return source.map((u, i) => ({
    ...layout[i % layout.length],
    label: u.number || `Xona ${i + 1}`,
    area: u.area || 20,
    color: roomColors[i % roomColors.length],
  })).filter(r => r.w > 0)
})

const usageLabel = (t: string) => ({ OFFICE: 'Ofis', RETAIL: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar' }[t] || t)
const offerLabel = (t: string) => ({ RENT: 'Ijara', SALE: 'Sotuv' }[t] || t)
const typeLabel = (t: string) => ({ COMMERCIAL: 'Kommersiya', RESIDENTIAL: 'Turar', MIXED: 'Aralash' }[t] || t)
</script>
