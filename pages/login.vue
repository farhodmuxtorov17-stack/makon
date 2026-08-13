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
            <p class="auth__form-sub">Tizimga kirish usulini tanlang</p>
          </div>

          <!-- Mode Tabs -->
          <div class="auth__tabs">
            <button
              class="auth__tab"
              :class="{ 'auth__tab--active': mode === 'password' }"
              @click="switchMode('password')"
            >
              <Lock :size="15" />
              <span>Login va parol</span>
            </button>
            <button
              class="auth__tab"
              :class="{ 'auth__tab--active': mode === 'phone' }"
              @click="switchMode('phone')"
            >
              <Phone :size="15" />
              <span>Telefon va kod</span>
            </button>
          </div>

          <!-- Password Mode -->
          <transition name="fade-slide" mode="out-in">
            <form
              v-if="mode === 'password'"
              key="password"
              @submit.prevent="handleLogin"
              class="auth__form"
            >
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

              <div v-if="loginError" class="auth__error">
                <AlertCircle :size="15" />
                <span>Login yoki parol noto'g'ri</span>
              </div>

              <div class="auth__row">
                <label class="auth__check">
                  <input v-model="form.remember" type="checkbox" class="auth__checkbox" />
                  <span>Eslab qolish</span>
                </label>
                <button type="button" class="auth__link" @click="showRecovery = true">Parolni unutdingizmi?</button>
              </div>

              <button type="submit" class="auth__submit" :disabled="loading">
                <span v-if="loading">Kirilmoqda...</span>
                <span v-else>Tizimga kirish</span>
                <ArrowRight v-if="!loading" :size="17" />
              </button>

              <p class="auth__signup">
                Yangi foydalanuvchi?
                <NuxtLink to="/register" class="auth__link auth__link--bold">Ro'yxatdan o'ting</NuxtLink>
              </p>
            </form>

            <!-- Phone OTP Mode -->
            <div v-else key="phone" class="auth__form">
              <!-- Step 1: Phone input -->
              <template v-if="otpStep === 'phone'">
                <div class="auth__field">
                  <label class="auth__label">Telefon raqami</label>
                  <div class="auth__input-wrap">
                    <Phone :size="17" class="auth__input-icon" />
                    <input
                      v-model="phoneInput"
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      class="auth__input"
                      @input="formatPhoneInput"
                    />
                  </div>
                </div>

                <div v-if="phoneError" class="auth__error">
                  <AlertCircle :size="15" />
                  <span>{{ phoneError }}</span>
                </div>

                <div class="auth__info-notice">
                  <Send :size="15" />
                  <span>Tasdiqlash kodi yuboriladi</span>
                </div>

                <button class="auth__submit" :disabled="otpLoading || phoneInput.length < 17" @click="handleSendOtp">
                  <span v-if="otpLoading">Yuborilmoqda...</span>
                  <span v-else>Kodni yuborish</span>
                  <ArrowRight v-if="!otpLoading" :size="17" />
                </button>
              </template>

              <!-- Step 2: OTP input -->
              <template v-if="otpStep === 'code'">
                <div class="auth__step-badge auth__step-badge--active" style="margin-bottom: 16px;">
                  <span class="auth__step-num auth__step-num--done">✓</span>
                  <span class="auth__step-text auth__step-text--done">Telefon tasdiqlandi</span>
                </div>

                <p class="auth__form-sub" style="margin-bottom: 20px;">
                  Kod <strong>{{ maskedPhone }}</strong> raqamiga yuborildi
                </p>

                <div class="otp-inputs">
                  <input
                    v-for="(_, i) in 6"
                    :key="i"
                    :ref="el => { if (el) otpRefs[i] = el as HTMLInputElement }"
                    v-model="otpDigits[i]"
                    type="text"
                    maxlength="1"
                    class="otp-box"
                    :class="{ 'otp-box--error': otpError, 'otp-box--filled': otpDigits[i] }"
                    @input="onOtpInput($event, i)"
                    @keydown="onOtpKeydown($event, i)"
                    @paste="onOtpPaste"
                  />
                </div>

                <div v-if="otpError" class="auth__error">
                  <AlertCircle :size="15" />
                  <span>Kod noto'g'ri. Qaytadan urinib ko'ring.</span>
                </div>

                <button class="auth__submit" :disabled="otpLoading || otpDigits.join('').length < 6" @click="handleVerifyOtp">
                  <span v-if="otpLoading">Tasdiqlanmoqda...</span>
                  <span v-else>Tizimga kirish</span>
                  <CheckCircle v-if="!otpLoading" :size="17" />
                </button>

                <div class="auth__resend">
                  <span v-if="resendTimer > 0">Qayta yuborish: {{ resendTimer }}s</span>
                  <button v-else type="button" class="auth__resend-btn" @click="resendOtp">
                    Qayta yuborish
                  </button>
                </div>

                <button class="auth__back" @click="resetOtp" style="justify-content: center; margin-top: 12px;">
                  <ArrowLeft :size="15" /> Raqamni o'zgartirish
                </button>
              </template>

              <p class="auth__signup">
                Yangi foydalanuvchi?
                <NuxtLink to="/register" class="auth__link auth__link--bold">Ro'yxatdan o'ting</NuxtLink>
              </p>
            </div>
          </transition>
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
  ShieldCheck, Zap, KeyRound, Send, CheckCircle
} from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const { img } = useImg()
const authStore = useAuthStore()

// Mode
const mode = ref<'password' | 'phone'>('password')

function switchMode(m: 'password' | 'phone') {
  mode.value = m
  loginError.value = false
  phoneError.value = ''
  otpError.value = false
}

// Password mode
const form = reactive({ login: '', password: '', remember: false })
const loading = ref(false)
const loginError = ref(false)
const showPassword = ref(false)
const showRecovery = ref(false)
const recoveryPhone = ref('')

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

function sendRecovery() {
  if (recoveryPhone.value.length > 0) {
    showRecovery.value = false
    mode.value = 'phone'
    phoneInput.value = recoveryPhone.value
  }
}

// Phone OTP mode
const phoneInput = ref('+998 ')
const phoneError = ref('')
const otpLoading = ref(false)
const otpStep = ref<'phone' | 'code'>('phone')
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])
const otpError = ref(false)
const resendTimer = ref(60)
let timerInterval: ReturnType<typeof setInterval> | null = null

const maskedPhone = computed(() => {
  const p = phoneInput.value.replace(/\s/g, '')
  if (p.length < 7) return p
  return p.slice(0, 5) + '••• •• ' + p.slice(-2)
})

function formatPhoneInput() {
  let val = phoneInput.value.replace(/\D/g, '')
  if (!val.startsWith('998')) val = '998' + val.replace(/^998/, '')
  val = val.slice(0, 12)
  let f = '+998 '
  if (val.length > 3) f += val.slice(3, 5)
  if (val.length > 5) f += ' ' + val.slice(5, 8)
  if (val.length > 8) f += ' ' + val.slice(8, 10)
  if (val.length > 10) f += ' ' + val.slice(10, 12)
  phoneInput.value = f
}

function startTimer() {
  resendTimer.value = 60
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0 && timerInterval) {
      clearInterval(timerInterval)
    }
  }, 1000)
}

async function handleSendOtp() {
  const clean = phoneInput.value.replace(/\s/g, '')
  if (clean.length < 12) {
    phoneError.value = 'Iltimos, to\'g\'ri telefon raqamini kiriting'
    return
  }

  phoneError.value = ''
  otpLoading.value = true
  await new Promise(r => setTimeout(r, 500))
  otpLoading.value = false

  const result = authStore.loginWithPhone(clean)
  if (result) {
    otpStep.value = 'code'
    startTimer()
    setTimeout(() => otpRefs.value[0]?.focus(), 100)
  } else {
    // Unknown phone — still send OTP (will lead to registration if not a user)
    authStore.sendOtp(clean)
    otpStep.value = 'code'
    startTimer()
    setTimeout(() => otpRefs.value[0]?.focus(), 100)
  }
}

function onOtpInput(e: Event, i: number) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  if (val) {
    otpDigits.value[i] = val
    otpError.value = false
    if (i < 5 && otpRefs.value[i + 1]) {
      otpRefs.value[i + 1].focus()
    }
    if (otpDigits.value.join('').length === 6 && i === 5) {
      handleVerifyOtp()
    }
  }
}

function onOtpKeydown(e: KeyboardEvent, i: number) {
  if (e.key === 'Backspace' && !otpDigits.value[i] && i > 0) {
    otpRefs.value[i - 1].focus()
  }
}

function onOtpPaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || ''
  for (let i = 0; i < 6; i++) {
    otpDigits.value[i] = pasted[i] || ''
  }
  if (pasted.length === 6) {
    otpRefs.value[5]?.focus()
    handleVerifyOtp()
  }
}

async function handleVerifyOtp() {
  const code = otpDigits.value.join('')
  if (code.length < 6) return
  otpLoading.value = true
  await new Promise(r => setTimeout(r, 600))
  otpLoading.value = false

  // Try login with OTP first (existing users)
  if (authStore.loginWithOtpCode(code)) {
    navigateTo('/dashboard')
    return
  }

  // If not a login attempt, check if it's a valid OTP for registration
  if (authStore.verifyOtp(code)) {
    // Phone verified — send to registration
    navigateTo('/auth/register')
    return
  }

  otpError.value = true
  otpDigits.value = ['', '', '', '', '', '']
  otpRefs.value[0]?.focus()
}

function resendOtp() {
  const clean = phoneInput.value.replace(/\s/g, '')
  authStore.sendOtp(clean)
  otpDigits.value = ['', '', '', '', '', '']
  otpError.value = false
  startTimer()
  otpRefs.value[0]?.focus()
}

function resetOtp() {
  otpStep.value = 'phone'
  otpDigits.value = ['', '', '', '', '', '']
  otpError.value = false
  phoneError.value = ''
  if (timerInterval) clearInterval(timerInterval)
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
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
.auth__visual-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.auth__visual-badge { display: flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 100px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: rgba(226,232,240,0.85); font-weight: 500; backdrop-filter: blur(6px); }

.auth__form-side { width: 420px; flex-shrink: 0; display: flex; flex-direction: column; padding: 28px 44px; position: relative; }
.auth__form-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: #71717a; text-decoration: none; align-self: flex-start; transition: color 0.2s; margin-bottom: 20px; }
.dark .auth__form-back { color: #a1a1aa; }
.auth__form-back:hover { color: var(--accent); }
.auth__form-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; width: 100%; max-width: 360px; margin: 0 auto; }

.auth__form-head { margin-bottom: 20px; }
.auth__logo--mobile { display: none; }
.auth__form-title { font-size: 27px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }
.auth__form-sub strong { color: #18181b; font-weight: 600; }
.dark .auth__form-sub strong { color: white; }

.auth__tabs {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: rgba(0,0,0,0.04);
  margin-bottom: 22px;
}
.dark .auth__tabs { background: rgba(255,255,255,0.05); }
.auth__tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 10px;
  border-radius: 9px;
  border: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 600;
  color: #71717a;
  cursor: pointer;
  transition: all 0.25s;
}
.dark .auth__tab { color: #a1a1aa; }
.auth__tab:hover { color: #18181b; }
.dark .auth__tab:hover { color: white; }
.auth__tab--active {
  background: #ffffff;
  color: #18181b;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.dark .auth__tab--active {
  background: rgba(255,255,255,0.08);
  color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

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
.auth__info-notice { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(37,99,235,0.04); margin-bottom: 16px; font-size: 12.5px; color: #71717a; }
.dark .auth__info-notice { background: rgba(37,99,235,0.08); color: #a1a1aa; }
.auth__info-notice svg { color: var(--accent); flex-shrink: 0; }

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

.otp-inputs { display: flex; gap: 10px; justify-content: center; margin-bottom: 18px; }
.otp-box { width: 48px; height: 56px; text-align: center; font-size: 20px; font-weight: 700; border-radius: 12px; border: 2px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); color: #18181b; outline: none; transition: all 0.25s; }
.dark .otp-box { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.otp-box:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); transform: translateY(-1px); }
.dark .otp-box:focus { background: rgba(255,255,255,0.06); }
.otp-box--filled { border-color: rgba(37,99,235,0.3); }
.otp-box--error { border-color: #ef4444 !important; animation: shake 0.4s; }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

.auth__resend { text-align: center; margin-top: 14px; font-size: 13px; color: #71717a; }
.dark .auth__resend { color: #a1a1aa; }
.auth__resend-btn { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 600; cursor: pointer; }
.auth__resend-btn:hover { text-decoration: underline; }

.auth__back { display: flex; align-items: center; gap: 6px; margin-top: 16px; font-size: 13px; color: #71717a; text-decoration: none; transition: color 0.2s; background: none; border: none; cursor: pointer; }
.dark .auth__back { color: #a1a1aa; }
.auth__back:hover { color: var(--accent); }

.auth__step-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 100px; background: rgba(37,99,235,0.08); }
.auth__step-badge--active { background: rgba(37,99,235,0.12); }
.auth__step-num { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.auth__step-num--done { background: #10b981; }
.auth__step-text { font-size: 12px; font-weight: 600; color: var(--accent); }
.auth__step-text--done { color: #10b981; }

.auth__forgot-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 50; }
.auth__forgot-box { background: white; border-radius: 20px; padding: 32px; max-width: 380px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
.dark .auth__forgot-box { background: #18181b; }
.auth__forgot-title { font-size: 20px; font-weight: 800; margin: 0 0 8px; color: #18181b; }
.dark .auth__forgot-title { color: white; }
.auth__forgot-text { font-size: 13px; color: #71717a; margin: 0 0 20px; }
.dark .auth__forgot-text { color: #a1a1aa; }

.auth__form-foot { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11.5px; color: #71717a; padding-top: 16px; }
.dark .auth__form-foot { color: #a1a1aa; }
.auth__form-foot-item { display: flex; align-items: center; gap: 5px; }
.auth__form-foot-dot { opacity: 0.5; }

.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
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
@media (max-width: 400px) {
  .auth__form-side { padding: 24px 20px; }
  .auth__tab span { font-size: 11px; }
  .otp-box { width: 42px; height: 50px; font-size: 18px; }
}
</style>
