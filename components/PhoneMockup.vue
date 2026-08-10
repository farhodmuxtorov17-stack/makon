<template>
  <div class="iphone-frame" style="width: 280px; height: 580px;">
    <div class="iphone-screen w-full h-full">
      <div class="iphone-island" />

      <!-- Status bar -->
      <div class="absolute top-0 left-0 right-0 flex items-center justify-between px-7 pt-3.5 z-40 text-white text-[11px] font-medium">
        <span>9:41</span>
        <div class="flex items-center gap-1">
          <Wifi :size="12" :stroke-width="2" />
          <BatteryFull :size="14" :stroke-width="2" />
        </div>
      </div>

      <!-- Mini app -->
      <div class="pt-12 pb-16 h-full bg-ink-975 overflow-hidden">
        <!-- Header -->
        <div class="px-4 pb-3 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
              <Building2 :size="18" :stroke-width="2" class="text-white" />
            </div>
            <div>
              <div class="text-white text-sm font-bold font-display">MAKON</div>
              <div class="text-white/40 text-[10px]">Boshqaruv paneli</div>
            </div>
          </div>
          <Bell :size="16" :stroke-width="2" class="text-white/40" />
        </div>

        <!-- Stats -->
        <div class="px-4 grid grid-cols-2 gap-2.5 mb-3">
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center mb-2">
              <TrendingUp :size="14" :stroke-width="2" class="text-emerald-400" />
            </div>
            <div class="text-white text-base font-bold font-display">₸ 8.2M</div>
            <div class="text-white/30 text-[10px]">Daromad · Oy</div>
          </div>
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center mb-2">
              <Building2 :size="14" :stroke-width="2" class="text-brand-400" />
            </div>
            <div class="text-white text-base font-bold font-display">5</div>
            <div class="text-white/30 text-[10px]">Binolar</div>
          </div>
        </div>

        <!-- Mini chart -->
        <div class="px-4 mb-3">
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="flex items-center justify-between mb-2">
              <div class="text-white/70 text-[11px] font-semibold">Daromad dinamikasi</div>
              <div class="text-emerald-400 text-[10px] font-semibold">+12.5%</div>
            </div>
            <div class="flex items-end gap-1 h-14">
              <div v-for="(h, i) in bars" :key="i" class="flex-1 rounded-t-sm" :class="i === bars.length - 1 ? 'bg-brand-500' : 'bg-brand-500/30'" :style="{ height: h + '%' }"></div>
            </div>
          </div>
        </div>

        <!-- Building list -->
        <div class="px-4">
          <div class="flex items-center justify-between mb-2">
            <div class="text-white/70 text-[11px] font-semibold">Binolar</div>
            <ChevronRight :size="14" :stroke-width="2" class="text-brand-400" />
          </div>
          <div class="space-y-2">
            <div class="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-lg bg-brand-500/15 flex items-center justify-center">
                <Building :size="16" :stroke-width="2" class="text-brand-400" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white text-xs font-medium truncate">Urban Office</div>
                <div class="text-white/30 text-[10px]">Toshkent · 60 unit</div>
              </div>
              <span class="bg-emerald-500/15 text-emerald-400 text-[9px] font-semibold rounded px-1.5 py-0.5">94%</span>
            </div>
            <div class="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <Building :size="16" :stroke-width="2" class="text-emerald-400" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white text-xs font-medium truncate">Business Plaza</div>
                <div class="text-white/30 text-[10px]">Samarqand · 42 unit</div>
              </div>
              <span class="bg-emerald-500/15 text-emerald-400 text-[9px] font-semibold rounded px-1.5 py-0.5">88%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom nav -->
      <div class="absolute bottom-0 left-0 right-0 h-14 bg-ink-975/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around">
        <LayoutGrid :size="18" :stroke-width="2" class="text-brand-400" />
        <Building2 :size="18" :stroke-width="1.5" class="text-white/30" />
        <CreditCard :size="18" :stroke-width="1.5" class="text-white/30" />
        <User :size="18" :stroke-width="1.5" class="text-white/30" />
      </div>

      <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-50"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wifi, BatteryFull, Bell, TrendingUp, Building2, Building, ChevronRight, LayoutGrid, CreditCard, User } from 'lucide-vue-next'
const bars = [40, 55, 35, 70, 60, 85, 95]
</script>
