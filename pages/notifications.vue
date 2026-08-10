<template>
  <div class="space-y-6">
    <PageHeader title="Bildirishnomalar" :subtitle="`${unread.length} o'qilmagan`">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="markAll" :disabled="unread.length === 0">
          <CheckCheck :size="16" /> Hammasini o'qish
        </button>
      </template>
    </PageHeader>

    <div class="space-y-2">
      <div v-for="n in financeStore.notifications" :key="n.id"
        class="card p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-card-hover"
        :class="!n.isRead ? 'border-l-2 border-l-brand-500' : ''"
        @click="markRead(n.id)">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="notifBg(n.type)">
          <component :is="notifIcon(n.type)" :size="18" :class="notifColor(n.type)" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="font-semibold text-sm text-ink-900">{{ n.title }}</p>
            <span v-if="!n.isRead" class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>
          </div>
          <p class="text-sm text-ink-500 mt-0.5">{{ n.body }}</p>
          <p class="text-xs text-ink-400 mt-1.5">{{ formatDate(n.createdAt, 'relative') }}</p>
        </div>
      </div>
    </div>

    <div v-if="financeStore.notifications.length === 0" class="card">
      <BaseEmptyState title="Bildirishnomalar yo'q" description="Yangi bildirishnomalar shu yerda ko'rinadi" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCheck, FileText, ShieldCheck, CreditCard, Wrench, Info, AlertTriangle } from 'lucide-vue-next'
import type { Component } from 'vue'
import type { NotificationType } from '~/types'

const financeStore = useFinanceStore()
const toast = useToast()
const { formatDate } = useFormat()

onMounted(() => financeStore.initMockData())

const unread = computed(() => financeStore.notifications.filter(n => !n.isRead))

function markRead(id: string) {
  financeStore.markNotificationRead(id)
}
function markAll() {
  financeStore.markAllNotificationsRead()
  toast.success('Barchasi o\'qildi')
}

function notifIcon(t: NotificationType): Component {
  return ({ APPLICATION: FileText, ERI: ShieldCheck, INVOICE: CreditCard, CONTRACT: FileText, SYSTEM: Info, SERVICE: Wrench, WARNING: AlertTriangle } as Record<string, Component>)[t] || Info
}
function notifBg(t: string): string {
  return ({ APPLICATION: 'bg-brand-50', ERI: 'bg-amber-50', INVOICE: 'bg-emerald-50', CONTRACT: 'bg-brand-50', SYSTEM: 'bg-ink-100', SERVICE: 'bg-sky-50', WARNING: 'bg-rose-50' })[t] || 'bg-ink-100'
}
function notifColor(t: string): string {
  return ({ APPLICATION: 'text-brand-600', ERI: 'text-amber-600', INVOICE: 'text-emerald-600', CONTRACT: 'text-brand-600', SYSTEM: 'text-ink-500', SERVICE: 'text-sky-600', WARNING: 'text-rose-600' })[t] || 'text-ink-500'
}
</script>
