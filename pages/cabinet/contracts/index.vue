<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Mening shartnomalarim</h1>
        <p class="text-ink-500 text-sm mt-1">{{ contracts.length }} ta shartnoma · {{ activeCount }} faol</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center"><CheckCircle2 :size="16" class="text-emerald-500" /></div>
          <span class="text-xs text-ink-500">Faol</span>
        </div>
        <div class="text-xl font-bold text-emerald-500">{{ activeCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"><Clock :size="16" class="text-amber-500" /></div>
          <span class="text-xs text-ink-500">Imzolanmoqda</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ signingCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center"><ShieldCheck :size="16" class="text-purple-500" /></div>
          <span class="text-xs text-ink-500">ERI</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ eriCount }}</div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center"><AlertCircle :size="16" class="text-red-500" /></div>
          <span class="text-xs text-ink-500">Muddati o'tgan</span>
        </div>
        <div class="text-xl font-bold text-ink-900 dark:text-white">{{ expiredCount }}</div>
      </div>
    </div>

    <!-- Contract cards -->
    <div class="space-y-3">
      <div v-for="c in contracts" :key="c.id" class="card p-5 hover:shadow-md transition-shadow cursor-pointer" @click="navigateTo(`/contracts/${c.id}`)">
        <div class="flex items-start justify-between flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" :class="statusIcon(c.status)">
              <FileText :size="18" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-ink-900 dark:text-white text-sm font-mono">{{ c.number }}</span>
                <span class="badge text-[10px]" :class="statusBadge(c.status)">{{ statusLabel(c.status) }}</span>
              </div>
              <div class="text-xs text-ink-500 mt-0.5">{{ c.unit }} · {{ c.buildingName }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-brand-500">{{ formatMoney(c.monthlyRent) }}</div>
            <div class="text-xs text-ink-500">{{ c.startDate }} → {{ c.endDate }}</div>
          </div>
        </div>

        <!-- ERI status -->
        <div class="flex items-center gap-3 mt-3 pt-3 border-t border-black/5 dark:border-white/5">
          <div class="flex items-center gap-2 text-xs">
            <ShieldCheck :size="14" class="text-purple-500" />
            <span class="text-ink-500">ERI:</span>
            <span class="eri-badge" :class="c.eriTenantSigned ? 'eri-badge--signed' : 'eri-badge--pending'">T {{ c.eriTenantSigned ? '✓' : '✗' }}</span>
            <span class="eri-badge" :class="c.eriLandlordSigned ? 'eri-badge--signed' : 'eri-badge--pending'">L {{ c.eriLandlordSigned ? '✓' : '✗' }}</span>
          </div>
          <span v-if="c.status === 'ACTIVE'" class="text-xs text-emerald-500 ml-auto flex items-center gap-1">
            <CheckCircle2 :size="12" /> {{ c.daysLeft }} kun qoldi
          </span>
          <span v-else-if="c.status === 'PARTIALLY_SIGNED'" class="text-xs text-amber-500 ml-auto flex items-center gap-1">
            <Clock :size="12" /> Imzo kutilmoqda
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, FileText, CheckCircle2, Clock, ShieldCheck, AlertCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const contracts = [
  { id: 'c1', number: 'CTR-2026-001', unit: 'A-301', buildingName: 'Tashkent City', monthlyRent: 25000000, startDate: '01.04.26', endDate: '15.03.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true, daysLeft: 218 },
  { id: 'c2', number: 'CTR-2026-002', unit: 'B-205', buildingName: 'Trillant Tower', monthlyRent: 35000000, startDate: '15.05.26', endDate: '14.05.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true, daysLeft: 278 },
  { id: 'c3', number: 'CTR-2026-005', unit: 'C-101', buildingName: 'IT Park', monthlyRent: 18000000, startDate: '01.06.26', endDate: '31.05.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true, daysLeft: 295 },
  { id: 'c4', number: 'CTR-2026-008', unit: 'D-102', buildingName: 'Piramit', monthlyRent: 22000000, startDate: '01.08.26', endDate: '31.07.27', status: 'PARTIALLY_SIGNED', eriTenantSigned: true, eriLandlordSigned: false, daysLeft: 0 },
  { id: 'c5', number: 'CTR-2025-098', unit: 'A-205', buildingName: 'Tashkent City', monthlyRent: 15000000, startDate: '01.09.25', endDate: '31.08.26', status: 'EXPIRED', eriTenantSigned: true, eriLandlordSigned: true, daysLeft: 0 },
]

const activeCount = computed(() => contracts.filter(c => c.status === 'ACTIVE').length)
const signingCount = computed(() => contracts.filter(c => c.status === 'PARTIALLY_SIGNED').length)
const eriCount = computed(() => contracts.filter(c => c.eriTenantSigned && c.eriLandlordSigned).length)
const expiredCount = computed(() => contracts.filter(c => c.status === 'EXPIRED').length)

function formatMoney(v: number) { return (v / 1_000_000).toFixed(1) + 'M' }
function statusLabel(s: string) { return { ACTIVE: 'Faol', PARTIALLY_SIGNED: 'Qisman imzo', EXPIRED: "Muddati o'tgan" }[s] || s }
function statusBadge(s: string) { return { ACTIVE: 'badge-success', PARTIALLY_SIGNED: 'badge-warning', EXPIRED: 'badge-neutral' }[s] || 'badge-neutral' }
function statusIcon(s: string) {
  return { ACTIVE: 'bg-emerald-500/10 text-emerald-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', EXPIRED: 'bg-ink-500/10 text-ink-500' }[s] || 'bg-ink-500/10 text-ink-500'
}
</script>

<style scoped>
.eri-badge { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 5px; }
.eri-badge--signed { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
.eri-badge--pending { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
</style>
