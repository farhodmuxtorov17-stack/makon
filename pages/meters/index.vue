<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">METERS</div>
        <div class="eyebrow">METERS</div>
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

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><Grid3x3 :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ meters.length }}</div>
          <div class="kpi-strip__label">Hisoblagichlar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><CheckCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ activeMeters }}</div>
          <div class="kpi-strip__label">Faol</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><FileText :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ readings.length }}</div>
          <div class="kpi-strip__label">O'qishlar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><AlertCircle :size="38" :stroke-width="1.5" class="text-slate-600 dark:text-slate-300" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ pendingReadings }}</div>
          <div class="kpi-strip__label">Kutilmoqda</div>
        </div>
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
import { Gauge, ClipboardList, Plus , AlertCircle, CheckCircle, FileText, Grid3x3} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatNumber } = useFormat()

const showNewReading = ref(false)
const tab = ref('meters')

const newReading = reactive({ meterId: '', value: 0, date: new Date().toISOString().split('T')[0], note: '' })

const store = useMakonStore()
const meters = computed(() => store.meters)
const activeMeters = computed(() => meters.value.filter(m => m.status === 'ACTIVE').length)
const pendingReadings = computed(() => readings.value.filter(r => r.status === 'PENDING').length)

const readings = computed(() => store.readings)

function addReading() {
  if (!newReading.meterId || !newReading.value) return
  store.addReading(newReading.meterId, newReading.value, newReading.date, newReading.note)
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

<style scoped>
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
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
