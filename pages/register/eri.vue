<template>
  <div>
    <h1 class="text-2xl font-bold mb-1 text-center">ERI orqali ro'yxatdan o'tish</h1>
    <p class="text-sm text-ink-500 text-center mb-6">Yuridik shaxs sertifikatini tanlang</p>

    <!-- Step 1: ERI Component -->
    <div v-if="step === 1" class="space-y-4">
      <div class="card p-6 text-center border-dashed border-white/10">
        <ShieldCheck :size="48" class="mx-auto text-brand-400 mb-4" />
        <p class="text-sm text-ink-400 mb-4">ERI (Elektron ro'yxatdan o'tish identifikatori) sertifikatini tanlang. Tizim sizning tashkilot ma'lumotlaringizni avtomatik olish uchun ERI provayderiga so'rov yuboradi.</p>
        <button @click="initEri" class="btn btn-primary w-full" :disabled="loading">
          {{ loading ? 'ERI ishga tushirilmoqda...' : 'ERI sertifikatini tanlash' }}
        </button>
      </div>

      <div v-if="error" class="text-sm text-red-400 text-center">{{ error }}</div>

      <div class="text-xs text-ink-600 space-y-1.5">
        <p>• ERI sertifikatidan olingan STIR va tashkilot nomi o'zgartirilmaydi.</p>
        <p>• Bir STIR uchun bitta tashkilot profili yaratiladi.</p>
        <p>• Parol va tokenlar ochiq saqlanmaydi.</p>
      </div>
    </div>

    <!-- Step 2: Confirm Data -->
    <div v-else-if="step === 2" class="space-y-4">
      <div class="card p-5 bg-brand-500/5 border-brand-500/20">
        <div class="flex items-center gap-2 mb-3">
          <CheckCircle2 :size="18" class="text-emerald-400" />
          <span class="text-sm font-medium">Sertifikat tasdiqlandi</span>
        </div>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between"><span class="text-ink-500">Tashkilot nomi:</span><span class="font-medium">{{ eriData.orgName }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">STIR:</span><span class="font-mono">{{ eriData.tin }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">Vakil F.I.O:</span><span class="font-medium">{{ eriData.fullName }}</span></div>
          <div class="flex justify-between"><span class="text-ink-500">JShShIR:</span><span class="font-mono">{{ eriData.pinfl }}</span></div>
        </div>
      </div>

      <div>
        <label class="label">Email</label>
        <input v-model="contact.email" type="email" class="input" placeholder="info@company.uz" />
      </div>
      <div>
        <label class="label">Telefon raqam</label>
        <input v-model="contact.phone" type="tel" class="input" placeholder="+998 71 200 00 00" />
      </div>
      <div>
        <label class="label">Parol</label>
        <input v-model="contact.password" type="password" class="input" placeholder="••••••••" />
      </div>
      <div>
        <label class="label">Parolni tasdiqlang</label>
        <input v-model="contact.passwordConfirm" type="password" class="input" placeholder="••••••••" />
      </div>

      <button @click="completeRegistration" class="btn btn-primary w-full" :disabled="loading">
        {{ loading ? 'Yaratilmoqda...' : 'Hisobni yaratish' }}
      </button>
      <button @click="step = 1" class="btn btn-ghost w-full text-xs">Boshqatan sertifikat tanlash</button>
    </div>

    <!-- Step 3: Success -->
    <div v-else-if="step === 3" class="text-center py-8">
      <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 :size="32" class="text-emerald-400" />
      </div>
      <h2 class="text-xl font-bold mb-2">Tabriklaymiz!</h2>
      <p class="text-sm text-ink-400 mb-6">Hisobingiz muvaffaqiyatli yaratildi. Endi siz tizimga kirib, kabinetingizdan foydalanishingiz mumkin.</p>
      <NuxtLink to="/login" class="btn btn-primary w-full">Tizimga kirish</NuxtLink>
    </div>

    <p class="text-sm text-ink-500 text-center mt-6">
      Hisobingiz bormi?
      <NuxtLink to="/login" class="text-brand-400 hover:text-brand-300 font-medium">Kirish</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, CheckCircle2 } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const step = ref(1)
const loading = ref(false)
const error = ref('')

const eriData = reactive({
  tin: '',
  orgName: '',
  fullName: '',
  pinfl: '',
})

const contact = reactive({
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
})

async function initEri() {
  loading.value = true
  error.value = ''

  // Demo: simulates ERI certificate selection
  setTimeout(() => {
    eriData.tin = '305829641'
    eriData.orgName = 'Makon Property Management LLC'
    eriData.fullName = 'Farhod Mukhtorov'
    eriData.pinfl = '32501840220034'
    step.value = 2
    loading.value = false
  }, 1200)
}

async function completeRegistration() {
  if (!contact.email || !contact.phone || !contact.password) {
    error.value = 'Barcha maydonlarni to\'ldiring'
    return
  }
  if (contact.password !== contact.passwordConfirm) {
    error.value = 'Parollar mos kelmadi'
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    step.value = 3
  }, 1000)
}
</script>
