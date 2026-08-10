<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Hisobotlar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Tizim hisobotlari va eksport</p>
      </div>
      <button class="btn btn-primary btn-sm"><Download :size="16" /> Eksport</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="r in reports" :key="r.id" class="card-hover p-5 cursor-pointer">
        <div class="flex items-start justify-between mb-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="r.bg">
            <component :is="r.icon" :size="24" :class="r.color" />
          </div>
          <span class="badge badge-neutral">{{ r.format }}</span>
        </div>
        <h3 class="font-semibold text-ink-900 mb-1">{{ r.title }}</h3>
        <p class="text-sm text-ink-400 mb-3">{{ r.description }}</p>
        <button class="btn btn-outline btn-sm w-full">
          <Download :size="14" />
          {{ r.format }} formatida yuklash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, FileText, Wallet, Building2, Users, TrendingUp, BarChart3 } from 'lucide-vue-next'

const reports = [
  { id: 'r1', title: 'Daromat hisoboti', description: 'Oylik va yillik daromat dinamikasi', format: 'XLSX', icon: Wallet, bg: 'bg-brand-50', color: 'text-brand-600' },
  { id: 'r2', title: 'Shartnomalar ro\'yxati', description: 'Barcha aktiv va yopilgan shartnomalar', format: 'PDF', icon: FileText, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { id: 'r3', title: 'Bino bandligi', description: 'Bandlik darajasi bo\'yicha hisobot', format: 'XLSX', icon: Building2, bg: 'bg-amber-50', color: 'text-amber-600' },
  { id: 'r4', title: 'Foydalanuvchilar', description: 'Tizim foydalanuvchilari va rollari', format: 'CSV', icon: Users, bg: 'bg-sky-50', color: 'text-sky-600' },
  { id: 'r5', title: 'To\'lovlar statistikasi', description: 'To\'lanmagan va kechikkan to\'lovlar', format: 'XLSX', icon: TrendingUp, bg: 'bg-rose-50', color: 'text-rose-600' },
  { id: 'r6', title: 'Umumiy analitika', description: 'KPI va ko\'rsatkichlar paneli', format: 'PDF', icon: BarChart3, bg: 'bg-ink-100', color: 'text-ink-600' },
]
</script>
