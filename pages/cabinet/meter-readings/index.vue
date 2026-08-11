<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/cabinet/services" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Hisob va servis</NuxtLink>
    </div>

    <div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Hisoblagich ko'rsatkichlari</h1>
      <p class="text-ink-500 text-sm mt-1">Elektr, suv va gaz — joriy oy</p>
    </div>

    <!-- Period selector -->
    <div class="flex items-center gap-3">
      <select v-model="selectedMonth" class="input w-auto">
        <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
      </select>
      <span class="text-sm text-ink-500">{{ currentMonthData?.status === 'SUBMITTED' ? 'Topshirilgan' : 'Kutilmoqda' }}</span>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4">
      <div class="card-premium p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Zap :size="20" class="text-amber-500" /></div>
          <div><div class="text-xs text-ink-500">Elektr</div><div class="font-bold">{{ formatNum(currentMonthData?.electricity || 0) }} kWh</div></div>
        </div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Droplets :size="20" class="text-blue-500" /></div>
          <div><div class="text-xs text-ink-500">Suv</div><div class="font-bold">{{ formatNum(currentMonthData?.water || 0) }} m³</div></div>
        </div>
      </div>
      <div class="card-premium p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Flame :size="20" class="text-orange-500" /></div>
          <div><div class="text-xs text-ink-500">Gaz</div><div class="font-bold">{{ formatNum(currentMonthData?.gas || 0) }} m³</div></div>
        </div>
      </div>
    </div>

    <!-- Reading form -->
    <div class="card p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold dark:text-white">Ko'rsatkich kiritish — {{ selectedMonthLabel }}</h3>
        <span class="badge" :class="currentMonthData?.status === 'SUBMITTED' ? 'badge-success' : 'badge-warning'">
          {{ currentMonthData?.status === 'SUBMITTED' ? 'Topshirilgan' : 'Kutilmoqda' }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Electricity -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <Zap :size="16" class="text-amber-500" /> Elektr (kWh)
          </div>
          <div class="text-xs text-ink-500">Oldingi: {{ formatNum(lastMonthData?.electricity || 0) }} kWh</div>
          <input v-model="readings.electricity" type="number" step="0.01" class="input" placeholder="0" :disabled="readonly" />
          <div v-if="readings.electricity" class="text-xs text-ink-500">Sarf: {{ formatNum(Number(readings.electricity) - (lastMonthData?.electricity || 0)) }} kWh · {{ formatNum((Number(readings.electricity) - (lastMonthData?.electricity || 0)) * 375) }} UZS</div>
        </div>

        <!-- Water -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <Droplets :size="16" class="text-blue-500" /> Suv (m³)
          </div>
          <div class="text-xs text-ink-500">Oldingi: {{ formatNum(lastMonthData?.water || 0) }} m³</div>
          <input v-model="readings.water" type="number" step="0.01" class="input" placeholder="0" :disabled="readonly" />
          <div v-if="readings.water" class="text-xs text-ink-500">Sarf: {{ formatNum(Number(readings.water) - (lastMonthData?.water || 0)) }} m³ · {{ formatNum((Number(readings.water) - (lastMonthData?.water || 0)) * 1200) }} UZS</div>
        </div>

        <!-- Gas -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <Flame :size="16" class="text-orange-500" /> Gaz (m³)
          </div>
          <div class="text-xs text-ink-500">Oldingi: {{ formatNum(lastMonthData?.gas || 0) }} m³</div>
          <input v-model="readings.gas" type="number" step="0.01" class="input" placeholder="0" :disabled="readonly" />
          <div v-if="readings.gas" class="text-xs text-ink-500">Sarf: {{ formatNum(Number(readings.gas) - (lastMonthData?.gas || 0)) }} m³ · {{ formatNum((Number(readings.gas) - (lastMonthData?.gas || 0)) * 1800) }} UZS</div>
        </div>
      </div>

      <!-- Total -->
      <div class="p-4 rounded-xl bg-brand-500/5 flex items-center justify-between">
        <span class="text-sm text-ink-500">Jami summa:</span>
        <span class="text-lg font-bold">{{ formatNum(totalAmount) }} UZS</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-3" v-if="!readonly">
        <button @click="submitReadings" class="btn btn-primary flex-1"><Send :size="16" /> Ko'rsatkich topshirish</button>
        <button class="btn btn-secondary">Saqlash (qoralama)</button>
      </div>
      <div v-else class="p-3 rounded-xl bg-emerald-500/5 text-sm text-emerald-500 flex items-center gap-2">
        <CheckCircle2 :size="16" /> Bu oy uchun ko'rsatkich topshirilgan: {{ formatDate(currentMonthData?.submittedAt) }}
      </div>
    </div>

    <!-- History -->
    <div class="card-premium p-6">
      <h3 class="font-semibold dark:text-white mb-4">Tarix</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-3 py-2">Oy</th>
              <th class="px-3 py-2 text-right">Elektr</th>
              <th class="px-3 py-2 text-right">Suv</th>
              <th class="px-3 py-2 text-right">Gaz</th>
              <th class="px-3 py-2 text-right">Summa</th>
              <th class="px-3 py-2 text-center">Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in history" :key="h.month" class="border-b border-black/5 dark:border-white/5">
              <td class="px-3 py-2 font-medium">{{ h.month }}</td>
              <td class="px-3 py-2 text-right">{{ formatNum(h.electricity) }} kWh</td>
              <td class="px-3 py-2 text-right">{{ formatNum(h.water) }} m³</td>
              <td class="px-3 py-2 text-right">{{ formatNum(h.gas) }} m³</td>
              <td class="px-3 py-2 text-right font-medium">{{ formatNum(h.total) }} UZS</td>
              <td class="px-3 py-2 text-center">
                <span class="badge text-xs" :class="h.status === 'PAID' ? 'badge-success' : h.status === 'SUBMITTED' ? 'badge-warning' : 'badge-neutral'">
                  {{ h.status === 'PAID' ? 'To\'langan' : h.status === 'SUBMITTED' ? 'Topshirilgan' : 'Kutilmoqda' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Zap, Droplets, Flame, Send, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const selectedMonth = ref('2026-08')
const readings = reactive({ electricity: '', water: '', gas: '' })
const readonly = ref(false)

const months = [
  { value: '2026-08', label: 'Avgust 2026' },
  { value: '2026-07', label: 'Iyul 2026' },
  { value: '2026-06', label: 'Iyun 2026' },
  { value: '2026-05', label: 'May 2026' },
  { value: '2026-04', label: 'Aprel 2026' },
  { value: '2026-03', label: 'Mart 2026' },
]

const allMonthData: Record<string, any> = {
  '2026-07': { electricity: 14200, water: 345, gas: 112, total: 637500, status: 'PAID', submittedAt: '2026-07-28' },
  '2026-06': { electricity: 13500, water: 320, gas: 98, total: 595000, status: 'PAID', submittedAt: '2026-06-27' },
  '2026-05': { electricity: 12800, water: 305, gas: 85, total: 552000, status: 'PAID', submittedAt: '2026-05-29' },
  '2026-04': { electricity: 11900, water: 290, gas: 72, total: 508000, status: 'PAID', submittedAt: '2026-04-28' },
  '2026-03': { electricity: 11200, water: 275, gas: 65, total: 471000, status: 'PAID', submittedAt: '2026-03-30' },
}

const history = [
  { month: 'Iyul 2026', electricity: 14200, water: 345, gas: 112, total: 637500, status: 'PAID' },
  { month: 'Iyun 2026', electricity: 13500, water: 320, gas: 98, total: 595000, status: 'PAID' },
  { month: 'May 2026', electricity: 12800, water: 305, gas: 85, total: 552000, status: 'PAID' },
  { month: 'Aprel 2026', electricity: 11900, water: 290, gas: 72, total: 508000, status: 'PAID' },
  { month: 'Mart 2026', electricity: 11200, water: 275, gas: 65, total: 471000, status: 'PAID' },
]

const currentMonthData = computed(() => allMonthData[selectedMonth.value])
const lastMonthData = computed(() => {
  const idx = months.findIndex(m => m.value === selectedMonth.value)
  return idx >= 0 && idx < months.length - 1 ? allMonthData[months[idx + 1].value] : null
})
const selectedMonthLabel = computed(() => months.find(m => m.value === selectedMonth.value)?.label || '')

const totalAmount = computed(() => {
  const el = Math.max(0, Number(readings.electricity) - (lastMonthData.value?.electricity || 0)) * 375
  const wa = Math.max(0, Number(readings.water) - (lastMonthData.value?.water || 0)) * 1200
  const ga = Math.max(0, Number(readings.gas) - (lastMonthData.value?.gas || 0)) * 1800
  return el + wa + ga
})

watch(selectedMonth, (v) => {
  const data = allMonthData[v]
  if (data) {
    readings.electricity = String(data.electricity)
    readings.water = String(data.water)
    readings.gas = String(data.gas)
    readonly.value = true
  } else {
    readings.electricity = ''
    readings.water = ''
    readings.gas = ''
    readonly.value = false
  }
}, { immediate: true })

function submitReadings() {
  allMonthData[selectedMonth.value] = {
    electricity: Number(readings.electricity),
    water: Number(readings.water),
    gas: Number(readings.gas),
    total: totalAmount.value,
    status: 'SUBMITTED',
    submittedAt: new Date().toISOString(),
  }
  readonly.value = true
}

function formatNum(n: number) { return Math.abs(n || 0).toLocaleString('ru-RU') }
function formatDate(d?: string) { return d ? new Date(d).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : '-' }
</script>
