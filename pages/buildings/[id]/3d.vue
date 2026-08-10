<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/management/buildings/${buildingId}`" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Bino pasporti</NuxtLink>
    </div>

    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">3D ko'rinish — Tashkent City</h1>
        <p class="text-ink-500 text-sm mt-1">Interaktiv 3D model, qavat tanlash va unit holati</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="viewMode = 'solid'" class="btn btn-sm" :class="viewMode === 'solid' ? 'btn-primary' : 'btn-secondary'"><Box :size="14" /> Solid</button>
        <button @click="viewMode = 'wireframe'" class="btn btn-sm" :class="viewMode === 'wireframe' ? 'btn-primary' : 'btn-secondary'"><Grid :size="14" /> Wireframe</button>
        <button @click="viewMode = 'xray'" class="btn btn-sm" :class="viewMode === 'xray' ? 'btn-primary' : 'btn-secondary'"><Eye :size="14" /> X-ray</button>
      </div>
    </div>

    <!-- 3D Viewport -->
    <div class="card overflow-hidden relative" style="height: 500px;">
      <!-- CSS-based 3D building visualization -->
      <div class="absolute inset-0 flex items-end justify-center pb-8" style="background: linear-gradient(180deg, rgba(99,102,241,0.03) 0%, rgba(99,102,241,0.08) 100%);">
        <div class="relative" style="perspective: 1200px;">
          <div class="transition-all duration-500" :style="{ transformStyle: 'preserve-3d', transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${zoom})` }">
            <!-- Building floors -->
            <div v-for="floor in floors3D" :key="floor.num" class="transition-all duration-300"
              :style="{
                width: '300px', height: '24px', margin: '1px auto',
                transform: `translateZ(${(floor.num - 1) * 26}px)`,
                opacity: selectedFloor && selectedFloor !== floor.num ? (viewMode === 'xray' ? '0.15' : '0.3') : '1',
                borderRadius: '4px',
                background: viewMode === 'wireframe' ? 'transparent' : floorColor(floor),
                border: viewMode === 'wireframe' || viewMode === 'xray' ? '1px solid rgba(99,102,241,0.4)' : 'none',
                boxShadow: viewMode === 'solid' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              }"
              @click="selectFloor(floor.num)"
            >
              <!-- Units on this floor -->
              <div class="flex h-full items-center justify-between px-1">
                <div v-for="(unit, i) in floor.units" :key="i"
                  class="h-4 rounded-sm transition-all cursor-pointer"
                  :style="{
                    flex: 1,
                    margin: '0 1px',
                    background: unit.status === 'OCCUPIED' ? 'rgba(16,185,129,0.4)' : unit.status === 'VACANT' ? 'rgba(245,158,11,0.4)' : 'rgba(99,102,241,0.2)',
                    border: unit.status === 'VACANT' ? '1px solid rgba(245,158,11,0.6)' : 'none',
                  }"
                  @click.stop="selectUnit(unit)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Floor selector (right side) -->
      <div class="absolute right-4 top-4 bottom-4 w-48 card p-3 overflow-y-auto z-10">
        <div class="text-xs font-medium text-ink-500 mb-2 px-1">Qavat tanlash</div>
        <div class="space-y-1">
          <button v-for="f in floors3D" :key="f.num" @click="selectFloor(f.num)"
            class="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-all"
            :class="selectedFloor === f.num ? 'bg-brand-500/10 text-brand-500' : 'hover:bg-black/5 dark:hover:bg-white/5'">
            <span>{{ f.num }}-qavat</span>
            <span class="text-xs text-ink-500">{{ f.vacant }} bo'sh</span>
          </button>
        </div>
      </div>

      <!-- Controls (bottom) -->
      <div class="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <button @click="rotY -= 15" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><RotateCcw :size="16" /></button>
        <button @click="rotY += 15" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><RotateCw :size="16" /></button>
        <div class="w-px h-8 bg-white/10"></div>
        <button @click="zoom = Math.min(2, zoom + 0.1)" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><ZoomIn :size="16" /></button>
        <button @click="zoom = Math.max(0.5, zoom - 0.1)" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><ZoomOut :size="16" /></button>
        <div class="w-px h-8 bg-white/10"></div>
        <button @click="rotX = Math.min(45, rotX + 5)" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><ChevronUp :size="16" /></button>
        <button @click="rotX = Math.max(-10, rotX - 5)" class="w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 flex items-center justify-center hover:bg-brand-500/20 transition-all"><ChevronDown :size="16" /></button>
      </div>

      <!-- Legend -->
      <div class="absolute top-4 left-4 flex flex-col gap-1 z-10">
        <div class="flex items-center gap-2 text-xs"><span class="w-3 h-3 rounded bg-emerald-500/40"></span> Band</div>
        <div class="flex items-center gap-2 text-xs"><span class="w-3 h-3 rounded bg-amber-500/40 border border-amber-500/60"></span> Bo'sh</div>
        <div class="flex items-center gap-2 text-xs"><span class="w-3 h-3 rounded bg-brand-500/20"></span> Texnik</div>
      </div>
    </div>

    <!-- Selected floor detail -->
    <div v-if="selectedFloor" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">{{ selectedFloor }}-qavat — Unit holati</h3>
        <NuxtLink :to="`/floors/${selectedFloorId}/plan`" class="btn btn-secondary btn-sm"><Map :size="14" /> 2D reja</NuxtLink>
      </div>
      <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        <div v-for="unit in selectedFloorData.units" :key="unit.id"
          class="p-3 rounded-xl border-2 cursor-pointer transition-all"
          :class="unit.status === 'OCCUPIED' ? 'border-emerald-500/20 bg-emerald-500/5' : unit.status === 'VACANT' ? 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50' : 'border-black/5 dark:border-white/5'"
          @click="selectUnit(unit)">
          <div class="text-xs font-medium">{{ unit.name }}</div>
          <div class="text-[10px] text-ink-500">{{ unit.area }}m²</div>
          <span class="text-[10px] font-medium" :class="unit.status === 'OCCUPIED' ? 'text-emerald-500' : unit.status === 'VACANT' ? 'text-amber-500' : 'text-ink-500'">
            {{ unit.status === 'OCCUPIED' ? 'Band' : unit.status === 'VACANT' ? 'Bo\'sh' : 'Texnik' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Selected unit detail -->
    <div v-if="selectedUnitData" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Unit: {{ selectedUnitData.name }}</h3>
        <button @click="selectedUnitData = null" class="btn btn-ghost btn-sm"><X :size="14" /></button>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div><div class="text-xs text-ink-500">Maydon</div><div class="font-medium mt-1">{{ selectedUnitData.area }} m²</div></div>
        <div><div class="text-xs text-ink-500">Holat</div><div class="font-medium mt-1">{{ selectedUnitData.status === 'OCCUPIED' ? 'Band' : selectedUnitData.status === 'VACANT' ? 'Bo\'sh' : 'Texnik' }}</div></div>
        <div><div class="text-xs text-ink-500">Ijarachi</div><div class="font-medium mt-1">{{ selectedUnitData.tenant || '-' }}</div></div>
        <div><div class="text-xs text-ink-500">Shartnoma</div><div class="font-medium mt-1">{{ selectedUnitData.contract || '-' }}</div></div>
      </div>
      <div class="mt-4 flex gap-2">
        <NuxtLink :to="`/units/${selectedUnitData.id}`" class="btn btn-secondary btn-sm"><Eye :size="14" /> Tafsilot</NuxtLink>
        <button v-if="selectedUnitData.status === 'VACANT'" class="btn btn-primary btn-sm"><FileText :size="14" /> Taklif yaratish</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Box, Grid, Eye, RotateCcw, RotateCw, ZoomIn, ZoomOut, ChevronUp, ChevronDown, Map, X, FileText } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const buildingId = route.params.id

const viewMode = ref<'solid' | 'wireframe' | 'xray'>('solid')
const rotX = ref(15)
const rotY = ref(-20)
const zoom = ref(1)
const selectedFloor = ref<number | null>(null)
const selectedUnitData = ref<any>(null)

// Generate 12 floors with units
const floors3D = ref(Array.from({ length: 12 }, (_, i) => {
  const num = 12 - i
  const units = Array.from({ length: 8 }, (_, j) => {
    const statuses = ['OCCUPIED', 'OCCUPIED', 'OCCUPIED', 'OCCUPIED', 'VACANT', 'OCCUPIED', 'OCCUPIED', 'TECHNICAL']
    const vacant = num === 4 ? 3 : num === 7 ? 2 : num === 1 ? 4 : 1
    return {
      id: `u-${num}-${j}`,
      name: `${String.fromCharCode(65 + (j < 4 ? 0 : 1))}${num}${(j % 4) + 1}`,
      area: 40 + Math.floor(Math.random() * 80),
      status: j < vacant ? 'VACANT' : statuses[j],
      tenant: statuses[j] === 'OCCUPIED' ? 'ABC Logistics' : '',
      contract: statuses[j] === 'OCCUPIED' ? 'CTR-2026-' + (100 + j) : '',
    }
  })
  return { num, units, vacant: units.filter((u: any) => u.status === 'VACANT').length }
}))

const selectedFloorData = computed(() => floors3D.value.find(f => f.num === selectedFloor.value))
const selectedFloorId = computed(() => `f${selectedFloor.value}`)

function selectFloor(num: number) {
  selectedFloor.value = selectedFloor.value === num ? null : num
}

function selectUnit(unit: any) {
  selectedUnitData.value = unit
}

function floorColor(floor: any) {
  if (selectedFloor.value === floor.num) return 'rgba(99,102,241,0.15)'
  return 'rgba(99,102,241,0.06)'
}
</script>
