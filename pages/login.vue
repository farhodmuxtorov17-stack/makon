<template>
  <div>
    <h1 class="text-lg font-bold mb-1">Tizimga kirish</h1>
    <p class="text-sm text-ink-500 mb-5">MAKON platformasiga kiring</p>

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
          <input type="checkbox" v-model="form.remember" class="rounded border-black/10" />
          Eslab qolish
        </label>
        <a href="#" class="text-brand-500 hover:text-brand-600">Parolni unutdingizmi?</a>
      </div>

      <button type="submit" class="btn btn-primary w-full" :disabled="loading">
        {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
      </button>
    </form>

    <div class="relative my-4">
      <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-black/5 dark:border-white/5"></div></div>
      <div class="relative flex justify-center text-xs"><span class="px-3 bg-white dark:bg-ink-900 text-ink-500">yoki</span></div>
    </div>

    <button @click="handleEriLogin" class="btn btn-secondary w-full mb-2.5">
      <ShieldCheck :size="18" />
      ERI orqali kirish
    </button>

    <button @click="openTelegramApp" class="btn w-full" style="background: linear-gradient(135deg, #2AABEE 0%, #229ED9 100%); color: white;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
      Telegram Mini App
    </button>

    <p class="text-center text-sm text-ink-500 mt-5">
      Hisobingiz yo'qmi?
      <NuxtLink to="/register/eri" class="text-brand-500 hover:text-brand-600 font-medium">Ro'yxatdan o'ting</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const makonStore = useMakonStore()
const router = useRouter()

const form = ref({
  login: 'admin@makon.uz',
  password: 'admin123',
  remember: true
})

const loading = ref(false)

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  makonStore.login()
  router.push('/dashboard/executive')
  loading.value = false
}

function handleEriLogin() {
  router.push('/register/eri')
}

function openTelegramApp() {
  window.open('https://t.me/makon_bot', '_blank')
}
</script>
