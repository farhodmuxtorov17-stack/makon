<template>
  <div v-if="contract" class="max-w-5xl mx-auto space-y-5 py-4">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <button @click="navigateTo('/contracts')" class="btn btn-ghost btn-sm p-2"><ArrowLeft :size="18" /></button>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-2xl font-bold font-mono text-ink-900 dark:text-white">{{ contract.number }}</h1>
            <span class="badge text-xs" :class="statusBadge(contract.status)">{{ statusLabel(contract.status) }}</span>
            <span class="badge badge-neutral text-xs font-mono">v{{ contract.version }}</span>
          </div>
          <p class="text-xs text-ink-500 mt-0.5">{{ contract.tenantName }} · {{ contract.buildingName }} · Unit {{ contract.unitNumber }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> PDF</button>
        <NuxtLink v-if="contract.status !== 'ACTIVE'" :to="`/contracts/${contract.id}/activate`" class="btn btn-primary btn-sm">
          <CheckCircle :size="14" /> Aktivlashtirish
        </NuxtLink>
      </div>
    </div>

    <!-- ERI Timeline -->
    <div class="card p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
        <ShieldCheck :size="18" class="text-purple-500" /> ERI imzo jarayoni
      </h3>
      <div class="eri-timeline">
        <div v-for="(step, i) in eriSteps" :key="i" class="eri-timeline__step" :class="{ 'eri-timeline__step--done': step.done, 'eri-timeline__step--current': step.current }">
          <div class="eri-timeline__marker">
            <CheckCircle v-if="step.done" :size="16" class="text-emerald-500" />
            <Clock v-else-if="step.current" :size="16" class="text-amber-500" />
            <span v-else class="text-ink-400 text-sm">{{ i + 1 }}</span>
          </div>
          <div class="eri-timeline__content">
            <div class="text-sm font-medium" :class="step.done ? 'text-ink-900 dark:text-white' : step.current ? 'text-amber-500' : 'text-ink-400'">{{ step.title }}</div>
            <div class="text-xs text-ink-500 mt-0.5">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Parties + Terms grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Parties (2 cols) -->
      <div class="card p-5 md:col-span-2">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
          <Users :size="18" class="text-brand-500" /> Tomonlar
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <!-- Landlord -->
          <div class="party-card">
            <span class="badge badge-brand text-[10px] mb-2">Ijaraga beruvchi</span>
            <div class="font-bold text-sm text-ink-900 dark:text-white">MAKON Management MChJ</div>
            <div class="text-xs text-ink-500 font-mono mt-1">STIR: 300112233</div>
            <div class="text-xs text-ink-500">Direktor: Alisher Qodirov</div>
            <div class="party-card__sign" :class="contract.eriLandlordSigned ? 'text-emerald-500' : 'text-amber-500'">
              <CheckCircle :size="14" /> {{ contract.eriLandlordSigned ? 'ERI imzolangan' : 'ERI kutilmoqda' }}
            </div>
          </div>
          <!-- Tenant -->
          <div class="party-card">
            <span class="badge badge-success text-[10px] mb-2">Ijarachi</span>
            <div class="font-bold text-sm text-ink-900 dark:text-white">{{ contract.tenantName }}</div>
            <div class="text-xs text-ink-500 font-mono mt-1">STIR: {{ contract.tenantTin }}</div>
            <div class="text-xs text-ink-500">Direktor: {{ contract.tenantDirector }}</div>
            <div class="party-card__sign" :class="contract.eriTenantSigned ? 'text-emerald-500' : 'text-amber-500'">
              <CheckCircle :size="14" /> {{ contract.eriTenantSigned ? 'ERI imzolangan' : 'ERI kutilmoqda' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Terms (1 col) -->
      <div class="card p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2">
          <FileText :size="18" class="text-brand-500" /> Shartlar
        </h3>
        <div class="space-y-3 text-sm">
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Oylik ijara</span>
            <span class="font-bold text-brand-500">{{ formatUZS(contract.monthlyRent) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Depozit</span>
            <span class="font-medium text-ink-900 dark:text-white">{{ formatUZS(contract.deposit) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Boshlanish</span>
            <span class="font-medium text-ink-900 dark:text-white">{{ contract.startDate }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Tugashi</span>
            <span class="font-medium text-ink-900 dark:text-white">{{ contract.endDate }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Muddat</span>
            <span class="font-medium text-ink-900 dark:text-white">{{ contract.durationMonths }} oy</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-ink-500 text-xs">Valyuta</span>
            <span class="font-medium text-ink-900 dark:text-white">{{ contract.currency }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SHA-256 hash -->
    <div class="card p-4 bg-purple-500/5 border-l-4 border-l-purple-500 flex items-center justify-between flex-wrap gap-3">
      <div class="flex items-center gap-3">
        <ShieldCheck :size="24" class="text-purple-500 flex-shrink-0" />
        <div>
          <div class="text-xs font-bold text-ink-900 dark:text-white flex items-center gap-2">
            SHA-256 Raqamli xesh
            <span class="badge badge-success text-[10px]">Verifikatsiya qilindi</span>
          </div>
          <div class="text-[11px] font-mono text-ink-500 truncate max-w-xl">{{ contract.sha256Hash }}</div>
        </div>
      </div>
      <button v-if="!contract.eriLandlordSigned" class="btn btn-primary btn-sm text-xs">
        <Key :size="14" /> ERI imzolash
      </button>
    </div>

    <!-- Contract text preview -->
    <div class="card p-6">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Shartnoma matni</h3>
      <div class="prose prose-sm max-w-none dark:prose-invert space-y-3 text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
        <p><b>1. Predmet.</b> Ijaraga beruvchi ijarachiga {{ contract.buildingName }} binosidagi {{ contract.unitNumber }} unitni ijaraga beradi. Maydon: {{ contract.unitArea }} m².</p>
        <p><b>2. Ijara to'lovi.</b> Oylik ijara to'lovi {{ formatUZS(contract.monthlyRent) }} {{ contract.currency }} ni tashkil etadi. To'lov har oyning 15-sanasigacha amalga oshiriladi.</p>
        <p><b>3. Depozit.</b> Ijarachi {{ formatUZS(contract.deposit) }} {{ contract.currency }} miqdorida garanta pulini to'laydi. Shartnoma tugagach qaytariladi.</p>
        <p><b>4. Muddat.</b> Shartnoma {{ contract.startDate }} dan {{ contract.endDate }} gacha, ya'ni {{ contract.durationMonths }} oygacha amal qiladi.</p>
        <p><b>5. Taraflar huquq va majburiyatlari.</b> Ijarachi unitdan faqat biznes maqsadlarida foydalanish huquqiga ega. Ijaraga beruvchi texnik xizmat ko'rsatishni ta'minlaydi.</p>
        <p><b>6. Tugatish.</b> Shartnoma muddati tugaganda yoki taraflar kelishuvi bilan tugatiladi. Erta tugatish uchun 30 kun oldin xabar berilishi kerak.</p>
      </div>
    </div>

    <!-- Invoices linked to this contract -->
    <div class="card p-5">
      <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Shartnomaga bog'langan invoyslar</h3>
      <div class="space-y-2">
        <div v-for="inv in contractInvoices" :key="inv.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Receipt :size="16" class="text-blue-500" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-sm font-medium text-ink-900 dark:text-white font-mono">{{ inv.number }}</div>
            <div class="text-xs text-ink-500">{{ inv.period }} · {{ formatUZS(inv.amount) }}</div>
          </div>
          <span class="badge text-[10px]" :class="inv.status === 'PAID' ? 'badge-success' : inv.status === 'OVERDUE' ? 'badge-danger' : 'badge-warning'">
            {{ inv.status === 'PAID' ? 'To\'langan' : inv.status === 'OVERDUE' ? 'Muddati o\'tgan' : 'Kutilmoqda' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeft, Download, CheckCircle, ShieldCheck, Users, FileText,
  Key, Clock, Receipt,
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()

const contract = ref({
  id: 'c1', number: 'CTR-2026-001', tenantName: 'ABC Logistics MChJ', tenantTin: '308745612',
  tenantDirector: 'Sardor Yusupov', buildingName: 'Tashkent City', unitNumber: 'A-301',
  unitArea: 85, monthlyRent: 25000000, deposit: 50000000, startDate: '01 Apr 2026',
  endDate: '15 Mar 2027', durationMonths: 12, currency: 'UZS', status: 'ACTIVE',
  version: 3, eriTenantSigned: true, eriLandlordSigned: true,
  sha256Hash: 'a3f5e8b2c9d1f4a7e6b3c8d2f5a1e9b4c7d3f6a2e8b1c5d9f3a7e4b6c2d8f1a5',
})

const eriSteps = computed(() => [
  { title: 'Shartnoma loyihasi', desc: 'Qoralama tayyorlandi', done: true, current: false },
  { title: 'Ijarachi imzosi', desc: 'ABC Logistics MChJ ERI orqali imzoladi', done: contract.value.eriTenantSigned, current: !contract.value.eriTenantSigned },
  { title: 'Bino egasi imzosi', desc: 'MAKON Management ERI orqali imzoladi', done: contract.value.eriLandlordSigned, current: contract.value.eriLandlordSigned && !contract.value.eriTenantSigned ? false : !contract.value.eriLandlordSigned },
  { title: 'Aktivlashtirish', desc: 'Shartnoma faol holatga o\'tdi', done: contract.value.status === 'ACTIVE', current: contract.value.status !== 'ACTIVE' && contract.value.eriTenantSigned && contract.value.eriLandlordSigned },
])

const contractInvoices = [
  { id: '1', number: 'INV-2026-052', period: 'Avg 2026', amount: 25000000, status: 'PENDING' },
  { id: '2', number: 'INV-2026-046', period: 'Iyl 2026', amount: 25000000, status: 'PARTIALLY_PAID' },
  { id: '3', number: 'INV-2026-040', period: 'Iyn 2026', amount: 25000000, status: 'PAID' },
  { id: '4', number: 'INV-2026-035', period: 'May 2026', amount: 25000000, status: 'PAID' },
]



function statusBadge(s: string) {
  return { ACTIVE: 'badge-success', PARTIALLY_SIGNED: 'badge-warning', DRAFT_READY: 'badge-brand', EXPIRED: 'badge-neutral' }[s] || 'badge-neutral'
}

function statusLabel(s: string) {
  return { ACTIVE: 'Aktiv', PARTIALLY_SIGNED: 'Qisman imzo', DRAFT_READY: 'Qoralama', EXPIRED: 'Muddati o\'tgan' }[s] || s
}
</script>

<style scoped>
.eri-timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.eri-timeline__step {
  display: flex;
  gap: 12px;
  padding-bottom: 20px;
  position: relative;
}
.eri-timeline__step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 32px;
  bottom: 0;
  width: 2px;
  background: rgba(0,0,0,0.06);
}
.dark .eri-timeline__step:not(:last-child)::before {
  background: rgba(255,255,255,0.06);
}
.eri-timeline__step--done:not(:last-child)::before {
  background: rgba(16,185,129,0.3);
}
.eri-timeline__marker {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #ffffff; border: 2px solid rgba(0,0,0,0.08);
  flex-shrink: 0; z-index: 1;
}
.dark .eri-timeline__marker { background: #18181b; border-color: rgba(255,255,255,0.08); }
.eri-timeline__step--done .eri-timeline__marker {
  background: rgba(16,185,129,0.1); border-color: rgba(16,185,129,0.3);
}
.eri-timeline__step--current .eri-timeline__marker {
  background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.3);
}
.eri-timeline__content {
  padding-top: 4px;
}
.party-card {
  padding: 14px;
  border-radius: 14px;
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.05);
}
.dark .party-card {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.05);
}
.party-card__sign {
  display: flex; align-items: center; gap: 5px;
  padding-top: 10px; margin-top: 8px;
  border-top: 1px solid rgba(0,0,0,0.05);
  font-size: 12px; font-weight: 600;
}
.dark .party-card__sign { border-top-color: rgba(255,255,255,0.05); }
</style>
