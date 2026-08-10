<template>
  <div class="min-h-screen flex">
    <!-- Left: Form -->
    <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 bg-white relative">
      <!-- Logo -->
      <div class="absolute top-8 left-8 flex items-center gap-2.5">
        <div class="w-10 h-10 rounded-xl bg-ink-950 flex items-center justify-center">
          <Building2 :size="20" class="text-white" />
        </div>
        <div>
          <p class="font-display font-bold text-lg leading-none">MAKON</p>
          <p class="text-[10px] text-ink-400 tracking-widest uppercase mt-0.5">Real Estate Platform</p>
        </div>
      </div>

      <div class="w-full max-w-sm mx-auto">
        <h1 class="font-display text-3xl font-bold tracking-tight mb-2">Tizimga kirish</h1>
        <p class="text-ink-500 text-sm mb-8">Boshqaruv paneliga kirish uchun identifikatsiyadan o'ting</p>

        <!-- Auth method tabs -->
        <div class="flex gap-1 p-1 bg-ink-100 rounded-xl mb-6">
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
            :class="authMode === 'password' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400 hover:text-ink-600'"
            @click="authMode = 'password'"
          >
            <Lock :size="16" />
            Login — parol
          </button>
          <button
            class="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all"
            :class="authMode === 'eri' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400 hover:text-ink-600'"
            @click="authMode = 'eri'"
          >
            <ShieldCheck :size="16" />
            ERI imzo
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="authMode === 'password'">
            <label class="label">Email yoki login</label>
            <input v-model="loginVal" type="text" class="input" placeholder="admin" autocomplete="username" />
            <p class="hint">Demo: admin / admin123 yoki tenant / tenant123</p>
          </div>
          <div v-if="authMode === 'password'">
            <label class="label">Parol</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-10"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600" @click="showPassword = !showPassword">
                <Eye v-if="!showPassword" :size="18" />
                <EyeOff v-else :size="18" />
              </button>
            </div>
          </div>

          <div v-if="authMode === 'eri'">
            <label class="label">PINFL (14 raqam)</label>
            <input
              v-model="pinfl"
              type="text"
              maxlength="14"
              class="input font-mono tracking-wider"
              placeholder="12345678901234"
            />
            <p class="hint">ERI orqali elektron imzo bilan kirish</p>
          </div>

          <div v-if="authMode === 'password'" class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-ink-600 cursor-pointer select-none">
              <input type="checkbox" v-model="remember" class="rounded border-ink-300 text-brand-600 focus:ring-brand-500" />
              Eslab qolish
            </label>
            <a href="#" class="text-sm text-brand-600 hover:text-brand-700 font-medium">Parolni unutdingizmi?</a>
          </div>

          <p v-if="error" class="text-sm text-rose-600 bg-rose-50 rounded-lg px-4 py-2.5">{{ error }}</p>

          <button type="submit" class="btn btn-primary btn-lg w-full">
            Tizimga kirish
            <ArrowRight :size="18" />
          </button>
        </form>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-ink-100"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 text-sm text-ink-400">yoki</span>
          </div>
        </div>

        <button class="btn btn-outline btn-lg w-full" @click="loginTelegram">
          <Send :size="18" class="text-sky-500" />
          Telegram orqali kirish
        </button>
      </div>

      <p class="absolute bottom-8 left-0 right-0 text-center text-xs text-ink-400">
        © 2026 MAKON · Ko'chmas mulk boshqaruv platformasi
      </p>
    </div>

    <!-- Right: Visual -->
    <div class="hidden lg:block w-[45%] relative overflow-hidden bg-ink-950">
      <img
        :src="heroImage"
        class="absolute inset-0 w-full h-full object-cover opacity-50"
        @error="handleImgError"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-ink-950/80 via-ink-950/40 to-brand-950/60"></div>

      <!-- Content overlay -->
      <div class="relative h-full flex flex-col justify-end p-12 z-10">
        <div class="absolute top-12 left-12">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
            <MapPin :size="14" class="text-amber-400" />
            <span class="text-white text-sm font-medium">Tashkent City · O'zbekiston</span>
          </div>
        </div>

        <div class="mb-12">
          <p class="font-display text-4xl text-white font-bold leading-tight mb-3">
            Ko'chmas mulkni boshqarish<br />yangi darajada
          </p>
          <p class="text-white/60 text-lg leading-relaxed max-w-md">
            Binolar, shartnomalar, to'lovlar va servislar — bitta tizimda.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4 mb-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <p class="text-2xl font-bold text-white font-display">{{ stat.value }}</p>
            <p class="text-xs text-white/50 mt-1">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Lock, ShieldCheck, Eye, EyeOff, ArrowRight, MapPin, Send } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const router = useRouter()

const authMode = ref<'password' | 'eri'>('password')
const loginVal = ref('admin')
const password = ref('admin123')
const pinfl = ref('')
const showPassword = ref(false)
const remember = ref(true)
const error = ref('')

const heroImage = ref('https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1200&q=80')

const stats = [
  { value: '12', label: 'Binolar' },
  { value: '340+', label: 'Ijaraga olingan' },
  { value: '98%', label: "To'lov darajasi" },
]

function handleSubmit() {
  error.value = ''
  if (authMode.value === 'password') {
    if (authStore.login(loginVal.value, password.value)) {
      router.push(authStore.role === 'TENANT_OWNER' ? '/dashboard/tenant' : '/dashboard/executive')
    } else {
      error.value = "Login yoki parol noto'g'ri"
    }
  } else {
    if (authStore.loginErI(pinfl.value)) {
      router.push('/dashboard/executive')
    } else {
      error.value = "PINFL noto'g'ri (14 raqam kerak)"
    }
  }
}

function loginTelegram() {
  error.value = 'Telegram auth hozircha mavjud emas — login/parol bilan kiring'
}

function handleImgError() {
  heroImage.value = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
}
</script>
