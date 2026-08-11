<template>
  <div class="space-y-6">
    <!-- Breadcrumb Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink :to="`/management/buildings/${buildingId}`" class="btn btn-ghost btn-sm p-2">
          <ArrowLeft :size="18" />
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-bold text-ink-900 dark:text-white">{{ building?.name || 'Bino' }} — Unitlar reyestri</h1>
          <p class="text-xs text-ink-500 mt-0.5">Xonalar, qavatlar va ijara holati boshqaruvi</p>
        </div>
      </div>

      <button @click="showCreateModal = true" class="btn btn-primary btn-sm flex items-center gap-2">
        <Plus :size="16" /> Yangi unit qo'shish
      </button>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Unit raqami yoki xona..." class="input pl-9 w-full" />
        </div>
        <select v-model="floorFilter" class="input w-auto">
          <option value="">Barcha qavatlar</option>
          <option v-for="f in floorList" :key="f" :value="f">{{ f }}-qavat</option>
        </select>
        <select v-model="statusFilter" class="input w-auto">
          <option value="">Barcha statuslar</option>
          <option value="VACANT">Bo'sh (Vacant)</option>
          <option value="RESERVED">Rezerv (Reserved)</option>
          <option value="OCCUPIED">Band (Occupied)</option>
        </select>
      </div>
    </div>

    <!-- Units Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-wider text-left bg-black/5 dark:bg-white/5">
              <th class="px-4 py-3">Unit №</th>
              <th class="px-4 py-3">Qavat</th>
              <th class="px-4 py-3">Kategoriya</th>
              <th class="px-4 py-3 text-right">Maydon (m²)</th>
              <th class="px-4 py-3 text-right">Oylik ijara</th>
              <th class="px-4 py-3 text-center">Plan Xonasi (CAD)</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in filteredUnits" :key="u.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
              <td class="px-4 py-3 font-bold font-mono text-ink-900 dark:text-white">
                {{ u.unitNumber }}
              </td>
              <td class="px-4 py-3 text-ink-500">{{ u.floor }}-qavat</td>
              <td class="px-4 py-3"><span class="badge badge-neutral text-xs">{{ u.category || 'OFFICE' }}</span></td>
              <td class="px-4 py-3 text-right font-medium">{{ u.area }} m²</td>
              <td class="px-4 py-3 text-right font-bold text-brand-500">
                {{ formatUZS(u.monthlyRent) }}
              </td>
              <td class="px-4 py-3 text-center">
                <button
                  @click="openRoomLinkModal(u)"
                  class="text-xs px-2 py-1 rounded-lg border transition-colors flex items-center justify-center gap-1 mx-auto"
                  :class="u.roomId ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-black/5 dark:bg-white/5 text-ink-500 border-dashed border-black/20 dark:border-white/20 hover:border-brand-500'"
                >
                  <Link :size="12" /> {{ u.roomId || 'Ulash' }}
                </button>
              </td>
              <td class="px-4 py-3 text-center">
                <select
                  :value="u.status"
                  @change="onStatusChange(u.id, ($event.target as HTMLSelectElement).value as any)"
                  class="text-xs font-semibold px-2 py-1 rounded-lg border cursor-pointer bg-transparent"
                  :class="statusClass(u.status)"
                >
                  <option value="VACANT" class="bg-white dark:bg-ink-900 text-ink-900 dark:text-white">Bo'sh (Vacant)</option>
                  <option value="RESERVED" class="bg-white dark:bg-ink-900 text-ink-900 dark:text-white">Rezerv (Reserved)</option>
                  <option value="OCCUPIED" class="bg-white dark:bg-ink-900 text-ink-900 dark:text-white">Band (Occupied)</option>
                </select>
              </td>
              <td class="px-4 py-3 text-right space-x-1">
                <!-- Listing Preparation Button -->
                <button
                  @click="prepareListing(u)"
                  title="Listing tayyorlash"
                  class="btn btn-ghost btn-sm p-1.5 text-brand-500 hover:bg-brand-500/10"
                >
                  <Tag :size="14" />
                </button>

                <!-- Rental History Button -->
                <button
                  @click="selectedHistoryUnit = u"
                  title="Ijara tarixi"
                  class="btn btn-ghost btn-sm p-1.5 text-purple-400 hover:bg-purple-500/10"
                >
                  <History :size="14" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="filteredUnits.length === 0" class="p-12 text-center text-ink-500">
        Ushbu kriteriyalar bo'yicha unitlar topilmadi
      </div>
    </div>

    <!-- Create Unit Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white">Yangi Unit yaratish</h3>
            <button @click="showCreateModal = false" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400">
              <X :size="20" />
            </button>
          </div>

          <form @submit.prevent="handleCreateUnit" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Unit Raqami</label>
                <input v-model="newUnit.unitNumber" type="text" required placeholder="104" class="input w-full" />
              </div>
              <div>
                <label class="label">Qavat</label>
                <input v-model.number="newUnit.floor" type="number" min="1" required class="input w-full" />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Maydon (m²)</label>
                <input v-model.number="newUnit.area" type="number" required placeholder="120" class="input w-full" />
              </div>
              <div>
                <label class="label">Kategoriya</label>
                <select v-model="newUnit.category" class="input w-full">
                  <option value="OFFICE">OFFICE</option>
                  <option value="RETAIL">RETAIL</option>
                  <option value="COWORKING">COWORKING</option>
                  <option value="STORAGE">STORAGE</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Oylik Ijara Narxi</label>
                <input v-model.number="newUnit.monthlyRent" type="number" required placeholder="3000" class="input w-full" />
              </div>
              <div>
                <label class="label">Valyuta</label>
                <select v-model="newUnit.currency" class="input w-full">
                  <option value="UZS">UZS (so0027m)</option>
                  <option value="UZS">UZS (so'm)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="label">Boshlang\'ich Status</label>
              <select v-model="newUnit.status" class="input w-full">
                <option value="VACANT">Bo'sh (Vacant)</option>
                <option value="RESERVED">Rezerv (Reserved)</option>
                <option value="OCCUPIED">Band (Occupied)</option>
              </select>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
              <button type="button" @click="showCreateModal = false" class="btn btn-secondary">Bekor qilish</button>
              <button type="submit" class="btn btn-primary">Unitni yaratish</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Room-to-Unit CAD Linking Modal -->
    <Teleport to="body">
      <div v-if="linkingUnit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="linkingUnit = null"></div>
        <div class="relative w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
              <Link :size="18" class="text-purple-400" /> CAD Rejadagi xona elementi bilan ulash
            </h3>
            <button @click="linkingUnit = null" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <p class="text-xs text-ink-500">Unit: <b>{{ linkingUnit.unitNumber }}</b> ({{ linkingUnit.floor }}-qavat) uchun 2D rejadagi ko'pburchak xona ID'sini biriktiring.</p>

          <div class="space-y-3">
            <label class="label">Poligon / CAD Room ID</label>
            <input v-model="selectedRoomId" type="text" placeholder="Masalan: ROOM-104-POLYGON" class="input w-full font-mono" />

            <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-ink-500 space-y-1">
              <div><b>Eslatma:</b> CAD kontur ulanganidan so'ng, ushbu unit 2D qavat rejasida interaktiv bosiluvchan holatga o'tadi.</div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3">
            <button @click="linkingUnit = null" class="btn btn-secondary text-xs">Bekor qilish</button>
            <button @click="saveRoomLink" class="btn btn-primary text-xs">Saqlash</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Rental History Modal/Drawer -->
    <Teleport to="body">
      <div v-if="selectedHistoryUnit" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="selectedHistoryUnit = null"></div>
        <div class="relative w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white flex items-center gap-2">
              <History :size="18" class="text-purple-400" /> Unit {{ selectedHistoryUnit.unitNumber }} — Ijara tarixi
            </h3>
            <button @click="selectedHistoryUnit = null" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <div class="space-y-3">
            <div v-for="(h, idx) in selectedHistoryUnit.rentalHistory" :key="idx" class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-ink-900 dark:text-white text-sm">{{ h.tenantName }}</span>
                <span class="font-mono text-brand-500 font-bold">{{ formatUZS(h.monthlyRent) }}/oy</span>
              </div>
              <div class="text-ink-500">
                Muddati: {{ h.startDate }} — {{ h.endDate }}
              </div>
              <div class="text-[10px] text-purple-400 font-mono">
                Shartnoma ID: {{ h.contractId }}
              </div>
            </div>

            <div v-if="!selectedHistoryUnit.rentalHistory || selectedHistoryUnit.rentalHistory.length === 0" class="text-center py-8 text-xs text-ink-500">
              Ushbu unit bo'yicha oldingi ijara tarixi mavjud emas
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Plus, Search, Link, Tag, History, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()
const router = useRouter()
const makonStore = useMakonStore()

const buildingId = computed(() => route.params.id as string)
const building = computed(() => makonStore.buildings.find(b => b.id === buildingId.value))

const search = ref('')
const floorFilter = ref('')
const statusFilter = ref('')
const showCreateModal = ref(false)
const linkingUnit = ref<any>(null)
const selectedRoomId = ref('')
const selectedHistoryUnit = ref<any>(null)

const newUnit = ref({
  unitNumber: '',
  floor: 1,
  area: 100,
  category: 'OFFICE',
  monthlyRent: 3000,
  currency: 'UZS' as 'UZS' | 'UZS',
  status: 'VACANT' as 'VACANT' | 'RESERVED' | 'OCCUPIED'
})

const floorList = computed(() => {
  const count = building.value?.floorsCount || 10
  return Array.from({ length: count }, (_, i) => i + 1)
})

const units = computed(() => makonStore.units.filter(u => u.buildingId === buildingId.value))

const filteredUnits = computed(() => {
  let result = [...units.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(u => u.unitNumber.toLowerCase().includes(q) || u.category?.toLowerCase().includes(q))
  }
  if (floorFilter.value) {
    result = result.filter(u => u.floor === Number(floorFilter.value))
  }
  if (statusFilter.value) {
    result = result.filter(u => u.status === statusFilter.value)
  }
  return result
})


function statusClass(status: string) {
  if (status === 'OCCUPIED') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
  if (status === 'RESERVED') return 'bg-amber-500/10 text-amber-500 border-amber-500/30'
  return 'bg-brand-500/10 text-brand-500 border-brand-500/30'
}

function onStatusChange(unitId: string, newStatus: 'VACANT' | 'RESERVED' | 'OCCUPIED') {
  makonStore.updateUnitStatus(unitId, newStatus)
}

function handleCreateUnit() {
  makonStore.addUnit({
    buildingId: buildingId.value,
    buildingName: building.value?.name || 'Bino',
    unitNumber: newUnit.value.unitNumber,
    floor: newUnit.value.floor,
    area: newUnit.value.area,
    category: newUnit.value.category,
    monthlyRent: newUnit.value.monthlyRent,
    currency: newUnit.value.currency,
    status: newUnit.value.status,
  })
  showCreateModal.value = false
  newUnit.value.unitNumber = ''
}

function openRoomLinkModal(u: any) {
  linkingUnit.value = u
  selectedRoomId.value = u.roomId || `ROOM-${u.unitNumber}`
}

function saveRoomLink() {
  if (linkingUnit.value) {
    linkingUnit.value.roomId = selectedRoomId.value
    linkingUnit.value = null
  }
}

function prepareListing(u: any) {
  router.push({
    path: '/management/listings',
    query: { createForUnit: u.id, buildingId: buildingId.value }
  })
}
</script>
