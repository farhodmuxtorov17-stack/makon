<template>
  <div class="space-y-6">
    <PageHeader title="Shartnomalar" subtitle="Barcha ijara va sotuv shartnomalari">
      <template #actions>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9 w-64" />
        </div>
        <button class="btn btn-primary btn-sm" @click="showNew = true">
          <Plus :size="16" /> Yangi
        </button>
      </template>
    </PageHeader>

    <!-- Tabs -->
    <div class="flex gap-2 flex-wrap">
      <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeTab === tab.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ tab.label }}
        <span class="ml-1.5 text-xs opacity-60">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Shartnoma №</th>
              <th>Ijarachi</th>
              <th>Turi</th>
              <th>Oylik to'lov</th>
              <th>Muddat</th>
              <th>ERI imzo</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredContracts" :key="c.id" class="cursor-pointer hover:bg-ink-50/50 transition-colors">
              <td class="font-mono font-semibold text-ink-900">{{ c.number }}</td>
              <td>
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white">
                    {{ c.tenantName.split(' ').map((w: string) => w[0]).join('').slice(0, 2) }}
                  </div>
                  <span class="font-medium">{{ c.tenantName }}</span>
                </div>
              </td>
              <td><span class="badge badge-neutral">{{ c.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></td>
              <td class="font-semibold">{{ formatPrice(c.monthlyRent) }} <span class="text-ink-400 text-xs font-normal">so'm</span></td>
              <td>
                <div class="text-sm">
                  <p class="text-ink-700">{{ c.startDate }}</p>
                  <p class="text-ink-400">{{ c.endDate }}</p>
                </div>
              </td>
              <td>
                <div v-if="c.signedByErI" class="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 :size="16" /> Imzolangan
                </div>
                <div v-else class="flex items-center gap-1.5 text-ink-300">
                  <Clock :size="16" /> Kutilmoqda
                </div>
              </td>
              <td><StatusBadge :status="c.status" :variant="contractVariant(c.status)" :label="contractLabel(c.status)" dot /></td>
              <td>
                <button class="btn-ghost btn-icon btn-sm" @click.stop>
                  <MoreHorizontal :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredContracts.length === 0" class="p-12">
        <BaseEmptyState title="Shartnomalar topilmadi" description="Filtrni o'zgartiring yoki yangi shartnoma tuzing" />
      </div>
    </div>

    <!-- New contract modal -->
    <BaseModal v-model="showNew" title="Yangi shartnoma">
      <div class="space-y-4">
        <div>
          <label class="label">Ijarachi</label>
          <input class="input" placeholder="F.I.O" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Turi</label>
            <select class="input"><option value="RENT">Ijara</option><option value="SALE">Sotuv</option></select>
          </div>
          <div>
            <label class="label">Oylik to'lov (so'm)</label>
            <input class="input" type="number" placeholder="0" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Boshlanish</label>
            <input class="input" type="date" />
          </div>
          <div>
            <label class="label">Tugash</label>
            <input class="input" type="date" />
          </div>
        </div>
        <div>
          <label class="label">PINFL</label>
          <input class="input font-mono" placeholder="14 raqam" maxlength="14" />
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Yaratish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, CheckCircle2, Clock, MoreHorizontal } from 'lucide-vue-next'
import type { ContractStatus } from '~/types'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const search = ref('')
const activeTab = ref('all')
const showNew = ref(false)

const tabs = computed(() => [
  { id: 'all', label: 'Hammasi', count: financeStore.contracts.length },
  { id: 'ACTIVE', label: 'Aktiv', count: financeStore.contracts.filter(c => c.status === 'ACTIVE').length },
  { id: 'PENDING_SIGN', label: "Imzolanmagan", count: financeStore.contracts.filter(c => c.status === 'PENDING_SIGN').length },
  { id: 'SIGNED', label: 'Imzolangan', count: financeStore.contracts.filter(c => c.status === 'SIGNED').length },
  { id: 'EXPIRED', label: 'Muddati o\'tgan', count: financeStore.contracts.filter(c => c.status === 'EXPIRED').length },
])

const filteredContracts = computed(() => {
  let result = financeStore.contracts
  if (activeTab.value !== 'all') result = result.filter(c => c.status === activeTab.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(c => c.number.toLowerCase().includes(q) || c.tenantName.toLowerCase().includes(q))
  }
  return result
})

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}

function contractLabel(s: ContractStatus): string {
  const m: Record<string, string> = {
    ACTIVE: 'Aktiv', PENDING_SIGN: 'Imzolanmagan', SIGNED: 'Imzolangan',
    EXPIRED: 'Muddati o\'tgan', DRAFT: 'Qoralama', TERMINATED: 'Bekor qilingan',
  }
  return m[s] || s
}

function contractVariant(s: ContractStatus): string {
  const m: Record<string, string> = {
    ACTIVE: 'success', PENDING_SIGN: 'warning',
    SIGNED: 'info', EXPIRED: 'neutral',
    DRAFT: 'neutral', TERMINATED: 'danger',
  }
  return m[s] || 'neutral'
}
</script>
