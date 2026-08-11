<template>
  <div class="min-h-screen">
    <div v-if="pending" class="py-32 text-center text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="error || !data" class="py-32 text-center">
      <p class="text-red-400 mb-4">Taklif topilmadi</p>
      <NuxtLink to="/catalog" class="btn btn-secondary btn-sm">Katalogga qaytish</NuxtLink>
    </div>

    <template v-else>
      <!-- Hero with gallery -->
      <section class="relative">
        <div class="relative h-[420px] overflow-hidden bg-ink-900">
          <div class="absolute inset-0 bg-cover bg-center transition-opacity duration-500" :style="{ backgroundImage: `url(${currentPhoto})`, opacity: 1 }" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent"></div>

          <!-- Nav buttons for gallery -->
          <div v-if="listing.photos.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button v-for="(p, i) in listing.photos" :key="i" @click="currentPhotoIdx = i"
              class="w-2 h-2 rounded-full transition-all"
              :class="currentPhotoIdx === i ? 'bg-white w-8' : 'bg-white/30'" />
          </div>

          <!-- Back button -->
          <div class="absolute top-4 left-4">
            <NuxtLink :to="`/buildings/${data.building.slug}`" class="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur transition-colors">
              <ArrowLeft :size="16" /> {{ data.building.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Thumbnails -->
        <div v-if="listing.photos.length > 1" class="max-w-7xl mx-auto px-4 lg:px-6 py-3">
          <div class="flex gap-2 overflow-x-auto pb-2">
            <div v-for="(p, i) in listing.photos" :key="i"
              @click="currentPhotoIdx = i"
              class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all"
              :class="currentPhotoIdx === i ? 'ring-2 ring-brand-500' : 'opacity-50 hover:opacity-100'">
              <img :src="p" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-8 px-4 lg:px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main info -->
          <div class="lg:col-span-2 space-y-6">
            <div>
              <div class="flex items-center gap-3 mb-3">
                <span class="badge" :class="listing.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">
                  {{ listing.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}
                </span>
                <span class="badge badge-neutral">{{ typeLabel(data.building.type) }}</span>
                <span v-if="listing.viewsCount" class="text-xs text-ink-500 flex items-center gap-1">
                  <Eye :size="14" /> {{ listing.viewsCount }} ko'rishlar
                </span>
              </div>
              <h1 class="text-3xl font-bold text-ink-900 dark:text-white mb-2">{{ listing.titleUz }}</h1>
              <p class="text-ink-400 flex items-center gap-2">
                <MapPin :size="16" /> {{ data.building.address }}, {{ data.building.district }}
              </p>
            </div>

            <!-- Description -->
            <div class="card-premium p-6">
              <h3 class="font-semibold dark:text-white mb-3">Tavsif</h3>
              <p class="text-ink-400 leading-relaxed">{{ listing.descriptionUz || listing.descriptionRu || 'Tavsif kiritilmagan' }}</p>
            </div>


            <!-- Floor Plan (real image from internet) -->
            <div class="card-premium p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold dark:text-white">Planirovka</h3>
                <div class="flex gap-2">
                  <button @click="planView = 'photo'" class="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    :class="planView === 'photo' ? 'bg-brand-500/20 text-brand-400' : 'text-ink-500 hover:text-ink-300'">
                    Planirovka
                  </button>
                  <button @click="planView = 'dimensions'" class="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    :class="planView === 'dimensions' ? 'bg-brand-500/20 text-brand-400' : 'text-ink-500 hover:text-ink-300'">
                    O'lchamlar
                  </button>
                </div>
              </div>

              <!-- Real floor plan photo -->
              <div v-if="planView === 'photo'" class="floor-plan-container">
                <div class="relative rounded-xl overflow-hidden bg-ink-900">
                  <img
                    :src="floorPlanImage"
                    alt="Ofis planirovkasi"
                    class="w-full"
                    style="max-height: 500px; object-fit: contain;"
                  />
                  <!-- Overlay info -->
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink-950/90 to-transparent p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-3">
                        <div class="flex items-center gap-1.5 text-xs text-white/70">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6l9-3 9 3M3 6v12l9 3 9-3V6M3 6l9 3 9-3M12 9v12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                          {{ listing.area || 85 }} m²
                        </div>
                        <div class="flex items-center gap-1.5 text-xs text-white/70">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" stroke-width="1"/></svg>
                          {{ (listing.rooms || []).length }} xona
                        </div>
                      </div>
                      <span class="text-xs text-white/40">Tipik ofis planirovkasi</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Dimensions view (2D SVG) -->
              <div v-else class="floor-plan-container">
                <svg viewBox="0 0 100 60" class="w-full" style="max-height: 400px;">
                  <defs>
                    <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(15,118,110,0.12)" stroke-width="0.3"/>
                    </pattern>
                    <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.9"/>
                      <stop offset="100%" stop-color="var(--accent-hover)" stop-opacity="0.7"/>
                    </linearGradient>
                  </defs>
                  <rect width="100" height="60" fill="url(#grid)" />
                  <rect x="2" y="2" width="96" height="56" fill="none" stroke="url(#wallGrad)" stroke-width="1.5" rx="0.5" />
                  <template v-for="(room, i) in (listing.rooms || defaultRooms)" :key="i">
                    <rect :x="room.x" :y="room.y" :width="room.w" :height="room.h"
                      :fill="roomColor(room.type)" :opacity="0.25" rx="0.5" />
                    <rect :x="room.x" :y="room.y" :width="room.w" :height="room.h"
                      fill="none" :stroke="roomColor(room.type)" stroke-width="0.4" stroke-dasharray="0.8,0.4" opacity="0.6" rx="0.5" />
                    <text :x="room.x + room.w / 2" :y="room.y + room.h / 2 - 1"
                      text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="1.8">
                      {{ (room.w * (listing.area || 85) / 5400).toFixed(0) }}m2
                    </text>
                    <text :x="room.x + room.w / 2" :y="room.y + room.h / 2 + 1.5"
                      text-anchor="middle" :fill="roomColor(room.type)" font-size="1.6" font-weight="600">
                      {{ (room.w * 0.3).toFixed(1) }}x{{ (room.h * 0.3).toFixed(1) }}m
                    </text>
                  </template>
                  <path d="M 25 2 A 4 4 0 0 1 29 6" fill="none" stroke="rgba(167,139,250,0.5)" stroke-width="0.3" />
                  <line x1="25" y1="2" x2="25" y2="6" stroke="rgba(167,139,250,0.4)" stroke-width="0.3" />
                  <line x1="15" y1="2" x2="22" y2="2" stroke="#60a5fa" stroke-width="0.6" opacity="0.7" />
                  <line x1="35" y1="2" x2="45" y2="2" stroke="#60a5fa" stroke-width="0.6" opacity="0.7" />
                  <line x1="50" y1="2" x2="58" y2="2" stroke="#60a5fa" stroke-width="0.6" opacity="0.7" />
                  <line x1="2" y1="35" x2="2" y2="42" stroke="#60a5fa" stroke-width="0.6" opacity="0.7" />
                  <text x="50" y="0.5" text-anchor="middle" fill="rgba(15,118,110,0.6)" font-size="1.8" font-weight="600">
                    {{ (96 * 0.3).toFixed(1) }}m
                  </text>
                  <text x="0.8" y="30" text-anchor="middle" fill="rgba(15,118,110,0.6)" font-size="1.8" font-weight="600"
                    transform="rotate(-90, 0.8, 30)">
                    {{ (56 * 0.3).toFixed(1) }}m
                  </text>
                  <g transform="translate(92, 54)">
                    <circle r="2.5" fill="rgba(15,118,110,0.15)" stroke="rgba(15,118,110,0.4)" stroke-width="0.2"/>
                    <path d="M 0 -1.8 L 0.8 0.8 L 0 0.3 L -0.8 0.8 Z" fill="var(--accent)" />
                    <text y="-3" text-anchor="middle" fill="rgba(15,118,110,0.6)" font-size="1.2" font-weight="700">N</text>
                  </g>
                </svg>
              </div>

              <!-- Legend -->
              <div class="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                <div v-for="(room, i) in (listing.rooms || defaultRooms)" :key="'lg'+i" class="flex items-center gap-1.5">
                  <div class="w-3 h-3 rounded" :style="{ background: roomColor(room.type), opacity: 0.4 }" />
                  <span class="text-xs text-ink-500">{{ room.name }}</span>
                </div>
                <div class="flex items-center gap-1.5 ml-auto">
                  <div class="w-4 h-0.5 bg-blue-400/70 rounded"></div>
                  <span class="text-xs text-ink-500">Deraza</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24"><path d="M4 4 A 8 8 0 0 1 12 12" fill="none" stroke="rgba(167,139,250,0.5)" stroke-width="1.5"/></svg>
                  <span class="text-xs text-ink-500">Eshik</span>
                </div>
              </div>

              <!-- Area summary -->
              <div class="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5">
                <div class="text-center">
                  <div class="text-lg font-bold text-brand-400">{{ listing.area || 85 }}<span class="text-xs text-ink-500"> m2</span></div>
                  <div class="text-xs text-ink-500">Umumiy maydon</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-brand-400">{{ (listing.rooms || []).length }}</div>
                  <div class="text-xs text-ink-500">Xonalar</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-brand-400">{{ Math.ceil((listing.area || 85) / 8) }}</div>
                  <div class="text-xs text-ink-500">Ish o rinlari</div>
                </div>
              </div>
            </div>

            <!-- Building info -->
            <div class="card-premium p-6">
              <h3 class="font-semibold dark:text-white mb-4">Bino ma'lumotlari</h3>
              <NuxtLink :to="`/buildings/${data.building.slug}`" class="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div class="w-16 h-16 rounded-lg overflow-hidden bg-ink-900 flex-shrink-0">
                  <img v-if="data.building.gallery[0]" :src="data.building.gallery[0]" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center"><Building2 :size="24" class="text-ink-600" /></div>
                </div>
                <div class="flex-1">
                  <div class="font-medium">{{ data.building.name }}</div>
                  <div class="text-xs text-ink-500 mt-1">{{ data.building.floorsCount }} qavat · {{ data.building.totalUnits }} unit · {{ formatArea(data.building.totalArea) }} m²</div>
                </div>
                <ChevronRight :size="20" class="text-ink-600" />
              </NuxtLink>
            </div>

            <!-- Virtual tour -->
            <div v-if="listing.virtualTourUrl" class="card-premium p-6">
              <h3 class="font-semibold dark:text-white mb-3">Virtual tur</h3>
              <a :href="listing.virtualTourUrl" target="_blank" class="btn btn-secondary">
                <ExternalLink :size="16" /> Virtual turni ochish
              </a>
            </div>
          </div>

          <!-- Sidebar — Apply -->
          <div class="lg:sticky lg:top-6 h-fit space-y-4">
            <div class="card-premium p-6">
              <div class="mb-4">
                <div class="text-3xl font-bold text-brand-400">{{ formatUZS(listing.price) }}</div>
                <div class="text-xs text-ink-500 mt-1">{{ listing.offerType === 'RENT' ? 'oyiga' : 'bir martalik to\'lov' }}</div>
              </div>

              <button @click="showForm = !showForm" class="btn btn-primary w-full mb-3 btn-glow" v-if="!formSubmitted">
                {{ showForm ? 'Bekor qilish' : 'Ariza yuborish' }}
              </button>

              <!-- Application form -->
              <div v-if="showForm && !formSubmitted" class="space-y-3 pt-3 border-t border-white/5">
                <div>
                  <label class="label">F.I.O *</label>
                  <input v-model="form.applicantName" type="text" class="input" placeholder="Ism Familiya" />
                </div>
                <div>
                  <label class="label">Telefon *</label>
                  <input v-model="form.applicantPhone" type="tel" class="input" placeholder="+998 71 200 00 00" />
                </div>
                <div>
                  <label class="label">Email</label>
                  <input v-model="form.applicantEmail" type="email" class="input" placeholder="email@example.uz" />
                </div>
                <div>
                  <label class="label">Taklif narxi (UZS)</label>
                  <input v-model.number="form.offeredPrice" type="number" class="input" :placeholder="listing.price" />
                </div>
                <div>
                  <label class="label">Davr (oy)</label>
                  <input v-model.number="form.durationMonths" type="number" class="input" placeholder="12" />
                </div>
                <div>
                  <label class="label">Boshlanish sanasi</label>
                  <input v-model="form.desiredStartDate" type="date" class="input" />
                </div>
                <div>
                  <label class="label">Izoh</label>
                  <textarea v-model="form.notes" class="input" rows="3" placeholder="Qo'shimcha ma'lumot..."></textarea>
                </div>
                <button @click="submitApplication" class="btn btn-primary w-full btn-glow" :disabled="submitting">
                  {{ submitting ? 'Yuborilmoqda...' : 'Arizani yuborish' }}
                </button>
                <p class="text-xs text-ink-600">Ariza yuborib, siz shartlarga rozilik bildirasiz</p>
              </div>

              <!-- Success -->
              <div v-if="formSubmitted" class="text-center py-4">
                <div class="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 :size="28" class="text-emerald-400" />
                </div>
                <h4 class="font-semibold dark:text-white mb-1">Ariza qabul qilindi!</h4>
                <p class="text-sm text-ink-500 mb-4">Raqamingiz: <span class="font-mono text-brand-400">{{ appNumber }}</span></p>
                <p class="text-xs text-ink-600">Tez orada menejerimiz siz bilan bog'lanadi</p>
              </div>
            </div>

            <div class="card p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Phone :size="18" class="text-brand-400" />
              </div>
              <div>
                <div class="text-xs text-ink-500">Aloqa</div>
                <div class="text-sm font-medium">+998 71 200 00 00</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin, Building2, ChevronRight, ExternalLink, Eye, Phone, CheckCircle2 } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()
const config = useRuntimeConfig()

// First fetch the catalog to find the listing by id
const catalogData = ref({
  buildings: [
    { id: 'b1', name: 'Tashkent City', slug: 'tashkent-city', gallery: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png'], address: 'Mirzo Ulug\'bek, Tashkent', floorsCount: 12, totalArea: 45000, totalUnits: 420, vacantUnits: 42, type: 'BUSINESS_CENTER' },
  ],
  listings: [
    { id: 'l1', buildingId: 'b1', titleUz: 'A-301 · 85 m² ofis', titleRu: 'A-301 · 85 м² офис', offerType: 'RENT', price: 25000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'], viewsCount: 234, status: 'PUBLISHED', virtualTourUrl: '', descriptionUz: 'Tashkent City 3-qavatda 85 m² ofis maydoni. Tashqi devor, 4 deraza, konditsioner.', descriptionRu: 'Офис 85 м² на 3 этаже Tashkent City. Окна, кондиционер.', floorPlanType: 'office', area: 85, rooms: [
      { name: 'Resepshn', w: 25, h: 15, x: 5, y: 5, type: 'reception' },
      { name: 'Ochiq ofis', w: 55, h: 35, x: 5, y: 25, type: 'open' },
      { name: 'Yig\'ilish xonasi', w: 20, h: 15, x: 65, y: 5, type: 'meeting' },
      { name: 'Oshxona', w: 20, h: 10, x: 65, y: 25, type: 'kitchen' },
      { name: 'WC', w: 20, h: 10, x: 65, y: 40, type: 'wc' },
    ] },
  ],
})

const listingId = route.params.id as string
const listing = computed(() => {
  const l = catalogData.value?.listings?.find((l: any) => l.id === listingId)
  if (!l) return null
  // Default rooms if not specified
  if (!l.rooms) {
    l.rooms = [
      { name: 'Asosiy maydon', w: 60, h: 40, x: 5, y: 5, type: 'office' },
      { name: 'Yordamchi', w: 25, h: 15, x: 70, y: 5, type: 'storage' },
      { name: 'WC', w: 20, h: 10, x: 70, y: 25, type: 'wc' },
    ]
    l.area = l.area || 85
  }
  return l
})
const data = computed(() => {
  if (!listing.value || !catalogData.value) return null
  const building = catalogData.value.buildings.find((b: any) => b.id === listing.value.buildingId)
  return { listing: listing.value, building }
})
const pending = ref(false)
const error = ref('')

const planView = ref<'photo' | 'dimensions'>('photo')
const defaultRooms = [
  { name: 'Ofis', type: 'office', x: 5, y: 5, w: 50, h: 30 },
  { name: 'Konferensiya', type: 'meeting', x: 5, y: 38, w: 35, h: 22 },
  { name: 'Qabul', type: 'reception', x: 43, y: 38, w: 24, h: 14 },
  { name: 'Oshxona', type: 'kitchen', x: 43, y: 55, w: 24, h: 8 },
]
const currentPhotoIdx = ref(0)
const currentPhoto = computed(() => {
  return listing.value?.photos?.[currentPhotoIdx.value] || 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png'
})

// Application form
const showForm = ref(false)
const formSubmitted = ref(false)
const submitting = ref(false)
const appNumber = ref('')

const form = reactive({
  applicantName: '',
  applicantPhone: '',
  applicantEmail: '',
  applicantPinfl: '',
  offeredPrice: 0,
  currency: 'UZS',
  durationMonths: 12,
  desiredStartDate: '',
  notes: '',
})

async function submitApplication() {
  if (!form.applicantName || !form.applicantPhone) return
  submitting.value = true
  try {
    const res = await $fetch<any>(`${baseUrl}/createApplication`, {
      method: 'POST',
      body: { ...form, listingId, unitId: null },
    })
    if (res.success) {
      appNumber.value = res.application.number
      formSubmitted.value = true
    }
  } catch (e) {
    console.error(e)
  }
  submitting.value = false
}

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}


function roomColor(type: string) {
  const colors: Record<string, string> = {
    reception: '#a78bfa',
    open: 'var(--accent)',
    meeting: '#f59e0b',
    kitchen: '#10b981',
    wc: '#06b6d4',
    storage: 'var(--accent)',
    display: '#ec4899',
    office: 'var(--accent)',
    corridor: '#71717a',
  }
  return colors[type] || 'var(--accent)'
}
</script>

<style scoped>
.floor-plan-container {
  background: rgba(15, 118, 110, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(15, 118, 110, 0.08);
  overflow: hidden;
}
.floor-plan-container svg {
  display: block;
  margin: 0 auto;
}
</style>
