<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/management/buildings" class="hover:text-white">Binolar</NuxtLink>
      <ChevronRight :size="14" class="text-ink-700" />
      <span class="text-white">{{ floorId }}-qavat plani</span>
    </div>

    <div class="card p-4">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <h1 class="text-xl font-bold text-white">{{ floorId }}-qavat · 2D plan</h1>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm"><Upload :size="14" /> SVG import</button>
          <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        </div>
      </div>
    </div>

    <!-- Floor plan SVG -->
    <div class="card p-6">
      <div class="relative bg-ink-900 rounded-xl overflow-hidden" style="height: 500px;">
        <svg viewBox="0 0 800 500" class="w-full h-full">
          <!-- Grid background -->
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill="url(#grid)" />

          <!-- Building outline -->
          <rect x="50" y="50" width="700" height="400" fill="none" stroke="rgba(99,102,241,0.3)" stroke-width="2" rx="4" />

          <!-- Units -->
          <g v-for="unit in floorUnits" :key="unit.id" @click="selectUnit(unit)">
            <rect :x="unit.x" :y="unit.y" :width="unit.w" :height="unit.h"
              :fill="unit.status === 'vacant' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)'"
              :stroke="unit.status === 'vacant' ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'"
              stroke-width="1.5" rx="3"
              :class="{ 'cursor-pointer': unit.status === 'vacant' }" />
            <text :x="unit.x + unit.w/2" :y="unit.y + unit.h/2" text-anchor="middle"
              :fill="unit.status === 'vacant' ? '#818cf8' : 'rgba(255,255,255,0.3)'"
              font-size="12" font-family="monospace">{{ unit.label }}</text>
            <text :x="unit.x + unit.w/2" :y="unit.y + unit.h/2 + 14" text-anchor="middle"
              :fill="unit.status === 'vacant' ? 'rgba(129,140,248,0.6)' : 'rgba(255,255,255,0.2)'"
              font-size="9">{{ unit.area }}m²</text>
          </g>

          <!-- Corridor -->
          <rect x="50" y="230" width="700" height="40" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4 4" />
          <text x="400" y="255" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="10">KORIDOR</text>
        </svg>

        <!-- Legend -->
        <div class="absolute top-4 right-4 glass rounded-lg px-3 py-2 flex gap-3 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background: rgba(99,102,241,0.3)" /> Bo'sh</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded" style="background: rgba(255,255,255,0.05)" /> Band</span>
        </div>
      </div>
    </div>

    <!-- Selected unit info -->
    <div v-if="selectedUnit" class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-sm text-ink-500">Tanlangan unit</div>
          <h3 class="text-xl font-bold text-white">{{ selectedUnit.label }}</h3>
          <div class="flex gap-4 mt-2 text-sm text-ink-400">
            <span>{{ selectedUnit.area }} m²</span>
            <span>{{ selectedUnit.type }}</span>
          </div>
        </div>
        <NuxtLink :to="'/catalog/' + selectedUnit.listingId" class="btn btn-primary btn-sm">
          Ko'rish →
        </NuxtLink>
      </div>
    </div>

    <!-- Units table -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-white/5">
        <h3 class="text-white font-semibold">Qavat bo'yicha unitlar</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr><th>Unit</th><th>Maydon</th><th>Turi</th><th>Holat</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="u in floorUnits" :key="u.id" class="table-row-hover">
              <td class="text-white font-mono text-xs">{{ u.label }}</td>
              <td class="text-ink-400">{{ u.area }} m²</td>
              <td class="text-ink-400">{{ u.type }}</td>
              <td><span class="badge" :class="u.status === 'vacant' ? 'badge-success' : 'badge-neutral'">{{ u.status === 'vacant' ? 'Bo\'sh' : 'Band' }}</span></td>
              <td><button class="text-brand-400 text-sm" @click="selectUnit(u)">→</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Upload, Download } from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const floorId = computed(() => route.params.id as string)

const floorUnits = [
  { id: 'u1', label: 'A-01', x: 60, y: 60, w: 140, h: 80, area: 120, type: 'OFFICE', status: 'rented', listingId: 'l1' },
  { id: 'u2', label: 'A-02', x: 210, y: 60, w: 100, h: 80, area: 85, type: 'OFFICE', status: 'vacant', listingId: 'l2' },
  { id: 'u3', label: 'A-03', x: 320, y: 60, w: 160, h: 80, area: 140, type: 'OFFICE', status: 'rented', listingId: '' },
  { id: 'u4', label: 'A-04', x: 490, y: 60, w: 120, h: 80, area: 95, type: 'OFFICE', status: 'vacant', listingId: '' },
  { id: 'u5', label: 'A-05', x: 620, y: 60, w: 120, h: 80, area: 100, type: 'OFFICE', status: 'rented', listingId: '' },
  { id: 'u6', label: 'B-01', x: 60, y: 280, w: 120, h: 100, area: 110, type: 'OFFICE', status: 'rented', listingId: '' },
  { id: 'u7', label: 'B-02', x: 190, y: 280, w: 140, h: 100, area: 130, type: 'OFFICE', status: 'vacant', listingId: '' },
  { id: 'u8', label: 'B-03', x: 340, y: 280, w: 100, h: 100, area: 75, type: 'OFFICE', status: 'rented', listingId: '' },
  { id: 'u9', label: 'B-04', x: 450, y: 280, w: 130, h: 100, area: 115, type: 'OFFICE', status: 'vacant', listingId: '' },
  { id: 'u10', label: 'B-05', x: 590, y: 280, w: 150, h: 100, area: 140, type: 'OFFICE', status: 'rented', listingId: '' },
]

const selectedUnit = ref<typeof floorUnits[0] | null>(null)

function selectUnit(u: typeof floorUnits[0]) { selectedUnit.value = u }
</script>
