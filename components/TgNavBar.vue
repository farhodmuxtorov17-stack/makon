<template>
  <!-- Telegram Mini App bottom navigation bar -->
  <div class="tg-nav-bar" :class="{ 'tg-nav-bar--dark': dark }">
    <button
      v-if="showBack"
      class="tg-nav-bar__back"
      @click="handleBack"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M14 5L9 11L14 17" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Orqaga</span>
    </button>

    <div class="tg-nav-bar__tabs">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.to"
        :to="tab.to"
        class="tg-nav-bar__tab"
        :class="{ 'tg-nav-bar__tab--active': isActive(tab.to) }"
      >
        <component :is="tab.icon" :size="20" />
        <span>{{ tab.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Home, LayoutDashboard, FileText, Bell } from 'lucide-vue-next'

const route = useRoute()
const props = withDefaults(defineProps<{
  dark?: boolean
  showBack?: boolean
  role?: string
}>(), {
  dark: false,
  showBack: false,
  role: 'TENANT_OWNER',
})

const tabs = computed(() => {
  // Role-based tabs for Telegram Mini App
  if (props.role === 'TENANT_OWNER') {
    return [
      { to: '/cabinet', label: 'Bosh', icon: Home },
      { to: '/cabinet/units', label: 'Unit', icon: FileText },
      { to: '/cabinet/contracts', label: 'Shartnoma', icon: LayoutDashboard },
      { to: '/notifications', label: 'Hab', icon: Bell },
    ]
  }
  if (props.role === 'SUPER_HEAD' || props.role === 'BUILDING_MANAGER') {
    return [
      { to: '/dashboard/executive', label: 'Panel', icon: LayoutDashboard },
      { to: '/management/buildings', label: 'Bino', icon: Home },
      { to: '/management/applications', label: 'Ariza', icon: FileText },
      { to: '/notifications', label: 'Hab', icon: Bell },
    ]
  }
  if (props.role === 'ACCOUNTANT') {
    return [
      { to: '/finance/invoices', label: 'Invoys', icon: FileText },
      { to: '/finance/debts', label: 'Qarz', icon: Home },
      { to: '/reports', label: 'Hisobot', icon: LayoutDashboard },
      { to: '/notifications', label: 'Hab', icon: Bell },
    ]
  }
  // Default
  return [
    { to: '/dashboard/executive', label: 'Panel', icon: LayoutDashboard },
    { to: '/cabinet', label: 'Kabinet', icon: Home },
    { to: '/notifications', label: 'Hab', icon: Bell },
  ]
})

function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + '/')
}

function handleBack() {
  if (window.history.length > 1) {
    useRouter().back()
  } else {
    navigateTo('/dashboard')
  }
}
</script>

<style scoped>
.tg-nav-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  padding-bottom: max(6px, env(safe-area-inset-bottom, 0px));
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
}
.tg-nav-bar--dark {
  background: rgba(24, 24, 27, 0.85);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.tg-nav-bar__back {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  color: var(--accent);
  font-size: 15px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}
.tg-nav-bar--dark .tg-nav-bar__back {
  color: var(--accent);
}
.tg-nav-bar__tabs {
  display: flex;
  flex: 1;
  justify-content: space-around;
  gap: 2px;
}
.tg-nav-bar__tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 8px;
  border-radius: 10px;
  color: #71717a;
  font-size: 10px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  min-width: 48px;
}
.tg-nav-bar__tab--active {
  color: var(--accent);
  background: rgba(15, 118, 110, 0.1);
}
.tg-nav-bar--dark .tg-nav-bar__tab {
  color: #a1a1aa;
}
.tg-nav-bar--dark .tg-nav-bar__tab--active {
  color: var(--accent);
  background: rgba(15, 118, 110, 0.15);
}
</style>
