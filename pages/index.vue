<template>
  <div class="min-h-screen bg-white text-slate-900">
    <!-- Nav -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-bold text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#catalog" class="hover:text-slate-900 transition-colors">Katalog</a>
          <a href="#services" class="hover:text-slate-900 transition-colors">Xizmatlar</a>
          <a href="#about" class="hover:text-slate-900 transition-colors">Tizim haqida</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Blog</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Hamkorlar</a>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/login" class="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">Kirish</NuxtLink>
          <NuxtLink to="/login" class="text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all">Roʻyxatdan oʻtish</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-60 -translate-y-1/3 translate-x-1/4"></div>
      <div class="relative max-w-7xl mx-auto px-6 pt-14 pb-16">
        <div class="grid lg:grid-cols-2 gap-10 items-center mb-10">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Toshkentdagi eng yirik koʻchmulk katalogi
            </div>
            <h1 class="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-5">
              Boʻsh joylarni toping va<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">imkoniyatni boy bermang</span>
            </h1>
            <p class="text-slate-500 text-lg mb-8 max-w-md">Ofis, doʻkon, ombor yoki turar joy — hammasi bitta katalogda. Real vaqtda yangilanadigan maʼlumotlar bilan.</p>
          </div>
          <div class="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 h-64 lg:h-80">
            <img src="/tashkent/nest-one.jpg" alt="Tashkent City" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div class="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">Tashkent City · Nest One</div>
          </div>
        </div>

        <!-- Search card -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-6 md:p-8">
          <!-- Tabs -->
          <div class="flex gap-2 mb-6">
            <button v-for="t in tabs" :key="t" @click="activeTab = t"
              class="px-5 py-2 rounded-xl text-sm font-semibold transition-all"
              :class="activeTab === t ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'">
              {{ t }}
            </button>
          </div>
          <!-- Search bar -->
          <div class="flex flex-col md:flex-row gap-3 mb-6">
            <div class="flex-1 flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100">
              <span class="text-slate-400">🔍</span>
              <input type="text" placeholder="Joy nomi, manzil yoki kalit soʻz" class="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" />
            </div>
            <button class="flex items-center justify-center gap-2 text-sm font-semibold text-white px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap">
              🔍 Qidirish
            </button>
            <button class="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all whitespace-nowrap">
              📍 Xaritada qidirish
            </button>
          </div>
          <!-- Filters -->
          <div class="flex flex-wrap gap-3">
            <select class="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Joy turi — Barchasi</option>
            </select>
            <select class="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Maqsad — Barchasi</option>
            </select>
            <select class="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Shahar / Tuman — Barchasi</option>
            </select>
            <select class="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Narx oraligʻi — Barchasi</option>
            </select>
            <select class="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Maydon (m²) — Barchasi</option>
            </select>
            <button class="text-sm font-medium text-blue-600 bg-blue-50 rounded-xl px-4 py-2.5 hover:bg-blue-100 transition-colors">⚙ Koʻproq filter</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Category quick links -->
    <section class="px-6 pb-16">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="c in categories" :key="c.title" class="group bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" :style="{ background: c.bg }">{{ c.icon }}</div>
          <div>
            <div class="font-semibold text-sm">{{ c.title }}</div>
            <div class="text-slate-400 text-xs mt-0.5">{{ c.count }} boʻsh joy</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Listings -->
    <section id="catalog" class="px-6 pb-24">
      <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold tracking-tight">Tavsiya etilgan boʻsh joylar</h2>
          <a href="#" class="text-blue-600 text-sm font-medium hover:underline">Hammasini koʻrish →</a>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="p in listings" :key="p.title" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200 transition-all cursor-pointer">
            <div class="relative h-40 overflow-hidden">
              <img :src="p.img" :alt="p.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full" :class="p.type === 'Ijarada' ? 'bg-blue-600 text-white' : 'bg-emerald-500 text-white'">{{ p.type }}</span>
              <button class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm hover:bg-white transition-colors">♡</button>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-sm mb-1">{{ p.title }}</h3>
              <p class="text-slate-400 text-xs mb-3">{{ p.address }}</p>
              <div class="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span>📐 {{ p.area }}</span>
                <span>🏢 {{ p.floor }}</span>
              </div>
              <div class="font-bold text-blue-600">{{ p.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature showcase: detail card + benefits -->
    <section class="px-6 pb-24">
      <div class="max-w-7xl mx-auto bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-medium text-blue-700 bg-white px-3 py-1.5 rounded-full mb-6">Batafsil koʻrinish</div>
            <h2 class="text-3xl font-bold tracking-tight mb-4">Har bir obyekt haqida toʻliq maʼlumot</h2>
            <p class="text-slate-500 text-lg mb-8 max-w-md">Maydon, narx, qavat, jihozlar — qaror qabul qilish uchun kerakli barcha maʼlumotlar bir joyda.</p>
            <div class="space-y-4">
              <div v-for="f in detailFeatures" :key="f.title" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg flex-shrink-0">{{ f.icon }}</div>
                <div>
                  <div class="font-semibold text-sm">{{ f.title }}</div>
                  <div class="text-slate-400 text-xs mt-0.5">{{ f.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Detail card mockup -->
          <div class="bg-white rounded-3xl shadow-xl shadow-slate-200 overflow-hidden max-w-sm mx-auto w-full">
            <div class="relative h-48">
              <img src="/tashkent/finance-center.jpg" alt="Green Business Center" class="w-full h-full object-cover" />
              <button class="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm">←</button>
              <div class="absolute top-3 right-3 flex gap-2">
                <button class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm">↗</button>
                <button class="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-sm">♡</button>
              </div>
            </div>
            <div class="p-5">
              <span class="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Ijaraga</span>
              <h3 class="font-bold text-lg mt-3 mb-1">Green Business Center</h3>
              <p class="text-slate-400 text-sm mb-4">Toshkent, Mirobod tumani, Amir Temur koʻchasi 88</p>
              <div class="grid grid-cols-4 gap-2 mb-4 text-center">
                <div class="bg-slate-50 rounded-lg py-2"><div class="text-xs font-bold">120 m²</div><div class="text-[10px] text-slate-400">Maydon</div></div>
                <div class="bg-slate-50 rounded-lg py-2"><div class="text-xs font-bold">3</div><div class="text-[10px] text-slate-400">Qavat</div></div>
                <div class="bg-slate-50 rounded-lg py-2"><div class="text-xs font-bold">6</div><div class="text-[10px] text-slate-400">Xonali</div></div>
                <div class="bg-slate-50 rounded-lg py-2"><div class="text-xs font-bold text-blue-600">18M</div><div class="text-[10px] text-slate-400">so'm/oy</div></div>
              </div>
              <div class="flex gap-2">
                <button class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold py-3 rounded-xl">Ijaraga olish</button>
                <button class="flex-1 bg-emerald-500 text-white text-sm font-semibold py-3 rounded-xl">Sotib olish</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="px-6 pb-24">
      <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="s in stats" :key="s.label" class="text-center bg-white border border-slate-200 rounded-2xl py-8">
          <div class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{{ s.value }}</div>
          <div class="text-slate-400 text-sm mt-1">{{ s.label }}</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-6 pb-24">
      <div class="max-w-7xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-16 text-center">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <h2 class="relative text-3xl md:text-4xl font-bold text-white mb-4">Bugundan boshlang</h2>
        <p class="relative text-blue-100 text-lg mb-8 max-w-md mx-auto">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni boshqarishni osonlashtiring.</p>
        <NuxtLink to="/login" class="relative inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg">Roʻyxatdan oʻtish →</NuxtLink>
      </div>
    </section>

    <footer class="border-t border-slate-100 py-12 px-6">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"><span class="text-white text-xs font-bold">M</span></div>
          <span class="font-bold text-sm">MAKON</span>
          <span class="text-slate-400 text-xs ml-2">© 2026 · Toshkent, Oʻzbekiston</span>
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
const tabs = ['Barchasi', 'Ijaraga', 'Sotib olish']
const activeTab = ref('Barchasi')
const categories = [
  { title: 'Biznes markaz', count: '1 250+', icon: '🏢', bg: '#EFF6FF' },
  { title: 'Savdo markaz', count: '900+', icon: '🛍️', bg: '#FEF3F2' },
  { title: 'Ombor', count: '420+', icon: '📦', bg: '#F0FDF4' },
  { title: 'Turar joy', count: '2 790+', icon: '🏠', bg: '#FEFCE8' },
]
const listings = [
  { title: 'Green Business Center', address: 'Toshkent, Mirobod tumani', area: '120 m²', floor: '3-qavat', price: '18 000 000 soʻm/oy', type: 'Ijarada', img: '/tashkent/finance-center.jpg' },
  { title: 'Mega Mall', address: 'Toshkent, Chilonzor tumani', area: '85 m²', floor: '1-qavat', price: '12 000 000 soʻm/oy', type: 'Ijarada', img: '/tashkent/mall-towers.jpg' },
  { title: 'Industrial Park 2', address: 'Toshkent vil., Yuqori Chirchiq', area: '450 m²', floor: '1-qavat', price: '24 000 000 soʻm/oy', type: 'Ijarada', img: '/tashkent/new-business.jpg' },
  { title: 'Harmony Residence', address: 'Toshkent, Yakkasaroy tumani', area: '120 m²', floor: '6-qavat', price: '1 250 000 soʻm/m²', type: 'Sotuvda', img: '/tashkent/nest-one.jpg' },
]
const detailFeatures = [
  { icon: '⏱', title: 'Boʻsh joylar real vaqt rejimida yangilanadi', desc: 'Tizimga ulangan manbalardan avtomatik maʼlumot olinadi' },
  { icon: '⚡', title: 'Aqlli filter va moslashtirilgan qidiruv', desc: 'Joy turi, narx, maydon, qavat, qulayliklar va boshqalar' },
  { icon: '♥', title: 'Sevimlilar va solishtirish', desc: 'Yoqqan joylarni saqlang va solishtirib, qaror qabul qiling' },
]
const stats = [
  { value: '5 300+', label: 'Faol eʼlonlar' },
  { value: '48', label: 'Shaharlar' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'Foydalanuvchi bahosi' },
]
</script>
