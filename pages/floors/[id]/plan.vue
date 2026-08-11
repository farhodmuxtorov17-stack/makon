<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/management/buildings/${buildingId}`" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Bino</NuxtLink>
    </div>

    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">2D reja — {{ floor.num }}-qavat</h1>
        <p class="text-ink-500 text-sm mt-1">Tashkent City · Unit poligonlari va atributlari</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="mode = 'view'" class="btn btn-sm" :class="mode === 'view' ? 'btn-primary' : 'btn-secondary'"><Eye :size="14" /> Ko'rish</button>
        <button @click="mode = 'edit'" class="btn btn-sm" :class="mode === 'edit' ? 'btn-primary' : 'btn-secondary'"><Edit3 :size="14" /> Tahrir</button>
        <button @click="mode = 'assign'" class="btn btn-sm" :class="mode === 'assign' ? 'btn-primary' : 'btn-secondary'"><MousePointerClick :size="14" /> Unit biriktirish</button>
      </div>
    </div>

    <!-- Floor plan canvas with real architectural plan -->
    <div class="card overflow-hidden relative" style="height: 600px;">
      <!-- Real floor plan image background -->
      <div class="absolute inset-0 bg-ink-50 dark:bg-ink-900 flex items-center justify-center overflow-auto">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/Chrysler_Building_6th_to_10th_floor_plan.png" 
          alt="Chrysler Building 6th to 10th floor plan — architectural drawing"
          class="max-w-full max-h-full object-contain opacity-90 dark:opacity-80"
          style="filter: contrast(1.05);"
        />
        <!-- Dark mode overlay -->
        <div class="absolute inset-0 bg-ink-950/40 dark:hidden pointer-events-none"></div>
      </div>

      <!-- Mode badge -->
      <div class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium z-10" :class="modeBadge">
        {{ modeLabel }}
      </div>

      <!-- Legend -->
      <div class="absolute top-4 right-4 flex flex-col gap-1 card p-3 text-xs z-10">
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-emerald-500/30"></span> Band ({{ occupiedCount }})</div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-amber-500/30"></span> Bo'sh ({{ vacantCount }})</div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-zinc-500/20"></span> Texnik ({{ techCount }})</div>
      </div>

      <!-- Unit markers overlay (positioned on top of real plan) -->
      <div class="absolute inset-0 z-5 pointer-events-none">
        <div 
          v-for="unit in units" 
          :key="unit.id"
          class="absolute pointer-events-auto cursor-pointer transition-all rounded-lg flex items-center justify-center text-xs font-medium"
          :style="{ left: unit.posX + '%', top: unit.posY + '%', width: unit.posW + '%', height: unit.posH + '%' }"
          :class="selectedUnit === unit.id ? 'ring-2 ring-brand-500 scale-105' : ''"
          @click.stop="selectUnit(unit)"
        >
          <span 
            class="px-2 py-1 rounded-md backdrop-blur-sm shadow-sm"
            :class="{
              'bg-emerald-500/70 text-white': unit.status === 'OCCUPIED',
              'bg-amber-500/80 text-white': unit.status === 'VACANT',
              'bg-zinc-500/50 text-white': unit.status === 'TECHNICAL',
            }"
          >
            {{ unit.name }}
          </span>
        </div>
      </div>

      <!-- Edit toolbar -->
      <div v-if="mode === 'edit'" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 card p-2 z-10">
        <button class="btn btn-ghost btn-sm"><Square :size="14" /> To'rtburchak</button>
        <button class="btn btn-ghost btn-sm"><PenTool :size="14" /> Poligon</button>
        <button class="btn btn-ghost btn-sm"><Trash2 :size="14" /> O'chirish</button>
        <div class="w-px h-6 bg-black/10 dark:bg-white/10"></div>
        <button class="btn btn-primary btn-sm"><Save :size="14" /> Saqlash</button>
      </div>

      <!-- Info banner -->
      <div class="absolute bottom-4 right-4 card p-3 text-xs z-10 max-w-[200px]">
        <div class="flex items-center gap-1.5 text-ink-500 mb-1">
          <MapPin :size="12" />
          <span class="font-medium">Chrysler Building</span>
        </div>
        <p class="text-ink-500 text-[11px] leading-relaxed">42-43 Lexington Ave, NYC. 6-10 qavatlar rejasi. Wikimedia Commons arxividan.</p>
      </div>
    </div>

    <!-- Unit detail panel -->    <!-- Unit detail panel -->
    <div v-if="selectedUnitData" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold dark:text-white">Unit: {{ selectedUnitData.name }}</h3>
        <button @click="deselectUnit" class="btn btn-ghost btn-sm"><X :size="14" /></button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Attributes -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-ink-500">Atributlar</h4>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><div class="text-xs text-ink-500">Nomi</div><div class="font-medium mt-1">{{ selectedUnitData.name }}</div></div>
            <div><div class="text-xs text-ink-500">Maydon</div><div class="font-medium mt-1">{{ selectedUnitData.area }} m²</div></div>
            <div><div class="text-xs text-ink-500">Holat</div><div class="font-medium mt-1" :class="statusColor(selectedUnitData.status)">{{ statusLabel(selectedUnitData.status) }}</div></div>
            <div><div class="text-xs text-ink-500">Turi</div><div class="font-medium mt-1">{{ selectedUnitData.type }}</div></div>
            <div><div class="text-xs text-ink-500">Tashqi devor</div><div class="font-medium mt-1">{{ exteriorLabel(selectedUnitData.exterior) }}</div></div>
            <div><div class="text-xs text-ink-500">Deraza soni</div><div class="font-medium mt-1">{{ selectedUnitData.windows }}</div></div>
          </div>
        </div>

        <!-- Occupancy -->
        <div class="space-y-3">
          <h4 class="text-sm font-medium text-ink-500">Bandlik</h4>
          <div v-if="selectedUnitData.status === 'OCCUPIED'" class="space-y-2">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5">
              <Building2 :size="18" class="text-emerald-500" />
              <div>
                <div class="text-sm font-medium">{{ selectedUnitData.tenant }}</div>
                <div class="text-xs text-ink-500">{{ selectedUnitData.contract }} · {{ selectedUnitData.endDate }}</div>
              </div>
            </div>
          </div>
          <div v-else-if="selectedUnitData.status === 'VACANT'">
            <div class="p-3 rounded-xl bg-amber-500/5 flex items-center gap-3">
              <Tag :size="18" class="text-amber-500" />
              <div class="text-sm">Bu unit bo'sh. Listing yoki ariza qabul qilish mumkin.</div>
            </div>
            <button class="btn btn-primary btn-sm w-full mt-2"><FileText :size="14" /> Listing yaratish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Eye, Edit3, MousePointerClick, Square, PenTool, Trash2, Save, X, Building2, Tag, FileText, MapPin } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const buildingId = route.params.id
const floor = { num: 3 }

const mode = ref<'view' | 'edit' | 'assign'>('view')
const selectedUnit = ref<string | null>(null)

const units = ref([
  { id: 'u1', name: 'A-301', area: 85, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 4, tenant: 'ABC Logistics MChJ', contract: 'CTR-2026-001', endDate: '15.03.2027', posX: 3, posY: 8, posW: 22, posH: 28 },
  { id: 'u2', name: 'A-302', area: 72, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 3, tenant: 'Global Trade MChJ', contract: 'CTR-2026-002', endDate: '01.12.2026', posX: 28, posY: 8, posW: 18, posH: 28 },
  { id: 'u3', name: 'A-303', area: 95, status: 'VACANT', type: 'Ofis', exterior: true, windows: 4, tenant: '', contract: '', endDate: '', posX: 50, posY: 8, posW: 22, posH: 28 },
  { id: 'u4', name: 'A-304', area: 60, status: 'TECHNICAL', type: 'Texnik', exterior: false, windows: 0, tenant: '', contract: '', endDate: '', posX: 76, posY: 8, posW: 20, posH: 28 },
  { id: 'u5', name: 'B-301', area: 80, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 3, tenant: 'Smart Solutions MChJ', contract: 'CTR-2026-005', endDate: '01.06.2027', posX: 3, posY: 60, posW: 22, posH: 30 },
  { id: 'u6', name: 'B-302', area: 68, status: 'VACANT', type: 'Ofis', exterior: true, windows: 2, tenant: '', contract: '', endDate: '', posX: 28, posY: 60, posW: 18, posH: 30 },
  { id: 'u7', name: 'B-303', area: 92, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 4, tenant: 'Export Group MChJ', contract: 'CTR-2025-098', endDate: '01.01.2026', posX: 50, posY: 60, posW: 22, posH: 30 },
  { id: 'u8', name: 'B-304', area: 55, status: 'TECHNICAL', type: 'Texnik', exterior: false, windows: 0, tenant: '', contract: '', endDate: '', posX: 76, posY: 60, posW: 20, posH: 30 },
])

const selectedUnitData = computed(() => units.value.find(u => u.id === selectedUnit.value))
const occupiedCount = computed(() => units.value.filter(u => u.status === 'OCCUPIED').length)
const vacantCount = computed(() => units.value.filter(u => u.status === 'VACANT').length)
const techCount = computed(() => units.value.filter(u => u.status === 'TECHNICAL').length)

const modeLabel = computed(() => ({ view: 'Ko\'rish rejimi', edit: 'Tahrir rejimi', assign: 'Unit biriktirish' }[mode.value]))
const modeBadge = computed(() => ({ view: 'bg-brand-500/10 text-brand-500', edit: 'bg-amber-500/10 text-amber-500', assign: 'bg-purple-500/10 text-purple-500' }[mode.value]))

function selectUnit(unit: any) { selectedUnit.value = unit.id }
function deselectUnit() { selectedUnit.value = null }
function unitFill(unit: any) {
  if (selectedUnit.value === unit.id) return 'rgba(37,99,235,0.15)'
  return unit.status === 'OCCUPIED' ? 'rgba(16,185,129,0.08)' : unit.status === 'VACANT' ? 'rgba(245,158,11,0.08)' : 'rgba(113,113,122,0.05)'
}
function statusLabel(s: string) { return { OCCUPIED: 'Band', VACANT: 'Bo\'sh', TECHNICAL: 'Texnik' }[s] || s }
function exteriorLabel(v: boolean) { return v ? 'Bor' : "Yo'q" }
function statusColor(s: string) { return { OCCUPIED: 'text-emerald-500', VACANT: 'text-amber-500', TECHNICAL: 'text-ink-500' }[s] || '' }
</script>
