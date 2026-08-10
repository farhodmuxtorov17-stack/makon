<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Hisoblagichlar</h1>
        <p class="text-ink-500 text-sm mt-1">Elektr, suv va gaz ko'rsatkichlari</p>
      </div>
      <div class="flex gap-2">
        <button @click="showReadingModal = true" class="btn btn-primary btn-sm"><Plus :size="16" /> Ko'rsatkish kiritish</button>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Zap :size="20" class="text-amber-500" /></div>
          <div><div class="text-xs text-ink-500">Elektr</div><div class="font-bold">{{ formatNum(stats.electricity) }} kWh</div></div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Droplets :size="20" class="text-blue-500" /></div>
          <div><div class="text-xs text-ink-500">Suv</div><div class="font-bold">{{ formatNum(stats.water) }} m³</div></div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Flame :size="20" class="text-orange-500" /></div>
          <div><div class="text-xs text-ink-500">Gaz</div><div class="font-bold">{{ formatNum(stats.gas) }} m³</div></div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle :size="20" class="text-red-500" /></div>
          <div><div class="text-xs text-ink-500">Yuqori sarf</div><div class="font-bold text-red-500">{{ stats.highConsumption }}</div></div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input v-model="search" type="text" placeholder="Bino yoki hisoblagich raqami..." class="input pl-9" />
      </div>
      <select v-model="typeFilter" class="input w-auto">
        <option value="">Barcha turlari</option>
        <option value="ELECTRICITY">Elektr</option>
        <option value="WATER">Suv</option>
        <option value="GAS">Gaz</option>
      </select>
      <select v-model="statusFilter" class="input w-auto">
        <option value="">Barcha holatlar</option>
        <option value="NORMAL">Normal</option>
        <option value="HIGH">Yuqori sarf</option>
      </select>
    </div>

    <!-- Meters table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Hisoblagich</th>
              <th class="px-4 py-3">Bino / Unit</th>
              <th class="px-4 py-3">Tur</th>
              <th class="px-4 py-3 text-right">Oldingi</th>
              <th class="px-4 py-3 text-right">Joriy</th>
              <th class="px-4 py-3 text-right">Sarf</th>
              <th class="px-4 py-3 text-right">Tarif</th>
              <th class="px-4 py-3 text-right">Summa</th>
              <th class="px-4 py-3 text-center">Holat</th>
              <th class="px-4 py-3 text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in filteredMeters" :key="m.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-mono text-xs">{{ m.meterNumber }}</td>
              <td class="px-4 py-3"><div class="font-medium">{{ m.buildingName }}</div><div class="text-xs text-ink-500">{{ m.unitName }}</div></td>
              <td class="px-4 py-3">
                <span class="flex items-center gap-1.5">
                  <component :is="typeIcon(m.type)" :size="14" :class="typeColor(m.type)" />
                  {{ typeLabel(m.type) }}
                </span>
              </td>
              <td class="px-4 py-3 text-right text-ink-500">{{ formatNum(m.prevReading) }}</td>
              <td class="px-4 py-3 text-right font-medium">{{ formatNum(m.lastReading) }}</td>
              <td class="px-4 py-3 text-right" :class="m.consumption > m.prevReading * 0.3 ? 'text-red-500 font-medium' : ''">{{ formatNum(m.consumption) }}</td>
              <td class="px-4 py-3 text-right text-ink-500">{{ formatNum(m.tariff) }}</td>
              <td class="px-4 py-3 text-right font-semibold">{{ formatNum(m.cost) }} so'm</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="m.status === 'HIGH' ? 'badge-danger' : 'badge-success'">{{ m.status === 'HIGH' ? 'Yuqori' : 'Normal' }}</span>
              </td>
              <td class="px-4 py-3 text-right">
                <button @click="openReading(m)" class="btn btn-ghost btn-sm"><PenLine :size="14" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="card p-4 flex items-center justify-between">
      <div class="text-sm text-ink-500">Jami: {{ formatNum(stats.totalCost) }} so'm</div>
      <div class="text-sm text-ink-500">{{ filteredMeters.length }} ta hisoblagich</div>
    </div>

    <!-- Reading entry modal -->
    <div v-if="showReadingModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" @click.self="showReadingModal = false">
      <div class="card p-6 w-full max-w-md space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">Ko'rsatkish kiritish</h3>
          <button @click="showReadingModal = false" class="btn btn-ghost btn-sm"><X :size="16" /></button>
        </div>

        <div v-if="readingForm.meter" class="p-3 rounded-xl bg-brand-500/5 text-sm">
          <div class="font-medium">{{ readingForm.meter.buildingName }} · {{ readingForm.meter.unitName }}</div>
          <div class="text-xs text-ink-500 mt-1">{{ readingForm.meter.meterNumber }} · {{ typeLabel(readingForm.meter.type) }}</div>
          <div class="text-xs text-ink-500">Oldingi: {{ formatNum(readingForm.meter.lastReading) }} {{ typeUnit(readingForm.meter.type) }}</div>
        </div>

        <div>
          <label class="label">Yangi ko'rsatkish</label>
          <input v-model="readingForm.value" type="number" step="0.01" class="input" :placeholder="readingForm.meter ? String(readingForm.meter.lastReading + 100) : ''" />
        </div>

        <div>
          <label class="label">Sana</label>
          <input v-model="readingForm.date" type="date" class="input" />
        </div>

        <div v-if="readingForm.value && readingForm.meter" class="p-3 rounded-xl bg-emerald-500/5 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-ink-500">Sarf:</span>
            <span class="font-medium">{{ formatNum(Number(readingForm.value) - readingForm.meter.lastReading) }} {{ typeUnit(readingForm.meter.type) }}</span>
          </div>
          <div class="flex items-center justify-between mt-1">
            <span class="text-ink-500">Summa:</span>
            <span class="font-medium">{{ formatNum((Number(readingForm.value) - readingForm.meter.lastReading) * readingForm.meter.tariff) }} so'm</span>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="showReadingModal = false" class="btn btn-secondary flex-1">Bekor qilish</button>
          <button @click="saveReading" class="btn btn-primary flex-1">Saqlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Zap, Droplets, Flame, Search, AlertTriangle, Plus, Download, PenLine, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const search = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const showReadingModal = ref(false)
const readingForm = reactive({ meter: null as any, value: '', date: new Date().toISOString().slice(0, 10) })

const stats = { electricity: 45620, water: 1840, gas: 320, highConsumption: 3, totalCost: 28450000 }

const meters = ref([
  { id: 'm1', meterNumber: 'EL-TC-301-A', buildingName: 'Tashkent City', unitName: 'A-301', type: 'ELECTRICITY', prevReading: 12500, lastReading: 14200, consumption: 1700, tariff: 375, cost: 637500, status: 'NORMAL' },
  { id: 'm2', meterNumber: 'WT-TC-301-A', buildingName: 'Tashkent City', unitName: 'A-301', type: 'WATER', prevReading: 320, lastReading: 345, consumption: 25, tariff: 1200, cost: 30000, status: 'NORMAL' },
  { id: 'm3', meterNumber: 'EL-TC-302-A', buildingName: 'Tashkent City', unitName: 'A-302', type: 'ELECTRICITY', prevReading: 8900, lastReading: 11200, consumption: 2300, tariff: 375, cost: 862500, status: 'HIGH' },
  { id: 'm4', meterNumber: 'EL-TT-501-B', buildingName: 'Trillent Tower', unitName: 'B-501', type: 'ELECTRICITY', prevReading: 21000, lastReading: 22800, consumption: 1800, tariff: 375, cost: 675000, status: 'NORMAL' },
  { id: 'm5', meterNumber: 'WT-TT-501-B', buildingName: 'Trillent Tower', unitName: 'B-501', type: 'WATER', prevReading: 180, lastReading: 210, consumption: 30, tariff: 1200, cost: 36000, status: 'NORMAL' },
  { id: 'm6', meterNumber: 'GS-TC-301-A', buildingName: 'Tashkent City', unitName: 'A-301', type: 'GAS', prevReading: 85, lastReading: 112, consumption: 27, tariff: 1800, cost: 48600, status: 'HIGH' },
  { id: 'm7', meterNumber: 'EL-IP-201-C', buildingName: 'IT Park', unitName: 'C-201', type: 'ELECTRICITY', prevReading: 15600, lastReading: 17400, consumption: 1800, tariff: 375, cost: 675000, status: 'NORMAL' },
  { id: 'm8', meterNumber: 'WT-IP-201-C', buildingName: 'IT Park', unitName: 'C-201', type: 'WATER', prevReading: 95, lastReading: 108, consumption: 13, tariff: 1200, cost: 15600, status: 'NORMAL' },
  { id: 'm9', meterNumber: 'EL-TC-303-A', buildingName: 'Tashkent City', unitName: 'A-303', type: 'ELECTRICITY', prevReading: 0, lastReading: 0, consumption: 0, tariff: 375, cost: 0, status: 'NORMAL' },
  { id: 'm10', meterNumber: 'GS-TT-501-B', buildingName: 'Trillent Tower', unitName: 'B-501', type: 'GAS', prevReading: 42, lastReading: 58, consumption: 16, tariff: 1800, cost: 28800, status: 'NORMAL' },
])

const filteredMeters = computed(() => {
  let result = [...meters.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(m => m.buildingName.toLowerCase().includes(q) || m.meterNumber.toLowerCase().includes(q) || m.unitName.toLowerCase().includes(q))
  }
  if (typeFilter.value) result = result.filter(m => m.type === typeFilter.value)
  if (statusFilter.value) result = result.filter(m => m.status === statusFilter.value)
  return result
})

function typeIcon(t: string) { return { ELECTRICITY: Zap, WATER: Droplets, GAS: Flame }[t] || Zap }
function typeColor(t: string) { return { ELECTRICITY: 'text-amber-500', WATER: 'text-blue-500', GAS: 'text-orange-500' }[t] || 'text-ink-500' }
function typeLabel(t: string) { return { ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz' }[t] || t }
function typeUnit(t: string) { return { ELECTRICITY: 'kWh', WATER: 'm³', GAS: 'm³' }[t] || '' }
function formatNum(n: number) { return Math.abs(n || 0).toLocaleString('ru-RU') }

function openReading(meter: any) {
  readingForm.meter = meter
  readingForm.value = ''
  readingForm.date = new Date().toISOString().slice(0, 10)
  showReadingModal.value = true
}

function saveReading() {
  if (!readingForm.meter || !readingForm.value) return
  const meter = meters.value.find(m => m.id === readingForm.meter.id)
  if (meter) {
    meter.prevReading = meter.lastReading
    meter.lastReading = Number(readingForm.value)
    meter.consumption = meter.lastReading - meter.prevReading
    meter.cost = meter.consumption * meter.tariff
    meter.status = meter.consumption > meter.prevReading * 0.2 ? 'HIGH' : 'NORMAL'
  }
  showReadingModal.value = false
  readingForm.meter = null
  readingForm.value = ''
}
</script>
