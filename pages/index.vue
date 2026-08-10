<template>
  <div class="min-h-screen bg-[#08080A] text-white overflow-x-hidden">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-[#08080A]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center"><span class="text-white text-sm font-bold">M</span></div>
          <span class="font-bold text-base tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#product" class="hover:text-white transition-colors">Mahsulot</a>
          <a href="#buildings" class="hover:text-white transition-colors">Binolar</a>
          <a href="#modules" class="hover:text-white transition-colors">Modullar</a>
        </div>
        <NuxtLink to="/login" class="text-sm text-white bg-white/10 hover:bg-white/20 px-5 py-2 rounded-lg transition-colors font-medium border border-white/10">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero: product screenshot, NOT CSS mockup -->
    <section class="pt-24 pb-16 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 text-xs text-indigo-400 mb-6 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            REAL-TIME KOʻCHMULK BOSHQARUVI
          </div>
          <h1 class="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Mulkingizni<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">qadrini biling</span>
          </h1>
          <p class="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">Binolar, ijara, shartnomalar va moliya — bitta platformada. 16+ modul, real-time dashboard, avtomatlashtirilgan jarayonlar.</p>
          <div class="flex items-center justify-center gap-4 mt-10">
            <NuxtLink to="/login" class="bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-8 py-3.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Boshlash</NuxtLink>
            <a href="#product" class="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors">Mahsulot ↓</a>
          </div>
        </div>

        <!-- Real product screenshot in browser frame -->
        <div class="relative max-w-5xl mx-auto">
          <div class="rounded-2xl bg-[#111114] border border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div class="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div class="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span class="text-white/20 text-xs ml-3 font-mono">app.makon.uz/dashboard</span>
            </div>
            <img src="/tashkent/dashboard-dark.png" alt="MAKON Dashboard" class="w-full" />
          </div>
        </div>

        <!-- Trust stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          <div v-for="s in stats" :key="s.label" class="text-center">
            <div class="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 text-transparent bg-clip-text">{{ s.value }}</div>
            <div class="text-white/30 text-sm mt-1">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product gallery: show actual UI screenshots -->
    <section id="product" class="py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-indigo-400 text-xs font-mono uppercase tracking-wider">Mahsulot</span>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4">Hammasi bitta tizimda</h2>
          <p class="text-white/40 text-lg max-w-xl mx-auto">Dashboard, shartnomalar, moliya, servis — istalgan qurilmadan</p>
        </div>

        <!-- Screenshot 1: Light dashboard -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div class="order-2 lg:order-1">
            <span class="text-violet-400 text-xs font-mono mb-4 block">01 — SHARTNOMALAR</span>
            <h3 class="text-3xl font-bold mb-4 tracking-tight">Shartnoma boshqaruvi</h3>
            <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md">Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha. Invoyslar, toʻlovlar va hisob davrlarini bitta joyda boshqaring.</p>
            <div class="space-y-3">
              <div v-for="b in f1" :key="b" class="flex items-center gap-3 text-white/60">
                <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0"><span class="text-indigo-400 text-xs">✓</span></div>
                <span class="text-sm">{{ b }}</span>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <div class="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-500/5">
              <img src="/tashkent/dashboard-light.png" alt="MAKON Contracts" class="w-full" />
            </div>
          </div>
        </div>

        <!-- Screenshot 2: Map view -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div class="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/5">
              <img src="/tashkent/map-view.png" alt="MAKON Map View" class="w-full" />
            </div>
          </div>
          <div>
            <span class="text-violet-400 text-xs font-mono mb-4 block">02 — XARITA</span>
            <h3 class="text-3xl font-bold mb-4 tracking-tight">Xaritada koʻrish</h3>
            <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md">Barcha binolarni xaritada koʻring. Bandlik, daromad va statusni geografik koʻrinishda tahlil qiling.</p>
            <div class="space-y-3">
              <div v-for="b in f2" :key="b" class="flex items-center gap-3 text-white/60">
                <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0"><span class="text-indigo-400 text-xs">✓</span></div>
                <span class="text-sm">{{ b }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Screenshot 3: Mobile -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <span class="text-violet-400 text-xs font-mono mb-4 block">03 — MOBIL</span>
            <h3 class="text-3xl font-bold mb-4 tracking-tight">Istalgan qurilmada</h3>
            <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md">Mobil ilovada binolar, shartnomalar va toʻlovlarni boshqaring. push-notifikatsiyalar va real-time yangilanishlar.</p>
            <div class="space-y-3">
              <div v-for="b in f3" :key="b" class="flex items-center gap-3 text-white/60">
                <div class="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0"><span class="text-indigo-400 text-xs">✓</span></div>
                <span class="text-sm">{{ b }}</span>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2 flex justify-center">
            <div class="rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-violet-500/10 max-w-[300px]">
              <img src="/tashkent/mobile-app.png" alt="MAKON Mobile App" class="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tashkent buildings -->
    <section id="buildings" class="py-24 px-6 bg-gradient-to-b from-transparent to-indigo-950/20">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-indigo-400 text-xs font-mono uppercase tracking-wider">Toshkent</span>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight mt-4">Bizning obyektlar</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="b in tashkentBuildings" :key="b.name" class="group relative h-72 rounded-2xl overflow-hidden">
            <img :src="b.img" :alt="b.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-5">
              <h3 class="text-white font-bold text-lg mb-1">{{ b.name }}</h3>
              <p class="text-white/50 text-sm">{{ b.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="py-24 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-20">
          <span class="text-indigo-400 text-xs font-mono uppercase tracking-wider">Modullar</span>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight mt-4">16+ modul</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(m, i) in modules" :key="m.title" class="bg-white/[0.03] border border-white/5 rounded-xl p-5 hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all group cursor-pointer">
            <div class="text-indigo-400/40 text-xs font-mono mb-3 group-hover:text-indigo-400 transition-colors">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="text-white/90 font-medium text-sm group-hover:text-white transition-colors">{{ m.title }}</div>
            <div class="text-white/30 text-xs mt-1">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-32 px-6 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]"></div>
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">Bugundan <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">boshlang</span></h2>
        <p class="text-white/40 text-lg mb-10 max-w-md mx-auto">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-10 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Tizimga kirish →</NuxtLink>
      </div>
    </section>

    <footer class="py-12 px-6 border-t border-white/5">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center"><span class="text-white text-xs font-bold">M</span></div>
          <span class="font-bold text-sm">MAKON</span>
          <span class="text-white/20 text-xs ml-2">© 2026 · Toshkent, Oʻzbekiston</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-white/30">
          <a class="hover:text-white/60 transition-colors cursor-pointer">info@makon.uz</a>
          <a class="hover:text-white/60 transition-colors cursor-pointer">+998 71 123 45 67</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const scrolled = ref(false)
onMounted(() => window.addEventListener('scroll', () => scrolled.value = window.scrollY > 40))
const stats = [{ value: '16+', label: 'Modullar' }, { value: '60+', label: 'Unit' }, { value: '48', label: 'Ijarachilar' }, { value: '99.9%', label: 'Uptime' }]
const f1 = ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash']
const f2 = ['Barcha binolar xaritada', 'Geografik bandlik tahlili', 'Daromad boʻyicha filtr', 'Status monitoring']
const f3 = ['iOS va Android', 'Push-notifikatsiyalar', 'Real-time yangilanishlar', 'Offline rejim']
const tashkentBuildings = [
  { name: 'Tashkent City', desc: 'IBC · Ofis majmuasi', img: '/tashkent/tashkent-city.jpg' },
  { name: 'Trillant Tower', desc: 'Turar joy', img: '/tashkent/trillant.jpg' },
  { name: 'Piramit Tower', desc: 'Ofis majmuasi', img: '/tashkent/piramit.jpg' },
  { name: 'IT Park', desc: 'Ministry of Digital Tech', img: '/tashkent/it-park.jpg' },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
