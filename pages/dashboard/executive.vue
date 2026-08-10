<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-ink-900">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-1">Xush kelibsiz, {{ authStore.user?.fullName }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-outline btn-sm">
          <Calendar :size="16" :stroke-width="2" /> Oy
        </button>
        <button class="btn btn-primary btn-sm">
          <Download :size="16" :stroke-width="2" /> Hisobot
        </button>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="s in statCards" :key="s.label" class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="s.bg">
            <component :is="s.icon" :size="20" :stroke-width="2" :class="s.color" />
          </div>
          <span class="text-xs font-semibold" :class="s.trend > 0 ? 'text-emerald-600' : 'text-rose-600'">
            {{ s.trend > 0 ? '+' : '' }}{{ s.trend }}%
          </span>
        </div>
        <div class="font-display text-2xl font-bold text-ink-900">{{ s.value }}</div>
        <div class="text-ink-400 text-sm mt-1">{{ s.label }}</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Revenue chart -->
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-display font-semibold text-ink-900">Daromad dinamikasi</h3>
            <p class="text-ink-400 text-xs mt-0.5">Oxirgi 12 oy</p>
          </div>
          <div class="flex items-center gap-2">
            <button v-for="p in periods" :key="p" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all" :class="activePeriod === p ? 'bg-brand-50 text-brand-700' : 'text-ink-400 hover:bg-ink-100'" @click="activePeriod = p">{{ p }}</button>
          </div>
        </div>
        <div>
          <div class="flex items-end gap-2" style="height: 160px;">
            <div v-for="(d, i) in revenueData" :key="i" class="flex-1 rounded-t-md transition-all duration-300 hover:opacity-100" :class="i === revenueData.length - 1 ? 'bg-brand-600 opacity-100' : 'bg-brand-300 hover:bg-brand-400 opacity-70'" :style="{ height: d.value + '%' }"></div>
          </div>
          <div class="flex gap-2 mt-2">
            <span v-for="(d, i) in revenueData" :key="i" class="flex-1 text-center text-[10px] text-ink-400">{{ d.label }}</span>
          </div>
        </div>
      </div>

      <!-- Occupancy donut -->
      <div class="card p-5">
        <h3 class="font-display font-semibold text-ink-900 mb-1">Bandlik</h3>
        <p class="text-ink-400 text-xs mb-6">Umumiy maydon</p>
        <div class="flex items-center justify-center mb-4">
          <div class="relative w-32 h-32">
            <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f4f4f5" stroke-width="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#4f46e5" stroke-width="8" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="16" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="font-display text-2xl font-bold text-ink-900">94%</span>
              <span class="text-ink-400 text-[10px]">band</span>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-brand-600"></div><span class="text-ink-600">Band</span></div>
            <span class="font-semibold text-ink-900">56 unit</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2"><div class="w-2.5 h-2.5 rounded-full bg-ink-200"></div><span class="text-ink-600">Boʻsh</span></div>
            <span class="font-semibold text-ink-900">4 unit</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Buildings + Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Buildings -->
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-display font-semibold text-ink-900">Binolar</h3>
          <NuxtLink to="/management/buildings" class="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            Barchasi <ChevronRight :size="14" :stroke-width="2" />
          </NuxtLink>
        </div>
        <div class="space-y-3">
          <div v-for="b in buildings" :key="b.name" class="flex items-center gap-4 p-3 rounded-xl hover:bg-ink-50 transition-colors">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="b.bg">
              <component :is="b.icon" :size="20" :stroke-width="2" :class="b.color" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-ink-900 text-sm">{{ b.name }}</div>
              <div class="text-ink-400 text-xs">{{ b.location }} · {{ b.units }} unit</div>
            </div>
            <div class="text-right">
              <div class="font-display font-bold text-ink-900 text-sm">{{ b.revenue }}</div>
              <div class="text-xs" :class="b.occupancy >= 90 ? 'text-emerald-600' : 'text-amber-600'">{{ b.occupancy }}% band</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="card p-5">
        <h3 class="font-display font-semibold text-ink-900 mb-5">Soʻnggi faollik</h3>
        <div class="space-y-4">
          <div v-for="a in activity" :key="a.text" class="flex gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :class="a.bg">
              <component :is="a.icon" :size="14" :stroke-width="2" :class="a.color" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-ink-700 leading-snug">{{ a.text }}</p>
              <p class="text-xs text-ink-400 mt-0.5">{{ a.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, TrendingUp, Wallet, Users, Calendar, Download, ChevronRight,
  CreditCard, FileText, Bell, Wrench, CheckCircle2, AlertCircle, Building,
} from 'lucide-vue-next'

const authStore = useAuthStore()

const periods = ['6 oy', '12 oy', 'Yil']
const activePeriod = ref('12 oy')

const statCards = [
  { label: 'Daromad', value: '8.2 mlr', trend: 12.5, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: TrendingUp },
  { label: 'Bandlik', value: '94%', trend: 3.2, bg: 'bg-brand-50', color: 'text-brand-600', icon: Building2 },
  { label: 'Shartnomalar', value: '12', trend: -5.0, bg: 'bg-amber-50', color: 'text-amber-600', icon: FileText },
  { label: 'Ijarachilar', value: '48', trend: 8.1, bg: 'bg-sky-50', color: 'text-sky-600', icon: Users },
]

const revenueData = [
  { label: 'Yan', value: 45 }, { label: 'Fev', value: 60 }, { label: 'Mar', value: 35 },
  { label: 'Apr', value: 70 }, { label: 'May', value: 55 }, { label: 'Iyn', value: 80 },
  { label: 'Iyl', value: 90 }, { label: 'Avg', value: 50 }, { label: 'Sen', value: 65 },
  { label: 'Okt', value: 75 }, { label: 'Noy', value: 45 }, { label: 'Dek', value: 95 },
]

const buildings = [
  { name: 'Urban Office Tower', location: 'Toshkent', units: 60, revenue: '4.2 mlr soʻm', occupancy: 94, bg: 'bg-brand-50', color: 'text-brand-600', icon: Building },
  { name: 'Business Plaza', location: 'Samarqand', units: 42, revenue: '2.8 mlr soʻm', occupancy: 88, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: Building2 },
  { name: 'Residential Complex', location: 'Buxoro', units: 38, revenue: '1.2 mlr soʻm', occupancy: 91, bg: 'bg-amber-50', color: 'text-amber-600', icon: Building },
]

const activity = [
  { text: 'Yangi toʻlov qabul qilindi — 2.4 mlr soʻm', time: '5 daqiqa oldin', bg: 'bg-emerald-50', color: 'text-emerald-600', icon: CreditCard },
  { text: 'Shartnoma uzaytirildi — Urban Office', time: '1 soat oldin', bg: 'bg-brand-50', color: 'text-brand-600', icon: FileText },
  { text: 'Yangi servis soʻrovi — konditsioner', time: '3 soat oldin', bg: 'bg-amber-50', color: 'text-amber-600', icon: Wrench },
  { text: 'Shartnoma tasdiqlandi', time: '5 soat oldin', bg: 'bg-emerald-50', color: 'text-emerald-600', icon: CheckCircle2 },
  { text: 'Oʻzgarish: 2 unit boʻsh', time: 'Kecha', bg: 'bg-rose-50', color: 'text-rose-600', icon: AlertCircle },
]
</script>
