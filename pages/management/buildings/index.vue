<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">Binolar</div>
      <h1 class="page-title">Binolar</h1>
      <p class="page-sub">Jami {{ filteredBuildings.length }} ta bino · bino ma'lumotlari, unitlar va bandlik</p>
      </div>
      <button @click="showCreateModal = true" class="btn btn-primary btn-sm flex items-center gap-2">
        <Plus :size="16" /> Yangi bino qo'shish
      </button>
    </div>

    <!-- Premium Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
      <div class="dash-kpi dash-kpi--blue">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Building2 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ buildings.length }}</div>
          <div class="dash-kpi__label">Binolar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--violet">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Grid3x3 :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalFloors }}</div>
          <div class="dash-kpi__label">Qavatlar</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--amber">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Package :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalUnits }}</div>
          <div class="dash-kpi__label">Jami unit</div>
        </div>
      </div>
      <div class="dash-kpi dash-kpi--emerald">
        <div class="dash-kpi__glow"></div>
        <div class="dash-kpi__icon"><Home :size="22" :stroke-width="1.8" /></div>
        <div class="dash-kpi__body">
          <div class="dash-kpi__value">{{ totalOccupied }}<span class="text-sm text-ink-400">/{{ totalUnits }}</span></div>
          <div class="dash-kpi__label">Band unitlar</div>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <div class="relative flex-1 min-w-[220px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Bino nomi, manzil yoki tuman..." class="input pl-9 w-full" />
        </div>
        <select v-model="typeFilter" class="input w-auto">
          <option value="">Barcha turlar</option>
          <option value="BUSINESS_CENTER">Biznes markaz</option>
          <option value="OFFICE">Ofis</option>
          <option value="SHOPPING">Savdo markaz</option>
          <option value="WAREHOUSE">Ombor</option>
          <option value="RESIDENTIAL">Turar joy</option>
          <option value="MIXED">Aralash</option>
        </select>
        <select v-model="districtFilter" class="input w-auto">
          <option value="">Barcha tumanlar</option>
          <option value="Mirobod">Mirobod</option>
          <option value="Shayxontohur">Shayxontohur</option>
          <option value="Yakkasaray">Yakkasaray</option>
          <option value="Yunusobod">Yunusobod</option>
          <option value="Sergeli">Sergeli</option>
        </select>
        <select v-model="statusFilter" class="input w-auto">
          <option value="">Barcha statuslar</option>
          <option value="vacant">Bo'sh joy bor</option>
          <option value="full">To'liq band</option>
        </select>
      </div>

      <div class="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <button @click="viewMode = 'card'" class="p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all" :class="viewMode === 'card' ? 'bg-white dark:bg-ink-800 text-brand-500 shadow-sm' : 'text-ink-500 hover:text-ink-900 dark:hover:text-white'">
          <LayoutGrid :size="16" /> Card
        </button>
        <button @click="viewMode = 'table'" class="p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all" :class="viewMode === 'table' ? 'bg-white dark:bg-ink-800 text-brand-500 shadow-sm' : 'text-ink-500 hover:text-ink-900 dark:hover:text-white'">
          <List :size="16" /> Jadval
        </button>
      </div>
    </div>

    <!-- CARD VIEW -->
    <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="b in filteredBuildings" :key="b.id" class="building-card group" @click="openBuilding(b)">
        <div class="building-card__img relative">
          <img v-if="b.gallery && b.gallery[0]" :src="img(b.gallery[0])" :alt="b.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div v-else class="w-full h-full flex items-center justify-center text-ink-600"><Building2 :size="48" /></div>
          <div class="absolute top-3 right-3 flex gap-2">
            <span class="badge badge-brand text-xs font-semibold shadow-md">{{ typeLabel(b.type) }}</span>
            <span v-if="b.vacantUnits > 0" class="badge badge-success text-xs shadow-md">{{ b.vacantUnits }} bo'sh</span>
            <span v-else class="badge badge-neutral text-xs shadow-md">To'liq</span>
          </div>
          <button @click.stop="togglePublish(b)" class="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur transition-all flex items-center gap-1" :class="b.isPublished ? 'bg-emerald-500/80 text-white' : 'bg-black/60 text-ink-300 hover:bg-black/80'">
            <Globe :size="12" /> {{ b.isPublished ? 'Nashr' : 'Qoralama' }}
          </button>
        </div>
        <div class="p-5 space-y-4">
          <div>
            <div class="font-bold text-lg text-ink-900 dark:text-white line-clamp-1">{{ b.name }}</div>
            <p class="text-xs text-ink-500 flex items-center gap-1.5 mt-1">
              <MapPin :size="13" class="text-brand-500 flex-shrink-0" /> {{ b.address }}, {{ b.district }}
            </p>
          </div>
          <div class="grid grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-center">
            <div><div class="text-ink-500 text-[10px] uppercase">Qavat</div><div class="font-bold text-ink-900 dark:text-white">{{ b.floorsCount }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Unit</div><div class="font-bold text-ink-900 dark:text-white">{{ b.totalUnits }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Band</div><div class="font-bold text-emerald-500">{{ b.occupiedUnits }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Maydon</div><div class="font-bold text-ink-900 dark:text-white">{{ (b.totalArea / 1000).toFixed(1) }}k m²</div></div>
          </div>
          <div>
            <div class="flex justify-between items-center text-xs mb-1">
              <span class="text-ink-500">Bandlik ko'rsatkichi</span>
              <span class="font-bold text-brand-500">{{ occupancyPct(b) }}%</span>
            </div>
            <div class="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500" :style="{ width: occupancyPct(b) + '%' }"></div>
            </div>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-xs">
            <div class="flex items-center gap-2">
              <span v-if="b.has3dModel" class="badge badge-neutral text-[10px]"><Box :size="10" class="mr-1 inline" /> 3D</span>
              <span v-if="b.has2dPlan" class="badge badge-neutral text-[10px]"><Layers :size="10" class="mr-1 inline" /> 2D</span>
              <span class="text-ink-400">{{ b.managedBy || 'Tayinlanmagan' }}</span>
            </div>
            <span class="text-brand-500 font-semibold flex items-center gap-1">Batafsil <ArrowRight :size="14" /></span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABLE VIEW -->
    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-black/5 dark:border-white/5 text-ink-500 text-xs uppercase tracking-wider text-left bg-black/5 dark:bg-white/5">
              <th class="px-4 py-3">Bino</th>
              <th class="px-4 py-3">Turi</th>
              <th class="px-4 py-3">Tuman</th>
              <th class="px-4 py-3 text-center">Qavat / Unit</th>
              <th class="px-4 py-3 text-center">Bandlik</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-right">Harakatlar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in filteredBuildings" :key="b.id" class="border-b border-black/5 dark:border-white/5 hover:bg-brand-500/5 transition-colors cursor-pointer" @click="openBuilding(b)">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-ink-800 overflow-hidden flex-shrink-0">
                    <img v-if="b.gallery && b.gallery[0]" :src="img(b.gallery[0])" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-ink-500"><Building2 :size="18" /></div>
                  </div>
                  <div>
                    <div class="font-medium text-ink-900 dark:text-white">{{ b.name }}</div>
                    <div class="text-xs text-ink-500">{{ b.address }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3"><span class="badge badge-brand text-xs">{{ typeLabel(b.type) }}</span></td>
              <td class="px-4 py-3 text-ink-500">{{ b.district }}</td>
              <td class="px-4 py-3 text-center font-medium">{{ b.floorsCount }} / {{ b.totalUnits }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <span class="font-bold text-xs">{{ occupancyPct(b) }}%</span>
                  <div class="w-16 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div class="h-full bg-brand-500" :style="{ width: occupancyPct(b) + '%' }"></div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <button @click.stop="togglePublish(b)" class="badge cursor-pointer" :class="b.isPublished ? 'badge-success' : 'badge-neutral'">
                  {{ b.isPublished ? 'Nashr' : 'Qoralama' }}
                </button>
              </td>
              <td class="px-4 py-3 text-right">
                <button @click.stop="openBuilding(b)" class="btn btn-ghost btn-sm px-2" title="Batafsil">
                  <Eye :size="16" />
                </button>
                <button @click.stop="togglePublish(b)" class="btn btn-ghost btn-sm px-2" title="Nashr">
                  <Globe :size="16" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- New -->
    <DrawerModal :open="showCreateModal" title="Yangi bino qo'shish" width="480px" @close="showCreateModal = false">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Bino nomi</label>
          <input v-model="newBuilding.name" type="text" class="input w-full" placeholder="Masalan: Tashkent City" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Turi</label>
            <select v-model="newBuilding.type" class="input w-full">
              <option value="BUSINESS_CENTER">Biznes markaz</option>
              <option value="OFFICE">Ofis binosi</option>
              <option value="SHOPPING">Savdo markaz</option>
              <option value="WAREHOUSE">Ombor</option>
              <option value="MIXED">Aralash</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Tuman</label>
            <select v-model="newBuilding.district" class="input w-full">
              <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Manzil</label>
          <input v-model="newBuilding.address" type="text" class="input w-full" placeholder="Masalan: Mirzo Ulug'bek tumani" />
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Qavatlar</label>
            <input v-model.number="newBuilding.floorsCount" type="number" class="input w-full" placeholder="12" />
          </div>
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Unitlar</label>
            <input v-model.number="newBuilding.totalUnits" type="number" class="input w-full" placeholder="420" />
          </div>
          <div>
            <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Maydon (m²)</label>
            <input v-model.number="newBuilding.totalArea" type="number" class="input w-full" placeholder="45000" />
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5 block">Rasm URL</label>
          <input v-model="newBuilding.gallery" type="text" class="input w-full" placeholder="https://..." />
        </div>
      </div>
      <template #footer>
        <button @click="showCreateModal = false" class="btn btn-ghost btn-sm">Bekor qilish</button>
        <button @click="createBuilding" class="btn btn-primary btn-sm btn-glow">
          <Check :size="14" /> Yaratish
        </button>
      </template>
    </DrawerModal>

    <!-- Detail drawer -->
    <DrawerModal :open="!!selectedBuilding" :title="selectedBuilding?.name || ''" width="520px" @close="selectedBuilding = null">
      <div v-if="selectedBuilding" class="space-y-5">
        <div class="rounded-xl overflow-hidden h-48 bg-ink-800">
          <img v-if="selectedBuilding.gallery?.[0]" :src="selectedBuilding.gallery[0]" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-ink-500"><Building2 :size="48" /></div>
        </div>
        <div class="flex items-center gap-2">
          <span class="badge badge-brand">{{ typeLabel(selectedBuilding.type) }}</span>
          <span class="badge" :class="selectedBuilding.isPublished ? 'badge-success' : 'badge-neutral'">
            {{ selectedBuilding.isPublished ? 'Nashr qilingan' : 'Qoralama' }}
          </span>
        </div>
        <div>
          <div class="text-xs text-ink-500 mb-1">Manzil</div>
          <div class="text-sm font-medium text-ink-900 dark:text-white flex items-center gap-1.5">
            <MapPin :size="14" class="text-brand-500" /> {{ selectedBuilding.address }}, {{ selectedBuilding.district }}
          </div>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-center">
            <div class="text-lg font-bold text-ink-900 dark:text-white">{{ selectedBuilding.floorsCount }}</div>
            <div class="text-[10px] text-ink-500 uppercase">Qavat</div>
          </div>
          <div class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-center">
            <div class="text-lg font-bold text-ink-900 dark:text-white">{{ selectedBuilding.totalUnits }}</div>
            <div class="text-[10px] text-ink-500 uppercase">Unit</div>
          </div>
          <div class="p-3 rounded-xl bg-emerald-500/5 text-center">
            <div class="text-lg font-bold text-emerald-500">{{ selectedBuilding.occupiedUnits }}</div>
            <div class="text-[10px] text-ink-500 uppercase">Band</div>
          </div>
          <div class="p-3 rounded-xl bg-brand-500/5 text-center">
            <div class="text-lg font-bold text-brand-500">{{ selectedBuilding.vacantUnits }}</div>
            <div class="text-[10px] text-ink-500 uppercase">Bo'sh</div>
          </div>
        </div>
        <div>
          <div class="flex justify-between items-center text-xs mb-1.5">
            <span class="text-ink-500">Bandlik</span>
            <span class="font-bold text-brand-500">{{ occupancyPct(selectedBuilding) }}%</span>
          </div>
          <div class="h-2.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full" :style="{ width: occupancyPct(selectedBuilding) + '%' }"></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 rounded-xl border border-black/5 dark:border-white/5">
            <div class="text-xs text-ink-500">Maydon</div>
            <div class="text-sm font-bold text-ink-900 dark:text-white">{{ selectedBuilding.totalArea.toLocaleString() }} m²</div>
          </div>
          <div class="p-3 rounded-xl border border-black/5 dark:border-white/5">
            <div class="text-xs text-ink-500">Boshqaruvchi</div>
            <div class="text-sm font-bold text-ink-900 dark:text-white">{{ selectedBuilding.managedBy || 'Tayinlanmagan' }}</div>
          </div>
        </div>
      </div>
      <template #footer>
        <button @click="selectedBuilding = null" class="btn btn-ghost btn-sm">Yopish</button>
        <NuxtLink :to="`/management/buildings/${selectedBuilding?.id}`" class="btn btn-primary btn-sm btn-glow">
          <Settings :size="14" /> Boshqarish
        </NuxtLink>
      </template>
    </DrawerModal>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import KpiCard from '~/components/KpiCard.vue'
import { Plus, Search, Building2, MapPin, Globe, LayoutGrid, List, ArrowRight, Eye, Box, Layers, Check, Settings , Grid3x3, Home, Package} from 'lucide-vue-next'

definePageMeta({ roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })

const makonStore = useMakonStore()
const buildings = computed(() => makonStore.buildings.filter(b => !b.id.startsWith('_deleted')))

const search = ref('')
const typeFilter = ref('')
const districtFilter = ref('')
const statusFilter = ref('')
const viewMode = ref('card')
const showCreateModal = ref(false)
const selectedBuilding = ref<any>(null)

const districts = ['Mirobod', 'Shayxontohur', 'Yakkasaray', 'Yunusobod', 'Sergeli', 'Yashnabad', 'Mirzo Ulug\'bek']

const newBuilding = ref({
  name: '', type: 'BUSINESS_CENTER', district: 'Mirobod', address: '',
  floorsCount: 12, totalUnits: 100, totalArea: 20000, gallery: ''
})

const totalFloors = computed(() => buildings.value.reduce((s, b) => s + (b.floorsCount || 0), 0))
const totalUnits = computed(() => buildings.value.reduce((s, b) => s + (b.totalUnits || 0), 0))
const totalOccupied = computed(() => buildings.value.reduce((s, b) => s + (b.occupiedUnits || 0), 0))

const filteredBuildings = computed(() => {
  let r = [...buildings.value]
  if (search.value) {
    const q = search.value.toLowerCase()
    r = r.filter(b => b.name.toLowerCase().includes(q) || b.address?.toLowerCase().includes(q) || b.district?.toLowerCase().includes(q))
  }
  if (typeFilter.value) r = r.filter(b => b.type === typeFilter.value)
  if (districtFilter.value) r = r.filter(b => b.district === districtFilter.value)
  if (statusFilter.value === 'vacant') r = r.filter(b => b.vacantUnits > 0)
  if (statusFilter.value === 'full') r = r.filter(b => b.vacantUnits === 0)
  return r
})

function openBuilding(b: any) {
  selectedBuilding.value = b
}

function togglePublish(b: any) {
  makonStore.updateBuilding(b.id, { isPublished: !b.isPublished })
}

function createBuilding() {
  const building = {
    ...newBuilding.value,
    gallery: newBuilding.value.gallery ? [newBuilding.value.gallery] : [],
    occupiedUnits: 0,
    vacantUnits: newBuilding.value.totalUnits,
    slug: newBuilding.value.name.toLowerCase().replace(/\s+/g, '-'),
    isPublished: false,
    has3dModel: false,
    has2dPlan: false,
  }
  makonStore.addBuilding(building)
  showCreateModal.value = false
  newBuilding.value = { name: '', type: 'BUSINESS_CENTER', district: 'Mirobod', address: '', floorsCount: 12, totalUnits: 100, totalArea: 20000, gallery: '' }
}

function occupancyPct(b: any) {
  if (!b.totalUnits) return 0
  return Math.round((b.occupiedUnits / b.totalUnits) * 100)
}

function typeLabel(t: string) {
  const labels: Record<string, string> = {
    BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis binosi', SHOPPING: 'Savdo markaz',
    WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash'
  }
  return labels[t] || t
}
</script>

<style scoped>
.stat-pill { position: relative; overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  flex: 1;
  min-width: 160px;
}
.stat-pill__icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-pill__val {
  font-size: 20px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.1;
}
.stat-pill__of {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}
.stat-pill__label {
  font-size: 11px;
  color: var(--text-muted);
  font-weight: 500;
  margin-top: 2px;
}
</style>
