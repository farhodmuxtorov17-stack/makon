<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Mening kabinetim</h1>
        <p class="text-ink-500 text-sm mt-1">{{ org.name }} · STIR: {{ org.tin }}</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi ariza
      </NuxtLink>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Layers :size="20" class="text-indigo-500" /></div>
        </div>
        <div class="text-2xl font-bold">{{ units.length }}</div>
        <div class="text-xs text-ink-500">Mening unitlarim</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><ScrollText :size="20" class="text-emerald-500" /></div>
          <span class="badge badge-success text-xs">Faol</span>
        </div>
        <div class="text-2xl font-bold">{{ activeContracts }}</div>
        <div class="text-xs text-ink-500">Faol shartnomalar</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><FileText :size="20" class="text-amber-500" /></div>
          <span class="badge badge-warning text-xs">{{ pendingApps }}</span>
        </div>
        <div class="text-2xl font-bold">{{ pendingApps }}</div>
        <div class="text-xs text-ink-500">Kutilayotgan arizalar</div>
      </div>
      <div class="card p-5">
        <div class="flex items-center justify-between mb-2">
          <div class="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><Wallet :size="20" class="text-red-500" /></div>
        </div>
        <div class="text-2xl font-bold text-red-500">{{ formatMoney(debt) }}</div>
        <div class="text-xs text-ink-500">Qarzdorlik</div>
      </div>
    </div>

    <!-- My Units -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Mening unitlarim</h3>
        <NuxtLink to="/cabinet/units" class="text-sm text-brand-500 hover:underline">Barchasini korish</NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="unit in units" :key="unit.id" class="p-4 rounded-2xl border border-black/5 dark:border-white/5 hover:border-brand-500/20 transition-all">
          <div class="flex items-start justify-between mb-3">
            <div>
              <div class="font-medium text-sm">{{ unit.name }}</div>
              <div class="text-xs text-ink-500">{{ unit.building }} · {{ unit.floor }}-qavat</div>
            </div>
            <span class="badge" :class="unit.type === 'RENT' ? 'badge-brand' : 'badge-success'">{{ unit.type === 'RENT' ? 'Ijara' : 'Mulk' }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div><span class="text-ink-500">Maydon:</span> {{ unit.area }} m²</div>
            <div><span class="text-ink-500">Shartnoma:</span> {{ unit.contractEnd }}</div>
          </div>
          <div class="mt-3 flex gap-2">
            <NuxtLink :to="`/cabinet/units`" class="btn btn-ghost btn-sm flex-1">Tafsilot</NuxtLink>
            <NuxtLink :to="`/cabinet/services`" class="btn btn-ghost btn-sm flex-1">Hisob</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Applications -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">So\'nggi arizalar</h3>
        <NuxtLink to="/cabinet/applications" class="text-sm text-brand-500 hover:underline">Barchasini korish</NuxtLink>
      </div>
      <div class="space-y-3">
        <div v-for="app in applications" :key="app.id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-black/3 dark:hover:bg-white/3 transition-all">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold" :class="appStatusClass(app.status)">
            {{ app.number.slice(-3) }}
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium">{{ app.number }} · {{ app.unit }}</div>
            <div class="text-xs text-ink-500">{{ app.type === 'RENT' ? 'Ijara' : 'Sotib olish' }} · {{ formatMoney(app.price) }}</div>
          </div>
          <span class="badge text-xs" :class="appStatusBadge(app.status)">{{ appStatusLabel(app.status) }}</span>
          <NuxtLink :to="`/cabinet/applications`" class="btn btn-ghost btn-sm">
            <ChevronRight :size="16" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Open Service Requests -->
    <div class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">Ochiq servis so\'rovlari</h3>
        <NuxtLink to="/cabinet/service-requests/new" class="btn btn-secondary btn-sm">
          <Plus :size="14" /> Yangi so\'rov
        </NuxtLink>
      </div>
      <div class="space-y-3">
        <div v-for="sr in serviceRequests" :key="sr.id" class="flex items-center gap-4 p-3 rounded-xl hover:bg-black/3 dark:hover:bg-white/3 transition-all">
          <div class="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Wrench :size="18" class="text-amber-500" />
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium">{{ sr.number }} · {{ sr.category }}</div>
            <div class="text-xs text-ink-500">{{ sr.unit }} · {{ sr.date }}</div>
          </div>
          <span class="badge text-xs" :class="srBadgeClass(sr.status)">{{ srStatusLabel(sr.status) }}</span>
        </div>
        <div v-if="serviceRequests.length === 0" class="text-center py-6 text-ink-500 text-sm">
          Ochiq so\'rovlar yo\'q
        </div>
      </div>
    </div>

    <!-- Recent Notifications -->
    <div class="card p-6">
      <h3 class="font-semibold mb-4">So\'nggi bildirishnomalar</h3>
      <div class="space-y-2">
        <div v-for="n in notifications" :key="n.id" class="flex items-center gap-3 p-3 rounded-xl" :class="!n.read ? 'bg-brand-500/5' : ''">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="n.icon_bg">
            <component :is="n.icon" :size="16" :class="n.icon_color" />
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium" :class="!n.read ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ n.title }}</div>
            <div class="text-xs text-ink-500">{{ n.time }}</div>
          </div>
          <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Layers, ScrollText, FileText, Wallet, ChevronRight, Wrench, Bell, Receipt, CheckCircle2, AlertCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const org = { name: 'ABC Logistics MChJ', tin: '308745612' }

const units = ref([
  { id: 'u1', name: 'A-301', building: 'Tashkent City', floor: 3, area: 85, type: 'RENT', contractEnd: '2027-03-15' },
  { id: 'u2', name: 'B-205', building: 'Trillent Tower', floor: 2, area: 120, type: 'RENT', contractEnd: '2026-12-01' },
  { id: 'u3', name: 'C-101', building: 'IT Park', floor: 1, area: 45, type: 'OWNED', contractEnd: '-' },
])

const applications = ref([
  { id: 'a1', number: 'APP-2026-001', unit: 'A-301 Tashkent City', type: 'RENT', price: 25000000, status: 'FINANCE_REVIEW' },
  { id: 'a2', number: 'APP-2026-002', unit: 'D-401 Piramit', type: 'SALE', price: 850000000, status: 'SIGNED' },
  { id: 'a3', number: 'APP-2026-003', unit: 'E-102 Trillent', type: 'RENT', price: 18000000, status: 'SUBMITTED' },
])

const serviceRequests = ref([
  { id: 'sr1', number: 'SR-2026-004', category: 'Elektr', unit: 'A-301', date: '2 kun oldin', status: 'IN_PROGRESS' },
  { id: 'sr2', number: 'SR-2026-005', category: 'Sanitariya', unit: 'B-205', date: '5 kun oldin', status: 'ASSIGNED' },
])

const notifications = ref([
  { id: 'n1', title: 'Invoys INV-2026-001 tasdiqlandi', time: '1 soat oldin', read: false, icon: Receipt, icon_bg: 'bg-emerald-500/10', icon_color: 'text-emerald-500' },
  { id: 'n2', title: 'Shartnoma CTR-2026-002 imzolash kutilmoqda', time: '3 soat oldin', read: false, icon: AlertCircle, icon_bg: 'bg-amber-500/10', icon_color: 'text-amber-500' },
  { id: 'n3', title: 'Servis so\'rov SR-2026-004 qabul qilindi', time: '1 kun oldin', read: true, icon: CheckCircle2, icon_bg: 'bg-blue-500/10', icon_color: 'text-blue-500' },
])

const activeContracts = computed(() => units.value.filter(u => u.type === 'RENT').length)
const pendingApps = computed(() => applications.value.filter(a => !['SIGNED', 'ACTIVE', 'REJECTED'].includes(a.status)).length)
const debt = computed(() => 4200000)

function formatMoney(v: number) { return new Intl.NumberFormat('ru-RU').format(v) + ' so\'m' }
function appStatusLabel(s: string) { return { SUBMITTED: 'Yuborilgan', OPERATION_REVIEW: 'Operatsion', FINANCE_REVIEW: 'Moliyaviy', FINANCE_APPROVED: 'Moliya tasdiq', DRAFT_READY: 'Loyiha tayyor', PARTIALLY_SIGNED: 'Qisman imzo', SIGNED: 'Imzolangan', ACTIVE: 'Faol', REJECTED: 'Rad etilgan' }[s] || s }
function appStatusBadge(s: string) { return { SUBMITTED: 'badge-neutral', OPERATION_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-brand', FINANCE_APPROVED: 'badge-brand', DRAFT_READY: 'badge-warning', PARTIALLY_SIGNED: 'badge-warning', SIGNED: 'badge-success', ACTIVE: 'badge-success', REJECTED: 'badge-danger' }[s] || 'badge-neutral' }
function appStatusClass(s: string) { return { SUBMITTED: 'bg-zinc-500/10 text-zinc-500', FINANCE_REVIEW: 'bg-blue-500/10 text-blue-500', SIGNED: 'bg-emerald-500/10 text-emerald-500' }[s] || 'bg-zinc-500/10 text-zinc-500' }
function srStatusLabel(s: string) { return { NEW: 'Yangi', ASSIGNED: 'Taqsimlangan', IN_PROGRESS: 'Bajarilmoqda', COMPLETED: 'Tugatilgan', VERIFIED: 'Tasdiqlangan', CLOSED: 'Yopilgan' }[s] || s }
function srBadgeClass(s: string) { return { NEW: 'badge-neutral', ASSIGNED: 'badge-brand', IN_PROGRESS: 'badge-warning', COMPLETED: 'badge-success', VERIFIED: 'badge-success', CLOSED: 'badge-neutral' }[s] || 'badge-neutral' }
</script>
