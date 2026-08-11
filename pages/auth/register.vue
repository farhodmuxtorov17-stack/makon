<template>
  <div class="auth">
    <div class="auth__visual">
      <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" class="auth__visual-img" />
      <div class="auth__visual-grad"></div>
      <div class="auth__visual-content">
        <NuxtLink to="/" class="auth__logo">
          <div class="auth__logo-icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="auth__visual-bottom">
          <h2 class="auth__visual-title">Toshkentning premium obyektlari boshqaruvi</h2>
          <p class="auth__visual-text">Telegram orqali xavfsiz identifikatsiya va to'liq raqamli boshqaruv.</p>
        </div>
      </div>
    </div>

    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <div class="auth__form-head">
          <div class="auth__step-badge">
            <span class="auth__step-num auth__step-num--done">✓</span>
            <span class="auth__step-text auth__step-text--done">Telegram tasdiqlandi</span>
          </div>
          <div class="auth__step-badge auth__step-badge--active" style="margin-top: 8px;">
            <span class="auth__step-num">3</span>
            <span class="auth__step-text">Ro'yxatdan o'tish</span>
          </div>
          <h1 class="auth__form-title">Hisob yarating</h1>
          <p class="auth__form-sub">Tizimga kirish uchun login va parol o'rnating</p>
        </div>

        <form @submit.prevent="handleRegister" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Ism familiya</label>
            <div class="auth__input-wrap">
              <User :size="17" class="auth__input-icon" />
              <input v-model="form.fullName" type="text" placeholder="Akmal Karimov" class="auth__input" />
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Login</label>
            <div class="auth__input-wrap">
              <AtSign :size="17" class="auth__input-icon" />
              <input v-model="form.login" type="text" placeholder="akmal@makon.uz" class="auth__input" @blur="checkLogin" />
            </div>
            <p v-if="loginTaken" class="auth__field-error">Bu login band. Boshqa tanlang.</p>
          </div>

          <div class="auth__field">
            <label class="auth__label">Parol</label>
            <div class="auth__input-wrap">
              <Lock :size="17" class="auth__input-icon" />
              <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="auth__input" @input="checkPasswordStrength" />
              <button type="button" @click="showPassword = !showPassword" class="auth__input-toggle">
                <Eye v-if="!showPassword" :size="17" />
                <EyeOff v-else :size="17" />
              </button>
            </div>
            <div v-if="form.password" class="auth__strength">
              <div class="auth__strength-bar">
                <div class="auth__strength-fill" :style="{ width: strength.pct + '%', background: strength.color }"></div>
              </div>
              <span class="auth__strength-label" :style="{ color: strength.color }">{{ strength.label }}</span>
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Parolni tasdiqlang</label>
            <div class="auth__input-wrap">
              <Lock :size="17" class="auth__input-icon" />
              <input v-model="form.confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="••••••••" class="auth__input" />
              <button type="button" @click="showConfirm = !showConfirm" class="auth__input-toggle">
                <Eye v-if="!showConfirm" :size="17" />
                <EyeOff v-else :size="17" />
              </button>
            </div>
            <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="auth__field-error">
              Parollar mos kelmadi
            </p>
            <p v-else-if="form.confirmPassword && form.password === form.confirmPassword" class="auth__field-success">
              <Check :size="13" /> Parollar mos
            </p>
          </div>

          <button type="submit" class="auth__submit" :disabled="!canSubmit || loading">
            <span v-if="!loading">Ro'yxatdan o'tish</span>
            <span v-else>Saqlanmoqda...</span>
            <UserPlus v-if="!loading" :size="17" />
          </button>

          <p class="auth__terms">
            Ro'yxatdan o'tish orqali siz
            <a href="#" class="auth__link">foydalanish shartlari</a>
            ga rozilik bildirasiz
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, AtSign, Lock, Eye, EyeOff, UserPlus, Check } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const authStore = useAuthStore()
const form = reactive({ fullName: '', login: '', password: '', confirmPassword: '' })
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const loginTaken = ref(false)

const strength = computed(() => {
  const p = form.password
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  const levels = [
    { pct: 25, color: '#ef4444', label: 'Juda oddiy' },
    { pct: 50, color: '#f59e0b', label: 'Oddiy' },
    { pct: 75, color: '#3b82f6', label: 'Yaxshi' },
    { pct: 100, color: '#10b981', label: 'Kuchli' },
  ]
  return levels[Math.min(score, 3)]
})

const canSubmit = computed(() => {
  return form.fullName.length >= 3 &&
    form.login.length >= 4 &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword &&
    !loginTaken.value
})

onMounted(() => {
  // Restore pending registration from localStorage
  if (!authStore.pendingRegistration && import.meta.client) {
    const saved = localStorage.getItem('makon-pending-reg')
    if (saved) {
      authStore.pendingRegistration = JSON.parse(saved)
    }
  }

  if (!authStore.pendingRegistration?.telegramVerified) {
    navigateTo('/auth/telegram')
  }

  // Pre-fill name from phone (demo)
  if (authStore.pendingRegistration?.phone) {
    form.login = authStore.pendingRegistration.phone.replace('+', '')
  }
})

function checkLogin() {
  const found = authStore.registeredUsers.find(u => u.login === form.login)
  loginTaken.value = !!found
}

function checkPasswordStrength() {
  // Trigger reactivity for strength computed
  form.password = form.password
}

async function handleRegister() {
  if (!canSubmit.value) return
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  loading.value = false

  const success = authStore.register({
    login: form.login,
    password: form.password,
    fullName: form.fullName,
  })

  if (success) {
    // Auto-login after registration
    authStore.loginWithCredentials(form.login, form.password)
    navigateTo('/dashboard/executive')
  }
}
</script>

<style scoped>
.auth { display: flex; min-height: 100vh; }
.auth__visual { position: relative; width: 48%; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.auth__visual-grad { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,11,0.4) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%), radial-gradient(ellipse at 30% 70%, rgba(37,99,235,0.08), transparent 50%); }
.auth__visual-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 40px 48px; }
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon { width: 38px; height: 38px; border-radius: 11px; background: var(--text); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: white; }
.auth__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.auth__visual-bottom { max-width: 400px; }
.auth__visual-title { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.15; margin: 0 0 10px; }
.auth__visual-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0; }

.auth__form-side { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; background: #ffffff; overflow-y: auto; }
.dark .auth__form-side { background: #09090b; }
.auth__form-wrap { width: 100%; max-width: 380px; }

.auth__step-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 100px; background: rgba(37,99,235,0.08); margin-bottom: 8px; }
.auth__step-badge--active { background: rgba(37,99,235,0.12); }
.auth__step-num { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.auth__step-num--done { background: #10b981; }
.auth__step-text { font-size: 12px; font-weight: 600; color: var(--accent); }
.auth__step-text--done { color: #10b981; }

.auth__form-head { margin-bottom: 28px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

.auth__field { margin-bottom: 16px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__input-icon { position: absolute; left: 14px; color: #a1a1aa; z-index: 1; }
.auth__input { width: 100%; padding: 13px 42px 13px 42px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b; transition: all 0.25s; outline: none; }
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input::placeholder { color: #a1a1aa; }
.auth__input-toggle { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #a1a1aa; padding: 4px; }
.auth__input-toggle:hover { color: #71717a; }

.auth__field-error { font-size: 12px; color: #ef4444; margin-top: 5px; }
.auth__field-success { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #10b981; margin-top: 5px; }

.auth__strength { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.auth__strength-bar { flex: 1; height: 4px; border-radius: 2px; background: rgba(0,0,0,0.06); overflow: hidden; }
.dark .auth__strength-bar { background: rgba(255,255,255,0.06); }
.auth__strength-fill { height: 100%; border-radius: 2px; transition: all 0.3s; }
.auth__strength-label { font-size: 11px; font-weight: 600; white-space: nowrap; }

.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,102,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15); }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,102,255,0.35); }
.auth__submit:disabled { opacity: 0.5; cursor: not-allowed; }

.auth__terms { text-align: center; margin-top: 20px; font-size: 12px; color: #71717a; line-height: 1.5; }
.dark .auth__terms { color: #a1a1aa; }
.auth__link { color: var(--accent); text-decoration: none; font-weight: 500; }
.auth__link:hover { text-decoration: underline; }

@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
}
</style>
