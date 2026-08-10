<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Hisob, servis va ko\'rsatkichlar</h1>
      <p class="text-ink-500 text-sm mt-1">Invoyslar, to\'lovlar, servis so\'rovlari va hisoblagich ko\'rsatkichlari</p>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm transition-all"
        :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Invoices tab -->
    <div v-if="activeTab === 'invoices'" class="space-y-3">
      <div v-for="inv in invoices" :key="inv.id" class="card p-4 flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="inv.status === 'PAID' ? 'bg-emerald-500/10' : inv.status === 'OVERDUE' ? 'bg-red-500/10' : 'bg-amber-500/10'">
          <Receipt :size="18" :class="inv.status === 'PAID' ? 'text-emerald-500' : inv.status === 'OVERDUE' ? 'text-red-500' : 'text-amber-500'" />
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium">{{ inv.number }}</div>
          <div class="text-xs text-ink-500">{{ inv.period }} · {{ inv.unit }}</div>
        </div>
        <div class="text-right">
          <div class="text-sm font-medium">{{ formatMoney(inv.amount) }}</div>
          <div class="text-xs text-ink-500">Qoldiq: {{ formatMoney(inv.balance) }}</div>
        </div>
        <span class="badge text-xs" :class="inv.status === 'PAID' ? 'badge-success' : inv.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'">
          {{ invStatusLabel(inv.status) }}
        </span>
        <button v-if="inv.status !== 'PAID'" class="btn btn-secondary btn-sm">
          <Upload :size="14" /> To\'lov cheki
        </button>
      </div>
    </div>

    <!-- Service requests tab -->
    <div v-if="activeTab === 'service'" class="space-y-3">
      <div class="flex justify-end">
        <NuxtLink to="/cabinet/service-requests/new" class="btn btn-primary btn-sm">
          <Plus :size="14" /> Yangi so\'rov
        </NuxtLink>
      </div>
      <div v-for="sr in serviceReqs" :key="sr.id" class="card p-4 flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Wrench :size="18" class="text-amber-500" />
        </div>
        <div class="flex-1">
          <div class="text-sm font-medium">{{ sr.number }} · {{ sr.category }}</div>
          <div class="text-xs text-ink-500">{{ sr.unit }} · {{ sr.date }} · SLA: {{ sr.sla }}</div>
        </div>
        <span class="badge text-xs" :class="srBadgeClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
        <button v-if="sr.status === 'COMPLETED'" class="btn btn-secondary btn-sm">
          <Check :size="14" /> Qabul qilish
        </button>
      </div>
    </div>

    <!-- Meter readings tab -->
    <div v-if="activeTab === 'meters'" class="space-y-4">
      <div v-for="meter in meters" :key="meter.id" class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="meterTypeClass(meter.type)">
              <component :is="meterIcon(meter.type)" :size="18" :class="meterTypeColor(meter.type)" />
            </div>
            <div>
              <div class="text-sm font-medium">{{ meter.typeLabel }} · {{ meter.serial }}</div>
              <div class="text-xs text-ink-500">{{ meter.unit }} · {{ meter.location }}</div>
            </div>
          </div>
          <NuxtLink :to="`/meters/${meter.id}/readings/new`" class="btn btn-secondary btn-sm">
            <Plus :size="14" /> Ko\'rsatkich kiritish
          </NuxtLink>
        </div>
        <div class="grid grid-cols-3 gap-3 text-sm">
          <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-xs text-ink-500">Oldingi qiymat</div>
            <div class="font-medium mt-1">{{ meter.lastValue }} {{ meter.unit_measure }}</div>
          </div>
          <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-xs text-ink-500">Sarf (oy)</div>
            <div class="font-medium mt-1">{{ meter.consumption }} {{ meter.unit_measure }}</div>
          </div>
          <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-xs text-ink-500">Oxirgi o\'qish</div>
            <div class="font-medium mt-1">{{ meter.lastReading }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Receipt, Upload, Plus, Wrench, Check, Zap, Droplet, Flame, Thermometer } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const activeTab = ref('invoices')
const tabs = [
  { value: 'invoices', label: 'Invoyslar' },
  { value: 'service', label: 'Servis' },
  { value: 'meters', label: 'Hisoblagichlar' },
]

const invoices = ref([
  { id: 'inv1', number: 'INV-2026-001', period: 'Iyul 2026', unit: 'A-301', amount: 25000000, balance: 25000000, status: 'OVERDUE' },
  { id: 'inv2', number: 'INV-2026-002', period: 'Iyul 2026', unit: 'B-205', amount: 32000000, balance: 0, status: 'PAID' },
  { id: 'inv3', number: 'INV-2026-003', period: 'Avgust 2026', unit: 'A-301', amount: 25000000, balance: 25000000, status: 'ISSUED' },
])

const serviceReqs = ref([
  { id: 'sr1', number: 'SR-2026-004', category: 'Elektr', unit: 'A-301', date: '2 kun oldin', sla: '4 soat qoldi', status: 'IN_PROGRESS' },
  { id: 'sr2', number: 'SR-2026-005', category: 'Sanitariya', unit: 'B-205', date: '5 kun oldin', sla: '12 soat qoldi', status: 'ASSIGNED' },
])

const meters = ref([
  { id: 'm1', type: 'ELECTRICITY', typeLabel: 'Elektr', serial: 'EL-7842', unit: 'A-301', location: '1-zal', lastValue: 15420, consumption: 850, lastReading: '10.08.2026', unit_measure: 'kWh' },
  { id: 'm2', type: 'WATER', typeLabel: 'Suv', serial: 'W-3421', unit: 'A-301', location: '1-zal', lastValue: 342, consumption: 28, lastReading: '10.08.2026', unit_measure: 'm³' },
  { id: 'm3', type: 'GAS', typeLabel: 'Gaz', serial: 'G-1203', unit: 'B-205', location: 'Oshxona', lastValue: 156, consumption: 12, lastReading: '08.08.2026', unit_measure: 'm³' },
  { id: 'm4', type: 'HEAT', typeLabel: 'Issiqlik', serial: 'H-9087', unit: 'A-301', location: 'Umumiy', lastValue: 42.5, consumption: 3.2, lastReading: '05.08.2026', unit_measure: 'Gcal' },
])

function meterIcon(t: string) { return { ELECTRICITY: Zap, WATER: Droplet, GAS: Flame, HEAT: Thermometer }[t] }
function meterTypeClass(t: string) { return { ELECTRICITY: 'bg-yellow-500/10', WATER: 'bg-blue-500/10', GAS: 'bg-orange-500/10', HEAT: 'bg-red-500/10' }[t] }
function meterTypeColor(t: string) { return { ELECTRICITY: 'text-yellow-500', WATER: 'text-blue-500', GAS: 'text-orange-500', HEAT: 'text-red-500' }[t] }
function formatMoney(v: number) { return new Intl.NumberFormat('ru-RU').format(v) + ' so\'m' }
function invStatusLabel(s: string) { return { DRAFT: 'Loyiha', ISSUED: 'Berilgan', PARTIALLY_PAID: 'Qisman to\'lov', PAID: 'To\'langan', OVERDUE: 'Muddati o\'tgan' }[s] || s }
function srStatusLabel(s: string) { return { NEW: 'Yangi', ASSIGNED: 'Taqsimlangan', IN_PROGRESS: 'Bajarilmoqda', COMPLETED: 'Tugatilgan', VERIFIED: 'Tasdiqlangan', CLOSED: 'Yopilgan' }[s] || s }
function srBadgeClass(s: string) { return { NEW: 'badge-neutral', ASSIGNED: 'badge-brand', IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', VERIFIED: 'badge-success', CLOSED: 'badge-neutral' }[s] || 'badge-neutral' }
</script>
