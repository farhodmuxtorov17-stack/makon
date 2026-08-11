<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">ERI imzo navbati</h1>
        <p class="text-ink-500 text-sm mt-1">{{ signatures.length }} ta so'rov · {{ pendingCount }} kutilmoqda</p>
      </div>
      <button class="btn btn-secondary btn-sm"><RefreshCw :size="14" /> Yangilash</button>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <KpiCard :icon="Clock" label="Kutilmoqda" :value="pendingCount" icon-color="#f59e0b" icon-bg="rgba(245,158,11,0.1)" />
      <KpiCard :icon="FileSignature" label="Imzolangan" :value="signedCount" icon-color="#10b981" icon-bg="rgba(16,185,129,0.1)" />
      <KpiCard :icon="AlertCircle" label="Rad etilgan" :value="rejectedCount" icon-color="#ef4444" icon-bg="rgba(239,68,68,0.1)" />
      <KpiCard :icon="ShieldCheck" label="Jami" :value="signatures.length" icon-color="#6366f1" icon-bg="rgba(99,102,241,0.1)" />
    </div>

    <!-- Filter -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit">
      <button v-for="tab in tabs" :key="tab.value" @click="statusFilter = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all font-medium"
        :class="statusFilter === tab.value ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- Signatures -->
    <div class="space-y-3">
      <div v-for="sig in filteredSignatures" :key="sig.id" class="card p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between flex-wrap gap-3">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" :class="statusIcon(sig.status)">
              <ShieldCheck :size="18" />
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-ink-900 dark:text-white text-sm font-mono">{{ sig.documentNumber }}</span>
                <span class="badge text-[10px]" :class="statusBadge(sig.status)">{{ statusLabel(sig.status) }}</span>
              </div>
              <div class="text-xs text-ink-500 mt-0.5">{{ sig.contractTitle }} · {{ sig.signerRole }}</div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-ink-500">Yuborildi</div>
            <div class="text-sm font-medium text-ink-900 dark:text-white">{{ sig.sentDate }}</div>
          </div>
        </div>

        <!-- Signer info -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/5 dark:border-white/5 text-xs">
          <div>
            <div class="text-ink-500 mb-0.5">Imzolovchi</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ sig.signerName }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">STIR / PINFL</div>
            <div class="font-medium text-ink-900 dark:text-white font-mono">{{ sig.signerTin }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">ERI provayder</div>
            <div class="font-medium text-ink-900 dark:text-white">{{ sig.provider }}</div>
          </div>
          <div>
            <div class="text-ink-500 mb-0.5">Muddat</div>
            <div class="font-medium" :class="sig.expiresIn < 24 ? 'text-red-500' : sig.expiresIn < 72 ? 'text-amber-500' : 'text-ink-900 dark:text-white'">{{ sig.expiresIn }} soat</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 mt-4 pt-3 border-t border-black/5 dark:border-white/5">
          <button v-if="sig.status === 'PENDING'" class="btn btn-primary btn-sm"><Send :size="14" /> Imzo so'rov yuborish</button>
          <button v-if="sig.status === 'FAILED'" class="btn btn-secondary btn-sm"><RotateCw :size="14" /> Qayta urinish</button>
          <span v-if="sig.status === 'SIGNED'" class="text-xs text-emerald-500 flex items-center gap-1"><CheckCircle2 :size="14" /> {{ sig.signedDate }} da imzolangan</span>
          <span v-if="sig.status === 'FAILED'" class="text-xs text-red-500 ml-2">Sabab: {{ sig.failReason }}</span>
          <button class="btn btn-ghost btn-sm ml-auto"><ExternalLink :size="14" /> ERI sayti</button>
        </div>
      </div>
    </div>

    <div v-if="filteredSignatures.length === 0" class="card p-12 text-center">
      <ShieldCheck :size="32" class="text-ink-300 mx-auto mb-2" />
      <p class="text-ink-500 text-sm">Bu statusda so'rovlar yo'q</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, CheckCircle2, XCircle, ShieldCheck, RefreshCw, Send, RotateCw, ExternalLink } from 'lucide-vue-next'
import KpiCard from '~/components/KpiCard.vue'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const statusFilter = ref('')

const tabs = [
  { value: '', label: 'Hammasi' },
  { value: 'PENDING', label: 'Kutilmoqda' },
  { value: 'SIGNED', label: 'Imzolangan' },
  { value: 'FAILED', label: 'Xatolik' },
]

const signatures = [
  { id: '1', documentNumber: 'CTR-2026-008', contractTitle: 'Export Group MChJ · D-102 Piramit', signerRole: 'Bino egasi', signerName: 'Akmal Rahimov', signerTin: '308745612', provider: 'UZDPI', status: 'PENDING', sentDate: '10 Avg 14:30', expiresIn: 48, signedDate: '', failReason: '' },
  { id: '2', documentNumber: 'CTR-2026-010', contractTitle: 'Tech Hub MChJ · C-205 IT Park', signerRole: 'Ijarachi', signerName: 'Bekzod Aliyev', signerTin: '306782345', provider: 'UZDPI', status: 'PENDING', sentDate: '10 Avg 12:15', expiresIn: 18, signedDate: '', failReason: '' },
  { id: '3', documentNumber: 'CTR-2026-005', contractTitle: 'Smart Solutions MChJ · C-201 IT Park', signerRole: 'Ijarachi', signerName: 'Dilnoza Karimova', signerTin: '309215648', provider: 'UZDPI', status: 'SIGNED', sentDate: '01 Iyn 09:00', expiresIn: 0, signedDate: '01 Iyn 14:22', failReason: '' },
  { id: '4', documentNumber: 'CTR-2026-005', contractTitle: 'Smart Solutions MChJ · C-201 IT Park', signerRole: 'Bino egasi', signerName: 'Akmal Rahimov', signerTin: '308745612', provider: 'UZDPI', status: 'SIGNED', sentDate: '01 Iyn 14:25', expiresIn: 0, signedDate: '01 Iyn 16:10', failReason: '' },
  { id: '5', documentNumber: 'CTR-2026-009', contractTitle: 'Mega Group MChJ · B-302 Trillant Tower', signerRole: 'Ijarachi', signerName: 'Otabek Yo\'ldoshev', signerTin: '307819234', provider: 'UZDPI', status: 'FAILED', sentDate: '08 Avg 10:00', expiresIn: 0, signedDate: '', failReason: 'Sertifikat muddati o\'tgan' },
  { id: '6', documentNumber: 'CTR-2026-001', contractTitle: 'ABC Logistics MChJ · A-301 Tashkent City', signerRole: 'Ijarachi', signerName: 'Sardor Yusupov', signerTin: '304561287', provider: 'UZDPI', status: 'SIGNED', sentDate: '28 Mar 11:00', expiresIn: 0, signedDate: '28 Mar 15:45', failReason: '' },
  { id: '7', documentNumber: 'CTR-2026-001', contractTitle: 'ABC Logistics MChJ · A-301 Tashkent City', signerRole: 'Bino egasi', signerName: 'Akmal Rahimov', signerTin: '308745612', provider: 'UZDPI', status: 'SIGNED', sentDate: '28 Mar 15:50', expiresIn: 0, signedDate: '28 Mar 16:20', failReason: '' },
]

const pendingCount = computed(() => signatures.filter(s => s.status === 'PENDING').length)
const rejectedCount = computed(() => signatures.filter(s => s.status === 'REJECTED').length)
const signedCount = computed(() => signatures.filter(s => s.status === 'SIGNED').length)
const failedCount = computed(() => signatures.filter(s => s.status === 'FAILED').length)

const filteredSignatures = computed(() => statusFilter.value ? signatures.filter(s => s.status === statusFilter.value) : signatures)

function statusLabel(s: string) { return { PENDING: 'Kutilmoqda', SIGNED: 'Imzolangan', FAILED: 'Xatolik' }[s] || s }
function statusBadge(s: string) { return { PENDING: 'badge-warning', SIGNED: 'badge-success', FAILED: 'badge-danger' }[s] || 'badge-neutral' }
function statusIcon(s: string) { return { PENDING: 'bg-amber-500/10 text-amber-500', SIGNED: 'bg-emerald-500/10 text-emerald-500', FAILED: 'bg-red-500/10 text-red-500' }[s] || 'bg-ink-500/10 text-ink-500' }
</script>
