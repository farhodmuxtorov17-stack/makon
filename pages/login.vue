<template>
  <div>
    <div class="login-header">
      <h1 class="login-title">Xush kelibsiz</h1>
      <p class="login-subtitle">Tizimga kiring va binolaringizni boshqaring</p>
    </div>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="field">
        <label class="field__label">Email yoki STIR</label>
        <div class="field__input-wrap">
          <Mail :size="18" class="field__icon" />
          <input v-model="form.login" type="text" class="field__input" placeholder="admin@makon.uz" />
        </div>
      </div>

      <div class="field">
        <label class="field__label">Parol</label>
        <div class="field__input-wrap">
          <Lock :size="18" class="field__icon" />
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="field__input field__input--password"
            placeholder="••••••••"
          />
          <button type="button" @click="showPassword = !showPassword" class="field__toggle">
            <Eye v-if="showPassword" :size="18" />
            <EyeOff v-else :size="18" />
          </button>
        </div>
      </div>

      <div class="login-options">
        <label class="login-check">
          <input type="checkbox" v-model="form.remember" />
          <span>Eslab qolish</span>
        </label>
        <a href="#" class="login-link">Parolni unutdingizmi?</a>
      </div>

      <button type="submit" class="login-btn" :disabled="loading">
        <span v-if="!loading">Kirish</span>
        <span v-else class="login-btn__loading">
          <Loader2 :size="16" class="spin" /> Kirilmoqda...
        </span>
      </button>
    </form>

    <div class="login-divider">
      <span>yoki</span>
    </div>

    <div class="login-alt">
      <button @click="handleEriLogin" class="alt-btn alt-btn--eri">
        <ShieldCheck :size="18" />
        <span>ERI orqali kirish</span>
        <ChevronRight :size="16" />
      </button>
      <button @click="openTelegramApp" class="alt-btn alt-btn--telegram">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
        <span>Telegram orqali</span>
      </button>
    </div>

    <p class="login-register">
      Hisobingiz yo'qmi?
      <NuxtLink to="/register/eri" class="login-link login-link--accent">Ro'yxatdan o'ting</NuxtLink>
    </p>

    <div class="login-demo">
      <Info :size="14" />
      <span>Demo: <code>admin@makon.uz</code> · <code>admin123</code></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Eye, EyeOff, Mail, Lock, ChevronRight, Loader2, Info } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  login: 'admin@makon.uz',
  password: 'admin123',
  remember: true
})

const loading = ref(false)
const showPassword = ref(false)

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  authStore.setUser({
    id: 'u1',
    email: form.value.login,
    fullName: 'Admin User',
    role: 'SUPER_HEAD'
  } as any)
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

<style scoped>
.login-header { margin-bottom: 28px; }
.login-title { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin-bottom: 4px; }
:deep(.dark) .login-title { color: white; }
.login-subtitle { font-size: 14px; color: #71717a; }

.login-form { display: flex; flex-direction: column; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field__label { font-size: 13px; font-weight: 600; color: #52525b; }
:deep(.dark) .field__label { color: #d4d4d8; }
.field__input-wrap { position: relative; display: flex; align-items: center; }
.field__icon { position: absolute; left: 14px; color: #a1a1aa; pointer-events: none; z-index: 1; }
.field__input {
  width: 100%; padding: 12px 14px 12px 42px; border-radius: 12px;
  border: 1.5px solid rgba(0,0,0,0.08); background: #fafafa;
  font-size: 14px; color: #18181b; outline: none; transition: all 0.2s;
}
.field__input:focus { border-color: #6366f1; background: white; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
:deep(.dark) .field__input { background: #09090b; border-color: rgba(255,255,255,0.08); color: white; }
:deep(.dark) .field__input:focus { background: #09090b; border-color: #6366f1; }
.field__input::placeholder { color: #a1a1aa; }
.field__input--password { padding-right: 42px; }
.field__toggle { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #a1a1aa; display: flex; align-items: center; }
.field__toggle:hover { color: #6366f1; }

.login-options { display: flex; align-items: center; justify-content: space-between; font-size: 13px; }
.login-check { display: flex; align-items: center; gap: 6px; cursor: pointer; color: #71717a; }
.login-check input { width: 15px; height: 15px; accent-color: #6366f1; }
.login-link { color: #6366f1; text-decoration: none; font-weight: 500; }
.login-link:hover { text-decoration: underline; }
.login-link--accent { font-weight: 600; }

.login-btn {
  width: 100%; padding: 12px; border-radius: 12px;
  background: #6366f1; color: white; border: none;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.2s; display: flex; align-items: center; justify-content: center; min-height: 44px;
}
.login-btn:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.login-btn__loading { display: flex; align-items: center; gap: 8px; }
.spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

.login-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
.login-divider::before, .login-divider::after { content: ''; flex: 1; height: 1px; background: rgba(0,0,0,0.06); }
:deep(.dark) .login-divider::before, :deep(.dark) .login-divider::after { background: rgba(255,255,255,0.06); }
.login-divider span { font-size: 12px; color: #a1a1aa; font-weight: 500; }

.login-alt { display: flex; flex-direction: column; gap: 10px; }
.alt-btn {
  display: flex; align-items: center; gap: 10px; width: 100%;
  padding: 11px 14px; border-radius: 12px;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.2s; border: 1.5px solid;
}
.alt-btn span { flex: 1; text-align: left; }
.alt-btn--eri { background: rgba(99,102,241,0.05); border-color: rgba(99,102,241,0.2); color: #6366f1; }
.alt-btn--eri:hover { background: rgba(99,102,241,0.1); border-color: #6366f1; }
.alt-btn--telegram { background: #229ED9; border-color: #229ED9; color: white; }
.alt-btn--telegram:hover { background: #1a8bbf; }

.login-register { text-align: center; font-size: 14px; color: #71717a; margin-top: 20px; }

.login-demo {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 16px; padding: 10px 14px; border-radius: 10px;
  background: rgba(99,102,241,0.05); border: 1px solid rgba(99,102,241,0.1);
  font-size: 12px; color: #71717a;
}
.login-demo code { font-weight: 600; color: #6366f1; }
:deep(.dark) .login-demo { background: rgba(99,102,241,0.08); }
</style>
