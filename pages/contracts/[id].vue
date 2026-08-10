<template>
  <div v-if="contract" class="max-w-5xl mx-auto space-y-6 py-4">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/contracts" class="btn btn-ghost btn-sm p-2">
          <ArrowLeft :size="18" />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-2xl font-bold font-mono text-ink-900 dark:text-white">{{ contract.number }}</h1>
            <span class="badge text-xs" :class="contractBadge(contract.status)">{{ contractLabel(contract.status) }}</span>
            <span class="badge badge-neutral text-xs font-mono">v{{ contract.version }}</span>
          </div>
          <p class="text-xs text-ink-500 mt-0.5">Ijarachi: <b>{{ contract.tenantName }}</b> | Bino: {{ contract.buildingName }} (Unit {{ contract.unitNumber }})</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button @click="showCompareModal = true" class="btn btn-secondary btn-sm flex items-center gap-1.5">
          <GitCompare :size="16" /> Versiya taqqoslash
        </button>

        <NuxtLink v-if="contract.status !== 'ACTIVE'" :to="`/contracts/${contract.id}/activate`" class="btn btn-primary btn-sm flex items-center gap-1.5">
          <CheckCircle :size="16" /> Aktivlashtirish Bosqichi →
        </NuxtLink>
      </div>
    </div>

    <!-- Cryptographic SHA-256 Stamp Banner -->
    <div class="card p-4 bg-black/5 dark:bg-white/5 border-l-4 border-l-purple-500 flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-3">
        <ShieldCheck :size="24" class="text-purple-400 flex-shrink-0" />
        <div>
          <div class="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-2">
            SHA-256 Raqamli Xesh & Tamg'a
            <span class="badge badge-success text-[10px]">Verifikatsiya qilindi</span>
          </div>
          <div class="text-[11px] font-mono text-ink-500 truncate max-w-xl">{{ contract.sha256Hash }}</div>
        </div>
      </div>

      <button @click="showEriModal = true" v-if="!contract.eriLandlordSigned" class="btn btn-primary btn-sm text-xs flex items-center gap-1">
        <Key :size="14" /> ERI bilan Imzolash
      </button>
    </div>

    <!-- Terms Breakdown Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Parties & Terms -->
      <div class="md:col-span-2 space-y-6">
        
        <!-- Parties Card -->
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white pb-2 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
            <Users :size="18" class="text-brand-500" /> Shartnoma Tomonlari (Parties)
          </h3>

          <div class="grid grid-cols-2 gap-4 text-xs">
            <!-- Landlord -->
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1">
              <span class="badge badge-brand text-[10px]">Ijaraga Beruvchi (Landlord)</span>
              <div class="font-bold text-ink-900 dark:text-white text-sm">MAKON Management MChJ</div>
              <div class="text-ink-500 font-mono">STIR: 300112233</div>
              <div class="text-ink-500">Direktor: Alisher Qodirov</div>
              <div class="pt-2 flex items-center gap-1.5" :class="contract.eriLandlordSigned ? 'text-emerald-500' : 'text-amber-500'">
                <CheckCircle :size="14" /> {{ contract.eriLandlordSigned ? 'ERI Imzolangan' : 'ERI kutilmoqda' }}
              </div>
            </div>

            <!-- Tenant -->
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1">
              <span class="badge badge-success text-[10px]">Ijarachi (Tenant)</span>
              <div class="font-bold text-ink-900 dark:text-white text-sm">{{ contract.tenantName }}</div>
              <div class="text-ink-500 font-mono">STIR: {{ contract.tenantTin }}</div>
              <div class="text-ink-500">Direktor: {{ contract.tenantDirector }}</div>
              <div class="pt-2 flex items-center gap-1.5" :class="contract.eriTenantSigned ? 'text-emerald-500' : 'text-amber-500'">
                <CheckCircle :size="14" /> {{ contract.eriTenantSigned ? 'ERI Imzolangan' : 'ERI kutilmoqda' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Commercial Terms breakdown -->
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white pb-2 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
            <DollarSign :size="18" class="text-brand-500" /> Tijorat Shartlari va To'lov
          </h3>

          <div class="grid grid-cols-3 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-ink-500">Oylik ijara</span>
              <div class="text-lg font-bold text-brand-500">${{ contract.monthlyRent.toLocaleString() }}</div>
            </div>
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-ink-500">Kafolat depoziti</span>
              <div class="text-lg font-bold text-ink-900 dark:text-white">${{ contract.depositAmount.toLocaleString() }}</div>
            </div>
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-ink-500">Amal qilish muddati</span>
              <div class="text-sm font-semibold text-ink-900 dark:text-white">{{ contract.startDate }} — {{ contract.endDate }}</div>
            </div>
          </div>
        </div>

      </div>

      <!-- Right Col: ERI Status & Version History -->
      <div class="space-y-6">
        <!-- ERI Signing Queue Card -->
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <Key :size="18" class="text-purple-400" /> ERI Imzolash Ketma-ketligi
          </h3>

          <div class="space-y-3 text-xs">
            <!-- Step 1 Tenant -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div>
                <div class="font-bold text-ink-900 dark:text-white">1. Ijarachi Vakili</div>
                <div class="text-[10px] text-ink-500">{{ contract.tenantName }}</div>
              </div>
              <span class="badge" :class="contract.eriTenantSigned ? 'badge-success' : 'badge-warning'">
                {{ contract.eriTenantSigned ? 'Imzolandi' : 'Kutilmoqda' }}
              </span>
            </div>

            <!-- Step 2 Landlord -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div>
                <div class="font-bold text-ink-900 dark:text-white">2. Bino Egasi / Boshqaruv</div>
                <div class="text-[10px] text-ink-500">MAKON Management</div>
              </div>
              <span class="badge" :class="contract.eriLandlordSigned ? 'badge-success' : 'badge-warning'">
                {{ contract.eriLandlordSigned ? 'Imzolandi' : 'Kutilmoqda' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Document Version History -->
        <div class="card p-5 space-y-3">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <History :size="18" class="text-brand-500" /> Hujjat Versiyalari
          </h3>

          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5">
              <div>
                <span class="font-bold text-ink-900 dark:text-white">v1.1 (Tasdiqlangan)</span>
                <div class="text-[10px] text-ink-500">2026-08-08 · Final PDF</div>
              </div>
              <button class="btn btn-ghost btn-sm p-1 text-brand-500"><Download :size="14" /></button>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-black/5 dark:bg-white/5 opacity-60">
              <div>
                <span class="font-medium text-ink-900 dark:text-white">v1.0 (Qoralama)</span>
                <div class="text-[10px] text-ink-500">2026-08-02 · Initial Draft</div>
              </div>
              <button class="btn btn-ghost btn-sm p-1 text-ink-500"><Download :size="14" /></button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ERI Modal Simulation -->
    <Teleport to="body">
      <div v-if="showEriModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="showEriModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <h3 class="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
            <Key :size="18" class="text-brand-500" /> Shartnomani ERI bilan tasdiqlash
          </h3>

          <div class="space-y-3 text-xs">
            <div>
              <label class="label">E-IMZO Kalit</label>
              <select v-model="eriKey" class="input w-full font-mono text-xs">
                <option value="k1">MAKON MANAGEMENT MChJ (STIR: 300112233)</option>
              </select>
            </div>
            <div>
              <label class="label">PIN Kod</label>
              <input v-model="eriPin" type="password" placeholder="••••" class="input w-full font-mono text-center text-base" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3">
            <button @click="showEriModal = false" class="btn btn-secondary text-xs">Bekor qilish</button>
            <button @click="confirmSign" class="btn btn-primary text-xs">Imzolash</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Version Compare Modal -->
    <Teleport to="body">
      <div v-if="showCompareModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="showCompareModal = false"></div>
        <div class="relative w-full max-w-3xl bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
              <GitCompare :size="18" class="text-purple-400" /> Versiya Taqqoslash (v1.0 vs v1.1 Diff)
            </h3>
            <button @click="showCompareModal = false" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs font-mono">
            <div class="p-3 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2">
              <div class="font-bold text-red-400">v1.0 (Boshlang'ich)</div>
              <div>- Oylik ijara: $5,000</div>
              <div>- Depozit: $5,000</div>
              <div>- Penya stavkasi: 0.1%</div>
            </div>
            <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <div class="font-bold text-emerald-400">v1.1 (Yangilangan)</div>
              <div>+ Oylik ijara: ${{ contract.monthlyRent.toLocaleString() }}</div>
              <div>+ Depozit: ${{ contract.depositAmount.toLocaleString() }}</div>
              <div>+ Penya stavkasi: 0.05% (Kengaytirilgan)</div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, GitCompare, CheckCircle, ShieldCheck, Key, Users, DollarSign, History, Download, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const makonStore = useMakonStore()

const contractId = computed(() => route.params.id as string)
const contract = computed(() => makonStore.contracts.find(c => c.id === contractId.value) || makonStore.contracts[0])

const showEriModal = ref(false)
const showCompareModal = ref(false)
const eriKey = ref('k1')
const eriPin = ref('1234')

function contractBadge(status: string) {
  if (status === 'ACTIVE') return 'badge-success'
  if (status === 'PARTIALLY_SIGNED') return 'badge-warning'
  return 'badge-brand'
}

function contractLabel(status: string) {
  if (status === 'ACTIVE') return 'Aktiv'
  if (status === 'PARTIALLY_SIGNED') return 'Qisman imzolangan'
  return 'Qoralama tayyor'
}

function confirmSign() {
  if (contract.value) {
    contract.value.eriLandlordSigned = true
    if (contract.value.eriTenantSigned) {
      contract.value.status = 'SIGNED'
    }
  }
  showEriModal.value = false
  alert('ERI imzo muvaffaqiyatli qo\'yildi!')
}
</script>
