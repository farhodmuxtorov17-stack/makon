
<template>
  <div class="space-y-6">
    <NuxtLink to="/finance/contracts" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Shartnomalarga qaytish
    </NuxtLink>

    <div v-if="contract" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <span class="font-mono text-sm text-ink-500">{{ contract.number }}</span>
              <h1 class="font-display text-2xl font-bold mt-1">{{ contract.tenantName }}</h1>
              <p class="text-sm text-ink-400 mt-1">{{ contract.type === 'RENT' ? 'Ijara shartnomasi' : 'Sotuv shartnomasi' }}</p>
            </div>
            <StatusBadge :status="contract.status" :variant="contractVariant(contract.status)" :label="contractLabel(contract.status)" dot />
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Oylik to'lov</p>
              <p class="font-semibold mt-0.5">{{ formatPrice(contract.monthlyRent) }} so'm</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Depozit</p>
              <p class="font-semibold mt-0.5">{{ formatPrice(contract.depositAmount) }} so'm</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Boshlanish</p>
              <p class="font-semibold mt-0.5">{{ contract.startDate }}</p>
            </div>
            <div class="p-3 rounded-xl bg-ink-50">
              <p class="text-ink-400 text-xs">Tugash</p>
              <p class="font-semibold mt-0.5">{{ contract.endDate }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Invoyslar</h3>
          <div class="space-y-2">
            <div v-for="inv in contractInvoices" :key="inv.id" class="flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-ink-50 transition-colors">
              <div class="w-9 h-9 rounded-lg bg-ink-100 flex items-center justify-center">
                <Receipt :size="16" class="text-ink-500" />
              </div>
              <div class="flex-1">
                <p class="font-mono text-sm font-semibold text-ink-900">{{ inv.number }}</p>
                <p class="text-xs text-ink-400">{{ inv.period }} · Muddat: {{ inv.dueDate }}</p>
              </div>
              <p class="font-semibold text-sm">{{ formatPrice(inv.amount) }} so'm</p>
              <StatusBadge :status="inv.status" :variant="inv.status === 'PAID' ? 'success' : inv.status === 'OVERDUE' ? 'danger' : inv.status === 'PARTIAL' ? 'info' : 'warning'"
                :label="inv.status === 'PAID' ? 'To\'langan' : inv.status === 'OVERDUE' ? 'Muddati o\'tdi' : inv.status === 'PARTIAL' ? 'Qisman' : 'Kutilmoqda'" dot />
            </div>
            <div v-if="contractInvoices.length === 0" class="text-center py-6 text-ink-400 text-sm">Invoyslar yo'q</div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="font-semibold mb-4">ERI imzo</h3>
          <div v-if="contract.signedByErI" class="space-y-3">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50">
              <CheckCircle2 :size="20" class="text-emerald-600" />
              <div>
                <p class="font-medium text-sm text-emerald-900">Imzolangan</p>
                <p class="text-xs text-emerald-600">{{ contract.eriSigningDate }}</p>
              </div>
            </div>
            <a v-if="contract.eriSigningUrl" :href="contract.eriSigningUrl" target="_blank" class="btn btn-outline btn-sm w-full">
              <ExternalLink :size="14" /> Hujjatni ko'rish
            </a>
          </div>
          <div v-else class="space-y-3">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-amber-50">
              <Clock :size="20" class="text-amber-600" />
              <div>
                <p class="font-medium text-sm text-amber-900">Imzolanmagan</p>
                <p class="text-xs text-amber-600">ERI imzo kutilmoqda</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm w-full" @click="sendErI">ERI imzoga yuborish</button>
          </div>
        </div>

        <div class="card p-5">
          <h3 class="font-semibold mb-4">Amallar</h3>
          <div class="space-y-2">
            <button class="btn btn-outline btn-lg w-full justify-between">
              <span class="flex items-center gap-2"><FileText :size="16" /> Invoys yaratish</span>
              <ChevronRight :size="16" class="text-ink-400" />
            </button>
            <button class="btn btn-outline btn-lg w-full justify-between">
              <span class="flex items-center gap-2"><Download :size="16" /> Eksport PDF</span>
              <ChevronRight :size="16" class="text-ink-400" />
            </button>
            <button v-if="contract.status === 'ACTIVE'" class="btn btn-ghost btn-lg w-full text-rose-600 justify-between">
              <span class="flex items-center gap-2"><XCircle :size="16" /> Shartnomani bekor qilish</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card p-12">
      <BaseEmptyState title="Shartnoma topilmadi" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { ArrowLeft, Receipt, CheckCircle2, Clock, ExternalLink, FileText, Download, ChevronRight, XCircle } from 'lucide-vue-next'
import type { ContractStatus } from '~/types'

const route = useRoute()
const financeStore = useFinanceStore()
const toast = useToast()
onMounted(() => financeStore.initMockData())

const contract = computed(() => financeStore.contracts.find(c => c.id === route.params.id))
const contractInvoices = computed(() => financeStore.invoices.filter(i => i.contractId === route.params.id))

function sendErI() {
  toast.success('ERI imzo yuborildi', 'Ijarachi notification qabul qiladi')
}

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  return v.toLocaleString('ru')
}
function contractLabel(s: ContractStatus): string {
  const m: Record<string, string> = { ACTIVE: 'Aktiv', PENDING_SIGN: 'Imzolanmagan', SIGNED: 'Imzolangan', EXPIRED: "Muddati o'tgan", DRAFT: 'Qoralama', TERMINATED: 'Bekor' }
  return m[s] || s
}
function contractVariant(s: ContractStatus): string {
  const m: Record<string, string> = { ACTIVE: 'success', PENDING_SIGN: 'warning', SIGNED: 'info', EXPIRED: 'neutral', DRAFT: 'neutral', TERMINATED: 'danger' }
  return m[s] || 'neutral'
}
</script>
