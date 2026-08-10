<template>
  <!-- Realistic iOS-style status bar for device mockups -->
  <div class="status-bar" :class="{ 'status-bar--dark': dark }">
    <div class="status-bar__time">{{ time }}</div>

    <!-- Dynamic Island (iPhone 17 Pro Max) -->
    <div v-if="device === 'phone'" class="status-bar__island"></div>
    <div v-else class="status-bar__spacer"></div>

    <div class="status-bar__icons">
      <!-- Signal -->
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
        <rect x="0" y="8" width="3" height="4" rx="0.5" :fill="barColor" />
        <rect x="5" y="5" width="3" height="7" rx="0.5" :fill="barColor" />
        <rect x="10" y="2" width="3" height="10" rx="0.5" :fill="barColor" />
        <rect x="15" y="0" width="3" height="12" rx="0.5" :fill="barColor" opacity="0.4" />
      </svg>

      <!-- Wi-Fi -->
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
        <path d="M8 11.5L10 9.5C9.4 8.9 8.7 8.6 8 8.6C7.3 8.6 6.6 8.9 6 9.5L8 11.5Z" :fill="barColor"/>
        <path d="M4 7.5C5.1 6.4 6.5 5.8 8 5.8C9.5 5.8 10.9 6.4 12 7.5L10.5 9C9.8 8.3 8.9 7.9 8 7.9C7.1 7.9 6.2 8.3 5.5 9L4 7.5Z" :fill="barColor"/>
        <path d="M1 4.5C2.8 2.7 5.3 1.6 8 1.6C10.7 1.6 13.2 2.7 15 4.5L13.5 6C12.1 4.6 10.1 3.7 8 3.7C5.9 3.7 3.9 4.6 2.5 6L1 4.5Z" :fill="barColor"/>
      </svg>

      <!-- Battery -->
      <div class="status-bar__battery">
        <div class="status-bar__battery-shell">
          <div class="status-bar__battery-fill" :style="{ width: batteryLevel + '%' }"></div>
        </div>
        <div class="status-bar__battery-cap"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  device?: 'phone' | 'tablet'
  dark?: boolean
  time?: string
  batteryLevel?: number
}>(), {
  device: 'phone',
  dark: false,
  time: '9:41',
  batteryLevel: 87,
})

const barColor = computed(() => props.dark ? '#ffffff' : '#000000')
</script>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 28px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.02em;
  font-family: 'Inter', system-ui, sans-serif;
  color: #000000;
  flex-shrink: 0;
  position: relative;
  z-index: 10;
}
.status-bar--dark {
  color: #ffffff;
}
.status-bar__time {
  font-variant-numeric: tabular-nums;
  min-width: 54px;
}
.status-bar__island {
  width: 120px;
  height: 35px;
  background: #000000;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 8px;
}
.status-bar--dark .status-bar__island {
  background: #000000;
}
.status-bar__spacer {
  flex: 1;
}
.status-bar__icons {
  display: flex;
  align-items: center;
  gap: 7px;
}
.status-bar__battery {
  display: flex;
  align-items: center;
  gap: 1px;
}
.status-bar__battery-shell {
  width: 25px;
  height: 12px;
  border: 1.5px solid currentColor;
  border-radius: 3px;
  padding: 1px;
  display: flex;
  align-items: center;
  opacity: 0.9;
}
.status-bar__battery-fill {
  height: 100%;
  background: currentColor;
  border-radius: 1px;
  transition: width 0.3s ease;
}
.status-bar__battery-cap {
  width: 2px;
  height: 5px;
  background: currentColor;
  border-radius: 0 1px 1px 0;
  opacity: 0.9;
}

/* Tablet adjustments */
@media (min-width: 768px) {
  .status-bar {
    height: 38px;
    padding: 0 20px;
    font-size: 14px;
  }
  .status-bar__island {
    display: none;
  }
}
</style>
