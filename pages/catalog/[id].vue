<template>
  <div class="min-h-screen bg-white text-slate-900">
    <!-- Nav (same as catalog) -->
    <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-bold text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500">
          <NuxtLink to="/" class="hover:text-slate-900 transition-colors">Katalog</NuxtLink>
          <a href="#" class="hover:text-slate-900 transition-colors">Xizmatlar</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Tizim haqida</a>
        </div>
        <div class="flex items-center gap-3">
          <button class="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
            <span>♡</span> Sevimlilar
          </button>
          <NuxtLink to="/login" class="text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all">Kirish</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Breadcrumb -->
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-slate-400">
      <NuxtLink to="/" class="hover:text-slate-700 transition-colors">Katalog</NuxtLink>
      <span>›</span>
      <span class="text-slate-400">Ijaraga</span>
      <span>›</span>
      <span class="text-slate-400">Ofis</span>
      <span>›</span>
      <span class="text-slate-700 font-medium">Green Business Center</span>
    </div>

    <!-- Gallery -->
    <section class="max-w-7xl mx-auto px-6 mb-6">
      <div class="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[400px] md:h-[500px]">
        <div class="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer">
          <img :src="asset('/tashkent/finance-center.jpg')" alt="Main" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img :src="asset('/tashkent/new-business.jpg')" alt="Photo 2" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img :src="asset('/tashkent/mall-towers.jpg')" alt="Photo 3" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img :src="asset('/tashkent/city-2025.jpg')" alt="Photo 4" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="hidden md:block relative group cursor-pointer">
          <img :src="asset('/tashkent/aerial.jpg')" alt="Photo 5" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div class="text-white text-center">
              <div class="text-2xl font-bold">+7</div>
              <div class="text-xs">koʼproq</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main content: 2 columns -->
    <section class="max-w-7xl mx-auto px-6 pb-12 grid lg:grid-cols-3 gap-8">
      <!-- Left: details (2 cols) -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Title + status -->
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-600 text-white">Ijaraga</span>
            <span class="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-600">Ofis</span>
            <span class="text-xs text-emerald-600 font-medium flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Boʼsh</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight mb-2">Green Business Center — A blok, 3-qavat</h1>
          <p class="text-slate-400 text-sm flex items-center gap-1.5">📍 Mirobod tumani, Amir Temur koʼchasi 88, Toshkent</p>
        </div>

        <!-- Quick specs -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-slate-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">{{ '120' }}<span class="text-sm font-normal text-slate-400 ml-1">m²</span></div>
            <div class="text-xs text-slate-400 mt-1">Maydon</div>
          </div>
          <div class="bg-slate-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">{{ '3' }}<span class="text-sm font-normal text-slate-400 ml-1">/ 12</span></div>
            <div class="text-xs text-slate-400 mt-1">Qavat</div>
          </div>
          <div class="bg-slate-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">3</div>
            <div class="text-xs text-slate-400 mt-1">Xonali</div>
          </div>
          <div class="bg-slate-50 rounded-2xl p-4 text-center">
            <div class="text-2xl font-bold">B</div>
            <div class="text-xs text-slate-400 mt-1">Sinfi</div>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-bold mb-4">Tavsif</h2>
          <p class="text-slate-600 leading-relaxed text-sm">Zamonaviy biznes-markazning 3-qavatida joylashgan ofis maydoni. Soʼnggi taʼmirlash, panorama oynalar, erkak/ayollar uchun alohida sanuzellar, mebel bilan jihozlangan. Bino markaziy qismda joylashgan, metroga 5 daqiqalik piyoda masofa. Parkovka, 24/7 xavfsizlik, markaziy konditsioner tizimi mavjud.</p>
        </div>

        <!-- Characteristics table -->
        <div>
          <h2 class="text-lg font-bold mb-4">Xususiyatlar</h2>
          <div class="border border-slate-200 rounded-2xl overflow-hidden">
            <div v-for="(row, i) in characteristics" :key="row.label" class="flex items-center justify-between px-5 py-3.5 text-sm" :class="i % 2 === 0 ? 'bg-slate-50' : 'bg-white'">
              <span class="text-slate-400">{{ row.label }}</span>
              <span class="font-medium text-slate-700">{{ row.value }}</span>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div>
          <h2 class="text-lg font-bold mb-4">Qulayliklar</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="a in propertyAmenities" :key="a" class="flex items-center gap-2.5 text-sm text-slate-600">
              <div class="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">✓</div>
              {{ a }}
            </div>
          </div>
        </div>

        <!-- Location map -->
        <div>
          <h2 class="text-lg font-bold mb-4">Joylashuv</h2>
          <div class="rounded-2xl overflow-hidden border border-slate-200 h-72 relative bg-slate-100">
            <img :src="asset('/tashkent/aerial.jpg')" alt="Aerial view" class="absolute inset-0 w-full h-full object-cover opacity-80" />
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div class="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border-4 border-white">
                <span class="text-white text-lg">📍</span>
              </div>
            </div>
            <div class="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
              <p class="text-sm font-medium text-slate-700">Amir Temur koʼchasi 88</p>
              <p class="text-xs text-slate-400">Mirobod tumani, Toshkent</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: contact card -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-20 space-y-4">
          <!-- Price card -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg shadow-slate-100">
            <div class="mb-1">
              <div class="text-3xl font-bold text-slate-900">18 000 000 <span class="text-lg font-normal text-slate-400">soʼm/oy</span></div>
              <div class="text-sm text-slate-400 mt-1">≈ 150 000 soʼm/m² · Depozit: 1 oy</div>
            </div>
            <div class="flex gap-2 mt-5">
              <button @click="showContact = true" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-3.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25">
                📞 Bogʼlanish
              </button>
              <button class="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors text-lg">♡</button>
            </div>
            <button class="w-full mt-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 py-3 rounded-xl transition-colors">💬 Xabar yozish</button>

            <!-- Contact info -->
            <div v-if="showContact" class="mt-5 pt-5 border-t border-slate-100 space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">AB</div>
                <div>
                  <div class="font-semibold text-sm">Alisher Bekov</div>
                  <div class="text-xs text-slate-400">Boshqaruvchi · MAKON</div>
                </div>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <span class="text-base">📱</span> +998 71 123 45 67
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <span class="text-base">✉️</span> info@makon.uz
              </div>
              <div class="flex gap-2 mt-3">
                <button class="flex-1 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 py-2.5 rounded-xl transition-colors">WhatsApp</button>
                <button class="flex-1 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-colors">Telegram</button>
              </div>
            </div>
          </div>

          <!-- Building info -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold text-sm mb-4">Bino haqida</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-center justify-between"><span class="text-slate-400">Bino nomi</span><span class="font-medium">Green Business Center</span></div>
              <div class="flex items-center justify-between"><span class="text-slate-400">Sinfi</span><span class="font-medium">B</span></div>
              <div class="flex items-center justify-between"><span class="text-slate-400">Qavatlar soni</span><span class="font-medium">12</span></div>
              <div class="flex items-center justify-between"><span class="text-slate-400">Qurilgan yil</span><span class="font-medium">2021</span></div>
              <div class="flex items-center justify-between"><span class="text-slate-400">Parkovka</span><span class="font-medium">120 joy</span></div>
              <div class="flex items-center justify-between"><span class="text-slate-400">Liftlar</span><span class="font-medium">4 ta</span></div>
            </div>
            <NuxtLink to="/" class="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-4 pt-4 border-t border-slate-100 transition-colors">Bino sahifasi →</NuxtLink>
          </div>

          <!-- Similar nearby -->
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 class="font-bold text-sm mb-4">Yaqin obyektlar</h3>
            <div class="space-y-3">
              <NuxtLink v-for="s in similar" :key="s.id" :to="`/catalog/${s.id}`" class="flex gap-3 group cursor-pointer">
                <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img :src="asset(s.img)" :alt="s.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-xs group-hover:text-blue-600 transition-colors truncate">{{ s.title }}</div>
                  <div class="text-xs text-slate-400 truncate">{{ s.address }}</div>
                  <div class="font-bold text-sm text-slate-700 mt-0.5">{{ s.priceText }}</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Similar listings -->
    <section class="max-w-7xl mx-auto px-6 pb-16">
      <h2 class="text-xl font-bold tracking-tight mb-6">Oʼxshash obyektlar</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        <NuxtLink v-for="p in similarListings" :key="p.id" :to="`/catalog/${p.id}`" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200 transition-all">
          <div class="relative h-40 overflow-hidden">
            <img :src="asset(p.img)" :alt="p.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-600 text-white">{{ p.deal }}</span>
          </div>
          <div class="p-4">
            <div class="font-bold text-base mb-1">{{ p.priceText }}</div>
            <h3 class="font-semibold text-sm mb-1 group-hover:text-blue-600 transition-colors">{{ p.title }}</h3>
            <p class="text-slate-400 text-xs">📍 {{ p.address }}</p>
            <div class="flex items-center gap-3 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
              <span>📐 {{ p.area }} m²</span>
              <span>🏢 {{ p.floor }}/{{ p.totalFloor }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-slate-100 py-12 px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"><span class="text-white text-xs font-bold">M</span></div>
          <span class="font-bold text-sm">MAKON</span>
          <span class="text-slate-400 text-xs ml-2">© 2026 · Toshkent, Oʼzbekiston</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-slate-400">
          <a class="hover:text-slate-700 transition-colors cursor-pointer">info@makon.uz</a>
          <a class="hover:text-slate-700 transition-colors cursor-pointer">+998 71 123 45 67</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const asset = useAssetPath()
const showContact = ref(false)
const characteristics = [
  { label: 'Maydon', value: '120 m²' },
  { label: 'Qavat', value: '3 / 12' },
  { label: 'Xonalar', value: '3' },
  { label: 'Sinfi', value: 'B' },
  { label: 'Holati', value: 'Taʼmirlangan' },
  { label: 'Depozit', value: '1 oy' },
  { label: 'Komissiya', value: '50%' },
  { label: 'Shartnoma muddati', value: '12 oy' },
  { label: 'Parkovka', value: '120 joy' },
  { label: 'Liftlar', value: '4 ta' },
  { label: 'Konditsioner', value: 'Markaziy' },
  { label: 'Internet', value: 'Optik fiber' },
]
const propertyAmenities = ['Parkovka', 'Lift', 'Konditsioner', 'Internet', 'Signalizatsiya', '24/7 Xavfsizlik', 'Oshxona', 'Sanuzel', 'Mebel', 'Panorama oyna', 'Konferensiya zali', 'Reception']
const similar = [
  { id: 2, title: 'Nest One Tower', address: 'Yashnobod, Tashkent City', priceText: '25 000 000/oy', img: '/tashkent/nest-one.jpg' },
  { id: 3, title: 'Mega Mall', address: 'Chilonzor, Bunyodkor 12', priceText: '12 000 000/oy', img: '/tashkent/mall-towers.jpg' },
  { id: 5, title: 'Tashkent City Mall', address: 'Yashnobod, Tashkent City', priceText: '15 000 000/oy', img: '/tashkent/city-2025.jpg' },
]
const similarListings = [
  { id: 2, title: 'Nest One Tower — 142-xona', address: 'Yashnobod, Tashkent City', priceText: '25 000 000/oy', deal: 'Ijaraga', img: '/tashkent/nest-one.jpg', area: 139, floor: 14, totalFloor: 45 },
  { id: 3, title: 'Mega Mall — savdo maydoni', address: 'Chilonzor, Bunyodkor 12', priceText: '12 000 000/oy', deal: 'Ijaraga', img: '/tashkent/mall-towers.jpg', area: 85, floor: 1, totalFloor: 5 },
  { id: 5, title: 'Tashkent City Mall — pavilion', address: 'Yashnobod, Tashkent City', priceText: '15 000 000/oy', deal: 'Ijaraga', img: '/tashkent/city-2025.jpg', area: 78, floor: 2, totalFloor: 4 },
  { id: 6, title: 'Harmony Residence', address: 'Yakkasaroy, Bobur 45', priceText: '1 250 000/m²', deal: 'Sotuvda', img: '/tashkent/city-night.jpg', area: 120, floor: 6, totalFloor: 16 },
]
</script>
