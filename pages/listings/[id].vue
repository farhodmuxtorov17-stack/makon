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
              <h1 class="text-3xl font-bold mb-2">{{ listing.titleUz }}</h1>
              <p class="text-ink-400 flex items-center gap-2">
                <MapPin :size="16" /> {{ data.building.address }}, {{ data.building.district }}
              </p>
            </div>

            <!-- Description -->
            <div class="card p-6">
              <h3 class="font-semibold mb-3">Tavsif</h3>
              <p class="text-ink-400 leading-relaxed">{{ listing.descriptionUz || listing.descriptionRu || 'Tavsif kiritilmagan' }}</p>
            </div>

            <!-- Building info -->
            <div class="card p-6">
              <h3 class="font-semibold mb-4">Bino ma'lumotlari</h3>
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
            <div v-if="listing.virtualTourUrl" class="card p-6">
              <h3 class="font-semibold mb-3">Virtual tur</h3>
              <a :href="listing.virtualTourUrl" target="_blank" class="btn btn-secondary">
                <ExternalLink :size="16" /> Virtual turni ochish
              </a>
            </div>
          </div>

          <!-- Sidebar — Apply -->
          <div class="lg:sticky lg:top-6 h-fit space-y-4">
            <div class="card p-6">
              <div class="mb-4">
                <div class="text-3xl font-bold text-brand-400">{{ formatPrice(listing.price, listing.currency) }}</div>
                <div class="text-xs text-ink-500 mt-1">{{ listing.offerType === 'RENT' ? 'oyiga' : 'bir martalik to\'lov' }}</div>
              </div>

              <button @click="showForm = !showForm" class="btn btn-primary w-full mb-3" v-if="!formSubmitted">
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
                  <label class="label">Taklif narxi (so'm)</label>
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
                <button @click="submitApplication" class="btn btn-primary w-full" :disabled="submitting">
                  {{ submitting ? 'Yuborilmoqda...' : 'Arizani yuborish' }}
                </button>
                <p class="text-xs text-ink-600">Ariza yuborib, siz shartlarga rozilik bildirasiz</p>
              </div>

              <!-- Success -->
              <div v-if="formSubmitted" class="text-center py-4">
                <div class="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 :size="28" class="text-emerald-400" />
                </div>
                <h4 class="font-semibold mb-1">Ariza qabul qilindi!</h4>
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

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.apiBase as string

// First fetch the catalog to find the listing by id
const { data: catalogData } = await useAsyncData('catalog-for-listing', async () => {
  return await $fetch<any>(`${baseUrl}/getPublicCatalog`, { method: 'POST', body: {} })
})

const listingId = route.params.id as string
const listing = computed(() => catalogData.value?.listings?.find((l: any) => l.id === listingId))
const data = computed(() => {
  if (!listing.value || !catalogData.value) return null
  const building = catalogData.value.buildings.find((b: any) => b.id === listing.value.buildingId)
  return { listing: listing.value, building }
})
const pending = ref(false)
const error = ref('')

const currentPhotoIdx = ref(0)
const currentPhoto = computed(() => {
  return listing.value?.photos?.[currentPhotoIdx.value] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80'
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

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${formatted} so'm`
}
</script>
