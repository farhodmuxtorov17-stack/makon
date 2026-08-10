<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Hisoblagichlar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Elektr, suv, gaz va issiqlik hisoblagichlari</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Hisoblagich qo'shish</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="m in meters" :key="m.id" class="card p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="meterColor(m.type)">
              <component :is="meterIcon(m.type)" :size="20" />
            </div>
            <div>
              <p class="font-mono text-sm font-semibold text-ink-900">{{ m.code }}</p>
              <p class="text-xs text-ink-400">{{ meterLabel(m.type) }}</p>
            </div>
          </div>
          <span class="badge" :class="m.isActive ? 'badge-success' : 'badge-neutral'">{{ m.isActive ? 'Aktiv' : 'O\'chirilgan' }}</span>
        </div>
        <div class="text-sm space-y-1">
          <p class="text-ink-500">SN: <span class="font-mono">{{ m.serialNumber }}</span></p>
          <p class="text-ink-500">O'rnatilgan: {{ m.installedAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Zap, Droplets, Flame, Thermometer } from 'lucide-vue-next'

const meters = [
  { id: 'm1', code: 'EL-B1-001', type: 'ELECTRICITY', serialNumber: 'SN-2024-001', isActive: true, installedAt: '2024-01-15' },
  { id: 'm2', code: 'WT-B1-002', type: 'WATER', serialNumber: 'SN-2024-002', isActive: true, installedAt: '2024-01-15' },
  { id: 'm3', code: 'GS-B2-003', type: 'GAS', serialNumber: 'SN-2024-003', isActive: true, installedAt: '2024-02-10' },
  { id: 'm4', code: 'EL-B2-004', type: 'ELECTRICITY', serialNumber: 'SN-2024-004', isActive: true, installedAt: '2024-02-10' },
  { id: 'm5', code: 'HT-B3-005', type: 'HEAT', serialNumber: 'SN-2024-005', isActive: false, installedAt: '2024-03-01' },
  { id: 'm6', code: 'WT-B3-006', type: 'WATER', serialNumber: 'SN-2024-006', isActive: true, installedAt: '2024-03-01' },
]

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
