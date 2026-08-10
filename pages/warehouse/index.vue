<template>
  <div class="space-y-6">
    <PageHeader title="Sklad" subtitle="Materiallar va zaxiralar boshqaruvi">
      <template #actions>
        <div class="relative">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input v-model="search" type="text" placeholder="Qidirish..." class="input pl-9 w-64" />
        </div>
        <button class="btn btn-primary btn-sm" @click="showNew = true"><Plus :size="16" /> Qo'shish</button>
      </template>
    </PageHeader>

    <!-- Low stock alert -->
    <div v-if="lowStockItems.length > 0" class="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
        <AlertTriangle :size="20" class="text-amber-600" />
      </div>
      <div class="flex-1">
        <p class="font-medium text-amber-900 text-sm">{{ lowStockItems.length }} ta material minimal zaxiradan past</p>
        <p class="text-amber-700 text-xs mt-0.5">{{ lowStockItems.map(i => i.name).join(', ') }}</p>
      </div>
      <button class="btn btn-warning btn-sm">Yetkazib berish buyurtma</button>
    </div>

    <!-- Category tabs -->
    <div class="flex gap-2 flex-wrap">
      <button v-for="cat in categories" :key="cat.id" @click="activeCat = cat.id"
        class="px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeCat === cat.id ? 'bg-ink-900 text-white' : 'bg-white text-ink-600 border border-ink-200 hover:bg-ink-50'">
        {{ cat.label }} <span class="ml-1.5 text-xs opacity-60">{{ cat.count }}</span>
      </button>
    </div>

    <!-- Items grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in filteredItems" :key="item.id" class="card p-5 hover:shadow-card-hover transition-all">
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="font-mono text-xs text-ink-400">{{ item.sku }}</p>
            <h3 class="font-semibold text-ink-900 mt-0.5">{{ item.name }}</h3>
          </div>
          <span class="badge" :class="item.stock < item.minStock ? 'badge-danger' : 'badge-success'">
            {{ item.stock < item.minStock ? 'Kam' : 'OK' }}
          </span>
        </div>
        <div class="flex items-end justify-between">
          <div>
            <p class="text-2xl font-bold font-display" :class="item.stock < item.minStock ? 'text-rose-600' : 'text-ink-900'">
              {{ item.stock }}<span class="text-sm font-normal text-ink-400 ml-1">{{ item.unit }}</span>
            </p>
            <p class="text-xs text-ink-400 mt-0.5">Min: {{ item.minStock }} {{ item.unit }}</p>
          </div>
          <div class="text-right">
            <p class="font-semibold">{{ formatPrice(item.unitPrice) }}</p>
            <p class="text-xs text-ink-400">so'm / {{ item.unit }}</p>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="mt-4">
          <div class="h-1.5 rounded-full bg-ink-100 overflow-hidden">
            <div class="h-full rounded-full transition-all duration-500"
              :class="item.stock < item.minStock ? 'bg-rose-500' : 'bg-emerald-500'"
              :style="{ width: Math.min((item.stock / (item.minStock * 2)) * 100, 100) + '%' }" />
          </div>
        </div>
      </div>
    </div>

    <BaseModal v-model="showNew" title="Yangi material">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div><label class="label">Nomi</label><input class="input" /></div>
          <div><label class="label">SKU</label><input class="input font-mono" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Kategoriya</label>
            <select class="input"><option>Santexnika</option><option>Elektr</option><option>HVAC</option><option>Umumiy</option></select>
          </div>
          <div>
            <label class="label">O'lchov birligi</label>
            <select class="input"><option>dona</option><option>kg</option><option>rulon</option><option>banka</option></select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div><label class="label">Miqdor</label><input class="input" type="number" /></div>
          <div><label class="label">Min. zaxira</label><input class="input" type="number" /></div>
          <div><label class="label">Narx (so'm)</label><input class="input" type="number" /></div>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showNew = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="showNew = false">Qo'shish</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Search, AlertTriangle } from 'lucide-vue-next'

const serviceStore = useServiceStore()
onMounted(() => serviceStore.initMockData())

const search = ref('')
const activeCat = ref('all')
const showNew = ref(false)

const lowStockItems = computed(() => serviceStore.warehouseItems.filter(i => i.stock < i.minStock))

const categories = computed(() => {
  const cats = [...new Set(serviceStore.warehouseItems.map(i => i.category))]
  return [
    { id: 'all', label: 'Hammasi', count: serviceStore.warehouseItems.length },
    ...cats.map(c => ({ id: c, label: c, count: serviceStore.warehouseItems.filter(i => i.category === c).length })),
  ]
})

const filteredItems = computed(() => {
  let result = serviceStore.warehouseItems
  if (activeCat.value !== 'all') result = result.filter(i => i.category === activeCat.value)
  if (search.value) {
    const q = search.value.toLowerCase()
    result = result.filter(i => i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q))
  }
  return result
})

function formatPrice(v: number) {
  if (v >= 1000000) return (v / 1000000).toFixed(1) + ' mln'
  if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
  return v.toLocaleString('ru')
}
</script>
