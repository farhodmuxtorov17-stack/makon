<template>
  <div class="auth">
    <div class="auth__visual">
      <img :src="img('/buildings/real_tashkent-night.jpg')" alt="Tashkent City" class="auth__visual-img" />
      <div class="auth__visual-grad"></div>
      <div class="auth__visual-content">
        <NuxtLink to="/" class="auth__logo">
          <div class="auth__logo-icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="auth__visual-bottom">
          <h2 class="auth__visual-title">Toshkentning premium obyektlari boshqaruvi</h2>
          <p class="auth__visual-text">MAKON platformasi orqali xavfsiz identifikatsiya va to'liq raqamli boshqaruv.</p>
        </div>
      </div>
    </div>

    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <div class="auth__form-head">
          <h1 class="auth__form-title">Xush kelibsiz</h1>
          <p class="auth__form-sub">Tizimga kirish uchun login va parolingizni kiriting</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Login</label>
            <div class="auth__input-wrap">
              <User :size="17" class="auth__input-icon" />
              <input v-model="form.login" type="text" placeholder="admin@makon.uz" class="auth__input" />
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Parol</label>
            <div class="auth__input-wrap">
              <Lock :size="17" class="auth__input-icon" />
              <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="auth__input" />
              <button type="button" @click="showPassword = !showPassword" class="auth__input-toggle">
                <Eye v-if="!showPassword" :size="17" />
                <EyeOff v-else :size="17" />
              </button>
            </div>
          </div>

          <div v-if="loginError" class="auth__error">
            <AlertCircle :size="15" />
            <span>Login yoki parol noto'g'ri</span>
          </div>

          <div class="auth__row">
            <label class="auth__check">
              <input type="checkbox" v-model="form.remember" class="auth__checkbox" />
              <span>Eslab qolish</span>
            </label>
            <a href="#" class="auth__link">Parolni unutdingizmi?</a>
          </div>

          <button type="submit" class="auth__submit" :disabled="loading">
            <span v-if="!loading">Tizimga kirish</span>
            <span v-else>Kirilmoqda...</span>
            <ArrowRight v-if="!loading" :size="17" />
          </button>

          <div class="auth__divider">
            <span>YOKI</span>
          </div>

          <NuxtLink to="/auth/verify" class="auth__sms-btn">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
            </svg>
            SMS orqali ro'yxatdan o'tish
          </NuxtLink>

          <p class="auth__signup">
            Yangi foydalanuvchi?
            <NuxtLink to="/auth/verify" class="auth__link auth__link--bold">SMS kod bilan ro'yxatdan o'ting</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { User, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const form = reactive({ login: '', password: '', remember: false })
const showPassword = ref(false)
const loading = ref(false)
const loginError = ref(false)
const authStore = useAuthStore()

async function handleLogin() {
  loading.value = true
  loginError.value = false
  await new Promise(r => setTimeout(r, 600))
  loading.value = false

  const success = authStore.loginWithCredentials(form.login, form.password)
  if (success) {
    navigateTo('/dashboard/executive')
  } else {
    loginError.value = true
  }
}
</script>

<style scoped>
.auth { display: flex; min-height: 100vh; }
.auth__visual { position: relative; width: 48%; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.auth__visual-grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.4) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%),
              radial-gradient(ellipse at 30% 70%, rgba(37,99,235,0.08), transparent 50%);
}
.auth__visual-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 48px; }
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon { width: 38px; height: 38px; border-radius: 11px; background: var(--text); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: white; }
.auth__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.auth__visual-bottom { max-width: 400px; }
.auth__visual-title { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.15; margin: 0 0 10px; }
.auth__visual-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0; }

.auth__form-side { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; background: #ffffff; }
.dark .auth__form-side { background: #09090b; }
.auth__form-wrap { width: 100%; max-width: 380px; }
.auth__form-head { margin-bottom: 36px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

.auth__field { margin-bottom: 18px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__input-icon { position: absolute; left: 14px; color: #a1a1aa; z-index: 1; }
.auth__input { width: 100%; padding: 13px 14px 13px 42px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b; transition: all 0.25s; outline: none; }
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input::placeholder { color: #a1a1aa; }
.auth__input-toggle { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #a1a1aa; padding: 4px; }
.auth__input-toggle:hover { color: #71717a; }

.auth__error { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); margin-bottom: 18px; font-size: 13px; color: #ef4444; }
.auth__error svg { flex-shrink: 0; }

.auth__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.auth__check { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #52525b; cursor: pointer; }
.dark .auth__check { color: #a1a1aa; }
.auth__checkbox { width: 16px; height: 16px; border-radius: 5px; accent-color: var(--accent); }
.auth__link { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 500; }
.auth__link:hover { text-decoration: underline; }
.auth__link--bold { font-weight: 600; }

.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,102,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15); }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,102,255,0.35); }
.auth__submit:disabled { opacity: 0.6; cursor: not-allowed; }

.auth__divider { text-align: center; margin: 22px 0; position: relative; }
.auth__divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.06); }
.dark .auth__divider::before { background: rgba(255,255,255,0.06); }
.auth__divider span { position: relative; background: #ffffff; padding: 0 14px; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.1em; }
.dark .auth__divider span { background: #09090b; }

.auth__sms-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 14px; border-radius: 12px; background: rgba(0,136,204,0.06); border: 1.5px solid rgba(0,136,204,0.2); color: #0088cc; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; text-decoration: none; }
.auth__sms-btn:hover { background: rgba(0,136,204,0.1); border-color: rgba(0,136,204,0.4); transform: translateY(-1px); }

.auth__signup { text-align: center; margin-top: 28px; font-size: 14px; color: #71717a; }
.dark .auth__signup { color: #a1a1aa; }

@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
}
</style>
