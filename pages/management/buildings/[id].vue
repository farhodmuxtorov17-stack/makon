<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">{{ building.name }}</h1>
      <p class="text-ink-500 text-sm mt-1">{{ building.address }} · {{ building.floorsCount }} qavat · {{ building.totalUnits }} unit</p>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all"
        :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Passport -->
    <div v-if="activeTab === 'passport'" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-6 lg:col-span-2">
        <h3 class="font-semibold mb-4">Bino pasporti</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div><div class="text-xs text-ink-500">Nomi</div><div class="font-medium mt-1">{{ building.name }}</div></div>
          <div><div class="text-xs text-ink-500">Manzil</div><div class="font-medium mt-1">{{ building.address }}</div></div>
          <div><div class="text-xs text-ink-500">Tuman</div><div class="font-medium mt-1">{{ building.district }}</div></div>
          <div><div class="text-xs text-ink-500">Turi</div><div class="font-medium mt-1">{{ building.type }}</div></div>
          <div><div class="text-xs text-ink-500">Qavatlar</div><div class="font-medium mt-1">{{ building.floorsCount }}</div></div>
          <div><div class="text-xs text-ink-500">Maydon</div><div class="font-medium mt-1">{{ building.totalArea }} m²</div></div>
          <div><div class="text-xs text-ink-500">Jami unit</div><div class="font-medium mt-1">{{ building.totalUnits }}</div></div>
          <div><div class="text-xs text-ink-500">Band</div><div class="font-medium mt-1 text-emerald-500">{{ building.occupiedUnits }}</div></div>
          <div><div class="text-xs text-ink-500">Bo\'sh</div><div class="font-medium mt-1 text-amber-500">{{ building.vacantUnits }}</div></div>
        </div>
      </div>
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Holat</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between"><span class="text-sm text-ink-500">3D model</span><span class="badge badge-success text-xs">Tayyor</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-ink-500">2D plan</span><span class="badge badge-success text-xs">Tayyor</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-ink-500">Public</span><span class="badge badge-success text-xs">Nashr etilgan</span></div>
          <div class="flex items-center justify-between"><span class="text-sm text-ink-500">Galereya</span><span class="badge badge-brand text-xs">12 rasm</span></div>
        </div>
        <div class="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
          <button class="btn btn-secondary btn-sm w-full"><Eye :size="14" /> Public sahifa</button>
          <NuxtLink :to="`/buildings/${building.id}/3d`" class="btn btn-secondary btn-sm w-full"><Box :size="14" /> 3D ko\'rish</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Floors -->
    <div v-if="activeTab === 'floors'" class="card p-6">
      <h3 class="font-semibold mb-4">Qavatlar ro\'yxati</h3>
      <div class="space-y-2">
        <div v-for="floor in floors" :key="floor.num" class="flex items-center gap-4 p-3 rounded-xl hover:bg-black/3 dark:hover:bg-white/3">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-500">{{ floor.num }}</div>
          <div class="flex-1">
            <div class="text-sm font-medium">{{ floor.num }}-qavat</div>
            <div class="text-xs text-ink-500">{{ floor.totalUnits }} unit · {{ floor.vacantUnits }} bo\'sh · 2D: {{ floor.hasPlan ? 'tayyor' : 'yo\'q' }}</div>
          </div>
          <NuxtLink :to="`/floors/${floor.id}/plan`" class="btn btn-ghost btn-sm"><Map :size="14" /> 2D reja</NuxtLink>
          <NuxtLink :to="`/management/buildings/${building.id}/units`" class="btn btn-ghost btn-sm"><Layers :size="14" /> Unitlar</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Gallery -->
    <div v-if="activeTab === 'gallery'" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Fotogalereya</h3>
        <button class="btn btn-primary btn-sm"><Plus :size="14" /> Rasm qo\'shish</button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="i in 8" :key="i" class="aspect-square rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-700/20 flex items-center justify-center">
          <Building2 :size="24" class="text-brand-500/30" />
        </div>
      </div>
    </div>

    <!-- Documents -->
    <div v-if="activeTab === 'docs'" class="card p-6">
      <h3 class="font-semibold mb-4">Hujjatlar</h3>
      <div class="space-y-2">
        <div v-for="doc in docs" :key="doc.name" class="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <FileText :size="18" class="text-brand-500" />
          <div class="flex-1">
            <div class="text-sm font-medium">{{ doc.name }}</div>
            <div class="text-xs text-ink-500">{{ doc.type }} · {{ doc.size }}</div>
          </div>
          <button class="btn btn-ghost btn-sm"><Download :size="14" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, Box, Map, Layers, Plus, Building2, FileText, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const activeTab = ref('passport')
const tabs = [
  { value: 'passport', label: 'Pasport' },
  { value: 'floors', label: 'Qavatlar' },
  { value: 'gallery', label: 'Galereya' },
  { value: 'docs', label: 'Hujjatlar' },
]

const building = {
  id: route.params.id, name: 'Tashkent City', address: 'Tashkent sh., Mirzo Ulug\'bek tumani', district: 'Mirzo Ulug\'bek',
  type: 'Biznes markaz', floorsCount: 12, totalArea: 28000, totalUnits: 420, occupiedUnits: 378, vacantUnits: 42,
}

const floors = [
  { id: 'f12', num: 12, totalUnits: 35, vacantUnits: 2, hasPlan: true },
  { id: 'f11', num: 11, totalUnits: 35, vacantUnits: 4, hasPlan: true },
  { id: 'f10', num: 10, totalUnits: 35, vacantUnits: 3, hasPlan: true },
  { id: 'f9', num: 9, totalUnits: 35, vacantUnits: 5, hasPlan: true },
  { id: 'f8', num: 8, totalUnits: 35, vacantUnits: 4, hasPlan: false },
  { id: 'f7', num: 7, totalUnits: 35, vacantUnits: 8, hasPlan: true },
]

const docs = [
  { name: 'Texnik pasport.pdf', type: 'PDF', size: '2.4 MB' },
  { name: 'Arxitektura loyihasi.pdf', type: 'PDF', size: '12 MB' },
  { name: '3D model.glb', type: 'GLB', size: '45 MB' },
  { name: 'Foto obeyektga.djvu', type: 'DJVU', size: '5.6 MB' },
]
</script>
