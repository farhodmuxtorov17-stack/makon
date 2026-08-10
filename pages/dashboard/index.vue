<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim holati va asosiy ko'rsatkichlar</p>
      </div>
      <div class="text-sm text-ink-500">{{ new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="stat.bg">
            <component :is="stat.icon" :size="20" :class="stat.color" />
          </div>
          <span v-if="stat.change" class="text-xs font-medium" :class="stat.change > 0 ? 'text-emerald-400' : 'text-red-400'">
            {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}%
          </span>
        </div>
        <div class="text-2xl font-bold">{{ stat.value }}</div>
        <div class="text-xs text-ink-500">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Charts placeholder -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Bandlik dinamikasi</h3>
        <div class="h-48 flex items-end justify-around gap-2">
          <div v-for="(h, i) in occupancyBars" :key="i" class="flex-1 rounded-t-lg bg-brand-500/20 border border-brand-500/30 transition-all" :style="{ height: h + '%' }"></div>
        </div>
        <div class="flex justify-around mt-2 text-xs text-ink-600">
          <span v-for="m in months" :key="m">{{ m }}</span>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-semibold mb-4">So'nggi arizalar</h3>
        <div class="space-y-2">
          <div v-for="app in recentApps" :key="app.id" class="flex items-center justify-between p-3 rounded-xl bg-white/5">
            <div>
              <div class="text-sm font-medium">{{ app.name }}</div>
              <div class="text-xs text-ink-500">{{ app.date }}</div>
            </div>
            <span class="badge" :class="app.statusClass">{{ app.status }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick actions -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">Tezkor amallar</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <NuxtLink v-for="action in quickActions" :key="action.to" :to="action.to" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
          <component :is="action.icon" :size="24" class="text-brand-400" />
          <span class="text-xs text-ink-300">{{ action.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, FileText, Wallet, Receipt, ClipboardList, Package, Gauge, Plus } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const stats = [
  { label: 'Jami binolar', value: '5', icon: Building2, bg: 'bg-brand-500/10', color: 'text-brand-400', change: 0 },
  { label: 'Faol arizalar', value: '3', icon: FileText, bg: 'bg-amber-500/10', color: 'text-amber-400', change: 12 },
  { label: 'Jami o\'zgarish', value: '308', icon: Wallet, bg: 'bg-emerald-500/10', color: 'text-emerald-400', change: 5 },
  { label: 'Bo\'sh maydon', value: '67', icon: Package, bg: 'bg-red-500/10', color: 'text-red-400', change: -3 },
]

const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg']
const occupancyBars = [65, 68, 70, 72, 75, 78, 80, 82]

const recentApps = [
  { id: 1, name: 'Omega Trade LLC', date: '10.08.2026', status: 'Ko\'rib chiqilmoqda', statusClass: 'badge-warning' },
  { id: 2, name: 'Algo UZ', date: '09.08.2026', status: 'Taklif yuborildi', statusClass: 'badge-brand' },
  { id: 3, name: 'Smart Solutions', date: '08.08.2026', status: 'Yangi', statusClass: 'badge-neutral' },
  { id: 4, name: 'TechHub LLC', date: '07.08.2026', status: 'Tasdiqlandi', statusClass: 'badge-success' },
]

const quickActions = [
  { to: '/management/buildings', label: 'Binolar', icon: Building2 },
  { to: '/management/applications', label: 'Arizalar', icon: FileText },
  { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
  { to: '/facility/work-orders', label: 'Topshiriqlar', icon: ClipboardList },
]
</script>
