<template>
  <div class="min-h-screen bg-graphite-950 text-graphite-50">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-graphite-900/95 backdrop-blur-xl border-b border-graphite-700' : 'bg-transparent'">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg border border-champagne-400/40 flex items-center justify-center">
            <span class="font-serif-display text-champagne-400 text-sm font-medium">M</span>
          </div>
          <span class="font-serif-display text-graphite-50 text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-10 text-sm">
          <a href="/landing-light" class="text-champagne-400 hover:text-champagne-300 transition-colors">⚡ Light variant</a>
          <a href="/landing-warm" class="text-graphite-300 hover:text-champagne-400 transition-colors">Warm variant</a>
        </div>
        <NuxtLink to="/login" class="text-sm text-graphite-900 bg-champagne-400 hover:bg-champagne-300 px-5 py-2 rounded-full transition-colors font-medium">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/c8ec92092_generated_image.png" alt="Tashkent business district" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-900/50 to-graphite-900/20"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <div class="max-w-2xl">
          <p class="text-champagne-400 text-sm font-medium mb-6 tracking-wider uppercase" style="letter-spacing: 0.15em;">Toshkent koʻchmulk boshqaruvi</p>
          <h1 class="font-serif-display text-5xl md:text-7xl text-graphite-50 leading-[1.02] mb-8 font-light">
            Mulkingizni<br><span class="italic text-champagne-400">qadrini</span> biling
          </h1>
          <p class="text-graphite-200 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">
            Binolar, ijara, shartnomalar va moliya — bitta platformada. Zamonaviy koʻchmulk boshqaruvi endi sizning qoʻlingizda.
          </p>
          <div class="flex items-center gap-6">
            <NuxtLink to="/login" class="bg-champagne-400 hover:bg-champagne-300 text-graphite-900 px-8 py-3.5 rounded-full text-sm font-medium transition-colors">Boshlash</NuxtLink>
            <a href="#modules" class="text-graphite-200 hover:text-champagne-400 text-sm flex items-center gap-2 transition-colors">Koʻrish <ArrowRight :size="16" :stroke-width="1.5" /></a>
          </div>
        </div>
      </div>
    </section>

    <!-- Statement -->
    <section class="py-24 md:py-32 px-6 bg-graphite-950">
      <div class="max-w-5xl mx-auto">
        <p class="font-serif-display text-3xl md:text-5xl text-graphite-100 leading-[1.3] font-light">
          MAKON — bu 16+ modul, real-time dashboard va avtomatlashtirilgan jarayonlar. <span class="text-champagne-400 italic">Bitta tizim</span> — butun koʻchmulk ekotizimi uchun.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-graphite-700">
          <div v-for="s in stats" :key="s.label">
            <div class="font-serif-display text-4xl md:text-5xl text-champagne-400 font-light">{{ s.value }}</div>
            <div class="text-graphite-400 text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features — Editorial alternating -->
    <section class="bg-graphite-900">
      <div class="grid lg:grid-cols-2 min-h-[600px]">
        <div class="relative order-2 lg:order-1">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/0e3edcbc3_generated_image.png" alt="Premium residential Tashkent" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="order-1 lg:order-2 px-8 md:px-16 py-20 flex flex-col justify-center">
          <span class="text-champagne-400 text-xs font-medium tracking-widest uppercase mb-5">01 — Boshqaruv</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-graphite-50 mb-6 font-light leading-tight">Bino va maydon</h2>
          <p class="text-graphite-300 text-lg leading-relaxed mb-8 font-light max-w-md">Binolar, ofislar va turar joylarni boshqaring. Maydon, zonalar, ijara narxlari va bandlikni real-time kuzating.</p>
          <ul class="space-y-4">
            <li v-for="f in f1" :key="f" class="flex items-center gap-3 text-graphite-300"><span class="w-1 h-1 rounded-full bg-champagne-400 flex-shrink-0"></span><span class="text-sm">{{ f }}</span></li>
          </ul>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 min-h-[600px] border-t border-graphite-700">
        <div class="px-8 md:px-16 py-20 flex flex-col justify-center">
          <span class="text-champagne-400 text-xs font-medium tracking-widest uppercase mb-5">02 — Moliya</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-graphite-50 mb-6 font-light leading-tight">Shartnoma va toʻlov</h2>
          <p class="text-graphite-300 text-lg leading-relaxed mb-8 font-light max-w-md">Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha. Invoyslar, toʻlovlar va hisob davrlarini boshqaring.</p>
          <ul class="space-y-4">
            <li v-for="f in f2" :key="f" class="flex items-center gap-3 text-graphite-300"><span class="w-1 h-1 rounded-full bg-champagne-400 flex-shrink-0"></span><span class="text-sm">{{ f }}</span></li>
          </ul>
        </div>
        <div class="relative">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/1f0b47b67_generated_image.png" alt="Business center lobby Tashkent" class="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <div class="grid lg:grid-cols-2 min-h-[600px] border-t border-graphite-700">
        <div class="relative order-2 lg:order-1">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/3d553abda_generated_image.png" alt="Tech hub Tashkent" class="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div class="order-1 lg:order-2 px-8 md:px-16 py-20 flex flex-col justify-center">
          <span class="text-champagne-400 text-xs font-medium tracking-widest uppercase mb-5">03 — Servis</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-graphite-50 mb-6 font-light leading-tight">Taʼmirlash va servis</h2>
          <p class="text-graphite-300 text-lg leading-relaxed mb-8 font-light max-w-md">Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang, statuslarni kuzating, sifatni nazorat qiling.</p>
          <ul class="space-y-4">
            <li v-for="f in f3" :key="f" class="flex items-center gap-3 text-graphite-300"><span class="w-1 h-1 rounded-full bg-champagne-400 flex-shrink-0"></span><span class="text-sm">{{ f }}</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Stats band -->
    <section class="relative py-28 overflow-hidden">
      <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/6e01fa2d8_generated_image.png" alt="Tashkent skyline at dusk" class="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-graphite-950/70"></div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif-display text-4xl md:text-5xl text-graphite-50 mb-16 font-light leading-tight">
          Oʻzbekistondagi yetakchi<br><span class="italic text-champagne-400">koʻchmulk boshqaruvchilari</span><br>MAKON tanlaydi
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="s in bigStats" :key="s.label">
            <div class="font-serif-display text-5xl md:text-6xl text-champagne-400 font-light">{{ s.value }}</div>
            <div class="text-graphite-400 text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules -->
    <section id="modules" class="py-24 md:py-32 px-6 bg-graphite-950">
      <div class="max-w-5xl mx-auto">
        <div class="mb-16">
          <span class="text-champagne-400 text-xs font-medium tracking-widest uppercase mb-5 block">Modullar</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-graphite-50 font-light leading-tight">Bitta tizim — <span class="italic text-champagne-400">16+ modul</span></h2>
        </div>
        <div class="border-t border-graphite-700">
          <div v-for="(m, i) in modules" :key="m.title" class="group flex items-center justify-between py-5 border-b border-graphite-700 hover:border-champagne-400/30 transition-colors cursor-pointer">
            <div class="flex items-center gap-6">
              <span class="text-champagne-400/60 text-xs font-mono w-8">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-graphite-100 group-hover:text-champagne-400 transition-colors text-lg font-light">{{ m.title }}</span>
            </div>
            <span class="text-graphite-500 text-sm hidden md:block group-hover:text-champagne-400/60 transition-colors">{{ m.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 md:py-36 px-6 bg-graphite-900 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne-400/5 rounded-full blur-[100px]"></div>
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="font-serif-display text-4xl md:text-6xl text-graphite-50 mb-8 font-light leading-tight">Bugundan<br><span class="italic text-champagne-400">boshlang</span></h2>
        <p class="text-graphite-400 text-lg mb-10 font-light max-w-lg mx-auto">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni professional darajada boshqaring.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-champagne-400 hover:bg-champagne-300 text-graphite-900 px-10 py-4 rounded-full text-sm font-medium transition-colors">Tizimga kirish <ArrowRight :size="18" :stroke-width="1.5" /></NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-graphite-950 border-t border-graphite-700 py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 rounded-lg border border-champagne-400/40 flex items-center justify-center"><span class="font-serif-display text-champagne-400 text-sm font-medium">M</span></div>
              <span class="font-serif-display text-graphite-50 text-lg">MAKON</span>
            </div>
            <p class="text-graphite-500 text-sm">Koʻchmulk Boshqaruvi Tizimi</p>
          </div>
          <div><div class="text-graphite-50 text-sm font-medium mb-4">Platforma</div><ul class="space-y-3 text-sm text-graphite-500"><li><a href="#modules" class="hover:text-champagne-400 transition-colors">Modullar</a></li><li><a href="#features" class="hover:text-champagne-400 transition-colors">Imkoniyatlar</a></li></ul></div>
          <div><div class="text-graphite-50 text-sm font-medium mb-4">Kompaniya</div><ul class="space-y-3 text-sm text-graphite-500"><li><a class="hover:text-champagne-400 transition-colors cursor-pointer">Haqimizda</a></li><li><a class="hover:text-champagne-400 transition-colors cursor-pointer">Aloqa</a></li></ul></div>
          <div><div class="text-graphite-50 text-sm font-medium mb-4">Maxfiylik</div><ul class="space-y-3 text-sm text-graphite-500"><li><a class="hover:text-champagne-400 transition-colors cursor-pointer">Shartlar</a></li><li><a class="hover:text-champagne-400 transition-colors cursor-pointer">Maxfiylik</a></li></ul></div>
          <div><div class="text-graphite-50 text-sm font-medium mb-4">Aloqa</div><ul class="space-y-3 text-sm text-graphite-500"><li>info@makon.uz</li><li>+998 71 123 45 67</li><li>Toshkent, Oʻzbekiston</li></ul></div>
        </div>
        <div class="pt-8 border-t border-graphite-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-graphite-500 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
definePageMeta({ layout: 'public' })
const scrolled = ref(false)
onMounted(() => window.addEventListener('scroll', () => scrolled.value = window.scrollY > 40))
const stats = [{ value: '16+', label: 'Modullar' }, { value: '60+', label: 'Unit' }, { value: '48', label: 'Ijarachilar' }, { value: '99.9%', label: 'Uptime' }]
const bigStats = [{ value: '₸8.2M', label: 'Oylik daromad' }, { value: '94%', label: 'Oʻrtacha bandlik' }, { value: '48', label: 'Faol ijarachilar' }, { value: '12', label: 'Faol shartnomalar' }]
const f1 = ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar']
const f2 = ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash workflow']
const f3 = ['Soʻrov yaratish va tracking', 'Brigade tayinlash va SLA', 'Statuslar va monitoring', 'Sklad bilan integratsiya']
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' },
  { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' },
  { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' },
  { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' },
  { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' },
  { title: 'Monitoring', desc: 'Tizim' },
]
</script>
