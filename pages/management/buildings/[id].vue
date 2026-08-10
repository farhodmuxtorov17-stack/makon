
<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/management/buildings" class="hover:text-white transition-colors">Binolar</NuxtLink>
      <ChevronRight :size="14" class="text-ink-700" />
      <span class="text-white">{{ building?.name }}</span>
    </div>

    <!-- Building header -->
    <div class="card p-6">
      <div class="flex items-start justify-between flex-wrap gap-4">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
            <Building2 :size="28" class="text-brand-400" />
          </div>
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-brand">{{ typeLabel }}</span>
              <span class="badge" :class="building?.isPublished ? 'badge-success' : 'badge-neutral'">
                {{ building?.isPublished ? 'Nashr etilgan' : 'Nashr etilmagan' }}
              </span>
            </div>
            <h1 class="text-2xl font-bold text-white">{{ building?.name }}</h1>
            <p class="text-ink-400 text-sm mt-1 flex items-center gap-1.5">
              <MapPin :size="14" /> {{ building?.address }}
            </p>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm">
            <Edit :size="14" /> Tahrirlash
          </button>
          <NuxtLink :to="`/buildings/${building?.id}/3d`" class="btn btn-primary btn-sm">
            <Box :size="14" /> 3D ko'rinish
          </NuxtLink>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-2xl font-bold text-white">{{ building?.totalUnits }}</div>
          <div class="text-xs text-ink-500 mt-0.5">Jami unitlar</div>
        </div>
        <div class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-2xl font-bold text-emerald-400">{{ building?.occupiedUnits }}</div>
          <div class="text-xs text-ink-500 mt-0.5">Band</div>
        </div>
        <div class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-2xl font-bold text-brand-400">{{ building?.vacantUnits }}</div>
          <div class="text-xs text-ink-500 mt-0.5">Bo'sh</div>
        </div>
        <div class="text-center p-3 rounded-xl bg-white/5">
          <div class="text-2xl font-bold text-white">{{ building?.totalArea.toLocaleString() }}</div>
          <div class="text-xs text-ink-500 mt-0.5">m² maydon</div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-white text-ink-900' : 'text-ink-400 hover:text-white'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Overview tab -->
    <div v-if="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="card p-6 lg:col-span-2">
        <h3 class="text-white font-semibold mb-4">Galerеya</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="(img, i) in building?.gallery" :key="i" class="rounded-xl overflow-hidden h-48">
            <img :src="img" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer" />
          </div>
        </div>
        <h3 class="text-white font-semibold mt-6 mb-3">Tavsif</h3>
        <p class="text-ink-400 text-sm leading-relaxed">{{ building?.publicDescription }}</p>
      </div>

      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="text-white font-semibold mb-3">Binoning parametrlari</h3>
          <div class="space-y-2.5 text-sm">
            <div class="flex justify-between"><span class="text-ink-500">Turi</span><span class="text-white">{{ typeLabel }}</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Tuman</span><span class="text-white">{{ building?.district }}</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Qavatlar</span><span class="text-white">{{ building?.floorsCount }}</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Maydon</span><span class="text-white">{{ building?.totalArea.toLocaleString() }} m²</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Rahbar</span><span class="text-white">{{ managerName }}</span></div>
          </div>
        </div>
        <div class="card p-5">
          <h3 class="text-white font-semibold mb-3">Bandlik grafigi</h3>
          <div class="relative h-3 rounded-full bg-white/5 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full" :style="{ width: occupancyPct + '%' }" />
          </div>
          <div class="flex justify-between mt-2 text-sm">
            <span class="text-ink-500">{{ occupancyPct }}% band</span>
            <span class="text-white font-medium">{{ building?.occupiedUnits }}/{{ building?.totalUnits }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Floors tab -->
    <div v-if="activeTab === 'floors'" class="card p-6">
      <h3 class="text-white font-semibold mb-4">Qavatlar ro'yxati</h3>
      <div class="space-y-2">
        <div
          v-for="floor in floorList"
          :key="floor.id"
          class="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg font-bold text-white">
            {{ floor.number }}
          </div>
          <div class="flex-1">
            <div class="text-sm text-white font-medium">{{ floor.number }}-qavat</div>
            <div class="text-xs text-ink-500">{{ floor.area.toLocaleString() }} m² · {{ floor.units }} unit</div>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge" :class="floor.vacant > 0 ? 'badge-success' : 'badge-neutral'">
              {{ floor.vacant > 0 ? floor.vacant + ' bo' + "'" + 'sh' : 'To' + "'" + 'liq band' }}
            </span>
            <NuxtLink :to="`/floors/${floor.id}/plan`" class="btn btn-secondary btn-sm">
              <Map :size="14" /> Plan
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Units tab -->
    <div v-if="activeTab === 'units'" class="card p-6">
      <h3 class="text-white font-semibold mb-4">Bo'sh unitlar</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Qavat</th>
              <th>Maydon</th>
              <th>Turi</th>
              <th>Narx</th>
              <th>Holat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in vacantUnits" :key="unit.id" class="table-row-hover">
              <td class="text-white font-medium">{{ unit.number }}</td>
              <td>{{ unit.floor }}</td>
              <td>{{ unit.area }} m²</td>
              <td>{{ unit.usageType }}</td>
              <td class="text-white">{{ formatPriceShort(unit.price) }}</td>
              <td><span class="badge badge-success">Bo'sh</span></td>
              <td>
                <NuxtLink :to="`/units/${unit.id}`" class="text-brand-400 hover:text-brand-300 text-sm">
                  Ko'rish →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Building2, MapPin, ChevronRight, Box, Edit, Map } from 'lucide-vue-next'
import { buildings } from '~/utils/mockData'

const route = useRoute()
const { formatPriceShort } = useFormat()

const building = computed(() => buildings.find(b => b.id === route.params.id || b.slug === route.params.slug))

const activeTab = ref('overview')
const tabs = [
  { id: 'overview', label: 'Umumiy' },
  { id: 'floors', label: 'Qavatlar' },
  { id: 'units', label: 'Unitlar' },
]

const typeLabel = computed(() => {
  const map: Record<string, string> = {
    BUSINESS_CENTER: 'Biznes markaz',
    OFFICE: 'Ofis',
    SHOPPING: 'Savdo',
    WAREHOUSE: 'Ombor',
    RESIDENTIAL: 'Turar joy',
    MIXED: 'Aralash',
  }
  return map[building.value?.type || ''] || ''
})

const managerName = 'Sardor Karimov'

const occupancyPct = computed(() => {
  if (!building.value) return 0
  return Math.round((building.value.occupiedUnits / building.value.totalUnits) * 100)
})

const floorList = computed(() => {
  if (!building.value) return []
  return Array.from({ length: building.value.floorsCount }, (_, i) => ({
    id: `f${i + 1}`,
    number: i + 1,
    area: Math.round(building.value!.totalArea / building.value!.floorsCount),
    units: Math.round(building.value!.totalUnits / building.value!.floorsCount),
    vacant: Math.max(0, Math.round(building.value!.vacantUnits / building.value!.floorsCount * (i < 3 ? 2 : 0.5))),
  })).reverse()
})

const vacantUnits = [
  { id: 'u-101', number: 'A-5', floor: 25, area: 120, usageType: 'OFFICE', price: 18000000 },
  { id: 'u-102', number: 'B-12', floor: 12, area: 85, usageType: 'OFFICE', price: 12750000 },
  { id: 'u-103', number: 'C-8', floor: 8, area: 200, usageType: 'OFFICE', price: 30000000 },
  { id: 'u-104', number: 'D-3', floor: 3, area: 65, usageType: 'OFFICE', price: 9750000 },
  { id: 'u-105', number: 'E-1', floor: 1, area: 300, usageType: 'RETAIL', price: 45000000 },
]
</script>
