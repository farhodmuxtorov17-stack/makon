<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">MANAGEMENT / UNITS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Unitlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ filteredUnits.length }} ta unit · {{ occupiedCount }} band · {{ vacantCount }} bo'sh</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi unit</button>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><Layers :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ units.length }}</div>
          <div class="kpi-strip__label">Jami unit</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><CheckCircle2 :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ occupiedCount }}</div>
          <div class="kpi-strip__label">Band</div>
        </div>
        <div class="kpi-strip__pct">{{ Math.round(occupiedCount / units.length * 100) }}%</div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><AlertCircle :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ vacantCount }}</div>
          <div class="kpi-strip__label">Bo'sh</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><Ruler :size="18" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ totalArea }}<span class="text-sm font-500"> m²</span></div>
          <div class="kpi-strip__label">Jami maydon</div>
        </div>
      </div>
    </div>

    <!-- Search + filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Unit nomi, bino..." class="w-full text-sm border border-black/10 dark:border-white/10 rounded-xl pl-9 pr-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200" />
      </div>
      <select v-model="statusFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Holat: Barchasi</option>
        <option value="VACANT">Bo'sh</option>
        <option value="OCCUPIED">Band</option>
        <option value="RESERVED">Rezerv</option>
      </select>
      <select v-model="typeFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Tur: Barchasi</option>
        <option value="OFFICE">Ofis</option>
        <option value="RETAIL">Savdo</option>
        <option value="WAREHOUSE">Ombor</option>
        <option value="MIXED">Aralash</option>
      </select>
      <select v-model="buildingFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
        <option value="">Bino: Barchasi</option>
        <option v-for="b in buildings" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- Unit cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="u in filteredUnits" :key="u.id"
        class="unit-card"
        :class="`unit-card--${u.status.toLowerCase()}`"
        @click="navigateTo(`/units/${u.id}`)"
      >
        <div class="unit-card__top">
          <div class="unit-card__left">
            <div class="unit-card__icon" :style="{ background: typeColor(u.type) + '15', color: typeColor(u.type) }">
              <component :is="typeIcon(u.type)" :size="16" />
            </div>
            <div>
              <div class="unit-card__name">{{ u.name }}</div>
              <div class="unit-card__building">{{ u.building }} · {{ u.floor }}-qavat</div>
            </div>
          </div>
          <span class="unit-badge" :class="`unit-badge--${u.status.toLowerCase()}`">{{ statusLabel(u.status) }}</span>
        </div>

        <div class="unit-card__mid">
          <div class="unit-stat">
            <div class="unit-stat__val">{{ u.area }}<span class="text-xs"> m²</span></div>
            <div class="unit-stat__label">Maydon</div>
          </div>
          <div class="unit-stat__divider"></div>
          <div class="unit-stat">
            <div class="unit-stat__val">{{ formatUZSShort(u.pricePerM2) }}</div>
            <div class="unit-stat__label">Narxi / m²</div>
          </div>
          <div class="unit-stat__divider"></div>
          <div class="unit-stat">
            <div class="unit-stat__val">{{ formatUZSShort(u.area * u.pricePerM2) }}</div>
            <div class="unit-stat__label">Jami</div>
          </div>
        </div>

        <div class="unit-card__foot">
          <span class="unit-type" :style="{ color: typeColor(u.type), background: typeColor(u.type) + '12' }">{{ typeLabel(u.type) }}</span>
          <span class="unit-card__price">{{ formatUZS(u.area * u.pricePerM2) }}</span>
        </div>
      </div>
    </div>

    <div v-if="filteredUnits.length === 0" class="py-12 text-center">
      <SearchX :size="32" class="text-ink-300 mx-auto mb-2" />
      <p class="text-ink-500 text-sm">Unitlar topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Layers, CheckCircle2, AlertCircle, Ruler, Search, SearchX, Building2, Store, Warehouse, Blend } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort } = useFormat()

const search = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const buildingFilter = ref('')

const buildings = ['Tashkent City', 'Trillant Tower', 'IT Park', 'Piramit', 'Savdo Markaz']

const units = [
  { id: 'u1', name: 'A-301', building: 'Tashkent City', floor: 3, area: 85, type: 'OFFICE', pricePerM2: 294000, status: 'OCCUPIED' },
  { id: 'u2', name: 'A-302', building: 'Tashkent City', floor: 3, area: 92, type: 'OFFICE', pricePerM2: 294000, status: 'OCCUPIED' },
  { id: 'u3', name: 'A-305', building: 'Tashkent City', floor: 3, area: 65, type: 'OFFICE', pricePerM2: 294000, status: 'VACANT' },
  { id: 'u4', name: 'B-205', building: 'Trillant Tower', floor: 2, area: 120, type: 'OFFICE', pricePerM2: 316000, status: 'OCCUPIED' },
  { id: 'u5', name: 'B-301', building: 'Trillant Tower', floor: 3, area: 85, type: 'OFFICE', pricePerM2: 316000, status: 'VACANT' },
  { id: 'u6', name: 'C-101', building: 'IT Park', floor: 1, area: 45, type: 'RETAIL', pricePerM2: 268000, status: 'OCCUPIED' },
  { id: 'u7', name: 'C-201', building: 'IT Park', floor: 2, area: 60, type: 'OFFICE', pricePerM2: 268000, status: 'OCCUPIED' },
  { id: 'u8', name: 'D-102', building: 'Piramit', floor: 1, area: 150, type: 'WAREHOUSE', pricePerM2: 200000, status: 'RESERVED' },
  { id: 'u9', name: 'D-401', building: 'Piramit', floor: 4, area: 85, type: 'OFFICE', pricePerM2: 200000, status: 'OCCUPIED' },
  { id: 'u10', name: 'E-102', building: 'Trillant Tower', floor: 1, area: 55, type: 'RETAIL', pricePerM2: 316000, status: 'VACANT' },
  { id: 'u11', name: 'SM-12', building: 'Savdo Markaz', floor: 1, area: 30, type: 'RETAIL', pricePerM2: 182000, status: 'OCCUPIED' },
  { id: 'u12', name: 'SM-15', building: 'Savdo Markaz', floor: 1, area: 28, type: 'RETAIL', pricePerM2: 182000, status: 'VACANT' },
]

const occupiedCount = computed(() => units.filter(u => u.status === 'OCCUPIED').length)
const vacantCount = computed(() => units.filter(u => u.status === 'VACANT').length)
const totalArea = computed(() => units.reduce((s, u) => s + u.area, 0))

const filteredUnits = computed(() => {
  let r = [...units]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(u => u.name.toLowerCase().includes(q) || u.building.toLowerCase().includes(q))
  }
  if (statusFilter.value) r = r.filter(u => u.status === statusFilter.value)
  if (typeFilter.value) r = r.filter(u => u.type === typeFilter.value)
  if (buildingFilter.value) r = r.filter(u => u.building === buildingFilter.value)
  return r
})

function statusLabel(s: string) { return { OCCUPIED: 'Band', VACANT: "Bo'sh", RESERVED: 'Rezerv' }[s] || s }
function typeLabel(t: string) { return { OFFICE: 'Ofis', RETAIL: 'Savdo', WAREHOUSE: 'Ombor', MIXED: 'Aralash' }[t] || t }
function typeColor(t: string) { return { OFFICE: '#2563EB', RETAIL: '#f59e0b', WAREHOUSE: '#3b82f6', MIXED: '#8b5cf6' }[t] || '#71717a' }
function typeIcon(t: string) { return { OFFICE: Building2, RETAIL: Store, WAREHOUSE: Warehouse, MIXED: Blend }[t] || Building2 }
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); color: #3b82f6; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; }
.kpi-strip__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }
.kpi-strip__pct { font-size: 11px; font-weight: 700; color: #10b981; padding: 3px 8px; border-radius: 6px; background: rgba(16,185,129,0.1); }

.unit-card {
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 16px 18px; cursor: pointer;
  transition: all 0.2s ease; position: relative; overflow: hidden;
}
.unit-card:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: rgba(37,99,235,0.2); }
.unit-card--occupied { border-left: 3px solid #10b981; }
.unit-card--vacant { border-left: 3px solid #f59e0b; }
.unit-card--reserved { border-left: 3px solid #6366f1; }
.unit-card__top { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
.unit-card__left { display: flex; align-items: center; gap: 10px; }
.unit-card__icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.unit-card__name { font-size: 14px; font-weight: 700; font-family: 'SF Mono', monospace; }
.unit-card__building { font-size: 11px; color: var(--ink-400); margin-top: 1px; }
.unit-badge { font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 5px; text-transform: uppercase; }
.unit-badge--occupied { background: rgba(16,185,129,0.12); color: #10b981; }
.unit-badge--vacant { background: rgba(245,158,11,0.12); color: #f59e0b; }
.unit-badge--reserved { background: rgba(99,102,241,0.12); color: #6366f1; }
.unit-card__mid { display: flex; align-items: center; margin-top: 14px; padding: 12px 0; border-top: 1px solid rgba(0,0,0,0.04); border-bottom: 1px solid rgba(0,0,0,0.04); }
.unit-stat { flex: 1; text-align: center; }
.unit-stat__val { font-size: 14px; font-weight: 700; }
.unit-stat__label { font-size: 10px; color: var(--ink-400); margin-top: 2px; font-weight: 500; }
.unit-stat__divider { width: 1px; height: 28px; background: rgba(0,0,0,0.06); }
.unit-card__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
.unit-type { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 5px; }
.unit-card__price { font-size: 13px; font-weight: 700; color: var(--accent, #2563EB); }
:deep(.dark) .unit-card { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .unit-card__mid { border-color: rgba(255,255,255,0.06); }
:deep(.dark) .unit-stat__divider { background: rgba(255,255,255,0.06); }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
