<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Bildirishnomalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ unreadCount }} o'qilmagan</p>
      </div>
      <button @click="markAllRead" class="btn btn-secondary btn-sm" v-if="notifications.length > 0">
        <CheckCheck :size="16" /> Hammasini o'qilgan deb belgilash
      </button>
    </div>

    <div class="space-y-2">
      <div v-for="n in notifications" :key="n.id"
        class="card p-4 flex items-start gap-3 transition-colors cursor-pointer"
        :class="!n.read ? 'border-brand-500/20 bg-brand-500/5' : ''"
        @click="n.read = true">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBg(n.type)">
          <component :is="iconFor(n.type)" :size="18" :class="iconColor(n.type)" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="font-medium text-sm">{{ n.title }}</span>
            <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
          </div>
          <p class="text-sm text-ink-400">{{ n.message }}</p>
          <div class="text-xs text-ink-600 mt-1">{{ timeAgo(n.createdAt) }}</div>
        </div>
      </div>

      <div v-if="notifications.length === 0" class="card p-12 text-center">
        <BellOff :size="32" class="mx-auto text-ink-600 mb-3" />
        <p class="text-ink-500">Bildirishnomalar yo'q</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BellOff, CheckCheck, FileText, Receipt, ShieldCheck, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

// Generate notifications from cabinet data
const config = useRuntimeConfig()
const baseUrl = config.public.apiBase as string
const { data } = await useAsyncData('cabinet-for-notifications', () =>
  $fetch<any>(`${baseUrl}/cabinetApi?action=profile`)
)

const notifications = ref<any[]>([])

watchEffect(() => {
  if (!data.value) return
  const notifs: any[] = []

  // From applications
  data.value.applications?.forEach((app: any) => {
    if (app.status === 'OFFER_SENT') {
      notifs.push({
        id: 'app-' + app.id,
        type: 'application',
        title: 'Taklif yuborildi',
        message: `${app.number} — ${app.applicantName} uchun taklif tayyor`,
        createdAt: app.createdDate,
        read: false,
      })
    }
    if (app.status === 'ERI_PENDING') {
      notifs.push({
        id: 'eri-' + app.id,
        type: 'eri',
        title: 'ERI imzo kutilmoqda',
        message: `${app.number} — shartnomani ERI orqali imzolash kerak`,
        createdAt: app.createdDate,
        read: false,
      })
    }
    if (app.status === 'REJECTED') {
      notifs.push({
        id: 'rej-' + app.id,
        type: 'alert',
        title: 'Ariza rad etildi',
        message: `${app.number} — ${app.rejectionReason || 'Sabab ko\'rsatilmagan'}`,
        createdAt: app.createdDate,
        read: false,
      })
    }
  })

  // From contracts
  data.value.contracts?.forEach((c: any) => {
    if (c.status === 'PENDING_SIGNATURE') {
      notifs.push({
        id: 'con-' + c.id,
        type: 'eri',
        title: 'Shartnoma imzolash',
        message: `${c.number} — ERI orqali imzolash kutilmoqda`,
        createdAt: c.startDate || new Date().toISOString(),
        read: false,
      })
    }
  })

  // From invoices
  data.value.invoices?.forEach((inv: any) => {
    if (inv.balance > 0) {
      notifs.push({
        id: 'inv-' + inv.id,
        type: 'invoice',
        title: 'To\'lanmagan invoys',
        message: `${inv.number} — qoldiq: ${inv.balance.toLocaleString('ru-RU')} so'm`,
        createdAt: inv.dueDate || new Date().toISOString(),
        read: false,
      })
    }
  })

  // From service requests
  data.value.serviceRequests?.forEach((sr: any) => {
    notifs.push({
      id: 'sr-' + sr.id,
      type: 'service',
      title: 'Xizmat so\'rovi yangilandi',
      message: `${sr.number} — ${sr.description?.slice(0, 60) || ''}`,
      createdAt: sr.createdDate,
      read: true,
    })
  })

  notifications.value = notifs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function markAllRead() {
  notifications.value.forEach(n => n.read = true)
}

function iconFor(type: string) {
  return { application: FileText, eri: ShieldCheck, invoice: Receipt, service: Wrench, alert: AlertTriangle, success: CheckCircle2 }[type] || BellOff
}
function iconBg(type: string) {
  return { application: 'bg-brand-500/10', eri: 'bg-emerald-500/10', invoice: 'bg-red-500/10', service: 'bg-amber-500/10', alert: 'bg-red-500/10', success: 'bg-emerald-500/10' }[type] || 'bg-ink-500/10'
}
function iconColor(type: string) {
  return { application: 'text-brand-400', eri: 'text-emerald-400', invoice: 'text-red-400', service: 'text-amber-400', alert: 'text-red-400', success: 'text-emerald-400' }[type] || 'text-ink-400'
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'hozir'
  if (mins < 60) return `${mins} daqiqa oldin`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} soat oldin`
  const days = Math.floor(hours / 24)
  return `${days} kun oldin`
}
</script>
