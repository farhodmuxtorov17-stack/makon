<template>
  <div class="space-y-6">
    <PageHeader title="Ta'minotchilar" subtitle="Materiallar va xizmatlar ta'minotchilari">
      <template #actions>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Yangi ta'minotchi</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="s in suppliers" :key="s.id" class="card p-5 hover:shadow-card-hover transition-all">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" :class="s.bg">
              <Truck :size="22" :class="s.color" />
            </div>
            <div>
              <h3 class="font-semibold text-ink-900">{{ s.name }}</h3>
              <p class="text-xs text-ink-400">{{ s.category }}</p>
            </div>
          </div>
          <StatusBadge :status="s.status" :variant="s.status === 'ACTIVE' ? 'success' : 'neutral'" :label="s.status === 'ACTIVE' ? 'Faol' : 'Passiv'" dot />
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2 text-ink-500"><Phone :size="14" class="text-ink-400" /> {{ s.phone }}</div>
          <div class="flex items-center gap-2 text-ink-500"><Mail :size="14" class="text-ink-400" /> {{ s.email }}</div>
          <div class="flex items-center gap-2 text-ink-500"><MapPin :size="14" class="text-ink-400" /> {{ s.address }}</div>
        </div>
        <div class="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between text-sm">
          <div>
            <p class="text-xs text-ink-400">Yetkazib berishlar</p>
            <p class="font-semibold">{{ s.deliveries }} ta</p>
          </div>
          <div>
            <p class="text-xs text-ink-400">Jami summa</p>
            <p class="font-semibold">{{ formatPriceShort(s.totalAmount) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Plus, Truck, Phone, Mail, MapPin } from 'lucide-vue-next'
const { formatPriceShort } = useFormat()
const showNew = ref(false)

const suppliers = [
  { id: 's1', name: 'Uzmetkombinat', category: 'Metall mahsulotlar', phone: '+998 71 200 45 67', email: 'info@uzmet.uz', address: 'Toshkent, Sergeli', deliveries: 24, totalAmount: 185000000, status: 'ACTIVE', bg: 'bg-brand-50', color: 'text-brand-600' },
  { id: 's2', name: 'Qurilish Materiallari MChJ', category: 'Qurilish materiallari', phone: '+998 71 234 56 78', email: 'sales@qm.uz', address: 'Toshkent, Yunusobod', deliveries: 18, totalAmount: 94000000, status: 'ACTIVE', bg: 'bg-amber-50', color: 'text-amber-600' },
  { id: 's3', name: 'Elektro Texnika', category: 'Elektr jihozlar', phone: '+998 90 345 67 89', email: 'info@elektro.uz', address: 'Toshkent, Chilonzor', deliveries: 32, totalAmount: 52000000, status: 'ACTIVE', bg: 'bg-sky-50', color: 'text-sky-600' },
  { id: 's4', name: 'Santex Service', category: 'Santexnika', phone: '+998 91 456 78 90', email: 'info@santex.uz', address: 'Toshkent, Mirobod', deliveries: 15, totalAmount: 28000000, status: 'ACTIVE', bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { id: 's5', name: 'HVAC Solutions', category: 'Konditsioner tizimlari', phone: '+998 95 567 89 01', email: 'sales@hvac.uz', address: 'Toshkent, Yashnobod', deliveries: 8, totalAmount: 67000000, status: 'ACTIVE', bg: 'bg-rose-50', color: 'text-rose-600' },
  { id: 's6', name: 'Global Paint', category: 'Bo\'yoq materiallar', phone: '+998 99 678 90 12', email: 'info@gp.uz', address: 'Samarqand', deliveries: 5, totalAmount: 12000000, status: 'INACTIVE', bg: 'bg-ink-100', color: 'text-ink-500' },
]
</script>
