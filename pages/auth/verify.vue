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
          <div class="auth__step-badge">
            <span class="auth__step-num auth__step-num--done">✓</span>
            <span class="auth__step-text auth__step-text--done">Telefon tasdiqlandi</span>
          </div>
          <div class="auth__step-badge auth__step-badge--active" style="margin-top: 8px;">
            <span class="auth__step-num">2</span>
            <span class="auth__step-text">Kodni tasdiqlash</span>
          </div>
          <h1 class="auth__form-title">Tasdiqlash kodini kiriting</h1>
          <p class="auth__form-sub">
            Kod <strong>{{ maskedPhone }}</strong> raqamiga yuborildi
          </p>
        </div>

        <form @submit.prevent="handleVerify" class="auth__form">
          <div class="otp-inputs">
            <input
              v-for="(_, i) in 6"
              :key="i"
              :ref="el => { if (el) otpRefs[i] = el as HTMLInputElement }"
              v-model="otpDigits[i]"
              type="text"
              maxlength="1"
              class="otp-box"
              :class="{ 'otp-box--error': error, 'otp-box--filled': otpDigits[i] }"
              @input="onOtpInput($event, i)"
              @keydown="onOtpKeydown($event, i)"
              @paste="onOtpPaste"
            />
          </div>

          <div v-if="error" class="auth__error">
            <AlertCircle :size="15" />
            <span>Kod noto'g'ri. Qaytadan urinib ko'ring.</span>
          </div>

          <div v-if="demoCode" class="auth__demo-notice">
            <Info :size="15" />
            <span>Demo rejim: kodingiz — <strong>{{ demoCode }}</strong></span>
          </div>

          <button type="submit" class="auth__submit" :disabled="loading || otpDigits.join('').length < 6">
            <span v-if="!loading">Tasdiqlash</span>
            <span v-else>Tasdiqlanmoqda...</span>
            <CheckCircle v-if="!loading" :size="17" />
          </button>

          <div class="auth__resend">
            <span v-if="resendTimer > 0">Qayta yuborish: {{ resendTimer }}s</span>
            <button v-else type="button" class="auth__resend-btn" @click="resendCode">
              Qayta yuborish
            </button>
          </div>

          <NuxtLink to="/auth/verify" class="auth__back">
            <ArrowLeft :size="15" />
            Raqamni o'zgartirish
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { CheckCircle, AlertCircle, Info, ArrowLeft } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const authStore = useAuthStore()
const otpDigits = ref<string[]>(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([])
const loading = ref(false)
const error = ref(false)
const resendTimer = ref(60)
const demoCode = ref('')

const maskedPhone = computed(() => {
  const p = authStore.pendingRegistration?.phone || ''
  if (p.length < 7) return p
  return p.slice(0, 5) + '••• •• ' + p.slice(-2)
})

onMounted(() => {
  // Restore pending registration from localStorage if needed
  if (!authStore.pendingRegistration && import.meta.client) {
    const saved = localStorage.getItem('makon-pending-reg')
    if (saved) {
      authStore.pendingRegistration = JSON.parse(saved)
    }
  }

  if (!authStore.pendingRegistration?.phone) {
    navigateTo('/auth/verify')
    return
  }

  // Show demo code
  demoCode.value = authStore.pendingRegistration.otpCode || ''

  // Focus first input
  setTimeout(() => otpRefs.value[0]?.focus(), 100)

  // Start resend timer
  startTimer()
})

function startTimer() {
  resendTimer.value = 60
  const interval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) clearInterval(interval)
  }, 1000)
}

function onOtpInput(e: Event, i: number) {
  const val = (e.target as HTMLInputElement).value.replace(/\D/g, '')
  if (val) {
    otpDigits.value[i] = val
    error.value = false
    if (i < 5 && otpRefs.value[i + 1]) {
      otpRefs.value[i + 1].focus()
    }
    // Auto-submit if all filled
    if (otpDigits.value.join('').length === 6 && i === 5) {
      handleVerify()
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
    handleVerify()
  }
}

async function handleVerify() {
  const code = otpDigits.value.join('')
  if (code.length < 6) return
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  loading.value = false

  if (authStore.verifyOtp(code)) {
    navigateTo('/auth/register')
  } else {
    error.value = true
    otpDigits.value = ['', '', '', '', '', '']
    otpRefs.value[0]?.focus()
  }
}

function resendCode() {
  if (!authStore.pendingRegistration) return
  const phone = authStore.pendingRegistration.phone
  const code = authStore.sendOtp(phone)
  demoCode.value = code
  otpDigits.value = ['', '', '', '', '', '']
  error.value = false
  startTimer()
  otpRefs.value[0]?.focus()
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

.auth__form-side { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; background: #ffffff; }
.dark .auth__form-side { background: #09090b; }
.auth__form-wrap { width: 100%; max-width: 380px; }

.auth__step-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 100px; background: rgba(37,99,235,0.08); margin-bottom: 8px; }
.auth__step-badge--active { background: rgba(37,99,235,0.12); }
.auth__step-num { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.auth__step-num--done { background: #10b981; }
.auth__step-text { font-size: 12px; font-weight: 600; color: var(--accent); }
.auth__step-text--done { color: #10b981; }

.auth__form-head { margin-bottom: 36px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }
.auth__form-sub strong { color: #18181b; font-weight: 600; }
.dark .auth__form-sub strong { color: white; }

.otp-inputs { display: flex; gap: 10px; justify-content: center; margin-bottom: 24px; }
.otp-box { width: 52px; height: 60px; text-align: center; font-size: 22px; font-weight: 700; border-radius: 14px; border: 2px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); color: #18181b; outline: none; transition: all 0.25s; }
.dark .otp-box { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.otp-box:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); transform: translateY(-1px); }
.dark .otp-box:focus { background: rgba(255,255,255,0.06); }
.otp-box--filled { border-color: rgba(37,99,235,0.3); }
.otp-box--error { border-color: #ef4444 !important; animation: shake 0.4s; }
@keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }

.auth__error { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); margin-bottom: 18px; font-size: 13px; color: #ef4444; }
.auth__error svg { flex-shrink: 0; }

.auth__demo-notice { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.15); margin-bottom: 18px; font-size: 13px; color: #52525b; }
.dark .auth__demo-notice { color: #a1a1aa; }
.auth__demo-notice svg { color: var(--accent); flex-shrink: 0; }

.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,102,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15); }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,102,255,0.35); }
.auth__submit:disabled { opacity: 0.5; cursor: not-allowed; }

.auth__resend { text-align: center; margin-top: 18px; font-size: 13px; color: #71717a; }
.dark .auth__resend { color: #a1a1aa; }
.auth__resend-btn { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 600; cursor: pointer; }
.auth__resend-btn:hover { text-decoration: underline; }

.auth__back { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 20px; font-size: 13px; color: #71717a; text-decoration: none; transition: color 0.2s; }
.dark .auth__back { color: #a1a1aa; }
.auth__back:hover { color: var(--accent); }

@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
  .otp-box { width: 44px; height: 52px; font-size: 18px; }
}
</style>
