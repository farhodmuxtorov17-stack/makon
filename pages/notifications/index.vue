<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Bildirishnomalar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ unread.length }} o'qilmagan</p>
      </div>
      <button class="btn btn-secondary btn-sm" @click="markAll">Hammasini o'qilgan qilish</button>
    </div>
    <div class="space-y-2">
      <div
        v-for="n in notifications"
        :key="n.id"
        :class="[
          'card p-4 flex items-start gap-3 cursor-pointer transition-colors',
          !n.isRead ? 'border-brand-200 bg-brand-50/30' : '',
        ]"
        @click="markRead(n.id)"
      >
        <div
          :class="[
            'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
            typeColor(n.type),
          ]"
        >
          <svg
            class="w-5 h-5"
            :class="typeIconColor(n.type)"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="typeIcon(n.type)"
            />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="text-sm font-semibold text-ink-900">{{ n.title }}</p>
            <span v-if="!n.isRead" class="w-2 h-2 rounded-full bg-brand-500" />
          </div>
          <p class="text-sm text-ink-500">{{ n.body }}</p>
          <p class="text-xs text-ink-400 mt-1">{{ timeAgo(n.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { timeAgo } from '~/utils'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())
const notifications = computed(() => financeStore.notifications)
const unread = computed(() => financeStore.unreadNotifications)
function markRead(id: string) {
  financeStore.markNotificationRead(id)
}
function markAll() {
  financeStore.markAllNotificationsRead()
}
function typeColor(t: string) {
  return (
    {
      APPLICATION: 'bg-brand-50',
      INVOICE: 'bg-success-50',
      ERI: 'bg-accent-50',
      SERVICE: 'bg-warning-50',
      MATERIAL: 'bg-purple-50',
      SYSTEM: 'bg-ink-100',
    }[t] || 'bg-ink-100'
  )
}
function typeIconColor(t: string) {
  return (
    {
      APPLICATION: 'text-brand-600',
      INVOICE: 'text-success-600',
      ERI: 'text-accent-600',
      SERVICE: 'text-warning-600',
      MATERIAL: 'text-purple-600',
      SYSTEM: 'text-ink-500',
    }[t] || 'text-ink-500'
  )
}
function typeIcon(t: string) {
  return (
    {
      APPLICATION: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2',
      INVOICE: 'M9 14l6-6m-5.5.5h.01',
      ERI: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z',
      SERVICE: 'M11.42 7.83a6 6 0 015.68 1.78',
      MATERIAL: 'M19 11H5',
      SYSTEM: 'M10.325 4.317c.426-1.756',
    }[t] || 'M15 17h5'
  )
}
</script>
