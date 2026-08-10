<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-ink-50 dark:bg-ink-950">
    <div class="w-full max-w-lg">
      <!-- Logo -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-500/30">M</div>
        <span class="text-2xl font-bold tracking-tight text-ink-900 dark:text-white">MAKON</span>
      </div>

      <!-- Progress steps -->
      <div class="flex items-center justify-between mb-8 px-2">
        <div v-for="(s, i) in steps" :key="i" class="flex items-center" :class="{ 'flex-1': i < steps.length - 1 }">
          <div class="flex flex-col items-center">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all"
              :class="step > i ? 'bg-emerald-500 text-white' : step === i ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-black/5 dark:bg-white/5 text-ink-400'"
            >
              <CheckCircle v-if="step > i" :size="20" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="text-[10px] mt-1.5 font-medium" :class="step >= i ? 'text-ink-900 dark:text-white' : 'text-ink-400'">{{ s }}</span>
          </div>
          <div v-if="i < steps.length - 1" class="flex-1 h-0.5 mx-2 rounded-full transition-all" :class="step > i ? 'bg-emerald-500' : 'bg-black/5 dark:bg-white/5'" />
        </div>
      </div>

      <!-- Step content card -->
      <div class="card p-6">
        <!-- Step 1: ERI Certificate -->
        <div v-if="step === 0" class="space-y-5">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck :size="32" class="text-purple-500" />
            </div>
            <h2 class="text-lg font-bold text-ink-900 dark:text-white">ERI orqali ro'yxatdan o'tish</h2>
            <p class="text-sm text-ink-500 mt-1">Yuridik shaxs elektron sertifikatini tanlang</p>
          </div>

          <div class="eri-dropzone" @click="initEri" :class="{ 'eri-dropzone--loading': loading }">
            <div v-if="loading" class="flex flex-col items-center gap-3">
              <div class="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p class="text-sm text-ink-500">ERI provayderga so'rov yuborilmoqda...</p>
            </div>
            <template v-else>
              <Key :size="32" class="text-brand-500 mx-auto mb-3" />
              <p class="text-sm font-medium text-ink-900 dark:text-white mb-1">ERI sertifikatini tanlang</p>
              <p class="text-xs text-ink-500">Bosish orqali fayl tanlang yoki sudrab tashlang</p>
            </template>
          </div>

          <div v-if="error" class="p-3 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center gap-2">
            <AlertCircle :size="16" class="text-red-500" />
            <span class="text-sm text-red-500">{{ error }}</span>
          </div>

          <div class="space-y-2 text-xs text-ink-500">
            <div class="flex items-start gap-2">
              <ShieldCheck :size="14" class="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>ERI sertifikatidan olingan STIR va tashkilot nomi o'zgartirilmaydi</span>
            </div>
            <div class="flex items-start gap-2">
              <ShieldCheck :size="14" class="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Bir STIR uchun bitta tashkilot profili yaratiladi</span>
            </div>
            <div class="flex items-start gap-2">
              <ShieldCheck :size="14" class="text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>Parol va tokenlar shifrlangan holda saqlanadi</span>
            </div>
          </div>
        </div>

        <!-- Step 2: Confirm Data -->
        <div v-else-if="step === 1" class="space-y-5">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle :size="32" class="text-emerald-500" />
            </div>
            <h2 class="text-lg font-bold text-ink-900 dark:text-white">Ma'lumotlarni tasdiqlang</h2>
            <p class="text-sm text-ink-500 mt-1">ERI sertifikatidan olingan ma'lumotlar</p>
          </div>

          <div class="eri-data-card">
            <div class="eri-data-card__row">
              <span class="text-ink-500">Tashkilot nomi</span>
              <span class="font-semibold text-ink-900 dark:text-white">{{ eriData.orgName }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">STIR</span>
              <span class="font-mono font-medium text-ink-900 dark:text-white">{{ eriData.tin }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">Vakil F.I.O</span>
              <span class="font-medium text-ink-900 dark:text-white">{{ eriData.fullName }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">JShShIR</span>
              <span class="font-mono text-ink-900 dark:text-white">{{ eriData.pinfl }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">Sertifikat muddati</span>
              <span class="font-medium text-ink-900 dark:text-white">{{ eriData.certExpiry }}</span>
            </div>
          </div>

          <div class="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <Info :size="16" class="text-blue-500 flex-shrink-0" />
            <p class="text-xs text-blue-500">Ma'lumotlar ERI provayderdan olingan. O'zgartirib bo'lmaydi.</p>
          </div>

          <div class="flex gap-2">
            <button @click="step = 0" class="btn btn-secondary btn-md flex-1">Orqaga</button>
            <button @click="step = 2" class="btn btn-primary btn-md flex-1">Tasdiqlash</button>
          </div>
        </div>

        <!-- Step 3: Account setup -->
        <div v-else-if="step === 2" class="space-y-5">
          <div class="text-center">
            <div class="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus :size="32" class="text-brand-500" />
            </div>
            <h2 class="text-lg font-bold text-ink-900 dark:text-white">Hisob ma'lumotlari</h2>
            <p class="text-sm text-ink-500 mt-1">Tizimga kirish uchun parol o'rnating</p>
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Email manzil</label>
              <input v-model="account.email" type="email" placeholder="info@tashkilot.uz" class="eri-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Telefon raqam</label>
              <input v-model="account.phone" type="tel" placeholder="+998 90 123 45 67" class="eri-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Parol</label>
              <input v-model="account.password" type="password" placeholder="••••••••" class="eri-input" />
              <div class="mt-1.5 flex items-center gap-1">
                <div v-for="i in 5" :key="i" class="h-1 flex-1 rounded-full transition-all" :class="passwordStrength >= i ? 'bg-emerald-500' : 'bg-black/10 dark:bg-white/10'" />
              </div>
              <span class="text-[10px] text-ink-400 mt-1">{{ strengthLabel }}</span>
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Parolni tasdiqlang</label>
              <input v-model="account.confirmPassword" type="password" placeholder="••••••••" class="eri-input" />
              <p v-if="account.confirmPassword && account.password !== account.confirmPassword" class="text-[10px] text-red-500 mt-1">Parollar mos kelmadi</p>
            </div>
          </div>

          <label class="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" v-model="account.agreed" class="mt-0.5 w-4 h-4 rounded border-black/20 dark:border-white/20 text-brand-500" />
            <span class="text-xs text-ink-500">Foydalanish shartlari va maxfiylik siyosatiga roziman</span>
          </label>

          <div class="flex gap-2">
            <button @click="step = 1" class="btn btn-secondary btn-md flex-1">Orqaga</button>
            <button @click="register" :disabled="!canRegister || loading2" class="btn btn-primary btn-md flex-1">
              <span v-if="loading2" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></span>
              <span v-else>Ro'yxatdan o'tish</span>
            </button>
          </div>
        </div>

        <!-- Step 4: Success -->
        <div v-else-if="step === 3" class="space-y-5 text-center">
          <div class="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle :size="48" class="text-emerald-500" />
          </div>
          <div>
            <h2 class="text-xl font-bold text-ink-900 dark:text-white">Tabriklaymiz!</h2>
            <p class="text-sm text-ink-500 mt-2">Hisobingiz muvaffaqiyatli yaratildi. Tizimga kirishingiz mumkin.</p>
          </div>

          <div class="eri-data-card text-left">
            <div class="eri-data-card__row">
              <span class="text-ink-500">Tashkilot</span>
              <span class="font-semibold text-ink-900 dark:text-white">{{ eriData.orgName }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">STIR</span>
              <span class="font-mono text-ink-900 dark:text-white">{{ eriData.tin }}</span>
            </div>
            <div class="eri-data-card__row">
              <span class="text-ink-500">Email</span>
              <span class="font-medium text-ink-900 dark:text-white">{{ account.email }}</span>
            </div>
          </div>

          <NuxtLink to="/login" class="btn btn-primary btn-md w-full">
            Tizimga kirish <ArrowRight :size="16" />
          </NuxtLink>
        </div>
      </div>

      <p class="text-center text-xs text-ink-400 mt-6">
        ERI — Elektron Ro'yxatdan o'tish Identifikatori<br />MAKON Management MChJ · 2026
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Key, CheckCircle, AlertCircle, Info, UserPlus, ArrowRight } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const step = ref(0)
const loading = ref(false)
const loading2 = ref(false)
const error = ref('')

const steps = ['ERI sertifikat', 'Tasdiqlash', 'Hisob', 'Tayyor']

const eriData = ref({
  orgName: '',
  tin: '',
  fullName: '',
  pinfl: '',
  certExpiry: '',
})

const account = reactive({
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agreed: false,
})

async function initEri() {
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 2000))

  // Simulate ERI data
  eriData.value = {
    orgName: 'ABC Logistics MChJ',
    tin: '308745612',
    fullName: 'Yusupov Sardor Akmal o\'g\'li',
    pinfl: '32508901234567',
    certExpiry: '15.03.2027',
  }

  loading.value = false
  step.value = 1
}

const passwordStrength = computed(() => {
  const p = account.password
  if (!p) return 0
  let s = 0
  if (p.length >= 6) s++
  if (p.length >= 10) s++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})

const strengthLabel = computed(() => {
  const labels = ['Juda zaif', 'Zaif', "O'rta", 'Yaxshi', 'Kuchli', 'Juda kuchli']
  return labels[passwordStrength.value] || ''
})

const canRegister = computed(() =>
  account.email.includes('@') &&
  account.password.length >= 6 &&
  account.password === account.confirmPassword &&
  account.agreed
)

async function register() {
  loading2.value = true
  await new Promise(r => setTimeout(r, 1500))
  loading2.value = false
  step.value = 3
}
</script>

<style scoped>
.eri-dropzone {
  border: 2px dashed rgba(99,102,241,0.2);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(99,102,241,0.02);
}
.eri-dropzone:hover {
  border-color: rgba(99,102,241,0.4);
  background: rgba(99,102,241,0.05);
}
.eri-dropzone--loading {
  border-style: solid;
  cursor: default;
}
.eri-data-card {
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  background: rgba(0,0,0,0.02);
  overflow: hidden;
}
.dark .eri-data-card {
  border-color: rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
}
.eri-data-card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  font-size: 13px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.dark .eri-data-card__row { border-bottom-color: rgba(255,255,255,0.04); }
.eri-data-card__row:last-child { border-bottom: none; }
.eri-input {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  background: #ffffff;
  color: #18181b;
  outline: none;
  transition: border-color 0.15s;
}
.dark .eri-input {
  background: #09090b;
  color: #fafafa;
  border-color: rgba(255,255,255,0.1);
}
.eri-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
}
</style>
