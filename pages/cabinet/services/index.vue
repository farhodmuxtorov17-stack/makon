<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Mening xizmatlarim</div>
      <h1 class="page-title">Hisob va servis</h1>
        <p class="page-sub">To'lovlar, invoyslar va servis so'rovlari</p>
      </div>
      <NuxtLink to="/cabinet/service-requests/new" class="btn btn-primary btn-sm btn-glow">
        <Plus :size="14" /> Servis so'rov
      </NuxtLink>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ formatUZSShort(0) }}</div>
          <div class="dash-kpi__label">Joriy balans</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ activeInvoices }}</div>
          <div class="dash-kpi__label">Aktiv invoys</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileText :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ openRequests }}</div>
          <div class="dash-kpi__label">Servis so'rov</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ unitCount }}</div>
          <div class="dash-kpi__label">Biriktirilgan unit</div>
        </div>
      </div>
    </div>

    <!-- Balance summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-5 bg-gradient-to-br from-emerald-500/5 to-transparent border-emerald-500/20">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Wallet :size="20" class="text-emerald-500" /></div>
          <span class="text-sm font-medium text-ink-700 ">Joriy balans</span>
        </div>
        <div class="text-2xl font-bold text-emerald-500">{{ formatUZS(0) }}</div>
        <div class="text-xs text-ink-500 mt-1">Qarzdorlik yo'q (unit A-301)</div>
      </div>
      <div class="card p-5 bg-gradient-to-br from-red-500/5 to-transparent border-red-500/20">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><AlertCircle :size="20" class="text-red-500" /></div>
          <span class="text-sm font-medium text-ink-700 ">Qarzdorlik</span>
        </div>
        <div class="text-2xl font-bold text-red-500">{{ formatUZS(4200000) }}</div>
        <div class="text-xs text-ink-500 mt-1">Unit B-205 · 5 kun kechikish</div>
      </div>
      <div class="card-premium p-5">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><Receipt :size="20" class="text-blue-500" /></div>
          <span class="text-sm font-medium text-ink-700 ">Keyingi to'lov</span>
        </div>
        <div class="page-title">15 Avg</div>
        <div class="text-xs text-ink-500 mt-1">25.0M UZS · INV-2026-052</div>
      </div>
    </div>

    <!-- Service charges breakdown -->
    <div class="card-premium p-5">
      <h3 class="font-semibold text-ink-900  mb-4">Servis to'lovlari tarkibi</h3>
      <div class="space-y-3">
        <div v-for="charge in serviceCharges" :key="charge.name" class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" :style="{ background: charge.color + '15' }">
            <component :is="charge.icon" :size="16" :style="{ color: charge.color }" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-ink-900 ">{{ charge.name }}</span>
              <span class="text-sm font-bold text-ink-900 ">{{ formatUZS(charge.amount) }}</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-ink-500">
              <span>{{ charge.details }}</span>
              <span>·</span>
              <span>{{ charge.unit }}</span>
            </div>
            <div class="h-1.5 rounded-full bg-black/5  mt-2 overflow-hidden">
              <div class="h-full rounded-full" :style="{ width: charge.percent + '%', background: charge.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent invoices -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 ">So'nggi invoyslar</h3>
        <NuxtLink to="/finance/invoices" class="text-xs text-brand-500">Barchasi →</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-ink-500 text-xs uppercase tracking-widest border-b border-black/5 ">
              <th class="text-left font-medium px-3 py-2">Raqam</th>
              <th class="text-left font-medium px-3 py-2 hidden sm:table-cell">Unit</th>
              <th class="text-left font-medium px-3 py-2 hidden md:table-cell">Davr</th>
              <th class="text-right font-medium px-3 py-3">Summa</th>
              <th class="text-center font-medium px-3 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inv in invoices" :key="inv.id" class="border-b border-black/5  hover:bg-black/5  transition-colors cursor-pointer" @click="navigateTo('/cabinet/services')">
              <td class="px-3 py-3 font-mono text-xs text-ink-700 ">{{ inv.number }}</td>
              <td class="px-3 py-3 hidden sm:table-cell text-ink-500">{{ inv.unit }}</td>
              <td class="px-3 py-3 hidden md:table-cell text-ink-500">{{ inv.period }}</td>
              <td class="px-3 py-3 text-right font-semibold text-ink-900 ">{{ formatUZS(inv.amount) }}</td>
              <td class="px-3 py-3 text-center">
                <span class="badge text-[10px]" :class="inv.status === 'PAID' ? 'badge-success' : inv.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'">
                  {{ inv.status === 'PAID' ? 'To\'langan' : inv.status === 'OVERDUE' ? 'Muddati o\'tgan' : 'Kutilmoqda' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Service requests -->
    <div class="card-premium p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-ink-900 ">Servis so'rovlari</h3>
        <NuxtLink to="/cabinet/service-requests/new" class="btn btn-secondary btn-sm text-xs"><Plus :size="12" /> Yangi</NuxtLink>
      </div>
      <div class="space-y-2">
        <div v-for="sr in serviceRequests" :key="sr.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5  transition-colors">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :class="sr.iconBg">
            <component :is="sr.icon" :size="16" :class="sr.iconColor" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 ">{{ sr.category }}</div>
            <div class="text-xs text-ink-500">{{ sr.unit }} · {{ sr.date }}</div>
          </div>
          <span class="badge text-[10px] flex-shrink-0" :class="srBadgeClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, CheckCircle, Droplet, FileSignature, FileText, Flame, Grid3x3, Plus, Receipt, Trash2, Wallet, Wrench, Zap } from 'lucide-vue-next'

definePageMeta({ roles: ['TENANT_OWNER'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const { formatUZS, formatUZSShort } = useFormat()

const iconMap: Record<string, any> = { Receipt, Zap, Droplet, Flame, Wrench, Trash2 }

const serviceCharges = computed(() =>
  makonStore.tenantServiceCharges.map(s => ({ ...s, icon: iconMap[s.iconName] || Receipt }))
)
const invoices = computed(() => makonStore.tenantInvoices)
const serviceRequests = computed(() => makonStore.tenantServiceRequests.slice(0, 2).map((s, i) => ({
  id: s.id,
  category: s.category,
  unit: 'A-301',
  date: s.date,
  status: s.status,
  icon: i === 0 ? Zap : Wrench,
  iconBg: i === 0 ? 'bg-amber-500/10' : 'bg-purple-500/10',
  iconColor: i === 0 ? 'text-amber-500' : 'text-purple-500',
})))

const totalCharge = computed(() => serviceCharges.value.reduce((s, c) => s + c.amount, 0))
const pendingInvoices = computed(() => invoices.value.filter(i => i.status === 'PENDING' || i.status === 'OVERDUE'))
const pendingAmount = computed(() => pendingInvoices.value.reduce((s, i) => s + i.amount, 0))

function srBadgeClass(s: string) {
  return { IN_PROGRESS: 'badge-warning', ASSIGNED: 'badge-brand', COMPLETED: 'badge-success' }[s] || 'badge-neutral'
}
function srStatusLabel(s: string) {
  return { IN_PROGRESS: 'Jarayonda', ASSIGNED: 'Tayinlandi', COMPLETED: 'Bajarildi', CANCELLED: 'Bekor qilindi', PENDING: 'Kutilmoqda' }[s] || s
}
const activeInvoices = computed(() => makonStore.invoices.filter((i: any) => i.status === "ISSUED" || i.status === "PARTIALLY_PAID").length)
const openRequests = computed(() => makonStore.serviceRequests.filter((r: any) => r.status !== "COMPLETED").length)
const unitCount = computed(() => 2)


</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
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
