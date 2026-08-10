<template>
  <div class="space-y-6">
    <NuxtLink to="/applications" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Arizalarga qaytish
    </NuxtLink>

    <div v-if="app" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <span class="font-mono text-sm text-ink-500">{{ app.number }}</span>
              <h1 class="font-display text-2xl font-bold mt-1">{{ app.applicantName }}</h1>
            </div>
            <span class="badge" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-ink-400 text-xs mb-1">Turi</p><p class="font-medium">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p></div>
            <div><p class="text-ink-400 text-xs mb-1">Taklif narx</p><p class="font-semibold">{{ formatPrice(app.offeredPrice) }} so'm</p></div>
            <div><p class="text-ink-400 text-xs mb-1">Telefon</p><p class="font-medium">{{ app.applicantPhone }}</p></div>
            <div><p class="text-ink-400 text-xs mb-1">Email</p><p class="font-medium">{{ app.applicantEmail }}</p></div>
            <div><p class="text-ink-400 text-xs mb-1">PINFL</p><p class="font-mono">{{ app.applicantPinfl }}</p></div>
            <div><p class="text-ink-400 text-xs mb-1">Sana</p><p class="font-medium">{{ app.createdAt.split('T')[0] }}</p></div>
          </div>
          <div v-if="app.notes" class="mt-4 p-3 rounded-xl bg-ink-50 text-sm text-ink-600">
            <p class="text-ink-400 text-xs mb-1">Izoh</p>
            {{ app.notes }}
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="font-semibold mb-4">Amallar</h3>
          <div class="space-y-2">
            <button class="btn btn-primary btn-lg w-full">Taklif yuborish</button>
            <button class="btn btn-outline btn-lg w-full">Shartnoma tuzish</button>
            <button class="btn btn-ghost btn-lg w-full text-rose-600">Rad etish</button>
          </div>
        </div>

        <div class="card p-5">
          <h3 class="font-semibold mb-3">Jarayon bosqichlari</h3>
          <div class="space-y-3">
            <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                :class="step.done ? 'bg-emerald-100' : step.current ? 'bg-brand-100' : 'bg-ink-100'">
                <Check v-if="step.done" :size="16" class="text-emerald-600" />
                <div v-else-if="step.current" class="w-2 h-2 rounded-full bg-brand-600"></div>
                <div v-else class="w-2 h-2 rounded-full bg-ink-300"></div>
              </div>
              <div>
                <p class="text-sm font-medium" :class="step.done ? 'text-ink-500' : step.current ? 'text-ink-900' : 'text-ink-400'">{{ step.label }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card p-12 text-center">
      <p class="text-ink-400">Ariza topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Check } from 'lucide-vue-next'
import type { ApplicationStatus } from '~/types'

const route = useRoute()
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const app = computed(() => financeStore.applications.find(a => a.id === route.params.id))

const steps = computed(() => {
  if (!app.value) return []
  const order: ApplicationStatus[] = ['SUBMITTED', 'FINANCE_REVIEW', 'OFFER_SENT', 'CONTRACT_SIGNING', 'APPROVED']
  const currentIdx = order.indexOf(app.value.status)
  return order.map((status, i) => ({
    label: statusLabel(status),
    done: i < currentIdx,
    current: i === currentIdx,
  }))
})

function formatPrice(v: number) {
  return v.toLocaleString('ru')
}

function statusLabel(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'Ariza yuborildi', FINANCE_REVIEW: 'Moliyaviy tekshiruv',
    OFFER_SENT: 'Taklif yuborildi', CONTRACT_SIGNING: 'Shartnoma tuzish',
    APPROVED: 'Tasdiqlandi', REJECTED: 'Rad etildi',
    CANCELLED: 'Bekor qilindi', DRAFT: 'Qoralama', ERI_SIGNING: 'ERI imzo',
  }
  return m[s] || s
}

function statusClass(s: ApplicationStatus): string {
  const m: Record<string, string> = {
    SUBMITTED: 'badge-info', FINANCE_REVIEW: 'badge-warning',
    OFFER_SENT: 'badge-info', CONTRACT_SIGNING: 'badge-warning',
    APPROVED: 'badge-success', REJECTED: 'badge-danger',
    CANCELLED: 'badge-neutral', DRAFT: 'badge-neutral', ERI_SIGNING: 'badge-warning',
  }
  return m[s] || 'badge-neutral'
}
</script>
