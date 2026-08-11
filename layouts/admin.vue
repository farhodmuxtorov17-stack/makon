<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Sidebar -->
    <aside class="fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'" style="width: 264px;">
      <div class="h-full flex flex-col admin-sidebar">
        <!-- Logo -->
        <div class="h-16 flex items-center gap-3 px-5 border-b border-black/5 dark:border-white/5 flex-shrink-0">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30 transition-transform hover:scale-105">M</div>
          <div>
            <div class="font-bold text-sm tracking-tight text-ink-900 dark:text-white">MAKON</div>
            <div class="text-[10px] text-ink-400 uppercase tracking-widest">{{ currentRoleShort }}</div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto py-3 px-3 tg-hide-scrollbar">
          <template v-for="(group, gi) in groupedNav" :key="gi">
            <div v-if="group.label" class="sidebar-group-label">{{ group.label }}</div>
            <NuxtLink
              v-for="item in group.items" :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all relative group"
              :class="isActive(item.to) ? 'admin-sidebar-item-active' : 'admin-sidebar-item'"
              @click="sidebarOpen = false"
            >
              <div v-if="isActive(item.to)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-brand-500"></div>
              <component :is="item.icon" :size="18" :class="isActive(item.to) ? 'text-brand-500' : ''" />
              <span>{{ item.label }}</span>
              <span v-if="item.badge" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/15 text-red-500 dark:text-red-400">{{ item.badge }}</span>
            </NuxtLink>
          </template>
        </nav>

        <!-- User -->
        <div class="p-3 border-t border-black/5 dark:border-white/5 flex-shrink-0">
          <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm admin-sidebar-item transition-all duration-200 hover:translate-x-1">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-brand-500/20">A</div>
            <div class="flex-1 text-left">
              <div class="text-sm font-medium text-ink-900 dark:text-white">Admin</div>
              <div class="text-[11px] text-ink-500">Tizimdan chiqish</div>
            </div>
            <LogOut :size="16" class="text-ink-400 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 z-30 lg:hidden" @click="sidebarOpen = false" />

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-16 sticky top-0 z-20 glass border-b border-black/5 dark:border-white/5 flex items-center px-4 lg:px-6 gap-3 flex-shrink-0" style="backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-500">
          <Menu :size="20" />
        </button>

        <!-- Breadcrumb -->
        <div class="hidden md:flex items-center gap-2 text-sm text-ink-400">
          <span>{{ currentRoleShort }}</span>
          <ChevronRight :size="14" />
          <span class="text-ink-700 dark:text-ink-200 font-medium">{{ currentPageTitle }}</span>
        </div>

        <div class="flex-1" />
        <RoleSwitcher />
        <ThemeToggle />
        <button class="relative p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-ink-500 hover:text-ink-900 dark:hover:text-white transition-all duration-200 hover:scale-105">
          <Bell :size="18" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
        </button>
      </header>

      <main class="flex-1 p-4 lg:p-6 animate-fade-in overflow-x-hidden">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, Building2, FileText, Receipt, Wallet, ClipboardList, Package, Gauge,
  BarChart3, Bell, Menu, Settings, ShieldCheck, ScrollText, UserCircle, Layers, Tag,
  Calendar, ClipboardCheck, History, Activity, Database, LogOut, Sun, Moon, KeyRound,
  MapPin, Eye, FileSignature, Boxes, Home, FileBarChart, ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')

const roleLabels: Record<string, string> = {
  ADMIN: 'Admin', SUPER_HEAD: 'Super Rahbar', BUILDING_MANAGER: 'Bino Rahbari',
  ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi', WAREHOUSE_OPERATOR: 'Omborchi',
  CONTENT_OPERATOR: 'Kontent', TENANT_OWNER: 'Ijarachi'
}
const currentRoleShort = computed(() => roleLabels[currentRole.value] || 'Admin')

const allNavItems: Record<string, { label?: string; items: any[] }[]> = {
  SUPER_HEAD: [
    { items: [
      { to: '/dashboard/executive', label: 'Global Dashboard', icon: LayoutDashboard },
    ]},
    { label: 'Boshqaruv', items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2 },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Tahlil', items: [
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
      { to: '/admin/audit', label: 'Audit jurnali', icon: History },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  BUILDING_MANAGER: [
    { items: [
      { to: '/dashboard/building', label: 'Bino Dashboard', icon: LayoutDashboard },
    ]},
    { label: 'Boshqaruv', items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2 },
      { to: '/management/units', label: 'Unitlar', icon: Layers },
      { to: '/management/listings', label: 'Listinglar', icon: Tag },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
      { to: '/management/service-requests', label: 'Servis so\'rovlari', icon: ClipboardList },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Vizual', items: [
      { to: '/management/floor-plans', label: 'Reja importi', icon: MapPin },
      { to: '/management/visual-settings', label: 'Vizual sozlamalar', icon: Eye },
    ]},
    { label: 'Boshqa', items: [
      { to: '/meters', label: 'Hisoblagichlar', icon: Gauge },
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  ACCOUNTANT: [
    { items: [
      { to: '/finance/periods', label: 'Moliya davrlari', icon: Calendar },
      { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
    ]},
    { label: 'Nazorat', items: [
      { to: '/finance/debts', label: 'Qarzdorlik', icon: Wallet },
      { to: '/finance/approvals', label: 'Tasdiqlar', icon: ClipboardCheck },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Ombor', items: [
      { to: '/finance/inventory', label: 'Ombor', icon: Package },
      { to: '/finance/stock-issues', label: 'Material berish', icon: Boxes },
    ]},
    { label: 'Tahlil', items: [
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  FACILITY: [
    { items: [
      { to: '/facility/work-orders', label: 'Work orderlar', icon: ClipboardList },
      { to: '/facility/material-requests', label: 'Material so\'rovlari', icon: Package },
    ]},
    { label: 'Boshqa', items: [
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  WAREHOUSE_OPERATOR: [
    { items: [
      { to: '/finance/inventory', label: 'Ombor', icon: Package },
      { to: '/finance/stock-issues', label: 'Material berish', icon: Boxes },
    ]},
    { label: 'Boshqa', items: [
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  CONTENT_OPERATOR: [
    { items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2 },
      { to: '/management/floor-plans', label: 'Reja importi', icon: MapPin },
      { to: '/management/visual-settings', label: 'Vizual sozlamalar', icon: Eye },
    ]},
    { label: 'Boshqa', items: [
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  ADMIN: [
    { items: [
      { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
      { to: '/admin/users', label: 'Foydalanuvchilar', icon: ShieldCheck },
      { to: '/admin/roles', label: 'Rollar va huquqlar', icon: KeyRound },
    ]},
    { label: 'Texnik', items: [
      { to: '/admin/login-history', label: 'Kirish tarixi', icon: History },
      { to: '/admin/audit', label: 'Audit jurnali', icon: FileText },
      { to: '/admin/monitoring', label: 'Monitoring', icon: Activity },
      { to: '/admin/backups', label: 'Rezerv nusxalar', icon: Database },
      { to: '/admin/notification-templates', label: 'Shablonlar', icon: FileBarChart },
    ]},
  ],
  TENANT_OWNER: [
    { items: [
      { to: '/cabinet', label: 'Mening kabinetim', icon: Home },
      { to: '/cabinet/units', label: 'Mening unitlarim', icon: Layers },
    ]},
    { label: 'Hujjatlar', items: [
      { to: '/cabinet/applications', label: 'Ariza va hujjatlar', icon: FileText },
      { to: '/cabinet/contracts', label: 'Shartnomalarim', icon: ScrollText },
    ]},
    { label: 'Boshqa', items: [
      { to: '/cabinet/services', label: 'Hisob va servis', icon: ClipboardList },
      { to: '/cabinet/meter-readings', label: 'Hisoblagichlar', icon: Gauge },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
}

const groupedNav = computed(() => allNavItems[currentRole.value] || allNavItems.SUPER_HEAD)

const pageTitles: Record<string, string> = {
  '/dashboard/executive': 'Global Dashboard',
  '/dashboard/building': 'Bino Dashboard',
  '/management/buildings': 'Binolar',
  '/management/units': 'Unitlar',
  '/management/listings': 'Listinglar',
  '/management/applications': 'Arizalar',
  '/management/service-requests': 'Servis so\'rovlari',
  '/contracts': 'Shartnomalar',
  '/finance/periods': 'Moliya davrlari',
  '/finance/invoices': 'Invoyslar',
  '/finance/debts': 'Qarzdorlik',
  '/finance/approvals': 'Tasdiqlar',
  '/finance/inventory': 'Ombor',
  '/finance/stock-issues': 'Material berish',
  '/facility/work-orders': 'Work orderlar',
  '/facility/material-requests': 'Material so\'rovlari',
  '/cabinet': 'Mening kabinetim',
  '/cabinet/units': 'Mening unitlarim',
  '/cabinet/applications': 'Ariza va hujjatlar',
  '/cabinet/contracts': 'Shartnomalarim',
  '/cabinet/services': 'Hisob va servis',
  '/cabinet/meter-readings': 'Hisoblagichlar',
  '/reports': 'Hisobotlar',
  '/admin/audit': 'Audit jurnali',
  '/notifications': 'Bildirishnomalar',
  '/admin/settings': 'Sozlamalar',
  '/admin/users': 'Foydalanuvchilar',
  '/admin/roles': 'Rollar va huquqlar',
  '/management/floor-plans': 'Reja importi',
  '/management/visual-settings': 'Vizual sozlamalar',
  '/meters': 'Hisoblagichlar',
}

const currentPageTitle = computed(() => {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (route.path.includes(path)) return title
  }
  return 'Boshqaruv paneli'
})

function isActive(path: string) {
  return route.path.includes(path)
}

function handleLogout() {
  authStore.logout()
}
</script>
