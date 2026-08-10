<template>
  <div class="space-y-6">
    <NuxtLink to="/management/buildings" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Binolarga qaytish
    </NuxtLink>

    <div class="card overflow-hidden">
      <div class="aspect-[21/9] overflow-hidden bg-ink-100 relative">
        <img :src="building.image" :alt="building.name" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"></div>
        <div class="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-success">Nashr qilingan</span>
              <span class="badge badge-neutral">{{ building.type }}</span>
            </div>
            <h1 class="font-display text-3xl font-bold text-white">{{ building.name }}</h1>
            <p class="text-white/70 flex items-center gap-1.5 mt-1"><MapPin :size="14" /> {{ building.district }}, {{ building.city }}</p>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div class="text-center py-4 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.floorsCount }}</p>
            <p class="text-xs text-ink-400 mt-0.5">Qavatlar</p>
          </div>
          <div class="text-center py-4 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.totalArea }}</p>
            <p class="text-xs text-ink-400 mt-0.5">m² maydon</p>
          </div>
          <div class="text-center py-4 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display text-emerald-600">{{ building.occupancy }}%</p>
            <p class="text-xs text-ink-400 mt-0.5">Bandlik</p>
          </div>
          <div class="text-center py-4 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.units }}</p>
            <p class="text-xs text-ink-400 mt-0.5">Maydonlar</p>
          </div>
          <div class="text-center py-4 rounded-xl bg-ink-50">
            <p class="text-2xl font-bold font-display">{{ building.parking }}</p>
            <p class="text-xs text-ink-400 mt-0.5">Parkovka</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Units -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Maydonlar</h3>
        <div class="flex gap-2">
          <button v-for="f in floorFilter" :key="f.id" @click="activeFloor = f.id"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            :class="activeFloor === f.id ? 'bg-ink-900 text-white' : 'text-ink-500 hover:bg-ink-100'">
            {{ f.label }}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div v-for="unit in filteredUnits" :key="unit.id" class="border border-ink-100 rounded-xl p-4 hover:border-brand-200 hover:shadow-card-hover transition-all cursor-pointer">
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-sm font-semibold text-ink-900">{{ unit.number }}</span>
            <StatusBadge :status="unit.status" :variant="unit.status === 'RENTED' ? 'success' : unit.status === 'VACANT' ? 'info' : 'neutral'"
              :label="unitStatusLabel(unit.status)" dot />
          </div>
          <p class="text-sm text-ink-500">{{ unit.area }} m² · {{ unit.type }}</p>
          <p class="font-semibold text-sm mt-2">{{ formatPrice(unit.price) }} <span class="text-ink-400 text-xs font-normal">so'm/oy</span></p>
        </div>
      </div>
    </div>

    <!-- Building specs -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Texnik xususiyatlar</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div v-for="spec in specs" :key="spec.label" class="flex items-center justify-between p-3 rounded-lg bg-ink-50">
            <span class="text-ink-500">{{ spec.label }}</span>
            <span class="font-semibold">{{ spec.value }}</span>
          </div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Qulayliklar</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="a in amenities" :key="a" class="flex items-center gap-2 text-sm text-ink-600">
            <Check :size="16" class="text-emerald-500" /> {{ a }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin, Check } from 'lucide-vue-next'
import type { UnitStatus } from '~/types'

const route = useRoute()

const building = {
  id: route.params.id,
  name: 'Trilliant Tower',
  type: 'A+ Biznes markaz',
  district: 'Yunusobod',
  city: 'Toshkent',
  floorsCount: 14,
  totalArea: '15.8K',
  occupancy: 94,
  units: 141,
  parking: 750,
  image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
}

const activeFloor = ref('all')
const floorFilter = [
  { id: 'all', label: 'Hammasi' },
  { id: 'A', label: 'A blok' },
  { id: 'B', label: 'B blok' },
]

const units = [
  { id: 'u1', number: 'A-101', area: 85, type: 'Ofis', price: 9500000, status: 'RENTED' as UnitStatus, floor: 'A' },
  { id: 'u2', number: 'A-102', area: 120, type: 'Ofis', price: 12500000, status: 'VACANT' as UnitStatus, floor: 'A' },
  { id: 'u3', number: 'A-201', area: 65, type: 'Ofis', price: 7200000, status: 'RENTED' as UnitStatus, floor: 'A' },
  { id: 'u4', number: 'A-202', area: 95, type: 'Ofis', price: 9800000, status: 'VACANT' as UnitStatus, floor: 'A' },
  { id: 'u5', number: 'B-101', area: 200, type: 'Savdo', price: 18000000, status: 'RENTED' as UnitStatus, floor: 'B' },
  { id: 'u6', number: 'B-102', area: 150, type: 'Savdo', price: 13500000, status: 'MAINTENANCE' as UnitStatus, floor: 'B' },
  { id: 'u7', number: 'B-201', area: 110, type: 'Ofis', price: 11200000, status: 'VACANT' as UnitStatus, floor: 'B' },
  { id: 'u8', number: 'B-202', area: 88, type: 'Ofis', price: 9200000, status: 'RENTED' as UnitStatus, floor: 'B' },
]

const filteredUnits = computed(() => {
  if (activeFloor.value === 'all') return units
  return units.filter(u => u.floor === activeFloor.value)
})

const specs = [
  { label: 'Sinf', value: 'A+' },
  { label: 'Shahar', value: 'Toshkent' },
  { label: 'Liftlar', value: '5+2' },
  { label: 'Shift balandligi', value: '4.38 m' },
  { label: 'LEED sertifikat', value: 'Gold' },
  { label: 'Parkovka', value: '750 o\'rin' },
]

const amenities = [
  '24/7 xavfsizlik', 'CCTV monitoring', 'Resepsiya xizmati', 'Markaziy konditsioner',
  'Fiber internet', 'Yuk lifti', 'Konferensiya zali', 'Kafe va restoran',
  'Bank, ATM', 'Changyutish xizmati', 'Elektromobil zaryad', 'Sustainable design',
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
