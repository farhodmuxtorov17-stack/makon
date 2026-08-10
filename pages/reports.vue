<template>
  <div class="space-y-6">
    <PageHeader title="Hisobotlar" subtitle="Moliyaviy va operatsion hisobotlar">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="exportReport"><Download :size="16" /> Eksport</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="r in reports" :key="r.id" class="card p-5 hover:shadow-card-hover transition-all cursor-pointer group" @click="openReport(r)">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="r.bg">
            <component :is="r.icon" :size="22" :class="r.color" />
          </div>
          <div>
            <h3 class="font-semibold text-ink-900 group-hover:text-brand-600 transition-colors">{{ r.title }}</h3>
            <p class="text-xs text-ink-400">{{ r.category }}</p>
          </div>
        </div>
        <p class="text-sm text-ink-500 mb-4">{{ r.description }}</p>
        <div class="flex items-center justify-between text-xs">
          <span class="text-ink-400">Oxirgi: {{ r.lastRun }}</span>
          <span class="text-brand-600 font-medium flex items-center gap-1">Ko'rish <ArrowRight :size="12" /></span>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Moliyaviy ko'rsatkichlar</h3>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-emerald-50">
          <p class="text-emerald-600 text-xs font-medium">Yillik daromat</p>
          <p class="text-2xl font-bold text-emerald-900 mt-1">{{ formatPriceShort(1184000000) }}</p>
          <p class="text-xs text-emerald-600 mt-1">+12.5% yil davomida</p>
        </div>
        <div class="p-4 rounded-xl bg-rose-50">
          <p class="text-rose-600 text-xs font-medium">Umumiy xarajatlar</p>
          <p class="text-2xl font-bold text-rose-900 mt-1">{{ formatPriceShort(324000000) }}</p>
          <p class="text-xs text-rose-600 mt-1">+4.2% yil davomida</p>
        </div>
        <div class="p-4 rounded-xl bg-brand-50">
          <p class="text-brand-600 text-xs font-medium">Sof foyda</p>
          <p class="text-2xl font-bold text-brand-900 mt-1">{{ formatPriceShort(860000000) }}</p>
          <p class="text-xs text-brand-600 mt-1">+18.3% yil davomida</p>
        </div>
        <div class="p-4 rounded-xl bg-amber-50">
          <p class="text-amber-600 text-xs font-medium">Muddati o'tgan</p>
          <p class="text-2xl font-bold text-amber-900 mt-1">{{ formatPriceShort(13500000) }}</p>
          <p class="text-xs text-amber-600 mt-1">3 invoys</p>
        </div>
      </div>
    </div>

    <div class="card p-6">
      <h3 class="font-semibold mb-4">Binolar bo'yicha daromat</h3>
      <client-only>
        <apexchart type="bar" height="300" :options="buildingChartOptions" :series="buildingSeries" />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, ArrowRight, FileText, Wallet, TrendingUp, Building2, Users, Wrench, BarChart3, PieChart } from 'lucide-vue-next'
import type { Component } from 'vue'

const toast = useToast()
const { formatPriceShort } = useFormat()

const reports = [
  { id: 'r1', title: 'Daromat hisoboti', category: 'Moliya', description: 'Oylik va choraklik daromat dinamikasi', icon: Wallet, bg: 'bg-emerald-50', color: 'text-emerald-600', lastRun: 'Bugun' },
  { id: 'r2', title: 'Bandlik hisoboti', category: 'Operatsion', description: 'Binolar bo\'yicha bandlik darajasi', icon: Building2, bg: 'bg-brand-50', color: 'text-brand-600', lastRun: 'Kecha' },
  { id: 'r3', title: 'Shartnoma hisboti', category: 'Moliya', description: 'Aktiv va tugayotgan shartnomalar', icon: FileText, bg: 'bg-sky-50', color: 'text-sky-600', lastRun: '2 kun oldin' },
  { id: 'r4', title: 'Ijarachi hisoboti', category: 'CRM', description: 'Ijarachilar tahlili va tarixi', icon: Users, bg: 'bg-amber-50', color: 'text-amber-600', lastRun: '3 kun oldin' },
  { id: 'r5', title: 'Servis hisoboti', category: 'Operatsion', description: 'Servis so\'rovlari va samaradorlik', icon: Wrench, bg: 'bg-rose-50', color: 'text-rose-600', lastRun: 'Bugun' },
  { id: 'r6', title: 'Sklad hisoboti', category: 'Operatsion', description: 'Materiallar va ta\'minotchilar', icon: BarChart3, bg: 'bg-emerald-50', color: 'text-emerald-600', lastRun: 'Kecha' },
  { id: 'r7', title: 'Hisoblagichlar', category: 'Operatsion', description: 'Kommunal xizmatlar sarfi', icon: PieChart, bg: 'bg-sky-50', color: 'text-sky-600', lastRun: 'Bugun' },
  { id: 'r8', title: 'Soliq hisoboti', category: 'Moliya', description: 'Soliqlar va deklaratsiyalar', icon: TrendingUp, bg: 'bg-amber-50', color: 'text-amber-600', lastRun: 'Hafta oldin' },
  { id: 'r9', title: 'Audit jurnali', category: 'Tizim', description: 'Tizim harakatlari tarixi', icon: FileText, bg: 'bg-ink-100', color: 'text-ink-600', lastRun: 'Doimiy' },
]

const buildingSeries = [{ name: 'Daromat (mln so\'m)', data: [320, 285, 190, 165, 142, 80] }]
const buildingChartOptions = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
  colors: ['#4f46e5'],
  plotOptions: { bar: { borderRadius: 8, distributed: true, columnWidth: '40%' } },
  dataLabels: { enabled: false },
  grid: { borderColor: '#e4e4e7', xaxis: { lines: { show: false } } },
  xaxis: { categories: ['Trilliant', 'Tashkent City', 'IT Park', 'Piramit', 'Crystal', 'Nest One'], labels: { style: { colors: '#71717a' } }, axisBorder: { show: false }, axisTicks: { show: false } },
  yaxis: { labels: { formatter: (v: number) => v + 'M', style: { colors: '#a1a1aa' } } },
  tooltip: { y: { formatter: (v: number) => v + ' mln so\'m' } },
  colors: ['#4f46e5', '#818cf8', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e'],
}

function openReport(r: any) { toast.info(r.title, 'Hisobot tayyorlanmoqda') }
function exportReport() { toast.success('Eksport', 'XLSX fayl yuklab olinadi') }
</script>
