<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative h-[600px] overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950"></div>

      <div class="relative max-w-7xl mx-auto px-4 lg:px-6 h-full flex flex-col justify-center">
        <div class="max-w-2xl">
          <div class="badge badge-brand mb-4">Toshkent #1 ko'chmas mulk platformasi</div>
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
            Premium biznes maydonlari<br>
            <span class="text-gradient">bitta platformada</span>
          </h1>
          <p class="text-lg text-ink-400 mb-8 max-w-xl">
            Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari. ERI orqali xavfsiz ro'yxatdan o'tish va shartnoma tuzish.
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
              <div class="text-3xl font-bold text-white">{{ data.stats.totalBuildings }}</div>
              <div class="text-sm text-ink-500">Binolar</div>
            </div>
            <div v-if="data">
              <div class="text-3xl font-bold text-white">{{ data.stats.vacantUnits }}</div>
              <div class="text-sm text-ink-500">Bo'sh maydonlar</div>
            </div>
            <div v-if="data">
              <div class="text-3xl font-bold text-white">{{ data.stats.publishedListings }}</div>
              <div class="text-sm text-ink-500">Faol listinglar</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Building Types -->
    <section class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-2">Obyekt turlari</h2>
        <p class="text-ink-500">Biznes markazlardan turar joyni boshqaring</p>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink v-for="t in buildingTypes" :key="t.type" :to="`/catalog?type=${t.type}`" class="card card-hover p-5 text-center">
          <div class="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3 mx-auto">
            <component :is="t.icon" :size="24" class="text-brand-400" />
          </div>
          <div class="text-sm font-medium">{{ t.label }}</div>
          <div class="text-xs text-ink-600 mt-1">{{ t.count }} bino</div>
        </NuxtLink>
      </div>
    </section>

    <!-- Featured Buildings -->
    <section v-if="data && data.buildings.length" class="py-16 px-4 lg:px-6 max-w-7xl mx-auto">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold mb-2">Tavsiya etilgan binolar</h2>
          <p class="text-ink-500">Bo'sh maydonlar mavjud premium obyektlar</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasini ko'rish →</NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLink v-for="b in data.buildings.slice(0, 6)" :key="b.id" :to="`/buildings/${b.slug}`" class="card card-hover overflow-hidden">
          <div class="h-48 overflow-hidden bg-ink-900">
            <img :src="b.gallery[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'" :alt="b.name" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="p-5">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge badge-brand">{{ typeLabel(b.type) }}</span>
              <span class="badge badge-success" v-if="b.vacantUnits > 0">{{ b.vacantUnits }} bo'sh</span>
            </div>
            <h3 class="font-semibold text-lg mb-1">{{ b.name }}</h3>
            <p class="text-sm text-ink-500 mb-3 line-clamp-1">{{ b.address }}</p>
            <div class="flex items-center gap-4 text-xs text-ink-600">
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
          <h2 class="text-2xl font-bold mb-2">Bo'sh takliflar</h2>
          <p class="text-ink-500">Ijaraga va sotuvga maydonlar</p>
        </div>
        <NuxtLink to="/catalog" class="btn btn-ghost btn-sm">Barchasi →</NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="l in data.listings.slice(0, 4)" :key="l.id" class="card card-hover overflow-hidden">
          <div class="h-32 overflow-hidden bg-ink-900">
            <img :src="l.photos[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'" :alt="l.titleUz" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="badge" :class="l.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">{{ l.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvga' }}</span>
            </div>
            <h4 class="font-medium text-sm mb-1 line-clamp-1">{{ l.titleUz }}</h4>
            <div class="text-lg font-bold text-brand-400">{{ formatPrice(l.price, l.currency) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="about" class="py-20 px-4 lg:px-6">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Qanday ishlaydi</h2>
        <p class="text-ink-500">Katalogdan shartnoma imzolashgacha — to'liq raqamli oqim</p>
      </div>
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="(step, i) in steps" :key="i" class="text-center">
          <div class="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-4 mx-auto font-bold text-brand-400 text-lg">{{ i + 1 }}</div>
          <h4 class="font-semibold mb-1">{{ step.title }}</h4>
          <p class="text-sm text-ink-500">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section id="contacts" class="py-20 px-4 lg:px-6">
      <div class="max-w-3xl mx-auto card p-12 text-center">
        <h2 class="text-3xl font-bold mb-4">Binongizni MAKON ga qo'shing</h2>
        <p class="text-ink-400 mb-8">Binongizni raqamlashtiring, bo'sh maydonlarni avtomatik katalogga chiqaring va ijara jarayonini to'liq boshqaring.</p>
        <NuxtLink to="/register/eri" class="btn btn-primary btn-lg">Ro'yxatdan o'tish</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Building2, ShoppingBag, Warehouse, Home, Briefcase, Building } from 'lucide-vue-next'
import { BUILDING_TYPE_LABELS } from '~/types'

definePageMeta({ layout: 'public' })

const { fetchCatalog } = useApi()
const { data, pending, error } = await useAsyncData('catalog', () => fetchCatalog())

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

const steps = [
  { title: 'Katalogdan tanlang', desc: 'Bo\'sh maydonlarni ko\'ring va mos obyektni tanlang' },
  { title: 'ERI ro\'yxatdan o\'ting', desc: 'Yuridik shaxs sifatida xavfsiz identifikatsiya' },
  { title: 'Ariza yuboring', desc: 'Onlayn ariza va shartnoma jarayoni' },
  { title: 'Shartnoma imzolang', desc: 'ERI orqali elektron imzo va kabinetga kirish' },
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
