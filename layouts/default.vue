<template>
  <div class="min-h-screen bg-ink-50 flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed lg:sticky top-0 z-50 h-screen flex-shrink-0 transition-all duration-300 flex flex-col',
        uiStore.sidebarCollapsed ? 'w-[72px]' : 'w-[264px]',
        uiStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Glassmorphic dark sidebar -->
      <div class="h-full bg-ink-950 flex flex-col relative overflow-hidden">
        <!-- Gradient glow background -->
        <div class="absolute inset-0 bg-gradient-to-br from-brand-600/5 via-transparent to-transparent pointer-events-none" />
        <div class="absolute top-0 left-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
        <div class="absolute bottom-20 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

        <!-- Logo -->
        <div class="h-16 flex items-center px-5 border-b border-white/[0.06] flex-shrink-0 relative z-10">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-600/30">
                <svg class="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 22px; height: 22px;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
                </svg>
              </div>
              <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 opacity-20 blur-md -z-10" />
            </div>
            <transition name="fade">
              <div v-if="!uiStore.sidebarCollapsed" class="flex flex-col">
                <span class="text-white font-bold text-base font-display tracking-tight leading-none">MAKON</span>
                <span class="text-[10px] text-ink-400 font-medium tracking-widest uppercase mt-0.5">Real Estate</span>
              </div>
            </transition>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 dark-scroll relative z-10">
          <template v-for="(section, si) in navSections" :key="section.title">
            <div v-if="!uiStore.sidebarCollapsed" class="px-3 pt-4 pb-1.5 flex items-center gap-2">
              <span class="text-[10px] font-bold text-ink-500 uppercase tracking-widest">{{ section.title }}</span>
              <div class="flex-1 h-px bg-white/5" />
            </div>
            <div v-if="!uiStore.sidebarCollapsed && si > 0" class="h-px mx-3 my-2 bg-white/5" />

            <NuxtLink
              v-for="item in section.items"
              :key="item.path"
              :to="item.path"
              :class="isActive(item.path) ? 'nav-item-active' : 'nav-item-inactive'"
            >
              <svg class="w-[20px] h-[20px] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="item.icon" />
              </svg>
              <span v-if="!uiStore.sidebarCollapsed" class="truncate">{{ item.label }}</span>
              <span
                v-if="item.badge && !uiStore.sidebarCollapsed"
                class="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                :class="isActive(item.path) ? 'bg-white/20 text-white' : 'bg-rose-500/20 text-rose-400'"
              >{{ item.badge }}</span>
              <span
                v-if="item.badge && uiStore.sidebarCollapsed"
                class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-ink-950"
              />
              <!-- Active indicator bar -->
              <span v-if="isActive(item.path)" class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white/80" />
            </NuxtLink>
          </template>
        </nav>

        <!-- User -->
        <div class="p-3 border-t border-white/[0.06] flex-shrink-0 relative z-10">
          <NuxtLink
            to="/profile"
            class="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-white/5 transition-colors group"
          >
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
            <svg v-if="!uiStore.sidebarCollapsed" class="w-4 h-4 text-ink-500 group-hover:text-ink-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <transition name="fade">
      <div v-if="uiStore.sidebarOpen" class="fixed inset-0 bg-ink-950/50 backdrop-blur-sm z-40 lg:hidden" @click="uiStore.toggleSidebar()" />
    </transition>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Topbar -->
      <header class="h-16 bg-white/80 backdrop-blur-xl border-b border-ink-200/60 flex items-center justify-between px-3 md:px-6 sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <button class="btn-ghost btn-icon lg:hidden" @click="uiStore.toggleSidebar()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button class="btn-ghost btn-icon hidden lg:flex" @click="uiStore.toggleCollapse()">
            <svg class="w-5 h-5 transition-transform duration-200" :class="uiStore.sidebarCollapsed ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <div class="hidden md:flex items-center gap-2 text-sm">
            <NuxtLink to="/" class="text-ink-400 hover:text-ink-600 transition-colors">Bosh sahifa</NuxtLink>
            <svg class="w-4 h-4 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-ink-900 font-semibold">{{ currentPageTitle }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Search -->
          <div class="hidden md:flex items-center gap-2 rounded-xl bg-ink-100 px-3 py-2 text-sm text-ink-400 w-56 cursor-pointer hover:bg-ink-200/60 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Qidirish...</span>
            <kbd class="ml-auto text-[10px] font-mono font-semibold bg-white rounded px-1.5 py-0.5 border border-ink-200">⌘K</kbd>
          </div>

          <NuxtLink to="/notifications" class="btn-ghost btn-icon relative">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </NuxtLink>

          <div class="w-px h-6 bg-ink-200 mx-1" />

          <div class="flex items-center gap-2.5 pl-1">
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
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-3 md:p-6 lg:p-8 animate-fade-in-up">
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
      { path: '/dashboard/executive', label: 'Ishchi panel', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { path: '/management/buildings', label: 'Binolar', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z' },
      { path: '/management/listings', label: 'Listinglar', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
      { path: '/applications', label: 'Arizalar', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    ],
  },
  {
    title: 'Moliya',
    items: [
      { path: '/finance/contracts', label: 'Shartnomalar', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { path: '/finance/invoices', label: 'Invoyslar', icon: 'M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z' },
      { path: '/finance/payments', label: "To'lovlar", icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
      { path: '/finance/approvals', label: 'Tasdiqlar', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { path: '/finance/periods', label: 'Hisob davrlari', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    ],
  },
  {
    title: 'Servis',
    items: [
      { path: '/service', label: "So'rovlar", icon: 'M11.42 7.83a6 6 0 015.68 1.78l2.12 2.12a6 6 0 11-8.49 8.49l-1.5-1.5' },
      { path: '/service/work-orders', label: 'Ish buyruqlari', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
      { path: '/warehouse', label: 'Ombor', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { path: '/warehouse/suppliers', label: "Ta'minotchilar", icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
      { path: '/meters', label: 'Hisoblagichlar', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    ],
  },
  {
    title: 'Tizim',
    items: [
      { path: '/reports', label: 'Hisobotlar', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      { path: '/admin/users', label: 'Foydalanuvchilar', icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 11-8 0 4 4 0 018 0z' },
      { path: '/admin/settings', label: 'Sozlamalar', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ],
  },
]
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
