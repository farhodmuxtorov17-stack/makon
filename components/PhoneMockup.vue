<template>
  <div class="iphone-frame" :style="{ width: '320px', height: '660px' }">
    <div class="iphone-screen w-full h-full">
      <!-- Dynamic Island -->
      <div class="iphone-dynamic-island" />

      <!-- Status Bar -->
      <div class="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-4 z-40 text-white text-xs font-medium">
        <span>9:41</span>
        <div class="flex items-center gap-1.5">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><path d="M1 8.5h2v-2H1v2zm4 0h2V5H5v3.5zm4 0h2V2H9v6.5zm4 0h2V0h-2v8.5z" opacity="0.9" /></svg>
          <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 0C4.2 0 1.6 1 0 2.5l1 1C2.3 2.3 4.5 1.5 7 1.5s4.7.8 6 2l1-1C12.4 1 9.8 0 7 0zm0 3C5.2 3 3.5 3.8 2.5 4.8l1 1C4.2 5.1 5.5 4.5 7 4.5s2.8.6 3.5 1.3l1-1C10.5 3.8 8.8 3 7 3zm0 3c-1 0-1.8.4-2.3.9l1 1c.3-.3.8-.5 1.3-.5s1 .2 1.3.5l1-1C8.8 6.4 8 6 7 6z" opacity="0.9" /></svg>
          <div class="flex items-center gap-0.5">
            <div class="relative w-6 h-3 rounded-sm border border-white/60">
              <div class="absolute inset-0.5 bg-white rounded-[1px]" style="width: 70%"></div>
            </div>
            <div class="w-0.5 h-1.5 bg-white/60 rounded-r"></div>
          </div>
        </div>
      </div>

      <!-- Mini App Content -->
      <div class="pt-14 pb-20 h-full overflow-hidden bg-ink-975">
        <!-- Telegram header -->
        <div class="px-4 pb-3 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <div>
              <div class="text-white text-sm font-semibold font-display">MAKON</div>
              <div class="text-white/40 text-[10px]">Boshqaruv paneli</div>
            </div>
          </div>
          <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" opacity="0.6"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="px-4 grid grid-cols-2 gap-2.5 mb-3">
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
              </div>
            </div>
            <div class="text-white text-lg font-bold font-display">₸ 8.2M</div>
            <div class="text-white/30 text-[10px]">Daromad · Oy</div>
          </div>
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 12h18" /></svg>
              </div>
            </div>
            <div class="text-white text-lg font-bold font-display">5</div>
            <div class="text-white/30 text-[10px]">Binolar</div>
          </div>
        </div>

        <!-- Revenue chart mini -->
        <div class="px-4 mb-3">
          <div class="bg-white/5 rounded-2xl p-3 border border-white/5">
            <div class="flex items-center justify-between mb-2.5">
              <div class="text-white/70 text-[11px] font-semibold">Daromad dinamikasi</div>
              <div class="text-emerald-400 text-[10px] font-semibold">+12.5% ↑</div>
            </div>
            <div class="flex items-end gap-1.5 h-16">
              <div class="flex-1 bg-brand-500/30 rounded-t-md" style="height: 40%"></div>
              <div class="flex-1 bg-brand-500/40 rounded-t-md" style="height: 55%"></div>
              <div class="flex-1 bg-brand-500/50 rounded-t-md" style="height: 35%"></div>
              <div class="flex-1 bg-brand-500/60 rounded-t-md" style="height: 70%"></div>
              <div class="flex-1 bg-brand-500/70 rounded-t-md" style="height: 60%"></div>
              <div class="flex-1 bg-brand-500/80 rounded-t-md" style="height: 85%"></div>
              <div class="flex-1 bg-brand-500 rounded-t-md" style="height: 95%"></div>
            </div>
          </div>
        </div>

        <!-- Building list -->
        <div class="px-4">
          <div class="flex items-center justify-between mb-2">
            <div class="text-white/70 text-[11px] font-semibold">Binolar roʻyxati</div>
            <div class="text-brand-400 text-[10px] font-semibold">Barchasi →</div>
          </div>
          <div class="space-y-2">
            <div class="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5"><path d="M3 21h18M5 21V5l7-3v19M19 21V9l-7-3" /><path d="M9 7v.01M9 11v.01M9 15v.01" /></svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white text-xs font-medium truncate">Urban Office</div>
                <div class="text-white/30 text-[10px]">Toshkent · 60 unit</div>
              </div>
              <div class="badge-success rounded-md px-1.5 py-0.5 text-[9px]">94%</div>
            </div>
            <div class="bg-white/5 rounded-xl p-2.5 border border-white/5 flex items-center gap-2.5">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="1" /><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" /></svg>
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white text-xs font-medium truncate">Business Plaza</div>
                <div class="text-white/30 text-[10px]">Samarqand · 42 unit</div>
              </div>
              <div class="badge-success rounded-md px-1.5 py-0.5 text-[9px]">88%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Nav -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-ink-975/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2">
        <div class="flex flex-col items-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
          <div class="text-brand-400 text-[8px] font-medium">Panel</div>
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"><path d="M3 21h18M5 21V5l7-3v19M19 21V9l-7-3" /></svg>
          <div class="text-white/30 text-[8px]">Binolar</div>
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
          <div class="text-white/30 text-[8px]">Toʻlov</div>
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
          <div class="text-white/30 text-[8px]">Profil</div>
        </div>
      </div>

      <!-- Home indicator -->
      <div class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// MAKON Telegram Mini-App preview inside iPhone 17 Pro Max mockup
</script>
