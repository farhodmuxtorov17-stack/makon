<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Binolar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredBuildings.length }} bino</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi bino
      </button>
    </div>

    <!-- Search + filters -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[240px]">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input v-model="search" type="text" placeholder="Bino nomi, manzil yoki tuman..." class="input pl-9" />
      </div>
      <select v-model="typeFilter" class="input w-auto">
        <option value="">Barcha turlar</option>
        <option value="BUSINESS_CENTER">Biznes markaz</option>
        <option value="OFFICE">Ofis</option>
        <option value="SHOPPING">Savdo markaz</option>
        <option value="WAREHOUSE">Ombor</option>
        <option value="RESIDENTIAL">Turar joy</option>
        <option value="MIXED">Aralash</option>
      </select>
      <select v-model="statusFilter" class="input w-auto">
        <option value="">Hammasi</option>
        <option value="vacant">Bo'sh joy bor</option>
        <option value="full">To'liq</option>
      </select>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <!-- Building cards -->
    <div v-else-if="data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="b in filteredBuildings" :key="b.id" class="card overflow-hidden group cursor-pointer" @click="openBuilding(b)">
        <div class="h-40 overflow-hidden bg-ink-900 relative">
          <img v-if="b.gallery && b.gallery[0]" :src="b.gallery[0]" :alt="b.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div v-else class="w-full h-full flex items-center justify-center"><Building2 :size="40" class="text-ink-600" /></div>
          <div class="absolute top-3 right-3 flex gap-2">
            <span class="badge badge-brand text-xs">{{ typeLabel(b.type) }}</span>
            <span v-if="b.vacantUnits > 0" class="badge badge-success text-xs">{{ b.vacantUnits }} bo'sh</span>
            <span v-else class="badge badge-neutral text-xs">To'liq</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold mb-1">{{ b.name }}</h3>
          <p class="text-xs text-ink-500 mb-3 flex items-center gap-1"><MapPin :size="12" /> {{ b.address }}, {{ b.district }}</p>
          <div class="grid grid-cols-4 gap-2 text-xs">
            <div><div class="text-ink-600">Qavat</div><div class="font-medium">{{ b.floorsCount }}</div></div>
            <div><div class="text-ink-600">Unit</div><div class="font-medium">{{ b.totalUnits }}</div></div>
            <div><div class="text-ink-600">Band</div><div class="font-medium text-emerald-400">{{ b.occupiedUnits }}</div></div>
            <div><div class="text-ink-600">m²</div><div class="font-medium">{{ formatArea(b.totalArea) }}</div></div>
          </div>
          <!-- Occupancy bar -->
          <div class="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" :style="{ width: occupancyPct(b) + '%' }"></div>
          </div>
        </div>
      </div>

      <div v-if="filteredBuildings.length === 0" class="md:col-span-3 text-center py-12 text-ink-500">
        Filtr bo'yicha binolar topilmadi
      </div>
    </div>

    <!-- Building detail drawer -->
    <div v-if="selectedBuilding" class="fixed inset-0 z-50 flex justify-end" @click.self="selectedBuilding = null">
      <div class="absolute inset-0 bg-black/60" @click="selectedBuilding = null" />
      <div class="relative w-full max-w-2xl bg-ink-900 border-l border-white/10 overflow-y-auto animate-slide-in">
        <!-- Header -->
        <div class="relative h-56">
          <img v-if="selectedBuilding.gallery && selectedBuilding.gallery[0]" :src="selectedBuilding.gallery[0]" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent"></div>
          <button @click="selectedBuilding = null" class="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/40 backdrop-blur flex items-center justify-center hover:bg-black/60">
            <X :size="16" />
          </button>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-brand">{{ typeLabel(selectedBuilding.type) }}</span>
              <span v-if="selectedBuilding.vacantUnits > 0" class="badge badge-success">{{ selectedBuilding.vacantUnits }} bo'sh</span>
            </div>
            <h2 class="text-2xl font-bold">{{ selectedBuilding.name }}</h2>
            <p class="text-sm text-ink-400 flex items-center gap-1 mt-1"><MapPin :size="14" /> {{ selectedBuilding.address }}, {{ selectedBuilding.district }}</p>
          </div>
        </div>

        <!-- Gallery -->
        <div v-if="selectedBuilding.gallery && selectedBuilding.gallery.length > 1" class="p-4">
          <div class="grid grid-cols-4 gap-2">
            <div v-for="(img, i) in selectedBuilding.gallery" :key="i" class="aspect-square rounded-lg overflow-hidden bg-ink-800">
              <img :src="img" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="px-4 py-2">
          <div class="grid grid-cols-3 gap-3 mb-4">
            <div class="card p-3 text-center">
              <div class="text-xl font-bold">{{ selectedBuilding.floorsCount }}</div>
              <div class="text-xs text-ink-500">Qavatlar</div>
            </div>
            <div class="card p-3 text-center">
              <div class="text-xl font-bold">{{ selectedBuilding.totalUnits }}</div>
              <div class="text-xs text-ink-500">Jami unit</div>
            </div>
            <div class="card p-3 text-center">
              <div class="text-xl font-bold text-emerald-400">{{ occupancyPct(selectedBuilding) }}%</div>
              <div class="text-xs text-ink-500">Bandlik</div>
            </div>
          </div>

          <!-- Floor visualization -->
          <div class="card p-4 mb-3">
            <h3 class="font-semibold text-sm mb-3">Qavatlar bo'yicha ko'rinish</h3>
            <div class="space-y-1.5">
              <div v-for="f in floors" :key="f.floor" class="flex items-center gap-3 group cursor-pointer hover:bg-white/5 p-1.5 rounded-lg transition-colors"
                :class="f.floor === selectedFloor ? 'bg-white/5' : ''"
                @click="selectedFloor = f.floor">
                <div class="w-8 text-xs text-ink-500 text-center">{{ f.floor }}</div>
                <div class="flex-1 h-8 rounded-md overflow-hidden flex gap-0.5 bg-ink-800">
                  <div v-for="u in f.units" :key="u" class="flex-1 rounded-sm transition-all"
                    :class="u <= f.occupied ? 'bg-emerald-500/60' : 'bg-brand-500/40 group-hover:bg-brand-500/60'"></div>
                </div>
                <div class="w-12 text-xs text-right text-ink-500">{{ f.occupied }}/{{ f.units }}</div>
              </div>
            </div>
            <div class="flex items-center gap-4 mt-3 text-xs">
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm bg-emerald-500/60"></span> Band</span>
              <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm bg-brand-500/40"></span> Bo'sh</span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="selectedBuilding.publicDescription" class="card p-4 mb-3">
            <h3 class="font-semibold text-sm mb-2">Tavsif</h3>
            <p class="text-sm text-ink-400 leading-relaxed">{{ selectedBuilding.publicDescription }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 pb-4">
            <NuxtLink :to="`/buildings/${selectedBuilding.slug}`" class="btn btn-primary flex-1 text-center text-sm">Boshqarish</NuxtLink>
            <button class="btn btn-secondary text-sm">
              <Edit :size="14" /> Tahrirlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Building2, MapPin, X, Edit } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-buildings', () => fetchAdminData('buildings'))

const search = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const selectedBuilding = ref<any>(null)
const selectedFloor = ref(1)

const filteredBuildings = computed(() => {
  if (!data.value?.buildings) return []
  let result = [...data.value.buildings]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(b => 
      b.name?.toLowerCase().includes(q) || 
      b.address?.toLowerCase().includes(q) || 
      b.district?.toLowerCase().includes(q)
    )
  }
  if (typeFilter.value) result = result.filter(b => b.type === typeFilter.value)
  if (statusFilter.value === 'vacant') result = result.filter(b => (b.vacantUnits || 0) > 0)
  if (statusFilter.value === 'full') result = result.filter(b => (b.vacantUnits || 0) === 0)

  return result
})

// Generate floor data for selected building
const floors = computed(() => {
  if (!selectedBuilding.value) return []
  const total = selectedBuilding.value.floorsCount || 1
  const totalUnits = selectedBuilding.value.totalUnits || 0
  const occupied = selectedBuilding.value.occupiedUnits || 0
  const unitsPerFloor = Math.ceil(totalUnits / total)

  const result = []
  let remainingOccupied = occupied
  for (let f = total; f >= 1; f--) {
    const floorOccupied = Math.min(unitsPerFloor, remainingOccupied)
    remainingOccupied -= floorOccupied
    result.push({ floor: f, units: unitsPerFloor, occupied: Math.max(0, floorOccupied) })
  }
  return result
})

function openBuilding(b: any) {
  selectedBuilding.value = b
  selectedFloor.value = 1
}

function occupancyPct(b: any) {
  if (!b.totalUnits) return 0
  return Math.round((b.occupiedUnits / b.totalUnits) * 100)
}

function typeLabel(type: string) {
  return { BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash' }[type] || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}
</script>
