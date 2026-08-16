<template>
  <div class="space-y-5 animate-fade-up">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Invoyslar</div>
      <h1 class="page-title">Invoyslar</h1>
        <p class="page-sub">Shartnoma bo'yicha to'lov hujjatlari</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="exportCSV" class="btn btn-secondary btn-sm">
          <Download :size="14" /> Eksport
        </button>
        <button @click="showFilter = !showFilter" class="btn btn-ghost btn-sm">
          <Filter :size="14" /> Filtr
        </button>
      </div>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger stagger">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ invoices.length }}</div>
          <div class="dash-kpi__label">Jami invoyslar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value text-emerald-500">{{ paidCount }}</div>
          <div class="dash-kpi__label">To'langan</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value text-blue-500">{{ pendingCount }}</div>
          <div class="dash-kpi__label">Kutilmoqda</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value text-red-500">{{ overdueCount }}</div>
          <div class="dash-kpi__label">Muddati o'tgan</div>
        </div>
      </div>
    </div>

    <!-- Status tabs -->
    <div class="flex gap-1 overflow-x-auto pb-1">
      <button v-for="tab in statusTabs" :key="tab.id" @click="activeStatus = tab.id"
        class="px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap"
        :class="activeStatus === tab.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-black/5  text-ink-500 hover:bg-black/10 '">
        {{ tab.label }}
        <span class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" :class="activeStatus === tab.id ? 'bg-white/20' : 'bg-black/10 '">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Search bar -->
    <div class="flex gap-3 flex-wrap">
      <div class="relative flex-1 min-w-[240px]">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Shartnoma, ijarachi yoki davr bo'yicha qidiruv..." class="input pl-9 w-full" />
      </div>
      <select v-model="buildingFilter" class="input max-w-[200px]">
        <option value="">Bino: Barchasi</option>
        <option v-for="b in buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
      </select>
    </div>

    <!-- Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-ink-100  bg-black/5 ">
              <th class="text-left text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">#</th>
              <th class="text-left text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Shartnoma</th>
              <th class="text-left text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Ijarachi</th>
              <th class="text-left text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Davr</th>
              <th class="text-right text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Summa</th>
              <th class="text-center text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Status</th>
              <th class="text-center text-xs font-bold text-ink-500 uppercase tracking-wider px-4 py-3">Amal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(inv, i) in filteredInvoices" :key="inv.id" class="border-b border-ink-50  hover:bg-brand-500/5 transition-colors cursor-pointer" @click="selectedInvoice = inv">
              <td class="px-4 py-3 text-sm text-ink-400 font-mono">{{ String(i + 1).padStart(3, '0') }}</td>
              <td class="px-4 py-3 text-sm font-medium text-ink-900 ">{{ inv.contractNumber }}</td>
              <td class="px-4 py-3 text-sm text-ink-600 ">{{ inv.tenantName }}</td>
              <td class="px-4 py-3 text-sm text-ink-500">{{ inv.date }}</td>
              <td class="px-4 py-3 text-right text-sm font-bold text-ink-900 ">{{ inv.amount.toLocaleString('ru-RU') }} {{ inv.currency }}</td>
              <td class="px-4 py-3 text-center">
                <span class="text-xs px-2.5 py-1 rounded-full font-medium" :class="statusClass(inv.status)">
                  <span class="inline-block w-1.5 h-1.5 rounded-full mr-1" :class="statusDot(inv.status)"></span>
                  {{ statusLabel(inv.status) }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
                  <button @click.stop="selectedInvoice = inv" class="p-1.5 rounded-lg hover:bg-brand-500/10 text-brand-500" title="Ko'rish">
                    <Eye :size="14" />
                  </button>
                  <button v-if="inv.status === 'PENDING'" @click.stop="markPaid(inv)" class="p-1.5 rounded-lg hover:bg-emerald-500/10 text-emerald-500" title="To'langan deb belgilash">
                    <CheckCircle :size="14" />
                  </button>
                  <button @click.stop="downloadInvoice(inv)" class="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-500" title="Yuklab olish">
                    <Download :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredInvoices.length === 0" class="p-12 text-center">
        <div class="w-16 h-16 rounded-full bg-black/5  flex items-center justify-center mx-auto mb-3">
          <FileText :size="28" class="text-ink-400" />
        </div>
        <p class="text-ink-500 text-sm">Invoyslar topilmadi</p>
        <p class="text-ink-400 text-xs mt-1">Filtrlarni o'zgartiring yoki yangi invoys yarating</p>
      </div>

      <!-- Summary footer -->
      <div v-if="filteredInvoices.length > 0" class="px-4 py-3 bg-black/5  flex items-center justify-between text-sm">
        <div class="text-ink-500">Jami: <b class="text-ink-900 ">{{ filteredInvoices.length }}</b> ta invoys</div>
        <div class="flex items-center gap-4">
          <div class="text-ink-500">Jami summa: <b class="text-ink-900 ">{{ totalAmount.toLocaleString('ru-RU') }} {{ filteredInvoices[0]?.currency || 'USD' }}</b></div>
          <div class="text-emerald-500">To'langan: <b>{{ totalPaid.toLocaleString('ru-RU') }}</b></div>
        </div>
      </div>
    </div>

    <!-- Invoice detail modal -->
    <Teleport to="body">
      <div v-if="selectedInvoice" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="selectedInvoice = null">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div class="relative card p-6 w-full max-w-lg space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-ink-900 ">Invoys tafsilotlari</h3>
            <button @click="selectedInvoice = null" class="p-1.5 rounded-lg hover:bg-black/5 ">
              <X :size="18" class="text-ink-500" />
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><div class="text-xs text-ink-500 mb-1">Shartnoma</div><div class="font-medium text-ink-900 ">{{ selectedInvoice.contractNumber }}</div></div>
            <div><div class="text-xs text-ink-500 mb-1">Ijarachi</div><div class="font-medium text-ink-900 ">{{ selectedInvoice.tenantName }}</div></div>
            <div><div class="text-xs text-ink-500 mb-1">Davr</div><div class="font-medium text-ink-900 ">{{ selectedInvoice.date }}</div></div>
            <div><div class="text-xs text-ink-500 mb-1">Status</div><span class="text-xs px-2.5 py-1 rounded-full font-medium" :class="statusClass(selectedInvoice.status)">{{ statusLabel(selectedInvoice.status) }}</span></div>
            <div class="col-span-2 pt-3 border-t border-black/5 "><div class="text-xs text-ink-500 mb-1">Summa</div><div class="page-title">{{ selectedInvoice.amount.toLocaleString('ru-RU') }} {{ selectedInvoice.currency }}</div></div>
          </div>
          <div class="flex gap-2 pt-2">
            <button v-if="selectedInvoice.status === 'PENDING'" @click="markPaid(selectedInvoice); selectedInvoice = null" class="btn btn-success btn-sm flex-1">
              <CheckCircle :size="14" /> To'langan deb belgilash
            </button>
            <button @click="downloadInvoice(selectedInvoice)" class="btn btn-secondary btn-sm flex-1">
              <Download :size="14" /> Yuklab olish
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Search, Filter, Download, Eye, CheckCircle, FileText, X , AlertCircle, FileSignature} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const store = useMakonStore()

interface Invoice {
  id: string
  contractNumber: string
  tenantName: string
  date: string
  amount: number
  currency: string
  status: 'PAID' | 'PENDING' | 'OVERDUE'
  buildingId?: string
}

const search = ref('')
const buildingFilter = ref('')
const activeStatus = ref('ALL')
const selectedInvoice = ref<Invoice | null>(null)
const showFilter = ref(false)

const buildings = computed(() => store.buildings)

const invoices = computed<Invoice[]>(() => {
  const result: Invoice[] = []
  for (const c of store.contracts) {
    for (const s of c.schedule) {
      result.push({
        id: `${c.id}-${s.date}`,
        contractNumber: c.number,
        tenantName: c.tenantName,
        date: s.date,
        amount: s.amount,
        currency: c.currency,
        status: s.status as 'PAID' | 'PENDING' | 'OVERDUE',
        buildingId: c.buildingId,
      })
    }
  }
  return result
})

const filteredInvoices = computed(() => {
  let result = invoices.value
  if (activeStatus.value !== 'ALL') result = result.filter(i => i.status === activeStatus.value)
  if (buildingFilter.value) result = result.filter(i => i.buildingId === buildingFilter.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i =>
      i.contractNumber.toLowerCase().includes(q) ||
      i.tenantName.toLowerCase().includes(q) ||
      i.date.includes(q)
    )
  }
  return result
})

const paidCount = computed(() => invoices.value.filter(i => i.status === 'PAID').length)
const pendingCount = computed(() => invoices.value.filter(i => i.status === 'PENDING').length)
const overdueCount = computed(() => invoices.value.filter(i => i.status === 'OVERDUE').length)

const statusTabs = computed(() => [
  { id: 'ALL', label: 'Barchasi', count: invoices.value.length },
  { id: 'PAID', label: 'To\'langan', count: paidCount.value },
  { id: 'PENDING', label: 'Kutilmoqda', count: pendingCount.value },
  { id: 'OVERDUE', label: 'Muddati o\'tgan', count: overdueCount.value },
])

const totalAmount = computed(() => filteredInvoices.value.reduce((s, i) => s + i.amount, 0))
const totalPaid = computed(() => filteredInvoices.value.filter(i => i.status === 'PAID').reduce((s, i) => s + i.amount, 0))

function statusLabel(s: string) { return { PAID: 'To\'langan', PENDING: 'Kutilmoqda', OVERDUE: 'Muddati o\'tgan' }[s] || s }
function statusClass(s: string) { return { PAID: 'bg-emerald-500/10 text-emerald-500', PENDING: 'bg-blue-500/10 text-blue-500', OVERDUE: 'bg-red-500/10 text-red-500' }[s] || '' }
function statusDot(s: string) { return { PAID: 'bg-emerald-500', PENDING: 'bg-blue-500', OVERDUE: 'bg-red-500' }[s] || 'bg-ink-400' }

function markPaid(inv: Invoice) {
  const c = store.contracts.find(c => c.id === inv.id.split('-').slice(0, -1).join('-') || inv.id.split('-')[0])
  if (c) {
    const s = c.schedule.find(sch => sch.date === inv.date)
    if (s) s.status = 'PAID'
  }
}

function exportCSV() {
  const headers = ['Shartnoma', 'Ijarachi', 'Davr', 'Summa', 'Valyuta', 'Status']
  const rows = filteredInvoices.value.map(i => [i.contractNumber, i.tenantName, i.date, i.amount, i.currency, statusLabel(i.status)])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'invoyslar.csv'; a.click()
}

function downloadInvoice(inv: Invoice) {
  // Generate a simple invoice text
  const text = `INVOYS\n\nShartnoma: ${inv.contractNumber}\nIjarachi: ${inv.tenantName}\nDavr: ${inv.date}\nSumma: ${inv.amount.toLocaleString('ru-RU')} ${inv.currency}\nStatus: ${statusLabel(inv.status)}\n\nMAKON Real Estate Management`
  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `invoice-${inv.contractNumber}-${inv.date}.txt`; a.click()
}
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px; border-radius: 16px;
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
.btn-success { background: #10b981; color: white; }
.btn-success:hover { background: #059669; }
</style>
