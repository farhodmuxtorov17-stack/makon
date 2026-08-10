<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-2xl">
      <div class="text-center mb-8">
        <div class="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck :size="32" class="text-brand-400" />
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">ERI ro'yhatdan o'tish</h1>
        <p class="text-ink-400 text-sm">Elektron raqamli imzo integratsiyasi</p>
      </div>

      <div class="card p-6 mb-4">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <CheckCircle2 :size="20" class="text-emerald-400" />
          </div>
          <div>
            <div class="text-sm text-white font-medium">MAKON tizimi ERI bilan integratsiyalangan</div>
            <div class="text-xs text-ink-500">Shartnomalarni onlayn imzolash mumkin</div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="label">STIR / INN</label>
            <input v-model="inn" class="input" placeholder="305847291" />
          </div>
          <div>
            <label class="label">Tashkilot nomi</label>
            <input v-model="orgName" class="input" placeholder="Tashkent Logistics LLC" />
          </div>
          <div>
            <label class="label">ERI sertifikat fayli (.pfx)</label>
            <div class="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-brand-500/30 transition-colors cursor-pointer">
              <Upload :size="24" class="text-ink-600 mx-auto mb-2" />
              <p class="text-sm text-ink-400">PFX faylni tanlang</p>
            </div>
          </div>
          <div>
            <label class="label">Parol</label>
            <input type="password" class="input" placeholder="••••••••" />
          </div>
        </div>

        <div class="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <div class="flex gap-3">
            <Info :size="16" class="text-amber-400 flex-shrink-0 mt-0.5" />
            <p class="text-xs text-ink-400 leading-relaxed">
              ERI sertifikati faqat shartnoma imzolash uchun ishlatiladi. Sertifikat ma'lumotlari shifrlangan holda saqlanadi va uchinchi shaxslarga berilmaydi.
            </p>
          </div>
        </div>

        <button class="btn btn-primary w-full mt-6" @click="registerERI">
          Ro'yhatdan o'tish
        </button>
      </div>

      <p class="text-center text-sm text-ink-500">
        ERI mavjudmi?
        <NuxtLink to="/login" class="text-brand-400 hover:text-brand-300">Tizimga kirish</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, CheckCircle2, Upload, Info } from 'lucide-vue-next'

definePageMeta({ middleware: 'guest' })

const inn = ref('')
const orgName = ref('')

function registerERI() {
  navigateTo('/login')
}
</script>
