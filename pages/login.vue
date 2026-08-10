<template>
  <div class="min-h-screen flex bg-white">
    <!-- Left: Form -->
    <div class="flex-1 flex flex-col lg:max-w-[560px]">
      <!-- Logo -->
      <div class="px-8 py-6">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Building2 :size="18" :stroke-width="2" class="text-white" />
          </div>
          <div>
            <div class="font-display font-bold text-ink-900 text-base leading-none">MAKON</div>
            <div class="text-[9px] text-ink-400 font-medium tracking-widest uppercase mt-0.5">Real Estate</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Form -->
      <div class="flex-1 flex items-center justify-center px-8 pb-8">
        <div class="w-full max-w-[400px]">
          <h1 class="font-display text-3xl font-bold text-ink-900 mb-2">Xush kelibsiz</h1>
          <p class="text-ink-500 text-sm mb-8">Boshqaruv paneliga kirish uchun tizimga kiring</p>

          <!-- Tabs -->
          <div class="flex p-1 bg-ink-100 rounded-xl mb-6">
            <button
              v-for="tab in tabs" :key="tab.id" class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ease-premium flex items-center justify-center gap-2"
              :class="activeTab === tab.id ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'"
              @click="activeTab = tab.id"
            >
              <component :is="tab.icon" :size="16" :stroke-width="2" />
              {{ tab.label }}
            </button>
          </div>

          <!-- ERI form -->
          <div v-if="activeTab === 'eri'" class="space-y-4">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck :size="16" :stroke-width="2" class="text-emerald-600" />
              </div>
              <div>
                <div class="text-emerald-900 text-sm font-semibold">Eng xavfsiz usul</div>
                <div class="text-emerald-600 text-xs">ERI orqali tizimga kiring</div>
              </div>
            </div>
            <div>
              <label class="label">Tashkilot</label>
              <select v-model="form.org" class="input"><option>Urban Office MCHJ</option><option>Business Plaza Group</option><option>Makon Properties</option></select>
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
            <div><label class="label">Email yoki login</label><input v-model="form.email" class="input" placeholder="admin@makon.uz" /></div>
            <div>
              <label class="label">Parol</label>
              <div class="relative">
                <input v-model="form.pass" class="input pr-10" :type="showPass ? 'text' : 'password'" placeholder="••••••••" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600" @click="showPass = !showPass">
                  <Eye v-if="!showPass" :size="18" :stroke-width="2" />
                  <EyeOff v-else :size="18" :stroke-width="2" />
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.remember" type="checkbox" class="w-4 h-4 rounded border-ink-300 text-brand-600" />
                <span class="text-sm text-ink-600">Eslab qolish</span>
              </label>
              <a class="text-sm text-brand-600 hover:text-brand-700 font-medium cursor-pointer">Parolni unutdingizmi?</a>
            </div>
            <button class="btn btn-primary w-full btn-lg" @click="login">
              Tizimga kirish
              <ArrowRight :size="18" :stroke-width="2" />
            </button>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-ink-100"></div>
            <span class="text-xs text-ink-400">yoki</span>
            <div class="flex-1 h-px bg-ink-100"></div>
          </div>

          <!-- Telegram -->
          <button class="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-ink-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200">
            <Send :size="18" :stroke-width="2" class="text-sky-500" />
            <span class="text-sm font-semibold text-ink-700">Telegram Mini-App orqali</span>
          </button>

          <div class="mt-8 text-center text-xs text-ink-400">
            © 2026 MAKON · <a class="hover:text-ink-600 cursor-pointer">Maxfiylik</a> · <a class="hover:text-ink-600 cursor-pointer">Shartlar</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Showcase -->
    <div class="hidden lg:flex flex-1 mesh-dark relative overflow-hidden items-center justify-center">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0); background-size: 24px 24px;"></div>
      <div class="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-[120px]"></div>

      <div class="relative z-10 flex flex-col items-center gap-10">
        <div class="text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-white/50 text-xs font-medium">Telegram Mini-App · iOS · Android · Web</span>
          </div>
          <h2 class="font-display text-3xl font-bold text-white mb-2">Bir tizim — barcha qurilmalarda</h2>
          <p class="text-white/40 text-sm max-w-md">iPhone, planshet va kompyuterda — MAKON doim qoʻlingizda</p>
        </div>

        <div style="transform: perspective(800px) rotateY(-8deg) rotateX(3deg);">
          <PhoneMockup />
        </div>

        <div class="flex items-center gap-6">
          <div v-for="p in platformBadges" :key="p.label" class="flex items-center gap-2 text-white/40 text-xs">
            <component :is="p.icon" :size="16" :stroke-width="1.5" />
            {{ p.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, ShieldCheck, Eye, EyeOff, ArrowRight, Send, Smartphone, Monitor, Tablet, Apple, Lock } from 'lucide-vue-next'
definePageMeta({ middleware: 'guest', layout: 'auth' })

const activeTab = ref<'eri' | 'pass'>('eri')
const showPass = ref(false)
const router = useRouter()
const auth = useAuthStore()

const tabs = [
  { id: 'eri' as const, label: 'ERI orqali', icon: ShieldCheck },
  { id: 'pass' as const, label: 'Login — parol', icon: Lock },
]
const platformBadges = [
  { label: 'iOS', icon: Apple },
  { label: 'Android', icon: Smartphone },
  { label: 'Web', icon: Monitor },
  { label: 'Telegram', icon: Send },
]

const form = reactive({ org: 'Urban Office MCHJ', stir: '305 123 456', phone: '+998 90 123 45 67', user: 'Azizbek Karimov', email: '', pass: '', remember: true })

function login() {
  auth.login('admin', 'admin123')
  router.push('/dashboard/executive')
}
</script>
