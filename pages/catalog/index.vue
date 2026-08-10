<template>
  <div class="space-y-6">
    <PageHeader title="Katalog" subtitle="Mavjud maydonlar va binolar">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="toast.info('Filtri', 'Qidiruv saqlandi')"><Filter :size="16" /> Filtrlar</button>
      </template>
    </PageHeader>

    <div class="card p-4">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" class="input pl-10" placeholder="Bino, tuman..." />
        </div>
        <div class="flex gap-1 p-1 bg-ink-100 rounded-xl">
          <button v-for="t in types" :key="t.id" @click="filterType = t.id"
            class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            :class="filterType === t.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'">
            {{ t.label }}
          </button>
        </div>
        <select v-model="filterDistrict" class="input w-auto">
          <option value="">Tuman: Hammasi</option>
          <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div v-for="i in 6" :key="i" class="card overflow-hidden">
        <div class="skeleton h-56 w-full rounded-none" />
        <div class="p-5 space-y-3">
          <div class="skeleton h-5 w-3/4" />
          <div class="skeleton h-4 w-1/2" />
          <div class="skeleton h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
      <NuxtLink v-for="c in filtered" :key="c.id" :to="`/management/buildings/${c.id}`"
        class="card card-hover hover-lift overflow-hidden group">
        <div class="h-56 relative overflow-hidden">
          <img :src="c.image" :alt="c.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
          <div class="absolute top-3 left-3 flex gap-2">
            <span v-if="c.isNew" class="badge badge-success">Yangi</span>
            <span class="badge glass-dark text-white border border-white/10">{{ c.type }}</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <h3 class="font-display font-bold text-lg text-white leading-tight">{{ c.name }}</h3>
            <p class="text-white/60 text-xs flex items-center gap-1 mt-1"><MapPin :size="12" /> {{ c.district }}, Toshkent</p>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-2xl font-bold font-display text-brand-600">{{ c.price }}</p>
              <p class="text-xs text-ink-400">{{ c.pricePerM2 }} so'm/m²</p>
            </div>
            <div class="text-right text-sm text-ink-500">
              <p class="font-semibold">{{ c.area }} m²</p>
              <p class="text-xs">{{ c.floor }} qavat</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm flex-1" @click.prevent="toast.info('Ariza', 'Ariza forma tez orada')">
              Ariza berish
            </button>
            <button class="btn btn-outline btn-sm" @click.prevent="toast.info('Saqlandi', 'Sevimlilarga qo\'shildi')">
              <Heart :size="16" />
            </button>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-if="!loading && filtered.length === 0" class="card p-12 text-center">
      <p class="text-ink-400">Filtr bo'yicha natija topilmadi</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, MapPin, Heart, Filter } from 'lucide-vue-next'

const toast = useToast()
const loading = ref(true)
const search = ref('')
const filterType = ref('all')
const filterDistrict = ref('')

onMounted(() => setTimeout(() => loading.value = false, 500))

const types = [
  { id: 'all', label: 'Hammasi' },
  { id: 'Ofis', label: 'Ofis' },
  { id: 'Savdo', label: 'Savdo' },
  { id: 'Loft', label: 'Loft' },
]

const districts = ['Yunusobod', 'Yashnobod', "Mirzo Ulug'bek", 'Mirobod', 'Sergeli', 'Chilonzor']

const catalog = [
  { id: 'b1', name: 'Trilliant Tower · Ofis 1201', district: 'Yunusobod', area: 85, floor: '12/14', price: '1,200,000 so\'m/oy', pricePerM2: '14,100', type: 'Ofis', isNew: true, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/65eba1a8b_generated_image.png' },
  { id: 'b2', name: 'Tashkent City · Loft 802', district: 'Yashnobod', area: 120, floor: '8/22', price: '1,800,000 so\'m/oy', pricePerM2: '15,000', type: 'Loft', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png' },
  { id: 'b3', name: 'IT Park · Ofis 305', district: "Mirzo Ulug'bek", area: 65, floor: '3/8', price: '850,000 so\'m/oy', pricePerM2: '13,000', type: 'Ofis', isNew: true, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/768655312_generated_image.png' },
  { id: 'b4', name: 'Piramit · Savdo 101', district: 'Mirobod', area: 45, floor: '1/18', price: '950,000 so\'m/oy', pricePerM2: '21,100', type: 'Savdo', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/d889d0296_generated_image.png' },
  { id: 'b5', name: 'Crystal Plaza · Ofis 402', district: 'Sergeli', area: 78, floor: '4/12', price: '980,000 so\'m/oy', pricePerM2: '12,500', type: 'Ofis', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/1908acd10_generated_image.png' },
  { id: 'city-night-2', name: 'Tashkent City · Loft 1503', district: 'Yashnobod', area: 110, floor: '15/22', price: '1,300,000 so\'m/oy', pricePerM2: '11,800', type: 'Loft', isNew: true, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png' },
  { id: 'chil-1', name: 'Business Center · Savdo 204', district: 'Chilonzor', area: 50, floor: '2/5', price: '550,000 so\'m/oy', pricePerM2: '11,000', type: 'Savdo', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/1908acd10_generated_image.png' },
  { id: 'serg-1', name: 'Nest One · Loft 601', district: 'Sergeli', area: 92, floor: '6/9', price: '1,100,000 so\'m/oy', pricePerM2: '12,000', type: 'Loft', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/af7261266_generated_image.png' },
  { id: 'yun-2', name: 'Trilliant · Savdo G03', district: 'Yunusobod', area: 35, floor: 'G/14', price: '780,000 so\'m/oy', pricePerM2: '22,200', type: 'Savdo', isNew: false, image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/65eba1a8b_generated_image.png' },
]

const filtered = computed(() => {
  let list = catalog
  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter(c => c.name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q))
  }
  if (filterType.value !== 'all') list = list.filter(c => c.type === filterType.value)
  if (filterDistrict.value) list = list.filter(c => c.district === filterDistrict.value)
  return list
})
</script>
