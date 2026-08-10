<template>
  <div class="min-h-screen" style="background: #FCFBF8; color: #1C1C1A;">
    <!-- Nav: minimal, no background -->
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-500" :style="scrolled ? 'background: rgba(252,251,248,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid #E8E5DF;' : 'background: transparent;'">
      <div class="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span style="font-family: 'Clash Display', serif; font-weight: 600; font-size: 20px; letter-spacing: -0.02em; color: #1C1C1A;">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-10 text-sm" style="color: #6B6B68;">
          <a href="#platform" class="hover:text-[#1C1C1A] transition-colors">Platforma</a>
          <a href="#buildings" class="hover:text-[#1C1C1A] transition-colors">Binolar</a>
          <a href="#modules" class="hover:text-[#1C1C1A] transition-colors">Modullar</a>
        </div>
        <NuxtLink to="/login" class="text-sm font-medium px-5 py-2 transition-all" style="color: #FCFBF8; background: #1C1C1A; border-radius: 2px;">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero: full-bleed real photo, minimal text -->
    <section class="relative h-screen min-h-[680px] flex items-end overflow-hidden">
      <img src="/tashkent/nest-one.jpg" alt="Nest One, Tashkent City" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);"></div>
      <div class="relative z-10 max-w-6xl mx-auto px-8 pb-24 w-full">
        <p class="text-white/60 text-xs mb-4" style="letter-spacing: 0.25em; text-transform: uppercase;">Nest One · Tashkent City</p>
        <h1 class="text-white" style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(48px, 8vw, 96px); line-height: 0.95; letter-spacing: -0.03em; max-width: 900px;">
          Mulkingizni qadrini<br><span style="font-style: italic; color: #C9A961;">biling</span>
        </h1>
        <p class="text-white/70 text-lg mt-8 max-w-md" style="font-weight: 300;">Koʻchmulk boshqaruvi — bitta platformada.</p>
        <div class="flex items-center gap-8 mt-12">
          <NuxtLink to="/login" class="text-sm font-medium px-8 py-3.5 transition-all" style="color: #1C1C1A; background: #C9A961; border-radius: 2px;">Boshlash</NuxtLink>
          <a href="#platform" class="text-white/60 hover:text-white text-sm transition-colors">Platforma ↓</a>
        </div>
      </div>
    </section>

    <!-- Statement: one sentence, centered, lots of space -->
    <section class="py-32 md:py-48 px-8">
      <div class="max-w-4xl mx-auto text-center">
        <p style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(28px, 4vw, 52px); line-height: 1.3; color: #1C1C1A; letter-spacing: -0.02em;">
          Binolar, ijara, shartnomalar va moliya.<br>
          <span style="color: #8B6F3A; font-style: italic;">Hammasi bitta joyda.</span>
        </p>
      </div>
    </section>

    <!-- Stats: clean, minimal, horizontal -->
    <section class="px-8 pb-32">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-0" style="border-top: 1px solid #E8E5DF;">
          <div v-for="(s, i) in stats" :key="s.label" class="py-10" :style="i < 3 ? 'border-right: 1px solid #E8E5DF;' : ''">
            <div style="font-family: 'Clash Display', serif; font-weight: 300; font-size: 48px; color: #1C1C1A; letter-spacing: -0.02em;">{{ s.value }}</div>
            <div class="text-sm mt-2" style="color: #9B9B98;">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform: editorial, full-width photos with text -->
    <section id="platform" class="space-y-0">
      <!-- Feature 1 -->
      <div class="grid lg:grid-cols-2 min-h-[600px]">
        <div class="relative h-[400px] lg:h-auto">
          <img src="/tashkent/new-business.jpg" alt="Tashkent business building" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="px-8 md:px-16 py-20 flex flex-col justify-center" style="background: #FCFBF8;">
          <p class="text-xs mb-6" style="color: #8B6F3A; letter-spacing: 0.2em; text-transform: uppercase;">01 — Boshqaruv</p>
          <h2 style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(32px, 4vw, 48px); line-height: 1.1; letter-spacing: -0.02em; color: #1C1C1A;" class="mb-6">Bino va maydon</h2>
          <p class="text-lg leading-relaxed max-w-md mb-8" style="color: #6B6B68; font-weight: 300;">Binolar, ofislar va turar joylarni boshqaring. Maydon, zonalar, ijara narxlari va bandlikni real-time kuzating.</p>
          <ul class="space-y-3 max-w-md">
            <li v-for="b in f1" :key="b" class="flex items-baseline gap-3" style="color: #4A4A47;"><span style="color: #C9A961; font-size: 10px;">●</span><span class="text-sm">{{ b }}</span></li>
          </ul>
        </div>
      </div>
      <!-- Feature 2: reversed -->
      <div class="grid lg:grid-cols-2 min-h-[600px]">
        <div class="px-8 md:px-16 py-20 flex flex-col justify-center order-2 lg:order-1" style="background: #F5F2EC;">
          <p class="text-xs mb-6" style="color: #8B6F3A; letter-spacing: 0.2em; text-transform: uppercase;">02 — Moliya</p>
          <h2 style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(32px, 4vw, 48px); line-height: 1.1; letter-spacing: -0.02em; color: #1C1C1A;" class="mb-6">Shartnoma va toʻlov</h2>
          <p class="text-lg leading-relaxed max-w-md mb-8" style="color: #6B6B68; font-weight: 300;">Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha. Invoyslar, toʻlovlar va hisob davrlarini boshqaring.</p>
          <ul class="space-y-3 max-w-md">
            <li v-for="b in f2" :key="b" class="flex items-baseline gap-3" style="color: #4A4A47;"><span style="color: #C9A961; font-size: 10px;">●</span><span class="text-sm">{{ b }}</span></li>
          </ul>
        </div>
        <div class="relative h-[400px] lg:h-auto order-1 lg:order-2">
          <img src="/tashkent/finance-center.jpg" alt="Tashkent Finance Center" class="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <!-- Feature 3 -->
      <div class="grid lg:grid-cols-2 min-h-[600px]">
        <div class="relative h-[400px] lg:h-auto">
          <img src="/tashkent/city-8.jpg" alt="Tashkent city" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="px-8 md:px-16 py-20 flex flex-col justify-center" style="background: #FCFBF8;">
          <p class="text-xs mb-6" style="color: #8B6F3A; letter-spacing: 0.2em; text-transform: uppercase;">03 — Servis</p>
          <h2 style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(32px, 4vw, 48px); line-height: 1.1; letter-spacing: -0.02em; color: #1C1C1A;" class="mb-6">Taʼmirlash va servis</h2>
          <p class="text-lg leading-relaxed max-w-md mb-8" style="color: #6B6B68; font-weight: 300;">Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang, SLA ni nazorat qiling.</p>
          <ul class="space-y-3 max-w-md">
            <li v-for="b in f3" :key="b" class="flex items-baseline gap-3" style="color: #4A4A47;"><span style="color: #C9A961; font-size: 10px;">●</span><span class="text-sm">{{ b }}</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tashkent buildings: real photo grid -->
    <section id="buildings" class="py-32 px-8" style="background: #F5F2EC;">
      <div class="max-w-6xl mx-auto">
        <div class="mb-20">
          <p class="text-xs mb-4" style="color: #8B6F3A; letter-spacing: 0.2em; text-transform: uppercase;">Toshkent obyektlari</p>
          <h2 style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(36px, 5vw, 56px); letter-spacing: -0.02em; color: #1C1C1A;">Bizning binolar</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-1">
          <div v-for="b in tashkentBuildings" :key="b.name" class="group relative h-[420px] overflow-hidden">
            <img :src="b.img" :alt="b.name" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
            <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%);"></div>
            <div class="absolute bottom-0 left-0 p-8">
              <p class="text-white/50 text-xs mb-1" style="letter-spacing: 0.15em; text-transform: uppercase;">{{ b.tag }}</p>
              <h3 class="text-white text-xl" style="font-family: 'Clash Display', serif; font-weight: 400;">{{ b.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules: simple numbered list, not cards -->
    <section id="modules" class="py-32 px-8">
      <div class="max-w-4xl mx-auto">
        <div class="mb-20">
          <p class="text-xs mb-4" style="color: #8B6F3A; letter-spacing: 0.2em; text-transform: uppercase;">Modullar</p>
          <h2 style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(36px, 5vw, 56px); letter-spacing: -0.02em; color: #1C1C1A;">Bitta tizim — <span style="font-style: italic; color: #8B6F3A;">16+ modul</span></h2>
        </div>
        <div style="border-top: 1px solid #E8E5DF;">
          <div v-for="(m, i) in modules" :key="m.title" class="group flex items-center justify-between py-5 transition-colors cursor-pointer" style="border-bottom: 1px solid #E8E5DF;">
            <div class="flex items-center gap-8">
              <span class="text-xs w-8" style="color: #C9A961; font-family: monospace;">{{ String(i+1).padStart(2,'0') }}</span>
              <span class="text-lg group-hover:text-[#8B6F3A] transition-colors" style="color: #1C1C1A; font-weight: 400;">{{ m.title }}</span>
            </div>
            <span class="text-sm hidden md:block" style="color: #B0B0AD;">{{ m.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA: clean, no glow, no gradient -->
    <section class="relative py-40 overflow-hidden">
      <img src="/tashkent/city-night.jpg" alt="Tashkent City at Night" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0" style="background: rgba(0,0,0,0.6);"></div>
      <div class="relative z-10 max-w-3xl mx-auto text-center px-8">
        <h2 class="text-white mb-8" style="font-family: 'Clash Display', serif; font-weight: 300; font-size: clamp(40px, 6vw, 72px); letter-spacing: -0.03em; line-height: 1;">Bugundan <span style="font-style: italic; color: #C9A961;">boshlang</span></h2>
        <p class="text-white/60 text-lg mb-12 max-w-md mx-auto" style="font-weight: 300;">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-block text-sm font-medium px-10 py-4 transition-all" style="color: #1C1C1A; background: #C9A961; border-radius: 2px;">Tizimga kirish →</NuxtLink>
      </div>
    </section>

    <!-- Footer: minimal -->
    <footer class="py-16 px-8" style="border-top: 1px solid #E8E5DF; background: #FCFBF8;">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1">
            <span style="font-family: 'Clash Display', serif; font-weight: 600; font-size: 20px; letter-spacing: -0.02em; color: #1C1C1A;">MAKON</span>
            <p class="text-sm mt-3" style="color: #9B9B98;">Koʻchmulk Boshqaruvi Tizimi</p>
            <p class="text-sm" style="color: #9B9B98;">Toshkent, Oʻzbekiston</p>
          </div>
          <div>
            <p class="text-sm font-medium mb-4" style="color: #1C1C1A;">Platforma</p>
            <ul class="space-y-3 text-sm" style="color: #9B9B98;">
              <li><a href="#platform" class="hover:text-[#8B6F3A] transition-colors">Imkoniyatlar</a></li>
              <li><a href="#modules" class="hover:text-[#8B6F3A] transition-colors">Modullar</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-medium mb-4" style="color: #1C1C1A;">Aloqa</p>
            <ul class="space-y-3 text-sm" style="color: #9B9B98;">
              <li>info@makon.uz</li>
              <li>+998 71 123 45 67</li>
            </ul>
          </div>
          <div>
            <p class="text-sm font-medium mb-4" style="color: #1C1C1A;">Kompaniya</p>
            <ul class="space-y-3 text-sm" style="color: #9B9B98;">
              <li><a class="hover:text-[#8B6F3A] transition-colors cursor-pointer">Haqimizda</a></li>
              <li><a class="hover:text-[#8B6F3A] transition-colors cursor-pointer">Maxfiylik</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8" style="border-top: 1px solid #E8E5DF;">
          <p class="text-sm" style="color: #B0B0AD;">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const scrolled = ref(false)
onMounted(() => window.addEventListener('scroll', () => scrolled.value = window.scrollY > 40))
const stats = [
  { value: '16+', label: 'Modullar' },
  { value: '60+', label: 'Unit' },
  { value: '48', label: 'Ijarachilar' },
  { value: '99.9%', label: 'Uptime' },
]
const f1 = ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar']
const f2 = ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash']
const f3 = ['Soʻrov yaratish va tracking', 'Brigade tayinlash va SLA', 'Statuslar va monitoring', 'Sklad bilan integratsiya']
const tashkentBuildings = [
  { name: 'Nest One', tag: 'Tashkent City · 266.5m', img: '/tashkent/nest-one.jpg' },
  { name: 'Finance Center', tag: 'Tashkent City · Ofis', img: '/tashkent/finance-center.jpg' },
  { name: 'Tashkent City', tag: 'Business Center', img: '/tashkent/new-business.jpg' },
  { name: 'Tashkent City', tag: 'Mall Towers', img: '/tashkent/mall-towers.jpg' },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
