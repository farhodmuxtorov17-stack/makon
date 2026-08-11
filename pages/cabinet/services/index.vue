<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Hisob va servis</h1>
        <p class="text-ink-500 text-sm mt-1">To'lovlar, invoyslar va servis so'rovlari</p>
      </div>
      <NuxtLink to="/cabinet/service-requests/new" class="btn btn-primary btn-sm btn-glow">
        <Plus :size="14" /> Servis so'rov
      </NuxtLink>
    </div>

    <!-- Balance summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-5 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Wallet :size="20" class="text-emerald-500" /></div>
          <span class="text-sm font-medium text-ink-700 dark:text-ink-300">Joriy balans</span>
        </div>
        <div class="text-2xl font-bold text-emerald-500">{{ formatUZS(0) }}</div>
        <div class="text-xs text-ink-500 mt-1">Qarzdorlik yo'q (unit A-301)</div>
      </div>
      <div class="card p-5 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertCircle :size="20" class="text-red-500" /></div>
          <span class="text-sm font-medium text-ink-700 dark:text-ink-300">Qarzdorlik</span>
        </div>
        <div class="text-2xl font-bold text-red-500">{{ formatUZS(4200000) }}</div>
        <div class="text-xs text-ink-500 mt-1">Unit B-205 · 5 kun kechikish</div>
      </div>
      <div class="card-premium p-5">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Receipt :size="20" class="text-blue-500" /></div>
          <span class="text-sm font-medium text-ink-700 dark:text-ink-300">Keyingi to'lov</span>
        </div>
        <div class="text-2xl font-bold text-ink-900 dark:text-white">15 Avg</div>
        <div class="text-xs text-ink-500 mt-1">25.0M UZS · INV-2026-052</div>
      </div>
    </div>

    <!-- Service charges breakdown -->
    <div class="card-premium p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Servis to'lovlari tarkibi</h3>
      <div class="space-y-3">
        <div v-for="charge in serviceCharges" :key="charge.name" class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="{ background: charge.color + '15' }">
            <component :is="charge.icon" :size="16" :style="{ color: charge.color }" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-ink-900 dark:text-white">{{ charge.name }}</span>
              <span class="text-sm font-bold text-ink-900 dark:text-white">{{ formatUZS(charge.amount) }}</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-ink-500">
              <span>{{ charge.details }}</span>
              <span>·</span>
              <span>{{ charge.unit }}</span>
            </div>
            <div class="h-1.5 rounded-full bg-black/5 dark:bg-white/5 mt-2 overflow-hidden">
              <div class="h-full rounded-full" :style="{ width: charge.percent + '%', background: charge.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent invoices -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">So'nggi invoyslar</h3>
        <NuxtLink to="/finance/invoices" class="text-xs text-brand-500">Barchasi →</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-ink-500 text-xs uppercase tracking-widest border-b border-black/5 dark:border-white/5">
              <th class="text-left font-medium px-3 py-2">Raqam</th>
              <th class="text-left font-medium px-3 py-2 hidden sm:table-cell">Unit</th>
              <th class="text-left font-medium px-3 py-2 hidden md:table-cell">Davr</th>
              <th class="text-right font-medium px-3 py-3">Summa</th>
              <th class="text-center font-medium px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer" @click="navigateTo('/cabinet/services')">
              <td class="px-3 py-3 font-mono text-xs text-ink-700 dark:text-ink-300">{{ inv.number }}</td>
              <td class="px-3 py-3 hidden sm:table-cell text-ink-500">{{ inv.unit }}</td>
              <td class="px-3 py-3 hidden md:table-cell text-ink-500">{{ inv.period }}</td>
              <td class="px-3 py-3 text-right font-semibold text-ink-900 dark:text-white">{{ formatUZS(inv.amount) }}</td>
              <td class="px-3 py-3 text-center">
                <span class="badge text-[10px]" :class="inv.status === 'PAID' ? 'badge-success' : inv.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'">
                  {{ inv.status === 'PAID' ? 'To\'langan' : inv.status === 'OVERDUE' ? 'Muddati o\'tgan' : 'Kutilmoqda' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Service requests -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 dark:text-white">Servis so'rovlari</h3>
        <NuxtLink to="/cabinet/service-requests/new" class="btn btn-secondary btn-sm text-xs"><Plus :size="12" /> Yangi</NuxtLink>
      </div>
      <div class="space-y-2">
        <div v-for="sr in serviceRequests" :key="sr.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="sr.iconBg">
            <component :is="sr.icon" :size="16" :class="sr.iconColor" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ sr.category }}</div>
            <div class="text-xs text-ink-500">{{ sr.unit }} · {{ sr.date }}</div>
          </div>
          <span class="badge text-[10px] flex-shrink-0" :class="srBadgeClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus, Wallet, AlertCircle, Receipt, Zap, Droplet, Flame, Wrench, Trash2, Bell,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const serviceCharges = [
  { name: 'Ijara to\'lovi', icon: Receipt, color: 'var(--accent)', amount: 25000000, details: 'A-301 · 85 m²', unit: 'oylik', percent: 72 },
  { name: 'Elektr energiyasi', icon: Zap, color: '#f59e0b', amount: 1320000, details: '440 kWh × 3000 so\'m', unit: 'oylik', percent: 4 },
  { name: 'Suv ta\'minoti', icon: Droplet, color: '#3b82f6', amount: 182000, details: '130 m³ × 1400 so\'m', unit: 'oylik', percent: 1 },
  { name: 'Gaz', icon: Flame, color: '#ef4444', amount: 225000, details: '150 m³ × 1500 so\'m', unit: 'oylik', percent: 1 },
  { name: 'Faqat texnik xizmat', icon: Wrench, color: 'var(--accent)', amount: 500000, details: 'A-301 · oylik', unit: 'oylik', percent: 2 },
  { name: 'Axlat olib ketish', icon: Trash2, color: '#10b981', amount: 120000, details: 'A-301 · oylik', unit: 'oylik', percent: 1 },
]

const invoices = [
  { id: '1', number: 'INV-2026-052', unit: 'A-301', period: 'Avg 2026', amount: 27247000, status: 'PENDING' },
  { id: '2', number: 'INV-2026-046', unit: 'B-205', period: 'Iyl 2026', amount: 35000000, status: 'OVERDUE' },
  { id: '3', number: 'INV-2026-045', unit: 'A-301', period: 'Iyl 2026', amount: 27185000, status: 'PAID' },
  { id: '4', number: 'INV-2026-040', unit: 'A-301', period: 'Iyn 2026', amount: 26920000, status: 'PAID' },
]

const serviceRequests = [
  { id: 'sr1', category: 'Elektr ta\'miri', unit: 'A-301', date: '2 kun oldin', status: 'IN_PROGRESS', icon: Zap, iconBg: 'bg-amber-500/10', iconColor: 'text-amber-500' },
  { id: 'sr2', category: 'Sanitariya', unit: 'B-205', date: '5 kun oldin', status: 'ASSIGNED', icon: Wrench, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-500' },
]



function srBadgeClass(s: string) {
  return { ASSIGNED: 'badge-brand', IN_PROGRESS: 'badge-warning', DONE: 'badge-success' }[s] || 'badge-neutral'
}
function srStatusLabel(s: string) {
  return { ASSIGNED: 'Tayinlandi', IN_PROGRESS: 'Ishda', DONE: 'Yakunlandi' }[s] || s
}
</script>
