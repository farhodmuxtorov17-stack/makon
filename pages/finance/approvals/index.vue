<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Tasdiqlar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Tasdiqlashni kutayotgan hujjatlar</p>
      </div>
    </div>

    <div v-if="pendingItems.length === 0" class="card p-12 text-center">
      <CheckCircle2 :size="48" class="text-emerald-500 mx-auto mb-4" />
      <h3 class="font-semibold text-lg text-ink-900 mb-1">Tasdiqlashni kutayotgan hujjatlar yo'q</h3>
      <p class="text-ink-400 text-sm">Barcha hujjatlar tasdiqlangan</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in pendingItems" :key="item.id" class="card p-5">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            :class="item.type === 'CONTRACT' ? 'bg-brand-50' : item.type === 'ERI' ? 'bg-amber-50' : 'bg-emerald-50'">
            <component :is="item.icon" :size="24"
              :class="item.type === 'CONTRACT' ? 'text-brand-600' : item.type === 'ERI' ? 'text-amber-600' : 'text-emerald-600'" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge badge-warning">{{ item.typeLabel }}</span>
              <span class="font-mono text-sm text-ink-500">{{ item.number }}</span>
            </div>
            <h3 class="font-semibold text-ink-900">{{ item.title }}</h3>
            <p class="text-sm text-ink-400 mt-1">{{ item.description }}</p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button class="btn btn-ghost btn-sm text-rose-600 hover:bg-rose-50" @click="reject(item.id)">
              <XCircle :size="16" />
              Rad etish
            </button>
            <button class="btn btn-success btn-sm" @click="approve(item.id)">
              <Check :size="16" />
              Tasdiqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, FileText, ShieldCheck, Wrench, Check, XCircle } from 'lucide-vue-next'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const pendingItems = ref([
  { id: 'ap1', type: 'CONTRACT', typeLabel: 'Shartnoma', number: 'CTR-2025-002', title: 'Aziz Karimov — ijara shartnomasi', description: '8.5 mln so\'m/oy, 12 oylik. ERI imzolanmagan.', icon: FileText },
  { id: 'ap2', type: 'ERI', typeLabel: 'ERI imzo', number: 'CTR-2025-003', title: 'Bekzod Toshmatov — ERI imzolash', description: '4.5 mln so\'m/oy, 24 oylik. Imzo kutilmoqda.', icon: ShieldCheck },
  { id: 'ap3', type: 'MATERIAL', typeLabel: 'Material', number: 'MR-2025-002', title: 'Rozetka ta\'minoti — 2 dona', description: 'WO-2025-004 uchun material so\'rovi. 70,000 so\'m.', icon: Wrench },
])

function approve(id: string) {
  pendingItems.value = pendingItems.value.filter(i => i.id !== id)
}

function reject(id: string) {
  pendingItems.value = pendingItems.value.filter(i => i.id !== id)
}
</script>
