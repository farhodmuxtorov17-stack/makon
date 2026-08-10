<template>
  <div class="space-y-6">
    <NuxtLink to="/management/buildings" class="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-700">
      <ArrowLeft :size="16" /> Binolarga qaytish
    </NuxtLink>

    <div v-if="building" class="space-y-6">
      <!-- Building header -->
      <div class="card overflow-hidden">
        <div class="h-48 bg-ink-950 relative overflow-hidden">
          <img :src="building.img" class="w-full h-full object-cover opacity-60" @error="handleImgError" />
          <div class="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="flex items-end justify-between">
              <div>
                <span class="badge badge-info">{{ building.type }}</span>
                <h1 class="font-display text-3xl font-bold text-white mt-2">{{ building.name }}</h1>
                <p class="text-white/60 text-sm mt-1 flex items-center gap-1.5">
                  <MapPin :size="14" /> {{ building.location }}, Toshkent
                </p>
              </div>
              <div class="flex gap-2">
                <button class="btn btn-ghost btn-lg text-white hover:bg-white/10" @click="toast.info('Eksport', 'PDF tayyorlanmoqda')">
                  <Download :size="18" /> PDF
                </button>
                <button class="btn btn-primary btn-lg" @click="toast.info('Tahrir', 'Forma tez orada')">
                  <Pencil :size="18" /> Tahrirlash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon="Layers" :value="String(building.floors)" label="Qavatlar" iconBg="bg-brand-50" iconColor="text-brand-600" />
        <StatCard icon="Maximize" :value="building.area + ' m²'" label="Maydon" iconBg="bg-sky-50" iconColor="text-sky-600" />
        <StatCard icon="Building2" :value="String(building.units)" label="Jami maydon" iconBg="bg-amber-50" iconColor="text-amber-600" />
        <StatCard icon="Users" :value="String(building.tenants)" label="Ijarachilar" iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <StatCard icon="TrendingUp" :value="building.occupancy + '%'" label="Bandlik" iconBg="bg-rose-50" iconColor="text-rose-600" />
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 p-1 bg-ink-100 rounded-xl w-fit">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="activeTab === tab.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400 hover:text-ink-600'">
          {{ tab.label }}
        </button>
      </div>

      <!-- Units tab -->
      <div v-if="activeTab === 'units'" class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Maydon №</th>
                <th>Qavat</th>
                <th>Turi</th>
                <th>Maydon</th>
                <th>Status</th>
                <th>Ijarachi</th>
                <th>Oylik</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in units" :key="u.id" class="table-row-hover">
                <td class="font-mono font-semibold text-ink-900">{{ u.number }}</td>
                <td>{{ u.floor }}</td>
                <td><span class="badge badge-neutral">{{ u.type }}</span></td>
                <td>{{ u.area }} m²</td>
                <td><StatusBadge :status="u.status" :variant="unitVariant(u.status)" :label="unitLabel(u.status)" dot /></td>
                <td>{{ u.tenant || '—' }}</td>
                <td class="font-semibold" :class="u.rent ? 'text-ink-900' : 'text-ink-300'">{{ u.rent ? formatPriceShort(u.rent) : '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Amenities tab -->
      <div v-if="activeTab === 'amenities'" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="a in amenities" :key="a.label" class="card p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-ink-50 flex items-center justify-center">
            <component :is="a.icon" :size="20" class="text-ink-600" />
          </div>
          <div>
            <p class="font-medium text-sm">{{ a.label }}</p>
            <p class="text-xs text-ink-400">{{ a.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Specs tab -->
      <div v-if="activeTab === 'specs'" class="card p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div v-for="s in specs" :key="s.label" class="flex items-center justify-between py-2 border-b border-ink-100">
            <span class="text-ink-500 text-sm">{{ s.label }}</span>
            <span class="font-medium text-sm">{{ s.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="card p-12">
      <BaseEmptyState title="Bino topilmadi" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, MapPin, Download, Pencil, Layers, Maximize, Building2, Users, TrendingUp, Wifi, Car, Zap, Wind, Shield, Droplet, Phone, Snowflake } from 'lucide-vue-next'

const route = useRoute()
const toast = useToast()
const { formatPriceShort } = useFormat()

const activeTab = ref('units')
const tabs = [
  { id: 'units', label: 'Maydonlar' },
  { id: 'amenities', label: 'Qulayliklar' },
  { id: 'specs', label: 'Texnik xususiyatlar' },
]

const buildings = [
  { id: 'b1', name: 'Trilliant Tower', type: 'A+ Biznes markaz', location: 'Yunusobod', floors: 14, area: '15,800', units: 141, tenants: 133, occupancy: 94, img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80' },
  { id: 'b2', name: 'Tashkent City IBC', type: 'A klass', location: 'Yashnobod', floors: 22, area: '28,400', units: 186, tenants: 162, occupancy: 87, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80' },
  { id: 'b3', name: 'IT Park Tashkent', type: 'IT markaz', location: 'Mirzo Ulug\'bek', floors: 8, area: '9,200', units: 64, tenants: 59, occupancy: 92, img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80' },
  { id: 'b4', name: 'Piramit Tower', type: 'Biznes markaz', location: 'Mirobod', floors: 18, area: '19,600', units: 98, tenants: 76, occupancy: 78, img: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=1200&q=80' },
  { id: 'b5', name: 'Crystal Plaza', type: 'A klass', location: 'Sergeli', floors: 12, area: '12,400', units: 84, tenants: 71, occupancy: 84, img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80' },
]

const building = computed(() => buildings.find(b => b.id === route.params.id))

const units = computed(() => {
  if (!building.value) return []
  const types = ['Office', 'Retail', 'Parking', 'Warehouse']
  const statuses = ['RENTED', 'RENTED', 'RENTED', 'VACANT', 'RENTED', 'RESERVED', 'RENTED', 'RENTED']
  const tenants = ['D. Yusupova', 'A. Karimov', 'B. Toshmatov', '', 'M. Saidova', '', 'R. Nazarov', 'F. Karimova']
  const rents = [12000000, 8500000, 4500000, 0, 6800000, 0, 9500000, 5200000]
  return Array.from({ length: Math.min(building.value.units, 12) }, (_, i) => ({
    id: `u${i + 1}`,
    number: `${building.value!.name.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
    floor: (i % building.value!.floors) + 1,
    type: types[i % types.length],
    area: 40 + (i * 15) % 120,
    status: statuses[i % statuses.length],
    tenant: tenants[i % tenants.length],
    rent: rents[i % rents.length],
  }))
})

const amenities = [
  { icon: Wifi, label: 'Fiber internet', desc: '1 Gbps' },
  { icon: Car, label: 'Podval avtoturargoh', desc: '120 joy' },
  { icon: Zap, label: 'Rezerv o\'zag', desc: '100 kW' },
  { icon: Wind, label: 'Markaziy konditsioner', desc: 'VRV sistema' },
  { icon: Shield, label: '24/7 xavfsizlik', desc: 'CCTV + qo\'riq' },
  { icon: Droplet, label: 'Santexnika', desc: 'Markaziy' },
  { icon: Phone, label: 'Intercom', desc: 'IP telefon' },
  { icon: Snowflake, label: 'Sovutish tizimi', desc: 'Central cooling' },
]

const specs = [
  { label: 'Umumiy maydon', value: building.value?.area + ' m²' },
  { label: 'Qavatlar soni', value: String(building.value?.floors) },
  { label: 'Maydonlar soni', value: String(building.value?.units) },
  { label: 'Liftlar', value: '4 dona (Shindler)' },
  { label: 'Ochilgan yil', value: '2021' },
  { label: 'Sertifikat', value: 'LEED Gold' },
  { label: 'O\'tish panjara', value: 'Turniket + kartalar' },
  { label: 'Ishlash tartibi', value: '24/7' },
  { label: 'Ruxsat etilgan hayvonlar', value: 'Yo\'q' },
  { label: 'Chekish maydoni', value: 'Maxsus zona' },
]

function handleImgError() {}
function unitLabel(s: string) { return { RENTED: 'Band', VACANT: "Bo'sh", RESERVED: 'Bron', MAINTENANCE: 'Ta\'mir', DRAFT: 'Qoralama' }[s] || s }
function unitVariant(s: string) { return { RENTED: 'success', VACANT: 'neutral', RESERVED: 'warning', MAINTENANCE: 'danger', DRAFT: 'neutral' }[s] || 'neutral' }
</script>
