<template>
  <div class="min-h-screen bg-white text-ink-900">
    <!-- Nav -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-ink-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/20"
          >
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-bold text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-ink-500">
          <NuxtLink to="/" class="hover:text-ink-900 transition-colors">Katalog</NuxtLink>
          <a href="#" class="hover:text-ink-900 transition-colors">Xizmatlar</a>
          <a href="#" class="hover:text-ink-900 transition-colors">Tizim haqida</a>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="hidden sm:flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900 px-4 py-2.5 rounded-xl border border-ink-200 hover:border-ink-300 transition-colors"
          >
            <span>♡</span> Sevimlilar
          </button>
          <NuxtLink
            to="/login"
            class="text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 shadow-lg shadow-brand-600/25 transition-all"
          >
            Kirish
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-ink-400">
      <NuxtLink to="/" class="hover:text-ink-700 transition-colors">Katalog</NuxtLink>
      <span>›</span>
      <span class="text-ink-400">Ijaraga</span>
      <span>›</span>
      <span class="text-ink-400">Ofis</span>
      <span>›</span>
      <span class="text-ink-700 font-medium">Green Business Center</span>
    </div>

    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-6 mb-6">
      <div
        class="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[400px] md:h-[500px]"
      >
        <div class="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer">
          <img
            :src="asset('/tashkent/finance-center.jpg')"
            alt="Main"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img
            :src="asset('/tashkent/new-business.jpg')"
            alt="Photo 2"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img
            :src="asset('/tashkent/mall-towers.jpg')"
            alt="Photo 3"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img
            :src="asset('/tashkent/city-2025.jpg')"
            alt="Photo 4"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img
            :src="asset('/tashkent/aerial.jpg')"
            alt="Photo 5"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-2xl font-bold">+7</div>
              <div class="text-xs">ko'proq</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content -->
    <section class="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-8">
      <!-- Left: details -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Title + status -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-brand-600 text-white">Ijaraga</span>
            <span class="text-xs font-medium px-3 py-1.5 rounded-full bg-ink-100 text-ink-600">Ofis</span>
            <span class="text-xs text-success-600 font-medium flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-success-500"></span> Bo'sh</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Green Business Center — A blok, 3-qavat
          </h1>
          <p class="text-ink-400 text-sm flex items-center gap-1.5">
            <MapPin :size="12" :stroke-width="2" class="inline" /> Mirobad tumani, Amir Temur
            kochasi 88, Toshkent
          </p>
        </div>

        <!-- Quick specs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-ink-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">
              120<span class="text-sm font-normal text-ink-400 ml-1">m²</span>
            </div>
            <div class="text-xs text-ink-400 mt-1">Maydon</div>
          </div>
          <div class="bg-ink-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">
              3<span class="text-sm font-normal text-ink-400 ml-1">/ 12</span>
            </div>
            <div class="text-xs text-ink-400 mt-1">Qavat</div>
          </div>
          <div class="bg-ink-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">3</div>
            <div class="text-xs text-ink-400 mt-1">Xonali</div>
          </div>
          <div class="bg-ink-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">B</div>
            <div class="text-xs text-ink-400 mt-1">Sinfi</div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-bold mb-4">Tavsif</h2>
          <p class="text-ink-600 leading-relaxed text-sm">
            Zamonaviy biznes-markazning 3-qavatida joylashgan ofis maydoni. So'nggi ta'mirlash,
            panorama oynalar, erkak/ayollar uchun alohida sanuzellar, mebel bilan jihozlangan. Bino
            markaziy qismda joylashgan, metroga 5 daqiqalik piyoda masofa. Parkovka, 24/7
            xavfsizlik, markaziy konditsioner tizimi mavjud.
          </p>
        </div>

        <!-- Characteristics -->
        <div>
          <h2 class="text-lg font-bold mb-4">Xususiyatlar</h2>
          <div class="border border-ink-200 rounded-2xl overflow-hidden">
            <div
              v-for="(row, i) in characteristics"
              :key="row.label"
              class="flex items-center justify-between px-5 py-3.5 text-sm"
              :class="i % 2 === 0 ? 'bg-ink-50' : 'bg-white'"
            >
              <span class="text-ink-400">{{ row.label }}</span>
              <span class="font-medium text-ink-700">{{ row.value }}</span>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div>
          <h2 class="text-lg font-bold mb-4">Qulayliklar</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="a in amenityList"
              :key="a.name"
              class="flex items-center gap-2.5 text-sm text-ink-600"
            >
              <div
                class="w-8 h-8 rounded-lg bg-success-50 flex items-center justify-center flex-shrink-0"
              >
                <component :is="a.icon" :size="16" :stroke-width="2" class="text-success-600" />
              </div>
              {{ a.name }}
            </div>
          </div>
        </div>

        <!-- Location -->
        <div>
          <h2 class="text-lg font-bold mb-4">Joylashuv</h2>
          <div class="rounded-2xl overflow-hidden border border-ink-200 h-72 relative bg-ink-100">
            <img
              :src="asset('/tashkent/aerial.jpg')"
              alt="Aerial view"
              class="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                class="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30 border-4 border-white"
              >
                <MapPin :size="20" :stroke-width="2" class="text-white" />
              </div>
            </div>
            <div
              class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
            >
              <p class="text-sm font-medium text-ink-700">Amir Temur kochasi 88</p>
              <p class="text-xs text-ink-400">Mirobad tumani, Toshkent</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: contact + rent card -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-20 space-y-4">
          <!-- Price card -->
          <div class="bg-white border border-ink-200 rounded-2xl p-6 shadow-lg shadow-ink-100">
            <div class="mb-1">
              <div class="text-3xl font-bold text-ink-900">
                18 000 000 <span class="text-lg font-normal text-ink-400">so'm/oy</span>
              </div>
              <div class="text-sm text-ink-400 mt-1">≈ 150 000 so'm/m² · Depozit: 1 oy</div>
            </div>
            <div class="flex gap-2 mt-5">
              <button
                class="flex-1 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-semibold py-3.5 rounded-xl hover:from-brand-600 hover:to-brand-800 transition-all shadow-lg shadow-brand-600/25"
                @click="openApplication()"
              >
                Ijaraga olish
              </button>
              <button
                class="w-12 h-12 rounded-xl border border-ink-200 flex items-center justify-center hover:bg-ink-50 transition-colors text-lg"
                @click="showContact = !showContact"
              >
                ♡
              </button>
            </div>
            <button
              class="w-full mt-2 text-sm font-medium text-ink-600 bg-ink-50 hover:bg-ink-100 py-3 rounded-xl transition-colors"
              @click="showContact = !showContact"
            >
              📞 Bog'lanish
            </button>

            <!-- Contact info -->
            <div v-if="showContact" class="mt-5 pt-5 border-t border-ink-100 space-y-3">
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm"
                >
                  AB
                </div>
                <div>
                  <p class="text-sm font-medium text-ink-700">Azizbek Karimov</p>
                  <p class="text-xs text-ink-400">Boshqaruvchi</p>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-ink-600">
                <span class="text-ink-400">📱</span> +998 71 123 45 67
              </div>
              <div class="flex items-center gap-2 text-sm text-ink-600">
                <span class="text-ink-400">✉️</span> info@makon.uz
              </div>
            </div>
          </div>

          <!-- Building info -->
          <div class="bg-white border border-ink-200 rounded-2xl p-5">
            <h3 class="text-sm font-bold mb-3">Bino ma'lumotlari</h3>
            <div class="space-y-2.5 text-sm">
              <div class="flex justify-between">
                <span class="text-ink-400">Bino nomi</span><span class="font-medium">Green Business Center</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ink-400">Sinfi</span><span class="font-medium">B sinf</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ink-400">Qavatlar soni</span><span class="font-medium">12</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ink-400">Yil</span><span class="font-medium">2024</span>
              </div>
              <div class="flex justify-between">
                <span class="text-ink-400">Parkovka</span><span class="font-medium">150 o'rin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Modal -->
    <div v-if="showAppModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
        @click="showAppModal = false"
      ></div>
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <!-- Success state -->
        <div v-if="appSubmitted" class="p-8 text-center">
          <div
            class="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-success-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Arizangiz qabul qilindi!</h3>
          <p class="text-ink-500 text-sm mb-1">Arizangiz ko'rib chiqish uchun yuborildi.</p>
          <p class="text-ink-500 text-sm mb-6">Tez orada operatorimiz siz bilan bog'lanadi.</p>
          <p class="text-ink-400 text-xs mb-6">Davom etish uchun tizimga kirishingiz kerak.</p>
          <NuxtLink
            to="/login"
            class="block text-center text-sm font-semibold text-white py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 transition-all"
          >
            Tizimga kirish
          </NuxtLink>
          <button
            class="mt-3 text-sm text-ink-400 hover:text-ink-600"
            @click="
              showAppModal = false
              appSubmitted = false
            "
          >
            Yopish
          </button>
        </div>

        <!-- Form state -->
        <div v-else>
          <div class="flex items-center justify-between px-6 py-4 border-b border-ink-100">
            <div>
              <h3 class="text-lg font-bold">Ijara arizasi</h3>
              <p class="text-xs text-ink-400 mt-0.5">Green Business Center — A blok, 3-qavat</p>
            </div>
            <button
              class="text-ink-400 hover:text-ink-600 text-2xl leading-none"
              @click="showAppModal = false"
            >
              ×
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="text-sm font-medium text-ink-700 mb-1.5 block">F.I.Sh. <span class="text-danger-500">*</span></label>
              <input
                v-model="appForm.name"
                type="text"
                placeholder="Ism Familiya Sharifingiz"
                class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-ink-700 mb-1.5 block">Telefon raqam <span class="text-danger-500">*</span></label>
              <input
                v-model="appForm.phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-ink-700 mb-1.5 block">Email</label>
              <input
                v-model="appForm.email"
                type="email"
                placeholder="email@example.com"
                class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-ink-700 mb-1.5 block">Tashkilot nomi</label>
              <input
                v-model="appForm.company"
                type="text"
                placeholder="MCHJ / LLC / Yakka tartibdagi tadbirkor"
                class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-medium text-ink-700 mb-1.5 block">Ijara muddati</label>
                <select
                  v-model="appForm.duration"
                  class="w-full appearance-none text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none cursor-pointer focus:ring-2 focus:ring-brand-500/20"
                >
                  <option>3 oy</option>
                  <option>6 oy</option>
                  <option>1 yil</option>
                  <option>2 yildan ortiq</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-medium text-ink-700 mb-1.5 block">Boshlash sanasi</label>
                <input
                  v-model="appForm.startDate"
                  type="date"
                  class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label class="text-sm font-medium text-ink-700 mb-1.5 block">Qo'shimcha izoh</label>
              <textarea
                v-model="appForm.notes"
                rows="3"
                placeholder="Ijara shartlari, qo'shimcha talablar..."
                class="w-full text-sm bg-ink-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>
            <button
              :disabled="!appForm.name || !appForm.phone"
              class="w-full text-sm font-semibold text-white py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-600/25"
              @click="submitApplication"
            >
              Arizani yuborish
            </button>
            <p class="text-xs text-ink-400 text-center">
              Yuborish orqali siz foydalanuvchi shartnomasiga rozilik bildirasiz
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
import {
  Building2,
  Wifi,
  Car,
  ShieldCheck,
  Wind,
  Square,
  ArrowUpDown,
  ConciergeBell,
  Utensils,
  Train,
  Snowflake,
  Camera,
  KeyRound,
  Zap,
  Droplets,
  Sofa,
  Building,
  Coffee,
  MapPin,
} from 'lucide-vue-next'
import { useAssetPath } from '~/composables/useAssetPath'
const asset = useAssetPath()

const showContact = ref(false)
const showAppModal = ref(false)
const appSubmitted = ref(false)
const appForm = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  duration: '1 yil',
  startDate: '',
  notes: '',
})

function openApplication() {
  appSubmitted.value = false
  appForm.name = ''
  appForm.phone = ''
  appForm.email = ''
  appForm.company = ''
  appForm.duration = '1 yil'
  appForm.startDate = ''
  appForm.notes = ''
  showAppModal.value = true
}

function submitApplication() {
  appSubmitted.value = true
}

const characteristics = [
  { label: 'Maydon', value: '120 m²' },
  { label: 'Qavat', value: '3 / 12' },
  { label: 'Xonalar soni', value: '3' },
  { label: 'Bino sinfi', value: 'B sinf' },
  { label: 'Holati', value: "Yangi ta'mirlash" },
  { label: 'Parkovka', value: "150 o'rin" },
  { label: 'Konditsioner', value: 'Markaziy' },
  { label: 'Xavfsizlik', value: '24/7' },
]

const propertyAmenities = [
  'Markaziy konditsioner',
  '24/7 xavfsizlik',
  'Parkovka',
  'Panorama oynalar',
  'Mebel bilan jihozlangan',
  'Alohida sanuzellar',
  'Internet',
  'Signalizatsiya',
  'Lift',
  'Reception',
  'Kafega yaqin',
  'Metroga yaqin',
]
</script>
