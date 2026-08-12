<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <div class="eyebrow">MANAGEMENT / LISTINGS</div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Listinglar</h1>
      <p class="page-sub">Public marketplace listinglari va holatlari</p>
        <p class="text-ink-500 text-sm mt-1">Ommaviy katalogdagi ijara va sotuv e'lonlari</p>
      </div>
      <button @click="openCreateModal()" class="btn btn-primary btn-sm flex items-center gap-2">
        <Plus :size="16" /> Yangi listing e'lon qilish
      </button>
    </div>

    <!-- KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><KpiScene3D type="buildings" :size="36" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ listings.length }}</div>
          <div class="kpi-strip__label">Jami listinglar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="paid" :size="36" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ publishedCount }}</div>
          <div class="kpi-strip__label">Nashr qilingan</div>
        </div>
        <div v-if="listings.length" class="kpi-strip__pct">{{ Math.round(publishedCount / listings.length * 100) }}%</div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="contract" :size="36" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ draftCount }}</div>
          <div class="kpi-strip__label">Qoralamalar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><KpiScene3D type="overdue" :size="36" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ hiddenCount }}</div>
          <div class="kpi-strip__label">Yashirilgan</div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input v-model="search" type="text" placeholder="Sarlavha bo'yicha qidiruv..." class="input pl-9 w-full" />
        </div>
        <select v-model="offerTypeFilter" class="input w-auto">
          <option value="">Barcha takliflar</option>
          <option value="RENT">Ijaraga (Rent)</option>
          <option value="SALE">Sotuvga (Sale)</option>
        </select>
        <select v-model="statusFilter" class="input w-auto">
          <option value="">Barcha statuslar</option>
          <option value="PUBLISHED">Nashr qilingan (Active)</option>
          <option value="DRAFT">Qoralama (Draft)</option>
          <option value="HIDDEN">Yashirilgan (Hidden)</option>
          <option value="ARCHIVED">Arxivlangan (Archived)</option>
        </select>
      </div>
    </div>

    <!-- Listings -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="l in filteredListings" :key="l.id" class="card overflow-hidden group hover:border-brand-500/40 transition-all">
        <!-- Photo Cover -->
        <div class="h-48 overflow-hidden bg-ink-900 relative">
          <img v-if="l.photos && l.photos[0]" :src="img(l.photos[0])" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div v-else class="w-full h-full flex items-center justify-center text-ink-600"><Tag :size="48" /></div>

          <div class="absolute top-3 right-3 flex gap-2">
            <span class="badge text-xs shadow-md" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">
              {{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}
            </span>
            <span class="badge text-xs shadow-md" :class="statusBadgeClass(l.status)">
              {{ statusLabel(l.status) }}
            </span>
            <span v-if="getUnitStatus(l.unitId)" class="badge text-[10px] shadow-sm"
              :class="getUnitStatus(l.unitId) === 'OCCUPIED' ? 'badge-error' : getUnitStatus(l.unitId) === 'RESERVED' ? 'badge-warning' : 'badge-success'">
              {{ getUnitStatusLabel(l.unitId) }}
            </span>
          </div>

          <!-- Quick Toggle Publish / Pause -->
          <button
            @click="togglePublish(l)"
            class="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium backdrop-blur transition-all flex items-center gap-1"
            :class="l.status === 'PUBLISHED' ? 'bg-emerald-500/80 text-white' : 'bg-black/60 text-ink-300 hover:bg-black/80'"
          >
            <Power :size="12" /> {{ l.status === 'PUBLISHED' ? 'Faol' : 'Pauza' }}
          </button>
        </div>

        <!-- Card Body -->
        <div class="p-5 space-y-3">
          <h3 class="font-bold text-base text-ink-900 dark:text-white line-clamp-1 group-hover:text-brand-500 transition-colors">
            {{ l.titleUz }}
          </h3>
          <p class="text-xs text-ink-500 line-clamp-2 leading-relaxed">
            {{ l.descriptionUz }}
          </p>

          <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5">
            <div>
              <div class="text-[10px] text-ink-500 uppercase tracking-wider">Narx</div>
              <div class="text-lg font-bold text-brand-500">{{ formatUZS(l.price) }}</div>
            </div>

            <div class="flex items-center gap-3 text-xs text-ink-500">
              <span class="flex items-center gap-1" title="Ko'rishlar soni">
                <Eye :size="14" class="text-brand-400" /> {{ l.viewsCount || 0 }}
              </span>
              <span v-if="l.virtualTourUrl" class="badge badge-neutral text-[10px]" title="Virtual Tour mavjud">
                3D Tour
              </span>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/5 text-xs">
            <button @click="previewListing = l" class="btn btn-ghost btn-sm text-xs flex items-center gap-1">
              <Eye :size="14" /> Ko'rish
            </button>
            <NuxtLink :to="`/listings/${l.id}`" class="text-brand-500 font-semibold hover:underline flex items-center gap-1">
              Katalog sahifasi →
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="filteredListings.length === 0" class="md:col-span-3 text-center py-16 text-ink-500 card">
        Filtr bo'yicha listinglar topilmadi
      </div>
    </div>

    <!-- New listing -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>
        <div class="relative w-full max-w-2xl bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white">Yangi Listing yaratish</h3>
            <button @click="showCreateModal = false" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <form @submit.prevent="handleCreateListing" class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Bino</label>
                <select v-model="newListing.buildingId" class="input w-full" required>
                  <option v-for="b in makonStore.buildings" :key="b.id" :value="b.id">{{ b.name }}</option>
                </select>
              </div>
              <div>
                <label class="label">Unit (Xona)</label>
                <select v-model="newListing.unitId" class="input w-full">
                  <option value="">Biriktirilmagan</option>
                  <option v-for="u in availableUnits" :key="u.id" :value="u.id">Unit {{ u.unitNumber }} ({{ u.area }}m²)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="label">Taklif turi</label>
                <select v-model="newListing.offerType" class="input w-full">
                  <option value="RENT">Ijaraga (Rent)</option>
                  <option value="SALE">Sotuvga (Sale)</option>
                </select>
              </div>
              <div>
                <label class="label">Narxi</label>
                <input v-model.number="newListing.price" type="number" min="1" required class="input w-full" />
              </div>
              <div>
                <label class="label">Valyuta</label>
                <select v-model="newListing.currency" class="input w-full">
                  <option value="UZS">UZS (so0027m)</option>
                  <option value="UZS">UZS (UZS)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="label">Sarlavha (Uzbekcha)</label>
              <input v-model="newListing.titleUz" type="text" required placeholder="Masalan: 120m² tayyor panorama ofis" class="input w-full" />
            </div>

            <div>
              <label class="label">Sarlavha (Ruscha)</label>
              <input v-model="newListing.titleRu" type="text" required placeholder="Masalan: Готовый панорамный офис 120м²" class="input w-full" />
            </div>

            <div>
              <label class="label">Tavsif (Uzbekcha)</label>
              <textarea v-model="newListing.descriptionUz" rows="2" class="input w-full"></textarea>
            </div>

            <div>
              <label class="label">Tavsif (Ruscha)</label>
              <textarea v-model="newListing.descriptionRu" rows="2" class="input w-full"></textarea>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Rasm URL</label>
                <input v-model="newListing.photoUrl" type="text" placeholder="https://..." class="input w-full text-xs" />
              </div>
              <div>
                <label class="label">Virtual Tour URL (Matterport / 3D)</label>
                <input v-model="newListing.virtualTourUrl" type="text" placeholder="https://my.matterport.com/show/..." class="input w-full text-xs" />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
              <button type="button" @click="showCreateModal = false" class="btn btn-secondary">Bekor qilish</button>
              <button type="submit" class="btn btn-primary">Chop etish / Yaratish</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Preview -->
    <Teleport to="body">
      <div v-if="previewListing" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="previewListing = null"></div>
        <div class="relative w-full max-w-lg bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
            <h3 class="text-lg font-bold text-ink-900 dark:text-white">Listing Preview</h3>
            <button @click="previewListing = null" class="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-400"><X :size="20" /></button>
          </div>

          <div class="h-48 rounded-xl overflow-hidden bg-ink-800">
            <img v-if="previewListing.photos && previewListing.photos[0]" :src="img(previewListing.photos[0])" class="w-full h-full object-cover" />
          </div>

          <div>
            <h4 class="font-bold text-base text-ink-900 dark:text-white">{{ previewListing.titleUz }}</h4>
            <p class="text-xs text-ink-500 mt-1">{{ previewListing.descriptionUz }}</p>
          </div>

          <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
            <div class="text-xl font-bold text-brand-500">{{ formatUZS(previewListing.price) }}</div>
            <span class="badge" :class="statusBadgeClass(previewListing.status)">{{ statusLabel(previewListing.status) }}</span>
          </div>
        </div>
      </div>
    </Teleport>

    <CreateListingModal :show="showCreateListing" :buildings="data?.buildings || []" @close="showCreateListing = false" @created="onListingCreated" />
</div>
</template>

<script setup lang="ts">
const { img } = useImg()
import CreateListingModal from '~/components/CreateListingModal.vue'
import { Plus, Search, Tag, Power, Eye, X } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()
const makonStore = useMakonStore()

const search = ref('')
const offerTypeFilter = ref('')
const statusFilter = ref('')
const showCreateModal = ref(false)
const previewListing = ref<any>(null)

const newListing = ref({
  buildingId: makonStore.buildings[0]?.id || '',
  unitId: '',
  titleUz: '',
  titleRu: '',
  descriptionUz: '',
  descriptionRu: '',
  offerType: 'RENT' as 'RENT' | 'SALE',
  price: 3000,
  currency: 'UZS' as 'UZS' | 'UZS',
  photoUrl: '/buildings/hero-tashkent.jpg',
  virtualTourUrl: '',
  status: 'PUBLISHED' as 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'ARCHIVED'
})

// Auto open create modal if query params provided
onMounted(() => {
  if (route.query.createForUnit) {
    newListing.value.buildingId = (route.query.buildingId as string) || makonStore.buildings[0]?.id
    newListing.value.unitId = route.query.createForUnit as string
    showCreateModal.value = true
  }
})

const availableUnits = computed(() => {
  return makonStore.units.filter(u => u.buildingId === newListing.value.buildingId)
})

const publishedCount = computed(() => listings.value.filter(l => l.status === 'PUBLISHED').length)
const draftCount = computed(() => listings.value.filter(l => l.status === 'DRAFT').length)
const hiddenCount = computed(() => listings.value.filter(l => l.status === 'HIDDEN' || l.status === 'ARCHIVED').length)

const filteredListings = computed(() => {
  let result = [...makonStore.listings]

  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(l => l.titleUz?.toLowerCase().includes(q) || l.titleRu?.toLowerCase().includes(q))
  }
  if (offerTypeFilter.value) {
    result = result.filter(l => l.offerType === offerTypeFilter.value)
  }
  if (statusFilter.value) {
    result = result.filter(l => l.status === statusFilter.value)
  }

  return result
})


function statusBadgeClass(status: string) {
  if (status === 'PUBLISHED') return 'badge-success'
  if (status === 'DRAFT') return 'badge-warning'
  if (status === 'HIDDEN') return 'badge-neutral'
  return 'badge-danger'
}

function statusLabel(status: string) {
  if (status === 'PUBLISHED') return 'Nashr qilingan'
  if (status === 'DRAFT') return 'Qoralama'
  if (status === 'HIDDEN') return 'Yashirilgan'
  return 'Arxiv'
}

function getUnitStatus(unitId?: string) {
  if (!unitId) return ''
  const u = makonStore.units.find(item => item.id === unitId)
  return u?.status || ''
}
function getUnitStatusLabel(unitId?: string) {
  const s = getUnitStatus(unitId)
  if (s === 'OCCUPIED') return 'Band'
  if (s === 'RESERVED') return 'Rezerv'
  if (s === 'VACANT') return "Bo'sh"
  return ''
}

function togglePublish(l: any) {
  // Check if linked unit is occupied — if so, prevent publishing
  if (l.unitId) {
    const unit = makonStore.units.find(u => u.id === l.unitId)
    if (unit && unit.status === 'OCCUPIED') {
      alert("Unit band (OCCUPIED) — listingni marketplace'da ko'rsatib bo'lmaydi.")
      return
    }
  }
  l.status = l.status === 'PUBLISHED' ? 'HIDDEN' : 'PUBLISHED'
}

function openCreateModal() {
  showCreateModal.value = true
}

function handleCreateListing() {
  makonStore.addListing({
    buildingId: newListing.value.buildingId,
    unitId: newListing.value.unitId,
    titleUz: newListing.value.titleUz,
    titleRu: newListing.value.titleRu,
    descriptionUz: newListing.value.descriptionUz,
    descriptionRu: newListing.value.descriptionRu,
    offerType: newListing.value.offerType,
    price: newListing.value.price,
    currency: newListing.value.currency,
    photos: [newListing.value.photoUrl],
    status: newListing.value.status,
    virtualTourUrl: newListing.value.virtualTourUrl
  })
  showCreateModal.value = false
}
</script>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
.kpi-strip__pct { font-size: 12px; font-weight: 700; color: var(--accent, #2563EB); padding: 2px 8px; border-radius: 8px; background: rgba(37,99,235,0.1); }
</style>