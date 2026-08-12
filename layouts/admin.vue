<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Premium Collapsible Sidebar -->
    <aside
      class="fixed lg:sticky top-0 left-0 h-screen z-40 sidebar-transition overflow-hidden"
      :style="{ width: sidebarCollapsed ? '68px' : '256px' }"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="h-full flex flex-col admin-sidebar-premium">
        <!-- Logo -->
        <div class="h-[60px] flex items-center gap-3 flex-shrink-0 px-4">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center font-bold text-white text-base flex-shrink-0 shadow-lg shadow-blue-500/20">M</div>
          <div v-if="!sidebarCollapsed" class="overflow-hidden">
            <div class="font-bold text-[15px] text-white leading-none tracking-tight">MAKON</div>
            <div class="text-[10px] text-blue-300/50 mt-1 font-medium tracking-wide uppercase">{{ roleLabel }}</div>
          </div>
        </div>

        <!-- Collapse Toggle -->
        <button
          @click="toggleCollapse"
          class="hidden lg:flex items-center justify-center py-2.5 mx-3 mb-1 rounded-xl text-blue-300/40 hover:text-white hover:bg-white/5 transition-all"
        >
          <component :is="sidebarCollapsed ? ChevronRight : ChevronLeft" :size="16" />
        </button>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-2 px-3 sidebar-nav-scroll">
          <template v-for="(group, gi) in filteredNav" :key="gi">
            <div v-if="!sidebarCollapsed && group.items.length > 0" class="sidebar-group-label">{{ group.label }}</div>
            <NuxtLink
              v-for="item in group.items" :key="item.to"
              :to="item.to"
              class="sidebar-link"
              :class="isActive(item.to) ? 'sidebar-link--active' : ''"
              @click="sidebarOpen = false"
              :title="sidebarCollapsed ? item.label : ''"
            >
              <component :is="item.icon" :size="19" class="sidebar-link__icon" />
              <span v-if="!sidebarCollapsed" class="sidebar-link__label">{{ item.label }}</span>
              <span v-if="item.badge && !sidebarCollapsed" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/90 text-white">{{ item.badge }}</span>
              <span v-if="item.badge && sidebarCollapsed" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#0E1B33]"></span>
            </NuxtLink>
          </template>
        </nav>

        <!-- User / Logout -->
        <div class="p-3 flex-shrink-0 border-t border-white/5">
          <button @click="handleLogout" class="sidebar-user-btn">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-md shadow-blue-500/20">{{ userInitial }}</div>
            <div v-if="!sidebarCollapsed" class="flex-1 text-left min-w-0 overflow-hidden">
              <div class="text-[13px] font-semibold text-white truncate">{{ userName }}</div>
              <div class="text-[11px] text-blue-300/40 flex items-center gap-1 mt-0.5">
                <LogOut :size="11" /> Chiqish
              </div>
            </div>
            <LogOut v-if="!sidebarCollapsed" :size="15" class="text-blue-300/30 hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main Content -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Header -->
      <header class="h-[60px] sticky top-0 z-20 glass border-b border-black/5 dark:border-white/5 flex items-center px-4 lg:px-6 gap-3">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-ink-500 transition-colors">
          <Menu :size="20" />
        </button>

        <!-- Breadcrumb -->
        <div class="hidden md:flex items-center gap-2.5 text-sm">
          <span class="text-ink-400 font-medium">{{ roleLabel }}</span>
          <ChevronRight :size="14" class="text-ink-300" />
          <span class="text-ink-900 dark:text-white font-semibold">{{ pageTitle }}</span>
        </div>

        <!-- Mobile title -->
        <div class="md:hidden font-semibold text-ink-900 dark:text-white">{{ pageTitle }}</div>

        <div class="flex-1" />

        <!-- Quick Stats -->
        <div class="hidden lg:flex items-center gap-3 mr-2">
          <div class="stat-pill stat-pill--success">
            <div class="stat-pill__dot bg-emerald-500"></div>
            <span>Tizim faol</span>
          </div>
        </div>

        <RoleSwitcher v-if="currentRole === 'SUPER_HEAD' || currentRole === 'ADMIN'" />
        <ThemeToggle />
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6 page-enter-active">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, Building2, FileText, ScrollText, Receipt, Settings,
  Menu, LogOut, ChevronRight, ChevronLeft, Users, Wrench,
  Wallet, BarChart3, Bell, Shield, Activity, Database, FileSignature, CheckSquare, Gauge, UserCircle,
  Package, Boxes, ClipboardList, Boxes as Inventory, Home, CreditCard,
  FileSpreadsheet, Layers, Eye, Grid3x3
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(true)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')

onMounted(() => {
  const saved = localStorage.getItem('makon-sidebar-collapsed')
  if (saved !== null) sidebarCollapsed.value = saved === 'true'
})

function toggleCollapse() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('makon-sidebar-collapsed', String(sidebarCollapsed.value))
}

const roleLabels: Record<string,string> = {
  ADMIN: 'Administrator', SUPER_HEAD: 'Super Rahbar', BUILDING_MANAGER: 'Bino Rahbari',
  ACCOUNTANT: 'Buxgalter', FACILITY: 'Pudratchi', TENANT_OWNER: 'Ijarachi',
  WAREHOUSE_OPERATOR: 'Omborchi', CONTENT_OPERATOR: 'Kontent Operator'
}
const roleLabel = computed(() => roleLabels[currentRole.value] || 'Admin')

// ═══ Role-based navigation ═══
// Each role sees ONLY their modules
const allNavGroups = [
  {
    label: 'Asosiy',
    items: [
      { to: '/dashboard/executive', label: 'Dashboard', icon: LayoutDashboard, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/dashboard/building', label: 'Bino Dashboard', icon: LayoutDashboard, roles: ['BUILDING_MANAGER'] },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'CONTENT_OPERATOR'] },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'] },
      { to: '/management/tenants', label: 'Ijarachilar', icon: Users, roles: ['SUPER_HEAD', 'BUILDING_MANAGER'] },
      { to: '/cabinet/units', label: 'Mening unitlarim', icon: Home, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/applications', label: 'Mening arizalarim', icon: FileText, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/contracts', label: 'Mening shartnomalarim', icon: ScrollText, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/services', label: 'Mening xizmatlarim', icon: Wrench, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/service-requests', label: 'Servis so\'rovlari', icon: ClipboardList, roles: ['TENANT_OWNER'] },
    ]
  },
  {
    label: 'Boshqaruv',
    items: [
      { to: '/management/buildings', label: 'Binolar', icon: Building2, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'] },
      { to: '/management/listings', label: 'Listinglar', icon: FileSignature, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'] },
      { to: '/management/floor-plans', label: 'Qavat rejalar', icon: Layers, roles: ['SUPER_HEAD', 'CONTENT_OPERATOR'] },
      { to: '/management/visual-settings', label: 'Vizual sozlamalar', icon: Eye, roles: ['SUPER_HEAD', 'CONTENT_OPERATOR'] },
      { to: '/finance/invoices', label: 'Invoyslar', icon: CreditCard, roles: ['SUPER_HEAD', 'ADMIN', 'ACCOUNTANT'] },
      { to: '/finance/periods', label: 'Moliya davrlar', icon: Wallet, roles: ['SUPER_HEAD', 'ADMIN', 'ACCOUNTANT'] },
      { to: '/finance/debts', label: 'Qarzlar', icon: FileSpreadsheet, roles: ['SUPER_HEAD', 'ACCOUNTANT'] },
      { to: '/facility/work-orders', label: 'Work order', icon: Wrench, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/management/service-requests', label: 'Servis so\'rovlar', icon: ClipboardList, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/finance/inventory', label: 'Inventar', icon: Boxes, roles: ['SUPER_HEAD', 'ADMIN', 'WAREHOUSE_OPERATOR'] },
      { to: '/finance/stock-issues', label: 'Ombor chiqimlari', icon: Package, roles: ['SUPER_HEAD', 'ADMIN', 'WAREHOUSE_OPERATOR'] },
      { to: '/management/contracts', label: 'Boshqaruv shartnomalar', icon: ScrollText, roles: ['SUPER_HEAD', 'BUILDING_MANAGER'] },
      { to: '/management/units', label: 'Unit boshqaruvi', icon: Grid3x3, roles: ['SUPER_HEAD', 'BUILDING_MANAGER'] },
      { to: '/finance/approvals', label: 'Tasdiqlar', icon: CheckSquare, roles: ['SUPER_HEAD', 'ACCOUNTANT'] },
      { to: '/facility/material-requests', label: 'Material so\'rovlari', icon: Package, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/meters', label: 'Sanoqchilar', icon: Gauge, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/eri/signatures', label: 'ERI imzolar', icon: FileSignature, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'] },
    ]
  },
  {
    label: 'Tizim',
    items: [
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3, roles: ['SUPER_HEAD', 'ADMIN', 'ACCOUNTANT'] },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'] },
      { to: '/admin/users', label: 'Foydalanuvchilar', icon: Users, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/roles', label: 'Rollar', icon: Shield, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/audit', label: 'Audit', icon: Shield, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/monitoring', label: 'Monitoring', icon: Activity, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/backups', label: 'Rezerv nusxa', icon: Database, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/notification-templates', label: 'Shablonlar', icon: Bell, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/login-history', label: 'Kirish tarixi', icon: Shield, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/settings', label: 'Sozlamalar', icon: Settings, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/profile', label: 'Profil', icon: UserCircle, roles: ['SUPER_HEAD', 'ADMIN', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'] },
    ]
  }
]

const filteredNav = computed(() => {
  return allNavGroups.map(g => ({
    ...g,
    items: g.items.filter(item => item.roles.includes(currentRole.value))
  })).filter(g => g.items.length > 0)
})

const titles: Record<string,string> = {
  '/dashboard/executive': 'Dashboard', '/dashboard/building': 'Bino Dashboard',
  '/management/buildings': 'Binolar', '/management/applications': 'Arizalar',
  '/contracts': 'Shartnomalar', '/management/tenants': 'Ijarachilar',
  '/management/listings': 'Listinglar', '/finance/invoices': 'Invoyslar',
  '/finance/periods': 'Moliya Davrlar', '/finance/debts': 'Qarzlar',
  '/finance/inventory': 'Inventar', '/finance/stock-issues': 'Ombor Chiqimlari',
  '/facility/work-orders': 'Texnik Xizmat', '/reports': 'Hisobotlar',
  '/notifications': 'Bildirishnomalar',
  '/admin/audit': 'Audit', '/admin/monitoring': 'Monitoring',
  '/admin/settings': 'Sozlamalar', '/admin/users': 'Foydalanuvchilar',
  '/admin/roles': 'Rollar', '/admin/backups': 'Rezerv Nusxalar',
  '/admin/notification-templates': 'Shablonlar', '/admin/login-history': 'Kirish Tarixi',
  '/management/service-requests': 'Servis So\'rovlar',
  '/management/floor-plans': 'Qavat Rejalar', '/management/visual-settings': 'Vizual Sozlamalar',
  '/cabinet/units': 'Mening Unitlarim', '/cabinet/applications': 'Mening Arizalarim',
  '/cabinet/services': 'Mening Servislarim', '/profile': 'Profil',
}
const pageTitle = computed(() => {
  for (const [p, t] of Object.entries(titles)) {
    if (route.path === p || route.path.startsWith(p + '/')) return t
  }
  return 'MAKON'
})

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

const userName = computed(() => authStore?.user?.fullName || 'Admin User')
const userInitial = computed(() => (userName.value || 'A').charAt(0).toUpperCase())

function handleLogout() {
  authStore?.logout?.()
  navigateTo('/login')
}
</script>
