<template>
  <div class="min-h-screen bg-[#0F0D0A] text-white overflow-x-hidden">
    <nav class="fixed top-0 inset-x-0 z-50 bg-transparent">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg border border-[#C9A961]/40 flex items-center justify-center"><span class="text-[#C9A961] text-xs font-bold">M</span></div>
          <span class="font-serif-display text-sm tracking-tight">MAKON</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/" class="text-white/40 hover:text-white transition-colors">A · Product</a>
          <span class="text-[#C9A961]">B · Scroll</span>
          <a href="/landing-app" class="text-white/40 hover:text-white transition-colors">C · App</a>
          <NuxtLink to="/login" class="text-[#0F0D0A] bg-[#C9A961] hover:bg-[#B8954A] px-4 py-1.5 rounded-md transition-colors text-sm font-medium">Kirish</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Scroll dots -->
    <div class="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      <button v-for="(s, i) in screens" :key="i" @click="scrollTo(i)" class="w-2 h-2 rounded-full transition-all" :class="activeScreen === i ? 'bg-[#C9A961] scale-150' : 'bg-white/20 hover:bg-white/40'" />
    </div>

    <!-- Screen 1: Full-bleed Tashkent City -->
    <section ref="screens" class="h-screen min-h-[700px] relative flex items-end overflow-hidden snap-start">
      <img src="/tashkent/tashkent-city.jpg" alt="Tashkent City" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0F0D0A] via-[#0F0D0A]/40 to-[#0F0D0A]/10"></div>
      <div class="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
        <p class="text-[#C9A961] text-xs font-medium mb-4 tracking-[0.2em] uppercase">Tashkent City · Toshkent</p>
        <h1 class="font-serif-display text-6xl md:text-9xl leading-[0.9] font-light mb-6">Mulkingizni<br><span class="italic text-[#C9A961]">qadrini</span> biling</h1>
        <p class="text-white/60 text-xl max-w-xl mb-10 font-light">Zamonaviy koʻchmulk boshqaruvi — bitta platformada.</p>
        <div class="flex gap-4">
          <NuxtLink to="/login" class="bg-[#C9A961] hover:bg-[#B8954A] text-[#0F0D0A] px-8 py-3.5 rounded-full text-sm font-medium transition-colors">Boshlash</NuxtLink>
          <button @click="scrollTo(1)" class="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors">Pastga ↓</button>
        </div>
      </div>
    </section>

    <!-- Screen 2: Statement — full solid color, BIG typography -->
    <section class="h-screen min-h-[700px] flex items-center justify-center px-6 snap-start" style="background: #1A1510;">
      <div class="text-center max-w-4xl">
        <p class="font-serif-display text-4xl md:text-7xl leading-[1.2] font-light mb-16">
          16+ modul, real-time dashboard va avtomatlashtirilgan jarayonlar.
          <span class="italic text-[#C9A961]">Batta tizim</span> — butun koʻchmulk ekotizimi uchun.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/10">
          <div v-for="s in stats" :key="s.label">
            <div class="font-serif-display text-6xl text-[#C9A961] font-light">{{ s.value }}</div>
            <div class="text-white/40 text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Screen 3: Split — Piramit photo + Feature 1 -->
    <section class="h-screen min-h-[700px] grid lg:grid-cols-2 snap-start">
      <div class="relative">
        <img src="/tashkent/piramit.jpg" alt="Piramit Tower" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute bottom-4 left-4"><span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Piramit Tower</span></div>
      </div>
      <div class="flex flex-col justify-center px-8 md:px-20" style="background: #0F0D0A;">
        <span class="text-[#C9A961] text-xs font-medium tracking-[0.2em] uppercase mb-5">01 — Boshqaruv</span>
        <h2 class="font-serif-display text-5xl md:text-6xl font-light mb-6 leading-tight">Bino va<br>maydon</h2>
        <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md font-light">Binolar, ofislar va turar joylarni boshqaring. Maydon, zonalar, ijara narxlari va bandlikni real-time kuzating.</p>
        <ul class="space-y-3">
          <li v-for="b in f1" :key="b" class="flex items-center gap-3 text-white/60"><span class="w-1 h-1 rounded-full bg-[#C9A961]"></span><span class="text-sm">{{ b }}</span></li>
        </ul>
      </div>
    </section>

    <!-- Screen 4: Split reversed — Trillant + Feature 2 -->
    <section class="h-screen min-h-[700px] grid lg:grid-cols-2 snap-start">
      <div class="flex flex-col justify-center px-8 md:px-20 order-2 lg:order-1" style="background: #1A1510;">
        <span class="text-[#C9A961] text-xs font-medium tracking-[0.2em] uppercase mb-5">02 — Moliya</span>
        <h2 class="font-serif-display text-5xl md:text-6xl font-light mb-6 leading-tight">Shartnoma<br>va toʻlov</h2>
        <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md font-light">Shartnomalarni avtomatlashtiring — yaratishdan to bekor qilishgacha. Invoyslar, toʻlovlar va hisob davrlarini boshqaring.</p>
        <ul class="space-y-3">
          <li v-for="b in f2" :key="b" class="flex items-center gap-3 text-white/60"><span class="w-1 h-1 rounded-full bg-[#C9A961]"></span><span class="text-sm">{{ b }}</span></li>
        </ul>
      </div>
      <div class="relative order-1 lg:order-2">
        <img src="/tashkent/trillant.jpg" alt="Trillant Tower" class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute bottom-4 left-4"><span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">Trillant Tower</span></div>
      </div>
    </section>

    <!-- Screen 5: IT Park full-bleed + Feature 3 overlay -->
    <section class="h-screen min-h-[700px] relative flex items-center justify-center snap-start overflow-hidden">
      <img src="/tashkent/it-park.jpg" alt="IT Park" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-[#0F0D0A]/80 via-[#0F0D0A]/60 to-[#0F0D0A]/80"></div>
      <div class="relative z-10 text-center max-w-2xl px-6">
        <div class="absolute bottom-4 left-4"><span class="text-white/80 text-xs font-mono bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">IT Park · Ministry of Digital Technologies</span></div>
        <span class="text-[#C9A961] text-xs font-medium tracking-[0.2em] uppercase mb-5 block">03 — Servis</span>
        <h2 class="font-serif-display text-5xl md:text-6xl font-light mb-6 leading-tight">Taʼmirlash<br>va servis</h2>
        <p class="text-white/60 text-lg leading-relaxed mb-8 max-w-lg mx-auto font-light">Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang, statuslarni kuzating, sifatni nazorat qiling.</p>
        <ul class="flex flex-wrap justify-center gap-3">
          <li v-for="b in f3" :key="b" class="text-white/60 text-sm bg-white/5 px-4 py-2 rounded-full">{{ b }}</li>
        </ul>
      </div>
    </section>

    <!-- Screen 6: Skyline stats -->
    <section class="h-screen min-h-[700px] relative flex items-center justify-center snap-start overflow-hidden">
      <img src="/tashkent/skyline-dusk.jpg" alt="Tashkent skyline" class="absolute inset-0 w-full h-full object-cover" />
      <div class="absolute inset-0 bg-[#0F0D0A]/85"></div>
      <div class="relative z-10 text-center max-w-5xl px-6">
        <h2 class="font-serif-display text-4xl md:text-5xl font-light mb-16 leading-tight">Oʻzbekistondagi yetakchi<br><span class="italic text-[#C9A961]">koʻchmulk boshqaruvchilari</span><br>MAKON tanlaydi</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="s in bigStats" :key="s.label">
            <div class="font-serif-display text-6xl text-[#C9A961] font-light">{{ s.value }}</div>
            <div class="text-white/40 text-sm mt-2">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Screen 7: Modules horizontal scroll -->
    <section class="h-screen min-h-[700px] flex flex-col justify-center px-6 snap-start" style="background: #1A1510;">
      <div class="max-w-7xl mx-auto w-full">
        <h2 class="font-serif-display text-4xl md:text-5xl font-light mb-12">16+ modul — <span class="italic text-[#C9A961]">batta tizim</span></h2>
        <div class="overflow-x-auto pb-6">
          <div class="flex gap-3 min-w-max">
            <div v-for="(m, i) in modules" :key="m.title" class="w-52 border border-white/10 rounded-2xl p-5 hover:border-[#C9A961]/30 transition-colors group flex-shrink-0">
              <div class="text-[#C9A961]/40 text-xs font-mono mb-3">{{ String(i+1).padStart(2,'0') }}</div>
              <div class="text-white/90 font-light group-hover:text-[#C9A961] transition-colors">{{ m.title }}</div>
              <div class="text-white/30 text-xs mt-1">{{ m.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Screen 8: CTA -->
    <section class="h-screen min-h-[700px] flex items-center justify-center px-6 snap-start relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-[120px]"></div>
      <div class="relative z-10 text-center max-w-2xl">
        <h2 class="font-serif-display text-6xl md:text-8xl font-light mb-8">Bugundan<br><span class="italic text-[#C9A961]">boshlang</span></h2>
        <p class="text-white/40 text-lg mb-10 font-light max-w-lg mx-auto">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-[#C9A961] hover:bg-[#B8954A] text-[#0F0D0A] px-10 py-4 rounded-full text-sm font-medium transition-colors">Tizimga kirish →</NuxtLink>
        <p class="text-white/20 text-xs mt-16">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi · Toshkent</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const activeScreen = ref(0)
const screens = ref<HTMLElement[]>([])
const stats = [{ value: '16+', label: 'Modullar' }, { value: '60+', label: 'Unit' }, { value: '48', label: 'Ijarachilar' }, { value: '99.9%', label: 'Uptime' }]
const bigStats = [{ value: '₸8.2M', label: 'Oylik daromad' }, { value: '94%', label: 'Oʻrtacha bandlik' }, { value: '48', label: 'Faol ijarachilar' }, { value: '12', label: 'Faol shartnomalar' }]
const f1 = ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar']
const f2 = ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash']
const f3 = ['Soʻrov yaratish va tracking', 'Brigade tayinlash va SLA', 'Statuslar va monitoring', 'Sklad bilan integratsiya']
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
onMounted(() => {
  screens.value = Array.from(document.querySelectorAll('section[snap-start]'))
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2
    for (let i = 0; i < screens.value.length; i++) {
      const el = screens.value[i]
      if (el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
        activeScreen.value = i
        break
      }
    }
  })
})
const scrollTo = (i: number) => {
  screens.value[i]?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style>
section[snap-start] { scroll-snap-align: start; }
html { scroll-snap-type: y mandatory; scroll-behavior: smooth; }
</style>
