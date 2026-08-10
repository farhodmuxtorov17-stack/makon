
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Binolar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ buildings.length }} ta bino ro'yxatda</p>
      </div>
      <button class="btn btn-primary btn-md" @click="showAddModal = true">
        <Plus :size="16" /> Bino qo'shish
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" class="input pl-10" placeholder="Bino nomi, manzil..." />
        </div>
        <select v-model="filterType" class="input w-auto">
          <option value="">Barcha turlari</option>
          <option value="BUSINESS_CENTER">Biznes markaz</option>
          <option value="OFFICE">Ofis</option>
          <option value="MIXED">Aralash</option>
        </select>
        <select v-model="filterStatus" class="input w-auto">
          <option value="">Barcha holatlar</option>
          <option value="published">Nashr etilgan</option>
          <option value="unpublished">Nashr etilmagan</option>
        </select>
      </div>
    </div>

    <!-- Cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <NuxtLink
        v-for="b in filtered"
        :key="b.id"
        :to="`/management/buildings/${b.id}`"
        class="card overflow-hidden card-hover group"
      >
        <div class="relative h-44 overflow-hidden">
          <img :src="b.gallery[0]" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
            <span class="badge" :class="b.isPublished ? 'badge-success' : 'badge-neutral'">
              {{ b.isPublished ? 'Nashr etilgan' : 'Yashirin' }}
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>
        <div class="p-5">
          <h3 class="text-white font-semibold mb-1">{{ b.name }}</h3>
          <p class="text-sm text-ink-500 flex items-center gap-1 mb-3">
            <MapPin :size="12" /> {{ b.district }}, {{ b.city }}
          </p>
          <div class="flex items-center justify-between text-sm">
            <div class="flex gap-3">
              <span class="text-ink-400">{{ b.totalUnits }} unit</span>
              <span class="text-ink-400">{{ b.floorsCount }} qavat</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="status-dot" :class="b.vacantUnits > 0 ? 'status-dot-vacant' : 'status-dot-rented'" />
              <span class="text-white font-medium">{{ b.occupiedUnits }}/{{ b.totalUnits }}</span>
            </div>
          </div>
          <!-- Occupancy bar -->
          <div class="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="occupancyPct(b) > 90 ? 'bg-emerald-500' : occupancyPct(b) > 70 ? 'bg-brand-500' : 'bg-amber-500'"
              :style="{ width: occupancyPct(b) + '%' }"
            />
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Add modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAddModal = false" />
      <div class="relative card p-6 w-full max-w-md animate-fade-in">
        <h3 class="text-white font-semibold mb-4">Yangi bino qo'shish</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Nomi</label>
            <input class="input" placeholder="Bino nomi" />
          </div>
          <div>
            <label class="label">Turi</label>
            <select class="input">
              <option>Biznes markaz</option>
              <option>Ofis</option>
              <option>Savdo</option>
            </select>
          </div>
          <div>
            <label class="label">Manzil</label>
            <input class="input" placeholder="Toshkent, ..." />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Qavatlar soni</label>
              <input type="number" class="input" placeholder="0" />
            </div>
            <div>
              <label class="label">Maydon (m²)</label>
              <input type="number" class="input" placeholder="0" />
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="btn btn-secondary flex-1" @click="showAddModal = false">Bekor qilish</button>
          <button class="btn btn-primary flex-1" @click="showAddModal = false">Saqlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Search, MapPin } from 'lucide-vue-next'
import { buildings } from '~/utils/mockData'
import type { BuildingType } from '~/types'

const search = ref('')
const filterType = ref('')
const filterStatus = ref('')
const showAddModal = ref(false)

function typeLabel(t: BuildingType) {
  const map: Record<BuildingType, string> = {
    BUSINESS_CENTER: 'Biznes markaz',
    OFFICE: 'Ofis',
    SHOPPING: 'Savdo',
    WAREHOUSE: 'Ombor',
    RESIDENTIAL: 'Turar joy',
    MIXED: 'Aralash',
  }
  return map[t] || t
}

function occupancyPct(b: { occupiedUnits: number; totalUnits: number }) {
  return Math.round((b.occupiedUnits / b.totalUnits) * 100)
}

const filtered = computed(() => {
  let r = [...buildings]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(b => b.name.toLowerCase().includes(q) || b.address.toLowerCase().includes(q))
  }
  if (filterType.value) r = r.filter(b => b.type === filterType.value)
  if (filterStatus.value === 'published') r = r.filter(b => b.isPublished)
  if (filterStatus.value === 'unpublished') r = r.filter(b => !b.isPublished)
  return r
})
</script>
