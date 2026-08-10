<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Shartnomalar Reyestri</h1>
        <p class="text-ink-500 text-sm mt-1">Ijara va sotuv shartnomalari hamda ERI imzo statuslari</p>
      </div>

      <NuxtLink to="/management/applications" class="btn btn-primary btn-sm flex items-center gap-2">
        <Plus :size="16" /> Arizalardan Shartnoma Shakllantirish
      </NuxtLink>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Shartnoma raqami, Ijarachi yoki STIR..." class="input pl-9 w-full" />
        </div>
        <select v-model="statusFilter" class="input w-auto">
          <option value="">Barcha statuslar</option>
          <option value="ACTIVE">Aktiv (Active)</option>
          <option value="PARTIALLY_SIGNED">Qisman imzolangan (Partially Signed)</option>
          <option value="DRAFT_READY">Qoralama tayyor (Draft Ready)</option>
          <option value="EXPIRED">Muddati o'tgan (Expired)</option>
          <option value="TERMINATED">Bekor qilingan (Terminated)</option>
        </select>
        <select v-model="buildingFilter" class="input w-auto">
          <option value="">Barcha binolar</option>
          <option v-for="b in makonStore.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
        </select>
      </div>
    </div>

    <!-- Contracts Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-wider text-left bg-black/5 dark:bg-white/5">
              <th class="px-4 py-3">Nomer</th>
              <th class="px-4 py-3">Ijarachi (Tashkilot)</th>
              <th class="px-4 py-3">Bino & Unit</th>
              <th class="px-4 py-3 text-right">Oylik Ijara</th>
              <th class="px-4 py-3 text-center">Amal Qilish Davri</th>
              <th class="px-4 py-3 text-center">ERI Status</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredContracts" :key="c.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
              <td class="px-4 py-3 font-mono font-bold text-ink-900 dark:text-white">
                <NuxtLink :to="`/contracts/${c.id}`" class="hover:text-brand-500">
                  {{ c.number }}
                </NuxtLink>
              </td>
              <td class="px-4 py-3">
                <div class="font-bold text-ink-900 dark:text-white">{{ c.tenantName }}</div>
                <div class="text-xs text-ink-500 font-mono">STIR: {{ c.tenantTin }}</div>
              </td>
              <td class="px-4 py-3">
                <div class="text-ink-900 dark:text-white font-medium">{{ c.buildingName }}</div>
                <div class="text-xs text-brand-500 font-mono">Unit {{ c.unitNumber }}</div>
              </td>
              <td class="px-4 py-3 text-right font-bold text-brand-500">
                ${{ c.monthlyRent.toLocaleString() }}
              </td>
              <td class="px-4 py-3 text-center text-xs text-ink-500 font-mono">
                {{ c.startDate }} — {{ c.endDate }}
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-[10px] px-1.5 py-0.5 rounded border" :class="c.eriTenantSigned ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-black/5 text-ink-400 border-black/10'" title="Ijarachi ERI Imzosi">
                    T: {{ c.eriTenantSigned ? '✓' : '✗' }}
                  </span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded border" :class="c.eriLandlordSigned ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' : 'bg-black/5 text-ink-400 border-black/10'" title="Bino Egasi ERI Imzosi">
                    L: {{ c.eriLandlordSigned ? '✓' : '✗' }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="contractBadge(c.status)">
                  {{ contractLabel(c.status) }}
                </span>
              </td>
              <td class="px-4 py-3 text-right space-x-1">
                <NuxtLink :to="`/contracts/${c.id}`" class="btn btn-ghost btn-sm text-xs">
                  Batafsil →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredContracts.length === 0" class="p-12 text-center text-ink-500">
        Shartnomalar topilmadi
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()

const search = ref('')
const statusFilter = ref('')
const buildingFilter = ref('')

const filteredContracts = computed(() => {
  let result = [...makonStore.contracts]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(c => c.number.toLowerCase().includes(q) || c.tenantName.toLowerCase().includes(q) || c.tenantTin.includes(q))
  }
  if (statusFilter.value) {
    result = result.filter(c => c.status === statusFilter.value)
  }
  if (buildingFilter.value) {
    result = result.filter(c => c.buildingId === buildingFilter.value)
  }

  return result
})

function contractBadge(status: string) {
  if (status === 'ACTIVE') return 'badge-success'
  if (status === 'PARTIALLY_SIGNED') return 'badge-warning'
  if (status === 'DRAFT_READY' || status === 'DRAFT') return 'badge-brand'
  if (status === 'EXPIRED') return 'badge-neutral'
  return 'badge-danger'
}

function contractLabel(status: string) {
  if (status === 'ACTIVE') return 'Aktiv'
  if (status === 'PARTIALLY_SIGNED') return 'Qisman imzolangan'
  if (status === 'DRAFT_READY') return 'Qoralama tayyor'
  if (status === 'EXPIRED') return 'Muddati o\'tgan'
  return 'Bekor qilingan'
}
</script>
