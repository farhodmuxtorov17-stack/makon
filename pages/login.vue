<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center p-3 md:p-6">
    <div class="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl bg-white" style="min-height: 620px">
      <!-- Left: Brand / hero -->
      <div class="hidden md:flex flex-1 bg-gradient-to-br from-primary-50 via-white to-accent-50 p-10 flex-col relative overflow-hidden">
        <NuxtLink to="/" class="flex items-center gap-2.5 mb-8">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
          </div>
          <span class="text-lg font-bold font-display text-neutral-900">MAKON <span class="text-primary-500 font-semibold">MVP</span></span>
        </NuxtLink>

        <div class="flex-1 flex flex-col justify-center">
          <div class="rounded-3xl bg-white/60 border border-white p-6 mb-6 flex items-center justify-center shadow-sm">
            <img src="/images/building-hero.png" alt="MAKON" class="w-full max-w-[280px] h-auto object-contain drop-shadow-xl" />
          </div>

          <h1 class="text-2xl font-bold font-display text-neutral-900 mb-2">MAKON MVP</h1>
          <p class="text-sm text-neutral-500 mb-6 leading-relaxed">Barcha boshqaruv jarayonlaringiz bitta platformada</p>

          <div class="space-y-3">
            <div v-for="f in features" :key="f.title" class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" :d="f.icon" /></svg>
              </div>
              <div>
                <p class="text-sm font-semibold text-neutral-800">{{ f.title }}</p>
                <p class="text-xs text-neutral-500">{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="flex-1 p-6 md:p-10 flex flex-col">
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <NuxtLink to="/" class="flex md:hidden items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
            </div>
            <span class="text-base font-bold font-display text-neutral-900">MAKON</span>
          </NuxtLink>
          <div class="ml-auto flex items-center gap-3 text-xs text-neutral-500">
            <button class="flex items-center gap-1 hover:text-neutral-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Platforma haqida
            </button>
            <button class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              O'zbekcha
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-center max-w-sm mx-auto md:mx-0 w-full">
          <!-- Toggle -->
          <div class="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              :class="['flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all', activeTab === 'eri' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300']"
              @click="activeTab = 'eri'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              ERI orqali kirish
            </button>
            <button
              type="button"
              :class="['flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all', activeTab === 'password' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-500 hover:border-neutral-300']"
              @click="activeTab = 'password'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Login-parol
            </button>
          </div>

          <!-- ERI info banner -->
          <div v-if="activeTab === 'eri'" class="flex items-start gap-2.5 p-3 rounded-xl bg-success-50 border border-success-100 mb-5">
            <svg class="w-4 h-4 text-success-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p class="text-xs text-success-800 leading-relaxed"><span class="font-semibold">ERI orqali kirish</span> — eng xavfsiz va tavsiya etilgan usul.<br />Elektron raqamli imzo yordamida tizimga kiring.</p>
          </div>

          <!-- Error message -->
          <div v-if="errorMsg" class="flex items-center gap-2 p-3 rounded-xl bg-danger-50 text-danger-700 text-sm mb-4">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ errorMsg }}
          </div>

          <!-- ERI form -->
          <form v-if="activeTab === 'eri'" class="space-y-4" @submit.prevent="handleEri">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">Tashkilot nomi *</label>
                <select v-model="form.orgName" class="input cursor-pointer">
                  <option value="Urban Office MCHJ">Urban Office MCHJ</option>
                  <option value="Makon Invest MCHJ">Makon Invest MCHJ</option>
                  <option value="Toshkent Rielt MCHJ">Toshkent Rielt MCHJ</option>
                </select>
              </div>
              <div>
                <label class="label">STIR *</label>
                <input v-model="form.stir" class="input font-mono" placeholder="305 123 456" />
              </div>
              <div>
                <label class="label">Foydalanuvchi *</label>
                <input v-model="form.userName" class="input" placeholder="Ism Familiya" />
              </div>
              <div>
                <label class="label">Telefon raqam *</label>
                <input v-model="form.phone" class="input font-mono" placeholder="+998 90 123 45 67" />
              </div>
            </div>

            <div class="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
              <svg class="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p class="text-xs text-neutral-500 leading-relaxed flex-1">ERI qurilmangiz ulanganligiga ishonch hosil qiling. ERI kalit (token) yoki mobil ERI ilovasi orqali tasdiqlang.</p>
              <a href="#" class="text-xs text-primary-600 font-medium hover:text-primary-700 flex-shrink-0 flex items-center gap-1 whitespace-nowrap">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Yordam va qo'llanma
              </a>
            </div>

            <button type="submit" class="btn-primary w-full py-3.5 flex-col gap-0.5" :class="{ 'opacity-70': loading }" :disabled="loading">
              <span class="flex items-center gap-2 font-semibold">
                <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                {{ loading ? 'Tekshirilmoqda...' : 'ERI orqali tasdiqlash' }}
              </span>
              <span class="text-[11px] font-normal opacity-80">Tizimga kirish va autentifikatsiya qilish</span>
            </button>
          </form>

          <!-- Login-password form -->
          <form v-if="activeTab === 'password'" class="space-y-4" @submit.prevent="handleLogin">
            <div>
              <label class="label">Login</label>
              <input v-model="form.login" :class="['input', errors.login ? 'border-danger-400 focus:border-danger-400 focus:ring-danger-100' : '']" placeholder="admin" />
              <p v-if="errors.login" class="hint text-danger-500">{{ errors.login }}</p>
            </div>
            <div>
              <label class="label">Parol</label>
              <div class="relative">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" :class="['input pr-10', errors.password ? 'border-danger-400 focus:border-danger-400 focus:ring-danger-100' : '']" placeholder="••••••••" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </button>
              </div>
              <p v-if="errors.password" class="hint text-danger-500">{{ errors.password }}</p>
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded border-neutral-300 text-primary-600 focus:ring-primary-200" />
                <span class="text-neutral-500">Eslab qolish</span>
              </label>
              <a href="#" class="text-primary-600 font-medium hover:text-primary-700">Parolni unutdingizmi?</a>
            </div>
            <button type="submit" class="btn-primary w-full" :class="{ 'opacity-70': loading }" :disabled="loading">
              <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
            </button>
          </form>

          <!-- Demo credentials hint -->
          <div class="mt-5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-500">
            <p class="font-semibold text-neutral-600 mb-1">Demo kirish:</p>
            <p v-if="activeTab === 'password'">Login: <code class="font-mono text-primary-600">admin</code> · Parol: <code class="font-mono text-primary-600">admin123</code></p>
            <p v-else>Istalgan 14 xonali PINFL/STIR va telefon raqam kiriting</p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-6 md:mt-8 text-xs text-neutral-400">
          <span>Muammoga duch keldingizmi?</span>
          <div class="flex items-center gap-3">
            <a href="#" class="flex items-center gap-1 text-neutral-500 hover:text-primary-600 font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Qo'llab-quvvatlash
            </a>
            <a href="#" class="flex items-center gap-1 text-neutral-500 hover:text-primary-600 font-medium">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Video qo'llanma
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({ layout: 'auth', middleware: 'guest' })

const activeTab = ref('eri')

const form = reactive({
  login: '',
  password: '',
  pinfl: '',
  orgName: 'Urban Office MCHJ',
  stir: '305 123 456',
  userName: 'Azizbek Karimov',
  phone: '+998 90 123 45 67',
})
const errors = reactive({ login: '', password: '', pinfl: '' })
const errorMsg = ref('')
const showPassword = ref(false)
const loading = ref(false)

const features = [
  {
    title: 'Xavfsiz ulanish',
    desc: 'SSL 256-bit shifrlash',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  },
  {
    title: "Ma'lumotlar himoyasi",
    desc: 'ISO/IEC 27001 standartiga muvofiq',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
]

function validateLogin() {
  errors.login = ''
  errors.password = ''
  if (!form.login) errors.login = 'Login kiritilishi shart'
  if (!form.password) errors.password = 'Parol kiritilishi shart'
  return !errors.login && !errors.password
}

function handleLogin() {
  errorMsg.value = ''
  if (!validateLogin()) return
  loading.value = true
  const auth = useAuthStore()
  setTimeout(() => {
    const ok = auth.login(form.login, form.password)
    loading.value = false
    if (ok) navigateTo('/dashboard/executive')
    else errorMsg.value = "Login yoki parol noto'g'ri"
  }, 500)
}

function handleEri() {
  errorMsg.value = ''
  if (!form.orgName || !form.stir || !form.userName || !form.phone) {
    errorMsg.value = "Barcha maydonlarni to'ldiring"
    return
  }
  loading.value = true
  const auth = useAuthStore()
  setTimeout(() => {
    const ok = auth.loginErI('00000000000000')
    loading.value = false
    if (ok) navigateTo('/dashboard/executive')
    else errorMsg.value = 'ERI orqali tasdiqlashda xatolik yuz berdi'
  }, 900)
}
</script>
