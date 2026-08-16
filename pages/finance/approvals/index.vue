<template>
  <div class="space-y-5">
    <!-- Header -->
    <div>
      <div class="eyebrow">Tasdiqlar</div>
      <h1 class="page-title">Tasdiqlash jarayoni</h1>
    </div>

    <!-- Approval flow visualization -->
    <div class="card-premium p-6">
      <h3 class="font-semibold text-ink-900  mb-5">Tasdiqlash bosqichlari</h3>
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

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ pendingCount }}</div>
          <div class="dash-kpi__label">Kutilmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ approvedCount }}</div>
          <div class="dash-kpi__label">Tasdiqlangan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CreditCard :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ rejectedCount }}</div>
          <div class="dash-kpi__label">Rad etilgan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><DollarSign :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ formatUZSShort(pendingAmount) }}</div>
          <div class="dash-kpi__label">Kutilayotgan summa</div>
        </div>
      </div>
    </div>

    <!-- Pending approvals -->
    <div>
      <h3 class="font-semibold mb-3 text-ink-900 ">Tasdiqlash kutilmoqda</h3>
      <div class="space-y-3">
        <div v-for="a in pendingApprovals" :key="a.id" class="approval-card">
          <div class="approval-card__icon" :class="stepBg(a.currentStep)">
            <component :is="stepIcon(a.currentStep)" :size="18" :class="stepColor(a.currentStep)" />
          </div>
          <div class="approval-card__body">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="font-semibold text-ink-900 ">{{ a.title }}</span>
              <span class="badge badge-sm" :class="stepBadge(a.currentStep)">{{ stepLabel(a.currentStep) }}</span>
            </div>
            <div class="text-xs text-ink-500 mt-1">{{ a.submitter }} · {{ a.date }} · {{ a.contract }}</div>
          </div>
          <div class="approval-card__amount">
            <div class="font-bold text-ink-900 ">{{ formatUZS(a.amount) }}</div>
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
      <h3 class="font-semibold mb-3 text-ink-900 ">Tarix</h3>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 ">
                <th class="px-4 py-3">Hujjat</th>
                <th class="px-4 py-3 hidden md:table-cell">Yuboruvchi</th>
                <th class="px-4 py-3 text-right">Summa</th>
                <th class="px-4 py-3 text-center hidden md:table-cell">Sana</th>
                <th class="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in history" :key="h.id" class="border-b border-black/5 ">
                <td class="px-4 py-3 font-medium text-ink-900 ">{{ h.title }}</td>
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
import { FileText, CreditCard, Stamp, CheckCircle, Check, X, Clock, AlertCircle , DollarSign} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const approvalSteps = [
  { icon: FileText, label: 'Yaratildi', desc: 'Hujjat tayyorlandi' },
  { icon: CreditCard, label: 'Buxgalter', desc: 'Summa tekshirildi' },
  { icon: Stamp, label: 'Rahbar', desc: 'Yakuniy tasdiq' },
  { icon: CheckCircle, label: 'Yakunlandi', desc: 'Jarayon tugadi' },
]

const currentStepIndex = ref(1)

const store = useMakonStore()
const pendingApprovals = computed(() => store.pendingApprovals)

const history = computed(() => store.approvalHistory)

const pendingCount = computed(() => pendingApprovals.value.length)
const approvedCount = computed(() => history.value.filter(h => h.status === 'APPROVED').length)
const rejectedCount = computed(() => history.value.filter(h => h.status === 'REJECTED').length)
const pendingAmount = computed(() => pendingApprovals.value.reduce((s, a) => s + a.amount, 0))

function approve(a: any) { store.approveItem(a.id) }
function reject(a: any) { store.rejectItem(a.id) }

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
.flow__check { position: absolute; top: -4px; right: -4px; color: #10b981; background: var(--bg-card); border-radius: 50%; }
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
  border: 1px solid var(--border); background: var(--bg-card);
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
  border-radius: 16px; background: var(--bg-card); border: 1px solid var(--border);
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

.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid var(--border);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dash-kpi__body { flex: 1; min-width: 0; }
.dash-kpi__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.dash-kpi__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>
