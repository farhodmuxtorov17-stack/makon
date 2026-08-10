<template>
  <div class="min-h-screen" style="background: #F5F0E8; color: #2A2520;">
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-[#F5F0E8]/95 backdrop-blur-lg border-b border-[#E5D5BE]' : 'bg-transparent'">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-[#2A2520] flex items-center justify-center"><span class="text-[#D4A85A] text-sm font-bold font-serif-display">M</span></div>
          <span class="font-serif-display text-[#2A2520] text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/" class="text-[#8B7F70] hover:text-[#9A7B3A] transition-colors">A · Editorial</a>
          <a href="/landing-light" class="text-[#8B7F70] hover:text-[#9A7B3A] transition-colors">B · Swiss Grid</a>
          <span class="text-[#9A7B3A] font-medium">C · Bento</span>
        </div>
        <NuxtLink to="/login" class="text-sm text-white bg-[#2A2520] hover:bg-[#3A3530] px-5 py-2 rounded-full transition-colors font-medium">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero: Bento grid -->
    <section class="pt-20 px-6 pb-12">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8 mt-8">
          <p class="text-[#9A7B3A] text-xs font-medium mb-4 tracking-[0.2em] uppercase">Toshkent koʻchmulk boshqaruvi</p>
          <h1 class="font-serif-display text-5xl md:text-7xl text-[#2A2520] leading-[0.95] font-light max-w-3xl">
            Mulkingizni <span class="italic text-[#9A7B3A]">qadrini</span> biling
          </h1>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          <!-- Big photo: Tashkent City -->
          <div class="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group">
            <img src="/tashkent/tashkent-city.jpg" alt="Tashkent City" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
              <p class="text-white/70 text-xs font-mono mb-1">TASHKENT CITY</p>
              <p class="text-white text-sm font-medium">International Business Center</p>
            </div>
          </div>
          <!-- Stats -->
          <div class="rounded-3xl bg-[#2A2520] p-6 flex flex-col justify-center">
            <div class="font-serif-display text-5xl text-[#D4A85A] font-light">16+</div>
            <div class="text-[#8B7F70] text-sm mt-1">Modullar</div>
          </div>
          <div class="rounded-3xl bg-white p-6 flex flex-col justify-center border border-[#E5D5BE]">
            <div class="font-serif-display text-5xl text-[#9A7B3A] font-light">99.9%</div>
            <div class="text-[#8B7F70] text-sm mt-1">Uptime</div>
          </div>
          <!-- CTA -->
          <div class="col-span-2 rounded-3xl bg-[#9A7B3A] p-6 flex items-center justify-between">
            <div>
              <p class="text-white text-lg font-medium">Boshlash</p>
              <p class="text-white/70 text-xs mt-1">Tizimga kirish</p>
            </div>
            <NuxtLink to="/login" class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"><span class="text-white text-xl">→</span></NuxtLink>
          </div>
          <!-- Photo: Piramit -->
          <div class="rounded-3xl overflow-hidden relative">
            <img src="/tashkent/piramit.jpg" alt="Piramit Tower Tashkent" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3"><span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Piramit</span></div>
          </div>
          <!-- Photo: IT Park -->
          <div class="rounded-3xl overflow-hidden relative">
            <img src="/tashkent/it-park.jpg" alt="IT Park Tashkent" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3"><span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">IT Park</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statement -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto text-center">
        <p class="font-serif-display text-3xl md:text-5xl text-[#2A2520] leading-[1.25] font-light">
          16+ modul, real-time dashboard va avtomatlashtirilgan jarayonlar. <span class="text-[#9A7B3A] italic">Batta tizim</span> — butun koʻchmulk ekotizimi uchun.
        </p>
      </div>
    </section>

    <!-- Features: Bento cards -->
    <section id="features" class="px-6 pb-24">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <span class="text-[#9A7B3A] text-xs font-medium tracking-[0.2em] uppercase mb-4 block">Imkoniyatlar</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-[#2A2520] font-light">Nima qila oladi</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <!-- Feature 1: large photo card -->
          <div class="md:col-span-2 rounded-3xl overflow-hidden relative group h-[420px]">
            <img src="/tashkent/trillant.jpg" alt="Trillant Tower Tashkent" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#2A2520]/90 via-transparent to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-8">
              <span class="text-[#D4A85A] text-xs font-medium tracking-widest uppercase mb-3 block">01 — Boshqaruv · Trillant Tower</span>
              <h3 class="font-serif-display text-3xl text-white mb-3 font-light">Bino va maydon</h3>
              <p class="text-white/70 text-sm max-w-md mb-4">Binolar va turar joylarni boshqaring. Maydon, zonalar va bandlikni real-time kuzating.</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="b in f1" :key="b" class="text-white/60 text-xs bg-white/10 px-3 py-1 rounded-full">{{ b }}</span>
              </div>
            </div>
          </div>
          <!-- Feature 2: text card -->
          <div class="rounded-3xl bg-white border border-[#E5D5BE] p-8 h-[420px] flex flex-col justify-between">
            <div>
              <span class="text-[#9A7B3A] text-xs font-medium tracking-widest uppercase mb-3 block">02 — Moliya</span>
              <h3 class="font-serif-display text-3xl text-[#2A2520] mb-4 font-light">Shartnoma va toʻlov</h3>
              <p class="text-[#6B6052] text-sm leading-relaxed mb-6">Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha.</p>
            </div>
            <ul class="space-y-3">
              <li v-for="b in f2" :key="b" class="flex items-center gap-2 text-[#6B6052] text-sm"><span class="text-[#9A7B3A]">▸</span> {{ b }}</li>
            </ul>
          </div>
        </div>
        <!-- Second row -->
        <div class="grid md:grid-cols-3 gap-4 mt-4">
          <!-- Feature 3: text card -->
          <div class="rounded-3xl bg-white border border-[#E5D5BE] p-8 h-[360px] flex flex-col justify-between">
            <div>
              <span class="text-[#9A7B3A] text-xs font-medium tracking-widest uppercase mb-3 block">03 — Servis</span>
              <h3 class="font-serif-display text-3xl text-[#2A2520] mb-4 font-light">Taʼmirlash</h3>
              <p class="text-[#6B6052] text-sm leading-relaxed">Texnik xizmat soʻrovlarini tracking qiling.</p>
            </div>
            <ul class="space-y-2">
              <li v-for="b in f3" :key="b" class="flex items-center gap-2 text-[#6B6052] text-sm"><span class="text-[#9A7B3A]">▸</span> {{ b }}</li>
            </ul>
          </div>
          <!-- Stats -->
          <div class="rounded-3xl bg-[#2A2520] p-8 h-[360px] flex flex-col justify-center text-center">
            <span class="text-[#D4A85A] text-xs font-medium tracking-widest uppercase mb-6 block">Raqamlar</span>
            <div class="space-y-8">
              <div><div class="font-serif-display text-5xl text-[#D4A85A] font-light">₸8.2M</div><div class="text-[#8B7F70] text-sm mt-1">Oylik daromad</div></div>
              <div><div class="font-serif-display text-5xl text-white font-light">94%</div><div class="text-[#8B7F70] text-sm mt-1">Oʻrtacha bandlik</div></div>
            </div>
          </div>
          <!-- Photo: Skyline -->
          <div class="rounded-3xl overflow-hidden relative h-[360px]">
            <img src="/tashkent/skyline-dusk.jpg" alt="Tashkent skyline at dusk" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full">
              <p class="text-white/70 text-xs font-mono mb-1">TOSHKENT</p>
              <p class="text-white text-sm font-medium">Shahar silueti</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules: visual tiles grid -->
    <section id="modules" class="py-24 px-6" style="background: #EDE5D7;">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12">
          <span class="text-[#9A7B3A] text-xs font-medium tracking-[0.2em] uppercase mb-4 block">Modullar</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-[#2A2520] font-light">16+ modul — <span class="italic text-[#9A7B3A]">batta tizim</span></h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div v-for="(m, i) in modules" :key="m.title" class="group bg-white rounded-2xl p-5 hover:bg-[#9A7B3A] hover:text-white transition-all cursor-pointer border border-[#E5D5BE]">
            <div class="text-[#D4B886] group-hover:text-white/60 text-xs font-mono mb-2">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="font-medium text-sm text-[#2A2520] group-hover:text-white transition-colors">{{ m.title }}</div>
            <div class="text-[#8B7F70] group-hover:text-white/60 text-xs mt-1 transition-colors">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 px-6 relative overflow-hidden" style="background: #2A2520;">
      <img src="/tashkent/lobby.jpg" alt="Tashkent business center lobby" class="absolute inset-0 w-full h-full object-cover opacity-15" />
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="font-serif-display text-4xl md:text-6xl text-[#F5F0E8] mb-8 font-light">Bugundan <span class="italic text-[#D4A85A]">boshlang</span></h2>
        <p class="text-[#8B7F70] text-lg mb-10 font-light max-w-lg mx-auto">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-[#D4A85A] hover:bg-[#C9A961] text-[#2A2520] px-10 py-4 rounded-full text-sm font-medium transition-colors">Tizimga kirish →</NuxtLink>
      </div>
    </section>

    <footer class="py-16 px-6 border-t border-[#E5D5BE]" style="background: #F5F0E8;">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1"><div class="flex items-center gap-3 mb-4"><div class="w-9 h-9 rounded-xl bg-[#2A2520] flex items-center justify-center"><span class="text-[#D4A85A] text-sm font-bold font-serif-display">M</span></div><span class="font-serif-display text-[#2A2520] text-lg">MAKON</span></div><p class="text-[#8B7F70] text-sm">Koʻchmulk Boshqaruvi Tizimi</p></div>
          <div><div class="text-[#2A2520] text-sm font-medium mb-4">Platforma</div><ul class="space-y-3 text-sm text-[#8B7F70]"><li><a href="#modules" class="hover:text-[#9A7B3A] transition-colors">Modullar</a></li><li><a href="#features" class="hover:text-[#9A7B3A] transition-colors">Imkoniyatlar</a></li></ul></div>
          <div><div class="text-[#2A2520] text-sm font-medium mb-4">Kompaniya</div><ul class="space-y-3 text-sm text-[#8B7F70]"><li><a class="hover:text-[#9A7B3A] transition-colors cursor-pointer">Haqimizda</a></li><li><a class="hover:text-[#9A7B3A] transition-colors cursor-pointer">Aloqa</a></li></ul></div>
          <div><div class="text-[#2A2520] text-sm font-medium mb-4">Maxfiylik</div><ul class="space-y-3 text-sm text-[#8B7F70]"><li><a class="hover:text-[#9A7B3A] transition-colors cursor-pointer">Shartlar</a></li><li><a class="hover:text-[#9A7B3A] transition-colors cursor-pointer">Maxfiylik</a></li></ul></div>
          <div><div class="text-[#2A2520] text-sm font-medium mb-4">Aloqa</div><ul class="space-y-3 text-sm text-[#8B7F70]"><li>info@makon.uz</li><li>+998 71 123 45 67</li><li>Toshkent, Oʻzbekiston</li></ul></div>
        </div>
        <div class="pt-8 border-t border-[#E5D5BE]"><p class="text-[#8B7F70] text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const scrolled = ref(false)
onMounted(() => window.addEventListener('scroll', () => scrolled.value = window.scrollY > 40))
const f1 = ['Ijara narxlari', 'Bandlik monitoringi', 'Bino turlari', 'Hisobotlar']
const f2 = ['Avtomatik shartnoma', 'Invoys tracking', 'Elektron imzo', 'Hisob davrlari']
const f3 = ['Soʻrov tracking', 'Brigade tayinlash', 'SLA monitoring', 'Sklad integratsiya']
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
