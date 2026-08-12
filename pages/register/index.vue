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
          <h2 class="auth__visual-title">Toshkentning premium<br>obyektlari boshqaruvi</h2>
          <p class="auth__visual-text">MAKON platformasi orqali xavfsiz identifikatsiya va to'liq raqamli boshqaruv.</p>
          <div class="flex items-center gap-4 mt-6">
            <div class="flex items-center gap-2">
              <ShieldCheck :size="18" class="text-blue-400" />
              <span class="text-xs text-blue-200/60">Bank darajasidagi xavfsizlik</span>
            </div>
            <div class="flex items-center gap-2">
              <Zap :size="18" class="text-blue-400" />
              <span class="text-xs text-blue-200/60">Real vaqt rejimida</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <div class="auth__form-head">
          <h1 class="auth__form-title">Ro'yxatdan o'tish</h1>
          <p class="auth__form-sub">Telefon raqamingizni kiriting — tasdiqlash kodi yuboriladi</p>
        </div>

        <div class="auth__steps">
          <div class="auth__step auth__step--active">
            <div class="auth__step-n">1</div>
            <span>Telefon</span>
          </div>
          <div class="auth__step-line"></div>
          <div class="auth__step">
            <div class="auth__step-n">2</div>
            <span>Kod</span>
          </div>
          <div class="auth__step-line"></div>
          <div class="auth__step">
            <div class="auth__step-n">3</div>
            <span>Avtorizatsiya</span>
          </div>
        </div>

        <form @submit.prevent="handleSendOtp" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Telefon raqami</label>
            <div class="auth__input-wrap">
              <Phone :size="17" class="auth__input-icon" />
              <input v-model="phone" type="tel" placeholder="+998 90 123 45 67" class="auth__input" @input="formatPhone" />
            </div>
          </div>

          <div v-if="error" class="auth__error">
            <AlertCircle :size="15" />
            <span>Iltimos, to'g'ri telefon raqamini kiriting</span>
          </div>

          <div class="auth__info-notice">
            <Send :size="15" />
            <span>Tasdiqlash kodi yuboriladi</span>
          </div>

          <button type="submit" class="auth__submit" :disabled="loading || phone.length < 17">
            <span v-if="!loading">Kodni yuborish</span>
            <span v-else>Yuborilmoqda...</span>
            <ArrowRight v-if="!loading" :size="17" />
          </button>

          <NuxtLink to="/login" class="auth__back">
            <ArrowLeft :size="15" />
            Tizimga kirish
          </NuxtLink>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlertCircle, ArrowRight, ArrowLeft, Phone, Send, ShieldCheck, Zap } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const { img } = useImg()
const authStore = useAuthStore()
const phone = ref('+998 ')
const error = ref(false)
const loading = ref(false)

function formatPhone() {
  let val = phone.value.replace(/\D/g, '')
  if (!val.startsWith('998')) val = '998' + val.replace(/^998/, '')
  val = val.slice(0, 12)
  let f = '+998 '
  if (val.length > 3) f += val.slice(3, 5)
  if (val.length > 5) f += ' ' + val.slice(5, 8)
  if (val.length > 8) f += ' ' + val.slice(8, 10)
  if (val.length > 10) f += ' ' + val.slice(10, 12)
  phone.value = f
}

async function handleSendOtp() {
  const clean = phone.value.replace(/\s/g, '')
  if (clean.length < 12) { error.value = true; return }
  error.value = false
  loading.value = true
  await new Promise(r => setTimeout(r, 500))
  loading.value = false
  authStore.sendOtp(clean)
  navigateTo('/auth/verify')
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
.auth__form-wrap { width: 100%; max-width: 400px; }
.auth__form-head { margin-bottom: 28px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }
.auth__steps { display: flex; align-items: center; gap: 8px; margin-bottom: 32px; }
.auth__step { display: flex; align-items: center; gap: 6px; }
.auth__step-n { width: 26px; height: 26px; border-radius: 50%; background: rgba(0,0,0,0.06); color: #71717a; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
.dark .auth__step-n { background: rgba(255,255,255,0.06); color: #a1a1aa; }
.auth__step--active .auth__step-n { background: var(--accent); color: white; }
.auth__step span { font-size: 12px; font-weight: 600; color: #71717a; }
.dark .auth__step span { color: #a1a1aa; }
.auth__step--active span { color: #18181b; }
.dark .auth__step--active span { color: white; }
.auth__step-line { flex: 1; height: 2px; background: rgba(0,0,0,0.06); border-radius: 1px; }
.dark .auth__step-line { background: rgba(255,255,255,0.06); }
.auth__form { width: 100%; }
.auth__field { margin-bottom: 16px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; }
.auth__input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #a1a1aa; pointer-events: none; }
.auth__input { width: 100%; padding: 14px 14px 14px 44px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); font-size: 15px; color: #18181b; outline: none; transition: all 0.2s; }
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__error { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); margin-bottom: 18px; font-size: 13px; color: #ef4444; }
.auth__info-notice { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.15); margin-bottom: 18px; font-size: 13px; color: #52525b; }
.dark .auth__info-notice { color: #a1a1aa; }
.auth__info-notice svg { flex-shrink: 0; color: #2563eb; }
.auth__submit { width: 100%; padding: 14px; border-radius: 12px; border: none; background: var(--accent); color: white; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.3); }
.auth__submit:disabled { opacity: 0.5; cursor: not-allowed; }
.auth__back { display: flex; align-items: center; gap: 6px; margin-top: 20px; font-size: 13px; color: #71717a; text-decoration: none; transition: color 0.2s; }
.auth__back:hover { color: var(--accent); }
@media (max-width: 768px) {
  .auth { flex-direction: column; }
  .auth__visual { width: 100%; height: 200px; }
  .auth__visual-content { padding: 20px 24px; }
  .auth__visual-title { font-size: 20px; }
  .auth__form-side { padding: 24px 20px; }
  .auth__form-wrap { max-width: 100%; }
}
</style>
