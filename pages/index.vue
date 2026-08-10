<template>
  <div class="min-h-screen bg-[#0F0D0A] text-[#F0EBE0]">
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-[#0F0D0A]/95 backdrop-blur-xl border-b border-[#2A2520]' : 'bg-transparent'">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg border border-[#C9A961]/40 flex items-center justify-center"><span class="font-serif-display text-[#C9A961] text-sm font-medium">M</span></div>
          <span class="font-serif-display text-[#F0EBE0] text-lg tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm">
          <span class="text-[#C9A961]">A · Editorial</span>
          <a href="/landing-light" class="text-[#6B6052] hover:text-[#C9A961] transition-colors">B · Swiss Grid</a>
          <a href="/landing-warm" class="text-[#6B6052] hover:text-[#C9A961] transition-colors">C · Bento</a>
        </div>
        <NuxtLink to="/login" class="text-sm text-[#0F0D0A] bg-[#C9A961] hover:bg-[#B8954A] px-5 py-2 rounded-full transition-colors font-medium">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero: full-bleed Tashkent City -->
    <section class="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      <img src="/tashkent/tashkent-city.jpg" alt="Tashkent City International Business Center" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F0D0A] via-[#0F0D0A]/50 to-transparent"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full">
        <div class="max-w-2xl">
          <p class="text-[#C9A961] text-xs font-medium mb-6 tracking-[0.2em] uppercase">Tashkent City · Toshkent</p>
          <h1 class="font-serif-display text-5xl md:text-8xl text-[#F0EBE0] leading-[0.95] mb-8 font-light">
            Mulkingizni<br><span class="italic text-[#C9A961]">qadrini</span> biling
          </h1>
          <p class="text-[#A89F90] text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-light">Binolar, ijara, shartnomalar va moliya — bitta platformada.</p>
          <div class="flex items-center gap-6">
            <NuxtLink to="/login" class="bg-[#C9A961] hover:bg-[#B8954A] text-[#0F0D0A] px-8 py-3.5 rounded-full text-sm font-medium transition-colors">Boshlash</NuxtLink>
            <a href="#features" class="text-[#A89F90] hover:text-[#C9A961] text-sm flex items-center gap-2 transition-colors">Koʻrish ↓</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Statement + Stats inline -->
    <section class="py-24 md:py-32 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="font-serif-display text-3xl md:text-5xl text-[#F0EBE0] leading-[1.25] font-light mb-20">
          16+ modul, real-time dashboard va avtomatlashtirilgan jarayonlar. <span class="text-[#C9A961] italic">Batta tizim</span> — butun koʻchmulk ekotizimi uchun.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#2A2520]">
          <div v-for="s in stats" :key="s.label">
            <div class="font-serif-display text-4xl md:text-5xl text-[#C9A961] font-light">{{ s.value }}</div>
            <div class="text-[#6B6052] text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features: full-bleed alternating -->
    <section id="features">
      <div class="grid lg:grid-cols-2 min-h-[600px]" v-for="(f, i) in features" :key="f.num" :class="i % 2 === 0 ? '' : 'lg:[direction:rtl]'">
        <div class="relative h-[400px] lg:h-auto [direction:ltr]">
          <img :src="f.img" :alt="f.building" class="absolute inset-0 w-full h-full object-cover" />
          <div class="absolute bottom-4 left-4 z-10">
            <span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">{{ f.building }}</span>
          </div>
        </div>
        <div class="px-8 md:px-16 py-20 flex flex-col justify-center [direction:ltr]">
          <span class="text-[#C9A961] text-xs font-medium tracking-[0.2em] uppercase mb-5">{{ f.num }} — {{ f.tag }}</span>
          <h2 class="font-serif-display text-4xl md:text-5xl text-[#F0EBE0] mb-6 font-light leading-tight">{{ f.title }}</h2>
          <p class="text-[#A89F90] text-lg leading-relaxed mb-8 font-light max-w-md">{{ f.desc }}</p>
          <ul class="space-y-3">
            <li v-for="b in f.bullets" :key="b" class="flex items-center gap-3 text-[#8B7F70]"><span class="w-1 h-1 rounded-full bg-[#C9A961] flex-shrink-0"></span><span class="text-sm">{{ b }}</span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Stats band with skyline -->
    <section class="relative py-28 overflow-hidden">
      <img src="/tashkent/skyline-dusk.jpg" alt="Tashkent skyline at dusk" class="absolute inset-0 w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 bg-[#0F0D0A]/80"></div>
      <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif-display text-4xl md:text-5xl text-[#F0EBE0] mb-16 font-light leading-tight">Oʻzbekistondagi yetakchi <span class="italic text-[#C9A961]">koʻchmulk boshqaruvchilari</span> MAKON tanlaydi</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="s in bigStats" :key="s.label">
            <div class="font-serif-display text-5xl md:text-6xl text-[#C9A961] font-light">{{ s.value }}</div>
            <div class="text-[#6B6052] text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules: elegant table -->
    <section id="modules" class="py-24 md:py-32 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="mb-16"><span class="text-[#C9A961] text-xs font-medium tracking-[0.2em] uppercase mb-5 block">Modullar</span><h2 class="font-serif-display text-4xl md:text-5xl text-[#F0EBE0] font-light">Batta tizim — <span class="italic text-[#C9A961]">16+ modul</span></h2></div>
        <div class="border-t border-[#2A2520]">
          <div v-for="(m, i) in modules" :key="m.title" class="group flex items-center justify-between py-5 border-b border-[#2A2520] hover:border-[#C9A961]/30 transition-colors cursor-pointer">
            <div class="flex items-center gap-6"><span class="text-[#C9A961]/40 text-xs font-mono w-8">{{ String(i+1).padStart(2,'0') }}</span><span class="text-[#F0EBE0] group-hover:text-[#C9A961] transition-colors text-lg font-light">{{ m.title }}</span></div>
            <span class="text-[#4A4238] text-sm hidden md:block group-hover:text-[#C9A961]/50 transition-colors">{{ m.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 px-6 relative overflow-hidden bg-[#1A1510]">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
      <div class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="font-serif-display text-4xl md:text-6xl text-[#F0EBE0] mb-8 font-light">Bugundan <span class="italic text-[#C9A961]">boshlang</span></h2>
        <p class="text-[#A89F90] text-lg mb-10 font-light max-w-lg mx-auto">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-[#C9A961] hover:bg-[#B8954A] text-[#0F0D0A] px-10 py-4 rounded-full text-sm font-medium transition-colors">Tizimga kirish →</NuxtLink>
      </div>
    </section>

    <footer class="bg-[#0F0D0A] border-t border-[#2A2520] py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1"><div class="flex items-center gap-3 mb-4"><div class="w-8 h-8 rounded-lg border border-[#C9A961]/40 flex items-center justify-center"><span class="font-serif-display text-[#C9A961] text-sm font-medium">M</span></div><span class="font-serif-display text-[#F0EBE0] text-lg">MAKON</span></div><p class="text-[#4A4238] text-sm">Koʻchmulk Boshqaruvi Tizimi</p></div>
          <div><div class="text-[#F0EBE0] text-sm font-medium mb-4">Platforma</div><ul class="space-y-3 text-sm text-[#4A4238]"><li><a href="#modules" class="hover:text-[#C9A961] transition-colors">Modullar</a></li><li><a href="#features" class="hover:text-[#C9A961] transition-colors">Imkoniyatlar</a></li></ul></div>
          <div><div class="text-[#F0EBE0] text-sm font-medium mb-4">Kompaniya</div><ul class="space-y-3 text-sm text-[#4A4238]"><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Haqimizda</a></li><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Aloqa</a></li></ul></div>
          <div><div class="text-[#F0EBE0] text-sm font-medium mb-4">Maxfiylik</div><ul class="space-y-3 text-sm text-[#4A4238]"><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Shartlar</a></li><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Maxfiylik</a></li></ul></div>
          <div><div class="text-[#F0EBE0] text-sm font-medium mb-4">Aloqa</div><ul class="space-y-3 text-sm text-[#4A4238]"><li>info@makon.uz</li><li>+998 71 123 45 67</li><li>Toshkent, Oʻzbekiston</li></ul></div>
        </div>
        <div class="pt-8 border-t border-[#2A2520]"><p class="text-[#4A4238] text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const scrolled = ref(false)
onMounted(() => window.addEventListener('scroll', () => scrolled.value = window.scrollY > 40))
const stats = [{ value: '16+', label: 'Modullar' }, { value: '60+', label: 'Unit' }, { value: '48', label: 'Ijarachilar' }, { value: '99.9%', label: 'Uptime' }]
const bigStats = [{ value: '₸8.2M', label: 'Oylik daromad' }, { value: '94%', label: 'Oʻrtacha bandlik' }, { value: '48', label: 'Faol ijarachilar' }, { value: '12', label: 'Faol shartnomalar' }]
const features = [
  { num: '01', tag: 'Boshqaruv', title: 'Bino va maydon', building: 'Trillant Tower', desc: 'Binolar, ofislar va turar joylarni boshqaring. Maydon, zonalar, ijara narxlari va bandlikni real-time kuzating.', img: '/tashkent/trillant.jpg', bullets: ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar'] },
  { num: '02', tag: 'Moliya', title: 'Shartnoma va toʻlov', building: 'Piramit Tower', desc: 'Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha.', img: '/tashkent/piramit.jpg', bullets: ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash'] },
  { num: '03', tag: 'Servis', title: 'Taʼmirlash va servis', building: 'IT Park · Ministry of Digital Technologies', desc: 'Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang, sifatni nazorat qiling.', img: '/tashkent/it-park.jpg', bullets: ['Soʻrov yaratish va tracking', 'Brigade tayinlash va SLA', 'Statuslar va monitoring', 'Sklad bilan integratsiya'] },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
