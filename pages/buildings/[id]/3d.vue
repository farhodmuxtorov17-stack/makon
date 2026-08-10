<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/management/buildings" class="hover:text-white">Binolar</NuxtLink>
      <ChevronRight :size="14" class="text-ink-700" />
      <span class="text-white">{{ building?.name }}</span>
      <ChevronRight :size="14" class="text-ink-700" />
      <span class="text-brand-400">3D</span>
    </div>

    <div class="card overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b border-white/5">
        <h1 class="text-xl font-bold text-white">3D bino ko'rinishi</h1>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm" @click="rotateLeft"><RotateCcw :size="14" /></button>
          <button class="btn btn-secondary btn-sm" @click="rotateRight"><RotateCw :size="14" /></button>
          <button class="btn btn-secondary btn-sm" @click="resetView"><Maximize :size="14" /> Reset</button>
        </div>
      </div>

      <div class="relative h-[600px] bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center" :style="{ perspective: '1200px' }">
          <div class="relative transition-transform duration-700 ease-out" :style="{ transformStyle: 'preserve-3d', transform: 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(' + zoom + ')' }">
            <div v-for="floor in floors" :key="floor.number"
                 class="absolute border transition-all duration-300 cursor-pointer"
                 :class="selectedFloor?.number === floor.number ? 'border-brand-400 bg-brand-500/30' : 'border-brand-500/20 bg-ink-700/40 hover:bg-brand-500/15'"
                 :style="{ width: floorWidth + 'px', height: floorHeight + 'px', transform: 'translateZ(' + (floor.number * floorHeight * 0.8) + 'px)', top: ((maxFloors - floor.number) * floorHeight) + 'px' }"
                 @click="selectFloor(floor)">
            </div>
          </div>
        </div>

        <div v-if="selectedFloor" class="absolute bottom-4 left-4 right-4 card p-4 glass">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm text-ink-500">{{ selectedFloor.number }}-qavat</div>
              <div class="text-white font-medium">{{ selectedFloor.vacant }} ta bo'sh unit · {{ selectedFloor.units }} ta jami</div>
            </div>
            <NuxtLink :to="'/floors/f' + selectedFloor.number + '/plan'" class="btn btn-primary btn-sm">
              <Map :size="14" /> Plan
            </NuxtLink>
          </div>
        </div>

        <div class="absolute top-4 left-4 glass rounded-lg px-3 py-2 text-xs text-ink-400">
          Qavatni tanlash uchun bosing
        </div>

        <div class="absolute top-4 right-4 glass rounded-lg px-3 py-2 flex gap-3 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-ink-700/60" /> Band</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded bg-brand-500/40" /> Bo'sh</span>
        </div>
      </div>
    </div>

    <div class="card p-4">
      <h3 class="text-white font-semibold mb-3 text-sm">Qavatlar</h3>
      <div class="grid grid-cols-6 lg:grid-cols-12 gap-2">
        <button v-for="floor in floors" :key="floor.number" @click="selectFloor(floor)"
          class="aspect-square rounded-lg text-sm font-medium transition-all"
          :class="selectedFloor?.number === floor.number ? 'bg-brand-500 text-white' : 'bg-white/5 text-ink-400 hover:bg-white/10'">
          {{ floor.number }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, RotateCcw, RotateCw, Maximize, Map } from 'lucide-vue-next'
import { buildings } from '~/utils/mockData'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const building = computed(() => buildings.find(b => b.id === route.params.id))
const maxFloors = computed(() => building.value?.floorsCount || 10)
const floorWidth = 400
const floorHeight = 30

const floors = computed(() => {
  return Array.from({ length: maxFloors.value }, (_, i) => {
    const n = i + 1
    return { number: n, units: Math.round((building.value?.totalUnits || 0) / maxFloors.value), vacant: Math.max(0, Math.round((building.value?.vacantUnits || 0) / maxFloors.value * (n > maxFloors.value / 2 ? 2 : 0.5))) }
  }).reverse()
})

const selectedFloor = ref<{ number: number; units: number; vacant: number } | null>(null)
const rotX = ref(20)
const rotY = ref(-15)
const zoom = ref(0.8)

function selectFloor(floor: any) { selectedFloor.value = floor; rotX.value = 10; zoom.value = 1 }
function rotateLeft() { rotY.value -= 15 }
function rotateRight() { rotY.value += 15 }
function resetView() { rotX.value = 20; rotY.value = -15; zoom.value = 0.8; selectedFloor.value = null }
</script>
