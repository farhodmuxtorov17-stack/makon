<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Ariza va hujjatlar</h1>
      <p class="text-ink-500 text-sm mt-1">Arizalar, tijoriy takliflar, shartnomalar va ERI imzolar</p>
    </div>

    <!-- Status filter tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="statusFilter = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all"
        :class="statusFilter === tab.value ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Applications -->
    <div class="space-y-3">
      <div v-for="app in filteredApps" :key="app.id" class="card p-5">
        <div class="flex items-start justify-between flex-wrap gap-4 mb-4">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold" :class="appStatusClass(app.status)">
              {{ app.number.slice(-3) }}
            </div>
            <div>
              <div class="font-medium">{{ app.number }}</div>
              <div class="text-xs text-ink-500">{{ app.unit }} · {{ app.type === 'RENT' ? 'Ijara' : 'Sotib olish' }}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-sm font-medium">{{ formatMoney(app.price) }}</div>
              <span class="badge text-xs mt-1" :class="appStatusBadge(app.status)">{{ appStatusLabel(app.status) }}</span>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex items-center gap-1 mb-4 overflow-x-auto">
          <div v-for="(step, i) in app.timeline" :key="i" class="flex items-center gap-1 flex-shrink-0">
            <div class="flex flex-col items-center gap-1">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs" :class="step.done ? 'bg-emerald-500/10 text-emerald-500' : 'bg-black/5 dark:bg-white/5 text-ink-500'">
                <Check v-if="step.done" :size="14" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-[10px] whitespace-nowrap" :class="step.done ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ step.label }}</span>
            </div>
            <div v-if="i < app.timeline.length - 1" class="w-8 h-px" :class="step.done && app.timeline[i+1].done ? 'bg-emerald-500/30' : 'bg-black/10 dark:bg-white/10'"></div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 flex-wrap pt-3 border-t border-black/5 dark:border-white/5">
          <NuxtLink :to="`/applications/${app.id}/offer`" class="btn btn-secondary btn-sm">
            <FileText :size="14" /> Taklif
          </NuxtLink>
          <NuxtLink :to="`/applications/${app.id}/history`" class="btn btn-secondary btn-sm">
            <History :size="14" /> Tarix
          </NuxtLink>
          <button v-if="app.status === 'DRAFT_READY' && !app.signed" class="btn btn-primary btn-sm">
            <FileSignature :size="14" /> ERI imzolash
          </button>
          <button v-if="app.status === 'FINANCE_APPROVED'" class="btn btn-success btn-sm">
            <Check :size="14" /> Taklifni qabul qilish
          </button>
          <button v-if="app.status === 'FINANCE_APPROVED'" class="btn btn-ghost btn-sm text-red-500">
            <X :size="14" /> Rad etish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, FileText, History, FileSignature, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const statusFilter = ref('')
const tabs = [
  { value: '', label: 'Hammasi' },
  { value: 'SUBMITTED', label: 'Yuborilgan' },
  { value: 'FINANCE_REVIEW', label: 'Moliyaviy' },
  { value: 'DRAFT_READY', label: 'Loyiha tayyor' },
  { value: 'SIGNED', label: 'Imzolangan' },
  { value: 'ACTIVE', label: 'Faol' },
]

const apps = ref([
  {
    id: 'a1', number: 'APP-2026-001', unit: 'A-301 Tashkent City', type: 'RENT', price: 25000000, status: 'FINANCE_REVIEW', signed: false,
    timeline: [
      { label: 'Ariza', done: true },
      { label: 'Operatsion', done: true },
      { label: 'Moliyaviy', done: false },
      { label: 'Loyiha', done: false },
      { label: 'ERI imzo', done: false },
      { label: 'Faol', done: false },
    ]
  },
  {
    id: 'a2', number: 'APP-2026-002', unit: 'D-401 Piramit', type: 'SALE', price: 850000000, status: 'DRAFT_READY', signed: false,
    timeline: [
      { label: 'Ariza', done: true },
      { label: 'Operatsion', done: true },
      { label: 'Moliyaviy', done: true },
      { label: 'Loyiha', done: true },
      { label: 'ERI imzo', done: false },
      { label: 'Faol', done: false },
    ]
  },
  {
    id: 'a3', number: 'APP-2026-003', unit: 'E-102 Trillent', type: 'RENT', price: 18000000, status: 'SUBMITTED', signed: false,
    timeline: [
      { label: 'Ariza', done: true },
      { label: 'Operatsion', done: false },
      { label: 'Moliyaviy', done: false },
      { label: 'Loyiha', done: false },
      { label: 'ERI imzo', done: false },
      { label: 'Faol', done: false },
    ]
  },
])

const filteredApps = computed(() => statusFilter.value ? apps.value.filter(a => a.status === statusFilter.value) : apps.value)

function formatMoney(v: number) { return new Intl.NumberFormat('ru-RU').format(v) + ' so\'m' }
function appStatusLabel(s: string) { return { SUBMITTED: 'Yuborilgan', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy ko\'rik', FINANCE_APPROVED: 'Moliya tasdiq', DRAFT_READY: 'Loyiha tayyor', PARTIALLY_SIGNED: 'Qisman imzo', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad etilgan' }[s] || s }
function appStatusBadge(s: string) { return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', FINANCE_APPROVED: 'badge-brand', DRAFT_READY: 'badge-warning', PARTIALLY_SIGNED: 'badge-warning', SIGNED: 'badge-success', ACTIVE: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral' }
function appStatusClass(s: string) { return { SUBMITTED: 'bg-zinc-500/10 text-zinc-500', FINANCE_REVIEW: 'bg-blue-500/10 text-blue-500', DRAFT_READY: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500' }[s] || 'bg-zinc-500/10 text-zinc-500' }
</script>
