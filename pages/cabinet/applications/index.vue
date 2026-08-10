<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Ariza va hujjatlar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ apps.length }} ta ariza · {{ activeCount }} faol</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <!-- Status tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="statusFilter = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium"
        :class="statusFilter === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
        {{ tab.label }}
        <span v-if="tab.count > 0" class="ml-1 text-xs" :class="statusFilter === tab.value ? 'text-brand-500' : 'text-ink-400'">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Applications -->
    <div class="space-y-4">
      <div v-for="app in filteredApps" :key="app.id" class="card p-5 hover:shadow-md transition-shadow">
        <!-- Header -->
        <div class="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0" :class="appStatusClass(app.status)">
              {{ app.number.slice(-3) }}
            </div>
            <div>
              <div class="font-semibold text-ink-900 dark:text-white text-sm">{{ app.number }}</div>
              <div class="text-xs text-ink-500 mt-0.5">{{ app.unit }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotib olish' }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-ink-900 dark:text-white">{{ formatMoney(app.price) }}</div>
            <span class="badge text-xs mt-1 inline-block" :class="appStatusBadge(app.status)">{{ appStatusLabel(app.status) }}</span>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex items-center mb-4 overflow-x-auto pb-1">
          <div v-for="(step, i) in app.timeline" :key="i" class="flex items-center flex-shrink-0">
            <div class="flex flex-col items-center gap-1.5">
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all"
                :class="step.done ? 'bg-emerald-500/10 text-emerald-500' : step.current ? 'bg-brand-500/10 text-brand-500 ring-2 ring-brand-500/20' : 'bg-black/5 dark:bg-white/5 text-ink-400'"
              >
                <Check v-if="step.done" :size="14" />
                <Clock v-else-if="step.current" :size="14" />
                <span v-else class="text-[10px]">{{ i + 1 }}</span>
              </div>
              <span class="text-[10px] whitespace-nowrap font-medium" :class="step.done ? 'text-ink-900 dark:text-white' : step.current ? 'text-brand-500' : 'text-ink-400'">{{ step.label }}</span>
            </div>
            <div v-if="i < app.timeline.length - 1" class="w-6 sm:w-12 h-0.5 mx-1 rounded-full flex-shrink-0" :class="step.done && app.timeline[i+1].done ? 'bg-emerald-500/40' : 'bg-black/10 dark:bg-white/10'"></div>
          </div>
        </div>

        <!-- Details -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
          <div>
            <div class="text-ink-500 mb-0.5">Yaratilgan</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.createdDate }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">Muddat</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.durationMonths }} oy</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">Boshlash</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ app.startDate }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">ERI imzo</div>
            <div class="font-medium" :class="app.eriSigned ? 'text-emerald-500' : 'text-amber-500'">{{ app.eriSigned ? 'Imzolangan' : 'Kutilmoqda' }}</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-wrap pt-3 border-t border-black/5 dark:border-white/5">
          <NuxtLink :to="`/applications/${app.id}/offer`" class="btn btn-secondary btn-sm">
            <FileText :size="14" /> Tijoriy taklif
          </NuxtLink>
          <NuxtLink :to="`/applications/${app.id}/history`" class="btn btn-ghost btn-sm">
            <History :size="14" /> Tarix
          </NuxtLink>
          <button v-if="app.status === 'DRAFT_READY' && !app.eriSigned" class="btn btn-primary btn-sm ml-auto">
            <FileSignature :size="14" /> ERI imzolash
          </button>
          <NuxtLink v-if="app.status === 'SIGNED' || app.status === 'ACTIVE'" :to="`/contracts/${app.contractId}`" class="btn btn-primary btn-sm ml-auto">
            <ScrollText :size="14" /> Shartnomani ko'rish
          </NuxtLink>
          <span v-if="app.status === 'FINANCE_REVIEW'" class="text-xs text-ink-500 ml-auto flex items-center gap-1">
            <Clock :size="12" /> Buxgalter ko'rik kutilmoqda
          </span>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredApps.length === 0" class="card p-12 text-center">
      <FileText :size="32" class="text-ink-300 mx-auto mb-3" />
      <p class="text-ink-500 text-sm mb-4">Bu statusda arizalar yo'q</p>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi ariza yuborish</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Check, Clock, FileText, History, FileSignature, ScrollText } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const statusFilter = ref('')

const tabs = computed(() => [
  { value: '', label: 'Hammasi', count: apps.value.length },
  { value: 'SUBMITTED', label: 'Yuborilgan', count: apps.value.filter(a => a.status === 'SUBMITTED').length },
  { value: 'FINANCE_REVIEW', label: 'Moliyaviy', count: apps.value.filter(a => a.status === 'FINANCE_REVIEW').length },
  { value: 'DRAFT_READY', label: 'Loyiha tayyor', count: apps.value.filter(a => a.status === 'DRAFT_READY').length },
  { value: 'SIGNED', label: 'Imzolangan', count: apps.value.filter(a => a.status === 'SIGNED').length },
  { value: 'ACTIVE', label: 'Faol', count: apps.value.filter(a => a.status === 'ACTIVE').length },
])

const apps = ref([
  {
    id: 'a1', number: 'APP-2026-001', unit: 'A-301 Tashkent City', type: 'RENT', price: 25000000,
    status: 'FINANCE_REVIEW', eriSigned: false, contractId: '', createdDate: '12 Avg 2026',
    durationMonths: 12, startDate: '01 Sent 2026',
    timeline: [
      { label: 'Ariza', done: true, current: false },
      { label: 'Operatsion', done: true, current: false },
      { label: 'Moliyaviy', done: false, current: true },
      { label: 'Loyiha', done: false, current: false },
      { label: 'ERI imzo', done: false, current: false },
      { label: 'Faol', done: false, current: false },
    ],
  },
  {
    id: 'a2', number: 'APP-2026-002', unit: 'D-401 Piramit', type: 'SALE', price: 850000000,
    status: 'DRAFT_READY', eriSigned: false, contractId: '', createdDate: '05 Avg 2026',
    durationMonths: 0, startDate: '—',
    timeline: [
      { label: 'Ariza', done: true, current: false },
      { label: 'Operatsion', done: true, current: false },
      { label: 'Moliyaviy', done: true, current: false },
      { label: 'Loyiha', done: true, current: false },
      { label: 'ERI imzo', done: false, current: true },
      { label: 'Faol', done: false, current: false },
    ],
  },
  {
    id: 'a3', number: 'APP-2026-003', unit: 'E-102 Trillant Tower', type: 'RENT', price: 18000000,
    status: 'SUBMITTED', eriSigned: false, contractId: '', createdDate: '14 Avg 2026',
    durationMonths: 6, startDate: '01 Okt 2026',
    timeline: [
      { label: 'Ariza', done: true, current: false },
      { label: 'Operatsion', done: false, current: true },
      { label: 'Moliyaviy', done: false, current: false },
      { label: 'Loyiha', done: false, current: false },
      { label: 'ERI imzo', done: false, current: false },
      { label: 'Faol', done: false, current: false },
    ],
  },
  {
    id: 'a4', number: 'APP-2026-004', unit: 'B-205 Trillant Tower', type: 'RENT', price: 35000000,
    status: 'ACTIVE', eriSigned: true, contractId: 'c2', createdDate: '15 May 2026',
    durationMonths: 12, startDate: '15 May 2026',
    timeline: [
      { label: 'Ariza', done: true, current: false },
      { label: 'Operatsion', done: true, current: false },
      { label: 'Moliyaviy', done: true, current: false },
      { label: 'Loyiha', done: true, current: false },
      { label: 'ERI imzo', done: true, current: false },
      { label: 'Faol', done: true, current: false },
    ],
  },
  {
    id: 'a5', number: 'APP-2026-005', unit: 'C-201 IT Park', type: 'RENT', price: 18000000,
    status: 'SIGNED', eriSigned: true, contractId: 'c3', createdDate: '01 Iyn 2026',
    durationMonths: 12, startDate: '01 Iyn 2026',
    timeline: [
      { label: 'Ariza', done: true, current: false },
      { label: 'Operatsion', done: true, current: false },
      { label: 'Moliyaviy', done: true, current: false },
      { label: 'Loyiha', done: true, current: false },
      { label: 'ERI imzo', done: true, current: false },
      { label: 'Faol', done: false, current: true },
    ],
  },
])

const activeCount = computed(() => apps.value.filter(a => a.status === 'ACTIVE' || a.status === 'SIGNED').length)
const filteredApps = computed(() => statusFilter.value ? apps.value.filter(a => a.status === statusFilter.value) : apps.value)

function formatMoney(v: number) {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + ' mlr'
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(1) + 'M'
  return new Intl.NumberFormat('ru-RU').format(v)
}

function appStatusLabel(s: string) {
  return { SUBMITTED: 'Yuborilgan', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy ko\'rik', FINANCE_APPROVED: 'Moliya tasdiq', DRAFT_READY: 'Loyiha tayyor', PARTIALLY_SIGNED: 'Qisman imzo', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad etilgan' }[s] || s
}
function appStatusBadge(s: string) {
  return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', FINANCE_APPROVED: 'badge-brand', DRAFT_READY: 'badge-warning', PARTIALLY_SIGNED: 'badge-warning', SIGNED: 'badge-success', ACTIVE: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral'
}
function appStatusClass(s: string) {
  return { SUBMITTED: 'bg-ink-500/10 text-ink-500', OPERATION_REVIEW: 'bg-brand-500/10 text-brand-500', FINANCE_REVIEW: 'bg-blue-500/10 text-blue-500', FINANCE_APPROVED: 'bg-brand-500/10 text-brand-500', DRAFT_READY: 'bg-amber-500/10 text-amber-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', ACTIVE: 'bg-emerald-500/10 text-emerald-500', REJECTED: 'bg-red-500/10 text-red-500' }[s] || 'bg-ink-500/10 text-ink-500'
}
</script>
