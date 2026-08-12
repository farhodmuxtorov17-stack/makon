<template>
  <div class="auth">
    <div class="auth__visual">
      <img :src="img('/buildings/v2_tashkent-tower.jpg')" alt="Tashkent City" class="auth__visual-img" />
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
            <span class="auth__step-num">1</span>
            <span class="auth__step-text">SMS orqali identifikatsiya</span>
          </div>
          <h1 class="auth__form-title">Telefon raqamingizni kiriting</h1>
          <p class="auth__form-sub">Tasdiqlash kodi raqamingizga yuboriladi</p>
        </div>

        <form @submit.prevent="handleSendOtp" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Telefon raqami</label>
            <div class="auth__input-wrap">
              <span class="auth__phone-prefix">+998</span>
              <input
                v-model="phone"
                type="tel"
                placeholder="90 123 45 67"
                class="auth__input auth__input--phone"
                maxlength="9"
                @input="formatPhone"
              />
            </div>
          </div>

          <div v-if="demoCode" class="auth__demo-notice">
            <Info :size="15" />
            <span>Demo rejim: kodingiz — <strong>{{ demoCode }}</strong></span>
          </div>

          <button type="submit" class="auth__submit" :disabled="loading || phone.length < 9">
            <span v-if="!loading">Kod yuborish</span>
            <span v-else>Yuborilmoqda...</span>
            <Send v-if="!loading" :size="17" />
          </button>

          <div class="auth__divider">
            <span>YOKI</span>
          </div>

          <NuxtLink to="/login" class="auth__eri">
            <LogIn :size="18" />
            Login va parol bilan kirish
          </NuxtLink>


        </form>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { Send, Info, LogIn } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const authStore = useAuthStore()
const phone = ref('')
const loading = ref(false)
const demoCode = ref('')

function formatPhone() {
  phone.value = phone.value.replace(/\D/g, '').slice(0, 9)
}

async function handleSendOtp() {
  if (phone.value.length < 9) return
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  const fullPhone = '+998' + phone.value
  const code = authStore.sendOtp(fullPhone)
  demoCode.value = code
  loading.value = false
  navigateTo('/auth/verify')
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

.auth__step-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 100px; background: rgba(37,99,235,0.08); margin-bottom: 20px; }
.auth__step-num { width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: white; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
.auth__step-text { font-size: 12px; font-weight: 600; color: var(--accent); letter-spacing: -0.01em; }

.auth__form-head { margin-bottom: 36px; }
.auth__form-title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

.auth__field { margin-bottom: 18px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__phone-prefix { position: absolute; left: 14px; font-size: 14px; font-weight: 600; color: #52525b; z-index: 1; pointer-events: none; }
.dark .auth__phone-prefix { color: #a1a1aa; }
.auth__input { width: 100%; padding: 13px 14px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b; transition: all 0.25s; outline: none; }
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input::placeholder { color: #a1a1aa; }
.auth__input--phone { padding-left: 56px; letter-spacing: 0.02em; font-weight: 500; }

.auth__demo-notice { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 10px; background: rgba(37,99,235,0.06); border: 1px solid rgba(37,99,235,0.15); margin-bottom: 18px; font-size: 13px; color: #52525b; }
.dark .auth__demo-notice { color: #a1a1aa; }
.auth__demo-notice svg { color: var(--accent); flex-shrink: 0; }

.auth__submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,102,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15); }
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,102,255,0.35); }
.auth__submit:disabled { opacity: 0.5; cursor: not-allowed; }

.auth__divider { text-align: center; margin: 22px 0; position: relative; }
.auth__divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(0,0,0,0.06); }
.dark .auth__divider::before { background: rgba(255,255,255,0.06); }
.auth__divider span { position: relative; background: #ffffff; padding: 0 14px; font-size: 11px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.1em; }
.dark .auth__divider span { background: #09090b; }

.auth__eri { width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px; padding: 14px; border-radius: 12px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.08); color: #18181b; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s; text-decoration: none; }
.dark .auth__eri { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__eri:hover { border-color: var(--accent); background: var(--accent-subtle); }

.auth__link { color: var(--accent); text-decoration: none; font-weight: 500; }
.auth__link:hover { text-decoration: underline; }
.auth__info-text { font-size: 11px; color: #71717a; margin: 2px 0 0; }
.dark .auth__info-text { color: #a1a1aa; }

@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
}
</style>
