<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Birliklar</h1>
        <p class="text-ink-500 text-sm mt-1">Binolar ichidagi ofis/savdo maydonlari</p>
      </div>
      <button class="btn btn-primary btn-sm"><Plus :size="16" /> Yangi birlik</button>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <div class="relative flex-1 min-w-[200px]">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
        <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9" />
      </div>
      <select v-model="statusFilter" class="input w-auto">
        <option value="">Hammasi</option>
        <option value="VACANT">Bo'sh</option>
        <option value="OCCUPIED">Band</option>
        <option value="RESERVED">Rezerv</option>
      </select>
      <select v-model="buildingFilter" class="input w-auto">
        <option value="">Barcha binolar</option>
        <option v-for="b in data?.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
      </select>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-500 border-b border-black/5 dark:border-white/5">
              <th class="px-4 py-3">Nomi</th>
              <th class="px-4 py-3">Bino</th>
              <th class="px-4 py-3">Qavat</th>
              <th class="px-4 py-3 text-right">Maydon</th>
              <th class="px-4 py-3 text-right">Ijara</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUnits" :key="u.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3">
              <td class="px-4 py-3 font-medium text-ink-900 dark:text-white">{{ u.name }}</td>
              <td class="px-4 py-3 text-ink-500">{{ u.buildingName }}</td>
              <td class="px-4 py-3">{{ u.floor }}</td>
              <td class="px-4 py-3 text-right">{{ u.area }} m²</td>
              <td class="px-4 py-3 text-right font-medium">{{ formatPrice(u.monthlyRent, u.currency) }}</td>
              <td class="px-4 py-3 text-center">
                <span class="badge text-xs" :class="unitBadge(u.status)">{{ unitLabel(u.status) }}</span>
              </td>
              <td class="px-4 py-3 text-right">
                <button class="btn btn-ghost btn-sm">→</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredUnits.length === 0" class="p-12 text-center text-ink-500">Birliklar topilmadi</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-units', () => fetchAdminData('buildings'))

const search = ref('')
const statusFilter = ref('')
const buildingFilter = ref('')

// Generate units from buildings
const units = computed(() => {
  if (!data.value?.buildings) return []
  return data.value.buildings.flatMap((b: any) => {
    const unitCount = b.totalUnits || 0
    const units = []
    for (let i = 1; i <= Math.min(unitCount, 12); i++) {
      const floor = Math.ceil(i / 4)
      const isOccupied = i <= (b.occupiedUnits || 0)
      units.push({
        id: `${b.id}-unit-${i}`,
        name: `${b.name.slice(0, 3)}-${String(i).padStart(3, '0')}`,
        buildingName: b.name,
        floor,
        area: 50 + Math.floor(Math.random() * 150),
        monthlyRent: (5000000 + Math.floor(Math.random() * 30000000)),
        currency: 'UZS',
        status: isOccupied ? 'OCCUPIED' : 'VACANT',
      })
    }
    return units
  })
})

const filteredUnits = computed(() => {
  let result = units.value
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter((u: any) => u.name?.toLowerCase().includes(q) || u.buildingName?.toLowerCase().includes(q))
  }
  if (statusFilter.value) result = result.filter((u: any) => u.status === statusFilter.value)
  if (buildingFilter.value) result = result.filter((u: any) => units.value.find((u2: any) => u2.id === u.id && data.value.buildings.find((b: any) => b.id === buildingFilter.value && b.name === u.buildingName)))
  return result
})

function unitBadge(s: string) { return { VACANT: 'badge-success', OCCUPIED: 'badge-brand', RESERVED: 'badge-warning' }[s] || 'badge-neutral' }
function unitLabel(s: string) { return { VACANT: 'Bo\'sh', OCCUPIED: 'Band', RESERVED: 'Rezerv' }[s] || s }
function formatPrice(p: number, c: string) { return p ? (p / 1000000).toFixed(1) + 'M so\'m' : '—' }
</script>
