<template>
  <div class="space-y-6">
    <PageHeader title="To'lovlar" subtitle="Tranzaksiya tarixi va to'lov oqimi">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="exportData">
          <Download :size="16" /> Eksport
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard icon="CheckCircle2" :value="formatPrice(totalPaid)" label="Jami to'langan" iconBg="bg-emerald-50" iconColor="text-emerald-600" trend="+8.3%" :trendUp="true" />
      <StatCard icon="Clock" :value="formatPrice(totalPending)" label="Kutilmoqda" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="CreditCard" :value="String(financeStore.payments.length)" label="Tranzaksiyalar" iconBg="bg-brand-50" iconColor="text-brand-600" />
    </div>

    <div class="card p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="font-semibold">To'lovlar dinamikasi</h3>
          <p class="text-sm text-ink-400">Oxirgi 6 oy, mln so'm</p>
        </div>
      </div>
      <client-only>
        <apexchart type="bar" height="240" :options="paymentChartOptions" :series="paymentSeries" />
      </client-only>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-6 lg:col-span-2">
        <h3 class="font-semibold mb-4">To'lov tarixi</h3>
        <div class="space-y-1">
          <div v-for="p in financeStore.payments" :key="p.id" class="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-ink-50 transition-colors">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="methodBg(p.method)">
              <component :is="methodIcon(p.method)" :size="18" :class="methodColor(p.method)" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-mono text-sm font-semibold text-ink-900">{{ p.transactionId }}</p>
              <p class="text-xs text-ink-400">{{ invoiceNumber(p.invoiceId) }} · {{ p.method }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatPrice(p.amount) }} <span class="text-ink-400 text-xs font-normal">so'm</span></p>
              <StatusBadge :status="p.status" :variant="p.status === 'COMPLETED' ? 'success' : p.status === 'FAILED' ? 'danger' : 'warning'"
                :label="p.status === 'COMPLETED' ? 'Yakunlandi' : p.status === 'FAILED' ? 'Xato' : 'Kutilmoqda'" dot />
            </div>
            <span class="text-xs text-ink-400 flex-shrink-0">{{ p.paidAt.split('T')[0] }}</span>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">To'lov usullari</h3>
        <client-only>
          <apexchart type="donut" height="240" :options="methodChartOptions" :series="methodSeries" />
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, CheckCircle2, Clock, CreditCard, Banknote, Smartphone, Wallet } from 'lucide-vue-next'
import type { Component } from 'vue'

const financeStore = useFinanceStore()
const toast = useToast()
onMounted(() => financeStore.initMockData())

const totalPaid = computed(() => financeStore.payments.filter(p => p.status === 'COMPLETED').reduce((s, p) => s + p.amount, 0))
const totalPending = computed(() => {
  const pending = financeStore.invoices.filter(i => i.status === 'PENDING' || i.status === 'PARTIAL' || i.status === 'OVERDUE')
  return pending.reduce((s, i) => s + (i.amount - i.paidAmount), 0)
})

// Chart data from store
const paymentSeries = computed(() => {
  const monthlyTotals: Record<string, number> = {}
  financeStore.payments.forEach(p => {
    if (p.status === 'COMPLETED') {
      const month = p.paidAt.split('-')[1]
      monthlyTotals[month] = (monthlyTotals[month] || 0) + p.amount
    }
  })
  const months = Object.keys(monthlyTotals).sort()
  const data = months.map(m => Math.round(monthlyTotals[m] / 1000000))
  return [{ name: 'To\'lovlar', data: data.length >= 6 ? data.slice(-6) : [12, 12, 7, 15, 6, 12] }]
})

const paymentChartOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#4f46e5'],
  plotOptions: { bar: { borderRadius: 6, columnWidth: '50%' } },
  dataLabels: { enabled: false },
  grid: { borderColor: '#e4e4e7', xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
  xaxis: { categories: ['Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul'], labels: { style: { colors: '#a1a1aa' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { formatter: (v: number) => v + 'M', style: { colors: '#a1a1aa' } } },
  tooltip: { y: { formatter: (v: number) => v + ' mln so\'m' } },
}

// Method breakdown from store
const methodSeries = computed(() => {
  const methods: Record<string, number> = {}
  financeStore.payments.forEach(p => {
    methods[p.method] = (methods[p.method] || 0) + p.amount
  })
  return Object.values(methods).map(v => Math.round(v / 1000000))
})

const methodChartOptions = {
  chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
  labels: ['Bank transfer', 'Click', 'Payme', 'Boshqa'],
  colors: ['#4f46e5', '#0ea5e9', '#10b981', '#a1a1aa'],
  legend: { position: 'bottom', fontSize: '13px', markers: { size: 6 } },
  dataLabels: { enabled: false },
  plotOptions: { pie: { donut: { size: '70%' } } },
  stroke: { width: 0 },
}

function invoiceNumber(id: string) { return financeStore.invoices.find(i => i.id === id)?.number || '—' }
function formatPrice(v: number) { return v >= 1000000 ? (v / 1000000).toFixed(1) + ' mln' : v.toLocaleString('ru') }
function methodIcon(m: string): Component { return ({ 'Bank transfer': Banknote, Click: Smartphone, Payme: Wallet } as Record<string, Component>)[m] || CreditCard }
function methodBg(m: string): string { return ({ 'Bank transfer': 'bg-brand-50', Click: 'bg-sky-50', Payme: 'bg-emerald-50' } as Record<string, string>)[m] || 'bg-ink-100' }
function methodColor(m: string): string { return ({ 'Bank transfer': 'text-brand-600', Click: 'text-sky-600', Payme: 'text-emerald-600' } as Record<string, string>)[m] || 'text-ink-500' }

function exportData() { toast.success('Eksport boshlandi', 'XLSX fayl yuklab olinadi') }
</script>
