<template>
  <div class="auth-page">
    <div class="auth-page__glow auth-page__glow--1"></div>
    <div class="auth-page__glow auth-page__glow--2"></div>

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

      <div class="auth__form-side">
        <NuxtLink to="/login" class="auth__form-back">
          <ArrowLeft :size="14" /> Tizimga kirish
        </NuxtLink>

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
          </form>
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
/* ═══ Premium windowed auth shell ═══ */
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
  height: min(720px, 86vh);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 50px 120px -24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
  background: #ffffff;
}
.dark .auth { background: #09090b; }

.auth__visual { position: relative; flex: 1.15; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; opacity: 0.9; }
.auth__visual-grad { position: absolute; inset: 0; background: linear-gradient(190deg, rgba(9,9,11,0.35) 0%, rgba(9,9,11,0.45) 40%, rgba(9,9,11,0.92) 100%), radial-gradient(ellipse at 30% 70%, rgba(37,99,235,0.08), transparent 50%); }
.auth__visual-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; }
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; color: white; box-shadow: 0 4px 12px rgba(37,99,235,0.3); flex-shrink: 0; }
.auth__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.auth__visual-bottom { max-width: 380px; }
.auth__visual-title { font-size: 26px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.2; margin: 0 0 10px; }
.auth__visual-text { font-size: 14px; color: rgba(203,213,225,0.75); line-height: 1.55; margin: 0; }
.auth__visual-badges { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.auth__visual-badge { display: flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 100px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: rgba(226,232,240,0.85); font-weight: 500; backdrop-filter: blur(6px); }

.auth__form-side { width: 440px; flex-shrink: 0; display: flex; flex-direction: column; padding: 28px 44px; background: #ffffff; }
.dark .auth__form-side { background: #09090b; }
.auth__form-back { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: #71717a; text-decoration: none; align-self: flex-start; transition: color 0.2s; }
.dark .auth__form-back { color: #a1a1aa; }
.auth__form-back:hover { color: var(--accent); }

.auth__form-wrap { flex: 1; display: flex; flex-direction: column; justify-content: center; width: 100%; max-width: 360px; margin: 0 auto; }
.auth__form-head { margin-bottom: 24px; }
.auth__form-title { font-size: 27px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }
.auth__steps { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; }
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

.auth__form-foot { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 11.5px; color: #a1a1aa; padding-top: 16px; }
.auth__form-foot-item { display: flex; align-items: center; gap: 5px; }
.auth__form-foot-dot { opacity: 0.5; }

@media (max-width: 980px) {
  .auth { max-width: 920px; }
  .auth__form-side { width: 380px; padding: 24px 36px; }
}
@media (max-width: 860px) {
  .auth-page { padding: 0; align-items: stretch; }
  .auth { flex-direction: column; max-width: 100%; height: auto; min-height: 100vh; border-radius: 0; box-shadow: none; }
  .auth__visual { flex: none; min-height: 220px; }
  .auth__visual-content { padding: 20px 24px; }
  .auth__visual-title { font-size: 20px; }
  .auth__form-side { width: 100%; padding: 28px 24px 36px; }
  .auth__form-back { display: none; }
  .auth__form-wrap { max-width: 380px; }
}
</style>
