
<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Hisobotlar</h1>
      <p class="text-ink-400 text-sm mt-1">Standart hisobotlar va eksport</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="report in reports" :key="report.id" class="card p-5 card-hover cursor-pointer" @click="generateReport(report)">
        <div class="flex items-start justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="report.bg">
            <component :is="report.icon" :size="18" :class="report.color" />
          </div>
        </div>
        <h3 class="text-white font-medium mb-1">{{ report.title }}</h3>
        <p class="text-sm text-ink-500 mb-4">{{ report.desc }}</p>
        <div class="flex gap-2">
          <button class="badge badge-brand cursor-pointer">PDF</button>
          <button class="badge badge-success cursor-pointer">XLSX</button>
          <button class="badge badge-info cursor-pointer">CSV</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Building2, Wallet, FileText, Wrench, Package, Gauge, BarChart3 } from 'lucide-vue-next'

const reports = [
  { id: 'r1', title: 'Bandlik hisoboti', desc: 'Bino va unit bandligi', icon: Building2, bg: 'bg-brand-500/10', color: 'text-brand-400' },
  { id: 'r2', title: 'Moliyaviy hisobot', desc: 'Tushum, qarzdorlik, to\'lovlar', icon: Wallet, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
  { id: 'r3', title: 'Ariza hisoboti', desc: 'Ariza dinamikasi va konversiya', icon: FileText, bg: 'bg-amber-500/10', color: 'text-amber-400' },
  { id: 'r4', title: 'Servis hisoboti', desc: 'SLA, bajarilgan ishlar', icon: Wrench, bg: 'bg-red-500/10', color: 'text-red-400' },
  { id: 'r5', title: 'Ombor hisoboti', desc: 'Qoldiq, kirim/chiqim', icon: Package, bg: 'bg-blue-500/10', color: 'text-blue-400' },
  { id: 'r6', title: 'Kommunal hisobot', desc: 'Sarf, ko\'rsatkichlar', icon: Gauge, bg: 'bg-orange-500/10', color: 'text-orange-400' },
]

function generateReport(r: any) {
  // placeholder
}
</script>
