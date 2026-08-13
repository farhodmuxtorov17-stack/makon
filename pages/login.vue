<template>
  <div class="auth-page">
    <div class="auth-page__glow auth-page__glow--1"></div>
    <div class="auth-page__glow auth-page__glow--2"></div>

    <div class="auth">
      <!-- Visual Side -->
      <div class="auth__visual">
        <img :src="img('/buildings/real_tashkent-night.jpg')" alt="Tashkent City" class="auth__visual-img" />
        <div class="auth__visual-grad"></div>
        <div class="auth__visual-content">
          <NuxtLink to="/" class="auth__logo">
            <div class="auth__logo-icon">M</div>
            <span class="text-white font-bold text-lg tracking-tight">MAKON</span>
          </NuxtLink>
          <div class="auth__visual-bottom">
            <h2 class="auth__visual-title">Raqamli boshqaruv<br>binolar va obyektlar</h2>
            <p class="auth__visual-text">MAKON platformasi orqali obyektlarni samarali boshqaring.</p>
          </div>
        </div>
      </div>

      <!-- Form Side -->
      <div class="auth__form-side">
        <NuxtLink to="/" class="auth__form-back">
          <ArrowLeft :size="14" /> Bosh sahifaga
        </NuxtLink>

        <div class="auth__form-wrap">
          <!-- Password Recovery Overlay -->
          <transition name="scale">
            <div v-if="showRecovery" class="auth__forgot-overlay" @click.self="showRecovery = false">
              <div class="auth__forgot-box">
                <h3 class="auth__forgot-title">Parolni tiklash</h3>
                <p class="auth__forgot-text">Telefon raqamingizni kiriting — yangi parol yuboriladi.</p>
                <div class="auth__field" style="margin-bottom: 16px">
                  <div class="auth__input-wrap">
                    <Phone :size="17" class="auth__input-icon" />
                    <input v-model="recoveryPhone" type="tel" placeholder="+998 90 123 45 67" class="auth__input" />
                  </div>
                </div>
                <button class="auth__submit" @click="sendRecovery">
                  Yuborish <ArrowRight :size="16" />
                </button>
                <button class="auth__back" @click="showRecovery = false" style="margin-top: 12px; justify-content: center">
                  <ArrowLeft :size="15" /> Bekor qilish
                </button>
              </div>
            </div>
          </transition>

          <!-- Form Header -->
          <div class="auth__form-head">
            <div class="auth__logo auth__logo--mobile">
              <div class="auth__logo-icon auth__logo-icon--dark">M</div>
            </div>
            <h1 class="auth__form-title">Xush kelibsiz</h1>
            <p class="auth__form-sub">Tizimga kirish uchun login va parolingizni kiriting</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="auth__form">
            <div class="auth__field">
              <label class="auth__label">Login</label>
              <div class="auth__input-wrap">
                <UserRound :size="17" class="auth__input-icon" />
                <input v-model="form.login" type="text" placeholder="login@makon.uz" class="auth__input" />
              </div>
            </div>

            <div class="auth__field">
              <label class="auth__label">Parol</label>
              <div class="auth__input-wrap">
                <Lock :size="17" class="auth__input-icon" />
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="auth__input"
                />
                <button type="button" @click="showPassword = !showPassword" class="auth__input-toggle">
                  <Eye v-if="!showPassword" :size="17" />
                  <EyeOff v-else :size="17" />
                </button>
              </div>
            </div>

            <!-- Error -->
            <div v-if="loginError" class="auth__error">
              <AlertCircle :size="15" />
              <span>Login yoki parol noto'g'ri</span>
            </div>

            <!-- Options -->
            <div class="auth__row">
              <label class="auth__check">
                <input v-model="form.remember" type="checkbox" class="auth__checkbox" />
                <span>Eslab qolish</span>
              </label>
              <button type="button" class="auth__link" @click="showRecovery = true">Parolni unutdingizmi?</button>
            </div>

            <!-- Submit -->
            <button type="submit" class="auth__submit" :disabled="loading">
              <span v-if="loading">Kirilmoqda...</span>
              <span v-else>Tizimga kirish</span>
              <ArrowRight v-if="!loading" :size="17" />
            </button>

            <!-- Signup Link -->
            <p class="auth__signup">
              Yangi foydalanuvchi?
              <NuxtLink to="/register" class="auth__link auth__link--bold">Ro'yxatdan o'ting</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft,
  Phone, Lock, UserRound, ShieldCheck
} from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const { img } = useImg()
const form = reactive({ login: '', password: '', remember: false })
const loading = ref(false)
const loginError = ref(false)
const showPassword = ref(false)
const showRecovery = ref(false)
const recoveryPhone = ref('')
const authStore = useAuthStore()

onMounted(() => {
  const saved = localStorage.getItem('makon-remembered-login')
  if (saved) { form.login = saved; form.remember = true }
})

async function handleLogin() {
  if (form.login.trim().length < 3 || form.password.trim().length < 3) {
    loginError.value = true
    return
  }
  loading.value = true
  loginError.value = false
  await new Promise(r => setTimeout(r, 400))
  loading.value = false
  if (authStore.loginWithCredentials(form.login, form.password)) {
    if (form.remember) localStorage.setItem('makon-remembered-login', form.login)
    else localStorage.removeItem('makon-remembered-login')
    navigateTo('/dashboard')
  } else {
    loginError.value = true
  }
}

function sendRecovery() {
  if (recoveryPhone.value.length > 0) {
    showRecovery.value = false
    navigateTo('/register')
  }
}
</script>

<style scoped>
.auth-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: radial-gradient(ellipse 900px 600px at 15% 10%, rgba(37,99,235,0.16), transparent 60%),
              radial-gradient(ellipse 900px 700px at 85% 90%, rgba(99,102,241,0.12), transparent 60%),
              #060a13;
  overflow: hidden;
}
.auth-page__glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.5; }
.auth-page__glow--1 { width: 460px; height: 460px; top: -120px; left: -120px; background: radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%); }
.auth-page__glow--2 { width: 420px; height: 420px; bottom: -140px; right: -100px; background: radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%); }

.auth {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  max-width: 1120px;
  height: min(700px, 86vh);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 50px 120px -24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
  background: #ffffff;
}
.dark .auth { background: #0b0f19; }

.auth__visual { position: relative; flex: 1.15; overflow: hidden; display: block; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; }
.auth__visual-grad { position: absolute; inset: 0; background: linear-gradient(190deg, rgba(10,17,32,0.35) 0%, rgba(10,17,32,0.55) 45%, rgba(8,13,25,0.92) 100%); }
.auth__visual-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; z-index: 1; }
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); display: flex; align-items: center; justify-content: center; font-weight: 800; color: white; font-size: 18px; box-shadow: 0 4px 12px rgba(37,99,235,0.3); flex-shrink: 0; }
.auth__visual-bottom { max-width: 380px; }
.auth__visual-title { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 700; color: white; letter-spacing: -0.03em; line-height: 1.2; }
.auth__visual-text { font-size: 14px; color: rgba(203,213,225,0.75); margin-top: 8px; line-height: 1.55; }

.auth__form-side { width: 420px; flex-shrink: 0; display: flex; flex-direction: column; padding: 28px 44px; position: relative; }
.auth__form-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: #71717a; text-decoration: none; align-self: flex-start; transition: color 0.2s; margin-bottom: 20px; }
.dark .auth__form-back { color: #a1a1aa; }
.auth__form-back:hover { color: var(--accent); }
.auth__form-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; width: 100%; max-width: 360px; margin: 0 auto; }

.auth__form-head { margin-bottom: 24px; }
.auth__logo--mobile { display: none; }
.auth__form-title { font-size: 27px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

.auth__form { width: 100%; }
.auth__field { margin-bottom: 16px; }
.auth__label { display: block; font-size: 12.5px; font-weight: 600; color: #3f3f46; margin-bottom: 7px; }
.dark .auth__label { color: #c4c4c8; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__input-icon { position: absolute; left: 14px; color: #a1a1aa; flex-shrink: 0; }
.auth__input { width: 100%; padding: 12px 14px 12px 42px; border-radius: 11px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b; outline: none; transition: all 0.25s; }
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input::placeholder { color: #c4c4c8; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input-toggle { position: absolute; right: 12px; background: none; border: none; color: #a1a1aa; cursor: pointer; display: flex; padding: 4px; }
.auth__input-toggle:hover { color: #71717a; }

.auth__error { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); margin-bottom: 16px; font-size: 13px; color: #ef4444; }
.auth__error svg { flex-shrink: 0; }

.auth__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.auth__check { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #71717a; cursor: pointer; }
.dark .auth__check { color: #a1a1aa; }
.auth__checkbox { width: 15px; height: 15px; accent-color: var(--accent); }
.auth__link { background: none; border: none; color: var(--accent); font-size: 12.5px; font-weight: 600; cursor: pointer; text-decoration: none; transition: opacity 0.2s; }
.auth__link:hover { opacity: 0.8; }
.auth__link--bold { font-weight: 700; }

.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px; border-radius: 12px; border: none; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 14px rgba(37,99,235,0.3); }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.4); }
.auth__submit:disabled { opacity: 0.5; cursor: not-allowed; }

.auth__signup { text-align: center; margin-top: 18px; font-size: 13px; color: #71717a; }
.dark .auth__signup { color: #a1a1aa; }

.auth__forgot-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 50; }
.auth__forgot-box { background: white; border-radius: 20px; padding: 32px; max-width: 380px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
.dark .auth__forgot-box { background: #18181b; }
.auth__forgot-title { font-size: 20px; font-weight: 800; margin: 0 0 8px; color: #18181b; }
.dark .auth__forgot-title { color: white; }
.auth__forgot-text { font-size: 13px; color: #71717a; margin: 0 0 20px; }
.dark .auth__forgot-text { color: #a1a1aa; }
.auth__back { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #71717a; background: none; border: none; cursor: pointer; transition: color 0.2s; }
.dark .auth__back { color: #a1a1aa; }
.auth__back:hover { color: var(--accent); }

.scale-enter-active, .scale-leave-active { transition: all 0.2s ease; }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.95); }

@media (max-width: 960px) {
  .auth { max-width: 420px; height: auto; min-height: 600px; }
  .auth__visual { display: none; }
  .auth__logo--mobile { display: flex; margin-bottom: 16px; }
  .auth__logo-icon--dark { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); }
  .auth__form-side { width: 100%; padding: 32px 28px; }
  .auth__form-back { display: none; }
}
</style>
