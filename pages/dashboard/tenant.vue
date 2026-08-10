<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-ink-900">Mening kabinetim</h1>
        <p class="text-ink-500 text-sm mt-1">Xush kelibsiz, {{ authStore.user?.fullName }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn btn-outline btn-sm">
          <FileText :size="16" :stroke-width="2" /> Shartnoma
        </button>
        <button class="btn btn-primary btn-sm">
          <Plus :size="16" :stroke-width="2" /> Yangi ariza
        </button>
      </div>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="s in statCards" :key="s.label" class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="s.bg">
            <component :is="s.icon" :size="20" :stroke-width="2" :class="s.color" />
          </div>
          <span v-if="s.trend" class="text-xs font-semibold" :class="s.trendColor">{{ s.trend }}</span>
        </div>
        <div class="font-display text-2xl font-bold text-ink-900">{{ s.value }}</div>
        <div class="text-ink-400 text-sm mt-1">{{ s.label }}</div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 bg-ink-100 p-1 rounded-xl w-fit">
      <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
        class="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
        :class="activeTab === t.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'">
        <component :is="t.icon" :size="16" :stroke-width="2" />
        {{ t.label }}
        <span v-if="t.count" class="text-xs px-1.5 py-0.5 rounded-md" :class="activeTab === t.id ? 'bg-brand-100 text-brand-700' : 'bg-ink-200 text-ink-500'">{{ t.count }}</span>
      </button>
    </div>

    <!-- My Units -->
    <div v-if="activeTab === 'units'" class="space-y-4">
      <div v-for="u in myUnits" :key="u.id" class="card-hover overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <div class="md:w-56 h-44 md:h-auto flex-shrink-0 relative overflow-hidden bg-ink-100">
            <img :src="asset(u.img)" :alt="u.name" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute top-3 left-3">
              <span class="badge" :class="u.status === 'Faol' ? 'badge-success' : 'badge-warning'">{{ u.status }}</span>
            </div>
          </div>
          <div class="flex-1 p-5">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="badge badge-neutral">{{ u.type }}</span>
                </div>
                <h3 class="font-semibold text-ink-900 text-base mb-1">{{ u.name }}</h3>
                <p class="text-ink-400 text-xs flex items-center gap-1">
                  <MapPin :size="12" :stroke-width="2" /> {{ u.address }}
                </p>
              </div>
              <div class="text-right">
                <div class="font-display font-bold text-lg text-ink-900">{{ u.price }}</div>
                <div class="text-xs text-ink-400 mt-0.5">{{ u.area }} · {{ u.floor }}</div>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-ink-100">
              <div>
                <div class="text-xs text-ink-400 mb-0.5">Shartnoma</div>
                <div class="text-sm font-medium text-ink-700">{{ u.contractDate }}</div>
              </div>
              <div>
                <div class="text-xs text-ink-400 mb-0.5">Tugash</div>
                <div class="text-sm font-medium text-ink-700">{{ u.endDate }}</div>
              </div>
              <div>
                <div class="text-xs text-ink-400 mb-0.5">To'lov</div>
                <div class="text-sm font-medium flex items-center gap-1" :class="u.paymentStatus === 'Toʻlangan' ? 'text-emerald-600' : 'text-rose-500'">
                  <component :is="u.paymentStatus === 'Toʻlangan' ? CheckCircle2 : AlertCircle" :size="14" :stroke-width="2" />
                  {{ u.paymentStatus }}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-4">
              <button class="btn btn-ghost btn-sm">
                <FileText :size="14" :stroke-width="2" /> Shartnoma
              </button>
              <button class="btn btn-ghost btn-sm">
                <CreditCard :size="14" :stroke-width="2" /> To'lovlar
              </button>
              <button class="btn btn-ghost btn-sm">
                <Wrench :size="14" :stroke-width="2" /> Servis
              </button>
              <button class="btn btn-primary btn-sm">
                Batafsil <ChevronRight :size="14" :stroke-width="2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Applications -->
    <div v-if="activeTab === 'applications'" class="space-y-3">
      <div v-for="a in myApplications" :key="a.id" class="card p-5">
        <div class="flex items-start justify-between mb-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="badge" :class="appStatusClass(a.status)">{{ a.status }}</span>
              <span class="text-xs text-ink-400 font-mono">{{ a.number }}</span>
            </div>
            <h3 class="font-semibold text-ink-900 text-sm mb-1">{{ a.property }}</h3>
            <p class="text-ink-400 text-xs">{{ a.date }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm font-medium text-ink-700">{{ a.price }}</div>
            <div class="text-xs text-ink-400">{{ a.duration }}</div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="flex items-center gap-2 mt-4 pt-4 border-t border-ink-100">
          <template v-for="(step, i) in a.timeline" :key="i">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                :class="step.done ? 'bg-emerald-100 text-emerald-600' : 'bg-ink-100 text-ink-400'">
                <Check v-if="step.done" :size="14" :stroke-width="2.5" />
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-xs hidden sm:block" :class="step.done ? 'text-ink-700 font-medium' : 'text-ink-400'">{{ step.label }}</span>
            </div>
            <div v-if="i < a.timeline.length - 1" class="flex-1 h-px" :class="step.done ? 'bg-emerald-200' : 'bg-ink-200'"></div>
          </template>
        </div>
      </div>
    </div>

    <!-- Payments -->
    <div v-if="activeTab === 'payments'" class="card overflow-hidden">
      <div class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Sana</th>
              <th>Birlik</th>
              <th>Davr</th>
              <th class="text-right">Summa</th>
              <th class="text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, i) in myPayments" :key="i">
              <td class="text-ink-500">{{ p.date }}</td>
              <td class="font-medium text-ink-900">{{ p.unit }}</td>
              <td class="text-ink-500">{{ p.period }}</td>
              <td class="text-right font-bold text-ink-900">{{ p.amount }}</td>
              <td class="text-right">
                <span class="badge" :class="p.status === 'Toʻlangan' ? 'badge-success' : 'badge-danger'">
                  <component :is="p.status === 'Toʻlangan' ? CheckCircle2 : AlertCircle" :size="12" :stroke-width="2.5" />
                  {{ p.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, FileText, Plus, ChevronRight, MapPin, CreditCard, Wrench,
  CheckCircle2, AlertCircle, Check, Wallet, ClipboardList, Calendar,
} from 'lucide-vue-next'

definePageMeta({ middleware: 'auth' })
const authStore = useAuthStore()
const asset = useAssetPath()

const activeTab = ref('units')

const tabs = computed(() => [
  { id: 'units', label: 'Ijara birliklari', count: myUnits.length, icon: Building2 },
  { id: 'applications', label: 'Arizalarim', count: myApplications.length, icon: ClipboardList },
  { id: 'payments', label: 'Toʻlovlar', count: myPayments.length, icon: Wallet },
])

const statCards = [
  { label: 'Ijara birliklari', value: 3, bg: 'bg-brand-50', color: 'text-brand-600', icon: Building2, trend: '', trendColor: '' },
  { label: 'Faol shartnomalar', value: 2, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: FileText, trend: '', trendColor: '' },
  { label: 'Koʻrib chiqilmoqda', value: 1, bg: 'bg-amber-50', color: 'text-amber-600', icon: ClipboardList, trend: '', trendColor: '' },
  { label: 'Oylik ijara, mln', value: 43, bg: 'bg-sky-50', color: 'text-sky-600', icon: Wallet, trend: '', trendColor: '' },
]

const myUnits = [
  {
    id: 1, name: 'Green Business Center — A blok, 3-qavat', address: 'Mirobad, Amir Temur 88',
    type: 'Ofis', status: 'Faol', price: '18 000 000 soʻm/oy', area: '120 m²', floor: '3/12 qavat',
    contractDate: '01.06.2026', endDate: '31.05.2027', paymentStatus: 'Toʻlangan',
    img: '/tashkent/finance-center.jpg'
  },
  {
    id: 2, name: 'Nest One — B blok, 7-qavat', address: 'Yashnabad, Tashkent City',
    type: 'Ofis', status: 'Faol', price: '25 000 000 soʻm/oy', area: '139 m²', floor: '7/18 qavat',
    contractDate: '15.03.2026', endDate: '14.03.2027', paymentStatus: 'Kutilmoqda',
    img: '/tashkent/nest-one.jpg'
  },
  {
    id: 3, name: 'Mall Towers — Savdo maydoni', address: 'Chilonzor, Bunyodkor kochasi',
    type: 'Savdo', status: 'Muddati tugayotgan', price: '12 000 000 soʻm/oy', area: '85 m²', floor: '1/8 qavat',
    contractDate: '01.09.2025', endDate: '31.08.2026', paymentStatus: 'Toʻlangan',
    img: '/tashkent/mall-towers.jpg'
  },
]

const myApplications = [
  {
    id: 1, number: 'APP-2026-0421', property: 'Business Park — Loft ofis', date: '08.08.2026',
    price: '9 000 000 soʻm/oy', duration: '1 yil', status: 'Koʻrib chiqilmoqda',
    timeline: [
      { label: 'Yuborildi', done: true },
      { label: 'Operator', done: true },
      { label: 'Tasdiqlash', done: false },
      { label: 'Shartnoma', done: false },
    ]
  },
  {
    id: 2, number: 'APP-2026-0388', property: 'City Towers — Studio', date: '22.07.2026',
    price: '7 000 000 soʻm/oy', duration: '6 oy', status: 'Tasdiqlangan',
    timeline: [
      { label: 'Yuborildi', done: true },
      { label: 'Operator', done: true },
      { label: 'Tasdiqlash', done: true },
      { label: 'Shartnoma', done: true },
    ]
  },
]

const myPayments = [
  { date: '01.08.2026', unit: 'Green BC, 3-qavat', period: 'Avgust 2026', amount: '18 000 000 soʻm', status: 'Toʻlangan' },
  { date: '15.07.2026', unit: 'Nest One, 7-qavat', period: 'Iyul 2026', amount: '25 000 000 soʻm', status: 'Toʻlangan' },
  { date: '01.07.2026', unit: 'Green BC, 3-qavat', period: 'Iyul 2026', amount: '18 000 000 soʻm', status: 'Toʻlangan' },
  { date: '15.06.2026', unit: 'Nest One, 7-qavat', period: 'Iyun 2026', amount: '25 000 000 soʻm', status: 'Toʻlangan' },
  { date: '01.06.2026', unit: 'Mall Towers', period: 'Iyun 2026', amount: '12 000 000 soʻm', status: 'Toʻlangan' },
]

function appStatusClass(status: string) {
  if (status === 'Tasdiqlangan') return 'badge-success'
  if (status === 'Koʻrib chiqilmoqda') return 'badge-warning'
  return 'badge-neutral'
}
</script>
