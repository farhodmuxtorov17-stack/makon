<template>
  <div class="min-h-screen bg-ink-50 flex">
    <aside :class="['fixed lg:sticky top-0 z-50 h-screen flex-shrink-0 transition-all duration-300 flex flex-col', uiStore.sidebarCollapsed ? 'w-[72px]' : 'w-[260px]', uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
      <div class="h-full bg-ink-950 flex flex-col relative overflow-hidden">
        <div class="absolute top-0 left-0 w-64 h-64 bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />

        <div class="h-16 flex items-center px-5 border-b border-white/[0.06] flex-shrink-0 relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center flex-shrink-0">
              <Building2 :size="20" :stroke-width="2" class="text-white" />
            </div>
            <transition name="fade">
              <div v-if="!uiStore.sidebarCollapsed" class="flex flex-col">
                <span class="text-white font-bold text-base font-display leading-none">MAKON</span>
                <span class="text-[10px] text-ink-400 font-medium tracking-widest uppercase mt-0.5">Real Estate</span>
              </div>
            </transition>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 dark-scroll relative z-10">
          <template v-for="(section, si) in navSections" :key="section.title">
            <div v-if="!uiStore.sidebarCollapsed" class="px-3 pt-4 pb-1.5">
              <span class="text-[10px] font-bold text-ink-500 uppercase tracking-widest">{{ section.title }}</span>
            </div>
            <div v-if="!uiStore.sidebarCollapsed && si > 0" class="h-px mx-3 my-2 bg-white/5" />
            <NuxtLink v-for="item in section.items" :key="item.path" :to="item.path" :class="isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive'">
              <component :is="item.icon" :size="20" :stroke-width="1.8" class="flex-shrink-0" />
              <span v-if="!uiStore.sidebarCollapsed" class="truncate">{{ item.label }}</span>
              <span v-if="item.badge && !uiStore.sidebarCollapsed" class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md" :class="isActive(item.path) ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-400'">{{ item.badge }}</span>
              <span v-if="item.badge && uiStore.sidebarCollapsed" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-ink-950" />
            </NuxtLink>
          </template>
        </nav>

        <div class="p-3 border-t border-white/[0.06] flex-shrink-0 relative z-10">
          <NuxtLink to="/profile" class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors group">
            <div class="relative">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
                <span class="text-sm font-bold text-white">{{ authStore.initials }}</span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-ink-950" />
            </div>
            <div v-if="!uiStore.sidebarCollapsed" class="min-w-0 flex-1">
              <p class="text-sm font-semibold text-white truncate">{{ authStore.user?.fullName }}</p>
              <p class="text-xs text-ink-400 truncate">{{ authStore.roleLabel }}</p>
            </div>
            <ChevronRight v-if="!uiStore.sidebarCollapsed" :size="16" :stroke-width="2" class="text-ink-500 group-hover:text-ink-300 transition-colors" />
          </NuxtLink>
        </div>
      </div>
    </aside>

    <transition name="fade">
      <div v-if="uiStore.sidebarOpen" class="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-40 lg:hidden" @click="uiStore.toggleSidebar()" />
    </transition>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="h-16 bg-white/80 backdrop-blur-xl border-b border-ink-200/60 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <button class="btn-ghost btn-icon lg:hidden" @click="uiStore.toggleSidebar()"><Menu :size="20" :stroke-width="2" /></button>
          <button class="btn-ghost btn-icon hidden lg:flex" @click="uiStore.toggleCollapse()"><PanelLeftClose :size="20" :stroke-width="2" :class="uiStore.sidebarCollapsed ? 'rotate-180' : ''" class="transition-transform duration-200" /></button>
          <div class="hidden md:flex items-center gap-2 text-sm">
            <NuxtLink to="/" class="text-ink-400 hover:text-ink-600 transition-colors">Bosh sahifa</NuxtLink>
            <ChevronRight :size="14" :stroke-width="2" class="text-ink-300" />
            <span class="text-ink-900 font-semibold">{{ currentPageTitle }}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="hidden md:flex items-center gap-2 rounded-xl bg-ink-100 px-3 py-2 text-sm text-ink-400 w-56 cursor-pointer hover:bg-ink-200/60 transition-colors" @click="cmdOpen = true">
            <Search :size="16" :stroke-width="2" />
            <span>Qidirish...</span>
            <kbd class="ml-auto text-[10px] font-mono font-semibold bg-white rounded px-1.5 py-0.5 border border-ink-200">⌘K</kbd>
          </button>
          <button class="btn-ghost btn-icon md:hidden" @click="cmdOpen = true"><Search :size="20" /></button>
          <NuxtLink to="/notifications" class="btn-ghost btn-icon relative">
            <Bell :size="20" :stroke-width="1.8" />
            <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </NuxtLink>
          <div class="w-px h-6 bg-ink-200 mx-1" />
          <NuxtLink to="/profile" class="flex items-center gap-2.5 pl-1">
            <div class="relative">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                <span class="text-xs font-bold text-white">{{ authStore.initials }}</span>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-semibold text-ink-900 leading-tight">{{ authStore.user?.fullName }}</p>
              <p class="text-xs text-ink-400">{{ authStore.roleLabel }}</p>
            </div>
          </NuxtLink>
        </div>
      </header>
      <main class="flex-1 p-3 md:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <CommandPalette :open="cmdOpen" @close="cmdOpen = false" />
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ChevronRight, Menu, PanelLeftClose, Search, Bell, LayoutGrid,
  FileText, CreditCard, Wallet, ShieldCheck, Wrench, Package, Users, Settings,
  Activity, ClipboardList, Search as SearchIcon, Calendar, BarChart3, Building,
  Gauge, FileBarChart,
} from 'lucide-vue-next'
import CommandPalette from '~/components/ui/CommandPalette.vue'

const uiStore = useUiStore()
const authStore = useAuthStore()
const financeStore = useFinanceStore()
const route = useRoute()

const cmdOpen = ref(false)

onMounted(() => {
  financeStore.initMockData?.()
  document.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    cmdOpen.value = !cmdOpen.value
  }
}

const unreadCount = computed(() => financeStore.unreadNotifications?.length ?? 0)
function isActive(path: string) { return route.path === path || (path !== '/' && route.path.startsWith(path)) }

const currentPageTitle = computed(() => {
  const map: Record<string, string> = {
    '/dashboard/executive': 'Ishchi panel', '/dashboard/tenant': 'Mening kabinetim',
    '/management/buildings': 'Binolar', '/management/listings': 'Listinglar',
    '/applications': 'Arizalar', '/catalog': 'Katalog',
    '/finance/contracts': 'Shartnomalar', '/finance/invoices': 'Invoyslar',
    '/finance/payments': "To'lovlar", '/finance/approvals': 'Tasdiqlar',
    '/finance/periods': 'Hisob davrlari', '/service': 'Servis',
    '/service/work-orders': "So'rovlar", '/warehouse': 'Sklad', '/warehouse/suppliers': "Ta'minotchilar",
    '/reports': 'Hisobotlar', '/meters': 'Hisoblagichlar', '/notifications': 'Bildirishnomalar',
    '/profile': 'Profil', '/admin/users': 'Foydalanuvchilar', '/admin/settings': 'Sozlamalar',
    '/admin/monitoring': 'Monitoring',
  }
  for (const [path, title] of Object.entries(map)) { if (isActive(path)) return title }
  return 'MAKON'
})

const navSections = computed(() => {
  if (authStore.role === 'TENANT_OWNER') {
    return [
      { title: 'Asosiy', items: [
        { label: 'Mening kabinetim', path: '/dashboard/tenant', icon: LayoutGrid },
        { label: 'Katalog', path: '/catalog', icon: Building2 },
      ]},
      { title: "Mening ma'lumotlar", items: [
        { label: 'Arizalarim', path: '/applications', icon: ClipboardList, badge: 1 },
        { label: "To'lovlar", path: '/finance/payments', icon: Wallet },
        { label: "Servis so'rovi", path: '/service', icon: Wrench },
      ]},
      { title: 'Hisob', items: [
        { label: 'Profil', path: '/profile', icon: Settings },
      ]},
    ]
  }
  return [
    { title: 'Asosiy', items: [
      { label: 'Ishchi panel', path: '/dashboard/executive', icon: LayoutGrid },
      { label: 'Binolar', path: '/management/buildings', icon: Building },
      { label: 'Listinglar', path: '/management/listings', icon: SearchIcon },
      { label: 'Arizalar', path: '/applications', icon: ClipboardList, badge: 3 },
      { label: 'Katalog', path: '/catalog', icon: Building2 },
    ]},
    { title: 'Moliya', items: [
      { label: 'Shartnomalar', path: '/finance/contracts', icon: FileText },
      { label: 'Invoyslar', path: '/finance/invoices', icon: CreditCard },
      { label: "To'lovlar", path: '/finance/payments', icon: Wallet },
      { label: 'Tasdiqlar', path: '/finance/approvals', icon: ShieldCheck, badge: 2 },
      { label: 'Hisob davrlari', path: '/finance/periods', icon: Calendar },
    ]},
    { title: 'Operatsion', items: [
      { label: 'Servis', path: '/service', icon: Wrench },
      { label: 'Sklad', path: '/warehouse', icon: Package },
      { label: "Ta'minotchilar", path: '/warehouse/suppliers', icon: Users },
      { label: 'Hisoblagichlar', path: '/meters', icon: Gauge },
      { label: 'Hisobotlar', path: '/reports', icon: BarChart3 },
    ]},
    { title: 'Admin', items: [
      { label: 'Foydalanuvchilar', path: '/admin/users', icon: Users },
      { label: 'Sozlamalar', path: '/admin/settings', icon: Settings },
      { label: 'Monitoring', path: '/admin/monitoring', icon: Activity },
    ]},
  ]
})
</script>
