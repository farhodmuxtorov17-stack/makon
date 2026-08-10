<template>
  <div class="space-y-6">
    <PageHeader title="Hisoblagichlar" subtitle="Elektr, suv, gaz va issiqlik hisoblagichlari">
      <template #actions>
        <button class="btn btn-primary btn-sm"><Plus :size="16" /> Qo'shish</button>
      </template>
    </PageHeader>

    <div class="flex gap-2 flex-wrap">
      <button v-for="cat in categories" :key="cat.id" @click="activeCat = cat.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeCat === cat.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ cat.label }} <span class="ml-1.5 text-xs opacity-60">{{ cat.count }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="m in filteredMeters" :key="m.id" class="card p-5 hover:shadow-card-hover transition-all">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="meterColor(m.type)">
              <component :is="meterIcon(m.type)" :size="22" />
            </div>
            <div>
              <p class="font-mono text-sm font-semibold text-ink-900">{{ m.code }}</p>
              <p class="text-xs text-ink-400">{{ meterLabel(m.type) }}</p>
            </div>
          </div>
          <StatusBadge :status="m.isActive ? 'active' : 'inactive'" :variant="m.isActive ? 'success' : 'neutral'"
            :label="m.isActive ? 'Aktiv' : 'O\'chiq'" dot />
        </div>
        <div class="space-y-2 text-sm border-t border-ink-50 pt-3">
          <div class="flex justify-between"><span class="text-ink-400">Seriya №</span><span class="font-mono font-medium">{{ m.serialNumber }}</span></div>
          <div class="flex justify-between"><span class="text-ink-400">O'rnatilgan</span><span class="font-medium">{{ m.installedAt }}</span></div>
          <div class="flex justify-between"><span class="text-ink-400">So'nggi o'qish</span><span class="font-medium">{{ m.lastReading }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Zap, Droplets, Flame, Thermometer } from 'lucide-vue-next'

const activeCat = ref('all')

const meters = [
  { id: 'm1', code: 'EL-B1-001', type: 'ELECTRICITY', serialNumber: 'SN-2024-001', isActive: true, installedAt: '2024-01-15', lastReading: '14,532 kWh' },
  { id: 'm2', code: 'WT-B1-002', type: 'WATER', serialNumber: 'SN-2024-002', isActive: true, installedAt: '2024-01-15', lastReading: '892 m³' },
  { id: 'm3', code: 'GS-B2-003', type: 'GAS', serialNumber: 'SN-2024-003', isActive: true, installedAt: '2024-02-10', lastReading: '1,245 m³' },
  { id: 'm4', code: 'EL-B2-004', type: 'ELECTRICITY', serialNumber: 'SN-2024-004', isActive: true, installedAt: '2024-02-10', lastReading: '21,890 kWh' },
  { id: 'm5', code: 'HT-B3-005', type: 'HEAT', serialNumber: 'SN-2024-005', isActive: false, installedAt: '2024-03-01', lastReading: '—' },
  { id: 'm6', code: 'WT-B3-006', type: 'WATER', serialNumber: 'SN-2024-006', isActive: true, installedAt: '2024-03-01', lastReading: '654 m³' },
]

const categories = computed(() => [
  { id: 'all', label: 'Hammasi', count: meters.length },
  { id: 'ELECTRICITY', label: 'Elektr', count: meters.filter(m => m.type === 'ELECTRICITY').length },
  { id: 'WATER', label: 'Suv', count: meters.filter(m => m.type === 'WATER').length },
  { id: 'GAS', label: 'Gaz', count: meters.filter(m => m.type === 'GAS').length },
  { id: 'HEAT', label: 'Issiqlik', count: meters.filter(m => m.type === 'HEAT').length },
])

const filteredMeters = computed(() => {
  if (activeCat.value === 'all') return meters
  return meters.filter(m => m.type === activeCat.value)
})

function meterIcon(t: string) {
  const m: Record<string, any> = { ELECTRICITY: Zap, WATER: Droplets, GAS: Flame, HEAT: Thermometer }
  return m[t] || Zap
}
function meterLabel(t: string) {
  const m: Record<string, string> = { ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz', HEAT: 'Issiqlik' }
  return m[t] || t
}
function meterColor(t: string) {
  const m: Record<string, string> = { ELECTRICITY: 'bg-amber-50 text-amber-600', WATER: 'bg-sky-50 text-sky-600', GAS: 'bg-rose-50 text-rose-600', HEAT: 'bg-orange-50 text-orange-600' }
  return m[t] || 'bg-ink-100 text-ink-500'
}
</script>
