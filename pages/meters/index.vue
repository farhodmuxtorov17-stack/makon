<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">METERS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Hisoblagichlar</h1>
        <p class="text-sm text-ink-500 mt-1">Elektr, suv, gaz ko'rsatkichlari va avtomatik hisob-kitob</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm" @click="tab = 'meters'">
          <Gauge :size="16" /> Hisoblagichlar
        </button>
        <button class="btn btn-secondary btn-sm" @click="tab = 'readings'">
          <ClipboardList :size="16" /> Ko'rsatkichlar
        </button>
        <button class="btn btn-primary btn-sm btn-glow" @click="showNewReading = !showNewReading">
          <Plus :size="16" /> Yangi o'qish
        </button>
      </div>
    </div>

    <!-- New reading form -->
    <div v-if="showNewReading" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Yangi ko'rsatkich kiritish</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="label">Hisoblagich</label>
          <select v-model="newReading.meterId" class="input">
            <option value="">Tanlang...</option>
            <option v-for="m in meters" :key="m.id" :value="m.id">{{ m.unitCode }} — {{ typeLabel(m.type) }}</option>
          </select>
        </div>
        <div>
          <label class="label">Ko'rsatkich</label>
          <input v-model.number="newReading.value" type="number" step="0.01" class="input" placeholder="0.00" />
        </div>
        <div>
          <label class="label">Sana</label>
          <input v-model="newReading.date" type="date" class="input" />
        </div>
        <div>
          <label class="label">Izoh</label>
          <input v-model="newReading.note" type="text" class="input" placeholder="Izoh (ixtiyoriy)" />
        </div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm btn-glow" @click="addReading">Saqlash</button>
        <button class="btn btn-secondary btn-sm" @click="showNewReading = false">Bekor qilish</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card-premium p-4">
        <div class="text-xs text-ink-500 mb-1">Jami hisoblagichlar</div>
        <div class="text-2xl font-bold">{{ meters.length }}</div>
      </div>
      <div class="card-premium p-4">
        <div class="text-xs text-ink-500 mb-1">Elektr</div>
        <div class="text-2xl font-bold text-amber-400">{{ meters.filter(m => m.type === 'ELECTRICITY').length }}</div>
      </div>
      <div class="card-premium p-4">
        <div class="text-xs text-ink-500 mb-1">Suv (sovuq/issiq)</div>
        <div class="text-2xl font-bold text-blue-400">{{ meters.filter(m => m.type.startsWith('WATER')).length }}</div>
      </div>
      <div class="card-premium p-4">
        <div class="text-xs text-ink-500 mb-1">Gaz</div>
        <div class="text-2xl font-bold text-orange-400">{{ meters.filter(m => m.type === 'GAS').length }}</div>
      </div>
    </div>

    <!-- Meters tab -->
    <div v-if="tab === 'meters'" class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-ink-50 dark:bg-ink-900/50 text-ink-500">
            <tr>
              <th class="text-left px-4 py-3 font-medium">Bino</th>
              <th class="text-left px-4 py-3 font-medium">Unit</th>
              <th class="text-left px-4 py-3 font-medium">Turi</th>
              <th class="text-left px-4 py-3 font-medium">Nomer</th>
              <th class="text-left px-4 py-3 font-medium">Joriy ko'rsatkich</th>
              <th class="text-left px-4 py-3 font-medium">Oldingi</th>
              <th class="text-left px-4 py-3 font-medium">Sarfi</th>
              <th class="text-left px-4 py-3 font-medium">Tarif</th>
              <th class="text-left px-4 py-3 font-medium">Summa</th>
              <th class="text-left px-4 py-3 font-medium">Oxirgi o'qish</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink-100 dark:divide-ink-800">
            <tr v-for="m in meters" :key="m.id" class="hover:bg-ink-50 dark:hover:bg-ink-900/30">
              <td class="px-4 py-3">{{ m.buildingName }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ m.unitCode }}</td>
              <td class="px-4 py-3">
                <span class="badge" :class="typeClass(m.type)">{{ typeLabel(m.type) }}</span>
              </td>
              <td class="px-4 py-3 font-mono text-xs">{{ m.serialNumber }}</td>
              <td class="px-4 py-3 font-bold">{{ m.currentReading.toLocaleString('ru-RU') }}</td>
              <td class="px-4 py-3 text-ink-500">{{ m.previousReading.toLocaleString('ru-RU') }}</td>
              <td class="px-4 py-3 text-brand-400 font-medium">{{ (m.currentReading - m.previousReading).toLocaleString('ru-RU') }}</td>
              <td class="px-4 py-3">{{ formatUZS(m.tariff) }}</td>
              <td class="px-4 py-3 font-bold">{{ formatUZS((m.currentReading - m.previousReading) * m.tariff) }}</td>
              <td class="px-4 py-3 text-ink-500">{{ m.lastReadingDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Readings tab -->
    <div v-if="tab === 'readings'" class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="bg-ink-50 dark:bg-ink-900/50 text-ink-500">
            <tr>
              <th class="text-left px-4 py-3 font-medium">Sana</th>
              <th class="text-left px-4 py-3 font-medium">Hisoblagich</th>
              <th class="text-left px-4 py-3 font-medium">Unit</th>
              <th class="text-left px-4 py-3 font-medium">Turi</th>
              <th class="text-left px-4 py-3 font-medium">Ko'rsatkich</th>
              <th class="text-left px-4 py-3 font-medium">Sarfi</th>
              <th class="text-left px-4 py-3 font-medium">O'qigan</th>
              <th class="text-left px-4 py-3 font-medium">Izoh</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-ink-100 dark:divide-ink-800">
            <tr v-for="r in readings" :key="r.id" class="hover:bg-ink-50 dark:hover:bg-ink-900/30">
              <td class="px-4 py-3 text-ink-500">{{ r.date }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ r.serialNumber }}</td>
              <td class="px-4 py-3 font-mono text-xs">{{ r.unitCode }}</td>
              <td class="px-4 py-3">
                <span class="badge" :class="typeClass(r.type)">{{ typeLabel(r.type) }}</span>
              </td>
              <td class="px-4 py-3 font-bold">{{ r.value.toLocaleString('ru-RU') }}</td>
              <td class="px-4 py-3 text-brand-400">{{ r.consumption.toLocaleString('ru-RU') }}</td>
              <td class="px-4 py-3">{{ r.readBy }}</td>
              <td class="px-4 py-3 text-ink-400">{{ r.note || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gauge, ClipboardList, Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatNumber } = useFormat()

const showNewReading = ref(false)
const tab = ref('meters')

const newReading = reactive({ meterId: '', value: 0, date: new Date().toISOString().split('T')[0], note: '' })

const meters = ref([
  { id: 'mt1', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'ELECTRICITY', serialNumber: 'EL-001', currentReading: 15820, previousReading: 14500, tariff: 450, lastReadingDate: '2026-08-01' },
  { id: 'mt2', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'WATER_COLD', serialNumber: 'WC-001', currentReading: 342, previousReading: 298, tariff: 3500, lastReadingDate: '2026-08-01' },
  { id: 'mt3', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'WATER_HOT', serialNumber: 'WH-001', currentReading: 185, previousReading: 162, tariff: 8500, lastReadingDate: '2026-08-01' },
  { id: 'mt4', buildingName: 'Tashkent City', unitCode: 'A-301', type: 'GAS', serialNumber: 'GS-001', currentReading: 1240, previousReading: 1150, tariff: 1200, lastReadingDate: '2026-08-01' },
  { id: 'mt5', buildingName: 'Trillant Tower', unitCode: 'B-501', type: 'ELECTRICITY', serialNumber: 'EL-002', currentReading: 22450, previousReading: 20100, tariff: 450, lastReadingDate: '2026-08-01' },
  { id: 'mt6', buildingName: 'Trillant Tower', unitCode: 'B-501', type: 'WATER_COLD', serialNumber: 'WC-002', currentReading: 512, previousReading: 478, tariff: 3500, lastReadingDate: '2026-08-01' },
  { id: 'mt7', buildingName: 'IT Park', unitCode: 'C-201', type: 'ELECTRICITY', serialNumber: 'EL-003', currentReading: 8720, previousReading: 8100, tariff: 450, lastReadingDate: '2026-08-01' },
  { id: 'mt8', buildingName: 'IT Park', unitCode: 'C-201', type: 'WATER_COLD', serialNumber: 'WC-003', currentReading: 198, previousReading: 175, tariff: 3500, lastReadingDate: '2026-08-01' },
])

const readings = ref([
  { id: 1, date: '2026-08-01', serialNumber: 'EL-001', unitCode: 'A-301', type: 'ELECTRICITY', value: 15820, consumption: 1320, readBy: 'Bino menejeri', note: 'Iyul oyi' },
  { id: 2, date: '2026-08-01', serialNumber: 'WC-001', unitCode: 'A-301', type: 'WATER_COLD', value: 342, consumption: 44, readBy: 'Bino menejeri', note: 'Iyul oyi' },
  { id: 3, date: '2026-08-01', serialNumber: 'WH-001', unitCode: 'A-301', type: 'WATER_HOT', value: 185, consumption: 23, readBy: 'Bino menejeri', note: 'Iyul oyi' },
  { id: 4, date: '2026-08-01', serialNumber: 'GS-001', unitCode: 'A-301', type: 'GAS', value: 1240, consumption: 90, readBy: 'Bino menejeri', note: 'Iyul oyi' },
  { id: 5, date: '2026-08-01', serialNumber: 'EL-002', unitCode: 'B-501', type: 'ELECTRICITY', value: 22450, consumption: 2350, readBy: 'Bino menejeri', note: 'Iyul oyi' },
  { id: 6, date: '2026-07-01', serialNumber: 'EL-001', unitCode: 'A-301', type: 'ELECTRICITY', value: 14500, consumption: 1180, readBy: 'Bino menejeri', note: 'Iyun oyi' },
])

function addReading() {
  const meter = meters.value.find(m => m.id === newReading.meterId)
  if (!meter) return
  const consumption = newReading.value - meter.currentReading
  readings.value.unshift({
    id: Date.now(),
    date: newReading.date,
    serialNumber: meter.serialNumber,
    unitCode: meter.unitCode,
    type: meter.type,
    value: newReading.value,
    consumption: Math.max(0, consumption),
    readBy: 'Tizim',
    note: newReading.note,
  })
  meter.previousReading = meter.currentReading
  meter.currentReading = newReading.value
  meter.lastReadingDate = newReading.date
  showNewReading.value = false
  newReading.meterId = ''; newReading.value = 0; newReading.note = ''
}

function typeLabel(t: string) {
  return { ELECTRICITY: 'Elektr', WATER_COLD: 'Suv (sovuq)', WATER_HOT: 'Suv (issiq)', GAS: 'Gaz' }[t] || t
}
function typeClass(t: string) {
  return { ELECTRICITY: 'badge-warning', WATER_COLD: 'badge-info', WATER_HOT: 'badge-info', GAS: 'badge-secondary' }[t] || ''
}

</script>
