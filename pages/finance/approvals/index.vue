<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Tasdiqlash navbati</h1>
      <p class="text-ink-400 text-sm mt-1">Tasdiqlash kutilayotgan hujjatlar</p>
    </div>

    <div class="space-y-3">
      <div v-for="item in approvals" :key="item.id" class="card p-5">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="item.bg">
              <component :is="item.icon" :size="18" :class="item.color" />
            </div>
            <div>
              <h3 class="text-white font-medium">{{ item.title }}</h3>
              <p class="text-sm text-ink-500">{{ item.subtitle }}</p>
            </div>
          </div>
          <span class="badge" :class="item.urgent ? 'badge-danger' : 'badge-warning'">{{ item.urgent ? 'Shoshilinch' : 'Navbatda' }}</span>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-white/5">
          <span class="text-xs text-ink-500">{{ formatDate(item.createdAt) }}</span>
          <div class="flex gap-2">
            <button class="btn btn-secondary btn-sm">Rad etish</button>
            <button class="btn btn-primary btn-sm">Tasdiqlash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText, Wallet, ShieldCheck, Package } from 'lucide-vue-next'
import { billingPeriods } from '~/utils/mockData'

definePageMeta({ middleware: 'auth' })
const { formatDate } = useFormat()

const approvals = [
  { id: 'ap1', title: 'Invoice generatsiyasi — Avgust 2026', subtitle: '24 ta invoice, 412 mln so\'m', icon: FileText, bg: 'bg-brand-500/10', color: 'text-brand-400', urgent: false, createdAt: '2026-08-01T00:00:00Z' },
  { id: 'ap2', title: 'Ariza APP-2026-002 — Trillant Tower', subtitle: 'Dilnoza Karimova · 35 mln/oy', icon: Wallet, bg: 'bg-amber-500/10', color: 'text-amber-400', urgent: true, createdAt: '2026-08-03T00:00:00Z' },
  { id: 'ap3', title: 'Shartnoma CTR-2026-002 — ERI imzolash', subtitle: 'Aziz Toshmatov · 12 oy ijara', icon: ShieldCheck, bg: 'bg-emerald-500/10', color: 'text-emerald-400', urgent: false, createdAt: '2026-08-06T00:00:00Z' },
  { id: 'ap4', title: 'Material so\'rovi MAT-2026-012', subtitle: 'Konditsioner filtri + Freon', icon: Package, bg: 'bg-blue-500/10', color: 'text-blue-400', urgent: false, createdAt: '2026-08-09T13:00:00Z' },
]
</script>
