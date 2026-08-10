<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative min-h-[680px] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white dark:from-ink-950/80 dark:via-ink-950/60 dark:to-ink-950"></div>

      <div class="relative max-w-7xl mx-auto px-4 lg:px-6 min-h-[680px] flex flex-col justify-center">
        <div class="max-w-2xl">
          <div class="badge badge-brand mb-4">Toshkent #1 ko'chmas mulk platformasi</div>
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4 text-ink-900 dark:text-white">
            Premium biznes maydonlari<br>
            <span class="text-gradient">bitta platformada</span>
          </h1>
          <p class="text-lg text-ink-600 dark:text-ink-400 mb-8 max-w-xl">
            Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari. ERI orqali xavfsiz ro'yxatdan o'tish, onlayn shartnoma tuzish va to'liq boshqaruv — bitta tizimda.
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <NuxtLink to="/catalog" class="btn btn-primary btn-lg">
              Katalogga kirish
            </NuxtLink>
            <NuxtLink to="/register/eri" class="btn btn-secondary btn-lg">
              Ro'yxatdan o'tish
            </NuxtLink>
          </div>

          <div class="flex items-center gap-8 mt-12">
            <div v-if="data">
              <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.totalBuildings }}</div>
              <div class="text-sm text-ink-500">Binolar</div>
            </div>
            <div class="w-px h-10 bg-black/10 dark:bg-white/10"></div>
            <div v-if="data">
              <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.vacantUnits }}</div>
              <div class="text-sm text-ink-500">Bo'sh maydonlar</div>
            </div>
            <div class="w-px h-10 bg-black/10 dark:bg-white/10"></div>
            <div v-if="data">
              <div class="text-3xl font-bold text-ink-900 dark:text-white">{{ data.stats.publishedListings }}</div>
              <div class="text-sm text-ink-500">Faol listinglar</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="py-8 border-y border-black/5 dark:border-white/5">
      <div class="max-w-7xl mx-auto px-4 lg:px-6">
        <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-ink-400 dark:text-ink-600">
          <div class="flex items-center gap-2 text-sm font-medium"><ShieldCheck :size="18" class="text-brand-500" /> ERI integratsiyasi</div>
          <div class="flex items-center gap-2 text-sm font-medium"><FileCheck2 :size="18" class="text-brand-500" /> 18 modul</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Users :size="18" class="text-brand-500" /> 5 rol</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Building2 :size="18" class="text-brand-500" /> 322 jadval</div>
          <div class="flex items-center gap-2 text-sm font-medium"><Zap :size="18" class="text-brand-500" /> Real-time monitoring</div>
        </div>
      </div>
    </section>

    <!-- Building Types -->
    <section class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl md:text-3xl font-bold mb-2 text-ink-900 dark:text-white">Obyekt turlari</h2>
        <p class="text-ink-500">Biznes markazlardan turar joyni boshqaring</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink v-for="t in buildingTypes" :key="t.type" :to="`/catalog?type=${t.type}`" class="card card-hover p-5 text-center">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3 mx-auto">
            <component :is="t.icon" :size="24" class="text-brand-500" />
          </div>
          <div class="text-sm font-medium text-ink-900 dark:text-white">{{ t.label }}</div>
          <div class="text-xs text-ink-500 mt-1">{{ t.count }} bino</div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Buildings -->
    <section v-if="data && data.buildings.length" class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-ink-900 dark:text-white">Tavsiya etilgan binolar</h2>
          <p class="text-ink-500">Bo'sh maydonlar mavjud premium obyektlar</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasini ko'rish →</NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="b in data.buildings.slice(0, 6)" :key="b.id" :to="`/buildings/${b.slug}`" class="card card-hover overflow-hidden">
          <div class="h-48 overflow-hidden bg-ink-100 dark:bg-ink-900">
            <img :src="b.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'" :alt="b.name" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
              <span class="badge badge-success" v-if="b.vacantUnits > 0">{{ b.vacantUnits }} bo'sh</span>
            </div>
            <h3 class="font-semibold text-lg mb-1 text-ink-900 dark:text-white">{{ b.name }}</h3>
            <p class="text-sm text-ink-500 mb-3 line-clamp-1">{{ b.address }}</p>
            <div class="flex items-center gap-4 text-xs text-ink-500">
              <span>{{ b.floorsCount }} qavat</span>
              <span>{{ b.totalUnits }} unit</span>
              <span>{{ formatArea(b.totalArea) }} m²</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Listings -->
    <section v-if="data && data.listings.length" class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-ink-900 dark:text-white">Bo'sh takliflar</h2>
          <p class="text-ink-500">Ijaraga va sotuvga maydonlar</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasi →</NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="l in data.listings.slice(0, 4)" :key="l.id" class="card card-hover overflow-hidden">
          <div class="h-32 overflow-hidden bg-ink-100 dark:bg-ink-900">
            <img :src="l.photos[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'" :alt="l.titleUz" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
            </div>
            <h4 class="font-medium text-sm mb-1 line-clamp-1 text-ink-900 dark:text-white">{{ l.titleUz }}</h4>
            <div class="text-lg font-bold text-brand-500">{{ formatPrice(l.price, l.currency) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Platforma imkoniyatlari</h2>
        <p class="text-ink-500 max-w-2xl mx-auto">18 modul, 322 jadval va 51 yo'nalish — ko'chmas mulkni boshqarishning to'liq raqamli ekotizimi</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="f in features" :key="f.title" class="card p-6 hover:shadow-lg transition-all">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
            <component :is="f.icon" :size="24" class="text-brand-500" />
          </div>
          <h3 class="font-semibold mb-2 text-ink-900 dark:text-white">{{ f.title }}</h3>
          <p class="text-sm text-ink-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-4 lg:px-6 bg-gradient-to-b from-brand-500/5 to-transparent">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Raqamlarda MAKON</h2>
          <p class="text-ink-500">Tizim hajmi va ko'rsatkichlari</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.totalBuildings || '—' }}</div>
            <div class="text-sm text-ink-500">Boshqariladigan binolar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.totalUnits || '—' }}</div>
            <div class="text-sm text-ink-500">Jami birliklar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.publishedListings || '—' }}</div>
            <div class="text-sm text-ink-500">Faol listinglar</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl font-bold text-brand-500 mb-2">{{ data?.stats.occupancyRate || '—' }}%</div>
            <div class="text-sm text-ink-500">Bandlik darajasi</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Narxlar</h2>
        <p class="text-ink-500">Biznesingiz hajmiga qarab moslashuvchan tariflar</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="p in pricing" :key="p.name" class="card p-6 relative" :class="p.featured ? 'border-brand-500/30 shadow-lg' : ''">
          <div v-if="p.featured" class="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-brand">Tavsiya etiladi</div>
          <h3 class="font-semibold text-lg mb-2 text-ink-900 dark:text-white">{{ p.name }}</h3>
          <div class="mb-4">
            <span class="text-3xl font-bold text-ink-900 dark:text-white">{{ p.price }}</span>
            <span class="text-sm text-ink-500">/oy</span>
          </div>
          <p class="text-sm text-ink-500 mb-4">{{ p.desc }}</p>
          <ul class="space-y-2 mb-6">
            <li v-for="feat in p.features" :key="feat" class="flex items-start gap-2 text-sm text-ink-600 dark:text-ink-400">
              <CheckCircle2 :size="16" class="text-emerald-500 flex-shrink-0 mt-0.5" /> {{ feat }}
            </li>
          </ul>
          <button class="btn w-full" :class="p.featured ? 'btn-primary' : 'btn-secondary'">Tanlash</button>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="about" class="py-20 px-4 lg:px-6 bg-gradient-to-b from-transparent to-brand-500/5">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Qanday ishlaydi</h2>
        <p class="text-ink-500">Katalogdan shartnoma imzolashgacha — to'liq raqamli oqim</p>
      </div>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="(step, i) in steps" :key="i" class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 mx-auto font-bold text-brand-500 text-lg">{{ i + 1 }}</div>
          <h4 class="font-semibold mb-1 text-ink-900 dark:text-white">{{ step.title }}</h4>
          <p class="text-sm text-ink-500">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Mijozlar fikrlari</h2>
        <p class="text-ink-500">Bizning hamkorlarimiz nima deydi</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="t in testimonials" :key="t.name" class="card p-6">
          <div class="flex items-center gap-1 mb-3">
            <Star v-for="s in 5" :key="s" :size="16" class="text-amber-400 fill-amber-400" />
          </div>
          <p class="text-sm text-ink-600 dark:text-ink-400 mb-4 leading-relaxed">"{{ t.text }}"</p>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-500">{{ t.name.charAt(0) }}</div>
            <div>
              <div class="text-sm font-medium text-ink-900 dark:text-white">{{ t.name }}</div>
              <div class="text-xs text-ink-500">{{ t.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="contacts" class="py-20 px-4 lg:px-6">
      <div class="max-w-4xl mx-auto card p-12 text-center bg-gradient-to-br from-brand-500/5 to-transparent border-brand-500/20">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Binongizni MAKON ga qo'shing</h2>
        <p class="text-ink-500 mb-8 max-w-xl mx-auto">Binongizni raqamlashtiring, bo'sh maydonlarni avtomatik katalogga chiqaring va ijara jarayonini to'liq boshqaring — ERI orqali xavfsiz shartnoma tuzish bilan.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <NuxtLink to="/register/eri" class="btn btn-primary btn-lg">Ro'yxatdan o'tish</NuxtLink>
          <a href="mailto:info@makon.uz" class="btn btn-secondary btn-lg">Bog'lanish</a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 px-4 lg:px-6 max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-ink-900 dark:text-white">Tez-tez so'raladigan savollar</h2>
      </div>
      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="i" class="card p-5">
          <button @click="faqOpen = faqOpen === i ? -1 : i" class="flex items-center justify-between w-full text-left">
            <span class="font-medium text-ink-900 dark:text-white">{{ faq.q }}</span>
            <ChevronDown :size="18" class="text-ink-400 transition-transform flex-shrink-0" :class="faqOpen === i ? 'rotate-180' : ''" />
          </button>
          <transition name="fade">
            <p v-if="faqOpen === i" class="text-sm text-ink-500 mt-3 leading-relaxed">{{ faq.a }}</p>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Building2, ShoppingBag, Warehouse, Home, Briefcase, Building, ShieldCheck, FileCheck2, Users, Zap, Star, ChevronDown, CheckCircle2, Receipt, Wrench, BarChart3, Gauge, ScrollText, Package, Settings } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const { fetchCatalog } = useApi()
const { data, pending, error } = await useAsyncData('catalog', () => fetchCatalog())

const faqOpen = ref(-1)

const buildingTypes = computed(() => {
  if (!data.value) return []
  const types = [...new Set(data.value.buildings.map(b => b.type))]
  const icons: Record<string, any> = { BUSINESS_CENTER: Building2, OFFICE: Briefcase, SHOPPING: ShoppingBag, WAREHOUSE: Warehouse, RESIDENTIAL: Home, MIXED: Building }
  return types.map(t => ({
    type: t,
    label: BUILDING_TYPE_LABELS[t]?.uz || t,
    icon: icons[t] || Building,
    count: data.value.buildings.filter(b => b.type === t).length,
  }))
})

const features = [
  { icon: Building2, title: 'Bino boshqaruvi', desc: 'Binolar, qavatlar, birliklar — to\'liq struktura boshqaruvi. 3D ko\'rinish va 2D planlar bilan.' },
  { icon: FileCheck2, title: 'ERI integratsiyasi', desc: 'Yuridik shaxslar uchun xavfsiz elektron imzo. Shartnomalarni onlayn imzolang.' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: 'Invoyslar, to\'lovlar, qarzdorlik monitoringi. Avtomatik hisob-kitob va hisobotlar.' },
  { icon: Wrench, title: 'Xizmat ko\'rsatish', desc: 'Service request\'lar, work order\'lar, SLA monitoringi. Faol topshiriqlarni boshqaring.' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: 'Materiallar, qoldiqlar, sarflash monitoringi. Kam qolgan materiallarni avtomatik ogohlantirish.' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: 'Elektr, suv, gaz ko\'rsatkichlari. Tariflar bo\'yicha avtomatik hisob-kitob.' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: 'Bandlik dinamikasi, daromad, konversiya. Real-time dashboard va hisobotlar.' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: '5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER. Aniq huquqlar boshqaruvi.' },
  { icon: ScrollText, title: 'Shartnoma boshqaruvi', desc: 'Shartnoma yaratish, ERI imzolash, versiya nazorati. PDF eksport va arxiv.' },
]

const steps = [
  { title: 'Katalogdan tanlang', desc: 'Bo\'sh maydonlarni ko\'ring va mos obyektni tanlang' },
  { title: 'ERI ro\'yxatdan o\'ting', desc: 'Yuridik shaxs sifatida xavfsiz identifikatsiya' },
  { title: 'Ariza yuboring', desc: 'Onlayn ariza va shartnoma jarayoni' },
  { title: 'Shartnoma imzolang', desc: 'ERI orqali elektron imzo va kabinetga kirish' },
]

const pricing = [
  { name: 'Start', price: '500K so\'m', desc: 'Kichik biznes uchun', featured: false, features: ['3 binogacha', '50 unitgacha', 'Asosiy modullar', 'Email qo\'llab-quvvatlash'] },
  { name: 'Business', price: '2M so\'m', desc: 'O\'rta biznes uchun', featured: true, features: ['10 binogacha', '500 unitgacha', 'Barcha modullar', 'ERI integratsiyasi', 'Prioritetli qo\'llab-quvvatlash'] },
  { name: 'Enterprise', price: 'Kelishilgan', desc: 'Yirik tashkilotlar uchun', featured: false, features: ['Cheksiz binolar', 'Cheksiz unitlar', 'Barcha modullar + API', 'Shaxsiy integratsiya', '24/7 qo\'llab-quvvatlash'] },
]

const testimonials = [
  { name: 'Sardor Yusupov', role: 'Tashkent City Tower menejeri', text: 'MAKON tizimi bizga binoni boshqarishda 3 baravar tezlik berdi. ERI orqali shartnoma imzolash — aldamchi masala emas.' },
  { name: 'Dilnoza Karimova', role: 'Trillant Tower buxgalteri', text: 'Invoyslar va qarzdorlik monitoringi avtomatik. Endi har oy hisobot tayyorlashga vaqt sarflamaymiz.' },
  { name: 'Aziz Toshmatov', role: 'IT Park bino menejeri', text: 'Service request\'lar endi tizimda. SLA monitoringi bilan har bir so\'rov vaqtida hal qilinadi.' },
]

const faqs = [
  { q: 'ERI nima va u qanday ishlaydi?', a: 'ERI — Elektron Raqamli Imzo. Yuridik shaxslar uchun xavfsiz identifikatsiya tizimi. MAKON orqali shartnomalarni ERI orqali rasmiy imzolashingiz mumkin.' },
  { q: 'Qanday ro\'yxatdan o\'tish mumkin?', a: 'Ro\'yxatdan o\'tish sahifasiga o\'ting, ERI orqali identifikatsiyadan o\'ting va shaxsiy kabinetga kiring. Bino menejeri sizning ma\'lumotlaringizni tekshiradi.' },
  { q: 'Nechta bino boshqarish mumkin?', a: 'Tarif rejasiga qarab: Start — 3 bino, Business — 10 bino, Enterprise — cheksiz. Istalgan vaqtda tarifni o\'zgartirishingiz mumkin.' },
  { q: 'To\'lovlar qanday amalga oshiriladi?', a: 'Hozirda to\'lovlar tizimda hisoblanadi, lekin avtomatik bank integratsiyasi yo\'q. Invoyslarni qo\'lda to\'laysiz va tizimda belgilaysiz.' },
  { q: 'Mobil ilova bormi?', a: 'Hozirda web-versiya mavjud — mobil brauzerdan to\'liq ishlaydi. IOS va Android ilovalari keyingi bosqichda rejalashtirilgan.' },
]

function typeLabel(type: string) {
  return BUILDING_TYPE_LABELS[type as keyof typeof BUILDING_TYPE_LABELS]?.uz || type
}

function formatArea(m2: number) {
  return m2?.toLocaleString('ru-RU') || '—'
}

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${formatted} so'm`
}
</script>
