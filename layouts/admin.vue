<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Premium Collapsible Sidebar -->
    <aside
      class="fixed lg:sticky top-0 left-0 h-screen z-40 sidebar-transition overflow-hidden admin-sidebar-premium"
      :style="{ width: sidebarCollapsed ? '72px' : '260px' }"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="h-full flex flex-col admin-sidebar-premium">
        <!-- Logo -->
        <div class="sidebar-logo-row" :class="{ 'sidebar-logo-row--collapsed': sidebarCollapsed }">
          <div class="sidebar-logo-icon">M</div>
          <div v-if="!sidebarCollapsed" class="overflow-hidden">
            <div class="sidebar-logo-text">MAKON</div>
            <div class="sidebar-logo-role">{{ roleLabel }}</div>
          </div>
        </div>

        <!-- Collapse Toggle -->
        <button @click="toggleCollapse" class="sidebar-collapse-btn">
          <component :is="sidebarCollapsed ? ChevronRight : ChevronLeft" :size="16" />
        </button>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto sidebar-nav-scroll px-3 py-2">
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
              <span v-if="item.badge && !sidebarCollapsed" class="sidebar-link__badge">{{ item.badge }}</span>
              <span v-if="item.badge && sidebarCollapsed" class="sidebar-link__badge--dot"></span>
            </NuxtLink>
          </template>
        </nav>

        <!-- User / Logout -->
        <div class="sidebar-user-section">
          <button @click="handleLogout" class="sidebar-user-btn">
            <div class="sidebar-user-avatar">{{ userInitial }}</div>
            <div v-if="!sidebarCollapsed" class="flex-1 text-left min-w-0 overflow-hidden">
              <div class="sidebar-user-name">{{ userName }}</div>
              <div class="sidebar-user-logout"><LogOut :size="11" /> Chiqish</div>
            </div>
            <LogOut v-if="!sidebarCollapsed" :size="15" class="sidebar-user-logout-icon" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" @click="sidebarOpen = false" />

    <!-- Main Content -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Premium Header -->
      <header class="admin-header">
        <button @click="sidebarOpen = !sidebarOpen" class="admin-header__mobile-menu lg:hidden">
          <Menu :size="20" />
        </button>

        <div class="admin-header__crumb hidden md:flex">
          <span class="admin-header__crumb-role">{{ roleLabel }}</span>
          <ChevronRight :size="14" class="admin-header__crumb-sep" />
          <span class="admin-header__crumb-page">{{ pageTitle }}</span>
        </div>
        <div class="md:hidden admin-header__mobile-title">{{ pageTitle }}</div>

        <div class="flex-1" />

        <!-- Global Search -->
        <div class="admin-header__search hidden md:flex">
          <Search :size="16" class="admin-header__search-icon" />
          <input v-model="searchQuery" type="text" placeholder="Qidirish..." class="admin-header__search-input" />
          <kbd class="admin-header__search-kbd">⌘K</kbd>
        </div>

        <!-- Status -->
        <div class="admin-header__status hidden lg:flex">
          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span>Tizim faol</span>
        </div>

        <!-- Notifications -->
        <button class="admin-header__icon-btn" @click="toggleNotifs">
          <Bell :size="18" />
          <span class="admin-header__icon-badge">3</span>
        </button>

        <div v-if="showNotifs" class="admin-notif-dropdown">
          <div class="admin-notif-dropdown__head">
            <span>Bildirishnomalar</span>
            <button class="text-xs text-blue-500 hover:text-blue-600 font-medium">Barchasi</button>
          </div>
          <div class="admin-notif-dropdown__list">
            <div v-for="n in notifications" :key="n.id" class="admin-notif-dropdown__item">
              <div class="admin-notif-dropdown__icon" :class="`admin-notif-dropdown__icon--${n.type}`">
                <component :is="n.icon" :size="14" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="admin-notif-dropdown__text">{{ n.text }}</div>
                <div class="admin-notif-dropdown__time">{{ n.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="admin-header__divider hidden sm:block"></div>
        
        <div class="admin-header__divider hidden sm:block"></div>

        <!-- User Avatar -->
        <button class="admin-header__avatar-btn" @click="toggleUserMenu">
          <div class="admin-header__avatar">{{ userInitial }}</div>
          <ChevronDown :size="14" class="admin-header__avatar-chevron hidden sm:block" />
        </button>

        <div v-if="showUserMenu" class="admin-user-dropdown">
          <div class="admin-user-dropdown__head">
            <div class="admin-user-dropdown__avatar">{{ userInitial }}</div>
            <div class="min-w-0">
              <div class="admin-user-dropdown__name">{{ userName }}</div>
              <div class="admin-user-dropdown__role">{{ roleLabel }}</div>
            </div>
          </div>
          <div class="admin-user-dropdown__menu">
            <NuxtLink to="/profile" class="admin-user-dropdown__item" @click="showUserMenu = false">
              <UserCircle :size="16" /> Profil
            </NuxtLink>
            <NuxtLink to="/notifications" class="admin-user-dropdown__item" @click="showUserMenu = false">
              <Bell :size="16" /> Bildirishnomalar
            </NuxtLink>
            <NuxtLink to="/admin/settings" class="admin-user-dropdown__item" @click="showUserMenu = false">
              <Settings :size="16" /> Sozlamalar
            </NuxtLink>
            <div class="admin-user-dropdown__divider"></div>
            <button @click="handleLogout" class="admin-user-dropdown__item admin-user-dropdown__item--danger">
              <LogOut :size="16" /> Chiqish
            </button>
          </div>
        </div>
      </header>

      <div v-if="showNotifs || showUserMenu" class="fixed inset-0 z-25" @click="showNotifs = false; showUserMenu = false" />

      <!-- Page Content -->
      <main class="flex-1 p-4 lg:p-6 page-enter-active" style="animation: pageEnter 0.4s cubic-bezier(0.22, 1, 0.36, 1);">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, Building2, FileText, ScrollText, Receipt, Settings,
  Menu, LogOut, ChevronRight, ChevronLeft, ChevronDown, Users, Wrench,
  Wallet, BarChart3, Bell, Shield, Activity, Database, FileSignature, CheckSquare, Gauge, UserCircle,
  Package, Boxes, ClipboardList, Boxes as Inventory, Home, CreditCard,
  FileSpreadsheet, Layers, Eye, Grid3x3, Search, AlertCircle, CheckCircle
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')
const searchQuery = ref('')
const showNotifs = ref(false)
const showUserMenu = ref(false)

const notifications = [
  { id: 1, type: 'success', icon: CheckCircle, text: 'Invoys INV-2026-052 tasdiqlandi', time: '5 daq oldin' },
  { id: 2, type: 'info', icon: FileText, text: 'Shartnoma CTR-2026-010 imzolandi', time: '20 daq oldin' },
  { id: 3, type: 'warning', icon: AlertCircle, text: 'Servis so\'rov SR-2026-004 yangilandi', time: '1 soat oldin' },
  { id: 4, type: 'info', icon: Bell, text: 'Shartnoma CTR-2026-002 muddati tugayapti', time: '2 soat oldin' },
]

function toggleNotifs() { showNotifs.value = !showNotifs.value; showUserMenu.value = false }
function toggleUserMenu() { showUserMenu.value = !showUserMenu.value; showNotifs.value = false }

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

const allNavGroups = [
  {
    label: 'Asosiy',
    items: [
      { to: '/dashboard/executive', label: 'Boshqaruv paneli', icon: LayoutDashboard, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/dashboard/building', label: 'Bino Dashboard', icon: LayoutDashboard, roles: ['BUILDING_MANAGER'] },
      { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'CONTENT_OPERATOR'] },
      { to: '/contracts', label: 'Shartnomalar', icon: ScrollText, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT'] },
      { to: '/management/tenants', label: 'Ijarachilar', icon: Users, roles: ['SUPER_HEAD', 'BUILDING_MANAGER'] },
      { to: '/cabinet', label: 'Mening kabinetim', icon: LayoutDashboard, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/units', label: 'Mening unitlarim', icon: Home, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/applications', label: 'Mening arizalarim', icon: FileText, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/contracts', label: 'Mening shartnomalarim', icon: ScrollText, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/services', label: 'Mening xizmatlarim', icon: Wrench, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/service-requests', label: 'Servis so\'rovlari', icon: ClipboardList, roles: ['TENANT_OWNER'] },
      { to: '/cabinet/meter-readings', label: 'Sanoqchilar', icon: Gauge, roles: ['TENANT_OWNER'] },
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
      { to: '/facility/work-orders', label: 'Ish buyrug\'i', icon: Wrench, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/facility/material-requests', label: 'Material sôrovlari', icon: Package, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/management/service-requests', label: 'Servis so\'rovlar', icon: ClipboardList, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'FACILITY'] },
      { to: '/finance/inventory', label: 'Inventar', icon: Boxes, roles: ['SUPER_HEAD', 'ADMIN', 'WAREHOUSE_OPERATOR'] },
      { to: '/finance/stock-issues', label: 'Ombor chiqimlari', icon: Package, roles: ['SUPER_HEAD', 'ADMIN', 'WAREHOUSE_OPERATOR'] },
      { to: '/management/contracts', label: 'Boshqaruv shartnomalar', icon: ScrollText, roles: ['SUPER_HEAD', 'BUILDING_MANAGER'] },
      { to: '/management/units', label: 'Unit boshqaruvi', icon: Grid3x3, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'CONTENT_OPERATOR'] },
      { to: '/finance/approvals', label: 'Tasdiqlar', icon: CheckSquare, roles: ['SUPER_HEAD', 'ACCOUNTANT'] },
    ]
  },
  {
    label: 'Tahlil',
    items: [
      { to: '/reports', label: 'Hisobotlar', icon: BarChart3, roles: ['SUPER_HEAD', 'ADMIN', 'ACCOUNTANT'] },
      { to: '/notifications', label: 'Bildirishnomalar', icon: Bell, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'TENANT_OWNER', 'FACILITY'] },
    ]
  },
  {
    label: 'Tizim',
    items: [
      { to: '/admin/audit', label: 'Audit', icon: Shield, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/monitoring', label: 'Monitoring', icon: Activity, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/users', label: 'Foydalanuvchilar', icon: Users, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/roles', label: 'Rollar', icon: Shield, roles: ['SUPER_HEAD'] },
      { to: '/admin/notification-templates', label: 'Shablonlar', icon: FileText, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/login-history', label: 'Kirish tarixi', icon: Database, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/admin/backups', label: 'Rezerv nusxalar', icon: Database, roles: ['SUPER_HEAD'] },
      { to: '/admin/settings', label: 'Sozlamalar', icon: Settings, roles: ['SUPER_HEAD', 'ADMIN'] },
      { to: '/profile', label: 'Profil', icon: UserCircle, roles: ['SUPER_HEAD', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR', 'ADMIN'] },
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
  '/dashboard/executive': 'Boshqaruv paneli', '/dashboard/building': 'Bino paneli',
  '/management/buildings': 'Binolar', '/management/applications': 'Arizalar',
  '/applications': 'Arizalar',
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
  '/cabinet/meter-readings': 'Sanoqchilar',
  '/management/service-requests': 'Servis So\'rovlar',
  '/management/floor-plans': 'Qavat Rejalar',
  '/facility/material-requests': 'Material Sôrovlari',
  '/meters': 'Sanoqchilar',
  '/didox/signatures': 'Didox Imzolar', '/management/visual-settings': 'Vizual Sozlamalar',
  '/management/contracts': 'Shartnomalar',
  '/management/units': 'Unit Boshqaruvi',
  '/finance/approvals': 'Tasdiqlar',
  '/cabinet': 'Mening Kabinetim',
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

<style scoped>
.admin-sidebar-premium { background: #0a0e1a; }
.sidebar-logo-row {
  height: 64px; display: flex; align-items: center; gap: 12px;
  flex-shrink: 0; padding: 0 20px;
  transition: padding 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.sidebar-logo-row--collapsed { padding: 0; justify-content: center; }
.sidebar-logo-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: linear-gradient(135deg, #2563EB, #1d4ed8);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 18px; color: white; flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}
.sidebar-logo-text { font-weight: 800; font-size: 16px; color: #f1f5f9; letter-spacing: -0.02em; line-height: 1; }
.sidebar-logo-role { font-size: 10px; color: #2563eb; margin-top: 4px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }

.sidebar-collapse-btn {
  display: none; align-items: center; justify-content: center;
  padding: 10px; margin: 0 12px 4px; border-radius: 12px;
  color: #64748b; transition: all 0.2s;
}
.sidebar-collapse-btn:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }
@media (min-width: 1024px) { .sidebar-collapse-btn { display: flex; } }

.sidebar-group-label {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.08em; color: #475569; padding: 16px 14px 6px;
}

.sidebar-link {
  display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px;
  color: #94a3b8; font-size: 14px; font-weight: 500;
  text-decoration: none; transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative; margin-bottom: 2px;
}
.sidebar-link:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }
.sidebar-link--active {
  background: rgba(37,99,235,0.15);
  color: #60a5fa; box-shadow: none;
}
.sidebar-link--active::before {
  content: ''; position: absolute; left: -3px; top: 50%;
  transform: translateY(-50%); width: 3px; height: 24px;
  background: linear-gradient(180deg, #60A5FA, #2563EB); border-radius: 0 3px 3px 0;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.4);
}
.sidebar-link__icon { flex-shrink: 0; transition: transform 0.2s; }
.sidebar-link:hover .sidebar-link__icon { transform: scale(1.1); }
.sidebar-link__label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; flex: 1; }
.sidebar-link__badge { margin-left: auto; padding: 2px 8px; font-size: 11px; font-weight: 700; border-radius: 100px; background: #ef4444; color: white; }
.sidebar-link__badge--dot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 0 2px #0a0e1a; }

.sidebar-nav-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-nav-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
.sidebar-nav-scroll::-webkit-scrollbar-track { background: transparent; }

.sidebar-user-section { padding: 12px; flex-shrink: 0; border-top: 1px solid rgba(255,255,255,0.06); }
.sidebar-user-btn { display: flex; align-items: center; gap: 12px; width: 100%; padding: 10px 12px; border-radius: 14px; transition: all 0.2s; }
.sidebar-user-btn:hover { background: rgba(255,255,255,0.04); }
.sidebar-user-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #2563EB); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; box-shadow: 0 2px 10px rgba(37,99,235,0.25); }
.sidebar-user-name { font-size: 13px; font-weight: 600; color: #e2e8f0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user-logout { font-size: 11px; color: #94a3b8; display: flex; align-items: center; gap: 4px; margin-top: 2px; }
.sidebar-user-logout-icon { color: #cbd5e1; transition: color 0.2s; }
.sidebar-user-logout-icon:hover { color: #ef4444; }
.sidebar-transition { transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1); }

/* Header */
.admin-header {
  height: 64px; position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; padding: 0 16px; gap: 12px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
}

.admin-header__mobile-menu { padding: 10px; border-radius: 12px; color: #475569; transition: all 0.2s; }
.admin-header__mobile-menu:hover { background: rgba(0,0,0,0.05); }

.admin-header__crumb { display: flex; align-items: center; gap: 8px; }
.admin-header__crumb-role { padding: 4px 10px; border-radius: 8px; background: rgba(15, 23, 42, 0.05); color: #94a3b8; font-size: 12px; font-weight: 500; letter-spacing: 0.02em; }
.admin-header__crumb-sep { color: #cbd5e1; flex-shrink: 0; }
.admin-header__crumb-page { color: #0f172a; font-size: 14px; font-weight: 600; }
.admin-header__mobile-title { font-weight: 600; font-size: 15px; color: #0f172a; }

.admin-header__search { display: flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 12px; background: rgba(15, 23, 42, 0.04); border: 1px solid rgba(15, 23, 42, 0.06); width: 240px; transition: all 0.2s; }
.admin-header__search:focus-within { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08); width: 280px; }
.admin-header__search-icon { color: #94a3b8; flex-shrink: 0; }
.admin-header__search-input { flex: 1; border: none; background: transparent; outline: none; font-size: 13px; color: #0f172a; font-family: 'Inter', sans-serif; }
.admin-header__search-input::placeholder { color: #94a3b8; }
.admin-header__search-kbd { padding: 2px 6px; border-radius: 5px; background: rgba(15, 23, 42, 0.06); color: #94a3b8; font-size: 10px; font-weight: 600; }

.admin-header__status { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.12); font-size: 12px; font-weight: 600; color: #059669; }

.admin-header__icon-btn { position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 12px; color: #475569; transition: all 0.2s; }
.admin-header__icon-btn:hover { background: rgba(15, 23, 42, 0.05); color: #0f172a; }
.admin-header__icon-badge { position: absolute; top: 6px; right: 6px; width: 16px; height: 16px; border-radius: 50%; background: #ef4444; color: white; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid white; }

.admin-header__divider { width: 1px; height: 28px; background: rgba(15, 23, 42, 0.08); }

.admin-header__avatar-btn { display: flex; align-items: center; gap: 6px; padding: 4px 6px 4px 4px; border-radius: 100px; transition: all 0.2s; }
.admin-header__avatar-btn:hover { background: rgba(15, 23, 42, 0.05); }
.admin-header__avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #2563EB); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; box-shadow: 0 2px 10px rgba(37,99,235,0.25); }
.admin-header__avatar-chevron { color: #94a3b8; }

/* Notifications dropdown */
.admin-notif-dropdown { position: absolute; top: 56px; right: 100px; width: 360px; max-width: calc(100vw - 32px); z-index: 50; background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 18px; box-shadow: 0 20px 60px -10px rgba(0,0,0,0.15), 0 8px 24px -6px rgba(0,0,0,0.08); overflow: hidden; }
.admin-notif-dropdown__head { padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; font-size: 14px; font-weight: 700; color: #0f172a; border-bottom: 1px solid rgba(15,23,42,0.05); }
.admin-notif-dropdown__list { max-height: 360px; overflow-y: auto; }
.admin-notif-dropdown__item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 18px; transition: all 0.15s; cursor: pointer; }
.admin-notif-dropdown__item:hover { background: rgba(15,23,42,0.02); }
.admin-notif-dropdown__icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.admin-notif-dropdown__icon--success { background: rgba(16,185,129,0.1); color: #059669; }
.admin-notif-dropdown__icon--info { background: rgba(37,99,235,0.1); color: #2563eb; }
.admin-notif-dropdown__icon--warning { background: rgba(217,119,6,0.1); color: #d97706; }
.admin-notif-dropdown__text { font-size: 13px; font-weight: 500; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.admin-notif-dropdown__time { font-size: 11px; color: #94a3b8; margin-top: 2px; }

/* User dropdown */
.admin-user-dropdown { position: absolute; top: 56px; right: 16px; width: 260px; max-width: calc(100vw - 32px); z-index: 50; background: white; border: 1px solid rgba(15,23,42,0.06); border-radius: 18px; box-shadow: 0 20px 60px -10px rgba(0,0,0,0.15), 0 8px 24px -6px rgba(0,0,0,0.08); overflow: hidden; }
.admin-user-dropdown__head { padding: 18px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(15,23,42,0.05); }
.admin-user-dropdown__avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #2563EB); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: white; flex-shrink: 0; box-shadow: 0 4px 14px rgba(37,99,235,0.3); }
.admin-user-dropdown__name { font-size: 14px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.admin-user-dropdown__role { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.admin-user-dropdown__menu { padding: 8px; }
.admin-user-dropdown__item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 13px; font-weight: 500; color: #475569; transition: all 0.15s; text-decoration: none; cursor: pointer; width: 100%; }
.admin-user-dropdown__item:hover { background: rgba(15,23,42,0.04); color: #0f172a; }
.admin-user-dropdown__item--danger:hover { background: rgba(239,68,68,0.08); color: #dc2626; }
.admin-user-dropdown__divider { height: 1px; background: rgba(15,23,42,0.05); margin: 4px 0; }
</style>

<style>
/* FORCE WHITE SIDEBAR — highest priority override */
aside {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
}
aside > div {
  background: #ffffff !important;
  background-color: #ffffff !important;
  background-image: none !important;
}
aside .sidebar-link { color: #475569; }
aside .sidebar-link--active {
  background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
  color: #fff !important;
}
</style>
