<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/management/buildings/${buildingId}`" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Bino</NuxtLink>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500"><Layers :size="18" /></div>
        <div>
          <div class="eyebrow">FLOOR PLAN / {{ floor.num }}-QAVAT</div>
        <h1 class="page-title">{{ floor.num }}-qavat sketch-rejasi</h1>
          <p class="text-ink-500 text-xs mt-0.5">{{ buildingName }} · Unit poligonlari va atributlari</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <select v-model="floor.num" class="btn btn-secondary btn-sm pr-8 appearance-none">
            <option v-for="n in floorOptions" :key="n" :value="n">{{ n }}-qavat</option>
          </select>
          <ChevronDown :size="14" class="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink-400" />
        </div>
        <button @click="mode = 'view'" class="btn btn-sm" :class="mode === 'view' ? 'btn-primary' : 'btn-secondary'"><Eye :size="14" /> Ko'rish</button>
        <button @click="mode = 'edit'" class="btn btn-sm" :class="mode === 'edit' ? 'btn-primary' : 'btn-secondary'"><Edit3 :size="14" /> Tahrir</button>
        <button @click="mode = 'assign'" class="btn btn-sm" :class="mode === 'assign' ? 'btn-primary' : 'btn-secondary'"><MousePointerClick :size="14" /> Biriktirish</button>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ rooms.length }}</div>
          <div class="dash-kpi__label">Jami unitlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ occupiedCount }}</div>
          <div class="dash-kpi__label">Band</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ vacantCount }}</div>
          <div class="dash-kpi__label">Bo'sh</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalArea }}<span class="text-sm">m²</span></div>
          <div class="dash-kpi__label">Maydon</div>
        </div>
      </div>
    </div>

    <!-- Floor plan canvas -->
    <div class="card overflow-hidden relative" style="height: 560px;">
      <!-- Zoom controls -->
      <div class="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
        <button @click="zoom = Math.min(zoom + 0.15, 1.8)" class="w-9 h-9 rounded-xl bg-white dark:bg-ink-800 shadow-md border border-ink-100 dark:border-ink-700 flex items-center justify-center hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors"><Plus :size="16" /></button>
        <button @click="zoom = Math.max(zoom - 0.15, 0.6)" class="w-9 h-9 rounded-xl bg-white dark:bg-ink-800 shadow-md border border-ink-100 dark:border-ink-700 flex items-center justify-center hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors"><Minus :size="16" /></button>
        <button @click="zoom = 1" class="w-9 h-9 rounded-xl bg-white dark:bg-ink-800 shadow-md border border-ink-100 dark:border-ink-700 flex items-center justify-center hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors"><Maximize :size="15" /></button>
        <button @click="resetView" class="w-9 h-9 rounded-xl bg-white dark:bg-ink-800 shadow-md border border-ink-100 dark:border-ink-700 flex items-center justify-center hover:bg-ink-50 dark:hover:bg-ink-700 transition-colors"><RotateCw :size="15" /></button>
      </div>

      <!-- Mode badge -->
      <div class="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs font-medium z-10" :class="modeBadge">
        {{ modeLabel }}
      </div>

      <!-- SVG floor plan -->
      <div class="absolute inset-0 flex items-center justify-center overflow-auto bg-[#FAFBFF] dark:bg-ink-950 p-8">
        <Transition name="floor-fade" mode="out-in" appear>
        <svg :key="floor.num" :viewBox="`0 0 ${planW} ${planH}`" :style="{ width: (zoom * 100) + '%', maxWidth: '95%' }" class="transition-all duration-200">
          <!-- Outer shell -->
          <rect :x="6" :y="6" :width="planW - 12" :height="planH - 12" fill="none" stroke="#1E293B" stroke-width="4" rx="4" />

          <!-- Rooms -->
          <g v-for="room in rooms" :key="room.id" @click="selectUnit(room)" class="cursor-pointer">
            <rect
              :x="room.x" :y="room.y" :width="room.w" :height="room.h"
              :fill="roomFill(room)"
              :stroke="selectedUnit === room.id ? '#2563EB' : '#94A3B8'"
              :stroke-width="selectedUnit === room.id ? 3 : 1.5"
              rx="2"
              class="transition-all"
            />
            <text :x="room.x + room.w / 2" :y="room.y + room.h / 2 + 6" text-anchor="middle" font-size="20" font-weight="700" :fill="roomTextColor(room)">{{ room.name }}</text>
            <circle v-if="selectedUnit === room.id" :cx="room.x + room.w / 2" :cy="room.y + room.h - 16" r="11" fill="#2563EB" />
            <path v-if="selectedUnit === room.id" :d="checkPath(room.x + room.w / 2, room.y + room.h - 16)" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          </g>

          <!-- Core: elevators + stairs -->
          <g>
            <rect :x="coreX" :y="coreY" :width="coreW" :height="coreH" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" rx="2" />
            <g v-for="i in 5" :key="'st'+i">
              <line :x1="coreX + 10" :y1="coreY + 10 + i * 12" :x2="coreX + coreW * 0.32" :y2="coreY + 10 + i * 12" stroke="#CBD5E1" stroke-width="2" />
            </g>
            <rect :x="coreX + coreW * 0.55" :y="coreY + 8" :width="coreW * 0.18" :height="coreH - 16" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.2" />
            <rect :x="coreX + coreW * 0.76" :y="coreY + 8" :width="coreW * 0.18" :height="coreH - 16" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.2" />
          </g>
        </svg>
        </Transition>
      </div>

      <!-- Legend -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white dark:bg-ink-800 shadow-md border border-ink-100 dark:border-ink-700 rounded-full px-5 py-2.5 text-xs font-medium z-10">
        <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:#10B981"></span> Bo'sh</div>
        <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:#3B82F6"></span> Ijarada</div>
        <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:#EF4444"></span> Sotilgan</div>
        <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full" style="background:#94A3B8"></span> Rezerv</div>
      </div>

      <!-- Edit toolbar -->
      <div v-if="mode === 'edit'" class="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 card p-2 z-10">
        <button class="btn btn-ghost btn-sm"><Square :size="14" /> To'rtburchak</button>
        <button class="btn btn-ghost btn-sm"><PenTool :size="14" /> Poligon</button>
        <button class="btn btn-ghost btn-sm"><Trash2 :size="14" /> O'chirish</button>
        <div class="w-px h-6 bg-black/10 dark:bg-white/10"></div>
        <button class="btn btn-primary btn-sm"><Save :size="14" /> Saqlash</button>
      </div>
    </div>

    <!-- Unit detail panel -->
    <Transition name="fade-up">
      <div v-if="selectedUnitData" class="card overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr_220px] divide-y lg:divide-y-0 lg:divide-x divide-ink-100 dark:divide-ink-800">
          <!-- 3D interior render -->
          <div class="p-4 flex flex-col">
            <div class="rounded-xl overflow-hidden bg-gradient-to-br from-[#F0F7FF] to-[#E0EFFF] dark:from-ink-800 dark:to-ink-900 aspect-[4/3] flex items-center justify-center">
              <img :src="img('/buildings/real_nest-one2.jpg')" :alt="selectedUnitData.name" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Details -->
          <div class="p-6 flex flex-col justify-center">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-lg dark:text-white">Unit {{ selectedUnitData.name }} — Batafsil</h3>
              <button @click="deselectUnit" class="btn btn-ghost btn-sm !p-2"><X :size="14" /></button>
            </div>
            <div class="grid grid-cols-2 gap-x-8 gap-y-3.5 text-sm">
              <div><div class="text-xs text-ink-500 mb-0.5">Maydoni</div><div class="font-semibold">{{ selectedUnitData.area.toFixed(2) }} m²</div></div>
              <div><div class="text-xs text-ink-500 mb-0.5">Ijarachi / Xaridor</div><div class="font-semibold">{{ selectedUnitData.tenant || '—' }}</div></div>
              <div><div class="text-xs text-ink-500 mb-0.5">Turi</div><div class="font-semibold">{{ selectedUnitData.type }}</div></div>
              <div><div class="text-xs text-ink-500 mb-0.5">Shartnoma holati</div><div class="font-semibold" :class="statusColor(selectedUnitData.status)">{{ contractStatusLabel(selectedUnitData.status) }}</div></div>
              <div><div class="text-xs text-ink-500 mb-0.5">Holati</div>
                <span class="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold" :class="statusBadge(selectedUnitData.status)">{{ statusLabel(selectedUnitData.status) }}</span>
              </div>
              <div><div class="text-xs text-ink-500 mb-0.5">Sotib olingan / band sana</div><div class="font-semibold">{{ selectedUnitData.date || '—' }}</div></div>
            </div>
            <div v-if="selectedUnitData.status === 'VACANT'" class="mt-4">
              <button class="btn btn-primary btn-sm"><FileText :size="14" /> Listing yaratish</button>
            </div>
          </div>

          <!-- Location -->
          <div class="p-4 flex flex-col gap-3">
            <div class="text-xs font-semibold text-ink-500">Joylashuv</div>
            <div class="rounded-xl bg-ink-50 dark:bg-ink-900 border border-ink-100 dark:border-ink-800 p-2 flex-1 flex items-center justify-center">
              <svg viewBox="0 0 100 60" class="w-full">
                <rect x="2" y="2" width="96" height="56" fill="none" stroke="#CBD5E1" stroke-width="1.5" rx="2" />
                <rect v-for="r in miniRooms" :key="r.id" :x="r.x" :y="r.y" :width="r.w" :height="r.h" :fill="r.id === selectedUnitData.id ? '#EF4444' : '#E2E8F0'" stroke="#CBD5E1" stroke-width="0.6" />
              </svg>
            </div>
            <div class="rounded-xl overflow-hidden bg-gradient-to-br from-[#F0F7FF] to-[#E0EFFF] dark:from-ink-800 dark:to-ink-900 h-24 flex items-center justify-center">
              <img :src="img('/buildings/real_finance-center.jpg')" alt="Building" class="h-full object-contain py-1" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { ArrowLeft, Eye, Edit3, MousePointerClick, Square, PenTool, Trash2, Save, X, FileText, Layers, ChevronDown, Plus, Minus, Maximize, RotateCw , Building2, CheckCircle, Grid3x3} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })

const route = useRoute()
const buildingId = route.params.id as string
const buildingName = 'Tashkent City'
const floor = ref({ num: 7 })
const floorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const mode = ref<'view' | 'edit' | 'assign'>('view')
const selectedUnit = ref<string | null>('u8')
const zoom = ref(1)

const planW = 1000
const planH = 380
const coreX = 400, coreY = 40, coreW = 200, coreH = 300

const layout = [
  { id: 'u1', name: '701', area: 78.2,  status: 'VACANT',   type: 'Ofis',   tenant: '',                     date: '',           x: 30,  y: 40,  w: 150, h: 145 },
  { id: 'u6', name: '706', area: 71.0,  status: 'VACANT',   type: 'Ofis',   tenant: '',                     date: '',           x: 30,  y: 195, w: 150, h: 145 },
  { id: 'u2', name: '702', area: 62.5,  status: 'IJARADA',  type: 'Ofis',   tenant: '"NewTech" MChJ',       date: '2025-03-12', x: 190, y: 40,  w: 130, h: 145 },
  { id: 'u7', name: '707', area: 55.0,  status: 'IJARADA',  type: 'Ofis',   tenant: '"Aloqa Servis" MChJ',  date: '2024-11-20', x: 190, y: 195, w: 130, h: 145 },
  { id: 'u3', name: '703', area: 68.0,  status: 'IJARADA',  type: 'Ofis',   tenant: '"Prime Consult" MChJ', date: '2025-06-01', x: 330, y: 40,  w: 130, h: 145 },
  { id: 'u8', name: '708', area: 125.40, status: 'SOTILGAN', type: 'Ofis',  tenant: '"Grand Trade" MChJ',   date: '2024-05-18', x: 330, y: 195, w: 130, h: 145 },
  { id: 'u9', name: '709', area: 44.0,  status: 'REZERV',   type: 'Texnik', tenant: '',                     date: '',           x: 630, y: 195, w: 130, h: 145 },
  { id: 'u4', name: '704', area: 145.6, status: 'REZERV',   type: 'Ofis',   tenant: '',                     date: '',           x: 630, y: 40,  w: 130, h: 145 },
  { id: 'u5', name: '705', area: 96.4,  status: 'VACANT',   type: 'Ofis',   tenant: '',                     date: '',           x: 790, y: 40,  w: 180, h: 300 },
]

const rooms = ref(layout)
const miniRooms = layout.map(l => ({ id: l.id, x: l.x / 10, y: l.y / 6.5, w: l.w / 10, h: l.h / 6.5 }))

const selectedUnitData = computed(() => rooms.value.find(u => u.id === selectedUnit.value))

const modeLabel = computed(() => ({ view: 'Ko\'rish rejimi', edit: 'Tahrir rejimi', assign: 'Unit biriktirish' }[mode.value]))
const modeBadge = computed(() => ({ view: 'bg-brand-500/10 text-brand-500', edit: 'bg-amber-500/10 text-amber-500', assign: 'bg-purple-500/10 text-purple-500' }[mode.value]))

function selectUnit(unit: any) { selectedUnit.value = unit.id }
function deselectUnit() { selectedUnit.value = null }
function resetView() { zoom.value = 1 }

function roomFill(room: any) {
  const map: Record<string, string> = {
    VACANT: 'rgba(16,185,129,0.16)',
    IJARADA: 'rgba(59,130,246,0.16)',
    SOTILGAN: 'rgba(239,68,68,0.16)',
    REZERV: 'rgba(148,163,184,0.16)',
  }
  return map[room.status] || 'rgba(148,163,184,0.1)'
}
function roomTextColor(room: any) {
  const map: Record<string, string> = { VACANT: '#059669', IJARADA: '#2563EB', SOTILGAN: '#DC2626', REZERV: '#64748B' }
  return map[room.status] || '#334155'
}
function statusLabel(s: string) { return { VACANT: "Bo'sh", IJARADA: 'Ijarada', SOTILGAN: 'Sotilgan', REZERV: 'Rezerv' }[s] || s }
function statusBadge(s: string) {
  const map: Record<string, string> = {
    VACANT: 'bg-emerald-500/10 text-emerald-600',
    IJARADA: 'bg-blue-500/10 text-blue-600',
    SOTILGAN: 'bg-red-500/10 text-red-600',
    REZERV: 'bg-zinc-500/10 text-zinc-500',
  }
  return map[s] || ''
}
function statusColor(s: string) { return { VACANT: 'text-emerald-600', IJARADA: 'text-blue-600', SOTILGAN: 'text-emerald-600', REZERV: 'text-zinc-500' }[s] || '' }
function contractStatusLabel(s: string) {
  return { VACANT: "Shartnoma yo'q", IJARADA: 'Shartnoma imzolangan', SOTILGAN: 'Shartnoma imzolangan', REZERV: 'Band qilingan' }[s] || '—'
}
function checkPath(cx: number, cy: number) {
  return `M ${cx - 4} ${cy} L ${cx - 1} ${cy + 3} L ${cx + 4} ${cy - 4}`
}
const occupiedCount = computed(() => rooms.value.filter((u: any) => u.status === "OCCUPIED" || u.status === "RENTED").length)
const vacantCount = computed(() => rooms.value.filter((u: any) => u.status === "VACANT").length)
const totalArea = computed(() => rooms.value.reduce((s: number, u: any) => s + (u.area || 0), 0))

</script>

<style scoped>
.fade-up-enter-active, .fade-up-leave-active { transition: all 0.25s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(12px); }
.fade-up-leave-to { opacity: 0; transform: translateY(12px); }
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }


/* Floor fade transition */
.floor-fade-enter-active { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
.floor-fade-leave-active { transition: all 0.15s ease; }
.floor-fade-enter-from { opacity: 0; transform: scale(0.97); }
.floor-fade-leave-to { opacity: 0; transform: scale(1.02); }
</style>
