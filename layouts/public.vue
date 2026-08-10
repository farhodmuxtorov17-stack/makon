<template>
  <div class="min-h-screen admin-bg text-ink-900 dark:text-white">
    <!-- Public Header -->
    <header class="fixed top-0 left-0 right-0 z-50 glass border-b border-black/5 dark:border-white/5">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-brand-500/30">
            M
          </div>
          <span class="font-bold text-lg tracking-tight text-ink-900 dark:text-white">MAKON</span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Bosh sahifa</NuxtLink>
          <NuxtLink to="/catalog" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Katalog</NuxtLink>
          <a href="#features" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Imkoniyatlar</a>
          <a href="#pricing" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Narxlar</a>
          <a href="#about" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Biz haqimizda</a>
          <a href="#contacts" class="text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Bog'lanish</a>
        </nav>

        <div class="flex items-center gap-3">
          <ThemeToggle />
          <NuxtLink to="/login" class="btn btn-ghost btn-sm hidden sm:flex">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="btn btn-primary btn-sm">Ro'yxatdan o'tish</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Public Footer -->
    <footer class="border-t border-black/5 dark:border-white/5 mt-20">
      <div class="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-sm">M</div>
              <span class="font-bold tracking-tight text-ink-900 dark:text-white">MAKON</span>
            </div>
            <p class="text-sm text-ink-500 max-w-xs">Toshkentdagi premium ko'chmas mulk obyektlarini boshqarish va ijaraga berish uchun yagona raqamli platforma.</p>
          </div>
          <div>
            <div class="text-xs font-semibold text-ink-600 dark:text-ink-400 uppercase tracking-widest mb-3">Platforma</div>
            <div class="space-y-2">
              <NuxtLink to="/catalog" class="block text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Katalog</NuxtLink>
              <NuxtLink to="/login" class="block text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Tizimga kirish</NuxtLink>
              <NuxtLink to="/register/eri" class="block text-sm text-ink-500 hover:text-ink-900 dark:hover:text-white transition-colors">Ro'yxatdan o'tish</NuxtLink>
            </div>
          </div>
          <div>
            <div class="text-xs font-semibold text-ink-600 dark:text-ink-400 uppercase tracking-widest mb-3">Bog'lanish</div>
            <div class="space-y-2 text-sm text-ink-500">
              <p>Toshkent, O'zbekiston</p>
              <p>+998 71 200 00 00</p>
              <p>info@makon.uz</p>
            </div>
          </div>
        </div>
        <div class="mt-10 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-ink-500">
          <p>© 2026 MAKON. Barcha huquqlar himoyalangan.</p>
          <p>ERI orqali xavfsiz identifikatsiya</p>
        </div>
      </div>
    </footer>
  </div>
</template>
