<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Bildirishnomalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ unreadCount }} o'qilmagan · {{ notifications.length }} jami</p>
      </div>
      <div class="flex gap-2">
        <select v-model="typeFilter" class="input w-auto">
          <option value="">Barcha turlari</option>
          <option value="application">Arizalar</option>
          <option value="eri">ERI imzo</option>
          <option value="invoice">To'lovlar</option>
          <option value="service">Xizmat</option>
          <option value="contract">Shartnoma</option>
        </select>
        <button @click="markAllRead" class="btn btn-secondary btn-sm" v-if="notifications.length > 0">
          <CheckCheck :size="16" /> Hammasini o'qilgan
        </button>
      </div>
    </div>

    <!-- Quick stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="card p-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center"><FileText :size="16" class="text-brand-500" /></div>
        <div><div class="text-xs text-ink-500">Arizalar</div><div class="font-bold">{{ countByType('application') }}</div></div>
      </div>
      <div class="card p-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center"><ShieldCheck :size="16" class="text-emerald-500" /></div>
        <div><div class="text-xs text-ink-500">ERI</div><div class="font-bold">{{ countByType('eri') }}</div></div>
      </div>
      <div class="card p-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center"><Receipt :size="16" class="text-red-500" /></div>
        <div><div class="text-xs text-ink-500">To'lovlar</div><div class="font-bold">{{ countByType('invoice') }}</div></div>
      </div>
      <div class="card p-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center"><Wrench :size="16" class="text-amber-500" /></div>
        <div><div class="text-xs text-ink-500">Xizmat</div><div class="font-bold">{{ countByType('service') }}</div></div>
      </div>
    </div>

    <!-- Notifications list -->
    <div class="space-y-2">
      <div v-for="n in filteredNotifications" :key="n.id"
        class="card p-4 flex items-start gap-3 transition-all cursor-pointer"
        :class="!n.read ? 'border-brand-500/20 bg-brand-500/5' : 'opacity-70'"
        @click="markRead(n)">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBg(n.type)">
          <component :is="iconFor(n.type)" :size="18" :class="iconColor(n.type)" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="font-medium text-sm">{{ n.title }}</span>
            <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
          </div>
          <p class="text-sm text-ink-500">{{ n.message }}</p>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-xs text-ink-500">{{ timeAgo(n.createdAt) }}</span>
            <NuxtLink v-if="n.link" :to="n.link" class="text-xs text-brand-500 hover:underline" @click.stop>Ochish →</NuxtLink>
          </div>
        </div>
        <button v-if="!n.read" @click.stop="markRead(n)" class="btn btn-ghost btn-sm text-xs">O'qildi</button>
      </div>

      <div v-if="filteredNotifications.length === 0" class="card p-12 text-center">
        <BellOff :size="32" class="mx-auto text-ink-500 mb-3" />
        <p class="text-ink-500">Bildirishnomalar yo'q</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellOff, CheckCheck, FileText, Receipt, ShieldCheck, Wrench, AlertTriangle, CheckCircle2, FileSignature, Building2, User } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const typeFilter = ref('')

const notifications = ref([
  { id: 'n1', type: 'eri', title: 'ERI imzo kutilmoqda', message: 'CTR-2026-003 shartnomasini ERI orqali imzolash kerak', createdAt: '2026-08-10T11:30:00', read: false, link: '/eri/signatures' },
  { id: 'n2', type: 'application', title: 'Yangi ariza kelib tushdi', message: 'APP-2026-012 · ABC Logistics MChJ · A-301 Tashkent City', createdAt: '2026-08-10T10:15:00', read: false, link: '/management/applications' },
  { id: 'n3', type: 'invoice', title: 'To\'lanmagan invoys', message: 'INV-2026-045 · Qoldiq: 12,500,000 so\'m · Muddati o\'tgan', createdAt: '2026-08-10T09:00:00', read: false, link: '/finance/debts' },
  { id: 'n4', type: 'service', title: 'Xizmat so\'rovi yangilandi', message: 'SR-2026-012 · Elektrika · Bajarilmoqda — Sardor Yusupov', createdAt: '2026-08-09T16:45:00', read: false, link: '/facility/work-orders' },
  { id: 'n5', type: 'eri', title: 'ERI imzo kutilmoqda', message: 'CTR-2026-005 · ABC Logistics MChJ imzosi kutilmoqda', createdAt: '2026-08-09T14:20:00', read: false, link: '/eri/signatures' },
  { id: 'n6', type: 'contract', title: 'Shartnoma faollashtirildi', message: 'CTR-2026-001 · ABC Logistics MChJ · A-301 · 12 oy', createdAt: '2026-08-09T12:00:00', read: true, link: '/contracts' },
  { id: 'n7', type: 'application', title: 'Ariza rad etildi', message: 'APP-2026-009 · Moliyaviy ko\'rsatmalar mos kelmadi', createdAt: '2026-08-08T15:30:00', read: true, link: '/management/applications' },
  { id: 'n8', type: 'invoice', title: 'To\'lov qabul qilindi', message: 'INV-2026-041 · 15,000,000 so\'m to\'landi', createdAt: '2026-08-08T11:00:00', read: true, link: '/finance/invoices' },
  { id: 'n9', type: 'service', title: 'Xizmat so\'rovi yopildi', message: 'SR-2026-008 · Sanitariya · Bajarildi · Reyting: 5/5', createdAt: '2026-08-07T18:00:00', read: true, link: '/facility/work-orders' },
  { id: 'n10', type: 'contract', title: 'Shartnoma muddati tugayapti', message: 'CTR-2025-098 · 30 kun qoldi · Export Group MChJ', createdAt: '2026-08-07T10:00:00', read: true, link: '/contracts' },
  { id: 'n11', type: 'application', title: 'Tijoriy taklif tayyor', message: 'APP-2026-011 · v2 taklif yaratildi · Imzolash kutilmoqda', createdAt: '2026-08-06T14:00:00', read: true, link: '/applications' },
  { id: 'n12', type: 'invoice', title: 'Yangi invoys yaratildi', message: 'INV-2026-052 · 25,000,000 so\'m · Avg 2026', createdAt: '2026-08-06T09:00:00', read: true, link: '/finance/invoices' },
])

const filteredNotifications = computed(() => {
  if (!typeFilter.value) return notifications.value
  return notifications.value.filter(n => n.type === typeFilter.value)
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function countByType(type: string) { return notifications.value.filter(n => n.type === type).length }

function markAllRead() { notifications.value.forEach(n => n.read = true) }
function markRead(n: any) { n.read = true }

function iconFor(type: string) {
  return { application: FileText, eri: ShieldCheck, invoice: Receipt, service: Wrench, alert: AlertTriangle, success: CheckCircle2, contract: FileSignature }[type] || BellOff
}
function iconBg(type: string) {
  return { application: 'bg-brand-500/10', eri: 'bg-emerald-500/10', invoice: 'bg-red-500/10', service: 'bg-amber-500/10', alert: 'bg-red-500/10', success: 'bg-emerald-500/10', contract: 'bg-brand-500/10' }[type] || 'bg-ink-500/10'
}
function iconColor(type: string) {
  return { application: 'text-brand-500', eri: 'text-emerald-500', invoice: 'text-red-500', service: 'text-amber-500', alert: 'text-red-500', success: 'text-emerald-500', contract: 'text-brand-500' }[type] || 'text-ink-500'
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'hozir'
  if (mins < 60) return mins + ' daqiqa oldin'
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours + ' soat oldin'
  const days = Math.floor(hours / 24)
  return days + ' kun oldin'
}
</script>
