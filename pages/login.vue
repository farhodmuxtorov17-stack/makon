<template>
  <div class="auth-page">
    <div class="auth-page__glow auth-page__glow--1"></div>
    <div class="auth-page__glow auth-page__glow--2"></div>

    <div class="auth">
      <!-- ═══ Visual Side ═══ -->
      <div class="auth__visual">
        <img :src="img('/buildings/real_tashkent-night.jpg')" alt="Tashkent City" class="auth__visual-img" />
        <div class="auth__visual-grad"></div>
        <div class="auth__visual-content">
          <NuxtLink to="/" class="auth__logo">
            <div class="auth__logo-icon">M</div>
            <span class="text-white font-bold text-lg tracking-tight">MAKON</span>
          </NuxtLink>
          <div class="auth__visual-bottom">
            <h2 class="auth__visual-title">Toshkentning premium<br>obyektlari boshqaruvi</h2>
            <p class="auth__visual-text">MAKON platformasi orqali xavfsiz identifikatsiya va to'liq raqamli boshqaruv.</p>
            <div class="auth__visual-badges">
              <div class="auth__visual-badge">
                <ShieldCheck :size="16" class="text-blue-400" />
                <span>Bank darajasidagi xavfsizlik</span>
              </div>
              <div class="auth__visual-badge">
                <Zap :size="16" class="text-blue-400" />
                <span>Real vaqt rejimida</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ Form Side ═══ -->
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

          <!-- Demo accounts -->
          <div class="auth__demo">
            <div class="auth__demo-title">
              <KeyRound :size="14" />
              <span>Demo akkauntlar</span>
            </div>
            <div class="auth__demo-list">
              <button type="button" class="auth__demo-item" @click="fillDemo('super@makon.uz', 'Makon2026!')">
                <div class="auth__demo-role">Bosh admin</div>
                <div class="auth__demo-cred">super@makon.uz</div>
              </button>
              <button type="button" class="auth__demo-item" @click="fillDemo('manager@makon.uz', 'Makon2026!')">
                <div class="auth__demo-role">Bino menejeri</div>
                <div class="auth__demo-cred">manager@makon.uz</div>
              </button>
              <button type="button" class="auth__demo-item" @click="fillDemo('accountant@makon.uz', 'Makon2026!')">
                <div class="auth__demo-role">Buxgalter</div>
                <div class="auth__demo-cred">accountant@makon.uz</div>
              </button>
              <button type="button" class="auth__demo-item" @click="fillDemo('operator@makon.uz', 'Makon2026!')">
                <div class="auth__demo-role">Operator</div>
                <div class="auth__demo-cred">operator@makon.uz</div>
              </button>
            </div>
            <p class="auth__demo-hint">Parol barchasi: Makon2026!</p>
          </div>
        </div>

        <div class="auth__form-foot">
          <div class="auth__form-foot-item"><ShieldCheck :size="13" /> Bank darajasidagi xavfsizlik</div>
          <span class="auth__form-foot-dot">·</span>
          <div class="auth__form-foot-item">Davlat standartiga muvofiq</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft,
  Info, Phone, Lock, UserRound,
  ShieldCheck, Zap, KeyRound
} from 'lucide-vue-next'

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
  loading.value = true
  loginError.value = false
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  if (authStore.loginWithCredentials(form.login, form.password)) {
    if (form.remember) localStorage.setItem('makon-remembered-login', form.login)
    else localStorage.removeItem('makon-remembered-login')
    navigateTo('/dashboard')
  } else {
    loginError.value = true
  }
}

function fillDemo(login: string, password: string) {
  form.login = login
  form.password = password
}

function sendRecovery() {
  if (recoveryPhone.value.length > 0) {
    showRecovery.value = false
    navigateTo('/register')
  }
}
</script>

<style scoped>
/* ═══ Premium windowed auth shell — avoids the "empty full-bleed" look on large monitors ═══ */
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

.auth__visual { position: relative; flex: 1.15; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.55; }
.auth__visual-grad { position: absolute; inset: 0; background: linear-gradient(190deg, rgba(10,17,32,0.35) 0%, rgba(10,17,32,0.55) 45%, rgba(8,13,25,0.92) 100%); }
.auth__visual-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; z-index: 1; }
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); display: flex; align-items: center; justify-content: center; font-weight: 800; color: white; font-size: 18px; box-shadow: 0 4px 12px rgba(37,99,235,0.3); flex-shrink: 0; }
.auth__visual-bottom { max-width: 380px; }
.auth__visual-title { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 700; color: white; letter-spacing: -0.03em; line-height: 1.2; }
.auth__visual-text { font-size: 14px; color: rgba(203,213,225,0.75); margin-top: 8px; line-height: 1.55; }
.auth__visual-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.auth__visual-badge { display: flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 100px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: rgba(226,232,240,0.85); font-weight: 500; backdrop-filter: blur(6px); }

.auth__form-side { width: 420px; flex-shrink: 0; display: flex; flex-direction: column; padding: 28px 44px; position: relative; }
.auth__form-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--text-muted); text-decoration: none; align-self: flex-start; transition: color 0.2s; }
.auth__form-back:hover { color: var(--accent); }
.auth__logo--mobile { display: none; margin-bottom: 16px; }
.auth__logo-icon--dark { background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); }

.auth__form-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; width: 100%; max-width: 332px; margin: 0 auto; }
.auth__form-head { margin-bottom: 26px; }
.auth__form-title { font-size: 27px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; font-family: 'Sora', sans-serif; animation: fadeInUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
.auth__form-sub { font-size: 14px; color: var(--text-muted); margin-top: 4px; }

.auth__field { margin-bottom: 16px; }
.auth__label { font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; display: block; }
.auth__input-wrap { position: relative; }
.auth__input-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
.auth__input { width: 100%; border-radius: 12px; padding: 13px 16px 13px 42px; font-size: 14px; background: var(--bg-card); border: 1px solid var(--border-strong); color: var(--text); transition: all 0.2s; }
.auth__input:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(37,99,235,0.1), 0 2px 8px -2px rgba(37,99,235,0.15); outline: none; }
.auth__input-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 4px; }
.auth__error { display: flex; align-items: center; gap: 6px; padding: 10px 12px; border-radius: 10px; background: var(--danger-bg); color: var(--danger); font-size: 13px; margin-bottom: 16px; border: 1px solid var(--danger-border); }
.auth__row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.auth__check { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-secondary); }
.auth__checkbox { width: 16px; height: 16px; border-radius: 4px; accent-color: var(--accent); }
.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 24px; border-radius: 14px; background: var(--gradient-button, linear-gradient(135deg,#2563eb,#3b82f6)); color: white; font-size: 15px; font-weight: 600; border: none; cursor: pointer; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 6px 20px -4px rgba(37,99,235,0.35); position: relative; overflow: hidden; }
.auth__submit:hover { transform: translateY(-2px); box-shadow: 0 10px 32px -4px rgba(37,99,235,0.45), 0 0 0 4px rgba(37,99,235,0.08); }
.auth__submit::after { content: ''; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%); transform: translateX(-100%); transition: transform 0.6s; }
.auth__submit:hover::after { transform: translateX(100%); }
.auth__submit:active { transform: translateY(0); }
.auth__submit:disabled { opacity: 0.6; cursor: wait; }
.auth__link { font-size: 13px; color: var(--accent); text-decoration: none; cursor: pointer; background: none; border: none; }
.auth__link:hover { text-decoration: underline; }
.auth__link--bold { font-weight: 600; }
.auth__signup { text-align: center; font-size: 13px; color: var(--text-muted); margin-top: 18px; }

.auth__forgot-box { background: var(--bg-card); border: 1px solid var(--border); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-xl); max-width: 340px; }
.auth__forgot-overlay { position: fixed; inset: 0; z-index: 50; display: flex; align-items: center; justify-content: center; background: rgba(6,10,19,0.55); backdrop-filter: blur(3px); padding: 20px; }
.auth__forgot-title { font-size: 19px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.auth__forgot-text { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
.auth__back { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 8px; font-size: 13px; color: var(--text-secondary); border: none; background: none; cursor: pointer; transition: color 0.2s; width: 100%; }
.auth__back:hover { color: var(--accent); }

.auth__form-foot { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11.5px; color: var(--text-faint); padding-top: 16px; }
.auth__form-foot-item { display: flex; align-items: center; gap: 5px; }
.auth__form-foot-dot { opacity: 0.5; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.scale-enter-active, .scale-leave-active { transition: all 0.2s ease; }
.scale-enter-from, .scale-leave-to { opacity: 0; transform: scale(0.96); }

/* ═══ Responsive ═══ */
@media (max-width: 980px) {
  .auth { max-width: 920px; }
  .auth__form-side { width: 380px; padding: 24px 36px; }
}
@media (max-width: 860px) {
  .auth-page { padding: 0; align-items: stretch; }
  .auth { flex-direction: column; max-width: 100%; height: auto; min-height: 100vh; border-radius: 0; box-shadow: none; }
  .auth__visual { flex: none; min-height: 240px; }
  .auth__form-side { width: 100%; padding: 32px 24px 40px; }
  .auth__form-back { display: none; }
  .auth__logo--mobile { display: none; }
  .auth__form-wrap { max-width: 380px; }
}
@media (max-width: 420px) {
  .auth__form-side { padding: 24px 18px 32px; }
  .auth__form-title { font-size: 24px; }
}

.auth__demo {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(0,0,0,0.06);
}
.dark .auth__demo { border-top-color: rgba(255,255,255,0.06); }
.auth__demo-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #71717a;
  margin-bottom: 12px;
}
.dark .auth__demo-title { color: #a1a1aa; }
.auth__demo-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.auth__demo-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  background: rgba(0,0,0,0.02);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.dark .auth__demo-item { border-color: rgba(255,255,255,0.06); background: rgba(255,255,255,0.03); }
.auth__demo-item:hover {
  border-color: var(--accent);
  background: rgba(37,99,235,0.06);
}
.auth__demo-role { font-size: 12px; font-weight: 600; color: #18181b; }
.dark .auth__demo-role { color: white; }
.auth__demo-cred { font-size: 11px; color: #71717a; font-family: monospace; }
.dark .auth__demo-cred { color: #a1a1aa; }
.auth__demo-hint { font-size: 11px; color: #a1a1aa; margin-top: 8px; text-align: center; }
</style>
