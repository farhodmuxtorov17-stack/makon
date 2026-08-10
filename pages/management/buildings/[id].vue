<template>
  <div class="space-y-6">
    <NuxtLink to="/management/buildings" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Binolarga qaytish
    </NuxtLink>

    <div class="card overflow-hidden">
      <div class="aspect-[21/9] overflow-hidden bg-ink-100">
        <img :src="building.image" :alt="building.name" class="w-full h-full object-cover" />
      </div>
      <div class="p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="font-display text-2xl font-bold">{{ building.name }}</h1>
            <p class="text-ink-400 flex items-center gap-1.5 mt-1"><MapPin :size="14" /> {{ building.district }}, {{ building.city }}</p>
          </div>
          <span class="badge badge-success">Nashr qilingan</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center py-3 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.floorsCount }}</p>
            <p class="text-xs text-ink-400">Qavatlar</p>
          </div>
          <div class="text-center py-3 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.totalArea }} m²</p>
            <p class="text-xs text-ink-400">Umumiy maydon</p>
          </div>
          <div class="text-center py-3 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display text-emerald-600">{{ building.occupancy }}%</p>
            <p class="text-xs text-ink-400">Bandlik</p>
          </div>
          <div class="text-center py-3 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.units }}</p>
            <p class="text-xs text-ink-400">Maydonlar</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Units -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Maydonlar</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="unit in units" :key="unit.id" class="border border-ink-100 rounded-xl p-4 hover:border-ink-200 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-sm font-semibold">{{ unit.number }}</span>
            <span class="badge" :class="unit.status === 'RENTED' ? 'badge-success' : unit.status === 'VACANT' ? 'badge-info' : 'badge-neutral'">
              {{ unitStatusLabel(unit.status) }}
            </span>
          </div>
          <p class="text-sm text-ink-500">{{ unit.area }} m² · {{ unit.type }}</p>
          <p class="font-semibold text-sm mt-2">{{ formatPrice(unit.price) }}/oy</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin } from 'lucide-vue-next'
import type { UnitStatus } from '~/types'

const route = useRoute()

const building = {
  id: route.params.id,
  name: 'Trillant Tower',
  district: 'Yashnobod',
  city: 'Toshkent',
  floorsCount: 12,
  totalArea: 8500,
  occupancy: 92,
  units: 48,
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
}

const units = [
  { id: 'u1', number: 'A-101', area: 85, type: 'Ofis', price: 9500000, status: 'RENTED' as UnitStatus },
  { id: 'u2', number: 'A-102', area: 120, type: 'Ofis', price: 12500000, status: 'VACANT' as UnitStatus },
  { id: 'u3', number: 'A-201', area: 65, type: 'Ofis', price: 7200000, status: 'RENTED' as UnitStatus },
  { id: 'u4', number: 'A-202', area: 95, type: 'Ofis', price: 9800000, status: 'VACANT' as UnitStatus },
  { id: 'u5', number: 'B-101', area: 200, type: 'Savdo', price: 18000000, status: 'RENTED' as UnitStatus },
  { id: 'u6', number: 'B-102', area: 150, type: 'Savdo', price: 13500000, status: 'MAINTENANCE' as UnitStatus },
]

function unitStatusLabel(s: UnitStatus): string {
  const m: Record<string, string> = { RENTED: 'Band', VACANT: 'Bo\'sh', MAINTENANCE: 'Ta\'mirda', DRAFT: 'Qoralama', SOLD: 'Sotildi', RESERVED: 'Zaxira' }
  return m[s] || s
}

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}
</script>
