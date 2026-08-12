<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Ijarachi kabinetlari</h1>
        <p class="text-ink-500 text-sm mt-1">Shartnoma aktivlashuvi bilan avtomatik yaratilgan tenant kabinetlar</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-500 flex items-center gap-2">
          <UserCheck :size="14" />
          Jami: {{ tenantCabinets.length }} ta kabinet
        </div>
      </div>
    </div>

    <!-- Status Sync Info Banner -->
    <div class="p-4 rounded-xl bg-brand-500/5 border border-brand-500/15 flex items-start gap-3 text-xs">
      <RefreshCw :size="16" class="text-brand-500 mt-0.5 flex-shrink-0" />
      <div class="text-ink-700 dark:text-ink-300">
        <b class="text-brand-500">Avtomatik sinxronizatsiya faol:</b>
        Shartnoma aktivlashganda → Unit statusi <code class="px-1 rounded bg-black/10 dark:bg-white/10">OCCUPIED</code> ga o'zgaradi →
        Marketplace listing <code class="px-1 rounded bg-black/10 dark:bg-white/10">HIDDEN</code> bo'ladi →
        Bino statistikasi qayta hisoblanadi → Tenant cabinet avtomatik yaratiladi.
      </div>
    </div>

    <!-- Cabinets Table -->
    <div class="card overflow-hidden">
      <!-- Table Header -->
      <div class="grid grid-cols-12 gap-3 px-5 py-3 bg-black/5 dark:bg-white/5 text-[10px] font-bold text-ink-500 uppercase tracking-wider border-b border-black/5 dark:border-white/5">
        <div class="col-span-1">ID</div>
        <div class="col-span-3">Ijarachi</div>
        <div class="col-span-2">STIR (TIN)</div>
        <div class="col-span-2">Shartnoma</div>
        <div class="col-span-2">Yaratildi</div>
        <div class="col-span-1">Status</div>
        <div class="col-span-1"></div>
      </div>

      <!-- Rows -->
      <div v-for="tc in tenantCabinets" :key="tc.id" class="grid grid-cols-12 gap-3 px-5 py-3 items-center border-b border-black/5 dark:border-white/5 text-xs hover:bg-black/2 dark:hover:bg-white/2 transition-colors">
        <div class="col-span-1 font-mono text-ink-500">{{ tc.id }}</div>
        <div class="col-span-3">
          <div class="font-bold text-ink-900 dark:text-white">{{ tc.tenantName }}</div>
          <div class="text-[10px] text-ink-500" v-if="tc.tenantEmail">{{ tc.tenantEmail }}</div>
        </div>
        <div class="col-span-2 font-mono text-ink-700 dark:text-ink-300">{{ tc.tenantTin }}</div>
        <div class="col-span-2">
          <NuxtLink :to="`/contracts/${tc.contractId}`" class="text-brand-500 font-mono hover:underline">
            {{ getContractNumber(tc.contractId) }}
          </NuxtLink>
        </div>
        <div class="col-span-2 text-ink-500">{{ tc.createdAt }}</div>
        <div class="col-span-1">
          <span class="badge text-[10px]" :class="tc.status === 'ACTIVE' ? 'badge-success' : 'badge-neutral'">
            {{ tc.status === 'ACTIVE' ? 'Faol' : 'Yopilgan' }}
          </span>
        </div>
        <div class="col-span-1 flex items-center gap-1">
          <NuxtLink :to="`/cabinet?tenant=${tc.id}`" class="p-1.5 rounded-lg hover:bg-brand-500/10 text-brand-500" title="Kabinetni ko'rish">
            <Eye :size="14" />
          </NuxtLink>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="tenantCabinets.length === 0" class="p-12 text-center">
        <div class="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-3">
          <UserX :size="28" class="text-ink-400" />
        </div>
        <p class="text-ink-500 text-sm">Hozircha hech qanday tenant kabinet yaratilmagan.</p>
        <p class="text-ink-400 text-xs mt-1">Shartnoma aktivlashuvidan so'ng avtomatik yaratiladi.</p>
      </div>
    </div>

    <!-- Linked Units -->
    <div class="card p-5 space-y-3">
      <h3 class="font-bold text-sm text-ink-900 dark:text-white flex items-center gap-2">
        <Building :size="16" class="text-brand-500" /> Biriktirilgan Unitlar
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="tc in tenantCabinets" :key="tc.id" class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-bold text-ink-900 dark:text-white">{{ tc.tenantName }}</span>
            <span class="badge badge-success text-[10px]">Faol</span>
          </div>
          <div class="text-ink-500">
            {{ getBuildingName(tc.buildingId) }} → Unit {{ getUnitNumber(tc.unitId) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCheck, UserX, Eye, Building, RefreshCw } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()
const tenantCabinets = computed(() => makonStore.tenantCabinets)

function getContractNumber(contractId: string) {
  const c = makonStore.contracts.find(c => c.id === contractId)
  return c?.number || contractId
}
function getBuildingName(buildingId: string) {
  const b = makonStore.buildings.find(b => b.id === buildingId)
  return b?.name || buildingId
}
function getUnitNumber(unitId: string) {
  const u = makonStore.units.find(u => u.id === unitId)
  return u?.unitNumber || unitId
}
</script>
