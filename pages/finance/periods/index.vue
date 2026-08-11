<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">FINANCE / PERIODS</div>
        <h1 class="page-title">Moliya davrlari</h1>
        <p class="page-sub">Hisob-kitob davrlarini boshqaring — oylik daromad va qarz dinamikasi</p>
      </div>
      <button class="btn btn-primary btn-sm btn-glow"><Plus :size="16" /> Yangi davr</button>
    </div>

    <!-- KPI cards with mini visuals -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="period-kpi period-kpi--teal">
        <div class="period-kpi__icon"><Layers :size="18" /></div>
        <div class="period-kpi__body">
          <div class="period-kpi__val">{{ periods.length }}</div>
          <div class="period-kpi__label">Jami davrlar</div>
        </div>
      </div>
      <div class="period-kpi period-kpi--green">
        <div class="period-kpi__icon"><CheckCircle2 :size="18" /></div>
        <div class="period-kpi__body">
          <div class="period-kpi__val">{{ closedCount }}</div>
          <div class="period-kpi__label">Yopilgan</div>
        </div>
      </div>
      <div class="period-kpi period-kpi--red">
        <div class="period-kpi__icon"><AlertCircle :size="18" /></div>
        <div class="period-kpi__body">
          <div class="period-kpi__val">{{ openCount }}</div>
          <div class="period-kpi__label">Faol davr</div>
        </div>
      </div>
      <div class="period-kpi period-kpi--amber">
        <div class="period-kpi__icon"><DollarSign :size="18" /></div>
        <div class="period-kpi__body">
          <div class="period-kpi__val">{{ formatUZSShort(totalRevenue) }}</div>
          <div class="period-kpi__label">Jami daromad</div>
        </div>
      </div>
    </div>

    <!-- Revenue + Debt chart -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-semibold text-ink-900 dark:text-white">Daromad va qarz dinamikasi</h3>
          <p class="text-xs text-ink-400 mt-0.5">So'nggi 8 oy</p>
        </div>
        <div class="flex items-center gap-3 text-xs text-ink-500">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-brand-500"></span> Daromad</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-red-400"></span> Qarz</span>
        </div>
      </div>
      <MakonChart type="bar" :series="chartSeries" :categories="chartMonths" :height="240" :colors="['var(--accent)', '#ef4444']" :stacked="true" />
    </div>

    <!-- Periods grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="p in periods" :key="p.id" class="period-card" :class="{ 'period-card--open': p.status === 'OPEN' }" @click="navigateTo('/finance/invoices')">
        <div class="period-card__head">
          <div>
            <div class="period-card__month">{{ p.label }}</div>
            <div class="period-card__year">{{ p.year }}</div>
          </div>
          <span class="badge badge-sm" :class="p.status === 'CLOSED' ? 'badge-success' : 'badge-warning'">
            {{ p.status === 'CLOSED' ? 'Yopilgan' : 'Faol' }}
          </span>
        </div>
        <div class="period-card__revenue">
          <div class="period-card__rev-label">Daromad</div>
          <div class="period-card__rev-value">{{ formatUZSShort(p.revenue) }}</div>
        </div>
        <div class="period-card__stats">
          <div class="period-card__stat">
            <FileText :size="14" class="period-card__stat-icon" />
            <span>{{ p.invoiceCount }} invoys</span>
          </div>
          <div class="period-card__stat">
            <CheckCircle2 :size="14" class="period-card__stat-icon text-emerald-500" />
            <span>{{ formatUZSShort(p.collected) }}</span>
          </div>
          <div class="period-card__stat">
            <AlertCircle :size="14" class="period-card__stat-icon text-red-500" />
            <span>{{ formatUZSShort(p.debt) }}</span>
          </div>
        </div>
        <div class="period-card__progress">
          <div class="period-card__progress-bar">
            <div class="period-card__progress-fill" :style="{ width: p.collectedPct + '%' }"></div>
          </div>
          <span class="period-card__progress-pct">{{ p.collectedPct }}% to'langan</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Layers, CheckCircle2, AlertCircle, DollarSign, FileText } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const periods = ref([
  { id: 'p1', label: 'Avgust', year: 2026, status: 'OPEN', revenue: 42000000, collected: 31500000, debt: 10500000, invoiceCount: 48, collectedPct: 75 },
  { id: 'p2', label: 'Iyul', year: 2026, status: 'CLOSED', revenue: 38500000, collected: 36200000, debt: 2300000, invoiceCount: 45, collectedPct: 94 },
  { id: 'p3', label: 'Iyun', year: 2026, status: 'CLOSED', revenue: 41000000, collected: 39500000, debt: 1500000, invoiceCount: 47, collectedPct: 96 },
  { id: 'p4', label: 'May', year: 2026, status: 'CLOSED', revenue: 37000000, collected: 36800000, debt: 200000, invoiceCount: 43, collectedPct: 99 },
  { id: 'p5', label: 'Aprel', year: 2026, status: 'CLOSED', revenue: 35000000, collected: 35000000, debt: 0, invoiceCount: 41, collectedPct: 100 },
  { id: 'p6', label: 'Mart', year: 2026, status: 'CLOSED', revenue: 34000000, collected: 33500000, debt: 500000, invoiceCount: 40, collectedPct: 98 },
])

const closedCount = computed(() => periods.value.filter(p => p.status === 'CLOSED').length)
const openCount = computed(() => periods.value.filter(p => p.status === 'OPEN').length)
const totalRevenue = computed(() => periods.value.reduce((s, p) => s + p.revenue, 0))

const chartMonths = ['Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sent', 'Okt']
const chartSeries = [
  { name: 'Daromad', data: [34000000, 35000000, 37000000, 41000000, 38500000, 42000000, 0, 0] },
  { name: 'Qarz', data: [500000, 0, 200000, 1500000, 2300000, 10500000, 0, 0] },
]

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

.period-kpi { position: relative; overflow: hidden;
  display: flex; align-items: center; gap: 12px; padding: 16px;
  border-radius: 16px; background: white; border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s;
}
.dark .period-kpi { position: relative; overflow: hidden; background: #18181b; border-color: rgba(255,255,255,0.06); }
.period-kpi__icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.period-kpi--teal .period-kpi__icon { background: rgba(37,99,235,0.1); color: var(--accent); }
.period-kpi--green .period-kpi__icon { background: rgba(16,185,129,0.1); color: #10b981; }
.period-kpi--red .period-kpi__icon { background: rgba(239,68,68,0.1); color: #ef4444; }
.period-kpi--amber .period-kpi__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.period-kpi__val { font-size: 20px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; line-height: 1; }
.dark .period-kpi__val { color: white; }
.period-kpi__label { font-size: 11px; color: #71717a; font-weight: 500; margin-top: 2px; }
.dark .period-kpi__label { color: #a1a1aa; }

.period-card {
  border-radius: 18px; padding: 20px; background: white; border: 1px solid rgba(0,0,0,0.05);
  cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}
.dark .period-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.period-card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); border-color: rgba(37,99,235,0.15); }
.dark .period-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
.period-card--open { border-left: 3px solid #f59e0b; }
.period-card__head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
.period-card__month { font-size: 18px; font-weight: 700; color: #18181b; }
.dark .period-card__month { color: white; }
.period-card__year { font-size: 13px; color: #a1a1aa; }
.period-card__revenue { margin-bottom: 16px; }
.period-card__rev-label { font-size: 11px; color: #71717a; font-weight: 500; }
.dark .period-card__rev-label { color: #a1a1aa; }
.period-card__rev-value { font-size: 24px; font-weight: 800; color: var(--accent); letter-spacing: -0.02em; }
.period-card__stats { display: flex; gap: 16px; margin-bottom: 16px; }
.period-card__stat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #71717a; }
.dark .period-card__stat { color: #a1a1aa; }
.period-card__stat-icon { color: var(--text-muted); }
.period-card__progress { display: flex; align-items: center; gap: 8px; }
.period-card__progress-bar { flex: 1; height: 5px; border-radius: 3px; background: rgba(0,0,0,0.05); overflow: hidden; }
.dark .period-card__progress-bar { background: rgba(255,255,255,0.05); }
.period-card__progress-fill { height: 100%; border-radius: 3px; background: var(--accent); transition: width 0.6s; }
.period-card__progress-pct { font-size: 11px; color: #a1a1aa; font-weight: 500; white-space: nowrap; }
</style>
