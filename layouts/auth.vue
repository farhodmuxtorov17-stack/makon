<template>
  <div class="min-h-screen flex">
    <!-- Left: Form -->
    <div class="flex-1 flex items-center justify-center p-6 lg:p-12 bg-ink-950 relative overflow-hidden">
      <!-- Background grid -->
      <div class="absolute inset-0 bg-grid opacity-50" />
      <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-transparent" />
      <!-- Glow -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-[120px]" />

      <div class="relative w-full max-w-md animate-fade-in">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-10">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-xl shadow-xl shadow-brand-500/30">
            M
          </div>
          <div>
            <div class="font-bold text-lg text-white tracking-tight">MAKON</div>
            <div class="text-[10px] text-ink-500 uppercase tracking-[0.2em]">Real Estate Platform</div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex gap-1 p-1 rounded-xl bg-white/5 mb-6 w-fit">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            :class="activeTab === tab.id ? 'bg-white text-ink-900' : 'text-ink-400 hover:text-white'"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Login form -->
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="label">Login</label>
            <input v-model="loginForm.login" type="text" class="input" placeholder="Loginingizni kiriting" />
          </div>
          <div>
            <label class="label">Parol</label>
            <div class="relative">
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                class="input pr-10"
                placeholder="••••••••"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-300">
                <Eye v-if="!showPassword" :size="16" />
                <EyeOff v-else :size="16" />
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="loginForm.remember" class="rounded border-white/10 bg-white/5 text-brand-500" />
              <span class="text-ink-400">Eslab qolish</span>
            </label>
            <a href="#" class="text-brand-400 hover:text-brand-300 transition-colors">Parolni unutdingizmi?</a>
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-full">
            Tizimga kirish
            <ArrowRight :size="18" />
          </button>
          <div class="flex items-center gap-3 py-2">
            <div class="flex-1 h-px bg-white/5" />
            <span class="text-xs text-ink-600">yoki</span>
            <div class="flex-1 h-px bg-white/5" />
          </div>
          <button type="button" class="btn btn-secondary btn-lg w-full" @click="$router.push('/register/eri')">
            <ShieldCheck :size="18" class="text-brand-400" />
            ERI orqali kirish
          </button>
        </form>

        <!-- ERI form -->
        <form v-else @submit.prevent="handleEriLogin" class="space-y-4">
          <div class="card p-6 text-center">
            <div class="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck :size="32" class="text-brand-400" />
            </div>
            <h3 class="text-white font-semibold mb-1">ERI orqali kirish</h3>
            <p class="text-sm text-ink-500 mb-4">Elektron raqamli imzo sertifikatini tanlang</p>
            <button type="button" class="btn btn-primary btn-lg w-full" @click="handleEriLogin">
              Sertifikatni tanlash
            </button>
          </div>
        </form>

        <p class="text-xs text-ink-600 mt-8 text-center">
          © 2026 MAKON · O'zbekiston Respublikasi
        </p>
      </div>
    </div>

    <!-- Right: Showcase -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden bg-ink-900">
      <!-- Background image -->
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80');" />
      <div class="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-900/80 to-brand-900/60" />

      <!-- Content -->
      <div class="relative flex flex-col justify-end p-12 pb-16 z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 w-fit">
          <MapPin :size="14" class="text-brand-400" />
          <span class="text-xs text-ink-300">Tashkent City · O'zbekiston</span>
        </div>
        <h1 class="text-4xl font-bold text-white mb-4 leading-tight max-w-md">
          Binolaringiz boshqaruvi
          <span class="text-gradient">bir tizimda</span>
        </h1>
        <p class="text-ink-400 text-lg mb-8 max-w-md">
          Shartnomalar, to'lovlar va servis — bitta platformada. ERI imzo, 3D navigatsiya va real-time monitoring.
        </p>
        <div class="flex gap-6">
          <div class="glass rounded-2xl p-4 flex-1">
            <div class="text-2xl font-bold text-white">12</div>
            <div class="text-sm text-ink-400">Binolar</div>
          </div>
          <div class="glass rounded-2xl p-4 flex-1">
            <div class="text-2xl font-bold text-white">340+</div>
            <div class="text-sm text-ink-400">Ijaraga olingan</div>
          </div>
          <div class="glass rounded-2xl p-4 flex-1">
            <div class="text-2xl font-bold text-white">98%</div>
            <div class="text-sm text-ink-400">To'lov darajasi</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff, ArrowRight, ShieldCheck, MapPin } from 'lucide-vue-next'

const authStore = useAuthStore()
const router = useRouter()

const activeTab = ref('login')
const showPassword = ref(false)
const tabs = [
  { id: 'login', label: 'Login — parol' },
  { id: 'eri', label: 'ERI imzo' },
]

const loginForm = reactive({
  login: '',
  password: '',
  remember: false,
})

function handleLogin() {
  if (!loginForm.login) loginForm.login = 'admin'
  if (!loginForm.password) loginForm.password = 'admin'
  authStore.login(loginForm.login, loginForm.password)
  router.push('/dashboard')
}

function handleEriLogin() {
  authStore.login('admin', 'admin')
  router.push('/dashboard')
}
</script>
