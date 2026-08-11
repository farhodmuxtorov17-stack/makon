<template>
  <div class="space-y-5">
    <!-- Header -->
    <div>
      <div class="eyebrow">FINANCE / APPROVALS</div>
      <h1 class="page-title">Tasdiqlash jarayoni</h1>
      <p class="page-sub">Invoys va to'lov tasdiqlarini bosqichma-bosqich boshqaring</p>
    </div>

    <!-- Approval flow visualization -->
    <div class="card-premium p-6">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-5">Tasdiqlash bosqichlari</h3>
      <div class="flow">
        <div v-for="(step, i) in approvalSteps" :key="i" class="flow__node" :class="{ 'flow__node--done': i < currentStepIndex, 'flow__node--active': i === currentStepIndex }">
          <div class="flow__icon">
            <component :is="step.icon" :size="18" />
            <CheckCircle v-if="i < currentStepIndex" :size="14" class="flow__check" />
          </div>
          <div class="flow__label">{{ step.label }}</div>
          <div class="flow__desc">{{ step.desc }}</div>
          <div v-if="i < approvalSteps.length - 1" class="flow__connector" :class="{ 'flow__connector--done': i < currentStepIndex }"></div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="approval-stat approval-stat--amber">
        <div class="approval-stat__num">{{ pendingCount }}</div><KpiScene3D type="applications" :size="40" style="position:absolute;top:-2px;right:-2px;opacity:0.4;pointer-events:none" />
        <div class="approval-stat__label">Kutilmoqda</div>
      </div>
      <div class="approval-stat approval-stat--green">
        <div class="approval-stat__num">{{ approvedCount }}</div><KpiScene3D type="paid" :size="40" style="position:absolute;top:-2px;right:-2px;opacity:0.4;pointer-events:none" />
        <div class="approval-stat__label">Tasdiqlangan</div>
      </div>
      <div class="approval-stat approval-stat--red">
        <div class="approval-stat__num">{{ rejectedCount }}</div><KpiScene3D type="overdue" :size="40" style="position:absolute;top:-2px;right:-2px;opacity:0.4;pointer-events:none" />
        <div class="approval-stat__label">Rad etilgan</div>
      </div>
      <div class="approval-stat approval-stat--teal">
        <div class="approval-stat__num">{{ formatUZSShort(pendingAmount) }}</div><KpiScene3D type="revenue" :size="40" style="position:absolute;top:-2px;right:-2px;opacity:0.4;pointer-events:none" />
        <div class="approval-stat__label">Kutilayotgan summa</div>
      </div>
    </div>

    <!-- Pending approvals -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">Tasdiqlash kutilmoqda</h3>
      <div class="space-y-3">
        <div v-for="a in pendingApprovals" :key="a.id" class="approval-card">
          <div class="approval-card__icon" :class="stepBg(a.currentStep)">
            <component :is="stepIcon(a.currentStep)" :size="18" :class="stepColor(a.currentStep)" />
          </div>
          <div class="approval-card__body">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-ink-900 dark:text-white">{{ a.title }}</span>
              <span class="badge badge-sm" :class="stepBadge(a.currentStep)">{{ stepLabel(a.currentStep) }}</span>
            </div>
            <div class="text-xs text-ink-500 mt-1">{{ a.submitter }} · {{ a.date }} · {{ a.contract }}</div>
          </div>
          <div class="approval-card__amount">
            <div class="font-bold text-ink-900 dark:text-white">{{ formatUZS(a.amount) }}</div>
            <div class="text-xs text-ink-400">{{ a.type }}</div>
          </div>
          <div class="approval-card__actions">
            <button @click="approve(a)" class="btn btn-primary btn-sm btn-glow">
              <Check :size="14" /> Tasdiqlash
            </button>
            <button @click="reject(a)" class="btn btn-secondary btn-sm">
              <X :size="14" /> Rad
            </button>
          </div>
        </div>
        <div v-if="pendingApprovals.length === 0" class="card p-12 text-center">
          <CheckCircle :size="32" class="text-emerald-500 mx-auto mb-3" />
          <p class="text-ink-500">Tasdiqlash kutilayotgan hujjatlar yo'q</p>
        </div>
      </div>
    </div>

    <!-- History -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 dark:text-white">Tarix</h3>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 dark:border-white/5">
                <th class="px-4 py-3">Hujjat</th>
                <th class="px-4 py-3 hidden md:table-cell">Yuboruvchi</th>
                <th class="px-4 py-3 text-right">Summa</th>
                <th class="px-4 py-3 text-center hidden md:table-cell">Sana</th>
                <th class="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in history" :key="h.id" class="border-b border-black/5 dark:border-white/5">
                <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ h.title }}</td>
                <td class="px-4 py-3 hidden md:table-cell text-ink-500">{{ h.submitter }}</td>
                <td class="px-4 py-3 text-right">{{ formatUZS(h.amount) }}</td>
                <td class="px-4 py-3 hidden md:table-cell text-center text-xs text-ink-400">{{ h.date }}</td>
                <td class="px-4 py-3 text-center">
                  <span class="badge badge-sm" :class="h.status === 'APPROVED' ? 'badge-success' : 'badge-danger'">
                    {{ h.status === 'APPROVED' ? 'Tasdiqlangan' : 'Rad etilgan' }}
                  </span>
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
import KpiScene3D from '~/components/KpiScene3D.vue'
import { FileText, CreditCard, Stamp, CheckCircle, Check, X, Clock, AlertCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const approvalSteps = [
  { icon: FileText, label: 'Yaratildi', desc: 'Hujjat tayyorlandi' },
  { icon: CreditCard, label: 'Buxgalter', desc: 'Summa tekshirildi' },
  { icon: Stamp, label: 'Rahbar', desc: 'Yakuniy tasdiq' },
  { icon: CheckCircle, label: 'Yakunlandi', desc: 'Jarayon tugadi' },
]

const currentStepIndex = ref(1)

const pendingApprovals = ref([
  { id: 'a1', title: 'Invoys INV-2026-051', submitter: 'Dilshod Karimov (Buxgalter)', date: '11 Avg 2026', contract: 'CTR-2026-001', amount: 8500000, type: 'Invoys', currentStep: 1 },
  { id: 'a2', title: 'To\'lov TM-2026-089', submitter: 'Aziza Yusupova (Operator)', date: '10 Avg 2026', contract: 'CTR-2026-005', amount: 4800000, type: 'To\'lov', currentStep: 2 },
  { id: 'a3', title: 'Invoys INV-2026-052', submitter: 'Sardor Rahimov (Buxgalter)', date: '09 Avg 2026', contract: 'CTR-2026-012', amount: 5500000, type: 'Invoys', currentStep: 0 },
  { id: 'a4', title: 'Depozit DP-2026-015', submitter: 'Dilshod Karimov (Buxgalter)', date: '08 Avg 2026', contract: 'CTR-2026-018', amount: 3900000, type: 'Depozit', currentStep: 1 },
])

const history = ref([
  { id: 'h1', title: 'Invoys INV-2026-048', submitter: 'Dilshod Karimov', amount: 7200000, date: '05 Avg 2026', status: 'APPROVED' },
  { id: 'h2', title: 'To\'lov TM-2026-085', submitter: 'Aziza Yusupova', amount: 6200000, date: '03 Avg 2026', status: 'APPROVED' },
  { id: 'h3', title: 'Invoys INV-2026-046', submitter: 'Sardor Rahimov', amount: 5500000, date: '01 Avg 2026', status: 'REJECTED' },
  { id: 'h4', title: 'Invoys INV-2026-044', submitter: 'Dilshod Karimov', amount: 8500000, date: '28 Iyl 2026', status: 'APPROVED' },
])

const pendingCount = computed(() => pendingApprovals.value.length)
const approvedCount = computed(() => history.value.filter(h => h.status === 'APPROVED').length)
const rejectedCount = computed(() => history.value.filter(h => h.status === 'REJECTED').length)
const pendingAmount = computed(() => pendingApprovals.value.reduce((s, a) => s + a.amount, 0))

function approve(a: any) {
  pendingApprovals.value = pendingApprovals.value.filter(x => x.id !== a.id)
  history.value.unshift({ id: 'h' + Date.now(), title: a.title, submitter: a.submitter.split('(')[0].trim(), amount: a.amount, date: '11 Avg 2026', status: 'APPROVED' })
}
function reject(a: any) {
  pendingApprovals.value = pendingApprovals.value.filter(x => x.id !== a.id)
  history.value.unshift({ id: 'h' + Date.now(), title: a.title, submitter: a.submitter.split('(')[0].trim(), amount: a.amount, date: '11 Avg 2026', status: 'REJECTED' })
}

function stepIcon(step: number) {
  return [FileText, CreditCard, Stamp, CheckCircle][step]
}
function stepBg(step: number) {
  return ['bg-brand-500/10', 'bg-amber-500/10', 'bg-purple-500/10', 'bg-emerald-500/10'][step]
}
function stepColor(step: number) {
  return ['text-brand-500', 'text-amber-500', 'text-purple-500', 'text-emerald-500'][step]
}
function stepBadge(step: number) {
  return ['badge-brand', 'badge-warning', 'badge-info', 'badge-success'][step]
}
function stepLabel(step: number) {
  return ['Yaratildi', 'Buxgalter', 'Rahbar', 'Yakunlandi'][step]
}

function formatUZS(n: number) { return n.toLocaleString('ru-RU') + ' UZS' }
function formatUZSShort(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' mlrd'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' mln'
  return n.toLocaleString('ru-RU')
}
</script>

<style scoped>
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; }
.page-title { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0; }
.dark .page-title { color: white; }
.page-sub { font-size: 14px; color: #71717a; margin: 4px 0 0; }
.dark .page-sub { color: #a1a1aa; }

/* Flow */
.flow { display: flex; align-items: flex-start; gap: 0; overflow-x: auto; padding-bottom: 4px; }
.flow__node { flex: 1; min-width: 160px; position: relative; text-align: center; padding: 0 12px; }
.flow__icon {
  width: 48px; height: 48px; border-radius: 14px; margin: 0 auto 12px;
  display: flex; align-items: center; justify-content: center; position: relative;
  background: var(--bg-subtle); color: var(--text-muted); transition: all 0.3s;
}
.flow__node--done .flow__icon { background: var(--accent); color: white; }
.flow__node--active .flow__icon { background: var(--accent); color: white; box-shadow: 0 0 0 4px var(--accent-glow); }
.flow__check { position: absolute; top: -4px; right: -4px; color: #10b981; background: white; border-radius: 50%; }
.dark .flow__check { background: #18181b; }
.flow__label { font-size: 14px; font-weight: 600; color: #18181b; margin-bottom: 4px; }
.dark .flow__label { color: white; }
.flow__desc { font-size: 12px; color: #71717a; }
.dark .flow__desc { color: #a1a1aa; }
.flow__connector {
  position: absolute; top: 24px; right: -50%; width: 100%; height: 2px;
  background: rgba(0,0,0,0.08); z-index: -1;
}
.dark .flow__connector { background: rgba(255,255,255,0.06); }
.flow__connector--done { background: var(--accent); }

/* Stats */
.approval-stat { position: relative; overflow: hidden;
  border-radius: 16px; padding: 18px; text-align: center;
  border: 1px solid rgba(0,0,0,0.05); background: white;
}
.dark .approval-stat { position: relative; overflow: hidden; background: #18181b; border-color: rgba(255,255,255,0.06); }
.approval-stat--amber { border-top: 3px solid #f59e0b; }
.approval-stat--green { border-top: 3px solid #10b981; }
.approval-stat--red { border-top: 3px solid #ef4444; }
.approval-stat--teal { border-top: 3px solid var(--accent); }
.approval-stat__num { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; }
.dark .approval-stat__num { color: white; }
.approval-stat__label { font-size: 12px; color: #71717a; font-weight: 500; margin-top: 4px; }
.dark .approval-stat__label { color: #a1a1aa; }

/* Approval cards */
.approval-card {
  display: flex; align-items: center; gap: 16px; padding: 16px;
  border-radius: 16px; background: white; border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.dark .approval-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.approval-card:hover { border-color: rgba(37,99,235,0.15); box-shadow: 0 8px 24px rgba(0,0,0,0.04); }
.dark .approval-card:hover { border-color: rgba(37,99,235,0.2); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
.approval-card__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.approval-card__body { flex: 1; min-width: 0; }
.approval-card__amount { text-align: right; flex-shrink: 0; }
.approval-card__actions { display: flex; gap: 8px; flex-shrink: 0; }

@media (max-width: 768px) {
  .approval-card { flex-wrap: wrap; }
  .approval-card__body { width: 100%; }
  .approval-card__amount { width: 100%; text-align: left; }
  .approval-card__actions { width: 100%; }
}
</style>
