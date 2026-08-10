<template>
  <div class="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950 px-4 relative overflow-hidden">
    <!-- Subtle brand glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/6 rounded-full blur-[100px] pointer-events-none"></div>

    <!-- Theme toggle -->
    <div class="absolute top-5 right-5 z-10">
      <ThemeToggle />
    </div>

    <div class="relative w-full max-w-sm">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-2.5 mb-8">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/25">M</div>
        <div>
          <div class="font-bold text-lg tracking-tight">MAKON</div>
          <div class="text-[10px] text-ink-500 uppercase tracking-widest">Real Estate Platform</div>
        </div>
      </NuxtLink>

      <!-- Card -->
      <div class="card p-7">
        <slot />
      </div>

      <p class="text-center text-xs text-ink-400 mt-5">© 2026 MAKON — ERI orqali xavfsiz platforma</p>
    </div>
  </div>
</template>
