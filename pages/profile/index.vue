<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Kabinet</h1>
        <p class="text-ink-500 text-sm mt-1">Shaxsiy ma'lumotlar va arizalar</p>
      </div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="card p-4 text-center">
          <FileText :size="20" class="mx-auto text-brand-400 mb-2" />
          <div class="text-2xl font-bold">{{ data.stats.totalApplications }}</div>
          <div class="text-xs text-ink-500">Jami arizalar</div>
        </div>
        <div class="card p-4 text-center">
          <Clock :size="20" class="mx-auto text-amber-400 mb-2" />
          <div class="text-2xl font-bold">{{ data.stats.activeApplications }}</div>
          <div class="text-xs text-ink-500">Faol arizalar</div>
        </div>
        <div class="card p-4 text-center">
          <FileCheck2 :size="20" class="mx-auto text-emerald-400 mb-2" />
          <div class="text-2xl font-bold">{{ data.stats.activeContracts }}</div>
          <div class="text-xs text-ink-500">Faol shartnomalar</div>
        </div>
        <div class="card p-4 text-center">
          <Receipt :size="20" class="mx-auto text-red-400 mb-2" />
          <div class="text-2xl font-bold">{{ data.stats.unpaidInvoices }}</div>
          <div class="text-xs text-ink-500">To'lanmagan</div>
        </div>
        <div class="card p-4 text-center">
          <Wrench :size="20" class="mx-auto text-orange-400 mb-2" />
          <div class="text-2xl font-bold">{{ data.stats.openServiceRequests }}</div>
          <div class="text-xs text-ink-500">Xizmat so'rovi</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
          class="px-3 py-1.5 rounded-lg text-sm transition-all"
          :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-400' : 'text-ink-500 hover:text-white'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Applications tab -->
      <div v-if="activeTab === 'applications'" class="space-y-3">
        <div v-for="app in data.applications" :key="app.id" class="card p-4">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-400">
                {{ app.applicantName?.charAt(0) }}
              </div>
              <div>
                <div class="font-medium">{{ app.applicantName }}</div>
                <div class="text-xs text-ink-500">{{ app.number }} · {{ formatDate(app.createdDate) }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-right">
                <div class="text-sm font-semibold">{{ formatPrice(app.offeredPrice, app.currency) }}</div>
                <div v-if="app.durationMonths" class="text-xs text-ink-500">{{ app.durationMonths }} oy</div>
              </div>
              <span class="badge" :class="statusBadge(app.status)">{{ statusLabel(app.status) }}</span>
            </div>
          </div>
          <div v-if="app.notes" class="mt-3 pt-3 border-t border-white/5 text-sm text-ink-500">{{ app.notes }}</div>
          <div v-if="app.rejectionReason" class="mt-3 pt-3 border-t border-white/5 text-sm text-red-400">Rad etish sababi: {{ app.rejectionReason }}</div>
        </div>
        <div v-if="data.applications.length === 0" class="card p-12 text-center text-ink-500">Arizalar yo'q</div>
      </div>

      <!-- Contracts tab -->
      <div v-if="activeTab === 'contracts'" class="space-y-3">
        <div v-for="c in data.contracts" :key="c.id" class="card p-5">
          <div class="flex items-start justify-between mb-4">
            <div>
              <div class="font-mono text-xs text-ink-500 mb-1">{{ c.number }}</div>
              <div class="font-medium">{{ c.tenantName }}</div>
              <div class="text-sm text-ink-500 mt-1">{{ formatDate(c.startDate) }} — {{ formatDate(c.endDate) }}</div>
            </div>
            <span class="badge" :class="contractBadge(c.status)">{{ contractLabel(c.status) }}</span>
          </div>
          <div class="grid grid-cols-3 gap-3 text-sm">
            <div>
              <div class="text-xs text-ink-600">Oylik to'lov</div>
              <div class="font-semibold">{{ formatPrice(c.monthlyRent, c.currency) }}</div>
            </div>
            <div>
              <div class="text-xs text-ink-600">Garov puli</div>
              <div class="font-semibold">{{ formatPrice(c.deposit, c.currency) }}</div>
            </div>
            <div>
              <div class="text-xs text-ink-600">Versiya</div>
              <div class="font-semibold">v{{ c.version || 1 }}</div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
            <button v-if="c.status === 'PENDING_SIGNATURE'" @click="signContract(c)" class="btn btn-primary btn-sm" :disabled="signing === c.id">
              <ShieldCheck :size="14" /> {{ signing === c.id ? 'Imzolanmoqda...' : 'ERI orqali imzolash' }}
            </button>
            <a v-if="c.pdfUrl" :href="c.pdfUrl" target="_blank" class="btn btn-ghost btn-sm">
              <FileText :size="14" /> PDF ko'rish
            </a>
            <div v-if="c.eriDocumentId" class="text-xs text-emerald-400 ml-auto font-mono">ERI: {{ c.eriDocumentId.slice(0, 20) }}...</div>
          </div>
        </div>
        <div v-if="data.contracts.length === 0" class="card p-12 text-center text-ink-500">Faol shartnomalar yo'q</div>
      </div>

      <!-- Invoices tab -->
      <div v-if="activeTab === 'invoices'" class="space-y-3">
        <div v-for="inv in data.invoices" :key="inv.id" class="card p-4 flex items-center justify-between">
          <div>
            <div class="font-mono text-xs text-ink-500">{{ inv.number }}</div>
            <div class="text-sm text-ink-400">{{ inv.period }}</div>
          </div>
          <div class="text-right">
            <div class="font-semibold">{{ formatPrice(inv.amount, inv.currency) }}</div>
            <div v-if="inv.balance > 0" class="text-sm text-red-400">Qoldiq: {{ formatPrice(inv.balance, inv.currency) }}</div>
          </div>
          <span class="badge" :class="inv.balance > 0 ? 'badge-danger' : 'badge-success'">{{ inv.balance > 0 ? 'To\'lanmagan' : 'To\'langan' }}</span>
        </div>
        <div v-if="data.invoices.length === 0" class="card p-12 text-center text-ink-500">Invoyslar yo'q 🎉</div>
      </div>

      <!-- Service requests tab -->
      <div v-if="activeTab === 'services'" class="space-y-3">
        <div v-for="sr in data.serviceRequests" :key="sr.id" class="card p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg flex items-center justify-center" :class="priorityBg(sr.priority)">
                <Wrench :size="16" :class="priorityColor(sr.priority)" />
              </div>
              <div>
                <div class="font-mono text-xs text-ink-500">{{ sr.number }}</div>
                <div class="text-sm font-medium">{{ categoryLabel(sr.category) }}</div>
              </div>
            </div>
            <span class="badge" :class="srBadge(sr.status)">{{ srLabel(sr.status) }}</span>
          </div>
          <p class="text-sm text-ink-400 mt-2">{{ sr.description }}</p>
          <div class="mt-2 flex items-center gap-3 text-xs text-ink-600">
            <span>{{ formatDate(sr.createdDate) }}</span>
            <span v-if="sr.slaDueAt">· SLA: {{ formatDate(sr.slaDueAt) }}</span>
          </div>
        </div>
        <div v-if="data.serviceRequests.length === 0" class="card p-12 text-center text-ink-500">Faol so'rovlar yo'q</div>
      </div>

      <!-- New service request form -->
      <div v-if="activeTab === 'new-request'" class="card p-6 max-w-2xl">
        <h3 class="font-semibold mb-4">Yangi xizmat so'rovi</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Kategoriya</label>
            <select v-model="newRequest.category" class="input">
              <option value="PLUMBING">Sanitariya</option>
              <option value="ELECTRICAL">Elektrika</option>
              <option value="HVAC">Konditsioner</option>
              <option value="CLEANING">Tozalash</option>
              <option value="STRUCTURAL">Konstruksiya</option>
              <option value="SECURITY">Xavfsizlik</option>
              <option value="OTHER">Boshqa</option>
            </select>
          </div>
          <div>
            <label class="label">Prioritet</label>
            <select v-model="newRequest.priority" class="input">
              <option value="LOW">Past</option>
              <option value="MEDIUM">O'rta</option>
              <option value="HIGH">Yuqori</option>
              <option value="URGENT">Shoshilinch</option>
            </select>
          </div>
          <div>
            <label class="label">Tavsif</label>
            <textarea v-model="newRequest.description" class="input" rows="4" placeholder="Muammoni batafsil tavsiflang..."></textarea>
          </div>
          <button @click="submitServiceRequest" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'Yuborilmoqda...' : 'So\'rov yuborish' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { FileText, Clock, FileCheck2, Receipt, Wrench, ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const baseUrl = config.public.apiBase as string

const { data, pending } = await useAsyncData('cabinet', () =>
  $fetch<any>(`${baseUrl}/cabinetApi?action=profile`)
)

const activeTab = ref('applications')
const signing = ref<string | null>(null)
const submitting = ref(false)

const tabs = [
  { value: 'applications', label: 'Arizalar' },
  { value: 'contracts', label: 'Shartnomalar' },
  { value: 'invoices', label: 'Invoyslar' },
  { value: 'services', label: 'Xizmatlar' },
  { value: 'new-request', label: '+ Yangi so\'rov' },
]

const newRequest = reactive({
  category: 'PLUMBING',
  priority: 'MEDIUM',
  description: '',
})

async function signContract(c: any) {
  signing.value = c.id
  try {
    const res = await $fetch<any>(`${baseUrl}/cabinetApi?action=sign-contract`, {
      method: 'POST',
      body: { contractId: c.id },
    })
    if (res.success) {
      c.status = 'ACTIVE'
      c.eriDocumentId = res.contract.eriDocumentId
    }
  } catch (e) {
    console.error(e)
  }
  signing.value = null
}

async function submitServiceRequest() {
  if (!newRequest.description) return
  submitting.value = true
  try {
    const res = await $fetch<any>(`${baseUrl}/cabinetApi?action=create-service-request`, {
      method: 'POST',
      body: newRequest,
    })
    if (res.success) {
      newRequest.description = ''
      activeTab.value = 'services'
      await refreshNuxtData('cabinet')
    }
  } catch (e) {
    console.error(e)
  }
  submitting.value = false
}

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusBadge(s: string) {
  return { NEW: 'badge-neutral', PENDING: 'badge-warning', BUILDING_REVIEW: 'badge-warning', FINANCE_REVIEW: 'badge-brand', OFFER_SENT: 'badge-brand', ERI_PENDING: 'badge-warning', APPROVED: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral'
}
function statusLabel(s: string) {
  return { NEW: 'Yangi', PENDING: 'Kutilmoqda', BUILDING_REVIEW: 'Bino ko\'rib chiqish', FINANCE_REVIEW: 'Moliya', OFFER_SENT: 'Taklif yuborildi', ERI_PENDING: 'ERI kutilmoqda', APPROVED: 'Tasdiqlandi', REJECTED: 'Rad etildi' }[s] || s
}
function contractBadge(s: string) {
  return { ACTIVE: 'badge-success', PENDING_SIGNATURE: 'badge-brand', DRAFT: 'badge-warning' }[s] || 'badge-neutral'
}
function contractLabel(s: string) {
  return { ACTIVE: 'Faol', PENDING_SIGNATURE: 'Imzo kutilmoqda', DRAFT: 'Qoralama' }[s] || s
}
function srBadge(s: string) {
  return { OPEN: 'badge-warning', IN_PROGRESS: 'badge-brand', COMPLETED: 'badge-success', RESOLVED: 'badge-success' }[s] || 'badge-neutral'
}
function srLabel(s: string) {
  return { OPEN: 'Ochiq', IN_PROGRESS: 'Jarayonda', COMPLETED: 'Yakunlandi', RESOLVED: 'Hal qilindi' }[s] || s
}
function priorityBg(p: string) {
  return { LOW: 'bg-ink-500/10', MEDIUM: 'bg-amber-500/10', HIGH: 'bg-orange-500/10', URGENT: 'bg-red-500/10' }[p] || 'bg-ink-500/10'
}
function priorityColor(p: string) {
  return { LOW: 'text-ink-400', MEDIUM: 'text-amber-400', HIGH: 'text-orange-400', URGENT: 'text-red-400' }[p] || 'text-ink-400'
}
function categoryLabel(c: string) {
  return { PLUMBING: 'Sanitariya', ELECTRICAL: 'Elektrika', HVAC: 'Konditsioner', CLEANING: 'Tozalash', STRUCTURAL: 'Konstruksiya', SECURITY: 'Xavfsizlik', OTHER: 'Boshqa' }[c] || c
}
</script>
