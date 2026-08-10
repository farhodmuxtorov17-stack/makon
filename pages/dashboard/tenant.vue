<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Mening kabinetim</h1>
        <p class="text-ink-500 text-sm mt-0.5">{{ greeting }}, {{ authStore.user?.fullName?.split(' ')[0] }}</p>
      </div>
      <NuxtLink to="/service" class="btn btn-primary btn-sm"><Wrench :size="16" /> Servis so'rovi</NuxtLink>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="FileText" :value="String(tenantContracts.length)" label="Aktiv shartnomalar" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="Receipt" :value="String(unpaidInvoices.length)" label="To'lanmagan invoys" iconBg="bg-amber-50" iconColor="text-amber-600" />
      <StatCard icon="Wrench" :value="'0'" label="Aktiv servis" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="Wallet" :value="nextPayment" label="Keyingi to'lov" iconBg="bg-sky-50" iconColor="text-sky-600" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Mening shartnomalarim</h3>
          <NuxtLink to="/finance/contracts" class="text-sm text-brand-600 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-3">
          <div v-for="c in tenantContracts" :key="c.id" class="flex items-center gap-4 p-3 rounded-xl border border-ink-100 hover:border-ink-200 transition-colors">
            <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
              <FileText :size="18" class="text-brand-600" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-ink-900 truncate">{{ c.number }}</p>
              <p class="text-sm text-ink-400">{{ c.startDate }} — {{ c.endDate }}</p>
            </div>
            <StatusBadge :status="c.status" :variant="c.status === 'ACTIVE' ? 'success' : 'warning'"
              :label="c.status === 'ACTIVE' ? 'Aktiv' : 'Imzolanmagan'" dot />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">To'lovlar</h3>
          <NuxtLink to="/finance/payments" class="text-sm text-brand-600 font-medium">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-3">
          <div v-for="inv in tenantInvoices" :key="inv.id" class="flex items-center gap-4 p-3 rounded-xl border border-ink-100 hover:border-ink-200 transition-colors">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              :class="inv.status === 'PAID' ? 'bg-emerald-50' : inv.status === 'OVERDUE' ? 'bg-rose-50' : 'bg-amber-50'">
              <Receipt :size="18" :class="inv.status === 'PAID' ? 'text-emerald-600' : inv.status === 'OVERDUE' ? 'text-rose-600' : 'text-amber-600'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-ink-900 truncate">{{ inv.number }}</p>
              <p class="text-sm text-ink-400">Muddat: {{ inv.dueDate }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ formatPrice(inv.amount) }} so'm</p>
              <StatusBadge :status="inv.status" :variant="inv.status === 'PAID' ? 'success' : inv.status === 'OVERDUE' ? 'danger' : 'warning'"
                :label="inv.status === 'PAID' ? 'To\'landi' : inv.status === 'OVERDUE' ? 'Muddati o\'tdi' : 'Kutilmoqda'" dot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText, Receipt, Wallet, Wrench } from 'lucide-vue-next'

const authStore = useAuthStore()
const financeStore = useFinanceStore()

onMounted(() => financeStore.initMockData())

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Xayrli tong'
  if (h < 18) return 'Xayrli kun'
  return 'Xayrli kech'
})

const tenantContracts = computed(() => financeStore.contracts.filter(c => c.status === 'ACTIVE' || c.status === 'PENDING_SIGN').slice(0, 3))
const tenantInvoices = computed(() => financeStore.invoices.slice(0, 4))
const unpaidInvoices = computed(() => financeStore.invoices.filter(i => i.status === 'PENDING' || i.status === 'OVERDUE' || i.status === 'PARTIAL'))
const nextPayment = computed(() => {
  const pending = financeStore.invoices.find(i => i.status === 'PENDING')
  return pending ? formatPrice(pending.amount) + ' so\'m' : '—'
})

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln'
  return v.toLocaleString('ru')
}
</script>
