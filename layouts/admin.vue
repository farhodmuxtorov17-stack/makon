<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Collapsible Sidebar -->
    <aside
      class="fixed lg:sticky top-0 left-0 h-screen z-40 sidebar-transition overflow-hidden"
      :style="{ width: sidebarCollapsed ? '64px' : '240px' }"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="h-full flex flex-col admin-sidebar-premium">
        <!-- Logo / Header -->
        <div class="h-[56px] flex items-center gap-2.5 flex-shrink-0 px-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] flex items-center justify-center font-bold text-white text-sm flex-shrink-0">M</div>
          <div v-if="!sidebarCollapsed" class="overflow-hidden">
            <div class="font-bold text-sm text-white leading-none">MAKON</div>
            <div class="text-[10px] text-blue-300/70 mt-0.5">{{ roleLabel }}</div>
          </div>
        </div>

        <!-- Collapse Toggle (desktop only) -->
        <button
          @click="toggleCollapse"
          class="hidden lg:flex items-center justify-center py-2 mx-3 rounded-lg text-blue-300/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <component :is="sidebarCollapsed ? ChevronRight : ChevronLeft" :size="16" />
        </button>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto py-2 px-2.5 sidebar-nav-scroll">
          <NuxtLink
            v-for="item in navItems" :key="item.to"
            :to="item.to"
            class="sidebar-link"
            :class="isActive(item.to) ? 'sidebar-link--active' : ''"
            @click="sidebarOpen = false"
            :title="sidebarCollapsed ? item.label : ''"
          >
            <component :is="item.icon" :size="18" class="sidebar-link__icon" />
            <span v-if="!sidebarCollapsed" class="sidebar-link__label">{{ item.label }}</span>
            <span v-if="item.badge && !sidebarCollapsed" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/80 text-white">{{ item.badge }}</span>
            <span v-if="item.badge && sidebarCollapsed" class="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </NuxtLink>
        </nav>

        <!-- User / Logout -->
        <div class="p-2.5 flex-shrink-0">
          <button @click="handleLogout" class="sidebar-user-btn">
            <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
            <div v-if="!sidebarCollapsed" class="flex-1 text-left min-w-0 overflow-hidden">
              <div class="text-[13px] font-medium text-white truncate">Admin User</div>
              <div class="text-[11px] text-blue-300/60">Chiqish</div>
            </div>
            <LogOut v-if="!sidebarCollapsed" :size="15" class="text-blue-300/50" />
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 z-30 lg:hidden" @click="sidebarOpen = false" />

    <!-- Main Content -->
    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-[56px] sticky top-0 z-20 glass border-b border-black/5 dark:border-white/5 flex items-center px-4 lg:px-6 gap-3">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-black/5 text-ink-500">
          <Menu :size="20" />
        </button>
        <div class="hidden md:flex items-center gap-2 text-sm">
          <span class="text-ink-400">{{ roleLabel }}</span>
          <ChevronRight :size="14" class="text-ink-300" />
          <span class="text-ink-900 dark:text-white font-semibold">{{ pageTitle }}</span>
        </div>
        <div class="flex-1" />
        <RoleSwitcher />
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
  LayoutDashboard, Building2, FileText, ScrollText, Receipt, Settings, Menu, LogOut, ChevronRight, ChevronLeft
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')

// Persist collapse state
onMounted(() => {
  const saved = localStorage.getItem('makon-sidebar-collapsed')
  if (saved === 'true') sidebarCollapsed.value = true
})

function toggleCollapse() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('makon-sidebar-collapsed', String(sidebarCollapsed.value))
}

const roleLabels: Record<string,string> = {
  SUPER_HEAD: 'Super Rahbar', BUILDING_MANAGER: 'Bino Rahbari', ACCOUNTANT: 'Buxgalter',
  FACILITY: 'Pudratchi', TENANT_OWNER: 'Ijarachi'
}
const roleLabel = computed(() => roleLabels[currentRole.value] || 'Admin')

const navItems = [
  { to: '/dashboard/executive', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/management/buildings', label: 'Binolar', icon: Building2 },
  { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
  { to: '/contracts', label: 'Shartnomalar', icon: ScrollText },
  { to: '/finance/invoices', label: 'Moliya', icon: Receipt },
  { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
]

const titles: Record<string,string> = {
  '/dashboard/executive': 'Dashboard',
  '/management/buildings': 'Binolar',
  '/management/applications': 'Arizalar',
  '/contracts': 'Shartnomalar',
  '/finance/invoices': 'Moliya',
  '/admin/settings': 'Sozlamalar',
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

function handleLogout() {
  authStore?.logout?.()
  navigateTo('/login')
}
</script>

<style scoped>
.sidebar-transition {
  transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
}

/* Premium dark navy sidebar matching reference */
.admin-sidebar-premium {
  background: linear-gradient(180deg, #0c1429 0%, #0f172a 40%, #111d38 100%);
  border-right: 1px solid rgba(37, 99, 235, 0.12);
  position: relative;
}
.admin-sidebar-premium::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08) 0%, transparent 60%);
  pointer-events: none;
}
.admin-sidebar-premium > * {
  position: relative;
  z-index: 1;
}

/* Nav links */
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(148, 163, 184, 0.85);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  margin-bottom: 2px;
  text-decoration: none;
}
.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
}
.sidebar-link--active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.18) 0%, rgba(59, 130, 246, 0.12) 100%);
  color: #60a5fa;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.2);
}
.sidebar-link--active::before {
  content: '';
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  border-radius: 0 3px 3px 0;
  background: #3b82f6;
}
.sidebar-link__icon {
  flex-shrink: 0;
  opacity: 0.7;
}
.sidebar-link--active .sidebar-link__icon {
  opacity: 1;
  color: #60a5fa;
}

/* User button */
.sidebar-user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border-radius: 10px;
  color: rgba(148, 163, 184, 0.85);
  transition: all 0.2s;
  background: none;
  border: none;
  cursor: pointer;
}
.sidebar-user-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Scrollbar */
.sidebar-nav-scroll::-webkit-scrollbar { width: 4px; }
.sidebar-nav-scroll::-webkit-scrollbar-track { background: transparent; }
.sidebar-nav-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 4px; }
</style>
