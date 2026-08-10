<template>
  <div class="min-h-screen flex">
    <!-- Left: Auth form -->
    <div class="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 relative">
      <!-- Background pattern -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
      </div>

      <div class="w-full max-w-md relative z-10 animate-slide-up">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-12">
          <div class="w-11 h-11 rounded-2xl bg-ink-950 flex items-center justify-center shadow-lg">
            <Building2 :size="22" class="text-white" />
          </div>
          <div>
            <span class="font-display text-xl font-extrabold tracking-tight">MAKON</span>
            <p class="text-[10px] font-semibold text-ink-400 tracking-[0.2em] uppercase">Real Estate Platform</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex p-1 bg-ink-100 rounded-xl mb-8">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
            :class="activeTab === tab.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-400'">
            {{ tab.label }}
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div v-if="activeTab === 'password'" class="space-y-5">
            <div>
              <label class="label">Login</label>
              <input v-model="form.login" type="text" class="input" placeholder="Loginingizni kiriting" />
            </div>
            <div>
              <label class="label">Parol</label>
              <div class="relative">
                <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="input pr-10" placeholder="••••••••" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600 transition-colors" @click="showPass = !showPass">
                  <Eye v-if="!showPass" :size="18" />
                  <EyeOff v-else :size="18" />
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" v-model="form.remember" class="toggle" />
                <span class="text-sm text-ink-600">Eslab qolish</span>
              </label>
              <a href="#" class="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">Parolni unutdingizmi?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-full text-base group">
              <span>Tizimga kirish</span>
              <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div v-else class="space-y-5">
            <div class="text-center py-6">
              <div class="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck :size="32" class="text-brand-600" />
              </div>
              <p class="text-sm text-ink-500 max-w-xs mx-auto">ERI imzo orqali identifikatsiya qiling. Tizim sizni avtomatik tanidi.</p>
            </div>
            <button type="button" class="btn btn-primary btn-lg w-full text-base">
              <Fingerprint :size="18" /> ERI bilan kirish
            </button>
          </div>

          <!-- Divider -->
          <div class="relative py-2">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-ink-100"></div></div>
            <div class="relative flex justify-center"><span class="bg-white px-3 text-xs text-ink-400 font-medium">yoki</span></div>
          </div>

          <!-- Telegram -->
          <button type="button" class="btn btn-outline btn-lg w-full" @click="toast.info('Telegram', 'Tez orada')">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
            Telegram orqali
          </button>
        </form>

        <p class="text-center text-xs text-ink-400 mt-8">© 2026 MAKON · O'zbekiston Respublikasi Davlat xizmatlari portali</p>
      </div>
    </div>

    <!-- Right: Visual showcase -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden bg-ink-950">
      <img src="https://images.unsplash.com/photo-1518455056718-3b9be6f5a7cc?w=1600&q=80"
        class="absolute inset-0 w-full h-full object-cover opacity-50" @error="handleImgError" />
      <div class="absolute inset-0 bg-gradient-to-br from-ink-950/90 via-ink-950/70 to-brand-950/80" />

      <!-- Floating cards -->
      <div class="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-dark border border-white/10">
            <MapPin :size="14" class="text-brand-300" />
            <span class="text-white/80 text-xs font-medium">Tashkent City · O'zbekiston</span>
          </div>
        </div>

        <div class="max-w-lg">
          <h1 class="font-display text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
            Binolaringiz boshqaruvi<br/>
            <span class="gradient-text">bir tizimda</span>
          </h1>
          <p class="text-white/60 text-lg mt-4 leading-relaxed">
            Shartnomalar, to'lovlar va servis — bitta platformada. ERI imzo, Click va Payme integratsiyasi.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-3 mt-10">
            <div v-for="s in stats" :key="s.label" class="glass-dark rounded-2xl p-4 border border-white/10 hover-lift">
              <p class="text-3xl font-bold text-white font-display">{{ s.value }}</p>
              <p class="text-white/50 text-xs mt-1">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-6 text-white/40 text-xs">
          <div class="flex items-center gap-2"><ShieldCheck :size="16" /> ERI imzo</div>
          <div class="flex items-center gap-2"><Zap :size="16" /> Click · Payme</div>
          <div class="flex items-center gap-2"><BarChart3 :size="16" /> Real-time hisobotlar</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ArrowRight, Eye, EyeOff, ShieldCheck, Fingerprint, MapPin, Zap, BarChart3 } from 'lucide-vue-next'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

const activeTab = ref('password')
const showPass = ref(false)
const form = reactive({ login: '', password: '', remember: true })

const tabs = [
  { id: 'password', label: 'Login — parol' },
  { id: 'eri', label: 'ERI imzo' },
]

const stats = [
  { value: '12', label: 'Binolar' },
  { value: '340+', label: 'Ijaraga olingan' },
  { value: '98%', label: "To'lov darajasi" },
]

function handleLogin() {
  if (!form.login || !form.password) {
    toast.error("Ma'lumot to'liq emas", 'Login va parolni kiriting')
    return
  }
  authStore.login({ login: form.login, password: form.password })
  toast.success('Xush kelibsiz', 'MAKON platformasi')
  router.push('/dashboard/executive')
}

function handleImgError() {}
</script>
