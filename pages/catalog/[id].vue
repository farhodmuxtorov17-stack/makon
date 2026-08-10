<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/catalog" class="hover:text-white">Katalog</NuxtLink>
      <ChevronRight :size="14" class="text-ink-700" />
      <span class="text-white truncate">{{ listing?.titleUz }}</span>
    </div>

    <!-- Gallery -->
    <div class="card overflow-hidden">
      <div class="relative h-80 lg:h-96">
        <img :src="listing?.photos[0]" class="w-full h-full object-cover" />
        <div class="absolute top-4 left-4 flex gap-2">
          <span class="badge" :class="listing?.offerType === 'RENT' ? 'badge-brand' : 'badge-success'">
            {{ listing?.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}
          </span>
          <span class="badge badge-neutral glass">
            <Eye :size="12" /> {{ listing?.viewsCount }}
          </span>
        </div>
      </div>
      <div v-if="listing && listing.photos.length > 1" class="flex gap-2 p-4">
        <img v-for="(img, i) in listing.photos" :key="i" :src="img" class="w-20 h-20 rounded-lg object-cover cursor-pointer" />
      </div>
    </div>

    <!-- Info -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-6">
          <div class="text-sm text-ink-500 mb-1">{{ building?.name }}</div>
          <h1 class="text-2xl font-bold text-white mb-3">{{ listing?.titleUz }}</h1>
          <div class="flex items-center gap-4 text-sm text-ink-400 mb-4">
            <span class="flex items-center gap-1"><MapPin :size="14" /> {{ building?.district }}</span>
            <span class="flex items-center gap-1"><Building2 :size="14" /> {{ building?.floorsCount }} qavat</span>
          </div>
          <p class="text-ink-300 leading-relaxed">{{ listing?.descriptionUz }}</p>
        </div>

        <div class="card p-6">
          <h3 class="text-white font-semibold mb-4">Bino haqida</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xs text-ink-500">Turi</div>
              <div class="text-white text-sm mt-1">{{ typeLabel }}</div>
            </div>
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xs text-ink-500">Maydon</div>
              <div class="text-white text-sm mt-1">{{ building?.totalArea.toLocaleString() }} m²</div>
            </div>
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xs text-ink-500">Bandlik</div>
              <div class="text-white text-sm mt-1">{{ building?.occupiedUnits }}/{{ building?.totalUnits }}</div>
            </div>
            <div class="p-3 rounded-xl bg-white/5">
              <div class="text-xs text-ink-500">Tuman</div>
              <div class="text-white text-sm mt-1">{{ building?.district }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-4">
        <div class="card p-6">
          <div class="text-3xl font-bold text-white mb-1">{{ formatPriceShort(listing?.price || 0) }}</div>
          <div class="text-sm text-ink-500 mb-4">{{ listing?.offerType === 'RENT' ? 'oyiga' : 'bir martalik' }}</div>

          <button class="btn btn-primary w-full mb-2" @click="showAppModal = true">
            Ariza topshirish
          </button>
          <button class="btn btn-secondary w-full">
            <Phone :size="14" /> Bog'lanish
          </button>

          <div class="mt-4 pt-4 border-t border-white/5 space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-ink-500">Taklif turi</span><span class="text-white">{{ listing?.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Valyuta</span><span class="text-white">{{ listing?.currency }}</span></div>
            <div class="flex justify-between"><span class="text-ink-500">Ko'rishlar</span><span class="text-white">{{ listing?.viewsCount }}</span></div>
          </div>
        </div>

        <div class="card p-5">
          <h3 class="text-white font-semibold mb-3 text-sm">Xulosa</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center gap-2 text-ink-400"><CheckCircle2 :size="14" class="text-emerald-400" /> A+ sinf</div>
            <div class="flex items-center gap-2 text-ink-400"><CheckCircle2 :size="14" class="text-emerald-400" /> Parking</div>
            <div class="flex items-center gap-2 text-ink-400"><CheckCircle2 :size="14" class="text-emerald-400" /> 24/7 xavfsizlik</div>
            <div class="flex items-center gap-2 text-ink-400"><CheckCircle2 :size="14" class="text-emerald-400" /> Konditsioner</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application modal -->
    <div v-if="showAppModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAppModal = false" />
      <div class="relative card p-6 w-full max-w-md animate-fade-in">
        <h3 class="text-white font-semibold mb-4">Ariza topshirish</h3>
        <div class="space-y-4">
          <div><label class="label">Taklif narxi (so'm)</label><input class="input" type="number" :value="listing?.price" /></div>
          <div><label class="label">Boshlanish sanasi</label><input class="input" type="date" /></div>
          <div v-if="listing?.offerType === 'RENT'"><label class="label">Muddat (oy)</label><input class="input" type="number" value="12" /></div>
          <div><label class="label">Izoh</label><textarea class="input min-h-[60px]" placeholder="Qo'shimcha ma'lumot..."></textarea></div>
        </div>
        <div class="flex gap-2 mt-6">
          <button class="btn btn-secondary flex-1" @click="showAppModal = false">Bekor</button>
          <button class="btn btn-primary flex-1" @click="showAppModal = false">Yuborish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, MapPin, Building2, Eye, Phone, CheckCircle2 } from 'lucide-vue-next'
import { listings, buildings } from '~/utils/mockData'

const route = useRoute()
const { formatPriceShort } = useFormat()

const listing = computed(() => listings.find(l => l.id === route.params.id))
const building = computed(() => buildings.find(b => b.id === listing.value?.buildingId))
const showAppModal = ref(false)

const typeLabel = computed(() => {
  const map: Record<string, string> = { BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash' }
  return map[building.value?.type || ''] || ''
})
</script>
