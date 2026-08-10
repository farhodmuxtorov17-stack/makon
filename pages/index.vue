<template>
  <div class="min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">
    <!-- Nav -->
    <nav class="fixed top-0 inset-x-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center"><span class="text-white text-xs font-bold">M</span></div>
          <span class="font-bold text-sm tracking-tight">MAKON</span>
          <span class="text-white/30 text-xs ml-2">Product Preview</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/landing-scroll" class="text-white/40 hover:text-white transition-colors">B · Scroll</a>
          <a href="/landing-app" class="text-white/40 hover:text-white transition-colors">C · App</a>
          <NuxtLink to="/login" class="text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-md transition-colors text-sm">Kirish</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Hero: Split — left text, right DASHBOARD MOCKUP -->
    <section class="pt-20 min-h-screen flex items-center px-6">
      <div class="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Value prop -->
        <div>
          <div class="inline-flex items-center gap-2 text-xs text-white/40 mb-6 font-mono">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE DASHBOARD
          </div>
          <h1 class="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Koʻchmulk<br>boshqaruvi<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">qayta taʼriflangan</span>
          </h1>
          <p class="text-white/50 text-lg max-w-md mb-8 leading-relaxed">16+ modul. Real-time dashboard. Avtomatlashtirilgan shartnomalar. Bitta tizim — butun ekotizim uchun.</p>
          <div class="flex items-center gap-4">
            <NuxtLink to="/login" class="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-7 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">Boshlash</NuxtLink>
            <a href="#tour" class="text-white/60 hover:text-white text-sm flex items-center gap-2 transition-colors">Koʻrish ↓</a>
          </div>
          <div class="flex items-center gap-8 mt-12 pt-12 border-t border-white/5">
            <div><div class="text-3xl font-bold">16+</div><div class="text-white/30 text-xs mt-1">Modullar</div></div>
            <div><div class="text-3xl font-bold">₸8.2M</div><div class="text-white/30 text-xs mt-1">Oylik daromad</div></div>
            <div><div class="text-3xl font-bold">99.9%</div><div class="text-white/30 text-xs mt-1">Uptime</div></div>
          </div>
        </div>

        <!-- Right: Dashboard mockup -->
        <div class="relative">
          <div class="rounded-2xl bg-[#111113] border border-white/10 overflow-hidden shadow-2xl">
            <!-- Window bar -->
            <div class="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div class="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div class="w-3 h-3 rounded-full bg-green-500/60"></div>
              <span class="text-white/30 text-xs ml-3 font-mono">makon.uz/dashboard</span>
            </div>
            <!-- Dashboard content -->
            <div class="flex">
              <!-- Sidebar -->
              <div class="w-16 border-r border-white/5 py-4 flex flex-col items-center gap-4">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold">M</div>
                <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><span class="text-white/40 text-xs">▤</span></div>
                <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><span class="text-white/40 text-xs">▣</span></div>
                <div class="w-8 h-8 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center"><span class="text-[#8B5CF6] text-xs">◆</span></div>
                <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><span class="text-white/40 text-xs">⚙</span></div>
              </div>
              <!-- Main -->
              <div class="flex-1 p-5 space-y-4">
                <!-- Stats row -->
                <div class="grid grid-cols-3 gap-3">
                  <div class="bg-white/5 rounded-xl p-3">
                    <div class="text-white/30 text-xs mb-1">Daromad</div>
                    <div class="text-lg font-bold">₸8.2M</div>
                    <div class="text-emerald-400 text-xs">+12%</div>
                  </div>
                  <div class="bg-white/5 rounded-xl p-3">
                    <div class="text-white/30 text-xs mb-1">Bandlik</div>
                    <div class="text-lg font-bold">94%</div>
                    <div class="text-emerald-400 text-xs">+3%</div>
                  </div>
                  <div class="bg-white/5 rounded-xl p-3">
                    <div class="text-white/30 text-xs mb-1">Shartnoma</div>
                    <div class="text-lg font-bold">12</div>
                    <div class="text-white/40 text-xs">faol</div>
                  </div>
                </div>
                <!-- Chart mockup -->
                <div class="bg-white/5 rounded-xl p-4 h-40 relative overflow-hidden">
                  <div class="text-white/30 text-xs mb-3">Daromad dinamikasi</div>
                  <div class="flex items-end gap-2 h-24">
                    <div v-for="(h, i) in [40, 55, 35, 70, 50, 85, 65, 90]" :key="i" class="flex-1 rounded-t bg-gradient-to-t from-[#6366F1]/40 to-[#8B5CF6]/60" :style="{ height: h + '%' }"></div>
                  </div>
                </div>
                <!-- Table mockup -->
                <div class="bg-white/5 rounded-xl p-3 space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-white/30">Binolar</span>
                    <span class="text-white/30">Bandlik</span>
                  </div>
                  <div v-for="b in buildings" :key="b.name" class="flex items-center justify-between text-xs">
                    <span class="text-white/70">{{ b.name }}</span>
                    <div class="flex items-center gap-2">
                      <div class="w-20 h-1.5 rounded-full bg-white/10"><div class="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" :style="{ width: b.occ + '%' }"></div></div>
                      <span class="text-white/50 w-8 text-right">{{ b.occ }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Floating badge -->
          <div class="absolute -top-4 -right-4 bg-emerald-500/90 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            Real-time
          </div>
        </div>
      </div>
    </section>

    <!-- Feature tour: tabs that switch content -->
    <section id="tour" class="py-32 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Mahsulot ichida</h2>
          <p class="text-white/40 text-lg">Tablarni bosib koʻring</p>
        </div>

        <!-- Tab buttons -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button v-for="(tab, i) in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            :class="activeTab === tab.id ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white' : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'">
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab content -->
        <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[400px]">
          <div>
            <div class="text-xs text-[#8B5CF6] font-mono mb-4 uppercase tracking-wider">{{ activeFeature.num }} / {{ activeFeature.tag }}</div>
            <h3 class="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{{ activeFeature.title }}</h3>
            <p class="text-white/50 text-lg leading-relaxed mb-8 max-w-md">{{ activeFeature.desc }}</p>
            <ul class="space-y-3">
              <li v-for="b in activeFeature.bullets" :key="b" class="flex items-center gap-3 text-white/60">
                <span class="w-5 h-5 rounded-full bg-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                  <span class="text-[#8B5CF6] text-xs">✓</span>
                </span>
                {{ b }}
              </li>
            </ul>
          </div>
          <!-- Tab visual: mini UI mockup -->
          <div class="rounded-2xl bg-[#111113] border border-white/10 p-6">
            <div v-if="activeTab === 'buildings'" class="space-y-3">
              <div class="text-white/30 text-xs mb-2">BINOLAR / 60+ UNIT</div>
              <div v-for="b in buildings" :key="b.name" class="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div><div class="text-white/80 text-sm font-medium">{{ b.name }}</div><div class="text-white/30 text-xs">{{ b.type }}</div></div>
                <div class="text-right"><div class="text-white/60 text-sm">{{ b.occ }}%</div><div class="text-white/30 text-xs">bandlik</div></div>
              </div>
            </div>
            <div v-else-if="activeTab === 'contracts'" class="space-y-3">
              <div class="text-white/30 text-xs mb-2">SHARTNOMALAR / FAOL</div>
              <div v-for="c in contracts" :key="c.id" class="bg-white/5 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2"><span class="text-white/80 text-sm font-medium">{{ c.tenant }}</span><span :class="c.status === 'Faol' ? 'text-emerald-400' : 'text-yellow-400'" class="text-xs">{{ c.status }}</span></div>
                <div class="flex items-center justify-between text-xs text-white/40"><span>{{ c.unit }}</span><span>{{ c.rent }}</span></div>
              </div>
            </div>
            <div v-else-if="activeTab === 'finance'" class="space-y-4">
              <div class="text-white/30 text-xs mb-2">DAROMAD / OYLIK</div>
              <div class="bg-white/5 rounded-xl p-4">
                <div class="text-3xl font-bold mb-1">₸8,247,000</div>
                <div class="text-emerald-400 text-sm">+12% vs oʻtgan oy</div>
              </div>
              <div class="flex items-end gap-2 h-32">
                <div v-for="(h, i) in [40, 55, 35, 70, 50, 85, 65, 90, 75, 95, 80, 100]" :key="i" class="flex-1 rounded-t bg-gradient-to-t from-[#6366F1]/30 to-[#8B5CF6]/60" :style="{ height: h + '%' }"></div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-white/5 rounded-xl p-3"><div class="text-white/30 text-xs">Ijara</div><div class="text-lg font-bold">₸6.8M</div></div>
                <div class="bg-white/5 rounded-xl p-3"><div class="text-white/30 text-xs">Qoʻshimcha</div><div class="text-lg font-bold">₸1.4M</div></div>
              </div>
            </div>
            <div v-else-if="activeTab === 'service'" class="space-y-3">
              <div class="text-white/30 text-xs mb-2">SERVIS / SOʻROVLAR</div>
              <div v-for="s in serviceReqs" :key="s.id" class="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                <div><div class="text-white/80 text-sm">{{ s.issue }}</div><div class="text-white/30 text-xs">{{ s.unit }}</div></div>
                <span :class="s.priority === 'Yuqori' ? 'bg-red-500/20 text-red-400' : s.priority === 'Oʻrta' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white/50'" class="text-xs px-2 py-1 rounded-full">{{ s.priority }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modules: horizontal scroll strip -->
    <section class="py-32 border-t border-white/5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 mb-12">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight">16+ modul</h2>
      </div>
      <div class="overflow-x-auto pb-6 px-6">
        <div class="flex gap-4 min-w-max max-w-7xl mx-auto">
          <div v-for="(m, i) in modules" :key="m.title" class="w-56 bg-[#111113] border border-white/10 rounded-2xl p-6 hover:border-[#6366F1]/40 transition-colors group flex-shrink-0">
            <div class="text-[#8B5CF6] text-xs font-mono mb-3">{{ String(i+1).padStart(2,'0') }}</div>
            <div class="text-white font-medium mb-1 group-hover:text-[#8B5CF6] transition-colors">{{ m.title }}</div>
            <div class="text-white/30 text-xs">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-32 px-6 border-t border-white/5">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">Bugundan <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">boshlang</span></h2>
        <p class="text-white/40 text-lg mb-10 max-w-md mx-auto">MAKON platformasida roʻyxatdan oʻting.</p>
        <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-10 py-4 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Tizimga kirish →</NuxtLink>
      </div>
    </section>

    <footer class="py-12 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-white/30 text-sm">© 2026 MAKON · Koʻchmulk Boshqaruvi Tizimi · Toshkent</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const activeTab = ref('buildings')
const tabs = [
  { id: 'buildings', label: 'Binolar', num: '01', tag: 'Boshqaruv', title: 'Bino va maydon', desc: 'Binolar, ofislar va turar joylarni boshqaring. Real-time bandlikni kuzating.', bullets: ['Maydon va zonalar boʻyicha ijara narxlari', 'Real-time bandlik monitoringi', 'Bino turlari: ofis, turar joy, savdo', 'Bino boʻyicha toʻliq hisobotlar'] },
  { id: 'contracts', label: 'Shartnomalar', num: '02', tag: 'Moliya', title: 'Shartnoma va toʻlov', desc: 'Shartnomalarni avtomatlashtiring. Invoyslar va toʻlovlarni boshqaring.', bullets: ['Avtomatik shartnoma yaratish', 'Invoys va toʻlov tracking', 'ERI orqali elektron imzo', 'Hisob davrlari va tasdiqlash'] },
  { id: 'finance', label: 'Moliya', num: '03', tag: 'Daromad', title: 'Moliyaviy dashboard', desc: 'Daromad, xarajat va foyda koeffitsientlarini real-time kuzating.', bullets: ['Oylik / yillik daromad', 'Xarajat tahlili', 'Foyda marjasi', 'Soliq hisobotlari'] },
  { id: 'service', label: 'Servis', num: '04', tag: 'Texnik xizmat', title: 'Taʼmirlash va servis', desc: 'Texnik xizmat soʻrovlarini tracking qiling. Brigade tayinlang.', bullets: ['Soʻrov yaratish va tracking', 'Brigade tayinlash va SLA', 'Statuslar va monitoring', 'Sklad bilan integratsiya'] },
]
const activeFeature = computed(() => tabs.find(t => t.id === activeTab.value)!)
const buildings = [
  { name: 'Tashkent City', type: 'Ofis', occ: 96 },
  { name: 'Trillant Tower', type: 'Turar joy', occ: 92 },
  { name: 'Piramit Tower', type: 'Ofis', occ: 88 },
  { name: 'IT Park', type: 'Ofis', occ: 99 },
]
const contracts = [
  { id: 1, tenant: 'LLC TechnoHub', unit: 'TC-401', rent: '₸4,200,000', status: 'Faol' },
  { id: 2, tenant: 'JSC UzDigital', unit: 'TT-12-B', rent: '₸2,800,000', status: 'Faol' },
  { id: 3, tenant: 'IT Plus LLC', unit: 'IP-205', rent: '₸1,500,000', status: 'Muddat' },
]
const serviceReqs = [
  { id: 1, issue: 'Konditsioner taʼmiri', unit: 'TC-401', priority: 'Yuqori' },
  { id: 2, issue: 'Elektr almashtirish', unit: 'TT-12-B', priority: 'Oʻrta' },
  { id: 3, issue: 'Sanuzel plombasi', unit: 'IP-205', priority: 'Past' },
]
const modules = [
  { title: 'Ishchi panel', desc: 'Dashboard' }, { title: 'Binolar', desc: 'Boshqaruv' }, { title: 'Listinglar', desc: 'Katalog' }, { title: 'Arizalar', desc: 'Soʻrovlar' }, { title: 'Shartnomalar', desc: 'Moliya' }, { title: 'Invoyslar', desc: 'Hisob-faktura' }, { title: 'Toʻlovlar', desc: 'Tranzaksiya' }, { title: 'Tasdiqlar', desc: 'Workflow' }, { title: 'Hisob davrlari', desc: 'Periodlar' }, { title: 'Servis', desc: 'Texnik xizmat' }, { title: 'Sklad', desc: 'Ombor' }, { title: 'Taʼminotchilar', desc: 'Suppliers' }, { title: 'Hisobotlar', desc: 'Statistika' }, { title: 'Foydalanuvchilar', desc: 'Admin' }, { title: 'Sozlamalar', desc: 'Tizim' }, { title: 'Monitoring', desc: 'Tizim' },
]
</script>
