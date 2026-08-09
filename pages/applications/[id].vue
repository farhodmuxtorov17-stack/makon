<template>
  <div class="space-y-6">
    <NuxtLink
      to="/applications"
      class="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Arizalar
    </NuxtLink>
    <div v-if="app" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="flex items-start justify-between mb-6">
            <div>
              <p class="text-xs text-neutral-400 font-mono">{{ app.number }}</p>
              <h1 class="text-2xl font-bold font-display mt-1">{{ app.applicantName }}</h1>
            </div>
            <StatusBadge :status="app.status" :dot="true" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Telefon</p>
              <p class="font-medium mt-1">{{ app.applicantPhone }}</p>
            </div>
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Email</p>
              <p class="font-medium mt-1">{{ app.applicantEmail }}</p>
            </div>
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">PINFL</p>
              <p class="font-mono text-sm mt-1">{{ app.applicantPinfl }}</p>
            </div>
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Turi</p>
              <p class="font-medium mt-1">{{ app.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</p>
            </div>
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Taklif narx</p>
              <p class="font-bold mt-1">{{ formatNumber(app.offeredPrice) }} so'm</p>
            </div>
            <div class="p-4 rounded-xl bg-neutral-50">
              <p class="text-xs text-neutral-500">Sana</p>
              <p class="font-medium mt-1">{{ formatDate(app.createdAt) }}</p>
            </div>
          </div>
          <div v-if="app.notes" class="mt-4 p-4 rounded-xl bg-warning-50">
            <p class="text-xs text-warning-600 font-semibold">Izoh</p>
            <p class="text-sm text-neutral-700 mt-1">{{ app.notes }}</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="font-semibold">Jarayon tarixi</h3></div>
          <div class="card-body">
            <div class="space-y-4">
              <div v-for="(step, i) in workflowSteps" :key="i" class="flex gap-3">
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    step.done
                      ? 'bg-success-100 text-success-600'
                      : 'bg-neutral-100 text-neutral-400',
                  ]"
                >
                  <svg
                    v-if="step.done"
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span v-else class="text-xs font-bold">{{ i + 1 }}</span>
                </div>
                <div class="pt-1">
                  <p
                    class="text-sm font-medium"
                    :class="step.done ? 'text-neutral-900' : 'text-neutral-400'"
                  >
                    {{ step.label }}
                  </p>
                  <p v-if="step.date" class="text-xs text-neutral-400">
                    {{ formatDate(step.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div class="card p-5">
          <h3 class="font-semibold mb-3">Amallar</h3>
          <div class="flex flex-col gap-2">
            <button v-if="app.status === 'SUBMITTED'" class="btn-warning">
              Finance reviewga yuborish
            </button>
            <button v-if="app.status === 'FINANCE_REVIEW'" class="btn-primary">
              Taklif yuborish
            </button>
            <button v-if="app.status === 'OFFER_SENT'" class="btn-success">Tasdiqlash</button>
            <button v-if="app.status === 'CONTRACT_SIGNING'" class="btn-primary">
              ERI imzolash
            </button>
            <button class="btn-ghost text-danger-600 hover:bg-danger-50">Rad etish</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const route = useRoute()
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())
const app = computed(() => financeStore.applications.find((a) => a.id === route.params.id))

const workflowSteps = computed(() => {
  if (!app.value) return []
  const s = app.value.status
  const steps = [
    { label: 'Ariza yuborildi', done: true, date: app.value.submittedAt },
    {
      label: 'Finance review',
      done: [
        'FINANCE_REVIEW',
        'OFFER_SENT',
        'CONTRACT_SIGNING',
        'ERI_SIGNING',
        'APPROVED',
      ].includes(s),
      date: null,
    },
    {
      label: 'Taklif yuborildi',
      done: ['OFFER_SENT', 'CONTRACT_SIGNING', 'ERI_SIGNING', 'APPROVED'].includes(s),
      date: null,
    },
    {
      label: 'Shartnoma imzolash',
      done: ['CONTRACT_SIGNING', 'ERI_SIGNING', 'APPROVED'].includes(s),
      date: null,
    },
    { label: 'ERI imzolash', done: ['ERI_SIGNING', 'APPROVED'].includes(s), date: null },
    { label: 'Tasdiqlangan', done: s === 'APPROVED', date: null },
  ]
  return steps
})
</script>
