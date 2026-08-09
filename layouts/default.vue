<template>
  <div class="min-h-screen bg-neutral-50 flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:sticky top-0 z-50 h-screen flex-shrink-0 transition-all duration-300 flex flex-col',
        uiStore.sidebarCollapsed ? 'w-[72px]' : 'w-[260px]',
        uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="h-full bg-neutral-950 flex flex-col">
        <!-- Logo -->
        <div class="h-16 flex items-center px-5 border-b border-white/5 flex-shrink-0">
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
                />
              </svg>
            </div>
            <span v-if="!uiStore.sidebarCollapsed" class="text-white font-bold text-lg font-display">MAKON</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 sidebar-scroll">
          <template v-for="section in navSections" :key="section.title">
            <p
              v-if="!uiStore.sidebarCollapsed"
              class="px-3 pt-4 pb-1.5 text-[10px] font-bold text-neutral-600 uppercase tracking-widest"
            >
              {{ section.title }}
            </p>
            <div v-else class="h-px mx-3 my-2 bg-white/5" />

            <NuxtLink
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              :class="[
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group relative',
                isActive(item.path)
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white',
              ]"
            >
              <svg
                class="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="item.icon"
                />
              </svg>
              <span v-if="!uiStore.sidebarCollapsed" class="truncate">{{ item.label }}</span>
              <span
                v-if="item.badge && !uiStore.sidebarCollapsed"
                class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                :class="
                  isActive(item.path)
                    ? 'bg-white/20 text-white'
                    : 'bg-danger-500/20 text-danger-400'
                "
              >{{ item.badge }}</span>
              <span
                v-if="item.badge && uiStore.sidebarCollapsed"
                class="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500"
              />
            </NuxtLink>
          </template>
        </nav>

        <!-- User -->
        <div class="p-3 border-t border-white/5 flex-shrink-0">
          <NuxtLink
            to="/profile"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors"
          >
            <div
              class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm font-bold text-white">{{ authStore.initials }}</span>
            </div>
            <div v-if="!uiStore.sidebarCollapsed" class="min-w-0">
              <p class="text-sm font-semibold text-white truncate">
                {{ authStore.user?.fullName }}
              </p>
              <p class="text-xs text-neutral-500 truncate">{{ authStore.roleLabel }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div
      v-if="uiStore.sidebarOpen"
      class="fixed inset-0 bg-black/40 z-40 lg:hidden"
      @click="uiStore.toggleSidebar()"
    />

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <header
        class="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30"
      >
        <div class="flex items-center gap-3">
          <button class="btn-ghost btn-icon lg:hidden" @click="uiStore.toggleSidebar()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button class="btn-ghost btn-icon hidden lg:flex" @click="uiStore.toggleCollapse()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div class="hidden md:flex items-center gap-2 text-sm text-neutral-400">
            <NuxtLink to="/" class="hover:text-neutral-600">Bosh sahifa</NuxtLink>
            <span>/</span>
            <span class="text-neutral-900 font-medium">{{ currentPageTitle }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink to="/notifications" class="btn-ghost btn-icon relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger-500"
            />
          </NuxtLink>
          <div class="w-px h-6 bg-neutral-200 mx-1" />
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
            >
              <span class="text-xs font-bold text-white">{{ authStore.initials }}</span>
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-semibold text-neutral-900 leading-tight">
                {{ authStore.user?.fullName }}
              </p>
              <p class="text-xs text-neutral-500">{{ authStore.roleLabel }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-3 md:p-6 animate-fade-in">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from '~/stores/ui'
import { useAuthStore } from '~/stores/auth'
import { useFinanceStore } from '~/stores/finance'

const uiStore = useUiStore()
const authStore = useAuthStore()
const financeStore = useFinanceStore()

onMounted(() => financeStore.initMockData())

const route = useRoute()
const unreadCount = computed(() => financeStore.unreadNotifications.length)

function isActive(path: string): boolean {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}

const currentPageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard/executive': 'Ishchi panel',
    '/dashboard/manager': 'Boshqaruv paneli',
    '/management/buildings': 'Binolar',
    '/management/listings': 'Listinglar',
    '/applications': 'Arizalar',
    '/finance/contracts': 'Shartnomalar',
    '/finance/invoices': 'Invoyslar',
    '/finance/payments': "To'lovlar",
    '/finance/approvals': 'Tasdiqlar',
    '/finance/periods': 'Hisob davrlari',
    '/service': "Servis so'rovlar",
    '/service/work-orders': 'Ish buyruqlari',
    '/warehouse': 'Ombor',
    '/warehouse/suppliers': "Ta'minotchilar",
    '/meters': 'Hisoblagichlar',
    '/reports': 'Hisobotlar',
    '/notifications': 'Bildirishnomalar',
    '/profile': 'Profil',
    '/admin/users': 'Foydalanuvchilar',
    '/admin/monitoring': 'Monitoring',
    '/admin/backups': 'Backup',
    '/admin/settings': 'Sozlamalar',
  }
  return titles[route.path] || ''
})

const navSections = [
  {
    title: 'Asosiy',
    items: [
      {
        path: '/dashboard/executive',
        label: 'Ishchi panel',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      },
      {
        path: '/management/buildings',
        label: 'Binolar',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z',
      },
      {
        path: '/management/listings',
        label: 'Listinglar',
        icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z',
      },
      {
        path: '/applications',
        label: 'Arizalar',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      },
    ],
  },
  {
    title: 'Moliya',
    items: [
      {
        path: '/finance/contracts',
        label: 'Shartnomalar',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
      {
        path: '/finance/invoices',
        label: 'Invoyslar',
        icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M18 14l-1.5-1.5M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5z',
      },
      {
        path: '/finance/payments',
        label: "To'lovlar",
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      },
      {
        path: '/finance/approvals',
        label: 'Tasdiqlar',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      },
      {
        path: '/finance/periods',
        label: 'Davr',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      },
    ],
  },
  {
    title: 'Servis',
    items: [
      {
        path: '/service',
        label: "So'rovlar",
        icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5',
      },
      {
        path: '/service/work-orders',
        label: 'Ish buyruqlari',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      },
      {
        path: '/warehouse',
        label: 'Ombor',
        icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2M7 15h10',
      },
      { path: '/meters', label: 'Hisoblagichlar', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    ],
  },
  {
    title: 'Tizim',
    items: [
      {
        path: '/reports',
        label: 'Hisobotlar',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
      {
        path: '/notifications',
        label: 'Bildirishnomalar',
        icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      },
      {
        path: '/admin/users',
        label: 'Foydalanuvchilar',
        icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      },
      {
        path: '/admin/monitoring',
        label: 'Monitoring',
        icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      },
      {
        path: '/admin/backups',
        label: 'Backup',
        icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
      },
      {
        path: '/admin/settings',
        label: 'Sozlamalar',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      },
    ],
  },
]
</script>

<style scoped>
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}
</style>
