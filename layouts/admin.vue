<template>
  <div class="min-h-screen flex admin-bg">
    <!-- Sidebar -->
    <aside class="fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'" style="width: 260px;">
      <div class="h-full flex flex-col admin-sidebar">
        <div class="h-16 flex items-center gap-3 px-5 border-b border-black/5 dark:border-white/5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30">M</div>
          <div>
            <div class="font-bold text-sm tracking-tight text-ink-900 dark:text-white">MAKON</div>
            <div class="text-[10px] text-ink-500 uppercase tracking-widest">Admin Panel</div>
          </div>
        </div>

        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NuxtLink
            v-for="item in navItems" :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all"
            :class="isActive(item.to) ? 'admin-sidebar-item-active' : 'admin-sidebar-item'"
          >
            <component :is="item.icon" :size="18" />
            <span>{{ item.label }}</span>
            <span v-if="item.badge" class="ml-auto px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-500 dark:text-red-400">{{ item.badge }}</span>
          </NuxtLink>
        </nav>

        <div class="p-3 border-t border-black/5 dark:border-white/5">
          <button @click="authStore.logout()" class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm admin-sidebar-item transition-colors">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xs font-bold text-white">A</div>
            <div class="flex-1 text-left">
              <div class="text-sm font-medium">Admin</div>
              <div class="text-[11px] text-ink-500">Chiqish</div>
            </div>
          </button>
        </div>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="fixed inset-0 bg-black/60 z-30 lg:hidden" @click="sidebarOpen = false" />

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="h-16 sticky top-0 z-20 glass border-b border-black/5 dark:border-white/5 flex items-center px-4 lg:px-6 gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-ink-500">
          <Menu :size="20" />
        </button>
        <div class="flex-1" />
        <ThemeToggle />
        <button class="relative p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">
          <Bell :size="18" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"></span>
        </button>
      </header>

      <main class="flex-1 p-4 lg:p-6 animate-fade-in">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard, Building2, FileText, Receipt, Wallet, ClipboardList, Package, Gauge, BarChart3, Bell, Menu, Settings, ShieldCheck, ScrollText, UserCircle, Layers, Tag, Calendar, ClipboardCheck, History, Activity, Database } from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const sidebarOpen = ref(false)

const navItems = [
  { to: '/dashboard', label: 'Ishchi panel', icon: LayoutDashboard },
  { to: '/profile', label: 'Kabinet', icon: UserCircle },
  { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
  { to: '/management/buildings', label: 'Binolar', icon: Building2 },
  { to: '/management/units', label: 'Birliklar', icon: Layers },
  { to: '/management/listings', label: 'Listinglar', icon: Tag },
  { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
  { to: '/management/contracts', label: 'Shartnomalar', icon: ScrollText },
  { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
  { to: '/finance/periods', label: 'Moliya davrlari', icon: Calendar },
  { to: '/finance/debts', label: 'Qarzdorlik', icon: Wallet },
  { to: '/finance/approvals', label: 'Tasdiqlar', icon: ClipboardCheck },
  { to: '/facility/work-orders', label: 'Xizmat so\'rovlari', icon: ClipboardList },
  { to: '/facility/material-requests', label: 'Material so\'rovlari', icon: Package },
  { to: '/finance/inventory', label: 'Ombor', icon: Package },
  { to: '/meters', label: 'Hisoblagichlar', icon: Gauge },
  { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
  { to: '/admin/users', label: 'Foydalanuvchilar', icon: ShieldCheck },
  { to: '/admin/audit', label: 'Audit jurnali', icon: History },
  { to: '/admin/monitoring', label: 'Monitoring', icon: Activity },
  { to: '/admin/backups', label: 'Rezerv nusxalar', icon: Database },
  { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
]

function isActive(path: string) {
  return route.path.includes(path)
}
</script>
