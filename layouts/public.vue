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
  
    <!-- Macon AI Assistant Widget -->
    <div class="macon-ai-widget">
      <!-- Chat Panel -->
      <Transition name="macon-ai">
        <div v-if="aiOpen" class="macon-ai-panel">
          <div class="macon-ai-panel__header">
            <div class="macon-ai-panel__avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="macon-ai-panel__info">
              <div class="macon-ai-panel__name">Macon AI</div>
              <div class="macon-ai-panel__status">
                <span class="macon-ai-panel__dot"></span> Onlayn
              </div>
            </div>
            <button @click="aiOpen = false" class="macon-ai-panel__close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div ref="aiBody" class="macon-ai-panel__body">
            <div class="macon-ai-msg macon-ai-msg--bot">
              Assalomu alaykum! 👋<br>Men Macon AI — sizga ofis maydoni topishda yordam beraman. Qanday yordam bera olaman?
            </div>
            <div v-for="(msg, i) in aiMessages" :key="i" :class="['macon-ai-msg', msg.bot ? 'macon-ai-msg--bot' : 'macon-ai-msg--user']">
              {{ msg.text }}
            </div>
          </div>
          <div class="macon-ai-panel__footer">
            <div class="macon-ai-quick">
              <button @click="aiInput = 'Bo\'sh ofislar bormi?'" class="macon-ai-quick__btn">Bo'sh ofislar</button>
              <button @click="aiInput = 'Narxlar qancha?'" class="macon-ai-quick__btn">Narxlar</button>
              <button @click="aiInput = 'ERI nima?'" class="macon-ai-quick__btn">ERI haqida</button>
            </div>
            <div class="macon-ai-input-wrap">
              <input
                v-model="aiInput"
                type="text"
                placeholder="Xabar yozing..."
                @keydown.enter.prevent="sendAiMessage"
                class="macon-ai-input"
              />
              <button @click="sendAiMessage" class="macon-ai-send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Floating Button -->
      <button @click="aiOpen = !aiOpen" class="macon-ai-fab" :class="{ 'macon-ai-fab--active': aiOpen }">
        <svg v-if="!aiOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <span v-if="!aiOpen" class="macon-ai-fab__badge">1</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const aiOpen = ref(false)
const aiMessages = ref([])
const aiInput = ref('')
const aiBody = ref(null)

function sendAiMessage() {
  if (!aiInput.value.trim()) return
  const q = aiInput.value.toLowerCase()
  aiMessages.value.push({ text: aiInput.value, bot: false })
  aiInput.value = ''
  let reply = ''
  if (q.includes('narx') || q.includes('price')) reply = 'Narxlar oyiga 15-25 mln so\'mdan boshlanadi. Katalog bo\'limida batafsil ko\'rishingiz mumim.'
  else if (q.includes('ofis') || q.includes('office') || q.includes('bo\'sh')) reply = 'Hozirda 47 ta bo\'sh maydon mavjud. Katalogga o\'tib tanlang.'
  else if (q.includes('eri')) reply = 'ERI — Elektron Raqamli Imzo. Shartnomalarni onlayn xavfsiz imzolash uchun.'
  else if (q.includes('bino') || q.includes('building')) reply = '12 ta premium bino boshqarilmoqda.'
  else reply = 'Rahmat! So\'rovingiz qabul qilindi.'
  setTimeout(() => {
    aiMessages.value.push({ text: reply, bot: true })
    nextTick(() => {
      if (aiBody.value) aiBody.value.scrollTop = aiBody.value.scrollHeight
    })
  }, 600)
}
</script>

<style scoped>

/* Macon AI Transition */
.macon-ai-enter-active, .macon-ai-leave-active {
  transition: all 0.3s ease;
}
.macon-ai-enter-from, .macon-ai-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

</style>
