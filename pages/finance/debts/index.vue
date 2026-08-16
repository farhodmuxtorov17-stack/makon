<template>
  <div class="space-y-5 animate-fade-up">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Qarzlar</div>
        <h1 class="page-title">Qarzdorlik boshqaruvi</h1>
        <p class="page-sub">To'lanmagan invoyslar bo'yicha qoldiqlar va muddati o'tgan to'lovlarni boshqaring</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> Eksport</button>
        <button class="btn btn-primary btn-sm btn-glow"><Bell :size="14" /> Ogohlantirish yuborish</button>
      </div>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Total debt -->
      <div class="debt-card debt-card--red">
        <div class="debt-card__top">
          <div class="debt-card__icon"><CreditCard :size="36" :stroke-width="1.5" class="text-slate-600 " /></div>
          <div class="debt-card__label">Jami qarzdorlik</div>
        </div>
        <div class="debt-card__value">{{ formatUZSShort(totalDebt) }}</div>
        <div class="debt-card__meta">
          <div class="debt-card__bar">
            <div class="debt-card__bar-fill" style="width: 100%; background: #ef4444;"></div>
          </div>
          <span class="debt-card__count">{{ debtors.length }} ta ijarachi</span>
        </div>
      </div>

      <!-- Overdue -->
      <div class="debt-card debt-card--amber">
        <div class="debt-card__top">
          <div class="debt-card__icon"><AlertCircle :size="36" :stroke-width="1.5" class="text-slate-600 " /></div>
          <div class="debt-card__label">Muddati o'tgan</div>
        </div>
        <div class="debt-card__value">{{ formatUZSShort(overdueDebt) }}</div>
        <div class="debt-card__meta">
          <div class="debt-card__bar">
            <div class="debt-card__bar-fill" :style="{ width: overduePct + '%', background: '#f59e0b' }"></div>
          </div>
          <span class="debt-card__count">{{ overdueCount }} ta invoys</span>
        </div>
      </div>

      <!-- Debtors -->
      <div class="debt-card debt-card--teal">
        <div class="debt-card__top">
          <div class="debt-card__icon"><Home :size="36" :stroke-width="1.5" class="text-slate-600 " /></div>
          <div class="debt-card__label">Qarzdorlar soni</div>
        </div>
        <div class="debt-card__value">{{ debtors.length }}</div>
        <div class="debt-card__meta">
          <div class="debt-card__bar">
            <div class="debt-card__bar-fill" :style="{ width: (debtors.length / 10 * 100) + '%', background: 'var(--accent)' }"></div>
          </div>
          <span class="debt-card__count">Faol ijarachilardan</span>
        </div>
      </div>
    </div>

    <!-- Debt aging chart -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 ">Qarzning muddat bo'yicha taqsimoti</h3>
        <div class="flex items-center gap-3 text-xs text-ink-500">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> 30 kungacha</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-amber-500"></span> 30-60 kun</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-orange-500"></span> 60-90 kun</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-sm bg-red-500"></span> 90+ kun</span>
        </div>
      </div>
      <MakonChart type="bar" :series="agingSeries" :categories="agingCategories" :height="200" :colors="['#10b981', '#f59e0b', '#f97316', '#ef4444']" :stacked="true" />
    </div>

    <!-- Debtors table -->
    <div class="card overflow-hidden">
      <div class="flex items-center justify-between p-4 border-b border-black/5 ">
        <h3 class="font-semibold text-ink-900 ">Qarzdorlar ro'yxati</h3>
        <div class="flex items-center gap-2">
          <div class="relative">
            <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
            <input v-model="search" placeholder="Ijarachi qidirish..." class="input-sm pl-9" />
          </div>
          <select v-model="filterStatus" class="input-sm">
            <option value="ALL">Barchasi</option>
            <option value="OVERDUE">Muddati o'tgan</option>
            <option value="PENDING">Kutilmoqda</option>
          </select>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 uppercase tracking-widest border-b border-black/5 ">
              <th class="px-4 py-3">Ijarachi</th>
              <th class="px-4 py-3 hidden md:table-cell">Invoys</th>
              <th class="px-4 py-3 text-right">Summa</th>
              <th class="px-4 py-3 text-right">Qoldiq</th>
              <th class="px-4 py-3 text-center hidden lg:table-cell">Progress</th>
              <th class="px-4 py-3 text-center hidden md:table-cell">Muddat</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in filteredDebtors" :key="inv.id" class="border-b border-black/5  hover:bg-black/[0.02] [0.02] transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold" :class="inv.color">{{ inv.initials }}</div>
                  <div>
                    <div class="font-medium text-ink-900 ">{{ inv.tenantName }}</div>
                    <div class="text-xs text-ink-400">{{ inv.contract }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 hidden md:table-cell font-mono text-xs text-ink-500">{{ inv.number }}</td>
              <td class="px-4 py-3 text-right font-medium">{{ formatUZS(inv.amount) }}</td>
              <td class="px-4 py-3 text-right">
                <span class="font-bold" :class="inv.balance > 0 ? 'text-red-500' : 'text-emerald-500'">{{ formatUZS(inv.balance) }}</span>
              </td>
              <td class="px-4 py-3 hidden lg:table-cell">
                <div class="flex items-center gap-2">
                  <div class="flex-1 h-1.5 rounded-full bg-black/5  max-w-[80px]">
                    <div class="h-full rounded-full transition-all" :style="{ width: (inv.paidPct) + '%', background: inv.paidPct >= 80 ? '#10b981' : inv.paidPct >= 50 ? '#f59e0b' : '#ef4444' }"></div>
                  </div>
                  <span class="text-xs text-ink-400 w-8">{{ inv.paidPct }}%</span>
                </div>
              </td>
              <td class="px-4 py-3 hidden md:table-cell text-center text-xs" :class="isOverdue(inv.dueDate) ? 'text-red-500 font-medium' : 'text-ink-400'">
                {{ formatDate(inv.dueDate) }}
                <div v-if="isOverdue(inv.dueDate)" class="text-[10px] text-red-400">{{ overdueDays(inv.dueDate) }} kun o'tdi</div>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="badge badge-sm" :class="isOverdue(inv.dueDate) ? 'badge-danger' : 'badge-warning'">
                  {{ isOverdue(inv.dueDate) ? 'Muddati o\'tgan' : 'Kutilmoqda' }}
                </span>
              </td>
              <td class="px-4 py-3 text-right">
                <div class="flex justify-end gap-1">
                  <button class="btn btn-ghost btn-xs" title="Ogohlantirish"><Bell :size="13" /></button>
                  <button class="btn btn-ghost btn-xs" title="Ko'rish"><Eye :size="13" /></button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredDebtors.length === 0">
              <td colspan="8" class="px-4 py-12 text-center text-ink-500">Qarzdorlar topilmadi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, Clock, Users, Search, Download, Bell, Eye , CreditCard, Home} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const search = ref('')
const filterStatus = ref('ALL')

const store = useMakonStore()

const COLOR_MAP: Record<string, string> = {
  OVERDUE: 'bg-red-500/10 text-red-500',
  PARTIAL: 'bg-amber-500/10 text-amber-500',
  PENDING: 'bg-teal-500/10 text-teal-500',
  PAID: 'bg-green-500/10 text-green-500',
}

const debtors = computed(() => store.invoices
  .filter(inv => inv.balance > 0)
  .map(inv => ({
    id: inv.id,
    tenantName: inv.tenantName,
    contract: inv.contractNumber,
    number: inv.number,
    amount: inv.amount,
    balance: inv.balance,
    dueDate: inv.dueDate,
    paidPct: inv.amount > 0 ? Math.round((inv.paidAmount / inv.amount) * 100) : 0,
    color: COLOR_MAP[inv.status] || 'bg-gray-500/10 text-gray-500',
    initials: inv.tenantName.split(' ').slice(0, 2).map(w => w[0]).join(''),
  }))
)

const filteredDebtors = computed(() => {
  let result = debtors.value
  if (search.value) result = result.filter(d => d.tenantName.toLowerCase().includes(search.value.toLowerCase()))
  if (filterStatus.value === 'OVERDUE') result = result.filter(d => isOverdue(d.dueDate))
  if (filterStatus.value === 'PENDING') result = result.filter(d => !isOverdue(d.dueDate))
  return result
})

const totalDebt = computed(() => debtors.value.reduce((s, d) => s + d.balance, 0))
const overdueDebt = computed(() => debtors.value.filter(d => isOverdue(d.dueDate)).reduce((s, d) => s + d.balance, 0))
const overdueCount = computed(() => debtors.value.filter(d => isOverdue(d.dueDate)).length)
const overduePct = computed(() => totalDebt.value > 0 ? Math.round((overdueDebt.value / totalDebt.value) * 100) : 0)

const agingCategories = ['Orient Logistika', 'Ipak Yuli Savdo', 'Alfa Biznes', 'Markaz Savdo', 'Chorsu Retail', 'Zomin Invest']
const agingSeries = [
  { name: '30 kungacha', data: [0, 0, 0, 0, 5500000, 0] },
  { name: '30-60 kun', data: [0, 0, 4800000, 0, 0, 980000] },
  { name: '60-90 kun', data: [0, 3100000, 0, 1800000, 0, 0] },
  { name: '90+ kun', data: [8500000, 0, 0, 0, 0, 0] },
]

function isOverdue(date: string) {
  return new Date(date) < new Date('2026-08-01')
}
function overdueDays(date: string) {
  return Math.floor((new Date('2026-08-01').getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
}
function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' })
}
function formatUZS(n: number) {
  return n.toLocaleString('ru-RU') + ' UZS'
}
function formatUZSShort(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' mlrd UZS'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' mln UZS'
  return n.toLocaleString('ru-RU') + ' UZS'
}
</script>

<style scoped>
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px; }
.page-title { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0; }
.dark .page-title { color: white; }

.debt-card {
  border-radius: 18px; padding: 20px; border: 1px solid var(--border);
  background: var(--bg-card); transition: all 0.3s;
}
.dark .debt-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.debt-card--red { border-left: 3px solid #ef4444; }
.debt-card--amber { border-left: 3px solid #f59e0b; }
.debt-card--teal { border-left: 3px solid var(--accent); }
.debt-card__top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.debt-card__icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.debt-card--red .debt-card__icon { background: rgba(239,68,68,0.1); color: #ef4444; }
.debt-card--amber .debt-card__icon { background: rgba(245,158,11,0.1); color: #f59e0b; }
.debt-card--teal .debt-card__icon { background: rgba(37,99,235,0.1); color: var(--accent); }
.debt-card__label { font-size: 13px; color: #71717a; font-weight: 500; }
.dark .debt-card__label { color: #a1a1aa; }
.debt-card__value { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin-bottom: 14px; }
.dark .debt-card__value { color: white; }
.debt-card__meta { display: flex; align-items: center; gap: 10px; }
.debt-card__bar { flex: 1; height: 4px; border-radius: 2px; background: rgba(0,0,0,0.05); overflow: hidden; }
.dark .debt-card__bar { background: rgba(255,255,255,0.05); }
.debt-card__bar-fill { height: 100%; border-radius: 2px; transition: width 0.6s; }
.debt-card__count { font-size: 11px; color: #a1a1aa; font-weight: 500; white-space: nowrap; }
</style>
