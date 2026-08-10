<template>
  <div class="min-h-screen bg-[#FAFAFA] text-[#111] flex flex-col">
    <!-- Top bar — looks like app chrome -->
    <header class="sticky top-0 z-50 bg-white border-b border-stone-200 h-14 flex items-center px-6">
      <div class="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center"><span class="text-[#C9A961] text-xs font-bold">M</span></div>
          <span class="font-bold text-sm">MAKON</span>
          <span class="text-stone-300 text-xs ml-2 hidden md:inline">/ Koʻchmulk boshqaruvi tizimi</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm">
          <a href="/" class="text-stone-400 hover:text-[#111] transition-colors">A · Product</a>
          <a href="/landing-scroll" class="text-stone-400 hover:text-[#111] transition-colors">B · Scroll</a>
          <span class="text-[#C9A961] font-medium">C · App Preview</span>
        </div>
        <NuxtLink to="/login" class="text-sm text-white bg-[#111] hover:bg-[#333] px-4 py-1.5 rounded-md transition-colors font-medium">Kirish</NuxtLink>
      </div>
    </header>

    <!-- App layout: sidebar + content -->
    <div class="flex flex-1 max-w-7xl mx-auto w-full">
      <!-- Sidebar — the actual app sidebar -->
      <aside class="w-14 md:w-60 border-r border-stone-200 bg-white flex-shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto hidden md:block">
        <div class="p-4">
          <div class="text-stone-400 text-xs font-medium uppercase tracking-wider mb-3 hidden md:block">Asosiy</div>
          <nav class="space-y-1">
            <a v-for="(item, i) in sidebarItems" :key="item.label"
               href="#" @click.prevent="activeModule = item.label"
               class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
               :class="activeModule === item.label ? 'bg-[#111] text-white' : 'text-stone-500 hover:bg-stone-100'">
              <span class="text-xs w-5 text-center" :class="activeModule === item.label ? 'text-[#C9A961]' : 'text-stone-400'">{{ item.icon }}</span>
              <span class="hidden md:inline">{{ item.label }}</span>
            </a>
          </nav>
          <div class="mt-8 pt-8 border-t border-stone-100 hidden md:block">
            <div class="bg-stone-50 rounded-xl p-4">
              <div class="text-stone-400 text-xs mb-2">Demo rejim</div>
              <p class="text-stone-600 text-xs mb-3">Tizim toʻliq imkoniyatlar bilan tanishing</p>
              <NuxtLink to="/login" class="text-[#C9A961] text-xs font-medium hover:underline">Kirish →</NuxtLink>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content — changes based on sidebar selection -->
      <main class="flex-1 overflow-y-auto">
        <!-- Dashboard view -->
        <div v-if="activeModule === 'Ishchi panel'" class="p-6 md:p-8">
          <!-- Hero header -->
          <div class="mb-8">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight mb-2">Koʻchmulk boshqaruvi <span class="text-[#C9A961] italic font-light font-serif-display">qayta taʼriflangan</span></h1>
            <p class="text-stone-500 text-lg max-w-2xl">16+ modul, real-time dashboard va avtomatlashtirilgan jarayonlar. Bitta tizim — butun koʻchmulk ekotizimi uchun.</p>
          </div>

          <!-- Stats grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div v-for="s in stats" :key="s.label" class="bg-white border border-stone-200 rounded-xl p-5">
              <div class="text-3xl font-bold mb-1">{{ s.value }}</div>
              <div class="text-stone-400 text-sm">{{ s.label }}</div>
            </div>
          </div>

          <!-- Two columns: chart + buildings -->
          <div class="grid lg:grid-cols-2 gap-4 mb-8">
            <!-- Revenue chart -->
            <div class="bg-white border border-stone-200 rounded-xl p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="font-bold text-sm">Daromad dinamikasi</h3>
                <span class="text-emerald-500 text-xs bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
              </div>
              <div class="flex items-end gap-2 h-40">
                <div v-for="(h, i) in [40, 55, 35, 70, 50, 85, 65, 90, 75, 95, 80, 100]" :key="i" class="flex-1 rounded-t bg-gradient-to-t from-stone-200 to-[#C9A961]" :style="{ height: h + '%' }"></div>
              </div>
              <div class="flex justify-between text-xs text-stone-400 mt-3">
                <span>Yan</span><span>Fev</span><span>Mar</span><span>Apr</span><span>May</span><span>Iyn</span>
              </div>
            </div>
            <!-- Buildings occupancy -->
            <div class="bg-white border border-stone-200 rounded-xl p-6">
              <h3 class="font-bold text-sm mb-6">Bino bandligi</h3>
              <div class="space-y-4">
                <div v-for="b in buildings" :key="b.name" class="flex items-center justify-between">
                  <span class="text-sm text-stone-600 w-28">{{ b.name }}</span>
                  <div class="flex-1 mx-3 h-2 rounded-full bg-stone-100"><div class="h-full rounded-full bg-gradient-to-r from-[#C9A961] to-[#B8954A]" :style="{ width: b.occ + '%' }"></div></div>
                  <span class="text-sm font-medium w-8 text-right">{{ b.occ }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent contracts table -->
          <div class="bg-white border border-stone-200 rounded-xl overflow-hidden mb-8">
            <div class="px-6 py-4 border-b border-stone-100"><h3 class="font-bold text-sm">Soʻnggi shartnomalar</h3></div>
            <table class="w-full">
              <thead>
                <tr class="bg-stone-50 text-xs text-stone-400">
                  <th class="text-left px-6 py-3 font-medium">Ijarachi</th>
                  <th class="text-left px-6 py-3 font-medium">Unit</th>
                  <th class="text-left px-6 py-3 font-medium hidden md:table-cell">Bino</th>
                  <th class="text-right px-6 py-3 font-medium">Ijara</th>
                  <th class="text-right px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in contracts" :key="c.id" class="border-t border-stone-100 text-sm">
                  <td class="px-6 py-3 font-medium">{{ c.tenant }}</td>
                  <td class="px-6 py-3 text-stone-500">{{ c.unit }}</td>
                  <td class="px-6 py-3 text-stone-500 hidden md:table-cell">{{ c.building }}</td>
                  <td class="px-6 py-3 text-right text-stone-600">{{ c.rent }}</td>
                  <td class="px-6 py-3 text-right"><span :class="c.status === 'Faol' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'" class="text-xs px-2 py-1 rounded-full">{{ c.status }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Tashkent buildings showcase -->
          <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div v-for="b in tashkentBuildings" :key="b.name" class="relative h-48 rounded-xl overflow-hidden group">
              <img :src="b.img" :alt="b.name" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div class="absolute bottom-0 left-0 p-4">
                <p class="text-white text-sm font-medium">{{ b.name }}</p>
                <p class="text-white/60 text-xs">{{ b.desc }}</p>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="bg-[#111] rounded-2xl p-8 md:p-12 text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Bugundan <span class="text-[#C9A961] italic font-light font-serif-display">boshlang</span></h2>
            <p class="text-stone-400 text-sm mb-6 max-w-md mx-auto">MAKON platformasida roʻyxatdan oʻting va koʻchmulingizni professional darajada boshqaring.</p>
            <NuxtLink to="/login" class="inline-flex items-center gap-3 bg-[#C9A961] hover:bg-[#B8954A] text-[#111] px-8 py-3 rounded-lg text-sm font-bold transition-colors">Tizimga kirish →</NuxtLink>
          </div>
        </div>

        <!-- Other module views -->
        <div v-else class="p-6 md:p-8">
          <div class="bg-white border border-stone-200 rounded-xl p-12 text-center">
            <div class="text-4xl mb-4">{{ sidebarItems.find(s => s.label === activeModule)?.icon }}</div>
            <h2 class="text-xl font-bold mb-2">{{ activeModule }}</h2>
            <p class="text-stone-400 text-sm mb-6">Bu modul demo koʻrinishida tayyorlanmoqda</p>
            <NuxtLink to="/login" class="text-[#C9A961] text-sm font-medium hover:underline">Tizimga kirib koʻring →</NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const activeModule = ref('Ishchi panel')
const sidebarItems = [
  { icon: '▦', label: 'Ishchi panel' },
  { icon: '▣', label: 'Binolar' },
  { icon: '▤', label: 'Listinglar' },
  { icon: '◆', label: 'Arizalar' },
  { icon: '●', label: 'Shartnomalar' },
  { icon: '▲', label: 'Invoyslar' },
  { icon: '◆', label: 'Toʻlovlar' },
  { icon: '✓', label: 'Tasdiqlar' },
  { icon: '○', label: 'Hisob davrlari' },
  { icon: '◇', label: 'Servis' },
  { icon: '○', label: 'Sklad' },
  { icon: '△', label: 'Taʼminotchilar' },
  { icon: '▦', label: 'Hisobotlar' },
  { icon: '●', label: 'Foydalanuvchilar' },
  { icon: '⚙', label: 'Sozlamalar' },
  { icon: '◉', label: 'Monitoring' },
]
const stats = [{ value: '16+', label: 'Modullar' }, { value: '60+', label: 'Unit' }, { value: '₸8.2M', label: 'Oylik daromad' }, { value: '99.9%', label: 'Uptime' }]
const buildings = [
  { name: 'Tashkent City', occ: 96 },
  { name: 'Trillant Tower', occ: 92 },
  { name: 'Piramit Tower', occ: 88 },
  { name: 'IT Park', occ: 99 },
]
const contracts = [
  { id: 1, tenant: 'LLC TechnoHub', unit: 'TC-401', building: 'Tashkent City', rent: '₸4,200,000', status: 'Faol' },
  { id: 2, tenant: 'JSC UzDigital', unit: 'TT-12-B', building: 'Trillant Tower', rent: '₸2,800,000', status: 'Faol' },
  { id: 3, tenant: 'IT Plus LLC', unit: 'IP-205', building: 'IT Park', rent: '₸1,500,000', status: 'Muddat' },
  { id: 4, tenant: 'UzTrade Group', unit: 'PT-8-A', building: 'Piramit Tower', rent: '₸3,100,000', status: 'Faol' },
]
const tashkentBuildings = [
  { name: 'Tashkent City', desc: 'IBC · Ofis', img: '/tashkent/tashkent-city.jpg' },
  { name: 'Trillant Tower', desc: 'Turar joy', img: '/tashkent/trillant.jpg' },
  { name: 'IT Park', desc: 'Ministry of Digital Tech', img: '/tashkent/it-park.jpg' },
]
</script>
