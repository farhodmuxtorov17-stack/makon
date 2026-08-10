<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Mening unitlarim</h1>
      <p class="text-ink-500 text-sm mt-1">Ijaraga olingan va mulk qilib olingan unitlar</p>
    </div>

    <!-- Type filter -->
    <div class="flex items-center gap-2">
      <button @click="typeFilter = ''" class="btn btn-sm" :class="typeFilter === '' ? 'btn-primary' : 'btn-secondary'">Hammasi</button>
      <button @click="typeFilter = 'RENT'" class="btn btn-sm" :class="typeFilter === 'RENT' ? 'btn-primary' : 'btn-secondary'">Ijara</button>
      <button @click="typeFilter = 'OWNED'" class="btn btn-sm" :class="typeFilter === 'OWNED' ? 'btn-primary' : 'btn-secondary'">Mulk</button>
    </div>

    <!-- Unit cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="unit in filteredUnits" :key="unit.id" class="card overflow-hidden hover:border-brand-500/20 transition-all">
        <!-- Plan fragment -->
        <div class="h-32 bg-gradient-to-br from-brand-500/5 to-brand-700/10 relative flex items-center justify-center">
          <svg viewBox="0 0 200 100" class="w-full h-full p-4">
            <polygon :points="unit.planPoints" fill="rgba(99,102,241,0.1)" stroke="#6366f1" stroke-width="1.5" />
            <text x="100" y="55" text-anchor="middle" class="text-xs fill-current text-brand-500 font-medium">{{ unit.name }}</text>
          </svg>
          <span class="absolute top-3 right-3 badge text-xs" :class="unit.type === 'RENT' ? 'badge-brand' : 'badge-success'">
            {{ unit.type === 'RENT' ? 'Ijara' : 'Mulk' }}
          </span>
        </div>

        <div class="p-5 space-y-3">
          <div>
            <div class="font-medium">{{ unit.name }}</div>
            <div class="text-xs text-ink-500">{{ unit.buildingName }} · {{ unit.floor }}-qavat · {{ unit.area }} m²</div>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-ink-500">Shartnoma</div>
              <div class="font-medium">{{ unit.contractNumber }}</div>
            </div>
            <div class="p-2 rounded-lg bg-black/5 dark:bg-white/5">
              <div class="text-ink-500">Tugash</div>
              <div class="font-medium">{{ unit.contractEnd }}</div>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs">
            <span class="text-ink-500">Oylik to\'lov:</span>
            <span class="font-medium">{{ formatMoney(unit.monthlyRent) }}</span>
          </div>

          <div class="flex gap-2 pt-2">
            <NuxtLink to="/cabinet/services" class="btn btn-secondary btn-sm flex-1">
              <Receipt :size="14" /> Hisob
            </NuxtLink>
            <NuxtLink to="/cabinet/service-requests/new" class="btn btn-secondary btn-sm flex-1">
              <Wrench :size="14" /> Servis
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Receipt, Wrench } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const typeFilter = ref('')

const units = ref([
  { id: 'u1', name: 'A-301', buildingName: 'Tashkent City', floor: 3, area: 85, type: 'RENT', contractNumber: 'CTR-2026-001', contractEnd: '2027-03-15', monthlyRent: 25000000, planPoints: '20,20 180,20 180,80 60,80 60,60 20,60' },
  { id: 'u2', name: 'B-205', buildingName: 'Trillent Tower', floor: 2, area: 120, type: 'RENT', contractNumber: 'CTR-2026-002', contractEnd: '2026-12-01', monthlyRent: 32000000, planPoints: '30,15 170,15 170,85 30,85' },
  { id: 'u3', name: 'C-101', buildingName: 'IT Park', floor: 1, area: 45, type: 'OWNED', contractNumber: 'CTR-2026-003', contractEnd: '-', monthlyRent: 0, planPoints: '40,30 160,30 160,70 40,70' },
])

const filteredUnits = computed(() => typeFilter.value ? units.value.filter(u => u.type === typeFilter.value) : units.value)

function formatMoney(v: number) { return v > 0 ? new Intl.NumberFormat('ru-RU').format(v) + ' so\'m' : '-' }
</script>
