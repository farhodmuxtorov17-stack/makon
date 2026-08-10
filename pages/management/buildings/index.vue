<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Binolar boshqaruvi</h1>
        <p class="text-ink-500 text-sm mt-1">Jami {{ filteredBuildings.length }} ta bino ro'yxati</p>
      </div>
      <button @click="showCreateModal = true" class="btn btn-primary btn-sm flex items-center gap-2">
        <Plus :size="16" /> Yangi bino qo'shish
      </button>
    </div>

    <!-- Search + Filters + View Toggle -->
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
          <option value="Yakkasaroy">Yakkasaroy</option>
          <option value="Yunusobod">Yunusobod</option>
          <option value="Sergeli">Sergeli</option>
        </select>
        <select v-model="statusFilter" class="input w-auto">
          <option value="">Barcha statuslar</option>
          <option value="vacant">Bo'sh joy bor</option>
          <option value="full">To'liq band</option>
        </select>
      </div>

      <!-- Table / Card View Toggle -->
      <div class="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <button
          @click="viewMode = 'card'"
          class="p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
          :class="viewMode === 'card' ? 'bg-white dark:bg-ink-800 text-brand-500 shadow-sm' : 'text-ink-500 hover:text-ink-900 dark:hover:text-white'"
        >
          <LayoutGrid :size="16" /> Card
        </button>
        <button
          @click="viewMode = 'table'"
          class="p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all"
          :class="viewMode === 'table' ? 'bg-white dark:bg-ink-800 text-brand-500 shadow-sm' : 'text-ink-500 hover:text-ink-900 dark:hover:text-white'"
        >
          <List :size="16" /> Jadval
        </button>
      </div>
    </div>

    <!-- CARD VIEW -->
    <div v-if="viewMode === 'card'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="b in filteredBuildings" :key="b.id" class="card overflow-hidden group hover:border-brand-500/40 transition-all duration-300">
        <!-- Card Cover -->
        <div class="h-44 overflow-hidden bg-ink-900 relative">
          <img v-if="b.gallery && b.gallery[0]" :src="b.gallery[0]" :alt="b.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div v-else class="w-full h-full flex items-center justify-center text-ink-600"><Building2 :size="48" /></div>
          
          <div class="absolute top-3 right-3 flex gap-2">
            <span class="badge badge-brand text-xs font-semibold shadow-md">{{ typeLabel(b.type) }}</span>
            <span v-if="b.vacantUnits > 0" class="badge badge-success text-xs shadow-md">{{ b.vacantUnits }} bo'sh</span>
            <span v-else class="badge badge-neutral text-xs shadow-md">To'liq</span>
          </div>

          <!-- Publish Toggle Badge -->
          <button
            @click.stop="togglePublish(b)"
            class="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur transition-all flex items-center gap-1"
            :class="b.isPublished ? 'bg-emerald-500/80 text-white' : 'bg-black/60 text-ink-300 hover:bg-black/80'"
            title="Chop etilganlik holatini o'zgartirish"
          >
            <Globe :size="12" /> {{ b.isPublished ? 'Nashr qilingan' : 'Qoralama' }}
          </button>
        </div>

        <!-- Card Body -->
        <div class="p-5 space-y-4">
          <div>
            <NuxtLink :to="`/management/buildings/${b.id}`" class="font-bold text-lg text-ink-900 dark:text-white hover:text-brand-500 transition-colors line-clamp-1">
              {{ b.name }}
            </NuxtLink>
            <p class="text-xs text-ink-500 flex items-center gap-1.5 mt-1">
              <MapPin :size="13" class="text-brand-500 flex-shrink-0" /> {{ b.address }}, {{ b.district }}
            </p>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-4 gap-2 py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-center">
            <div><div class="text-ink-500 text-[10px] uppercase">Qavat</div><div class="font-bold text-ink-900 dark:text-white">{{ b.floorsCount }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Unit</div><div class="font-bold text-ink-900 dark:text-white">{{ b.totalUnits }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Band</div><div class="font-bold text-emerald-500">{{ b.occupiedUnits }}</div></div>
            <div><div class="text-ink-500 text-[10px] uppercase">Maydon</div><div class="font-bold text-ink-900 dark:text-white">{{ (b.totalArea / 1000).toFixed(1) }}k m²</div></div>
          </div>

          <!-- Occupancy Bar -->
          <div>
            <div class="flex justify-between items-center text-xs mb-1">
              <span class="text-ink-500">Bandlik ko'rsatkichi</span>
              <span class="font-bold text-brand-500">{{ occupancyPct(b) }}%</span>
            </div>
            <div class="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-500" :style="{ width: occupancyPct(b) + '%' }"></div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-xs">
            <div class="flex items-center gap-2">
              <span v-if="b.has3dModel" class="badge badge-neutral text-[10px]"><Box :size="10" class="mr-1 inline" /> 3D</span>
              <span v-if="b.has2dPlan" class="badge badge-neutral text-[10px]"><Layers :size="10" class="mr-1 inline" /> 2D</span>
            </div>
            <NuxtLink :to="`/management/buildings/${b.id}`" class="text-brand-500 font-semibold hover:underline flex items-center gap-1">
              Batafsil <ArrowRight :size="14" />
            </NuxtLink>
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
            <tr v-for="b in filteredBuildings" :key="b.id" class="border-b border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/3 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-ink-800 overflow-hidden flex-shrink-0">
                    <img v-if="b.gallery && b.gallery[0]" :src="b.gallery[0]" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-ink-500"><Building2 :size="18" /></div>
                  </div>
                  <div>
                    <NuxtLink :to="`/management/buildings/${b.id}`" class="font-medium text-ink-900 dark:text-white hover:text-brand-500">
                      {{ b.name }}
                    </NuxtLink>
                    <div class="text-xs text-ink-500">{{ b.address }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3"><span class="badge badge-brand text-xs">{{ typeLabel(b.type) }}</span></td>
              <td class="px-4 py-3 text-ink-500">{{ b.district }}</td>
              <td class="px-4 py-3 text-center font-medium">{{ b.floorsCount }} qavat / {{ b.totalUnits }} unit</td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <span class="font-bold text-xs">{{ occupancyPct(b) }}%</span>
                  <div class="w-16 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                    <div class="h-full bg-brand-500" :style="{ width: occupancyPct(b) + '%' }"></div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-center">
                <button @click="togglePublish(b)" class="badge cursor-pointer" :class="b.isPublished ? 'badge-success' : 'badge-neutral'">
                  {{ b.isPublished ? 'Nashr etilgan' : 'Qoralama' }}
                </button>
              </td>
              <td class="px-4 py-3 text-right">
                <NuxtLink :to="`/management/buildings/${b.id}`" class="btn btn-ghost btn-sm text-xs">
                  Boshqaruv →
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Building Modal -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>
        <div class="relative w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white">Yangi bino yaratish</h3>
            <button @click="showCreateModal = false" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400">
              <X :size="20" />
            </button>
          </div>

          <form @submit.prevent="handleCreateBuilding" class="space-y-4">
            <div>
              <label class="label">Bino nomi</label>
              <input v-model="newBuilding.name" type="text" required placeholder="Masalan: Orient Plaza A" class="input w-full" />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Bino turi</label>
                <select v-model="newBuilding.type" class="input w-full">
                  <option value="BUSINESS_CENTER">Biznes markaz</option>
                  <option value="OFFICE">Ofis binosi</option>
                  <option value="SHOPPING">Savdo markazi</option>
                  <option value="WAREHOUSE">Ombor</option>
                  <option value="MIXED">Aralash</option>
                </select>
              </div>
              <div>
                <label class="label">Tuman</label>
                <input v-model="newBuilding.district" type="text" required placeholder="Mirobod" class="input w-full" />
              </div>
            </div>

            <div>
              <label class="label">Manzil</label>
              <input v-model="newBuilding.address" type="text" required placeholder="Oybek ko'chasi 24" class="input w-full" />
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="label">Qavatlar soni</label>
                <input v-model.number="newBuilding.floorsCount" type="number" min="1" required class="input w-full" />
              </div>
              <div>
                <label class="label">Unitlar soni</label>
                <input v-model.number="newBuilding.totalUnits" type="number" min="1" required class="input w-full" />
              </div>
              <div>
                <label class="label">Umumiy m²</label>
                <input v-model.number="newBuilding.totalArea" type="number" min="100" required class="input w-full" />
              </div>
            </div>

            <div>
              <label class="label">Ommaviy tavsif (Uzbek)</label>
              <textarea v-model="newBuilding.publicDescription" rows="2" placeholder="Bino haqida qisqacha ma'lumot..." class="input w-full"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
              <button type="button" @click="showCreateModal = false" class="btn btn-secondary">Bekor qilish</button>
              <button type="submit" class="btn btn-primary">Bino yaratish</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, Building2, MapPin, ArrowRight, LayoutGrid, List, Globe, Box, Layers, X } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const makonStore = useMakonStore()

const search = ref('')
const typeFilter = ref('')
const districtFilter = ref('')
const statusFilter = ref('')
const viewMode = ref<'card' | 'table'>('card')
const showCreateModal = ref(false)

const newBuilding = ref({
  name: '',
  type: 'BUSINESS_CENTER',
  address: '',
  city: 'Toshkent',
  district: 'Mirobod',
  floorsCount: 10,
  totalUnits: 40,
  totalArea: 12000,
  gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'],
  publicDescription: '',
  publicDescriptionRu: '',
  isPublished: true,
  cadastralNumber: '10:04:9998877:01',
  buildYear: 2025,
  has3dModel: false,
  has2dPlan: false,
  documents: [],
  amenities: ['24/7 Xavfsizlik', 'Parkovka', 'Fiber-Optic Internet']
})

const filteredBuildings = computed(() => {
  let result = [...makonStore.buildings]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(b =>
      b.name?.toLowerCase().includes(q) ||
      b.address?.toLowerCase().includes(q) ||
      b.district?.toLowerCase().includes(q)
    )
  }
  if (typeFilter.value) result = result.filter(b => b.type === typeFilter.value)
  if (districtFilter.value) result = result.filter(b => b.district === districtFilter.value)
  if (statusFilter.value === 'vacant') result = result.filter(b => (b.vacantUnits || 0) > 0)
  if (statusFilter.value === 'full') result = result.filter(b => (b.vacantUnits || 0) === 0)

  return result
})

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function occupancyPct(b: any) {
  if (!b.totalUnits) return 0
  return Math.round(((b.occupiedUnits || 0) / b.totalUnits) * 100)
}

function togglePublish(b: any) {
  b.isPublished = !b.isPublished
}

function handleCreateBuilding() {
  makonStore.addBuilding({
    ...newBuilding.value
  })
  showCreateModal.value = false
  // Reset form
  newBuilding.value.name = ''
  newBuilding.value.address = ''
  newBuilding.value.publicDescription = ''
}
</script>
