<template>
  <div class="min-h-screen flex bg-white">
    <!-- Left: Form -->
    <div class="flex-1 flex flex-col lg:max-w-[520px] xl:max-w-[560px] relative z-10 bg-white">
      <!-- Logo -->
      <div class="px-8 lg:px-12 py-7">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-ink-950 flex items-center justify-center">
            <Building2 :size="18" :stroke-width="2" class="text-white" />
          </div>
          <div>
            <div class="font-display font-bold text-ink-900 text-base leading-none">MAKON</div>
            <div class="text-[9px] text-ink-400 font-medium tracking-widest uppercase mt-0.5">Real Estate Platform</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Form -->
      <div class="flex-1 flex items-center justify-center px-8 lg:px-12 pb-8">
        <div class="w-full max-w-[380px]">
          <h1 class="font-display text-[28px] font-bold text-ink-900 mb-2 tracking-tight">Tizimga kirish</h1>
          <p class="text-ink-500 text-sm mb-8">Boshqaruv paneliga kirish uchun identifikatsiyadan oʻting</p>

          <!-- Tabs -->
          <div class="flex p-1 bg-ink-100 rounded-xl mb-6">
            <button
              v-for="tab in tabs" :key="tab.id" class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              :class="activeTab === tab.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500 hover:text-ink-700'"
              @click="activeTab = tab.id"
            >
              <component :is="tab.icon" :size="16" :stroke-width="2" />
              {{ tab.label }}
            </button>
          </div>

          <!-- ERI form -->
          <div v-if="activeTab === 'eri'" class="space-y-4">
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-ink-50 border border-ink-200/60">
              <div class="w-8 h-8 rounded-lg bg-ink-900 flex items-center justify-center flex-shrink-0">
                <ShieldCheck :size="16" :stroke-width="2" class="text-white" />
              </div>
              <div class="pt-0.5">
                <div class="text-ink-900 text-sm font-semibold leading-tight">Elektron raqamli imzo</div>
                <div class="text-ink-500 text-xs mt-0.5">ERI orqali xavfsiz kirish — E-xujjat.uz</div>
              </div>
            </div>
            <div>
              <label class="label">Tashkilot</label>
              <select v-model="form.org" class="input cursor-pointer">
                <option>Urban Office MCHJ</option>
                <option>Business Plaza Group</option>
                <option>Makon Properties</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="label">STIR</label><input v-model="form.stir" class="input" placeholder="305 123 456" /></div>
              <div><label class="label">Telefon</label><input v-model="form.phone" class="input" placeholder="+998 90 123 45 67" /></div>
            </div>
            <div><label class="label">Foydalanuvchi</label><input v-model="form.user" class="input" placeholder="Azizbek Karimov" /></div>
            <button class="btn btn-primary w-full btn-lg" @click="login">
              <ShieldCheck :size="18" :stroke-width="2" />
              ERI orqali tasdiqlash
            </button>
          </div>

          <!-- Password form -->
          <div v-else class="space-y-4">
            <div>
              <label class="label">Email yoki login</label>
              <input v-model="form.email" class="input" placeholder="admin@makon.uz" @keyup.enter="login" />
            </div>
            <div>
              <label class="label">Parol</label>
              <div class="relative">
                <input v-model="form.pass" class="input pr-10" :type="showPass ? 'text' : 'password'" placeholder="••••••••" @keyup.enter="login" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600" @click="showPass = !showPass">
                  <Eye v-if="!showPass" :size="18" :stroke-width="2" />
                  <EyeOff v-else :size="18" :stroke-width="2" />
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.remember" type="checkbox" class="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-200" />
                <span class="text-sm text-ink-600">Eslab qolish</span>
              </label>
              <a class="text-sm text-ink-500 hover:text-ink-900 font-medium cursor-pointer">Parolni unutdingizmi?</a>
            </div>
            <button class="btn btn-primary w-full btn-lg" @click="login">
              Tizimga kirish
              <ArrowRight :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-ink-100"></div>
            <span class="text-xs text-ink-400 font-medium">yoki</span>
            <div class="flex-1 h-px bg-ink-100"></div>
          </div>

          <!-- Telegram -->
          <button class="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-ink-200 hover:border-ink-300 hover:bg-ink-50 transition-all duration-200">
            <Send :size="18" :stroke-width="2" class="text-sky-500" />
            <span class="text-sm font-semibold text-ink-700">Telegram orqali kirish</span>
          </button>

          <!-- Demo hint -->
          <div class="mt-6 p-3 rounded-xl bg-ink-50 border border-ink-200/40">
            <p class="text-xs text-ink-500 text-center leading-relaxed">
              <span class="font-semibold text-ink-700">Demo:</span> <code class="text-brand-600">admin@makon.uz</code> (boshqaruv) · <code class="text-brand-600">tenant@makon.uz</code> (ijarachi)
            </p>
          </div>

          <div class="mt-6 text-center text-xs text-ink-400">
            © 2026 MAKON Real Estate
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Real Tashkent photography -->
    <div class="hidden lg:block flex-1 relative overflow-hidden">
      <img :src="asset('/tashkent/city-night.jpg')" alt="Tashkent City" class="absolute inset-0 w-full h-full object-cover" />
      <!-- Subtle dark overlay for text legibility -->
      <div class="absolute inset-0 bg-ink-950/40"></div>

      <!-- Content overlay -->
      <div class="absolute inset-0 flex flex-col justify-between p-12">
        <!-- Top: tagline -->
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="text-white/80 text-xs font-medium">Toshkent City · Oʻzbekiston</span>
          </div>
        </div>

        <!-- Bottom: brand statement -->
        <div class="max-w-md">
          <h2 class="font-display text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
            Koʻchmulk boshqaruvi<br>yangi darajada
          </h2>
          <p class="text-white/60 text-sm leading-relaxed max-w-sm">
            Binolar, shartnomalar, toʻlovlar va servislar — bitta tizimda. 
            Toshkentning yetakchi biznes-markazlari uchun moʻljallangan.
          </p>
          <div class="flex items-center gap-6 mt-6">
            <div v-for="p in platformBadges" :key="p.label" class="flex items-center gap-2 text-white/50 text-xs font-medium">
              <component :is="p.icon" :size="14" :stroke-width="2" />
              {{ p.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ShieldCheck, Eye, EyeOff, ArrowRight, Send, Smartphone, Monitor, Apple, Lock } from 'lucide-vue-next'
definePageMeta({ middleware: 'guest', layout: 'auth' })

const activeTab = ref<'eri' | 'pass'>('pass')
const showPass = ref(false)
const router = useRouter()
const auth = useAuthStore()
const asset = useAssetPath()

const tabs = [
  { id: 'pass' as const, label: 'Login — parol', icon: Lock },
  { id: 'eri' as const, label: 'ERI imzo', icon: ShieldCheck },
]
const platformBadges = [
  { label: 'Web', icon: Monitor },
  { label: 'iOS', icon: Apple },
  { label: 'Android', icon: Smartphone },
  { label: 'Telegram', icon: Send },
]

const form = reactive({
  org: 'Urban Office MCHJ', stir: '305 123 456', phone: '+998 90 123 45 67', user: 'Azizbek Karimov',
  email: '', pass: '', remember: true
})

function login() {
  if (activeTab.value === 'eri') {
    auth.login('admin', 'admin123')
    router.push('/dashboard/executive')
  } else {
    const isTenant = form.email === 'tenant@makon.uz' || form.email === 'tenant'
    if (isTenant) {
      auth.login('tenant', 'tenant123')
      router.push('/dashboard/tenant')
    } else {
      auth.login('admin', 'admin123')
      router.push('/dashboard/executive')
    }
  }
}
</script>
