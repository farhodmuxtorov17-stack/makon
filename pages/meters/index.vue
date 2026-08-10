
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Hisoblagichlar</h1>
        <p class="text-ink-400 text-sm mt-1">{{ meters.length }} ta hisoblagich</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="14" /> Hisoblagich qo'shish</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="m in meters" :key="m.id" class="card p-5 card-hover">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="typeBg(m.type)">
              <component :is="typeIcon(m.type)" :size="18" :class="typeColor(m.type)" />
            </div>
            <div>
              <div class="text-sm font-medium text-white">{{ m.code }}</div>
              <div class="text-xs text-ink-500">{{ m.serialNumber }}</div>
            </div>
          </div>
          <span class="badge" :class="m.isActive ? 'badge-success' : 'badge-neutral'">
            {{ m.isActive ? 'Faol' : 'Faol emas' }}
          </span>
        </div>
        <div class="space-y-1.5 text-sm">
          <div class="flex justify-between"><span class="text-ink-500">Joylashuv</span><span class="text-white">{{ m.location }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">Qiyoslash</span><span class="text-ink-400">{{ formatDate(m.nextVerificationAt) }}</span></div>
        </div>
        <NuxtLink :to="`/meters/${m.id}/readings`" class="btn btn-secondary btn-sm w-full mt-4">
          <BarChart3 :size="14" /> Ko'rsatkichlar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Zap, Droplet, Flame, Thermometer, BarChart3 } from 'lucide-vue-next'
import { meters } from '~/utils/mockData'
import type { MeterType } from '~/types'

const { formatDate } = useFormat()

function typeIcon(t: MeterType) {
  return { ELECTRICITY: Zap, WATER: Droplet, GAS: Flame, HEAT: Thermometer }[t]
}
function typeBg(t: MeterType) {
  return { ELECTRICITY: 'bg-amber-500/10', WATER: 'bg-blue-500/10', GAS: 'bg-orange-500/10', HEAT: 'bg-red-500/10' }[t]
}
function typeColor(t: MeterType) {
  return { ELECTRICITY: 'text-amber-400', WATER: 'text-blue-400', GAS: 'text-orange-400', HEAT: 'text-red-400' }[t]
}
</script>
