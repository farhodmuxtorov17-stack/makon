<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Billing davrlar</h1>
        <p class="text-ink-400 text-sm mt-1">Oylik invoice generatsiyasi</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="generatePeriod"><Sparkles :size="14" /> Yangi davr generatsiyasi</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-5">
        <div class="text-sm text-ink-500 mb-1">Joriy davr</div>
        <div class="text-2xl font-bold text-white">Avgust 2026</div>
        <div class="flex items-center gap-2 mt-2">
          <span class="badge badge-warning">Ochiq</span>
          <span class="text-sm text-ink-500">24 ta invoice</span>
        </div>
        <div class="mt-4 p-3 rounded-xl bg-white/5">
          <div class="text-sm text-ink-400">Jami summa</div>
          <div class="text-xl font-bold text-white">{{ formatPriceShort(412000000) }}</div>
        </div>
        <button class="btn btn-secondary w-full mt-3">Davrni yopish</button>
      </div>

      <div class="lg:col-span-2 space-y-3">
        <div v-for="p in periods" :key="p.id" class="card p-4 flex items-center justify-between">
          <div>
            <div class="text-white font-medium">{{ monthLabel(p.month) }} {{ p.year }}</div>
            <div class="text-xs text-ink-500 mt-0.5">{{ p.invoiceCount }} ta invoice · {{ formatPriceShort(p.totalAmount) }}</div>
          </div>
          <div class="flex items-center gap-3">
            <span class="badge" :class="p.status === 'OPEN' ? 'badge-warning' : 'badge-success'">{{ p.status === 'OPEN' ? 'Ochiq' : 'Yopilgan' }}</span>
            <span class="text-xs text-ink-500">{{ p.status === 'CLOSED' ? formatDate(p.closedAt) : formatDate(p.generatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Sparkles } from 'lucide-vue-next'
import { billingPeriods } from '~/utils/mockData'

definePageMeta({ middleware: 'auth' })
const { formatPriceShort, formatDate } = useFormat()

const periods = billingPeriods

function monthLabel(m: number) { return ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'][m - 1] }
function generatePeriod() {}
</script>
