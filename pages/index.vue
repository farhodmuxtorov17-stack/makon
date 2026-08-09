<template>
  <div class="min-h-screen bg-ink-50">
    <!-- ═══ Nav ═══ -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <div>
            <div class="font-display font-bold text-white text-base leading-none">MAKON</div>
            <div class="text-[9px] text-white/40 font-medium tracking-widest uppercase mt-0.5">Real Estate</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" class="text-white/60 hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#modules" class="text-white/60 hover:text-white transition-colors">Modullar</a>
          <a href="#platform" class="text-white/60 hover:text-white transition-colors">Platforma</a>
        </div>
        <NuxtLink to="/login" class="btn btn-primary btn-sm">Tizimga kirish</NuxtLink>
      </div>
    </nav>

    <!-- ═══ Hero ═══ -->
    <section class="mesh-gradient noise-overlay min-h-screen flex items-center pt-16 relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-dark opacity-30"></div>
      <!-- Glow orbs -->
      <div class="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[140px]"></div>
      <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-800/10 rounded-full blur-[100px]"></div>

      <div class="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: text -->
          <div class="animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span class="text-white/50 text-xs font-medium tracking-wide">Enterprise · v2.0 · 2026</span>
            </div>
            <h1 class="font-display text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
              Koʻchmulkingizni<br>
              <span class="text-gradient-dark">bir joydan</span> boshqaring
            </h1>
            <p class="text-white/40 text-lg leading-relaxed mb-8 max-w-lg">
              Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar —
              zamonaviy platformada barchasi birlashtirilgan.
            </p>
            <div class="flex flex-wrap items-center gap-4">
              <NuxtLink to="/login" class="btn btn-primary btn-lg">
                Boshlash
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </NuxtLink>
              <a href="#features" class="btn btn-outline btn-lg !bg-white/5 !border-white/10 !text-white hover:!bg-white/10">
                Imkoniyatlar
              </a>
            </div>

            <!-- Stats -->
            <div class="flex items-center gap-8 mt-12 pt-8 border-t border-white/5">
              <div>
                <div class="font-display text-2xl font-bold text-white">5</div>
                <div class="text-white/30 text-xs">Bino</div>
              </div>
              <div class="w-px h-10 bg-white/5"></div>
              <div>
                <div class="font-display text-2xl font-bold text-white">60+</div>
                <div class="text-white/30 text-xs">Unit</div>
              </div>
              <div class="w-px h-10 bg-white/5"></div>
              <div>
                <div class="font-display text-2xl font-bold text-white">12</div>
                <div class="text-white/30 text-xs">Shartnoma</div>
              </div>
              <div class="w-px h-10 bg-white/5"></div>
              <div>
                <div class="font-display text-2xl font-bold text-white">99.9%</div>
                <div class="text-white/30 text-xs">Uptime</div>
              </div>
            </div>
          </div>

          <!-- Right: UI preview card -->
          <div class="hidden lg:block animate-fade-in-up delay-200">
            <div class="relative">
              <!-- Glow behind -->
              <div class="absolute inset-0 bg-brand-600/20 blur-[80px] rounded-3xl"></div>

              <!-- Dashboard preview -->
              <div class="relative glass-dark rounded-3xl p-5 border border-white/10 overflow-hidden">
                <!-- Top bar -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-2">
                    <div class="flex gap-1.5">
                      <div class="w-2.5 h-2.5 rounded-full bg-rose-500/60"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-gold-500/60"></div>
                      <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></div>
                    </div>
                  </div>
                  <div class="text-white/30 text-xs font-medium">admin.makon.uz</div>
                </div>

                <!-- Content -->
                <div class="grid grid-cols-3 gap-3 mb-4">
                  <div v-for="(stat, i) in heroStats" :key="i" class="bg-white/5 rounded-xl p-3 border border-white/5">
                    <div class="flex items-center gap-2 mb-2">
                      <div class="w-7 h-7 rounded-lg flex items-center justify-center" :class="stat.bg">
                        <component :is="stat.icon" />
                      </div>
                    </div>
                    <div class="text-white text-lg font-bold font-display">{{ stat.value }}</div>
                    <div class="text-white/30 text-[10px]">{{ stat.label }}</div>
                  </div>
                </div>

                <!-- Chart -->
                <div class="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                  <div class="flex items-center justify-between mb-3">
                    <div class="text-white/60 text-xs font-semibold">Daromad dinamikasi</div>
                    <div class="text-emerald-400 text-xs font-semibold">+12.5% ↑</div>
                  </div>
                  <div class="flex items-end gap-2 h-24">
                    <div v-for="(h, i) in chartHeights" :key="i" class="flex-1 bg-gradient-to-t from-brand-600/40 to-brand-400/80 rounded-t-md transition-all" :style="{ height: h + '%' }"></div>
                  </div>
                </div>

                <!-- Table preview -->
                <div class="space-y-2">
                  <div v-for="i in 3" :key="i" class="flex items-center gap-3 bg-white/5 rounded-lg p-2.5">
                    <div class="w-8 h-8 rounded-lg bg-white/10"></div>
                    <div class="flex-1">
                      <div class="h-2 w-24 bg-white/10 rounded-full mb-1.5"></div>
                      <div class="h-1.5 w-16 bg-white/5 rounded-full"></div>
                    </div>
                    <div class="h-5 w-12 rounded" :class="i % 2 === 0 ? 'bg-emerald-500/20' : 'bg-gold-500/20'"></div>
                  </div>
                </div>
              </div>

              <!-- Floating mini cards -->
              <div class="absolute -top-6 -right-6 glass-dark rounded-2xl p-3 border border-white/10 animate-float">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path d="M23 6l-9.5 9.5-5-5L1 18" /></svg>
                  </div>
                  <div>
                    <div class="text-white text-xs font-semibold">To'lov qabul</div>
                    <div class="text-white/30 text-[10px]">₸ 2.4M</div>
                  </div>
                </div>
              </div>
              <div class="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-3 border border-white/10 animate-float" style="animation-delay: 1s">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>
                  </div>
                  <div>
                    <div class="text-white text-xs font-semibold">Yangi ariza</div>
                    <div class="text-white/30 text-[10px]">5 daqiqa oldin</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Features ═══ -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="badge badge-info mb-4 px-3 py-1.5">Imkoniyatlar</div>
          <h2 class="font-display text-4xl font-bold text-ink-900 mb-3">Barchasi bitta tizimda</h2>
          <p class="text-ink-500 text-lg max-w-2xl mx-auto">MAKON — bu koʻchmulk boshqaruvining to'liq ekotizimi. Alohida dasturlarsiz, bitta platformada.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="(feature, i) in features" :key="i" class="card-hover p-6 group">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" :class="feature.bg">
              <component :is="feature.icon" />
            </div>
            <h3 class="font-display text-lg font-semibold text-ink-900 mb-2">{{ feature.title }}</h3>
            <p class="text-ink-500 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Modules ═══ -->
    <section id="modules" class="py-24 bg-ink-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <div class="badge badge-neutral mb-4 px-3 py-1.5">Modullar</div>
          <h2 class="font-display text-4xl font-bold text-ink-900 mb-3">18+ modul, bitta tizim</h2>
          <p class="text-ink-500 text-lg max-w-2xl mx-auto">Har bir rol uchun maxsus imkoniyatlar va interfeyslar</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="(mod, i) in modules" :key="i" class="bg-white rounded-2xl border border-ink-200/60 p-5 hover:shadow-card-hover hover:border-ink-300/60 transition-all duration-300 group cursor-pointer">
            <div class="w-10 h-10 rounded-xl bg-ink-50 group-hover:bg-brand-50 flex items-center justify-center mb-4 transition-colors">
              <component :is="mod.icon" />
            </div>
            <div class="font-display font-semibold text-ink-900 text-sm mb-1">{{ mod.title }}</div>
            <div class="text-ink-400 text-xs">{{ mod.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Platform ═══ -->
    <section id="platform" class="py-24 bg-ink-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-grid-dark opacity-20"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600/10 rounded-full blur-[120px]"></div>

      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
              <span class="text-white/50 text-xs font-medium tracking-wide">Koʻp platformali</span>
            </div>
            <h2 class="font-display text-4xl font-bold text-white mb-4">Har qurilmada — bir xil tajriba</h2>
            <p class="text-white/40 text-lg mb-8 max-w-lg">Telegram Mini-App orqali 30 soniyada kirish, iPhone va Android'da mahalliy ilova, kompyuterda to'liq veb-panel.</p>
            <div class="space-y-4">
              <div v-for="(p, i) in platforms" :key="i" class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <component :is="p.icon" />
                </div>
                <div>
                  <div class="text-white font-semibold text-sm">{{ p.title }}</div>
                  <div class="text-white/30 text-xs">{{ p.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Device showcase -->
          <div class="relative flex items-center justify-center scale-90">
            <div class="relative" style="transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="py-24 bg-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="font-display text-4xl font-bold text-ink-900 mb-4">Bugundan boshlang</h2>
        <p class="text-ink-500 text-lg mb-8 max-w-xl mx-auto">MAKON platformasida 30 soniyada roʻyxatdan oʻting va koʻchmulingizni boshqarishni boshlang.</p>
        <NuxtLink to="/login" class="btn btn-primary btn-lg">
          Tizimga kirish
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </NuxtLink>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="bg-ink-950 py-12">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
            </div>
            <div class="text-white font-display font-bold">MAKON</div>
          </div>
          <div class="text-white/30 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })

const chartHeights = [40, 55, 35, 70, 60, 85, 95, 50, 65, 80, 45, 90]

const heroStats = [
  { value: '₸8.2M', label: 'Daromad', bg: 'bg-emerald-500/15', icon: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: '#34d399', 'stroke-width': 2.5 }, [h('path', { d: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' })]) },
  { value: '94%', label: 'Toʻliq band', bg: 'bg-brand-500/15', icon: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: '#818cf8', 'stroke-width': 2.5 }, [h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }), h('path', { d: 'M3 12h18' })]) },
  { value: '12', label: 'Shartnoma', bg: 'bg-gold-500/15', icon: () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: '#facc15', 'stroke-width': 2.5 }, [h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }), h('path', { d: 'M14 2v6h6' })]) },
]

const features = [
  { title: 'Bino boshqaruvi', desc: 'Binolar, podvalar, ofislar va turar joylarni bitta joydan boshqaring.', bg: 'bg-brand-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M3 21h18M5 21V5l7-3v19M19 21V9l-7-3' })]) },
  { title: 'Ijara va shartnomalar', desc: 'Shartnomalarni avtomatlashtiring — yangilash, bekor qilish, uzaytirish.', bg: 'bg-emerald-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#059669', 'stroke-width': 2 }, [h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }), h('path', { d: 'M14 2v6h6M16 13H8M16 17H8M10 9H8' })]) },
  { title: 'Moliya va invoyslar', desc: 'Invoyslar, toʻlovlar va hisobotlar — avtomatik generatsiya.', bg: 'bg-gold-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#ca8a04', 'stroke-width': 2 }, [h('rect', { x: 2, y: 5, width: 20, height: 14, rx: 2 }), h('line', { x1: 2, y1: 10, x2: 22, y2: 10 })]) },
  { title: 'Servis va soʻrovlar', desc: 'Texnik xizmat soʻrovlarini boshqaring va tracking qiling.', bg: 'bg-sky-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#0284c7', 'stroke-width': 2 }, [h('path', { d: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' })]) },
  { title: 'Hisobotlar va analitika', desc: 'Real-time dashboardlar va custom hisobotlar.', bg: 'bg-rose-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#e11d48', 'stroke-width': 2 }, [h('line', { x1: 18, y1: 20, x2: 18, y2: 10 }), h('line', { x1: 12, y1: 20, x2: 12, y2: 4 }), h('line', { x1: 6, y1: 20, x2: 6, y2: 14 })]) },
  { title: 'ERI integratsiyasi', desc: 'Elektron raqamli imzo orqali xavfsiz kirish va tasdiqlash.', bg: 'bg-brand-50', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M9 12l2 2 4-4' }), h('path', { d: 'M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z' })]) },
]

const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }), h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }), h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }), h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 })]) },
  { title: 'Binolar', desc: 'Boshqaruv', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M3 21h18M5 21V5l7-3v19M19 21V9l-7-3' })]) },
  { title: 'Listinglar', desc: 'Katalog', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M4 4h16v16H4z' }), h('path', { d: 'M4 4l8 8 8-8' })]) },
  { title: 'Arizalar', desc: 'Soʻrovlar', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M9 11l3 3L22 4' }), h('path', { d: 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' })]) },
  { title: 'Shartnomalar', desc: 'Moliya', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }), h('path', { d: 'M14 2v6h6' })]) },
  { title: 'Invoyslar', desc: 'Hisob-faktura', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('rect', { x: 2, y: 5, width: 20, height: 14, rx: 2 }), h('line', { x1: 2, y1: 10, x2: 22, y2: 10 })]) },
  { title: 'Toʻlovlar', desc: 'Tranzaksiya', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('rect', { x: 1, y: 4, width: 22, height: 16, rx: 2 }), h('line', { x1: 1, y1: 10, x2: 23, y2: 10 })]) },
  { title: 'Tasdiqlar', desc: 'Workflow', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M9 11l3 3L22 4' }), h('path', { d: 'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' })]) },
  { title: 'Hisob davrlari', desc: 'Periodlar', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }), h('line', { x1: 16, y1: 2, x2: 16, y2: 6 }), h('line', { x1: 8, y1: 2, x2: 8, y2: 6 }), h('line', { x1: 3, y1: 10, x2: 21, y2: 10 })]) },
  { title: 'Soʻrovlar', desc: 'Servis', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z' })]) },
  { title: 'Sklad', desc: 'Ombor', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' }), h('polyline', { points: '9 22 9 12 15 12 15 22' })]) },
  { title: 'Taʼminotchilar', desc: 'Suppliers', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('rect', { x: 1, y: 3, width: 15, height: 13, rx: 1 }), h('polygon', { points: '16 8 20 8 23 11 23 16 16 16 16 8' }), h('circle', { cx: 5.5, cy: 18.5, r: 2.5 }), h('circle', { cx: 18.5, cy: 18.5, r: 2.5 })]) },
  { title: 'Hisobotlar', desc: 'Statistika', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('line', { x1: 18, y1: 20, x2: 18, y2: 10 }), h('line', { x1: 12, y1: 20, x2: 12, y2: 4 }), h('line', { x1: 6, y1: 20, x2: 6, y2: 14 })]) },
  { title: 'Foydalanuvchilar', desc: 'Admin', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }), h('circle', { cx: 9, cy: 7, r: 4 }), h('path', { d: 'M23 21v-2a4 4 0 00-3-3.87' }), h('path', { d: 'M16 3.13a4 4 0 010 7.75' })]) },
  { title: 'Sozlamalar', desc: 'Tizim', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('circle', { cx: 12, cy: 12, r: 3 }), h('path', { d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' })]) },
  { title: 'Monitoring', desc: 'Tizim', icon: () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#4f46e5', 'stroke-width': 2 }, [h('path', { d: 'M22 12h-4l-3 9L9 3l-3 9H2' })]) },
]

const platforms = [
  { title: 'Telegram Mini-App', desc: '30 soniyada kirish, bot orqali bildirishnomalar', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: '#229ED9' }, [h('path', { d: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.164.164-.302.302-.617.302l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z' })]) },
  { title: 'Veb-panel', desc: 'Toʻliq funksional boshqaruv paneli', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#a1a1aa', 'stroke-width': 2 }, [h('rect', { x: 2, y: 3, width: 20, height: 14, rx: 2 }), h('line', { x1: 8, y1: 21, x2: 16, y2: 21 }), h('line', { x1: 12, y1: 17, x2: 12, y2: 21 })]) },
  { title: 'Mobil ilova', desc: 'iOS va Android uchun mahalliy ilova', icon: () => h('svg', { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#a1a1aa', 'stroke-width': 2 }, [h('rect', { x: 5, y: 2, width: 14, height: 20, rx: 2 }), h('line', { x1: 12, y1: 18, x2: 12, y2: 18 })]) },
]
</script>
