<template>
  <div class="space-y-5 animate-fade-up">
    <!-- ═══ Header ═══ -->
    <div class="flex items-center justify-between">
      <div>
        <div class="eyebrow">SYSTEM / NOTIFICATIONS</div>
        <h1 class="page-title">Bildirishnomalar</h1>
        <p class="text-sm text-ink-400 mt-1">Jami {{ notifications.length }} ta bildirishnoma · {{ unreadCount }} o'qilmagan</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="markAllRead" class="btn btn-secondary btn-sm">
          <CheckCheck :size="14" /> Barchasini o'qilgan
        </button>
      </div>
    </div>

    <!-- ═══ Filter Tabs ═══ -->
    <div class="flex gap-1 overflow-x-auto pb-1">
      <button
        v-for="tab in tabs" :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap"
        :class="activeTab === tab.id ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'bg-black/5 dark:bg-white/5 text-ink-500 hover:bg-black/10 dark:hover:bg-white/10'"
      >
        {{ tab.label }}
        <span class="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" :class="activeTab === tab.id ? 'bg-white/20' : 'bg-black/10 dark:bg-white/10'">{{ tab.count }}</span>
      </button>
    </div>

    <!-- ═══ Notifications List ═══ -->
    <div class="space-y-2">
      <div
        v-for="n in filteredNotifications" :key="n.id"
        class="card p-4 flex items-start gap-3 cursor-pointer transition-all hover:border-brand-500/30 hover:shadow-md"
        :class="!n.read ? 'border-l-4 border-l-brand-500' : ''"
        @click="markRead(n.id)"
      >
        <!-- Icon -->
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="iconBg(n.type)">
          <component :is="iconFor(n.type)" :size="18" :class="iconColor(n.type)" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-semibold text-ink-900 dark:text-white truncate">{{ n.title }}</h3>
            <span class="text-xs text-ink-400 flex-shrink-0">{{ n.time }}</span>
          </div>
          <p class="text-sm text-ink-400 mt-1 line-clamp-2">{{ n.message }}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="badge badge-neutral text-[10px]">{{ typeLabel(n.type) }}</span>
            <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500 animate-pulse-soft"></span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredNotifications.length === 0" class="empty-state">
        <div class="empty-state__icon">
          <Bell :size="32" />
        </div>
        <div class="empty-state__title">Bildirishnomalar yo'q</div>
        <div class="empty-state__text">Bu filtrda bildirishnomalar topilmadi</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Bell, FileText, Wallet, Wrench, Users, AlertCircle, CheckCheck, CheckCircle, Info
} from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

interface Notification {
  id: string; type: 'APPLICATION' | 'INVOICE' | 'SERVICE' | 'CONTRACT' | 'SYSTEM'; title: string; message: string; time: string; read: boolean
}

const activeTab = ref('all')

const notifications = ref<Notification[]>([
  { id: 'n1', type: 'INVOICE', title: 'Invoys INV-2026-052 tasdiqlandi', message: 'Digital Tashkent LLC tomonidan 3,600 USD to\'lov tasdiqlandi', time: '5 daq oldin', read: false },
  { id: 'n2', type: 'CONTRACT', title: 'Shartnoma imzolash kutilmoqda', message: 'APP-2026-005 shartnoma imzolanishini kutmoqda', time: '20 daq oldin', read: false },
  { id: 'n3', type: 'SERVICE', title: 'Servis so\'rov qabul qilindi', message: 'SR-2026-004 yangi servis so\'rov yuborildi', time: '1 soat oldin', read: false },
  { id: 'n4', type: 'CONTRACT', title: 'Shartnoma faol holatga o\'tdi', message: 'CTR-2026-002 faol holatga o\'tdi', time: '2 soat oldin', read: true },
  { id: 'n5', type: 'APPLICATION', title: 'Yangi ariza yuborildi', message: 'APP-2026-003 yangi ariza qabul qilindi', time: '3 soat oldin', read: true },
  { id: 'n6', type: 'INVOICE', title: 'Invoys muddati o\'tdi', message: 'INV-2026-049 to\'lov muddati o\'tgan', time: '5 soat oldin', read: true },
  { id: 'n7', type: 'SYSTEM', title: 'Tizim yangilanishi', message: 'MAKON v2.4 yangilanishi o\'rnatildi', time: '1 kun oldin', read: true },
  { id: 'n8', type: 'APPLICATION', title: 'Ariza rad etildi', message: 'APP-2026-010 ariza rad etildi', time: '2 kun oldin', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const tabs = computed(() => [
  { id: 'all', label: 'Barchasi', count: notifications.value.length },
  { id: 'unread', label: 'O\'qilmagan', count: unreadCount.value },
  { id: 'APPLICATION', label: 'Arizalar', count: notifications.value.filter(n => n.type === 'APPLICATION').length },
  { id: 'INVOICE', label: 'Invoyslar', count: notifications.value.filter(n => n.type === 'INVOICE').length },
  { id: 'CONTRACT', label: 'Shartnomalar', count: notifications.value.filter(n => n.type === 'CONTRACT').length },
  { id: 'SERVICE', label: 'Servis', count: notifications.value.filter(n => n.type === 'SERVICE').length },
])

const filteredNotifications = computed(() => {
  if (activeTab.value === 'all') return notifications.value
  if (activeTab.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value.filter(n => n.type === activeTab.value)
})

function markRead(id: string) {
  const n = notifications.value.find(x => x.id === id)
  if (n) n.read = true
}
function markAllRead() {
  notifications.value.forEach(n => n.read = true)
}

function iconFor(type: string) {
  return { APPLICATION: FileText, INVOICE: Wallet, SERVICE: Wrench, CONTRACT: Users, SYSTEM: Info }[type] || Bell
}
function iconBg(type: string) {
  return { APPLICATION: 'bg-blue-500/10', INVOICE: 'bg-emerald-500/10', SERVICE: 'bg-amber-500/10', CONTRACT: 'bg-purple-500/10', SYSTEM: 'bg-slate-500/10' }[type] || 'bg-slate-500/10'
}
function iconColor(type: string) {
  return { APPLICATION: 'text-blue-500', INVOICE: 'text-emerald-500', SERVICE: 'text-amber-500', CONTRACT: 'text-purple-500', SYSTEM: 'text-slate-500' }[type] || 'text-slate-500'
}
function typeLabel(type: string) {
  return { APPLICATION: 'Ariza', INVOICE: 'Invoys', SERVICE: 'Servis', CONTRACT: 'Shartnoma', SYSTEM: 'Tizim' }[type] || ''
}
</script>
