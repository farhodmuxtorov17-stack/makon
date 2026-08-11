<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/management/buildings')" class="btn btn-ghost btn-sm p-2"><ArrowLeft :size="18" /></button>
        <div>
          <h1 class="text-2xl font-bold text-ink-900 dark:text-white">{{ building?.name || 'Bino' }}</h1>
          <p class="text-ink-500 text-sm mt-0.5">{{ building?.address }} · {{ building?.floorsCount }} qavat · {{ building?.totalUnits }} unit</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink :to="`/management/buildings/${route.params.id}/units`" class="btn btn-secondary btn-sm"><Layers :size="14" /> Unitlar</NuxtLink>
        <NuxtLink :to="`/buildings/${building?.slug || ''}`" class="btn btn-secondary btn-sm"><Eye :size="14" /> Public</NuxtLink>
      </div>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="text-xs text-ink-400 mb-1">Jami unitlar</div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ building?.totalUnits || 0 }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-400 mb-1">Band</div>
        <div class="text-xl font-bold text-emerald-500">{{ building?.occupiedUnits || 0 }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-400 mb-1">Bo'sh</div>
        <div class="text-xl font-bold text-amber-500">{{ building?.vacantUnits || 0 }}</div>
      </div>
      <div class="card p-4">
        <div class="text-xs text-ink-400 mb-1">Maydon</div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ building?.totalArea?.toLocaleString('ru-RU') || 0 }} m²</div>
      </div>
    </div>

    <!-- Building units -->
    <div class="card overflow-hidden">
      <div class="px-4 py-3 border-b border-ink-100 dark:border-white/10">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white">Unitlar ({{ buildingUnits.length }})</h3>
      </div>
      <table class="w-full" v-if="buildingUnits.length">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Unit</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Qavat</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Maydon</th>
            <th class="text-left text-xs text-ink-400 px-4 py-3">Status</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Ijara</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in buildingUnits" :key="u.id" class="border-b border-ink-50 dark:border-white/5 hover:bg-ink-50 dark:hover:bg-white/5">
            <td class="px-4 py-3 text-sm font-medium text-ink-900 dark:text-white">{{ u.unitNumber }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.floor }}</td>
            <td class="px-4 py-3 text-sm text-ink-400">{{ u.area }} m²</td>
            <td class="px-4 py-3">
              <span class="text-xs px-2 py-1 rounded-full" :class="u.status === 'OCCUPIED' ? 'bg-emerald-500/10 text-emerald-500' : u.status === 'RESERVED' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'">
                {{ statusLabel(u.status) }}
              </span>
            </td>
            <td class="px-4 py-3 text-right text-sm text-ink-600 dark:text-ink-300">{{ u.monthlyRent?.toLocaleString('ru-RU') || '—' }} {{ u.currency }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else class="px-4 py-8 text-center text-sm text-ink-400">Unitlar topilmadi</div>
    </div>

    <!-- Building info -->
    <div class="card p-5" v-if="building">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bino pasporti</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div><div class="text-xs text-ink-500">Tuman</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.district }}</div></div>
        <div><div class="text-xs text-ink-500">Qurilish yili</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.buildYear }}</div></div>
        <div><div class="text-xs text-ink-500">Kadastr</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.cadastralNumber }}</div></div>
        <div><div class="text-xs text-ink-500">Status</div>
          <span class="badge mt-1 text-xs" :class="building.isPublished ? 'badge-success' : 'badge-warning'">{{ building.isPublished ? 'Faol' : 'Qoralama' }}</span>
        </div>
        <div><div class="text-xs text-ink-500">3D model</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.has3dModel ? 'Bor' : 'Yo\'q' }}</div></div>
        <div><div class="text-xs text-ink-500">Qulayliklar</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ building.amenities?.length || 0 }} ta</div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Layers, Eye } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const store = useMakonStore()

const building = computed(() => store.buildings.find(b => b.id === route.params.id))
const buildingUnits = computed(() => store.units.filter(u => u.buildingId === route.params.id))

function statusLabel(s: string) {
  return { OCCUPIED: 'Band', RESERVED: 'Reserv', VACANT: 'Bo\'sh' }[s] || s
}
</script>
