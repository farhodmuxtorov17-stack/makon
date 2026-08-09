<template>
  <div class="min-h-screen flex items-center justify-center p-3 md:p-6">
    <div class="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl" style="min-height: 640px">
      <!-- Left: Form -->
      <div class="flex-1 bg-white p-6 md:p-10 flex flex-col">
        <NuxtLink to="/" class="flex items-center gap-3 mb-8 md:mb-12">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z" /></svg>
          </div>
          <span class="text-xl font-bold font-display text-neutral-900">MAKON</span>
        </NuxtLink>

        <div class="flex-1 flex flex-col justify-center max-w-sm mx-auto md:mx-0 w-full">
          <h1 class="text-2xl md:text-3xl font-bold font-display text-neutral-900 mb-2">Xush kelibsiz</h1>
          <p class="text-sm text-neutral-500 mb-6 md:mb-8">Kochmulk boshqaruv tizimiga kirish</p>

          <!-- Tabs -->
          <div class="flex p-1 rounded-xl bg-neutral-100 mb-6">
            <button v-for="tab in tabs" :key="tab.key" :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all', activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-500']" @click="activeTab = tab.key">{{ tab.label }}</button>
          </div>

          <!-- Error message -->
          <div v-if="errorMsg" class="flex items-center gap-2 p-3 rounded-xl bg-danger-50 text-danger-700 text-sm mb-4">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {{ errorMsg }}
          </div>

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

          <!-- ERI form -->
          <form v-if="activeTab === 'eri'" class="space-y-4" @submit.prevent="handleEri">
            <div>
              <label class="label">JShShIR (PINFL)</label>
              <input v-model="form.pinfl" :class="['input font-mono tracking-wider', errors.pinfl ? 'border-danger-400 focus:border-danger-400 focus:ring-danger-100' : '']" placeholder="14 ta raqam" maxlength="14" />
              <p v-if="errors.pinfl" class="hint text-danger-500">{{ errors.pinfl }}</p>
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-500 p-3 rounded-xl bg-accent-50 border border-accent-100">
              <svg class="w-4 h-4 text-accent-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              ERI orqali elektron imzo bilan kirish. PINFL 14 raqamdan iborat.
            </div>
            <button type="submit" class="btn-primary w-full" :disabled="loading">
              <svg v-if="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" /><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              {{ loading ? 'Tekshirilmoqda...' : 'ERI bilan kirish' }}
            </button>
          </form>

          <!-- Demo credentials hint -->
          <div class="mt-6 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-500">
            <p class="font-semibold text-neutral-600 mb-1">Demo kirish:</p>
            <p>Login: <code class="font-mono text-primary-600">admin</code> · Parol: <code class="font-mono text-primary-600">admin123</code></p>
          </div>
        </div>

        <p class="text-xs text-neutral-400 mt-6 md:mt-8">© 2025 MAKON. Barcha huquqlar himoyalangan.</p>
      </div>

      <!-- Right: Hero -->
      <div class="hidden md:flex flex-1 bg-neutral-950 p-10 flex-col justify-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-20" :style="{ background: 'radial-gradient(circle at 30% 20%, rgb(99 102 241 0.5), transparent 50%), radial-gradient(circle at 80% 80%, rgb(20 184 166 0.3), transparent 50%)' }" />
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-6">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span class="text-xs text-white/80 font-medium">Tizim faol</span>
          </div>
          <h2 class="text-3xl font-bold font-display text-white leading-tight mb-4">
            Kochmulkingizni<br />bir platformada boshqaring
          </h2>
          <p class="text-white/60 text-sm leading-relaxed mb-8">Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — barchasi yagona tizimda.</p>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in heroStats" :key="stat.label" class="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p class="text-2xl font-bold text-white font-display">{{ stat.value }}</p>
              <p class="text-xs text-white/50 mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({ layout: 'auth', middleware: 'guest' })

const activeTab = ref('password')
const tabs = [
  { key: 'password', label: 'Login-parol' },
  { key: 'eri', label: 'ERI' },
]

const form = reactive({ login: '', password: '', pinfl: '' })
const errors = reactive({ login: '', password: '', pinfl: '' })
const errorMsg = ref('')
const showPassword = ref(false)
const loading = ref(false)

const heroStats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Faol shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]

function validateLogin() {
  errors.login = ''
  errors.password = ''
  if (!form.login) errors.login = 'Login kiritilishi shart'
  if (!form.password) errors.password = 'Parol kiritilishi shart'
  return !errors.login && !errors.password
}

function validateEri() {
  errors.pinfl = ''
  if (!form.pinfl) errors.pinfl = 'PINFL kiritilishi shart'
  else if (form.pinfl.length !== 14) errors.pinfl = 'PINFL 14 raqamdan iborat bolishi kerak'
  return !errors.pinfl
}

async function handleLogin() {
  errorMsg.value = ''
  if (!validateLogin()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  if (form.login === 'admin' && form.password === 'admin123') {
    navigateTo('/dashboard/executive')
  } else {
    errorMsg.value = 'Login yoki parol notogri. Demo: admin / admin123'
  }
  loading.value = false
}

async function handleEri() {
  errorMsg.value = ''
  if (!validateEri()) return
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  // Simulate ERI authentication
  navigateTo('/dashboard/executive')
  loading.value = false
}
</script>
