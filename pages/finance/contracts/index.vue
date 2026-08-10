<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold font-display text-ink-900">Shartnomalar</h1>
        <p class="text-sm text-ink-500 mt-1">{{ filtered.length }} shartnoma</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" :stroke-width="2" />
        Yangi shartnoma
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-success-50 flex items-center justify-center">
            <FileCheck2 :size="18" :stroke-width="2" class="text-success-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('ACTIVE') }}</p>
            <p class="text-xs text-ink-500">Faol</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-warning-50 flex items-center justify-center">
            <Clock :size="18" :stroke-width="2" class="text-warning-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('EXPIRING') }}</p>
            <p class="text-xs text-ink-500">Muddati yaqin</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-danger-50 flex items-center justify-center">
            <FileX2 :size="18" :stroke-width="2" class="text-danger-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">{{ countByStatus('EXPIRED') }}</p>
            <p class="text-xs text-ink-500">Tugagan</p>
          </div>
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-50 flex items-center justify-center">
            <ShieldCheck :size="18" :stroke-width="2" class="text-brand-600" />
          </div>
          <div>
            <p class="text-xl font-bold text-ink-900">
              {{ contracts.filter((c) => c.eriSigned).length }}
            </p>
            <p class="text-xs text-ink-500">ERI imzolangan</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-col md:flex-row gap-3">
      <div class="flex-1">
        <SearchInput v-model="search" placeholder="Raqam yoki mijoz bo'yicha..." />
      </div>
      <select v-model="statusFilter" class="input md:w-auto cursor-pointer">
        <option value="ALL">Barcha holatlar</option>
        <option value="ACTIVE">Faol</option>
        <option value="EXPIRING">Muddati yaqin</option>
        <option value="EXPIRED">Tugagan</option>
        <option value="TERMINATED">Bekor qilingan</option>
      </select>
    </div>

    <!-- Desktop table -->
    <div class="card hidden md:block overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Raqam</th>
              <th>Mijoz</th>
              <th>Turi</th>
              <th>Boshlanish</th>
              <th>Tugash</th>
              <th>Oylik</th>
              <th>ERI</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in pagedContracts" :key="c.id" class="cursor-pointer">
              <td class="font-mono text-xs font-medium text-ink-900">{{ c.number }}</td>
              <td class="font-medium text-ink-900">{{ c.tenantName }}</td>
              <td>
                <span :class="c.type === 'RENT' ? 'badge badge-info' : 'badge badge-success'">{{
                  c.type === 'RENT' ? 'Ijara' : 'Sotuv'
                }}</span>
              </td>
              <td class="text-ink-500 text-xs">{{ formatDate(c.startDate) }}</td>
              <td class="text-ink-500 text-xs">{{ formatDate(c.endDate) }}</td>
              <td class="font-mono font-semibold text-ink-900">
                {{ formatNumber(c.monthlyAmount) }}
              </td>
              <td>
                <span v-if="c.eriSigned" class="badge badge-success">
                  <CheckCircle2 :size="12" :stroke-width="2.5" /> Imzolangan
                </span>
                <span v-else class="badge badge-neutral">—</span>
              </td>
              <td><StatusBadge :status="c.status" :dot="true" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="filtered.length > perPage"
        :page="page"
        :per-page="perPage"
        :total="filtered.length"
        @update:page="page = $event"
      />
      <EmptyState
        v-if="!filtered.length"
        title="Shartnomalar topilmadi"
        icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586"
      />
    </div>

    <!-- Mobile cards -->
    <div class="md:hidden space-y-3">
      <div v-for="c in pagedContracts" :key="c.id" class="card p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="font-mono text-xs font-medium text-ink-900">{{ c.number }}</span>
          <StatusBadge :status="c.status" :dot="true" />
        </div>
        <p class="font-medium text-ink-900">{{ c.tenantName }}</p>
        <div class="flex items-center justify-between mt-2">
          <span :class="c.type === 'RENT' ? 'badge badge-info' : 'badge badge-success'">{{
            c.type === 'RENT' ? 'Ijara' : 'Sotuv'
          }}</span>
          <span class="font-mono text-sm font-bold text-ink-900">{{ formatNumber(c.monthlyAmount) }} so'm</span>
        </div>
        <div class="flex items-center justify-between mt-2 text-xs text-ink-400">
          <span>{{ formatDate(c.startDate) }} — {{ formatDate(c.endDate) }}</span>
          <span v-if="c.eriSigned" class="text-success-600 font-medium flex items-center gap-1">
            <CheckCircle2 :size="12" :stroke-width="2" /> ERI
          </span>
        </div>
      </div>
      <EmptyState
        v-if="!filtered.length"
        title="Shartnomalar topilmadi"
        icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, CheckCircle2, FileCheck2, Clock, FileX2, ShieldCheck } from 'lucide-vue-next'
import { useFinanceStore } from '~/stores/finance'
import { formatNumber, formatDate } from '~/utils'
import StatusBadge from '~/components/ui/StatusBadge.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'

definePageMeta({ middleware: 'auth' })
const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

const search = ref('')
const statusFilter = ref('ALL')
const page = ref(1)
const perPage = 10

const contracts = computed(() => financeStore.contracts)
const filtered = computed(() => {
  let r = contracts.value
  if (statusFilter.value !== 'ALL') r = r.filter((c) => c.status === statusFilter.value)
  if (search.value)
    r = r.filter(
      (c) =>
        c.number?.toLowerCase().includes(search.value.toLowerCase()) ||
        c.tenantName?.toLowerCase().includes(search.value.toLowerCase())
    )
  return r
})
const pagedContracts = computed(() =>
  filtered.value.slice((page.value - 1) * perPage, page.value * perPage)
)
function countByStatus(s: string) {
  return contracts.value.filter((c) => c.status === s).length
}
</script>
