<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Sidebar -->
    <aside class="fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'" style="width: 240px;">
      <div class="h-full flex flex-col admin-sidebar">
        <div class="h-[56px] flex items-center gap-2.5 px-5 flex-shrink-0">
          <div class="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white text-sm">M</div>
          <div>
            <div class="font-bold text-sm text-ink-900 dark:text-white leading-none">MAKON</div>
            <div class="text-[10px] text-ink-400 mt-0.5">{{ currentRoleShort }}</div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto py-2 px-2.5 tg-hide-scrollbar">
          <template v-for="(group, gi) in groupedNav" :key="gi">
            <div v-if="group.label" class="sidebar-group-label">{{ group.label }}</div>
            <NuxtLink
              v-for="item in group.items" :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[13px] transition-colors"
              :class="isActive(item.to) ? 'admin-sidebar-item-active' : 'admin-sidebar-item'"
              @click="sidebarOpen = false"
            >
              <component :is="item.icon" :size="16" :class="isActive(item.to) ? 'text-brand-500' : 'opacity-60'" />
              <span>{{ item.label }}</span>
              <span v-if="item.badge" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/15 text-red-500">{{ item.badge }}</span>
            </NuxtLink>
          </template>
        </nav>

        <div class="p-2.5 flex-shrink-0">
          <button @click="handleLogout" class="w-full flex items-center gap-3 px-3 py-2 rounded-[10px] text-sm admin-sidebar-item transition-colors">
            <div class="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-xs font-bold text-white">A</div>
            <div class="flex-1 text-left min-w-0">
              <div class="text-[13px] font-medium text-ink-900 dark:text-white truncate">Admin User</div>
              <div class="text-[11px] text-ink-500">Chiqish</div>
            </div>
            <LogOut :size="15" class="text-ink-400" />
          </button>
        </div>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 z-30 lg:hidden" @click="sidebarOpen = false" />

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-[56px] sticky top-0 z-20 glass border-b border-black/5 dark:border-white/5 flex items-center px-4 lg:px-6 gap-3">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-black/5 text-ink-500">
          <Menu :size="20" />
        </button>
        <div class="hidden md:flex items-center gap-2 text-sm">
          <span class="text-ink-400">{{ currentRoleShort }}</span>
          <ChevronRight :size="14" class="text-ink-300" />
          <span class="text-ink-900 dark:text-white font-semibold">{{ currentPageTitle }}</span>
        </div>
        <div class="flex-1" />
        <ThemeToggle />
      </header>

      <main class="flex-1 p-4 lg:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, Building2, FileText, Receipt, Wallet, ClipboardList, Package, Gauge,
  BarChart3, Bell, Menu, Settings, ShieldCheck, ScrollText, Layers, Tag,
  Calendar, ClipboardCheck, History, Activity, Database, LogOut, KeyRound,
  MapPin, Eye, Boxes, Home, FileBarChart, ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')

const roleLabels: Record<string, string> = {
  ADMIN: 'Admin', SUPER_HEAD: 'Super Rahbar', BUILDING_MANAGER: 'Bino Rahbari',
  ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi',
  TENANT_OWNER: 'Ijarachi'
}
const currentRoleShort = computed(() => roleLabels[currentRole.value] || 'Admin')

const allNavItems: Record<string, { label?: string; items: any[] }[]> = {
  SUPER_HEAD: [
    { items: [{ to: '/dashboard/executive', label: 'Dashboard', icon: LayoutDashboard }]},
    { label: 'Boshqaruv', items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2 },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Tahlil', items: [
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
    ]},
  ],
  BUILDING_MANAGER: [
    { items: [{ to: '/dashboard/building', label: 'Dashboard', icon: LayoutDashboard }]},
    { label: 'Boshqaruv', items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2 },
      { to: '/management/units', label: 'Unitlar', icon: Layers },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
      { to: '/management/service-requests', label: 'Servis', icon: ClipboardList },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Boshqa', items: [
      { to: '/meters', label: 'Hisoblagichlar', icon: Gauge },
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
    ]},
  ],
  ACCOUNTANT: [
    { items: [
      { to: '/finance/periods', label: 'Davrlar', icon: Calendar },
      { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
    ]},
    { label: 'Nazorat', items: [
      { to: '/finance/debts', label: 'Qarzdorlik', icon: Wallet },
      { to: '/finance/approvals', label: 'Tasdiqlar', icon: ClipboardCheck },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
    ]},
    { label: 'Ombor', items: [
      { to: '/finance/inventory', label: 'Ombor', icon: Package },
      { to: '/finance/stock-issues', label: 'Material', icon: Boxes },
    ]},
  ],
  FACILITY: [
    { items: [
      { to: '/facility/work-orders', label: 'Work orderlar', icon: ClipboardList },
      { to: '/facility/material-requests', label: 'Material so\'rovlari', icon: Package },
    ]},
  ],
  ADMIN: [
    { items: [
      { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
      { to: '/admin/users', label: 'Foydalanuvchilar', icon: ShieldCheck },
      { to: '/admin/roles', label: 'Rollar', icon: KeyRound },
    ]},
    { label: 'Texnik', items: [
      { to: '/admin/audit', label: 'Audit', icon: History },
      { to: '/admin/monitoring', label: 'Monitoring', icon: Activity },
      { to: '/admin/backups', label: 'Rezerv', icon: Database },
    ]},
  ],
  TENANT_OWNER: [
    { items: [
      { to: '/cabinet', label: 'Kabinet', icon: Home },
      { to: '/cabinet/units', label: 'Unitlarim', icon: Layers },
      { to: '/cabinet/applications', label: 'Arizalar', icon: FileText },
      { to: '/cabinet/contracts', label: 'Shartnomalarim', icon: ScrollText },
      { to: '/cabinet/service-requests', label: 'Servis', icon: ClipboardList },
    ]},
  ],
}

const groupedNav = computed(() => allNavItems[currentRole.value] || allNavItems.SUPER_HEAD)

const pageTitles: Record<string, string> = {
  '/dashboard/executive': 'Global Dashboard',
  '/dashboard/building': 'Bino Dashboard',
  '/management/buildings': 'Binolar',
  '/management/units': 'Unitlar',
  '/management/applications': 'Arizalar',
  '/contracts': 'Shartnomalar',
  '/finance/periods': 'Moliya davrlari',
  '/finance/invoices': 'Invoyslar',
  '/finance/debts': 'Qarzdorlik',
  '/finance/approvals': 'Tasdiqlar',
  '/finance/inventory': 'Ombor',
  '/finance/stock-issues': 'Material berish',
  '/facility/work-orders': 'Work orderlar',
  '/facility/material-requests': 'Material so\'rovlari',
  '/admin/settings': 'Sozlamalar',
  '/admin/users': 'Foydalanuvchilar',
  '/admin/roles': 'Rollar',
  '/admin/audit': 'Audit jurnali',
  '/cabinet': 'Kabinet',
  '/cabinet/units': 'Unitlarim',
  '/cabinet/applications': 'Arizalar',
  '/cabinet/contracts': 'Shartnomalarim',
  '/cabinet/service-requests': 'Servis so\'rovlari',
  '/reports': 'Hisobotlar',
  '/notifications': 'Bildirishnomalar',
  '/meters': 'Hisoblagichlar',
}

const currentPageTitle = computed(() => {
  for (const [path, title] of Object.entries(pageTitles)) {
    if (route.path === path || route.path.startsWith(path + '/')) return title
  }
  return 'MAKON'
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

function handleLogout() {
  authStore?.logout?.()
  navigateTo('/login')
}
</script>
