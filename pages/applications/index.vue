<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold font-display">Arizalar</h1>
        <p class="text-sm text-neutral-500 mt-1">{{ apps.length }} ariza</p>
      </div>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Jami"
        :value="apps.length"
        color="primary"
        icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
      />
      <StatCard
        label="Finance review"
        :value="apps.filter((a) => a.status === 'FINANCE_REVIEW').length"
        color="warning"
        icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
      />
      <StatCard
        label="Taklif yuborilgan"
        :value="apps.filter((a) => a.status === 'OFFER_SENT').length"
        color="info"
        icon="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
      <StatCard
        label="Tasdiqlangan"
        :value="apps.filter((a) => a.status === 'APPROVED').length"
        color="success"
        icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944"
      />
    </div>
    <div class="card">
      <div class="card-body flex gap-3">
        <input v-model="search" class="input flex-1" placeholder="Raqam yoki mijoz..." />
        <select v-model="statusFilter" class="input w-44 cursor-pointer">
          <option value="">Barcha holatlar</option>
          <option v-for="s in statuses" :key="s" :value="s">{{ statusLabel(s) }}</option>
        </select>
      </div>
    </div>
    <div class="card">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Mijoz</th>
              <th>Telefon</th>
              <th>Turi</th>
              <th>Taklif narx</th>
              <th>Holat</th>
              <th>Sana</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="a in filtered"
              :key="a.id"
              class="cursor-pointer"
              @click="navigateTo(`/applications/${a.id}`)"
            >
              <td class="font-mono text-xs font-medium">{{ a.number }}</td>
              <td class="font-medium text-neutral-900">{{ a.applicantName }}</td>
              <td class="text-neutral-500">{{ a.applicantPhone }}</td>
              <td>
                <span class="badge-neutral">{{ a.type === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
              </td>
              <td class="font-mono">{{ formatNumber(a.offeredPrice) }}</td>
              <td><StatusBadge :status="a.status" :dot="true" /></td>
              <td class="text-neutral-500 text-xs">{{ formatDate(a.createdAt) }}</td>
              <td>
                <svg
                  class="w-4 h-4 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDate } from '~/utils'
import StatCard from '~/components/ui/StatCard.vue'
import StatusBadge from '~/components/ui/StatusBadge.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())
const search = ref('')
const statusFilter = ref('')
const apps = computed(() => financeStore.applications)
const statuses = [
  'SUBMITTED',
  'FINANCE_REVIEW',
  'OFFER_SENT',
  'CONTRACT_SIGNING',
  'ERI_SIGNING',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
]
const statusLabel = (s: string) =>
  ({
    SUBMITTED: 'Yuborilgan',
    FINANCE_REVIEW: 'Finance review',
    OFFER_SENT: 'Taklif yuborildi',
    CONTRACT_SIGNING: 'Shartnoma',
    ERI_SIGNING: 'ERI',
    APPROVED: 'Tasdiqlangan',
    REJECTED: 'Rad',
    CANCELLED: 'Bekor',
  })[s] || s
const filtered = computed(() => {
  let r = apps.value
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(
      (a) => a.number.toLowerCase().includes(q) || a.applicantName.toLowerCase().includes(q)
    )
  }
  if (statusFilter.value) r = r.filter((a) => a.status === statusFilter.value)
  return r
})
</script>
