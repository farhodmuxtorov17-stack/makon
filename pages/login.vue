<template>
  <div>
    <h1 class="text-2xl font-bold mb-1 text-center">Tizimga kirish</h1>
    <p class="text-sm text-ink-500 text-center mb-6">MAKON platformasiga kiring</p>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label class="label">Email yoki STIR</label>
        <input v-model="form.login" type="text" class="input" placeholder="admin@makon.uz" />
      </div>

      <div>
        <label class="label">Parol</label>
        <input v-model="form.password" type="password" class="input" placeholder="••••••••" />
      </div>

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-ink-400 cursor-pointer">
          <input type="checkbox" v-model="form.remember" class="rounded border-white/10 bg-white/5" />
          Eslab qolish
        </label>
        <a href="#" class="text-brand-400 hover:text-brand-300">Parolni unutdingizmi?</a>
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
      </button>
    </form>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
      <div class="relative flex justify-center text-xs"><span class="px-3 bg-ink-900 text-ink-600">yoki</span></div>
    </div>

    <button @click="handleEriLogin" class="btn btn-secondary w-full">
      <ShieldCheck :size="18" />
      ERI orqali kirish
    </button>

    <p class="text-sm text-ink-500 text-center mt-6">
      Hisobingiz yo'qmi?
      <NuxtLink to="/register/eri" class="text-brand-400 hover:text-brand-300 font-medium">Ro'yxatdan o'ting</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const loading = ref(false)

const form = reactive({
  login: '',
  password: '',
  remember: false,
})

async function handleLogin() {
  if (!form.login || !form.password) return
  loading.value = true

  // Demo login — will be replaced with real auth
  setTimeout(() => {
    authStore.setUser({
      id: 'demo-user',
      fullName: 'Admin User',
      email: form.login,
      role: 'SUPER_HEAD',
    })
    loading.value = false
    navigateTo('/dashboard')
  }, 800)
}

function handleEriLogin() {
  navigateTo('/register/eri')
}
</script>
