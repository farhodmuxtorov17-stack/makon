<template>
  <div class="auth">
    <!-- Left: Visual -->
    <div class="auth__visual">
      <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/3b441d5a2_generated_image.png" alt="Tashkent City" class="auth__visual-img" />
      <div class="auth__visual-grad"></div>
      <div class="auth__visual-content">
        <NuxtLink to="/" class="auth__logo">
          <div class="auth__logo-icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="auth__visual-bottom">
          <h2 class="auth__visual-title">Toshkentning premium obyektlari boshqaruvi</h2>
          <p class="auth__visual-text">ERI orqali xavfsiz identifikatsiya va to'liq raqamli boshqaruv.</p>
        </div>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <div class="auth__form-head">
          <h1 class="auth__form-title">Xush kelibsiz</h1>
          <p class="auth__form-sub">Tizimga kirish uchun ma'lumotlaringizni kiriting</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Login yoki ERI ID</label>
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

          <button type="button" @click="handleEriLogin" class="auth__eri">
            <KeyRound :size="18" />
            ERI orqali kirish
          </button>

          <p class="auth__signup">
            Hisobingiz yo'qmi?
            <NuxtLink to="/register/eri" class="auth__link auth__link--bold">Ro'yxatdan o'ting</NuxtLink>
          </p>
          <div class="auth__demo-hint">Demo: admin@makon.uz / demo1234</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Eye, EyeOff, ArrowRight, KeyRound } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const form = reactive({ login: 'admin@makon.uz', password: 'demo1234', remember: false })
const showPassword = ref(false)
const loading = ref(false)
const authStore = useAuthStore()

async function handleLogin() {
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  loading.value = false
  authStore.setAuth({ token: 'demo-token', user: { id: '1', name: 'Admin', role: 'SUPER_HEAD' } })
  navigateTo('/dashboard/executive')
}

function handleEriLogin() {
  navigateTo('/register/eri')
}
</script>

<style scoped>
.auth { display: flex; min-height: 100vh; }

/* Visual side */
.auth__visual { position: relative; width: 48%; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.auth__visual-grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.4) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%),
              radial-gradient(ellipse at 30% 70%, rgba(15,118,110,0.08), transparent 50%);
}
.auth__visual-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 40px 48px;
}
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--text);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 17px; color: white;
  box-shadow: none;
}
.auth__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.auth__visual-bottom { max-width: 400px; }
.auth__visual-title {
  font-size: 28px; font-weight: 800; color: white;
  letter-spacing: -0.03em; line-height: 1.15; margin: 0 0 10px;
}
.auth__visual-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0; }

/* Form side */
.auth__form-side {
  flex: 1; display: flex; align-items: center; justify-content: center;
  padding: 40px; background: #ffffff;
}
.dark .auth__form-side { background: #09090b; }
.auth__form-wrap { width: 100%; max-width: 380px; }
.auth__form-head { margin-bottom: 36px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

/* Fields */
.auth__field { margin-bottom: 18px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__input-icon { position: absolute; left: 14px; color: #a1a1aa; z-index: 1; }
.auth__input {
  width: 100%; padding: 13px 14px 13px 42px;
  border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b;
  transition: all 0.25s; outline: none;
}
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(15,118,110,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input::placeholder { color: #a1a1aa; }
.auth__input-toggle { position: absolute; right: 14px; background: none; border: none; cursor: pointer; color: #a1a1aa; padding: 4px; }
.auth__input-toggle:hover { color: #71717a; }

/* Row */
.auth__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.auth__check { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #52525b; cursor: pointer; }
.dark .auth__check { color: #a1a1aa; }
.auth__checkbox { width: 16px; height: 16px; border-radius: 5px; accent-color: var(--accent); }
.auth__link { font-size: 13px; color: var(--accent); text-decoration: none; font-weight: 500; }
.auth__link:hover { text-decoration: underline; }
.auth__link--bold { font-weight: 600; }

/* Submit */
.auth__submit {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px; border-radius: 12px; border: none;
  background: var(--text); color: white;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.3s; box-shadow: var(--shadow-md);
}
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: var(--shadow-lg); }
.auth__submit:disabled { opacity: 0.6; cursor: not-allowed; }

/* Divider */
.auth__divider { text-align: center; margin: 22px 0; position: relative; }
.auth__divider::before {
  content: ''; position: absolute; top: 50%; left: 0; right: 0;
  height: 1px; background: rgba(0,0,0,0.06);
}
.dark .auth__divider::before { background: rgba(255,255,255,0.06); }
.auth__divider span {
  position: relative; background: #ffffff; padding: 0 14px;
  font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.1em;
}
.dark .auth__divider span { background: #09090b; }

/* ERI button */
.auth__eri {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px;
  padding: 14px; border-radius: 12px;
  background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.08);
  color: #18181b; font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.3s;
}
.dark .auth__eri { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__eri:hover { border-color: var(--accent); background: var(--accent-subtle); }

/* Signup */
.auth__signup { text-align: center; margin-top: 28px; font-size: 14px; color: #71717a; }
.dark .auth__signup { color: #a1a1aa; }

.auth__demo-hint { text-align: center; margin-top: 14px; font-size: 12px; color: #a1a1aa; padding: 8px 12px; border-radius: 8px; background: var(--accent-subtle); }
/* Responsive */
@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
}
</style>
