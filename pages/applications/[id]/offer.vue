<template>
  <div v-if="app" class="max-w-4xl mx-auto space-y-6 py-4">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink to="/management/applications" class="btn btn-ghost btn-sm p-2">
          <ArrowLeft :size="18" />
        </NuxtLink>
        <div>
          <div class="flex items-center gap-2">
            <div class="eyebrow">Ariza</div>
      <h1 class="page-title">Kommercheskiy Taklif (Commercial Offer)</h1>
            <span class="badge badge-brand font-mono">v{{ offerVersion }}</span>
          </div>
          <p class="text-xs text-ink-500 mt-0.5">Ariza: <b>{{ app.number }}</b> | Arizachi: {{ app.applicantName }}</p>
        </div>
      </div>

      <!-- Accept / Reject Actions -->
      <div v-if="offerStatus === 'PENDING'" class="flex items-center gap-2">
        <button @click="handleReject" class="btn btn-secondary btn-sm text-red-400 border-red-500/30">
          <X :size="16" /> Rad etish
        </button>
        <button @click="showReviseModal = true" class="btn btn-secondary btn-sm">
          <Edit3 :size="16" /> O'zgartirish so'rash
        </button>
        <button @click="handleAccept" class="btn btn-primary btn-sm flex items-center gap-1.5">
          <Check :size="16" /> Taklifni qabul qilish
        </button>
      </div>

      <div v-else class="badge badge-success text-sm py-1.5 px-3 flex items-center gap-1.5">
        <CheckCircle :size="16" /> Qabul qilingan va Shartnoma qoralamasi yaratildi
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Offer Details -->
      <div class="md:col-span-2 space-y-6">
        
        <!-- Key Terms Cards -->
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white pb-2 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
            <DollarSign :size="18" class="text-brand-500" /> Tijorat Shartlari
          </h3>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-xs text-ink-500">Oylik Ijara Narxi</span>
              <div class="text-xl font-bold text-brand-500">${{ offerTerms.monthlyRent.toLocaleString() }} / oy</div>
            </div>
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-xs text-ink-500">Kafolat Depoziti</span>
              <div class="text-xl font-bold text-ink-900 dark:text-white">${{ offerTerms.depositAmount.toLocaleString() }}</div>
            </div>
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-xs text-ink-500">Ekspluatatsiya va Servis (m²)</span>
              <div class="text-base font-semibold text-ink-900 dark:text-white">${{ offerTerms.serviceChargePerSqM }} / m² / oy</div>
            </div>
            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-0.5">
              <span class="text-xs text-ink-500">Ijara Muddati</span>
              <div class="text-base font-semibold text-ink-900 dark:text-white">{{ offerTerms.durationMonths }} Oy ({{ app.startDate }} dan)</div>
            </div>
          </div>
        </div>

        <!-- Payment Schedule Breakdown Table -->
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <Calendar :size="18" class="text-brand-500" /> To'lovlar Grafigi (Quarterly Schedule)
          </h3>

          <div class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 uppercase tracking-wider text-left bg-black/5 dark:bg-white/5">
                  <th class="px-3 py-2">Muddati (Sana)</th>
                  <th class="px-3 py-2">Tavsifi</th>
                  <th class="px-3 py-2 text-right">Summa ($)</th>
                  <th class="px-3 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, idx) in paymentSchedule" :key="idx" class="border-b border-black/5 dark:border-white/5">
                  <td class="px-3 py-2 font-mono font-medium text-ink-900 dark:text-white">{{ p.date }}</td>
                  <td class="px-3 py-2 text-ink-500">{{ p.title }}</td>
                  <td class="px-3 py-2 text-right font-bold text-brand-500">${{ p.amount.toLocaleString() }}</td>
                  <td class="px-3 py-2 text-center"><span class="badge badge-warning text-[10px]">Kutilmoqda</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right Col: Version History Timeline -->
      <div class="space-y-6">
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <History :size="18" class="text-purple-400" /> Versiyalar Tarixi
          </h3>

          <div class="relative pl-4 border-l-2 border-brand-500/30 space-y-4 text-xs">
            <div v-for="ver in versionHistory" :key="ver.version" class="relative group">
              <span class="absolute -left-[21px] top-0 w-3.5 h-3.5 rounded-full bg-brand-500 border-2 border-white dark:border-ink-900"></span>
              <div class="font-bold text-ink-900 dark:text-white flex items-center justify-between">
                <span>Versiya {{ ver.version }}</span>
                <span class="text-[10px] text-ink-500 font-normal">{{ ver.date }}</span>
              </div>
              <p class="text-ink-500 mt-1">{{ ver.notes }}</p>
            </div>
          </div>
        </div>

        <!-- Contract Creation Alert Box -->
        <div v-if="createdContractId" class="card p-4 bg-emerald-500/10 border-emerald-500/30 space-y-3">
          <div class="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <CheckCircle :size="18" /> Shartnoma Qoralamasi Yaratildi!
          </div>
          <p class="text-xs text-ink-300">
            Arizachi taklifni qabul qildi. Avtomatik ravishda Shartnoma qoralamasi shakllantirildi.
          </p>
          <NuxtLink :to="`/contracts/${createdContractId}`" class="btn btn-primary btn-sm w-full text-xs text-center flex items-center justify-center gap-1">
            Shartnomani Ko'rish va Imzolash →
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Revise Request Modal -->
    <Teleport to="body">
      <div v-if="showReviseModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showReviseModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <h3 class="text-lg font-bold text-ink-900 dark:text-white">O'zgartirish bo'yicha e'tiroz va izoh</h3>
          <textarea v-model="reviseComment" rows="3" placeholder="Masalan: Depozit summasini 1 oylik narxga tushirish..." class="input w-full text-xs"></textarea>

          <div class="flex items-center justify-end gap-3 pt-3">
            <button @click="showReviseModal = false" class="btn btn-secondary text-xs">Bekor qilish</button>
            <button @click="submitRevise" class="btn btn-primary text-xs">Yuborish</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, DollarSign, Calendar, History, CheckCircle, X, Edit3, Check } from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'],  layout: 'admin', middleware: 'role' })

const route = useRoute()
const makonStore = useMakonStore()

const appId = computed(() => route.params.id as string)
const app = computed(() => makonStore.applications.find(a => a.id === appId.value) || makonStore.applications[0])

const offerVersion = ref('1.1')
const offerStatus = ref<'PENDING' | 'ACCEPTED'>('PENDING')
const showReviseModal = ref(false)
const reviseComment = ref('')
const createdContractId = ref<string | null>(null)

const offerTerms = ref({
  monthlyRent: app.value?.offeredPrice || 2850,
  depositAmount: (app.value?.offeredPrice || 2850) * 2,
  serviceChargePerSqM: 3.5,
  durationMonths: app.value?.durationMonths || 12,
})

const paymentSchedule = [
  { date: '2026-09-01', title: '1-Chorak Ijara + Depozit', amount: offerTerms.value.monthlyRent * 3 + offerTerms.value.depositAmount },
  { date: '2026-12-01', title: '2-Chorak Ijara', amount: offerTerms.value.monthlyRent * 3 },
  { date: '2027-03-01', title: '3-Chorak Ijara', amount: offerTerms.value.monthlyRent * 3 },
  { date: '2027-06-01', title: '4-Chorak Ijara', amount: offerTerms.value.monthlyRent * 3 },
]

const versionHistory = ref([
  { version: '1.1', date: '2026-08-08 14:00', notes: 'Bino menejeri va Moliya bo\'limi tomonidan tasdiqlangan so\'nggi tijorat shartlari.' },
  { version: '1.0', date: '2026-08-02 10:15', notes: 'Boshlang\'ich ariza topshirilgandagi taklif.' }
])

function handleAccept() {
  offerStatus.value = 'ACCEPTED'
  makonStore.updateApplicationStatus(app.value.id, 'DRAFT_READY')

  // Create Contract Draft
  const newCnt = {
    id: `cnt-${Date.now()}`,
    number: `CNT-2026-${String(makonStore.contracts.length + 1).padStart(3, '0')}`,
    applicationId: app.value.id,
    buildingId: app.value.buildingId,
    buildingName: app.value.buildingName,
    unitId: app.value.unitId,
    unitNumber: app.value.unitNumber,
    tenantName: app.value.applicantName,
    tenantTin: app.value.tin || '305987123',
    tenantDirector: 'Botirov Anvar',
    type: 'RENT' as 'RENT' | 'SALE',
    monthlyRent: offerTerms.value.monthlyRent,
    depositAmount: offerTerms.value.depositAmount,
    currency: 'UZS' as 'UZS' | 'UZS',
    startDate: app.value.startDate,
    endDate: '2027-09-01',
    status: 'DRAFT_READY' as any,
    sha256Hash: 'a8f5f167f44f4964e6c998dee827110c',
    eriLandlordSigned: false,
    eriTenantSigned: false,
    version: '1.0',
    documentUrl: '/docs/cnt-draft.pdf',
    schedule: []
  }

  makonStore.contracts.unshift(newCnt)
  createdContractId.value = newCnt.id
}

function handleReject() {
  makonStore.updateApplicationStatus(app.value.id, 'REJECTED', 'Kommercheskiy taklif rad etildi')
  alert('Taklif rad etildi')
}

function submitRevise() {
  versionHistory.value.unshift({
    version: '1.2',
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    notes: `O'zgartirish so'raldi: ${reviseComment.value}`
  })
  showReviseModal.value = false
  reviseComment.value = ''
  alert("O'zgartirish so\'rovi yuborildi")
}
</script>
