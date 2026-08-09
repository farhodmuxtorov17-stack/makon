<template>
  <div class="tablet-frame" :style="{ width: width, height: height }">
    <div class="tablet-screen w-full h-full">
      <!-- Mini dashboard preview -->
      <div class="h-full bg-ink-975 flex">
        <!-- Sidebar (mini) -->
        <div class="w-1/5 bg-ink-950 border-r border-white/5 p-3 flex flex-col">
          <div class="flex items-center gap-2 mb-5">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg>
            </div>
            <div class="text-white text-xs font-bold font-display">MAKON</div>
          </div>
          <div class="space-y-1.5">
            <div v-for="i in 5" :key="i" class="flex items-center gap-2 rounded-lg px-2 py-1.5" :class="i === 1 ? 'bg-brand-600/30' : ''">
              <div class="w-4 h-4 rounded" :class="i === 1 ? 'bg-brand-400/40' : 'bg-white/10'"></div>
              <div class="h-1.5 rounded-full bg-white/10 flex-1" :style="{ width: `${60 + i * 5}%` }"></div>
            </div>
          </div>
        </div>

        <!-- Main content -->
        <div class="flex-1 p-4 overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between mb-3">
            <div class="h-3 w-24 bg-white/10 rounded-full"></div>
            <div class="h-6 w-6 rounded-full bg-white/5"></div>
          </div>
          <!-- Stat cards -->
          <div class="grid grid-cols-3 gap-2 mb-3">
            <div v-for="i in 3" :key="i" class="bg-white/5 rounded-xl p-2.5 border border-white/5">
              <div class="h-1.5 w-12 bg-white/10 rounded-full mb-2"></div>
              <div class="h-4 w-16 rounded-md mb-1" :class="i === 1 ? 'bg-emerald-500/30' : i === 2 ? 'bg-brand-500/30' : 'bg-gold-500/30'"></div>
              <div class="h-1.5 w-10 bg-white/5 rounded-full"></div>
            </div>
          </div>
          <!-- Chart area -->
          <div class="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
            <div class="flex items-end gap-1.5 h-20">
              <div v-for="i in 12" :key="i" class="flex-1 rounded-t-sm" :class="i % 2 === 0 ? 'bg-brand-500/40' : 'bg-brand-500/20'" :style="{ height: `${30 + Math.sin(i) * 40 + 30}%` }"></div>
            </div>
          </div>
          <!-- Table rows -->
          <div class="space-y-1.5">
            <div v-for="i in 4" :key="i" class="flex items-center gap-2 bg-white/5 rounded-lg p-2">
              <div class="w-6 h-6 rounded-lg bg-white/10"></div>
              <div class="h-1.5 flex-1 bg-white/10 rounded-full"></div>
              <div class="h-4 w-12 rounded" :class="i % 2 === 0 ? 'bg-emerald-500/20' : 'bg-gold-500/20'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
}>(), {
  width: '360px',
  height: '248px',
})
</script>
