<template>
  <div class="min-h-screen bg-ink-50">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-ink-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center"><Building2 :size="20" class="text-white" /></div>
            <span class="text-lg font-bold tracking-tight">MAKON</span>
          </NuxtLink>
          <div class="flex items-center gap-4">
            <NuxtLink to="/catalog" class="text-sm text-ink-500 hover:text-ink-900">Katalog</NuxtLink>
            <NuxtLink to="/login" class="btn-primary text-sm px-4 py-2 rounded-lg">Kirish</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <NuxtLink to="/catalog" class="hover:text-ink-600">Katalog</NuxtLink>
        <ChevronRight :size="14" />
        <span>Ijaraga</span>
        <ChevronRight :size="14" />
        <span class="text-ink-700 font-medium">{{ property.name }}</span>
      </div>

      <!-- Gallery -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div class="lg:col-span-2 aspect-[16/10] rounded-2xl overflow-hidden bg-ink-100">
          <img :src="property.mainImage" :alt="property.name" class="w-full h-full object-cover" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(img, i) in property.gallery" :key="i" class="aspect-square rounded-xl overflow-hidden bg-ink-100">
            <img :src="img" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Info + CTA -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
          <div class="card p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge badge-info">Ijaraga</span>
                  <span class="badge badge-neutral">{{ property.type }}</span>
                  <span class="badge badge-success"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Bo'sh</span>
                </div>
                <h1 class="font-display text-2xl font-bold">{{ property.name }}</h1>
                <p class="text-ink-400 flex items-center gap-1.5 mt-1"><MapPin :size="14" /> {{ property.district }}, {{ property.city }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-ink-100">
              <div><p class="text-ink-400 text-xs">Maydon</p><p class="font-semibold">{{ property.area }} m²</p></div>
              <div><p class="text-ink-400 text-xs">Qavat</p><p class="font-semibold">{{ property.floor }}</p></div>
              <div><p class="text-ink-400 text-xs">Sinflar</p><p class="font-semibold">{{ property.class }}</p></div>
              <div><p class="text-ink-400 text-xs">Depozit</p><p class="font-semibold">1 oy</p></div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="font-semibold mb-3">Tavsif</h3>
            <p class="text-ink-600 text-sm leading-relaxed">{{ property.description }}</p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-ink-100">
              <div v-for="a in property.amenities" :key="a" class="flex items-center gap-2 text-sm text-ink-600">
                <Check :size="16" class="text-emerald-500" /> {{ a }}
              </div>
            </div>
          </div>
        </div>

        <!-- CTA card -->
        <div class="space-y-4">
          <div class="card p-6 sticky top-20">
            <div class="text-center mb-4">
              <p class="text-3xl font-bold font-display">{{ formatPrice(property.price) }}</p>
              <p class="text-sm text-ink-400">so'm / oy</p>
            </div>
            <p class="text-sm text-ink-400 text-center mb-4">≈ {{ formatPrice(property.pricePerM2) }} so'm / m²</p>
            <button class="btn btn-primary btn-lg w-full mb-2" @click="showAppModal = true">
              Ariza yuborish
            </button>
            <button class="btn btn-outline btn-lg w-full">
              <Phone :size="18" /> Bog'lanish
            </button>
            <div class="mt-4 pt-4 border-t border-ink-100 space-y-2 text-sm text-ink-500">
              <div class="flex items-center justify-between"><span>ID</span><span class="font-mono">{{ property.id }}</span></div>
              <div class="flex items-center justify-between"><span>Ko'rishlar</span><span>{{ property.views }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Application modal -->
    <div v-if="showAppModal" class="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showAppModal = false">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-lg">Ariza yuborish</h3>
          <button @click="showAppModal = false" class="text-ink-400 hover:text-ink-600 text-2xl leading-none">×</button>
        </div>
        <div v-if="!appSubmitted" class="space-y-4">
          <div><label class="label">Ism familiya</label><input class="input" v-model="appName" placeholder="Ism familiyangiz" /></div>
          <div><label class="label">Telefon</label><input class="input" v-model="appPhone" placeholder="+998 90 123 45 67" /></div>
          <div><label class="label">Taklif narx (so'm/oy)</label><input class="input" v-model="appPrice" type="number" :placeholder="String(property.price)" /></div>
          <div><label class="label">Izoh</label><textarea class="input" rows="2" v-model="appNotes" placeholder="Qo'shimcha ma'lumot..."></textarea></div>
          <button class="btn btn-primary btn-lg w-full" @click="submitApp">Yuborish</button>
        </div>
        <div v-else class="text-center py-6">
          <div class="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Check :size="32" class="text-emerald-600" />
          </div>
          <h3 class="font-semibold text-lg mb-1">Ariza yuborildi!</h3>
          <p class="text-ink-400 text-sm mb-6">Tez orada siz bilan bog'lanamiz</p>
          <button class="btn btn-outline btn-lg w-full" @click="showAppModal = false; appSubmitted = false">Yopish</button>
        </div>
      </div>
    </div>

    <footer class="border-t border-ink-100 bg-white mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-ink-400">
        © 2026 MAKON · Ko'chmas mulk boshqaruv platformasi
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Building2, ChevronRight, MapPin, Check, Phone } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const route = useRoute()

const showAppModal = ref(false)
const appSubmitted = ref(false)
const appName = ref('')
const appPhone = ref('')
const appPrice = ref<number | null>(null)
const appNotes = ref('')

function submitApp() {
  appSubmitted.value = true
}

const property = computed(() => ({
  id: route.params.id as string,
  name: 'Trillant Tower — Ofis 301',
  district: 'Tashkent City',
  city: 'Toshkent',
  type: 'Ofis',
  area: 120,
  floor: '3/12',
  class: 'A',
  price: 1500000,
  pricePerM2: 12500,
  views: 342,
  description: 'Trillant Tower biznes markazida 120 m² ofis maydoni ijaraga beriladi. Zamonaviy taˆmirlash, panoramic oynalar, markaziy konditsioner tizimi mavjud. Tashkent City biznes markazida joylashgan boˆlib, metro va asosiy yoˆllarga yaqin.',
  amenities: ['Markaziy konditsioner', '24/7 xavfsizlik', 'Parkovka (50 o\'rin)', 'Panoramic oynalar', 'Yuk lifti', 'Fiber internet', 'Konferensiya zali', 'Kafe'],
  mainImage: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/65eba1a8b_generated_image.png',
  gallery: [
    'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png',
    'https://media.base44.com/images/public/6a78058ed735adc07d68319d/768655312_generated_image.png',
    'https://media.base44.com/images/public/6a78058ed735adc07d68319d/d889d0296_generated_image.png',
    'https://media.base44.com/images/public/6a78058ed735adc07d68319d/1908acd10_generated_image.png',
  ],
}))

function formatPrice(v: number) {
  return v.toLocaleString('ru')
}
</script>
