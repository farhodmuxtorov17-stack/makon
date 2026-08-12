<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">CABINET / UNITS</div>
        <div class="eyebrow">CABINET / UNITS</div>
      <h1 class="page-title">Mening unitlarim</h1>
        <p class="text-ink-500 text-sm mt-1">{{ units.length }} ta unit · {{ totalArea }} m² jami maydon</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm btn-glow"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="dash-kpi dash-kpi--blue">
        <div class="kpi-strip__icon"><Building2 :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ units.length }}</div>
          <div class="dash-kpi__label">Mening unitlarim</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="kpi-strip__icon"><Ruler :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalArea }}<span class="text-sm font-500"> m²</span></div>
          <div class="dash-kpi__label">Jami maydon</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="kpi-strip__icon"><Wallet :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ formatUZSShort(totalMonthlyRent) }}</div>
          <div class="dash-kpi__label">Oylik to'lov</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--rose">
        <div class="kpi-strip__icon"><AlertCircle :size="18" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalDebt > 0 ? formatUZSShort(totalDebt) : "Yo'q" }}</div>
          <div class="dash-kpi__label">Qarzdorlik</div>
        </div>
      </div>
    </div>

    <!-- Unit cards grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="unit in filteredUnits" :key="unit.id" class="unit-detail-card">
        <!-- Photo -->
        <div class="unit-detail-card__photo">
          <img :src="img(unit.photo)" :alt="unit.name" loading="lazy" />
          <span class="unit-detail-card__badge" :class="unit.type === 'RENT' ? 'unit-detail-card__badge--rent' : 'unit-detail-card__badge--owned'">
            {{ unit.type === 'RENT' ? 'Ijara' : 'Mulk' }}
          </span>
        </div>

        <!-- Body -->
        <div class="unit-detail-card__body">
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="font-semibold text-ink-900 dark:text-white">{{ unit.name }}</div>
              <div class="text-xs text-ink-500">{{ unit.building }} · {{ unit.floor }}-qavat</div>
            </div>
            <span class="badge text-[10px]" :class="unit.statusBadge">{{ unit.statusLabel }}</span>
          </div>

          <!-- Specs -->
          <div class="grid grid-cols-3 gap-2 my-4">
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.area }}</div>
              <div class="text-[10px] text-ink-500">m²</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.rooms }}</div>
              <div class="text-[10px] text-ink-500">xona</div>
            </div>
            <div class="text-center p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-sm font-bold text-ink-900 dark:text-white">{{ unit.rent || '—' }}</div>
              <div class="text-[10px] text-ink-500">UZS/oy</div>
            </div>
          </div>

          <!-- Contract info -->
          <div class="space-y-1.5 text-xs mb-4">
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Shartnoma:</span>
              <span class="font-mono font-medium text-ink-900 dark:text-white">{{ unit.contractNumber || '—' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Muddat:</span>
              <span class="font-medium text-ink-900 dark:text-white">{{ unit.contractEnd || '—' }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-500">Qarzdorlik:</span>
              <span :class="unit.debt > 0 ? 'text-red-500 font-bold' : 'text-emerald-500 font-medium'">
                {{ unit.debt > 0 ? formatUZSShort(unit.debt) + ' so\'m' : 'Yo\'q' }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <NuxtLink to="/cabinet/services" class="btn btn-secondary btn-sm flex-1 text-xs">Hisob</NuxtLink>
            <NuxtLink to="/cabinet/contracts" class="btn btn-ghost btn-sm flex-1 text-xs">Shartnoma</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { Search,  Plus, Building2, Ruler, Wallet, AlertCircle } from 'lucide-vue-next'

const search = ref('')

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const { formatUZS, formatUZSShort } = useFormat()

const units = computed(() => makonStore.tenantUnits)
const filteredUnits = computed(() => {
  if (!search.value) return units.value
  const q = search.value.toLowerCase()
  return units.value.filter(u =>
    u.name?.toLowerCase().includes(q) ||
    u.building?.toLowerCase().includes(q) ||
    String(u.floor).includes(q)
  )
})
const totalArea = computed(() => units.value.reduce((s, u) => s + u.area, 0))
const totalMonthlyRent = computed(() => units.value.reduce((s, u) => {
  const m = String(u.rent || '').match(/([\d.]+)M/)
  return s + (m ? parseFloat(m[1]) * 1_000_000 : 0)
}, 0))
const totalDebt = computed(() => units.value.reduce((s, u) => s + (u.debt || 0), 0))
</script>
<style scoped>
.unit-detail-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.06);
  background: #ffffff;
  transition: all 0.2s;
}
.dark .unit-detail-card {
  background: rgba(255,255,255,0.02);
  border-color: rgba(255,255,255,0.06);
}
.unit-detail-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.dark .unit-detail-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.unit-detail-card__photo {
  position: relative;
  height: 160px;
  overflow: hidden;
}
.unit-detail-card__photo img {
  width: 100%; height: 100%; object-fit: cover;
}
.unit-detail-card__badge {
  position: absolute; top: 10px; left: 10px;
  font-size: 10px; font-weight: 700;
  padding: 3px 10px; border-radius: 6px; color: white;
}
.unit-detail-card__badge--rent { background: var(--accent); }
.unit-detail-card__badge--owned { background: #10b981; }
.unit-detail-card__body { padding: 16px; }

.kpi-strip {
  display: flex; align-items: center; gap: 12px; padding: 14px 16px;
  background: var(--card-bg, #fff); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; position: relative; overflow: hidden;
}
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--rose::before { background: #f43f5e; }
.kpi-strip__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); color: var(--accent, #2563EB); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); color: #3b82f6; }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.kpi-strip--rose .kpi-strip__icon { background: rgba(244,63,94,0.1); color: #f43f5e; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; }
.dash-kpi__label { font-size: 11px; color: var(--ink-500); margin-top: 3px; font-weight: 500; }
:deep(.dark) .kpi-strip { border-color: rgba(255,255,255,0.06); }
</style>
