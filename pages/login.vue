<template>
  <div class="min-h-screen flex">
    <!-- Left: Brand showcase -->
    <div class="hidden lg:flex lg:w-[48%] bg-ink-950 relative overflow-hidden flex-col justify-between p-12">
      <!-- Gradient glows -->
      <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div class="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <!-- Top nav -->
      <div class="relative z-10 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
            </svg>
          </div>
          <div>
            <p class="text-white font-bold text-xl font-display tracking-tight">MAKON</p>
            <p class="text-[10px] text-ink-400 font-medium tracking-widest uppercase">Real Estate Platform</p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-sm">
          <button class="text-ink-400 hover:text-white transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Platforma haqida
          </button>
          <button class="text-ink-400 hover:text-white transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z M9 4v16 M15 6v16" />
            </svg>
            O'zbekcha
          </button>
        </div>
      </div>

      <!-- Center: 3D Building Showcase -->
      <div class="relative z-10 flex flex-col items-center justify-center flex-1 py-12">
        <Building3DHero />
      </div>

      <!-- Bottom: Features -->
      <div class="relative z-10 grid grid-cols-2 gap-4">
        <div class="glass-dark rounded-2xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p class="text-white font-semibold text-sm">Xavfsiz ulanish</p>
              <p class="text-ink-400 text-xs">SSL 256-bit shifrlash</p>
            </div>
          </div>
        </div>
        <div class="glass-dark rounded-2xl p-5">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p class="text-white font-semibold text-sm">Ma'lumotlar himoyasi</p>
              <p class="text-ink-400 text-xs">ISO/IEC 27001 standarti</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Auth form -->
    <div class="flex-1 flex items-center justify-center p-6 md:p-12 bg-ink-50 relative overflow-hidden">
      <!-- Subtle background glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div class="w-full max-w-md relative z-10 animate-fade-in-up">
        <!-- Mobile logo -->
        <div class="lg:hidden flex items-center gap-3 mb-8 justify-center">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" />
            </svg>
          </div>
          <div>
            <p class="text-ink-900 font-bold text-2xl font-display tracking-tight">MAKON</p>
            <p class="text-[10px] text-ink-400 font-medium tracking-widest uppercase">Real Estate Platform</p>
          </div>
        </div>

        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-ink-900 font-display tracking-tight">Xush kelibsiz</h1>
          <p class="text-ink-400 mt-2">Boshqaruv paneliga kirish uchun tizimga kiring</p>
        </div>

        <!-- Tab switcher -->
        <div class="flex gap-1 p-1 bg-ink-100 rounded-xl mb-6">
          <button
            :class="[
              'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
              mode === 'eri' ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-400 hover:text-ink-600'
            ]"
            @click="mode = 'eri'"
          >
            ERI orqali kirish
          </button>
          <button
            :class="[
              'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
              mode === 'password' ? 'bg-white text-brand-700 shadow-sm' : 'text-ink-400 hover:text-ink-600'
            ]"
            @click="mode = 'password'"
          >
            Login — parol
          </button>
        </div>

        <!-- ERI Info banner -->
        <transition name="slide" mode="default">
          <div v-if="mode === 'eri'" class="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-4.5 h-4.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-emerald-900">Eng xavfsiz usul</p>
              <p class="text-xs text-emerald-700 mt-0.5">Elektron raqamli imzo yordamida tizimga kiring</p>
            </div>
          </div>
        </transition>

        <!-- Form -->
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <template v-if="mode === 'eri'">
            <div>
              <label class="label">Tashkilot nomi <span class="text-rose-500">*</span></label>
              <select class="input cursor-pointer">
                <option>Urban Office MCHJ</option>
                <option>Makon Development MCHJ</option>
                <option>Tashkent Real Estate MCHJ</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="label">STIR <span class="text-rose-500">*</span></label>
                <input class="input" placeholder="305 123 456" />
              </div>
              <div>
                <label class="label">Telefon raqam <span class="text-rose-500">*</span></label>
                <input class="input" placeholder="+998 90 123 45 67" />
              </div>
            </div>
            <div>
              <label class="label">Foydalanuvchi <span class="text-rose-500">*</span></label>
              <input class="input" placeholder="Azizbek Karimov" />
            </div>
          </template>
          <template v-else>
            <div>
              <label class="label">Login <span class="text-rose-500">*</span></label>
              <input v-model="loginInput" class="input" placeholder="admin" />
            </div>
            <div>
              <label class="label">Parol <span class="text-rose-500">*</span></label>
              <div class="relative">
                <input v-model="passwordInput" :type="showPassword ? 'text' : 'password'" class="input pr-11" placeholder="••••••••" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-.03m3.29.03l3.29.03M3 3l18 18" />
                  </svg>
                </button>
              </div>
            </div>
          </template>

          <div v-if="error" class="text-sm text-rose-600 bg-rose-50 rounded-lg px-4 py-2.5">{{ error }}</div>

          <!-- Submit -->
          <button type="submit" class="w-full btn-primary-glow btn-lg" :disabled="loading">
            <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span v-else>{{ mode === 'eri' ? 'ERI orqali tasdiqlash' : 'Tizimga kirish' }}</span>
          </button>

          <p v-if="mode === 'eri'" class="text-xs text-center text-ink-400">
            ERI qurilmangiz ulanganligiga ishonch hosil qing
          </p>
        </form>

        <!-- Demo notice -->
        <div class="mt-6 p-4 rounded-xl bg-ink-100/60 border border-ink-200/60 flex items-start gap-3">
          <svg class="w-5 h-5 text-ink-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p class="text-xs font-semibold text-ink-600">Demo kirish</p>
            <p class="text-xs text-ink-400 mt-0.5">Login: <code class="font-mono bg-white rounded px-1.5 py-0.5 text-brand-600">admin</code> · Parol: <code class="font-mono bg-white rounded px-1.5 py-0.5 text-brand-600">admin123</code></p>
          </div>
        </div>

        <!-- Footer -->
        <p class="mt-6 text-center text-xs text-ink-400">
          Yordam kerakmi? <a href="#" class="text-brand-600 font-semibold hover:text-brand-700 transition-colors">Yordam va qo'llanma</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import Building3DHero from '~/components/Building3DHero.vue'

definePageMeta({ middleware: 'guest', layout: 'auth' })
const authStore = useAuthStore()
const router = useRouter()

const mode = ref<'eri' | 'password'>('eri')
const loginInput = ref('')
const passwordInput = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

function handleSubmit() {
  error.value = ''
  loading.value = true

  setTimeout(() => {
    if (mode.value === 'password') {
      if (!authStore.login(loginInput.value, passwordInput.value)) {
        error.value = 'Login yoki parol noto\'g\'ri. Demo: admin / admin123'
        loading.value = false
        return
      }
    } else {
      // ERI mode — auto-success for demo
      authStore.loginErI('30512345678901')
    }
    loading.value = false
    router.push('/dashboard/executive')
  }, 800)
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.25s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
