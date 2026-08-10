<template>
  <div class="space-y-6">
    <PageHeader title="Binolar" :subtitle="`${buildings.length} ta bino`">
      <template #actions>
        <button class="btn btn-outline btn-sm" @click="toast.info('Eksport', 'PDF tayyorlanmoqda')"><Download :size="16" /> Eksport</button>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi bino</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="Building2" :value="String(buildings.length)" label="Jami binolar" iconBg="bg-brand-50" iconColor="text-brand-600" />
      <StatCard icon="Maximize" :value="'146K'" label="Umumiy maydon m²" iconBg="bg-sky-50" iconColor="text-sky-600" />
      <StatCard icon="Users" :value="'340+'" label="Ijarachilar" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
      <StatCard icon="TrendingUp" :value="'91%'" label="O'rtacha bandlik" iconBg="bg-amber-50" iconColor="text-amber-600" :trend="`+3.2%`" :trendUp="true" :sparkline="[80,82,85,87,88,90,91]" sparkColor="#f59e0b" />
    </div>

    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="card overflow-hidden">
        <div class="skeleton h-48 w-full rounded-none" />
        <div class="p-5 space-y-3">
          <div class="skeleton h-5 w-2/3" />
          <div class="skeleton h-4 w-1/2" />
          <div class="flex gap-2"><div class="skeleton h-6 w-16" /><div class="skeleton h-6 w-16" /></div>
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
      <NuxtLink v-for="b in buildings" :key="b.id" :to="`/management/buildings/${b.id}`"
        class="card card-hover hover-lift overflow-hidden group">
        <div class="h-48 relative overflow-hidden">
          <img :src="b.image" :alt="b.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
          <div class="absolute top-3 right-3">
            <span class="badge glass-dark text-white border border-white/10">{{ b.type }}</span>
          </div>
          <div class="absolute bottom-3 left-3 right-3">
            <h3 class="font-display font-bold text-lg text-white leading-tight">{{ b.name }}</h3>
            <p class="text-white/60 text-xs flex items-center gap-1 mt-0.5"><MapPin :size="12" /> {{ b.district }}, {{ b.city }}</p>
          </div>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-3 gap-2 text-center">
            <div><p class="text-lg font-bold font-display">{{ b.floorsCount }}</p><p class="text-xs text-ink-400">Qavat</p></div>
            <div><p class="text-lg font-bold font-display">{{ b.units }}</p><p class="text-xs text-ink-400">Maydon</p></div>
            <div><p class="text-lg font-bold font-display" :class="b.occupancy >= 90 ? 'text-emerald-600' : b.occupancy >= 75 ? 'text-amber-600' : 'text-rose-600'">{{ b.occupancy }}%</p><p class="text-xs text-ink-400">Bandlik</p></div>
          </div>
          <div class="mt-3 h-1.5 rounded-full bg-ink-100 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700"
              :class="b.occupancy >= 90 ? 'bg-emerald-500' : b.occupancy >= 75 ? 'bg-amber-500' : 'bg-rose-500'"
              :style="{ width: b.occupancy + '%' }" />
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Download, Building2, Maximize, Users, TrendingUp, MapPin } from 'lucide-vue-next'

const toast = useToast()
const loading = ref(true)
const showNew = ref(false)

onMounted(() => setTimeout(() => loading.value = false, 500))

const buildings = [
  { id: 'b1', name: 'Trilliant Tower', type: 'A+ Biznes markaz', district: 'Yunusobod', city: 'Toshkent', floorsCount: 14, totalArea: '15,800', occupancy: 94, units: 141, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e23becacd_tashkent_business.jpg' },
  { id: 'b2', name: 'Tashkent City IBC', type: 'A klass', district: 'Yashnobod', city: 'Toshkent', floorsCount: 22, totalArea: '28,400', occupancy: 87, units: 186, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d62df0e1f_ibc_tashkent.jpg' },
  { id: 'b3', name: 'IT Park Tashkent', type: 'IT markaz', district: "Mirzo Ulug'bek", city: 'Toshkent', floorsCount: 8, totalArea: '9,200', occupancy: 92, units: 64, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/93bd7fd52_nest_one.jpg' },
  { id: 'b4', name: 'Piramit Tower', type: 'Biznes markaz', district: 'Mirobod', city: 'Toshkent', floorsCount: 18, totalArea: '19,600', occupancy: 78, units: 98, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/a63dc668a_piramit.jpg' },
  { id: 'b5', name: 'Crystal Plaza', type: 'A klass', district: 'Sergeli', city: 'Toshkent', floorsCount: 12, totalArea: '12,400', occupancy: 84, units: 84, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e23becacd_tashkent_business.jpg' },
  { id: 'b6', name: 'Nest One Business', type: 'Biznes markaz', district: 'Sergeli', city: 'Toshkent', floorsCount: 9, totalArea: '6.8K', occupancy: 89, units: 54, published: true, image: 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d62df0e1f_ibc_tashkent.jpg' },
]
</script>
