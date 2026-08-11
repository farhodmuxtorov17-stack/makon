<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Bildirishnomalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ unreadCount }} o'qilmagan · {{ notifications.length }} jami</p>
      </div>
      <div class="flex items-center gap-2">
        <select v-model="typeFilter" class="text-sm border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-200">
          <option value="">Barcha turlari</option>
          <option value="application">Arizalar</option>
          <option value="eri">ERI imzo</option>
          <option value="invoice">To'lovlar</option>
          <option value="service">Servis</option>
          <option value="contract">Shartnoma</option>
        </select>
        <button @click="markAllRead" v-if="unreadCount > 0" class="btn btn-secondary btn-sm">
          <CheckCheck :size="14" /> Hammasini o'qildi
        </button>
      </div>
    </div>

    <!-- Notifications -->
    <div class="card-premium p-5">
      <div class="space-y-2">
        <div v-for="n in filteredNotifications" :key="n.id"
          class="notif-row"
          :class="{ 'notif-row--unread': !n.read }"
          @click="n.read = true"
        >
          <div class="notif-row__icon" :class="iconBg(n.type)">
            <component :is="iconComp(n.type)" :size="16" :class="iconColor(n.type)" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="text-sm font-medium" :class="!n.read ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ n.title }}</div>
                <div class="text-xs text-ink-400 mt-0.5">{{ n.desc }}</div>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-xs text-ink-400">{{ n.time }}</span>
                <span v-if="!n.read" class="w-2 h-2 rounded-full bg-brand-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredNotifications.length === 0" class="py-12 text-center">
        <BellOff :size="32" class="text-ink-300 mx-auto mb-2" />
        <p class="text-ink-500 text-sm">Bildirishnomalar yo'q</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCheck, BellOff, Receipt, AlertCircle, CheckCircle2, Wrench, FileText, ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const typeFilter = ref('')

const notifications = ref([
  { id: '1', type: 'invoice', title: 'Invoys INV-2026-052 tasdiqlandi', desc: '25.0M so\'m · Unit A-301 Tashkent City', time: '5 daq oldin', read: false },
  { id: '2', type: 'eri', title: 'Shartnoma CTR-2026-010 imzolash kutilmoqda', desc: 'Bino egasi ERI imzosi kutilmoqda', time: '20 daq oldin', read: false },
  { id: '3', type: 'service', title: 'Servis so\'rov SR-2026-004 qabul qilindi', desc: 'Elektr ta\'miri · A-301', time: '1 soat oldin', read: false },
  { id: '4', type: 'contract', title: 'Shartnoma CTR-2026-002 faol holatga o\'tdi', desc: 'Global Trade MChJ · 12 oylik ijara', time: '2 soat oldin', read: false },
  { id: '5', type: 'application', title: 'Yangi ariza APP-2026-003 yuborildi', desc: 'E-102 Trillant Tower · Ijara', time: '3 soat oldin', read: true },
  { id: '6', type: 'invoice', title: 'Invoys INV-2026-046 muddati o\'tdi', desc: '35.0M so\'m · Unit B-205', time: '5 soat oldin', read: true },
  { id: '7', type: 'eri', title: 'ERI sertifikati muddati yaqinlashmoqda', desc: 'ABC Logistics MChJ · 30 kun qoldi', time: '1 kun oldin', read: true },
  { id: '8', type: 'service', title: 'Work order WO-2026-038 yakunlandi', desc: 'Konditsioner ta\'miri · A-301', time: '1 kun oldin', read: true },
  { id: '9', type: 'contract', title: 'Shartnoma CTR-2025-098 muddati tugadi', desc: 'Logistics Plus · A-205 Tashkent City', time: '2 kun oldin', read: true },
  { id: '10', type: 'application', title: 'Ariza APP-2026-002 moliyaviy ko\'rikdan o\'tdi', desc: 'D-401 Piramit · Sotib olish', time: '3 kun oldin', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)
const filteredNotifications = computed(() => {
  if (!typeFilter.value) return notifications.value
  return notifications.value.filter(n => n.type === typeFilter.value)
})

function markAllRead() { notifications.value.forEach(n => n.read = true) }

function iconComp(type: string) {
  return { invoice: Receipt, eri: ShieldCheck, service: Wrench, contract: FileText, application: FileText }[type] || AlertCircle
}
function iconBg(type: string) {
  return {
    invoice: 'bg-emerald-500/10', eri: 'bg-purple-500/10', service: 'bg-amber-500/10',
    contract: 'bg-blue-500/10', application: 'bg-indigo-500/10',
  }[type] || 'bg-ink-500/10'
}
function iconColor(type: string) {
  return {
    invoice: 'text-emerald-500', eri: 'text-purple-500', service: 'text-amber-500',
    contract: 'text-blue-500', application: 'text-indigo-500',
  }[type] || 'text-ink-500'
}
</script>

<style scoped>
.notif-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.15s;
}
.notif-row:hover { background: rgba(0,0,0,0.03); }
.dark .notif-row:hover { background: rgba(255,255,255,0.03); }
.notif-row--unread { background: rgba(99,102,241,0.04); }
.notif-row__icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
</style>
