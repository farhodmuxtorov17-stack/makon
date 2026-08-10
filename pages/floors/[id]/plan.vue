<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/management/buildings/${buildingId}`" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Bino</NuxtLink>
    </div>

    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">2D reja — {{ floor.num }}-qavat</h1>
        <p class="text-ink-500 text-sm mt-1">Tashkent City · Unit poligonlari va atributlari</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="mode = 'view'" class="btn btn-sm" :class="mode === 'view' ? 'btn-primary' : 'btn-secondary'"><Eye :size="14" /> Ko'rish</button>
        <button @click="mode = 'edit'" class="btn btn-sm" :class="mode === 'edit' ? 'btn-primary' : 'btn-secondary'"><Edit3 :size="14" /> Tahrir</button>
        <button @click="mode = 'assign'" class="btn btn-sm" :class="mode === 'assign' ? 'btn-primary' : 'btn-secondary'"><MousePointerClick :size="14" /> Unit biriktirish</button>
      </div>
    </div>

    <!-- Floor plan canvas -->
    <div class="card overflow-hidden relative" style="height: 600px;">
      <svg viewBox="0 0 800 500" class="w-full h-full" @click="deselectUnit">
        <!-- Building outline -->
        <rect x="50" y="50" width="700" height="400" fill="rgba(99,102,241,0.02)" stroke="rgba(99,102,241,0.3)" stroke-width="2" rx="4" />
        
        <!-- Corridor -->
        <rect x="50" y="240" width="700" height="30" fill="rgba(99,102,241,0.05)" stroke="rgba(99,102,241,0.15)" stroke-width="1" stroke-dasharray="4 4" />
        <text x="400" y="260" text-anchor="middle" class="text-xs fill-ink-500">Koridor</text>

        <!-- Elevators -->
        <rect x="60" y="200" width="50" height="40" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" stroke-width="1" rx="2" />
        <text x="85" y="225" text-anchor="middle" class="text-[10px] fill-ink-500">Lift</text>

        <!-- Stairs -->
        <rect x="690" y="200" width="50" height="40" fill="rgba(99,102,241,0.08)" stroke="rgba(99,102,241,0.3)" stroke-width="1" rx="2" />
        <text x="715" y="225" text-anchor="middle" class="text-[10px] fill-ink-500">Zina</text>

        <!-- Unit polygons -->
        <polygon
          v-for="unit in units"
          :key="unit.id"
          :points="unit.points"
          :fill="unitFill(unit)"
          :stroke="selectedUnit === unit.id ? '#6366f1' : 'rgba(99,102,241,0.3)'"
          :stroke-width="selectedUnit === unit.id ? '2' : '1'"
          class="cursor-pointer transition-all"
          @click.stop="selectUnit(unit)"
        />
        
        <!-- Unit labels -->
        <g v-for="unit in units" :key="`label-${unit.id}`">
          <text :x="unit.labelX" :y="unit.labelY" text-anchor="middle" class="text-sm font-medium" :fill="unit.status === 'OCCUPIED' ? '#10b981' : unit.status === 'VACANT' ? '#f59e0b' : '#71717a'">
            {{ unit.name }}
          </text>
          <text :x="unit.labelX" :y="unit.labelY + 14" text-anchor="middle" class="text-[10px] fill-ink-500">
            {{ unit.area }}m²
          </text>
        </g>
      </svg>

      <!-- Mode badge -->
      <div class="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium" :class="modeBadge">
        {{ modeLabel }}
      </div>

      <!-- Legend -->
      <div class="absolute top-4 right-4 flex flex-col gap-1 card p-3 text-xs">
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-emerald-500/30"></span> Band ({{ occupiedCount }})</div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-amber-500/30"></span> Bo'sh ({{ vacantCount }})</div>
        <div class="flex items-center gap-2"><span class="w-3 h-3 rounded bg-zinc-500/20"></span> Texnik ({{ techCount }})</div>
      </div>

      <!-- Edit toolbar -->
      <div v-if="mode === 'edit'" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 card p-2">
        <button class="btn btn-ghost btn-sm"><Square :size="14" /> To'rtburchak</button>
        <button class="btn btn-ghost btn-sm"><PenTool :size="14" /> Poligon</button>
        <button class="btn btn-ghost btn-sm"><Trash2 :size="14" /> O'chirish</button>
        <div class="w-px h-6 bg-black/10 dark:bg-white/10"></div>
        <button class="btn btn-primary btn-sm"><Save :size="14" /> Saqlash</button>
      </div>
    </div>

    <!-- Unit detail panel -->
    <div v-if="selectedUnitData" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Unit: {{ selectedUnitData.name }}</h3>
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
import { ArrowLeft, Eye, Edit3, MousePointerClick, Square, PenTool, Trash2, Save, X, Building2, Tag, FileText } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const buildingId = route.params.id
const floor = { num: 3 }

const mode = ref<'view' | 'edit' | 'assign'>('view')
const selectedUnit = ref<string | null>(null)

const units = ref([
  { id: 'u1', name: 'A-301', area: 85, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 4, tenant: 'ABC Logistics MChJ', contract: 'CTR-2026-001', endDate: '15.03.2027', points: '50,50 250,50 250,240 50,240', labelX: 150, labelY: 140 },
  { id: 'u2', name: 'A-302', area: 72, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 3, tenant: 'Global Trade MChJ', contract: 'CTR-2026-002', endDate: '01.12.2026', points: '250,50 420,50 420,240 250,240', labelX: 335, labelY: 140 },
  { id: 'u3', name: 'A-303', area: 95, status: 'VACANT', type: 'Ofis', exterior: true, windows: 4, tenant: '', contract: '', endDate: '', points: '420,50 620,50 620,240 420,240', labelX: 520, labelY: 140 },
  { id: 'u4', name: 'A-304', area: 60, status: 'TECHNICAL', type: 'Texnik', exterior: false, windows: 0, tenant: '', contract: '', endDate: '', points: '620,50 750,50 750,240 620,240', labelX: 685, labelY: 140 },
  { id: 'u5', name: 'B-301', area: 80, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 3, tenant: 'Smart Solutions MChJ', contract: 'CTR-2026-005', endDate: '01.06.2027', points: '50,270 230,270 230,450 50,450', labelX: 140, labelY: 360 },
  { id: 'u6', name: 'B-302', area: 68, status: 'VACANT', type: 'Ofis', exterior: true, windows: 2, tenant: '', contract: '', endDate: '', points: '230,270 400,270 400,450 230,450', labelX: 315, labelY: 360 },
  { id: 'u7', name: 'B-303', area: 92, status: 'OCCUPIED', type: 'Ofis', exterior: true, windows: 4, tenant: 'Export Group MChJ', contract: 'CTR-2025-098', endDate: '01.01.2026', points: '400,270 580,270 580,450 400,450', labelX: 490, labelY: 360 },
  { id: 'u8', name: 'B-304', area: 55, status: 'TECHNICAL', type: 'Texnik', exterior: false, windows: 0, tenant: '', contract: '', endDate: '', points: '580,270 750,270 750,450 580,450', labelX: 665, labelY: 360 },
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
  if (selectedUnit.value === unit.id) return 'rgba(99,102,241,0.15)'
  return unit.status === 'OCCUPIED' ? 'rgba(16,185,129,0.08)' : unit.status === 'VACANT' ? 'rgba(245,158,11,0.08)' : 'rgba(113,113,122,0.05)'
}
function statusLabel(s: string) { return { OCCUPIED: 'Band', VACANT: 'Bo\'sh', TECHNICAL: 'Texnik' }[s] || s }
function exteriorLabel(v: boolean) { return v ? 'Bor' : "Yo'q" }
function statusColor(s: string) { return { OCCUPIED: 'text-emerald-500', VACANT: 'text-amber-500', TECHNICAL: 'text-ink-500' }[s] || '' }
</script>
