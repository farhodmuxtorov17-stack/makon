<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div class="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
            <span class="text-white text-sm font-bold">M</span>
          </div>
          <span class="font-bold text-base tracking-tight" style="font-family: 'Clash Display', sans-serif;">MAKON</span>
          <span class="text-slate-300 text-sm hidden sm:inline">| Shaxsiy kabinet</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">🔔</button>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AK</div>
            <span class="hidden sm:block text-sm font-medium text-slate-700">Aziz Karimov</span>
          </div>
          <button @click="logout" class="text-sm text-slate-400 hover:text-rose-500 px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors">Chiqish</button>
        </div>
      </div>
    </header>

    <div class="max-w-[1200px] mx-auto px-4 py-6">
      <!-- Welcome -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold mb-1" style="font-family: 'Clash Display', sans-serif;">Xush kelibsiz, Aziz!</h1>
        <p class="text-slate-400 text-sm">Sizning ijara birliklaringiz va arizalaringiz</p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="text-3xl font-bold text-blue-600">{{ myUnits.length }}</div>
          <div class="text-xs text-slate-400 mt-1">Ijara birliklari</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="text-3xl font-bold text-emerald-600">{{ activeContracts }}</div>
          <div class="text-xs text-slate-400 mt-1">Faol shartnomalar</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="text-3xl font-bold text-amber-500">{{ pendingApps }}</div>
          <div class="text-xs text-slate-400 mt-1">Koʼrib chiqilmoqda</div>
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="text-3xl font-bold text-slate-700">{{ totalMonthly }}</div>
          <div class="text-xs text-slate-400 mt-1">Oylik ijara, mln so'm</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
        <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
          class="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          :class="activeTab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'">
          {{ t.label }}
          <span v-if="t.count" class="ml-1.5 text-xs px-1.5 py-0.5 rounded-md" :class="activeTab === t.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500'">{{ t.count }}</span>
        </button>
      </div>

      <!-- My Units -->
      <div v-if="activeTab === 'units'" class="space-y-4">
        <div v-for="u in myUnits" :key="u.id" class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-slate-100 transition-all">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-64 h-48 md:h-auto flex-shrink-0 relative overflow-hidden">
              <img :src="asset(u.img)" :alt="u.name" class="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div class="flex-1 p-5">
              <div class="flex items-start justify-between mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full" :class="u.status === 'Faol' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">{{ u.status }}</span>
                    <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">{{ u.type }}</span>
                  </div>
                  <h3 class="font-bold text-base mb-1">{{ u.name }}</h3>
                  <p class="text-slate-400 text-xs">📍 {{ u.address }}</p>
                </div>
                <div class="text-right">
                  <div class="font-bold text-lg text-blue-600">{{ u.price }}<span class="text-xs font-normal text-slate-400 ml-1">so'm/oy</span></div>
                  <div class="text-xs text-slate-400 mt-0.5">{{ u.area }} · {{ u.floor }}</div>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <div class="text-xs text-slate-400 mb-0.5">Shartnoma</div>
                  <div class="text-sm font-medium text-slate-700">{{ u.contractDate }}</div>
                </div>
                <div>
                  <div class="text-xs text-slate-400 mb-0.5">Tugash sana</div>
                  <div class="text-sm font-medium text-slate-700">{{ u.endDate }}</div>
                </div>
                <div>
                  <div class="text-xs text-slate-400 mb-0.5">Keychi to'lov</div>
                  <div class="text-sm font-medium" :class="u.paymentStatus === 'Toʼlangan' ? 'text-emerald-600' : 'text-rose-500'">{{ u.paymentStatus }}</div>
                </div>
              </div>

              <div class="flex gap-2 mt-4">
                <button class="text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors">📋 Shartnoma</button>
                <button class="text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors">💳 To'lovlar</button>
                <button class="text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-xl transition-colors">🔧 Servis so'rovi</button>
                <button class="text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">Batafsil →</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- My Applications -->
      <div v-if="activeTab === 'applications'" class="space-y-3">
        <div v-for="a in myApplications" :key="a.id" class="bg-white border border-slate-200 rounded-2xl p-5">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-semibold px-2.5 py-1 rounded-full" :class="appStatusClass(a.status)">{{ a.status }}</span>
                <span class="text-xs text-slate-400 font-mono">{{ a.number }}</span>
              </div>
              <h3 class="font-bold text-sm mb-1">{{ a.property }}</h3>
              <p class="text-slate-400 text-xs">{{ a.date }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-slate-700">{{ a.price }}</div>
              <div class="text-xs text-slate-400">{{ a.duration }}</div>
            </div>
          </div>

          <!-- Status timeline -->
          <div class="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <div v-for="(step, i) in a.timeline" :key="i" class="flex items-center gap-2 flex-1">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                :class="step.done ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'">
                {{ step.done ? '✓' : i + 1 }}
              </div>
              <span class="text-xs" :class="step.done ? 'text-slate-700 font-medium' : 'text-slate-400'">{{ step.label }}</span>
              <div v-if="i < a.timeline.length - 1" class="flex-1 h-px" :class="step.done ? 'bg-emerald-200' : 'bg-slate-200'"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payments -->
      <div v-if="activeTab === 'payments'" class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-slate-50 border-b border-slate-200">
            <tr>
              <th class="text-left px-5 py-3 font-medium text-slate-400 text-xs">Sana</th>
              <th class="text-left px-5 py-3 font-medium text-slate-400 text-xs">Birlik</th>
              <th class="text-left px-5 py-3 font-medium text-slate-400 text-xs">Davr</th>
              <th class="text-right px-5 py-3 font-medium text-slate-400 text-xs">Summa</th>
              <th class="text-right px-5 py-3 font-medium text-slate-400 text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in myPayments" :key="i" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td class="px-5 py-3.5 text-slate-600">{{ p.date }}</td>
              <td class="px-5 py-3.5 text-slate-700 font-medium">{{ p.unit }}</td>
              <td class="px-5 py-3.5 text-slate-500">{{ p.period }}</td>
              <td class="px-5 py-3.5 text-right font-bold text-slate-700">{{ p.amount }}</td>
              <td class="px-5 py-3.5 text-right">
                <span class="text-xs font-medium px-2.5 py-1 rounded-full" :class="p.status === 'Toʼlangan' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'">{{ p.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
const asset = useAssetPath()
const router = useRouter()

const activeTab = ref('units')

const tabs = computed(() => [
  { id: 'units', label: 'Ijara birliklari', count: myUnits.length },
  { id: 'applications', label: 'Arizalarim', count: myApplications.length },
  { id: 'payments', label: 'To\'lovlar', count: myPayments.length },
])

const myUnits = [
  {
    id: 1, name: 'Green Business Center — A blok, 3-qavat', address: 'Mirobad, Amir Temur kochasi 88',
    type: 'Ofis', status: 'Faol', price: '18 000 000', area: '120 m²', floor: '3/12 qavat',
    contractDate: '01.06.2026', endDate: '31.05.2027', paymentStatus: 'Toʼlangan',
    img: '/tashkent/finance-center.jpg'
  },
  {
    id: 2, name: 'Nest One — B blok, 7-qavat', address: 'Yashnabad, Tashkent City',
    type: 'Ofis', status: 'Faol', price: '25 000 000', area: '139 m²', floor: '7/18 qavat',
    contractDate: '15.03.2026', endDate: '14.03.2027', paymentStatus: 'Kutilmoqda',
    img: '/tashkent/nest-one.jpg'
  },
  {
    id: 3, name: 'Mall Towers — Savdo maydoni', address: 'Chilonzor, Bunyodkor kochasi',
    type: 'Savdo', status: 'Muddati tugayotgan', price: '12 000 000', area: '85 m²', floor: '1/8 qavat',
    contractDate: '01.09.2025', endDate: '31.08.2026', paymentStatus: 'Toʼlangan',
    img: '/tashkent/mall-towers.jpg'
  },
]

const myApplications = [
  {
    id: 1, number: 'APP-2026-0421', property: 'Business Park — Loft ofis', date: '08.08.2026',
    price: '9 000 000 soʼm/oy', duration: '1 yil', status: 'Koʼrib chiqilmoqda',
    timeline: [
      { label: 'Yuborildi', done: true },
      { label: 'Operator', done: true },
      { label: 'Tasdiqlash', done: false },
      { label: 'Shartnoma', done: false },
    ]
  },
  {
    id: 2, number: 'APP-2026-0388', property: 'City Towers — Studio', date: '22.07.2026',
    price: '7 000 000 soʼm/oy', duration: '6 oy', status: 'Tasdiqlangan',
    timeline: [
      { label: 'Yuborildi', done: true },
      { label: 'Operator', done: true },
      { label: 'Tasdiqlash', done: true },
      { label: 'Shartnoma', done: true },
    ]
  },
]

const myPayments = [
  { date: '01.08.2026', unit: 'Green BC, 3-qavat', period: 'Avgust 2026', amount: '18 000 000 soʼm', status: 'Toʼlangan' },
  { date: '15.07.2026', unit: 'Nest One, 7-qavat', period: 'Iyul 2026', amount: '25 000 000 soʼm', status: 'Toʼlangan' },
  { date: '01.07.2026', unit: 'Green BC, 3-qavat', period: 'Iyul 2026', amount: '18 000 000 soʼm', status: 'Toʼlangan' },
  { date: '15.06.2026', unit: 'Nest One, 7-qavat', period: 'Iyun 2026', amount: '25 000 000 soʼm', status: 'Toʼlangan' },
  { date: '01.06.2026', unit: 'Mall Towers', period: 'Iyun 2026', amount: '12 000 000 soʼm', status: 'Toʼlangan' },
]

const activeContracts = computed(() => myUnits.filter(u => u.status === 'Faol').length)
const pendingApps = computed(() => myApplications.filter(a => a.status === 'Koʼrib chiqilmoqda').length)
const totalMonthly = computed(() => {
  const sum = myUnits.filter(u => u.status === 'Faol').reduce((s, u) => s + parseInt(u.price.replace(/\s/g, '')) / 1_000_000, 0)
  return Math.round(sum)
})

function appStatusClass(status: string) {
  if (status === 'Tasdiqlangan') return 'bg-emerald-50 text-emerald-600'
  if (status === 'Koʼrib chiqilmoqda') return 'bg-amber-50 text-amber-600'
  return 'bg-slate-100 text-slate-500'
}

function logout() {
  router.push('/login')
}
</script>
