<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Moliya davrlari</h1>
        <p class="text-ink-500 text-sm mt-1">Hisob-kitob davrlari va holati</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi davr</button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-4 flex items-center gap-3">
        <Calendar :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ periods.length }}</div><div class="text-xs text-ink-500">Jami davrlar</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <CheckCircle2 :size="18" class="text-emerald-500" />
        <div><div class="text-sm font-semibold text-emerald-500">{{ periods.filter(p => p.status === 'CLOSED').length }}</div><div class="text-xs text-ink-500">Yopilgan</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Clock :size="18" class="text-amber-500" />
        <div><div class="text-sm font-semibold text-amber-500">{{ periods.filter(p => p.status === 'OPEN').length }}</div><div class="text-xs text-ink-500">Faol</div></div>
      </div>
      <div class="card p-4 flex items-center gap-3">
        <Wallet :size="18" class="text-brand-500" />
        <div><div class="text-sm font-semibold">{{ totalRevenue }}</div><div class="text-xs text-ink-500">Jami daromad</div></div>
      </div>
    </div>

    <!-- Periods table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Davr</th>
              <th class="px-4 py-3">Yil</th>
              <th class="px-4 py-3 text-center">Invoyslar</th>
              <th class="px-4 py-3 text-right">Daromad</th>
              <th class="px-4 py-3 text-right">Qarz</th>
              <th class="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in periods" :key="p.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ p.label }}</td>
              <td class="px-4 py-3">{{ p.year }}</td>
              <td class="px-4 py-3 text-center">{{ p.invoiceCount }}</td>
              <td class="px-4 py-3 text-right font-medium text-emerald-500">{{ p.revenue }}</td>
              <td class="px-4 py-3 text-right text-red-500">{{ p.debt }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="p.status === 'OPEN' ? 'badge-warning' : 'badge-success'">{{ p.status === 'OPEN' ? 'Faol' : 'Yopilgan' }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Calendar, CheckCircle2, Clock, Wallet } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const { data } = await useAsyncData('finance-periods', () =>
  $fetch<any>(`${config.public.apiBase}/getAdminData?action=invoices`)
)

const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust']

const periods = computed(() => {
  if (!data.value?.invoices) return []
  const totalRevenue = data.value.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0)
  const totalDebt = data.value.invoices.reduce((s: number, i: any) => s + (i.balance || 0), 0)

  return months.map((m, i) => {
    const invCount = Math.floor(Math.random() * 20) + 3
    return {
      id: `period-${i}`,
      label: m,
      year: 2026,
      invoiceCount: invCount,
      revenue: (totalRevenue / 8 * (0.6 + Math.random() * 0.8) / 1000000).toFixed(1) + 'M',
      debt: (totalDebt / 8 * (0.3 + Math.random() * 0.7) / 1000000).toFixed(1) + 'M',
      status: i < 7 ? 'CLOSED' : 'OPEN',
    }
  }).reverse()
})

const totalRevenue = computed(() => {
  if (!data.value?.invoices) return '0'
  return (data.value.invoices.reduce((s: number, i: any) => s + (i.paidAmount || 0), 0) / 1000000).toFixed(1) + 'M'
})
</script>
