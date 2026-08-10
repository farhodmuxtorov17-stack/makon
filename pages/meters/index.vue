<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Hisoblagichlar</h1>
        <p class="text-ink-500 text-sm mt-1">Elektr, suv va gaz ko'rsatkichlari</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi hisoblagich
      </button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Zap :size="20" class="text-amber-400" /></div>
            <div>
              <div class="text-xs text-ink-500">Elektr</div>
              <div class="font-bold">{{ formatNum(data.stats.electricity) }} kWh</div>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Droplets :size="20" class="text-blue-400" /></div>
            <div>
              <div class="text-xs text-ink-500">Suv</div>
              <div class="font-bold">{{ formatNum(data.stats.water) }} m³</div>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center"><Flame :size="20" class="text-orange-400" /></div>
            <div>
              <div class="text-xs text-ink-500">Gaz</div>
              <div class="font-bold">{{ formatNum(data.stats.gas) }} m³</div>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertTriangle :size="20" class="text-red-400" /></div>
            <div>
              <div class="text-xs text-ink-500">Yuqori sarf</div>
              <div class="font-bold text-red-400">{{ data.stats.highConsumption }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Bino nomi bo'yicha qidirish..." class="input pl-9" />
        </div>
        <select v-model="typeFilter" class="input w-auto">
          <option value="">Barcha turlari</option>
          <option value="ELECTRICITY">Elektr</option>
          <option value="WATER">Suv</option>
          <option value="GAS">Gaz</option>
        </select>
      </div>

      <!-- Meters table -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-500 border-b border-white/5">
                <th class="px-4 py-3">Hisoblagich</th>
                <th class="px-4 py-3">Bino</th>
                <th class="px-4 py-3">Tur</th>
                <th class="px-4 py-3 text-right">Oldingi</th>
                <th class="px-4 py-3 text-right">Joriy</th>
                <th class="px-4 py-3 text-right">Sarf</th>
                <th class="px-4 py-3 text-right">Tarif</th>
                <th class="px-4 py-3 text-right">Summa</th>
                <th class="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in filteredMeters" :key="m.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td class="px-4 py-3 font-mono text-xs">{{ m.meterNumber }}</td>
                <td class="px-4 py-3 font-medium">{{ m.buildingName }}</td>
                <td class="px-4 py-3">
                  <span class="flex items-center gap-1.5">
                    <component :is="typeIcon(m.type)" :size="14" :class="typeColor(m.type)" />
                    {{ typeLabel(m.type) }}
                  </span>
                </td>
                <td class="px-4 py-3 text-right text-ink-400">{{ formatNum(m.prevReading) }}</td>
                <td class="px-4 py-3 text-right font-medium">{{ formatNum(m.lastReading) }}</td>
                <td class="px-4 py-3 text-right" :class="m.consumption < 0 ? 'text-red-400' : ''">{{ formatNum(m.consumption) }}</td>
                <td class="px-4 py-3 text-right text-ink-400">{{ formatNum(m.tariff) }}</td>
                <td class="px-4 py-3 text-right font-semibold">{{ formatNum(m.cost) }} so'm</td>
                <td class="px-4 py-3 text-center">
                  <span class="badge text-xs" :class="m.status === 'HIGH' ? 'badge-danger' : 'badge-success'">{{ m.status === 'HIGH' ? 'Yuqori' : 'Normal' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card p-4 flex items-center justify-between">
        <div class="text-sm text-ink-500">Jami: {{ formatNum(data.stats.totalCost) }} so'm</div>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Zap, Droplets, Flame, Search, AlertTriangle, Plus, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const { data, pending } = await useAsyncData('meters', () =>
  $fetch<any>(`${config.public.apiBase}/modulesApi?action=meters`)
)

const search = ref('')
const typeFilter = ref('')

const filteredMeters = computed(() => {
  if (!data.value?.meters) return []
  let result = [...data.value.meters]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(m => m.buildingName?.toLowerCase().includes(q) || m.meterNumber?.toLowerCase().includes(q))
  }
  if (typeFilter.value) result = result.filter(m => m.type === typeFilter.value)
  return result
})

function typeIcon(t: string) {
  return { ELECTRICITY: Zap, WATER: Droplets, GAS: Flame }[t] || Zap
}
function typeColor(t: string) {
  return { ELECTRICITY: 'text-amber-400', WATER: 'text-blue-400', GAS: 'text-orange-400' }[t] || 'text-ink-400'
}
function typeLabel(t: string) {
  return { ELECTRICITY: 'Elektr', WATER: 'Suv', GAS: 'Gaz' }[t] || t
}
function formatNum(n: number) {
  return Math.abs(n || 0).toLocaleString('ru-RU')
}
</script>
