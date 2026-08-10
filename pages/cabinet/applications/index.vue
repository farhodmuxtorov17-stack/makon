<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Mening arizalarim</h1>
        <p class="text-ink-400 text-sm mt-1">{{ myApps.length }} ta ariza</p>
      </div>
      <NuxtLink to="/catalog" class="btn btn-primary btn-sm"><Plus :size="14" /> Yangi ariza</NuxtLink>
    </div>

    <div class="space-y-3">
      <div v-for="a in myApps" :key="a.id" class="card p-5">
        <div class="flex items-start justify-between mb-2">
          <div>
            <span class="text-xs font-mono text-ink-400">{{ a.number }}</span>
            <h3 class="text-white font-medium mt-1">{{ a.title }}</h3>
            <p class="text-sm text-ink-500 mt-0.5">{{ formatDate(a.submittedAt) }}</p>
          </div>
          <span class="badge" :class="statusClass(a.status)">{{ statusLabel(a.status) }}</span>
        </div>
        <div class="flex items-center gap-4 text-sm mt-3 pt-3 border-t border-white/5">
          <span class="text-white">{{ formatPriceShort(a.offeredPrice) }}</span>
          <span class="text-ink-500">{{ a.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
          <NuxtLink :to="'/applications/' + a.id" class="text-brand-400 text-sm ml-auto">Batafsil →</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { applications } from '~/utils/mockData'
import type { ApplicationStatus } from '~/types'

definePageMeta({ middleware: 'auth' })
const { formatPriceShort, formatDate } = useFormat()

const myApps = applications.slice(0, 3).map(a => ({ ...a, title: 'Ariza ' + a.number }))

function statusLabel(s: ApplicationStatus) {
  return { DRAFT: 'Qoralama', SUBMITTED: 'Yuborilgan', BUILDING_REVIEW: 'Ko\'rib chiqilmoqda', FINANCE_REVIEW: 'Moliya', OFFER_SENT: 'Taklif', ERI_PENDING: 'ERI', APPROVED: 'Tasdiqlangan', REJECTED: 'Rad', CANCELLED: 'Bekor', COMPLETED: 'Yakunlangan' }[s] || s
}
function statusClass(s: ApplicationStatus) {
  return { DRAFT: 'badge-neutral', SUBMITTED: 'badge-info', BUILDING_REVIEW: 'badge-brand', FINANCE_REVIEW: 'badge-warning', OFFER_SENT: 'badge-brand', ERI_PENDING: 'badge-warning', APPROVED: 'badge-success', REJECTED: 'badge-danger', CANCELLED: 'badge-neutral', COMPLETED: 'badge-neutral' }[s] || 'badge-neutral'
}
</script>
