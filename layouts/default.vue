<template>
  <div class="min-h-screen flex bg-ink-950">
    <!-- Sidebar -->
    <aside
      class="fixed lg:sticky top-0 left-0 h-screen z-40 transition-transform duration-300"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
      style="width: 260px;"
    >
      <div class="h-full flex flex-col bg-ink-950 border-r border-white/5">
        <!-- Logo -->
        <div class="h-16 flex items-center gap-3 px-5 border-b border-white/5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30">
            M
          </div>
          <div>
            <div class="font-bold text-sm text-white tracking-tight">MAKON</div>
            <div class="text-[10px] text-ink-500 uppercase tracking-widest">Real Estate</div>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-6 dark-scroll">
          <template v-for="section in navSections" :key="section.title">
            <div>
              <div class="px-3 mb-2 text-[10px] font-semibold text-ink-600 uppercase tracking-widest">
                {{ section.title }}
              </div>
              <div class="space-y-0.5">
                <NuxtLink
                  v-for="item in section.items"
                  :key="item.to"
                  :to="item.to"
                  class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 group"
                  :class="isActive(item.to)
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                    : 'text-ink-400 hover:text-white hover:bg-white/5 border border-transparent'"
                >
                  <component :is="item.icon" :size="18" :class="isActive(item.to) ? 'text-brand-400' : 'text-ink-500 group-hover:text-ink-300'" />
                  <span class="flex-1">{{ item.label }}</span>
                  <span v-if="item.badge" class="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400">
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </template>
        </nav>

        <!-- User -->
        <div class="p-3 border-t border-white/5">
          <div class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-sm font-bold text-white">
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-white truncate">{{ user?.fullName || 'Admin' }}</div>
              <div class="text-[11px] text-ink-500 truncate">{{ roleLabel }}</div>
            </div>
            <ChevronRight :size="14" class="text-ink-600" />
          </div>
        </div>
      </div>
    </aside>

    <!-- Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/60 z-30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- Top bar -->
      <header class="h-16 sticky top-0 z-20 glass border-b border-white/5 flex items-center px-4 lg:px-6 gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden p-2 rounded-lg hover:bg-white/5 text-ink-300">
          <Menu :size="20" />
        </button>

        <!-- Breadcrumb -->
        <div class="hidden lg:flex items-center gap-2 text-sm">
          <span class="text-ink-500">Bosh sahifa</span>
          <ChevronRight :size="14" class="text-ink-700" />
          <span class="text-white font-medium">{{ currentPageTitle }}</span>
        </div>

        <div class="flex-1" />

        <!-- Search -->
        <div class="relative hidden md:block">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="text"
            placeholder="Qidirish..."
            class="input pl-9 w-56 bg-white/5"
            @focus="showCmd = true"
            @blur="showCmd = false"
          />
        </div>

        <!-- Notifications -->
        <button class="relative p-2 rounded-xl hover:bg-white/5 text-ink-400 hover:text-white transition-colors">
          <Bell :size="18" />
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 animate-pulse-glow" />
        </button>

        <!-- Quick add -->
        <button class="btn btn-primary btn-sm hidden sm:flex">
          <Plus :size="16" />
          <span class="hidden lg:inline">Yangi</span>
        </button>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 lg:p-6 animate-fade-in">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard, Building2, FileText, FileSearch, Package,
  Wallet, Receipt, CheckCircle2, Calendar, Wrench, ClipboardList,
  Gauge, BarChart3, Bell, Settings, ShieldCheck, HardDrive,
  Search, Plus, Menu, ChevronRight, Home, Briefcase
} from 'lucide-vue-next'
import type { UserRole } from '~/types'

const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const showCmd = ref(false)

const user = computed(() => authStore.user)
const userInitials = computed(() => {
  const name = user.value?.fullName || 'Admin User'
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
})
const roleLabel = computed(() => {
  const labels: Record<UserRole, string> = {
    SUPER_HEAD: 'Super rahbar',
    BUILDING_MANAGER: 'Bino rahbari',
    ACCOUNTANT: 'Buxgalter',
    FACILITY: 'Pudratchi',
    TENANT_OWNER: 'Ijarachi',
  }
  return labels[user.value?.role || 'SUPER_HEAD']
})

const currentPageTitle = computed(() => {
  const map: Record<string, string> = {
    'dashboard': 'Ishchi panel',
    'management/buildings': 'Binolar',
    'management/listings': 'Listinglar',
    'management/applications': 'Arizalar',
    'management/service-requests': 'Servis so\'rovlar',
    'finance/contracts': 'Shartnomalar',
    'finance/invoices': 'Invoyslar',
    'finance/payments': 'To\'lovlar',
    'finance/approvals': 'Tasdiqlar',
    'finance/periods': 'Hisob davrlari',
    'finance/debts': 'Qarzdorlik',
    'finance/inventory': 'Ombor',
    'finance/stock-issues': 'Berish dalolatnomalari',
    'service': 'Servis',
    'service/work-orders': 'Topshiriqlar',
    'warehouse': 'Ombor',
    'meters': 'Hisoblagichlar',
    'reports': 'Hisobotlar',
    'notifications': 'Bildirishnomalar',
    'admin/audit': 'Audit',
    'admin/monitoring': 'Monitoring',
    'admin/settings': 'Sozlamalar',
    'admin/users': 'Foydalanuvchilar',
    'admin/backups': 'Zaxira nusxa',
    'profile': 'Profil',
  }
  for (const [key, label] of Object.entries(map)) {
    if (route.path.includes(key)) return label
  }
  return 'Ishchi panel'
})

function isActive(path: string) {
  return route.path.includes(path)
}

const navSections = computed(() => {
  const role = user.value?.role || 'SUPER_HEAD'

  const sections: { title: string; items: { to: string; label: string; icon: any; badge?: number }[] }[] = []

  // Dashboard
  if (role === 'SUPER_HEAD') {
    sections.push({
      title: 'Asosiy',
      items: [
        { to: '/dashboard', label: 'Ishchi panel', icon: LayoutDashboard },
      ],
    })
  } else if (role === 'BUILDING_MANAGER') {
    sections.push({
      title: 'Asosiy',
      items: [
        { to: '/dashboard', label: 'Bino paneli', icon: LayoutDashboard },
      ],
    })
  } else if (role === 'TENANT_OWNER') {
    sections.push({
      title: 'Asosiy',
      items: [
        { to: '/cabinet', label: 'Mening kabinetim', icon: LayoutDashboard },
      ],
    })
  } else if (role === 'FACILITY') {
    sections.push({
      title: 'Asosiy',
      items: [
        { to: '/facility/work-orders', label: 'Topshiriqlar', icon: ClipboardList },
      ],
    })
  } else {
    sections.push({
      title: 'Asosiy',
      items: [
        { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
      ],
    })
  }

  // Property management
  if (['SUPER_HEAD', 'BUILDING_MANAGER'].includes(role)) {
    sections.push({
      title: 'Boshqaruv',
      items: [
        { to: '/management/buildings', label: 'Binolar', icon: Building2 },
        { to: '/management/listings', label: 'Listinglar', icon: FileSearch },
        { to: '/management/applications', label: 'Arizalar', icon: FileText, badge: 3 },
        { to: '/management/service-requests', label: 'Servis', icon: Wrench },
      ],
    })
  }

  // Finance
  if (['SUPER_HEAD', 'ACCOUNTANT', 'BUILDING_MANAGER'].includes(role)) {
    sections.push({
      title: 'Moliya',
      items: [
        { to: '/finance/contracts', label: 'Shartnomalar', icon: Briefcase },
        { to: '/finance/invoices', label: 'Invoyslar', icon: Receipt },
        { to: '/finance/debts', label: 'Qarzdorlik', icon: Wallet },
        { to: '/finance/approvals', label: 'Tasdiqlar', icon: CheckCircle2, badge: 2 },
        { to: '/finance/periods', label: 'Hisob davrlari', icon: Calendar },
      ],
    })
  }

  // Facility/Warehouse
  if (['SUPER_HEAD', 'FACILITY', 'ACCOUNTANT'].includes(role)) {
    sections.push({
      title: 'Operatsion',
      items: [
        ...(role === 'FACILITY' ? [{ to: '/facility/work-orders', label: 'Topshiriqlar', icon: ClipboardList }] : []),
        { to: '/facility/material-requests', label: 'Material so\'rovlar', icon: Package },
        { to: '/finance/inventory', label: 'Ombor', icon: Package },
        { to: '/meters', label: 'Hisoblagichlar', icon: Gauge },
      ],
    })
  }

  // Cabinet
  if (role === 'TENANT_OWNER') {
    sections.push({
      title: 'Kabinet',
      items: [
        { to: '/cabinet/units', label: 'Mening unitlarim', icon: Building2 },
        { to: '/cabinet/applications', label: 'Arizalarim', icon: FileText },
        { to: '/cabinet/services', label: 'Hisoblar va servis', icon: Wallet },
      ],
    })
  }

  // Admin
  if (role === 'SUPER_HEAD') {
    sections.push({
      title: 'Tizim',
      items: [
        { to: '/reports', label: 'Hisobotlar', icon: BarChart3 },
        { to: '/notifications', label: 'Bildirishnomalar', icon: Bell },
        { to: '/admin/users', label: 'Foydalanuvchilar', icon: Settings },
        { to: '/admin/audit', label: 'Audit', icon: ShieldCheck },
        { to: '/admin/monitoring', label: 'Monitoring', icon: Activity },
        { to: '/admin/backups', label: 'Zaxira', icon: HardDrive },
      ],
    })
  }

  return sections
})

import { Activity } from 'lucide-vue-next'
</script>
