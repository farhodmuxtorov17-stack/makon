<template>
  <div class="min-h-screen flex admin-bg">
    <aside class="fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'" style="width: 240px;">
      <div class="h-full flex flex-col admin-sidebar">
        <div class="h-[56px] flex items-center gap-2.5 px-5 flex-shrink-0">
          <div class="w-8 h-8 rounded-lg bg-[#0066FF] flex items-center justify-center font-bold text-white text-sm">M</div>
          <div>
            <div class="font-bold text-sm text-ink-900 dark:text-white leading-none">MAKON</div>
            <div class="text-[10px] text-ink-400 mt-0.5">{{ roleLabel }}</div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto py-2 px-2.5">
          <NuxtLink
            v-for="item in navItems" :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-[10px] text-[13px] transition-colors"
            :class="isActive(item.to) ? 'admin-sidebar-item-active' : 'admin-sidebar-item'"
            @click="sidebarOpen = false"
          >
            <component :is="item.icon" :size="16" :class="isActive(item.to) ? 'text-brand-500' : 'opacity-60'" />
            <span>{{ item.label }}</span>
            <span v-if="item.badge" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/15 text-red-500">{{ item.badge }}</span>
          </NuxtLink>
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
  LayoutDashboard, Building2, FileText, ScrollText, Receipt, Settings, Menu, LogOut, ChevronRight
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const currentRole = useState('currentRole', () => 'SUPER_HEAD')

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
