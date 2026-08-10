<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Ishchi panel</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim holati va asosiy ko'rsatkichlar</p>
      </div>
      <div class="text-sm text-ink-500">{{ new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }}</div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <Building2 :size="20" class="text-brand-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.totalBuildings }}</div>
          <div class="text-xs text-ink-500">Jami binolar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp :size="20" class="text-emerald-400" />
            </div>
            <span class="text-xs font-medium text-emerald-400">{{ data.stats.occupancyRate }}%</span>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.occupiedUnits }}/{{ data.stats.totalUnits }}</div>
          <div class="text-xs text-ink-500">Band birliklar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <FileText :size="20" class="text-amber-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ data.stats.pendingApplications }}</div>
          <div class="text-xs text-ink-500">Kutilayotgan arizalar</div>
        </div>
        <div class="card p-5">
          <div class="flex items-center justify-between mb-2">
            <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Wallet :size="20" class="text-red-400" />
            </div>
          </div>
          <div class="text-2xl font-bold">{{ formatPrice(data.stats.outstandingDebt, 'UZS') }}</div>
          <div class="text-xs text-ink-500">Qarzdorlik</div>
        </div>
      </div>

      <!-- Secondary Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4 flex items-center gap-3">
          <Package :size="18" class="text-brand-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.vacantUnits }} birlik</div>
            <div class="text-xs text-ink-500">Bo'sh maydon</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <FileCheck2 :size="18" class="text-emerald-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.activeContracts }} faol</div>
            <div class="text-xs text-ink-500">Shartnomalar</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <Receipt :size="18" class="text-amber-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.unpaidInvoices }} ta</div>
            <div class="text-xs text-ink-500">To'lanmagan invoys</div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-3">
          <Wrench :size="18" class="text-red-400" />
          <div>
            <div class="text-sm font-semibold">{{ data.stats.openServiceRequests }} ta</div>
            <div class="text-xs text-ink-500">Faol xizmat so'rovi</div>
          </div>
        </div>
      </div>

      <!-- Buildings occupancy -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Binolar bo'yicha bandlik</h3>
        <div class="space-y-3">
          <div v-for="b in data.buildings" :key="b.id" class="flex items-center gap-4">
            <div class="w-40 flex-shrink-0">
              <div class="text-sm font-medium truncate">{{ b.name }}</div>
              <div class="text-xs text-ink-600">{{ b.address }}</div>
            </div>
            <div class="flex-1">
              <div class="h-6 rounded-lg bg-white/5 overflow-hidden flex">
                <div class="bg-gradient-to-r from-brand-500 to-brand-600 transition-all" :style="{ width: b.occupancyRate + '%' }"></div>
              </div>
            </div>
            <div class="w-16 text-right text-sm font-medium">{{ b.occupancyRate }}%</div>
            <div class="w-24 text-right text-xs text-ink-500">{{ b.occupiedUnits }}/{{ b.totalUnits }}</div>
          </div>
        </div>
      </div>

      <!-- Recent applications -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">So'nggi arizalar</h3>
          <NuxtLink to="/management/applications" class="btn btn-ghost btn-sm">Barchasi →</NuxtLink>
        </div>
        <div class="space-y-2">
          <div v-for="app in data.recentApplications" :key="app.id" class="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center text-xs font-bold text-brand-400">
                {{ app.applicantName.charAt(0) }}
              </div>
              <div>
                <div class="text-sm font-medium">{{ app.applicantName }}</div>
                <div class="text-xs text-ink-500">{{ app.number }} · {{ formatDate(app.createdDate) }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-sm text-ink-400">{{ formatPrice(app.offeredPrice, app.currency) }}</div>
              <span class="badge" :class="statusBadge(app.status)">{{ statusLabel(app.status) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Tezkor amallar</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <NuxtLink to="/management/buildings" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Building2 :size="24" class="text-brand-400" />
            <span class="text-xs text-ink-300">Binolar</span>
          </NuxtLink>
          <NuxtLink to="/management/applications" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <FileText :size="24" class="text-amber-400" />
            <span class="text-xs text-ink-300">Arizalar</span>
          </NuxtLink>
          <NuxtLink to="/finance/invoices" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Receipt :size="24" class="text-emerald-400" />
            <span class="text-xs text-ink-300">Invoyslar</span>
          </NuxtLink>
          <NuxtLink to="/facility/work-orders" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center">
            <Wrench :size="24" class="text-red-400" />
            <span class="text-xs text-ink-300">Topshiriqlar</span>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Building2, TrendingUp, FileText, Wallet, Package, FileCheck2, Receipt, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-dashboard', () => fetchAdminData('dashboard'))

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M so'm`
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    NEW: 'badge-neutral', PENDING: 'badge-warning', BUILDING_REVIEW: 'badge-warning',
    FINANCE_REVIEW: 'badge-brand', OFFER_SENT: 'badge-brand',
    ERI_PENDING: 'badge-warning', APPROVED: 'badge-success',
    REJECTED: 'badge-danger', CANCELLED: 'badge-neutral',
  }
  return map[status] || 'badge-neutral'
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    NEW: 'Yangi', PENDING: 'Kutilmoqda', BUILDING_REVIEW: 'Bino ko\'rib chiqish',
    FINANCE_REVIEW: 'Moliya', OFFER_SENT: 'Taklif yuborildi',
    ERI_PENDING: 'ERI kutilmoqda', APPROVED: 'Tasdiqlandi',
    REJECTED: 'Rad etildi', CANCELLED: 'Bekor qilindi',
  }
  return map[status] || status
}
</script>
