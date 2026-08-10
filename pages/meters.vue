<template>
  <div class="space-y-6">
    <PageHeader title="Hisoblagichlar" subtitle="Elektr, suv, gaz va issiqlik hisobi">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi o'qish</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="Zap" :value="String(meters.filter(m => m.type === 'ELECTRICITY').length)" label="Elektr" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="Droplet" :value="String(meters.filter(m => m.type === 'WATER').length)" label="Suv" iconBg="bg-sky-50" iconColor="text-sky-600" />
      <StatCard icon="Flame" :value="String(meters.filter(m => m.type === 'GAS').length)" label="Gaz" iconBg="bg-rose-50" iconColor="text-rose-600" />
      <StatCard icon="Thermometer" :value="String(meters.filter(m => m.type === 'HEAT').length)" label="Issiqlik" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }} <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="m in filteredMeters" :key="m.id" class="card p-5">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="typeBg(m.type)">
              <component :is="typeIcon(m.type)" :size="18" :class="typeColor(m.type)" />
            </div>
            <div>
              <p class="font-mono text-sm font-semibold text-ink-900">{{ m.number }}</p>
              <p class="text-xs text-ink-400">{{ typeLabel(m.type) }} · {{ m.building }}</p>
            </div>
          </div>
          <StatusBadge :status="m.lastStatus" :variant="m.lastStatus === 'VERIFIED' ? 'success' : m.lastStatus === 'REJECTED' ? 'danger' : 'warning'"
            :label="m.lastStatus === 'VERIFIED' ? 'Tasdiqlangan' : m.lastStatus === 'REJECTED' ? 'Rad' : 'Kutilmoqda'" dot />
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="p-2.5 rounded-lg bg-ink-50">
            <p class="text-ink-400 text-xs">Oldingi</p>
            <p class="font-semibold">{{ m.prevReading.toLocaleString('ru') }} {{ m.unit }}</p>
          </div>
          <div class="p-2.5 rounded-lg bg-ink-50">
            <p class="text-ink-400 text-xs">Joriy</p>
            <p class="font-semibold">{{ m.currentReading.toLocaleString('ru') }} {{ m.unit }}</p>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-ink-100 flex items-center justify-between">
          <div>
            <p class="text-xs text-ink-400">Sarfi</p>
            <p class="font-bold text-lg" :class="typeColor(m.type)">{{ (m.currentReading - m.prevReading).toLocaleString('ru') }} {{ m.unit }}</p>
          </div>
          <p class="text-xs text-ink-400">{{ formatDate(m.lastDate) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Zap, Droplet, Flame, Thermometer } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { MeterType } from '~/types'

const toast = useToast()
const { formatDate } = useFormat()

const activeTab = ref('all')
const showNew = ref(false)

const meters = [
  { id: 'm1', number: 'EL-001', type: 'ELECTRICITY', building: 'Trilliant Tower', prevReading: 45200, currentReading: 47800, unit: 'kWt', lastDate: '2025-07-01', lastStatus: 'VERIFIED' },
  { id: 'm2', number: 'EL-002', type: 'ELECTRICITY', building: 'Tashkent City IBC', prevReading: 88400, currentReading: 92100, unit: 'kWt', lastDate: '2025-07-01', lastStatus: 'VERIFIED' },
  { id: 'm3', number: 'WT-001', type: 'WATER', building: 'Trilliant Tower', prevReading: 3200, currentReading: 3450, unit: 'm³', lastDate: '2025-07-01', lastStatus: 'VERIFIED' },
  { id: 'm4', number: 'WT-002', type: 'WATER', building: 'IT Park', prevReading: 1800, currentReading: 1920, unit: 'm³', lastDate: '2025-07-01', lastStatus: 'SUBMITTED' },
  { id: 'm5', number: 'GS-001', type: 'GAS', building: 'Crystal Plaza', prevReading: 450, currentReading: 480, unit: 'm³', lastDate: '2025-06-30', lastStatus: 'VERIFIED' },
  { id: 'm6', number: 'HT-001', type: 'HEAT', building: 'Piramit Tower', prevReading: 12, currentReading: 14, unit: 'Gcal', lastDate: '2025-06-30', lastStatus: 'SUBMITTED' },
  { id: 'm7', number: 'EL-003', type: 'ELECTRICITY', building: 'IT Park', prevReading: 28000, currentReading: 30500, unit: 'kWt', lastDate: '2025-07-01', lastStatus: 'VERIFIED' },
  { id: 'm8', number: 'WT-003', type: 'WATER', building: 'Crystal Plaza', prevReading: 2100, currentReading: 2180, unit: 'm³', lastDate: '2025-07-01', lastStatus: 'REJECTED' },
  { id: 'm9', number: 'GS-002', type: 'GAS', building: 'Tashkent City IBC', prevReading: 820, currentReading: 890, unit: 'm³', lastDate: '2025-06-30', lastStatus: 'VERIFIED' },
]

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: meters.length },
  { id: 'ELECTRICITY', label: 'Elektr', count: meters.filter(m => m.type === 'ELECTRICITY').length },
  { id: 'WATER', label: 'Suv', count: meters.filter(m => m.type === 'WATER').length },
  { id: 'GAS', label: 'Gaz', count: meters.filter(m => m.type === 'GAS').length },
  { id: 'HEAT', label: 'Issiqlik', count: meters.filter(m => m.type === 'HEAT').length },
])

const filteredMeters = computed(() => activeTab.value === 'all' ? meters : meters.filter(m => m.type === activeTab.value))

function typeIcon(t: MeterType): Component { return ({ ELECTRICITY: Zap, WATER: Droplet, GAS: Flame, HEAT: Thermometer } as Record<string, Component>)[t] || Zap }
function typeBg(t: string): string { return ({ ELECTRICITY: 'bg-amber-50', WATER: 'bg-sky-50', GAS: 'bg-rose-50', HEAT: 'bg-emerald-50' })[t] || 'bg-ink-100' }
function typeColor(t: string): string { return ({ ELECTRICITY: 'text-amber-600', WATER: 'text-sky-600', GAS: 'text-rose-600', HEAT: 'text-emerald-600' })[t] || 'text-ink-500' }
function typeLabel(t: string): string { return ({ ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz', HEAT: 'Issiqlik' })[t] || t }
</script>
