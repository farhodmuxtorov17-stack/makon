<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Tasdiqlash jarayoni</h1>
      <p class="text-ink-500 text-sm mt-1">Invoys va to'lov tasdiqlari</p>
    </div>

    <!-- Approval flow -->
    <div class="card-premium p-6">
      <h3 class="font-semibold mb-4 text-ink-900 dark:text-white">Tasdiqlash bosqichlari</h3>
      <div class="flex items-center gap-2 flex-wrap">
        <div v-for="(step, i) in approvalSteps" :key="i" class="flex items-center gap-2">
          <div class="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-500/10">
            <component :is="step.icon" :size="16" class="text-brand-500" />
            <span class="text-sm font-medium text-ink-900 dark:text-white">{{ step.label }}</span>
          </div>
          <ChevronRight v-if="i < approvalSteps.length - 1" :size="16" class="text-ink-400" />
        </div>
      </div>
    </div>

    <!-- Pending approvals -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">Tasdiqlash kutilmoqda</h3>
      <div class="space-y-3">
        <div v-for="a in approvals" :key="a.id" class="card p-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="stepBg(a.currentStep)">
            <component :is="stepIcon(a.currentStep)" :size="18" :class="stepColor(a.currentStep)" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-medium text-ink-900 dark:text-white">{{ a.title }}</span>
              <span class="badge text-xs" :class="stepBadge(a.currentStep)">{{ stepLabel(a.currentStep) }}</span>
            </div>
            <div class="text-xs text-ink-500 mt-0.5">{{ a.submitter }} · {{ a.date }}</div>
          </div>
          <div class="text-right">
            <div class="font-semibold text-ink-900 dark:text-white">{{ a.amount }}</div>
            <div class="text-xs text-ink-500">{{ a.type }}</div>
          </div>
          <div class="flex gap-2">
            <button @click="a.status = 'APPROVED'" class="btn btn-primary btn-sm btn-glow">
              <Check :size="14" /> Tasdiqlash
            </button>
            <button @click="a.status = 'REJECTED'" class="btn btn-secondary btn-sm">
              <X :size="14" /> Rad
            </button>
          </div>
        </div>
        <div v-if="approvals.length === 0" class="card p-12 text-center text-ink-500">Tasdiqlash kutilayotgan hujjatlar yo'q</div>
      </div>
    </div>

    <!-- History -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">Tarix</h3>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
                <th class="px-4 py-3">Hujjat</th>
                <th class="px-4 py-3">Yuboruvchi</th>
                <th class="px-4 py-3">Tasdiqlovchi</th>
                <th class="px-4 py-3 text-right">Summa</th>
                <th class="px-4 py-3 text-center">Natija</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in history" :key="h.id" class="border-b border-black/5 dark:border-white/5">
                <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ h.title }}</td>
                <td class="px-4 py-3 text-ink-500">{{ h.submitter }}</td>
                <td class="px-4 py-3 text-ink-500">{{ h.approver }}</td>
                <td class="px-4 py-3 text-right">{{ h.amount }}</td>
                <td class="px-4 py-3 text-center">
                  <span class="badge text-xs" :class="h.result === 'APPROVED' ? 'badge-success' : 'badge-danger'">{{ h.result === 'APPROVED' ? 'Tasdiqlangan' : 'Rad etilgan' }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, X, ChevronRight, FileText, Calculator, ShieldCheck, UserCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const approvalSteps = [
  { icon: FileText, label: 'Yuborildi' },
  { icon: Calculator, label: 'Buxgalter' },
  { icon: UserCheck, label: 'Menejer' },
  { icon: ShieldCheck, label: 'Bosh admin' },
]

const approvals = ref([
  { id: 'ap-1', title: 'Invoys INV-2026-001', submitter: 'Dilnoza Karimova', date: '10 Avg, 2026', amount: '18.5M so\'m', type: 'Invoys tasdiqi', currentStep: 1, status: 'PENDING' },
  { id: 'ap-2', title: 'To\'lov tasdiqi #PAY-45', submitter: 'Aziz Toshmatov', date: '09 Avg, 2026', amount: '5.4M so\'m', type: 'To\'lov tasdiqi', currentStep: 2, status: 'PENDING' },
  { id: 'ap-3', title: 'Qarz yozish #DEBT-12', submitter: 'Dilnoza Karimova', date: '08 Avg, 2026', amount: '2.1M so\'m', type: 'Qarz yozish', currentStep: 3, status: 'PENDING' },
])

const history = [
  { id: 'h-1', title: 'Invoys INV-2025-098', submitter: 'Dilnoza Karimova', approver: 'Bosh Admin', amount: '12.0M so\'m', result: 'APPROVED' },
  { id: 'h-2', title: 'To\'lov #PAY-44', submitter: 'Aziz Toshmatov', approver: 'Buxgalter', amount: '8.3M so\'m', result: 'APPROVED' },
  { id: 'h-3', title: 'Qarz yozish #DEBT-11', submitter: 'Dilnoza Karimova', approver: 'Bosh Admin', amount: '1.5M so\'m', result: 'REJECTED' },
  { id: 'h-4', title: 'Invoys INV-2025-097', submitter: 'Aziz Toshmatov', approver: 'Menejer', amount: '22.0M so\'m', result: 'APPROVED' },
]

function stepBg(s: number) { return ['bg-ink-500/10', 'bg-amber-500/10', 'bg-brand-500/10', 'bg-emerald-500/10'][s] || 'bg-ink-500/10' }
function stepColor(s: number) { return ['text-ink-400', 'text-amber-500', 'text-brand-500', 'text-emerald-500'][s] || 'text-ink-400' }
function stepIcon(s: number) { return [FileText, Calculator, UserCheck, ShieldCheck][s] || FileText }
function stepBadge(s: number) { return ['badge-neutral', 'badge-warning', 'badge-brand', 'badge-success'][s] || 'badge-neutral' }
function stepLabel(s: number) { return ['Yuborildi', 'Buxgalter', 'Menejer', 'Bosh admin'][s] || 'Noma\'lum' }
</script>
