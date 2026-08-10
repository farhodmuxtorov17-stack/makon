<template>
  <div class="min-h-screen bg-white text-[#111111]">
    <nav class="fixed top-0 inset-x-0 z-50 transition-all duration-300" :class="scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-stone-100' : 'bg-transparent'">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-md bg-[#111111] flex items-center justify-center"><span class="text-[#C9A961] text-xs font-bold font-serif-display">M</span></div>
          <span class="font-bold text-base tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/landing-light#modules" class="text-stone-500 hover:text-[#111111] transition-colors">Modullar</a>
          <a href="/landing-light#features" class="text-stone-500 hover:text-[#111111] transition-colors">Imkoniyatlar</a>
          <a href="/" class="text-stone-400 hover:text-[#C9A961] transition-colors">A · Editorial</a>
          <span class="text-[#C9A961] font-medium">B · Swiss Grid</span>
          <a href="/landing-warm" class="text-stone-400 hover:text-[#C9A961] transition-colors">C · Bento</a>
        </div>
        <NuxtLink to="/login" class="text-sm text-white bg-[#111111] hover:bg-[#333] px-4 py-1.5 rounded-md transition-colors font-medium">Kirish</NuxtLink>
      </div>
    </nav>

    <!-- Hero: NO photo. Bold typography statement -->
    <section class="min-h-screen flex items-center pt-14 border-b border-stone-100">
      <div class="max-w-6xl mx-auto px-6 w-full">
        <div class="grid lg:grid-cols-12 gap-8 items-end pb-20">
          <div class="lg:col-span-8">
            <div class="text-xs text-stone-400 mb-8 font-mono tracking-wider">[ MAKON / KOʻCHMULK BOSHQARUVI TIZIMI / TOSHKENT ]</div>
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
              Mulkingizni<br><span class="text-[#C9A961] italic font-light font-serif-display">qadrini</span> biling.
            </h1>
            <p class="text-stone-500 text-lg max-w-md leading-relaxed">Binolar, ijara, shartnomalar va moliya — bitta platformada. Zamonaviy koʻchmulk boshqaruvi endi sizning qoʻlingizda.</p>
          </div>
          <div class="lg:col-span-4 flex lg:justify-end gap-4">
            <NuxtLink to="/login" class="bg-[#111111] hover:bg-[#333] text-white px-7 py-3 rounded-md text-sm font-medium transition-colors">Boshlash →</NuxtLink>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 border-t border-stone-100">
          <div v-for="(s, i) in stats" :key="s.label" class="py-8" :class="i < 3 ? 'border-r border-stone-100' : ''">
            <div class="text-4xl font-bold text-[#111111]">{{ s.value }}</div>
            <div class="text-stone-400 text-xs mt-2 font-medium tracking-wider uppercase">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features: 3-column grid of cards -->
    <section id="features" class="py-24 md:py-32 px-6 bg-stone-50">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16">
          <div class="text-xs text-[#C9A961] font-mono tracking-wider mb-4">[ 03 MODUL ]</div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight">Asosiy imkoniyatlar</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="f in features" :key="f.num" class="bg-white border border-stone-200 rounded-2xl p-8 hover:border-[#C9A961]/40 transition-colors group">
            <div class="h-48 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-2xl relative">
              <img :src="f.img" :alt="f.building" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span class="absolute bottom-3 left-3 text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">{{ f.building }}</span>
            </div>
            <div class="text-xs text-[#C9A961] font-mono mb-3">{{ f.num }} — {{ f.tag }}</div>
            <h3 class="text-2xl font-bold mb-4 tracking-tight">{{ f.title }}</h3>
            <p class="text-stone-500 text-sm leading-relaxed mb-6">{{ f.desc }}</p>
            <ul class="space-y-2">
              <li v-for="b in f.bullets" :key="b" class="flex items-start gap-2 text-stone-600 text-sm"><span class="text-[#C9A961] mt-1">▸</span> {{ b }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-24 md:py-32 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16">
          <div class="text-xs text-[#C9A961] font-mono tracking-wider mb-4">[ 04 STATS ]</div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight">Raqamlarda <span class="text-[#C9A961] italic font-light font-serif-display">MAKON</span></h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="s in bigStats" :key="s.label" class="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center">
            <div class="text-5xl font-bold text-[#111111] mb-2">{{ s.value }}</div>
            <div class="text-stone-400 text-sm">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tashkent photo showcase -->
    <section class="px-6 pb-24">
      <div class="max-w-6xl mx-auto">
        <div class="rounded-3xl overflow-hidden h-[400px] md:h-[500px] relative">
          <img src="/tashkent/skyline-dusk.jpg" alt="Tashkent skyline at dusk" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-10 md:p-16">
            <p class="text-white/60 text-xs font-mono tracking-wider mb-3">[ TOSHKENT CITY · OʻZBEKISTON ]</p>
            <h3 class="text-3xl md:text-4xl text-white font-bold tracking-tight">Toshkentning yangi silueti</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules: clean grid -->
    <section id="modules" class="py-24 md:py-32 px-6 bg-stone-50 border-y border-stone-100">
      <div class="max-w-6xl mx-auto">
        <div class="mb-16">
          <div class="text-xs text-[#C9A961] font-mono tracking-wider mb-4">[ 05 MODULLAR ]</div>
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight">16+ modul — <span class="text-[#C9A961] italic font-light font-serif-display">batta tizim</span></h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(m, i) in modules" :key="m.title" class="bg-white border border-stone-200 rounded-xl p-5 hover:border-[#C9A961]/40 hover:bg-white transition-all group cursor-pointer">
            <div class="text-stone-300 text-xs font-mono mb-2">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="font-bold text-sm group-hover:text-[#C9A961] transition-colors">{{ m.title }}</div>
            <div class="text-stone-400 text-xs mt-1">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-28 px-6 bg-[#111111]">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="text-xs text-[#C9A961] font-mono tracking-wider mb-4">[ 06 BOSHLANG ]</div>
            <h2 class="text-4xl md:text-5xl text-white font-bold tracking-tight mb-6">Bugundan <span class="text-[#C9A961] italic font-light font-serif-display">boshlang</span></h2>
            <p class="text-stone-400 text-lg max-w-md">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni professional darajada boshqaring.</p>
          </div>
          <div class="flex lg:justify-end">
            <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-[#C9A961] hover:bg-[#B8954A] text-[#111111] px-10 py-4 rounded-md text-sm font-bold transition-colors">Tizimga kirish →</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-16 px-6 border-t border-stone-100">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div class="col-span-2 md:col-span-1"><div class="flex items-center gap-2.5 mb-4"><div class="w-7 h-7 rounded-md bg-[#111111] flex items-center justify-center"><span class="text-[#C9A961] text-xs font-bold font-serif-display">M</span></div><span class="font-bold text-base">MAKON</span></div><p class="text-stone-400 text-sm">Koʻchmulk Boshqaruvi Tizimi</p></div>
          <div><div class="text-sm font-bold mb-4">Platforma</div><ul class="space-y-3 text-sm text-stone-400"><li><a href="#modules" class="hover:text-[#C9A961] transition-colors">Modullar</a></li><li><a href="#features" class="hover:text-[#C9A961] transition-colors">Imkoniyatlar</a></li></ul></div>
          <div><div class="text-sm font-bold mb-4">Kompaniya</div><ul class="space-y-3 text-sm text-stone-400"><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Haqimizda</a></li><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Aloqa</a></li></ul></div>
          <div><div class="text-sm font-bold mb-4">Maxfiylik</div><ul class="space-y-3 text-sm text-stone-400"><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Shartlar</a></li><li><a class="hover:text-[#C9A961] transition-colors cursor-pointer">Maxfiylik</a></li></ul></div>
          <div><div class="text-sm font-bold mb-4">Aloqa</div><ul class="space-y-3 text-sm text-stone-400"><li>info@makon.uz</li><li>+998 71 123 45 67</li><li>Toshkent, Oʻzbekiston</li></ul></div>
        </div>
        <div class="pt-8 border-t border-stone-100"><p class="text-stone-400 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</p></div>
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
  { num: '01', tag: 'Boshqaruv', title: 'Bino va maydon', building: 'Trillant Tower', desc: 'Binolar va turar joylarni boshqaring. Real-time bandlikni kuzating.', img: '/tashkent/trillant.jpg', bullets: ['Ijara narxlari', 'Bandlik monitoringi', 'Bino turlari', 'Hisobotlar'] },
  { num: '02', tag: 'Moliya', title: 'Shartnoma va toʻlov', building: 'Piramit Tower', desc: 'Shartnomalarni avtomatlashtiring. Invoys va toʻlovlarni boshqaring.', img: '/tashkent/piramit.jpg', bullets: ['Avtomatik shartnoma', 'Invoys tracking', 'Elektron imzo', 'Hisob davrlari'] },
  { num: '03', tag: 'Servis', title: 'Taʼmirlash va servis', building: 'IT Park · Ministry of Digital Technologies', desc: 'Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang.', img: '/tashkent/it-park.jpg', bullets: ['Soʻrov tracking', 'Brigade tayinlash', 'SLA monitoring', 'Sklad integratsiya'] },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
