<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Mening kabinetim</h1>
        <p class="text-ink-500 text-sm mt-0.5">Xush kelibsiz, {{ authStore.user?.fullName }}</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="$router.push('/service')">
        <Wrench :size="16" />
        Servis so'rovi
      </button>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-5">
        <div class="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-3">
          <FileText :size="20" class="text-brand-600" />
        </div>
        <p class="text-2xl font-bold font-display">3</p>
        <p class="text-sm text-ink-400">Aktiv shartnomalar</p>
      </div>
      <div class="card p-5">
        <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
          <Receipt :size="20" class="text-amber-600" />
        </div>
        <p class="text-2xl font-bold font-display">1</p>
        <p class="text-sm text-ink-400">To'lanmagan invoys</p>
      </div>
      <div class="card p-5">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-3">
          <Wrench :size="20" class="text-emerald-600" />
        </div>
        <p class="text-2xl font-bold font-display">0</p>
        <p class="text-sm text-ink-400">Aktiv servis so'rov</p>
      </div>
      <div class="card p-5">
        <div class="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center mb-3">
          <Wallet :size="20" class="text-sky-600" />
        </div>
        <p class="text-2xl font-bold font-display">12M</p>
        <p class="text-sm text-ink-400">Keyingi to'lov</p>
      </div>
    </div>

    <!-- Contracts + Invoices -->
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
            <span class="badge" :class="c.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'">
              {{ c.status === 'ACTIVE' ? 'Aktiv' : c.status === 'PENDING_SIGN' ? "Imzolanmagan" : c.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">To'lovlar tarixi</h3>
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
              <p class="font-semibold text-ink-900">{{ formatPrice(inv.amount) }}</p>
              <span class="badge" :class="inv.status === 'PAID' ? 'badge-success' : inv.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'">
                {{ inv.status === 'PAID' ? 'To\'landi' : inv.status === 'OVERDUE' ? 'Muddati o\'tdi' : 'Kutilmoqda' }}
              </span>
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

const tenantContracts = computed(() => financeStore.contracts.filter(c => c.status === 'ACTIVE' || c.status === 'PENDING_SIGN').slice(0, 3))
const tenantInvoices = computed(() => financeStore.invoices.slice(0, 4))

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(0) + ' mln so\'m'
  return v.toLocaleString('ru') + ' so\'m'
}
</script>
