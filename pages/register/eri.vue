<template>
  <div class="auth">
    <!-- Left: Visual -->
    <div class="auth__visual">
      <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png" alt="Tashkent" class="auth__visual-img" />
      <div class="auth__visual-grad"></div>
      <div class="auth__visual-content">
        <NuxtLink to="/" class="auth__logo">
          <div class="auth__logo-icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="auth__visual-bottom">
          <h2 class="auth__visual-title">ERI orqali xavfsiz ro'yxatdan o'tish</h2>
          <p class="auth__visual-text">Elektron Raqamli Imzo bilan tez va xavfsiz identifikatsiya.</p>
        </div>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <div class="auth__form-head">
          <h1 class="auth__form-title">Ro'yxatdan o'tish</h1>
          <p class="auth__form-sub">ERI ma'lumotlaringizni kiriting</p>
        </div>

        <!-- Step indicator -->
        <div class="auth__steps">
          <div :class="['auth__step', { 'auth__step--active': step >= 1, 'auth__step--done': step > 1 }]">
            <div class="auth__step-n">1</div>
            <span>ERI ma'lumotlari</span>
          </div>
          <div class="auth__step-line" :class="{ 'auth__step-line--done': step > 1 }"></div>
          <div :class="['auth__step', { 'auth__step--active': step >= 2 }]">
            <div class="auth__step-n">{{ step > 1 ? '✓' : '2' }}</div>
            <span>Tasdiqlash</span>
          </div>
        </div>

        <form v-if="step === 1" @submit.prevent="step = 2" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">PINFL</label>
            <div class="auth__input-wrap">
              <Hash :size="17" class="auth__input-icon" />
              <input v-model="form.pinfl" type="text" placeholder="12345678901234" class="auth__input" maxlength="14" />
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Passport seriyasi va raqami</label>
            <div class="auth__input-wrap">
              <FileText :size="17" class="auth__input-icon" />
              <input v-model="form.passport" type="text" placeholder="AA1234567" class="auth__input" />
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Telefon raqami</label>
            <div class="auth__input-wrap">
              <Phone :size="17" class="auth__input-icon" />
              <input v-model="form.phone" type="tel" placeholder="+998 90 123 45 67" class="auth__input" />
            </div>
          </div>

          <button type="submit" class="auth__submit">
            Davom etish <ArrowRight :size="17" />
          </button>
        </form>

        <form v-else @submit.prevent="handleRegister" class="auth__form">
          <div class="auth__eri-box">
            <div class="auth__eri-icon">
              <KeyRound :size="28" />
            </div>
            <h3 class="auth__eri-title">ERI kalitini tasdiqlang</h3>
            <p class="auth__eri-text">PINFL: {{ form.pinfl }}<br>Passport: {{ form.passport }}</p>
          </div>

          <button type="submit" class="auth__submit" :disabled="loading">
            <span v-if="!loading">Ro'yxatdan o'tish</span>
            <span v-else>Amalga oshirilmoqda...</span>
            <Check v-if="!loading" :size="17" />
          </button>

          <button type="button" @click="step = 1" class="auth__back">
            <ArrowLeft :size="15" /> Orqaga
          </button>
        </form>

        <p class="auth__signup">
          Hisobingiz bormi?
          <NuxtLink to="/login" class="auth__link auth__link--bold">Tizimga kiring</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hash, FileText, Phone, ArrowRight, ArrowLeft, KeyRound, Check } from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

const step = ref(1)
const loading = ref(false)
const form = reactive({ pinfl: '', passport: '', phone: '' })

async function handleRegister() {
  loading.value = true
  await new Promise(r => setTimeout(r, 1000))
  loading.value = false
  navigateTo('/login')
}
</script>

<style scoped>
.auth { display: flex; min-height: 100vh; }

.auth__visual { position: relative; width: 44%; overflow: hidden; }
.auth__visual-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.auth__visual-grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.4) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%),
              radial-gradient(ellipse at 30% 70%, rgba(99,102,241,0.15), transparent 50%);
}
.auth__visual-content {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 40px 48px;
}
.auth__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth__logo-icon {
  width: 38px; height: 38px; border-radius: 11px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 17px; color: white;
  box-shadow: 0 4px 16px rgba(99,102,241,0.35);
}
.auth__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.auth__visual-bottom { max-width: 400px; }
.auth__visual-title { font-size: 26px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.2; margin: 0 0 10px; }
.auth__visual-text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.5; margin: 0; }

.auth__form-side { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; background: #ffffff; }
.dark .auth__form-side { background: #09090b; }
.auth__form-wrap { width: 100%; max-width: 400px; }
.auth__form-head { margin-bottom: 28px; }
.auth__form-title { font-size: 26px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; margin: 0 0 6px; }
.dark .auth__form-title { color: white; }
.auth__form-sub { font-size: 14px; color: #71717a; margin: 0; }
.dark .auth__form-sub { color: #a1a1aa; }

/* Steps */
.auth__steps { display: flex; align-items: center; gap: 8px; margin-bottom: 28px; }
.auth__step { display: flex; align-items: center; gap: 8px; }
.auth__step-n {
  width: 26px; height: 26px; border-radius: 8px;
  background: rgba(0,0,0,0.05); color: #a1a1aa;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; transition: all 0.3s;
}
.dark .auth__step-n { background: rgba(255,255,255,0.06); }
.auth__step--active .auth__step-n { background: #6366f1; color: white; }
.auth__step--done .auth__step-n { background: #10b981; color: white; }
.auth__step span { font-size: 12px; color: #71717a; font-weight: 500; }
.dark .auth__step span { color: #a1a1aa; }
.auth__step--active span { color: #18181b; font-weight: 600; }
.dark .auth__step--active span { color: white; }
.auth__step-line { flex: 1; height: 2px; background: rgba(0,0,0,0.06); border-radius: 1px; }
.dark .auth__step-line { background: rgba(255,255,255,0.06); }
.auth__step-line--done { background: #10b981; }

/* Fields */
.auth__field { margin-bottom: 16px; }
.auth__label { display: block; font-size: 12px; font-weight: 600; color: #52525b; margin-bottom: 7px; }
.dark .auth__label { color: #a1a1aa; }
.auth__input-wrap { position: relative; display: flex; align-items: center; }
.auth__input-icon { position: absolute; left: 14px; color: #a1a1aa; z-index: 1; }
.auth__input {
  width: 100%; padding: 13px 14px 13px 42px; border-radius: 12px; border: 1.5px solid rgba(0,0,0,0.08);
  background: rgba(0,0,0,0.02); font-size: 14px; color: #18181b; transition: all 0.25s; outline: none;
}
.dark .auth__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.auth__input:focus { border-color: #6366f1; background: white; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.dark .auth__input:focus { background: rgba(255,255,255,0.06); }
.auth__input::placeholder { color: #a1a1aa; }

/* Submit */
.auth__submit {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.3s; box-shadow: 0 2px 10px rgba(99,102,241,0.25);
  margin-top: 4px;
}
.auth__submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
.auth__submit:disabled { opacity: 0.6; cursor: not-allowed; }

/* ERI box */
.auth__eri-box {
  text-align: center; padding: 32px 24px; border-radius: 16px;
  background: rgba(99,102,241,0.04); border: 1.5px solid rgba(99,102,241,0.1);
  margin-bottom: 20px;
}
.dark .auth__eri-box { background: rgba(99,102,241,0.06); }
.auth__eri-icon {
  width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 14px;
  background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(99,102,241,0.25);
}
.auth__eri-title { font-size: 16px; font-weight: 700; color: #18181b; margin: 0 0 8px; }
.dark .auth__eri-title { color: white; }
.auth__eri-text { font-size: 13px; color: #71717a; line-height: 1.6; margin: 0; }
.dark .auth__eri-text { color: #a1a1aa; }

/* Back */
.auth__back {
  display: flex; align-items: center; gap: 6px; width: 100%; margin-top: 12px;
  padding: 12px; border-radius: 12px; border: none;
  background: transparent; color: #71717a; font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 0.2s;
}
.auth__back:hover { color: #18181b; }
.dark .auth__back:hover { color: white; }

/* Signup */
.auth__signup { text-align: center; margin-top: 28px; font-size: 14px; color: #71717a; }
.dark .auth__signup { color: #a1a1aa; }
.auth__link { color: #6366f1; text-decoration: none; font-weight: 500; }
.auth__link:hover { text-decoration: underline; }
.auth__link--bold { font-weight: 600; }

@media (max-width: 900px) {
  .auth__visual { display: none; }
  .auth__form-side { padding: 24px; }
}
</style>
