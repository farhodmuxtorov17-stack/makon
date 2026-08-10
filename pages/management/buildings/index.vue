<template>
  <div class="space-y-6">
    <PageHeader title="Binolar" subtitle="Boshqariladigan ob'ektlar ro'yxati">
      <template #actions>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9 w-64" />
        </div>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Bino qo'shish</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <NuxtLink v-for="b in filteredBuildings" :key="b.id" :to="`/management/buildings/${b.id}`" class="card-hover overflow-hidden group">
        <div class="aspect-[16/10] overflow-hidden bg-ink-100 relative">
          <img :src="b.image" :alt="b.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="badge" :class="b.published ? 'badge-success' : 'badge-neutral'">
              {{ b.published ? 'Nashr qilingan' : 'Qoralama' }}
            </span>
          </div>
          <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1 text-xs font-semibold">
            {{ b.type }}
          </div>
        </div>
        <div class="p-5">
          <h3 class="font-semibold text-ink-900 group-hover:text-brand-600 transition-colors mb-1">{{ b.name }}</h3>
          <p class="text-sm text-ink-400 flex items-center gap-1.5 mb-3">
            <MapPin :size="14" /> {{ b.district }}, {{ b.city }}
          </p>
          <div class="grid grid-cols-4 gap-2 text-sm">
            <div class="text-center p-2 rounded-lg bg-ink-50">
              <p class="font-bold">{{ b.floorsCount }}</p>
              <p class="text-2xs text-ink-400">Qavat</p>
            </div>
            <div class="text-center p-2 rounded-lg bg-ink-50">
              <p class="font-bold">{{ b.totalArea }}</p>
              <p class="text-2xs text-ink-400">m²</p>
            </div>
            <div class="text-center p-2 rounded-lg bg-ink-50">
              <p class="font-bold text-emerald-600">{{ b.occupancy }}%</p>
              <p class="text-2xs text-ink-400">Bandlik</p>
            </div>
            <div class="text-center p-2 rounded-lg bg-ink-50">
              <p class="font-bold">{{ b.units }}</p>
              <p class="text-2xs text-ink-400">Maydon</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <BaseModal v-model="showNew" title="Yangi bino qo'shish">
      <div class="space-y-4">
        <div><label class="label">Nomi</label><input class="input" placeholder="Trilliant Tower" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Turi</label>
            <select class="input"><option>Biznes markaz</option><option>Ofis</option><option>Savdo</option><option>Residential</option></select>
          </div>
          <div><label class="label">Tuman</label><input class="input" placeholder="Yunusobod" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Qavatlar soni</label><input class="input" type="number" /></div>
          <div><label class="label">Umumiy maydon (m²)</label><input class="input" type="number" /></div>
        </div>
        <div><label class="label">Manzil</label><input class="input" /></div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Qo'shish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, MapPin } from 'lucide-vue-next'

const search = ref('')
const showNew = ref(false)

const buildings = [
  { id: 'b1', name: 'Trilliant Tower', type: 'A+ Biznes', district: 'Yunusobod', city: 'Toshkent', floorsCount: 14, totalArea: '15.8K', occupancy: 94, units: 141, published: true, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: 'b2', name: 'Tashkent City IBC', type: 'Biznes markaz', district: 'Yashnobod', city: 'Toshkent', floorsCount: 18, totalArea: '22K', occupancy: 87, units: 204, published: true, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
  { id: 'b3', name: 'IT Park Tashkent', type: 'IT markaz', district: 'Mirzo Ulug\'bek', city: 'Toshkent', floorsCount: 12, totalArea: '4.2K', occupancy: 92, units: 68, published: true, image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' },
  { id: 'b4', name: 'Piramit Tower', type: 'A klass', district: 'Yakkasaroy', city: 'Toshkent', floorsCount: 37, totalArea: '11.5K', occupancy: 78, units: 96, published: false, image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80' },
  { id: 'b5', name: 'Crystal Plaza', type: 'Biznes markaz', district: 'Chilonzor', city: 'Toshkent', floorsCount: 8, totalArea: '5.6K', occupancy: 84, units: 42, published: true, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
  { id: 'b6', name: 'Nest One Business', type: 'Biznes markaz', district: 'Sergeli', city: 'Toshkent', floorsCount: 9, totalArea: '6.8K', occupancy: 89, units: 54, published: true, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
]

const filteredBuildings = computed(() => {
  if (!search.value) return buildings
  const q = search.value.toLowerCase()
  return buildings.filter(b => b.name.toLowerCase().includes(q) || b.district.toLowerCase().includes(q))
})
</script>
