<template>
  <div class="space-y-5 animate-fade-up">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Shartnomalar</div>
      <h1 class="page-title">Shartnomalar</h1>
      <p class="text-sm text-ink-400 mt-1">{{ contracts.length }} ta shartnoma · {{ activeCount }} aktiv · Barcha shartnomalar, holatlar va muddatlar</p>
      </div>
      <NuxtLink to="/management/applications" class="btn btn-primary btn-sm btn-glow">
        <Plus :size="14" /> Arizadan shartnoma
      </NuxtLink>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard icon="CheckCircle" iconBg="rgba(16,185,129,0.1)" iconColor="#059669" label="Aktiv" :value="activeCount" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" to="/contracts" :sparkData="[30,32,35,38,40,42,45]" sparkColor="#10b981" />
      <KpiCard icon="PenTool" iconBg="rgba(59,130,246,0.1)" iconColor="#2563EB" label="Imzolanmoqda" :value="signingCount" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/eri/signatures" :sparkData="[2,3,4,3,5,4,6]" sparkColor="var(--accent)" />
      <KpiCard icon="AlertCircle" iconBg="rgba(239,68,68,0.1)" iconColor="#DC2626" label="Muddati o'tgan" :value="expiredCount" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" to="/contracts" :sparkData="[5,4,3,4,5,3,2]" sparkColor="#ef4444" />
      <KpiCard icon="FileSignature" iconBg="rgba(99,102,241,0.1)" iconColor="#6366F1" label="Imzolangan" :value="eriCount" icon-color="var(--accent)" icon-bg="rgba(37,99,235,0.1)" to="/eri/signatures" :sparkData="[10,12,15,18,20,22,25]" sparkColor="var(--accent)" />
    </div>

    <!-- Search -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        <input v-model="search" type="text" placeholder="Raqam, ijarachi yoki STIR..." class="input pl-9" />
      </div>
      <select v-model="statusFilter" class="input w-auto min-w-[140px]">
        <option value="">Barcha statuslar</option>
        <option value="ACTIVE">Aktiv</option>
        <option value="PARTIALLY_SIGNED">Qisman imzo</option>
        <option value="DRAFT_READY">Qoralama</option>
        <option value="EXPIRED">Muddati o'tgan</option>
      </select>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Ijarachi</th>
              <th class="hidden md:table-cell">Bino / Unit</th>
              <th class="text-right">Oylik</th>
              <th class="hidden lg:table-cell text-center">Davr</th>
              <th class="text-center">Imzo</th>
              <th class="text-center">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredContracts" :key="c.id" class="cursor-pointer" @click="navigateTo(`/contracts/${c.id}`)">
              <td class="font-mono font-bold text-xs text-ink-900 ">{{ c.number }}</td>
              <td>
                <div class="font-medium text-ink-900 ">{{ c.tenantName }}</div>
                <div class="text-xs text-ink-500 font-mono">STIR: {{ c.tenantTin }}</div>
              </td>
              <td class="hidden md:table-cell">
                <div class="text-sm text-ink-900 ">{{ c.buildingName }}</div>
                <div class="text-xs text-brand-500 font-mono">{{ c.unitNumber }}</div>
              </td>
              <td class="text-right font-bold text-brand-600 ">{{ formatUZSShort(c.monthlyRent) }}</td>
              <td class="hidden lg:table-cell text-center text-xs text-ink-500 font-mono">{{ c.startDate }} — {{ c.endDate }}</td>
              <td class="text-center">
                <div class="flex items-center justify-center gap-1">
                  <span class="eri-badge" :class="c.eriTenantSigned ? 'eri-badge--signed' : 'eri-badge--pending'">T</span>
                  <span class="eri-badge" :class="c.eriLandlordSigned ? 'eri-badge--signed' : 'eri-badge--pending'">L</span>
                </div>
              </td>
              <td class="text-center">
                <span class="badge" :class="contractBadge(c.status)">{{ contractLabel(c.status) }}</span>
              </td>
              <td class="text-right">
                <ChevronRight :size="16" class="text-ink-400" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail -->
    <DrawerModal :show="!!selectedContract" title="Shartnoma tafsilotlari" @close="selectedContract = null">
      <template v-if="selectedContract">
        <div class="space-y-5 animate-fade-up">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-mono font-bold text-lg text-ink-900 ">{{ selectedContract.number }}</div>
              <div class="text-sm text-ink-500 mt-0.5">{{ selectedContract.tenantName }}</div>
            </div>
            <span class="badge" :class="contractBadge(selectedContract.status)">{{ contractLabel(selectedContract.status) }}</span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Ijarachi STIR</div>
              <div class="font-mono font-bold text-sm text-ink-900 ">{{ selectedContract.tenantTin }}</div>
            </div>
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Bino</div>
              <div class="font-medium text-sm text-ink-900 ">{{ selectedContract.buildingName }}</div>
            </div>
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Unit</div>
              <div class="font-mono font-bold text-sm text-brand-600 ">{{ selectedContract.unitNumber }}</div>
            </div>
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Oylik to'lov</div>
              <div class="font-bold text-sm text-ink-900 ">{{ formatUZS(selectedContract.monthlyRent) }}</div>
            </div>
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Boshlanish</div>
              <div class="font-mono text-sm text-ink-900 ">{{ selectedContract.startDate }}</div>
            </div>
            <div class="card p-3">
              <div class="text-xs text-ink-500 mb-1">Tugash</div>
              <div class="font-mono text-sm text-ink-900 ">{{ selectedContract.endDate }}</div>
            </div>
          </div>

          <div class="card-premium p-4">
            <div class="text-xs font-semibold text-ink-500 uppercase tracking-wider mb-3">Raqamli imzolar</div>
            <div class="flex gap-3">
              <div class="flex-1 flex items-center gap-2 p-2.5 rounded-xl" :class="selectedContract.eriTenantSigned ? 'bg-emerald-500/10' : 'bg-amber-500/10'">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="selectedContract.eriTenantSigned ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'">
                  <User :size="16" />
                </div>
                <div>
                  <div class="text-xs text-ink-500">Ijarachi</div>
                  <div class="text-sm font-medium" :class="selectedContract.eriTenantSigned ? 'text-emerald-600' : 'text-amber-600'">
                    {{ selectedContract.eriTenantSigned ? 'Imzolangan' : 'Kutilmoqda' }}
                  </div>
                </div>
              </div>
              <div class="flex-1 flex items-center gap-2 p-2.5 rounded-xl" :class="selectedContract.eriLandlordSigned ? 'bg-emerald-500/10' : 'bg-amber-500/10'">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="selectedContract.eriLandlordSigned ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'">
                  <Building2 :size="16" />
                </div>
                <div>
                  <div class="text-xs text-ink-500">Ulad egasi</div>
                  <div class="text-sm font-medium" :class="selectedContract.eriLandlordSigned ? 'text-emerald-600' : 'text-amber-600'">
                    {{ selectedContract.eriLandlordSigned ? 'Imzolangan' : 'Kutilmoqda' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex gap-2 pt-1">
            <NuxtLink :to="`/contracts/${selectedContract.id}`" class="btn btn-primary btn-md flex-1">
              <FileText :size="15" /> To'liq ko'rish
            </NuxtLink>
            <button v-if="!selectedContract.eriTenantSigned || !selectedContract.eriLandlordSigned" class="btn btn-secondary btn-md">
              <Send :size="15" /> Imzo eslatma
            </button>
            <button v-if="selectedContract.status === 'EXPIRED'" class="btn btn-secondary btn-md">
              <RefreshCw :size="15" /> Uzaytirish
            </button>
          </div>
        </div>
      </template>
    </DrawerModal>
  </div>
</template>

<script setup lang="ts">
import KpiCard from '~/components/KpiCard.vue'
import DrawerModal from '~/components/DrawerModal.vue'
import { Plus, Search, CheckCircle2, AlertCircle, ShieldCheck, FileSignature, ChevronRight, FileText, Send, RefreshCw, User, Building2 } from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER'],  layout: 'admin', middleware: 'role' })

const { formatUZS, formatUZSShort, formatNumber, formatDate } = useFormat()

const search = ref('')
const statusFilter = ref('')
const selectedContract = ref<any>(null)

const contracts = [
  { id: 'c1', number: 'CTR-2026-001', tenantName: 'Orient Logistika MChJ', tenantTin: '308745612', buildingName: 'Tashkent City', unitNumber: 'A-301', monthlyRent: 25000000, startDate: '01.04.26', endDate: '15.03.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c2', number: 'CTR-2026-002', tenantName: 'Ipak Yuli Savdo MChJ', tenantTin: '305487291', buildingName: 'Tashkent City', unitNumber: 'B-501', monthlyRent: 35000000, startDate: '15.05.26', endDate: '14.05.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c3', number: 'CTR-2026-005', tenantName: 'Alfa Biznes MChJ', tenantTin: '309215648', buildingName: 'IT Park', unitNumber: 'C-201', monthlyRent: 18000000, startDate: '01.06.26', endDate: '31.05.27', status: 'ACTIVE', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c4', number: 'CTR-2026-008', tenantName: 'Markaz Savdo MChJ', tenantTin: '304561287', buildingName: 'Piramit', unitNumber: 'D-102', monthlyRent: 22000000, startDate: '01.08.26', endDate: '31.07.27', status: 'PARTIALLY_SIGNED', eriTenantSigned: true, eriLandlordSigned: false },
  { id: 'c5', number: 'CTR-2026-009', tenantName: 'Navoiy Trade MChJ', tenantTin: '307819234', buildingName: 'Trillant Tower', unitNumber: 'B-302', monthlyRent: 32000000, startDate: '15.08.26', endDate: '14.08.27', status: 'DRAFT_READY', eriTenantSigned: false, eriLandlordSigned: false },
  { id: 'c6', number: 'CTR-2025-098', tenantName: 'Sergeli Logistika', tenantTin: '302345678', buildingName: 'Tashkent City', unitNumber: 'A-205', monthlyRent: 15000000, startDate: '01.09.25', endDate: '31.08.26', status: 'EXPIRED', eriTenantSigned: true, eriLandlordSigned: true },
  { id: 'c7', number: 'CTR-2026-010', tenantName: 'Zomin Invest MChJ', tenantTin: '306782345', buildingName: 'IT Park', unitNumber: 'C-205', monthlyRent: 28000000, startDate: '01.09.26', endDate: '31.08.27', status: 'PARTIALLY_SIGNED', eriTenantSigned: false, eriLandlordSigned: true },
]

const activeCount = computed(() => contracts.filter(c => c.status === 'ACTIVE').length)
const signingCount = computed(() => contracts.filter(c => ['PARTIALLY_SIGNED', 'DRAFT_READY'].includes(c.status)).length)
const expiredCount = computed(() => contracts.filter(c => c.status === 'EXPIRED').length)
const eriCount = computed(() => contracts.filter(c => c.eriTenantSigned && c.eriLandlordSigned).length)

const filteredContracts = computed(() => {
  let r = [...contracts]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(c => c.number.toLowerCase().includes(q) || c.tenantName.toLowerCase().includes(q) || c.tenantTin.includes(q))
  }
  if (statusFilter.value) r = r.filter(c => c.status === statusFilter.value)
  return r
})

function openContract(c: any) {
  selectedContract.value = c
}

function contractBadge(s: string) { return { ACTIVE: 'badge-success', PARTIALLY_SIGNED: 'badge-warning', DRAFT_READY: 'badge-brand', EXPIRED: 'badge-neutral' }[s] || 'badge-neutral' }
function contractLabel(s: string) { return { ACTIVE: 'Aktiv', PARTIALLY_SIGNED: 'Qisman imzo', DRAFT_READY: 'Qoralama', EXPIRED: "Muddati o'tgan" }[s] || s }
</script>

<style scoped>
.eri-badge { width: 22px; height: 22px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; }
.eri-badge--signed { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
.eri-badge--pending { background: rgba(245,158,11,0.1); color: #f59e0b; border: 1px solid rgba(245,158,11,0.2); }
</style>
