<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4" @click="$emit('close')">
        <div class="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl border border-ink-200 w-full max-w-xl overflow-hidden">
          <div class="flex items-center gap-3 px-4 py-3.5 border-b border-ink-100">
            <Search :size="20" class="text-ink-400 flex-shrink-0" />
            <input ref="inputRef" v-model="query" type="text" placeholder="Buyruq yoki sahifa qidiring..."
              class="flex-1 outline-none text-sm text-ink-900 placeholder-ink-400 bg-transparent" @keydown.enter="selectFirst" @keydown.esc="$emit('close')" />
            <kbd class="text-[10px] font-mono font-semibold bg-ink-100 rounded px-1.5 py-0.5 text-ink-400">ESC</kbd>
          </div>
          <div class="max-h-[400px] overflow-y-auto p-2">
            <template v-for="group in filteredGroups" :key="group.label">
              <p class="px-3 py-2 text-[10px] font-bold text-ink-400 uppercase tracking-widest">{{ group.label }}</p>
              <button v-for="item in group.items" :key="item.path"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-50 transition-colors text-left"
                @click="navigate(item.path)">
                <component :is="item.icon" :size="18" class="text-ink-500 flex-shrink-0" />
                <span class="text-sm text-ink-700 flex-1">{{ item.label }}</span>
                <ArrowRight v-if="item.path" :size="14" class="text-ink-300" />
              </button>
            </template>
            <div v-if="filteredGroups.length === 0" class="p-8 text-center text-sm text-ink-400">
              "{{ query }}" bo'yicha natija topilmadi
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { Search, ArrowRight, LayoutGrid, Building2, FileText, CreditCard, Wallet, Wrench, Package, Users, BarChart3, Settings, Bell, ClipboardList, ShieldCheck, Calendar, Search as SearchIcon } from 'lucide-vue-next'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)
const query = ref('')

watch(() => props.open, (v) => {
  if (v) {
    query.value = ''
    setTimeout(() => inputRef.value?.focus(), 100)
  }
})

const groups = [
  {
    label: 'Asosiy',
    items: [
      { label: 'Ishchi panel', path: '/dashboard/executive', icon: LayoutGrid },
      { label: 'Binolar', path: '/management/buildings', icon: Building2 },
      { label: 'Listinglar', path: '/management/listings', icon: SearchIcon },
      { label: 'Arizalar', path: '/applications', icon: ClipboardList },
    ]
  },
  {
    label: 'Moliya',
    items: [
      { label: 'Shartnomalar', path: '/finance/contracts', icon: FileText },
      { label: 'Invoyslar', path: '/finance/invoices', icon: CreditCard },
      { label: "To'lovlar", path: '/finance/payments', icon: Wallet },
      { label: 'Tasdiqlar', path: '/finance/approvals', icon: ShieldCheck },
      { label: 'Hisob davrlari', path: '/finance/periods', icon: Calendar },
    ]
  },
  {
    label: 'Operatsion',
    items: [
      { label: 'Servis', path: '/service', icon: Wrench },
      { label: 'Sklad', path: '/warehouse', icon: Package },
      { label: "Ta'minotchilar", path: '/warehouse/suppliers', icon: Users },
      { label: 'Hisobotlar', path: '/reports', icon: BarChart3 },
    ]
  },
  {
    label: 'Tizim',
    items: [
      { label: 'Bildirishnomalar', path: '/notifications', icon: Bell },
      { label: 'Profil', path: '/profile', icon: Settings },
    ]
  },
]

const filteredGroups = computed(() => {
  if (!query.value) return groups
  const q = query.value.toLowerCase()
  return groups.map(g => ({
    ...g,
    items: g.items.filter(i => i.label.toLowerCase().includes(q))
  })).filter(g => g.items.length > 0)
})

function navigate(path: string) {
  router.push(path)
  emit('close')
}

function selectFirst() {
  const first = filteredGroups.value[0]?.items[0]
  if (first) navigate(first.path)
}
</script>
