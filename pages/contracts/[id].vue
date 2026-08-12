<template>
  <div v-if="contract" class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/contracts')" class="btn btn-ghost btn-sm p-2"><ArrowLeft :size="18" /></button>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="page-title">{{ contract.number }}</h1>
            <span class="text-xs px-2 py-1 rounded-full" :class="statusClass(contract.status)">{{ statusLabel(contract.status) }}</span>
            <span class="text-xs px-2 py-1 rounded-full bg-ink-100 dark:bg-white/10 text-ink-500">v{{ contract.version }}</span>
          </div>
          <p class="text-xs text-ink-500 mt-0.5">{{ contract.tenantName }} · {{ contract.buildingName }} · Unit {{ contract.unitNumber }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink v-if="contract.status !== 'ACTIVE'" :to="`/contracts/${contract.id}/activate`" class="btn btn-primary btn-sm">
          <CheckCircle :size="14" /> Aktivlashtirish
        </NuxtLink>
      </div>
    </div>

    <!-- Contract info -->
        <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><CheckCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ contract.monthlyRent?.toLocaleString('ru-RU') || '—' }}</div>
          <div class="dash-kpi__label">Oylik ijara</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><FileSignature :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ contract.number || '—' }}</div>
          <div class="dash-kpi__label">Shartnoma №</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><PenTool :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ contract.startDate || '—' }}</div>
          <div class="dash-kpi__label">Boshlanish</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><AlertCircle :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ contract.endDate || '—' }}</div>
          <div class="dash-kpi__label">Tugash</div>
        </div>
      </div>
    </div>

    <div class="card p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Shartnoma ma'lumotlari</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div><div class="text-xs text-ink-500">Ijarachi</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.tenantName }}</div></div>
        <div><div class="text-xs text-ink-500">INN</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.tenantTin }}</div></div>
        <div><div class="text-xs text-ink-500">Direktor</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.tenantDirector }}</div></div>
        <div><div class="text-xs text-ink-500">Boshlanish</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.startDate }}</div></div>
        <div><div class="text-xs text-ink-500">Tugash</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.endDate }}</div></div>
        <div><div class="text-xs text-ink-500">Ijara</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.monthlyRent.toLocaleString('ru-RU') }} {{ contract.currency }}/oy</div></div>
        <div><div class="text-xs text-ink-500">Depozit</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.depositAmount.toLocaleString('ru-RU') }} {{ contract.currency }}</div></div>
        <div><div class="text-xs text-ink-500">Turi</div><div class="font-medium text-ink-900 dark:text-white mt-1">{{ contract.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</div></div>
      </div>
    </div>

    <!-- ERI status -->
    <div class="card p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">ERI imzo holati</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-white/5">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="contract.eriLandlordSigned ? 'bg-emerald-500/10' : 'bg-amber-500/10'">
            <CheckCircle v-if="contract.eriLandlordSigned" :size="18" class="text-emerald-500" />
            <Clock v-else :size="18" class="text-amber-500" />
          </div>
          <div>
            <div class="text-sm font-medium text-ink-900 dark:text-white">Bino egasi</div>
            <div class="text-xs text-ink-400">{{ contract.eriLandlordSigned ? 'Imzolangan' : 'Kutilmoqda' }}</div>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-xl bg-ink-50 dark:bg-white/5">
          <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="contract.eriTenantSigned ? 'bg-emerald-500/10' : 'bg-amber-500/10'">
            <CheckCircle v-if="contract.eriTenantSigned" :size="18" class="text-emerald-500" />
            <Clock v-else :size="18" class="text-amber-500" />
          </div>
          <div>
            <div class="text-sm font-medium text-ink-900 dark:text-white">Ijarachi</div>
            <div class="text-xs text-ink-400">{{ contract.eriTenantSigned ? 'Imzolangan' : 'Kutilmoqda' }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment schedule -->
    <div class="card overflow-hidden" v-if="contract.schedule?.length">
      <div class="px-4 py-3 border-b border-ink-100 dark:border-white/10">
        <h3 class="text-sm font-semibold text-ink-900 dark:text-white">To'lov jadvali</h3>
      </div>
      <table class="w-full">
        <thead>
          <tr class="border-b border-ink-100 dark:border-white/10">
            <th class="text-left text-xs text-ink-400 px-4 py-3">Sana</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Summa</th>
            <th class="text-right text-xs text-ink-400 px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in contract.schedule" :key="i" class="border-b border-ink-50 dark:border-white/5">
            <td class="px-4 py-3 text-sm text-ink-600 dark:text-ink-300">{{ s.date }}</td>
            <td class="px-4 py-3 text-right text-sm font-medium text-ink-900 dark:text-white">{{ s.amount.toLocaleString('ru-RU') }} {{ contract.currency }}</td>
            <td class="px-4 py-3 text-right">
              <span class="text-xs px-2 py-1 rounded-full" :class="payClass(s.status)">{{ payLabel(s.status) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="text-center py-20 text-ink-400">Shartnoma topilmadi</div>
</template>

<script setup lang="ts">
import { ArrowLeft, CheckCircle, Clock , AlertCircle, FileSignature, PenTool} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const route = useRoute()
const store = useMakonStore()

const contract = computed(() => store.contracts.find(c => c.id === route.params.id))

function statusLabel(s: string) {
  return { ACTIVE: 'Faol', PARTIALLY_SIGNED: 'Qisman imzo', DRAFT_READY: 'Qoralama', DRAFT: 'Qoralama', SIGNED: 'Imzolangan', EXPIRED: 'Muddati o\'tgan', TERMINATED: 'Bekor' }[s] || s
}
function statusClass(s: string) {
  return { ACTIVE: 'bg-emerald-500/10 text-emerald-500', PARTIALLY_SIGNED: 'bg-amber-500/10 text-amber-500', DRAFT_READY: 'bg-blue-500/10 text-blue-500', DRAFT: 'bg-blue-500/10 text-blue-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', EXPIRED: 'bg-red-500/10 text-red-500', TERMINATED: 'bg-red-500/10 text-red-500' }[s] || ''
}
function payLabel(s: string) { return { PAID: 'To\'langan', PENDING: 'Kutilmoqda', OVERDUE: 'Muddati o\'tgan' }[s] || s }
function payClass(s: string) { return { PAID: 'bg-emerald-500/10 text-emerald-500', PENDING: 'bg-blue-500/10 text-blue-500', OVERDUE: 'bg-red-500/10 text-red-500' }[s] || '' }

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
