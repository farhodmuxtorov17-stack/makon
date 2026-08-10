<template>
  <div class="min-h-screen bg-ink-950 flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-grid opacity-40"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px]"></div>

    <div class="relative w-full max-w-md">
      <NuxtLink to="/" class="flex items-center justify-center gap-2.5 mb-8">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30">M</div>
        <span class="font-bold text-xl tracking-tight">MAKON</span>
      </NuxtLink>

      <div class="card p-8 animate-fade-in">
        <slot />
      </div>

      <p class="text-center text-xs text-ink-600 mt-6">© 2026 MAKON — ERI orqali xavfsiz platforma</p>
    </div>
  </div>
</template>
