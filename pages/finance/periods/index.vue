<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Hisob davrlari</h1>
        <p class="text-ink-500 text-sm mt-0.5">Oylik invoys generatsiyasi va yopish</p>
      </div>
      <button class="btn btn-primary btn-sm" :disabled="!hasOpenPeriod">
        <Plus :size="16" />
        Invoys generatsiya
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="bp in financeStore.billingPeriods" :key="bp.id" class="card p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-semibold text-lg text-ink-900">{{ monthName(bp.month) }} {{ bp.year }}</h3>
            <p class="text-sm text-ink-400 mt-0.5">{{ bp.invoiceCount }} invoys · {{ formatPrice(bp.totalAmount) }}</p>
          </div>
          <span class="badge" :class="bp.status === 'OPEN' ? 'badge-info' : 'badge-neutral'">
            {{ bp.status === 'OPEN' ? 'Ochiq' : 'Yopilgan' }}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p class="text-ink-400 text-xs">Generatsiya</p>
            <p class="font-medium text-ink-700">{{ formatDate(bp.generatedAt) }}</p>
          </div>
          <div>
            <p class="text-ink-400 text-xs">Yaratildi</p>
            <p class="font-medium text-ink-700">{{ formatDate(bp.createdAt) }}</p>
          </div>
          <div>
            <p class="text-ink-400 text-xs">Yopildi</p>
            <p class="font-medium text-ink-700">{{ bp.closedAt ? formatDate(bp.closedAt) : '—' }}</p>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-ink-100">
          <button v-if="bp.status === 'OPEN'" class="btn btn-outline btn-sm w-full">
            <Lock :size="16" />
            Davrni yopish
          </button>
          <button v-else class="btn btn-ghost btn-sm w-full">
            <Eye :size="16" />
            Tafsilotlarni ko'rish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Lock, Eye } from 'lucide-vue-next'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const hasOpenPeriod = computed(() => financeStore.billingPeriods.some(bp => bp.status === 'OPEN'))

const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
function monthName(m: number) { return months[m - 1] || '' }

function formatDate(d: string) { return d ? d.split('T')[0] : '—' }

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln so\'m'
  return v.toLocaleString('ru')
}
</script>
