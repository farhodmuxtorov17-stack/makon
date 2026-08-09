<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div
      class="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl"
      style="min-height: 640px"
    >
      <!-- Left: Form -->
      <div class="flex-1 bg-white p-10 flex flex-col">
        <NuxtLink to="/" class="flex items-center gap-3 mb-12">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-2 3 2 3-2 3 2z"
              />
            </svg>
          </div>
          <span class="text-xl font-bold font-display text-neutral-900">MAKON</span>
        </NuxtLink>

        <div class="flex-1 flex flex-col justify-center max-w-sm">
          <h1 class="text-3xl font-bold font-display text-neutral-900 mb-2">Xush kelibsiz</h1>
          <p class="text-sm text-neutral-500 mb-8">Ko'chmulk boshqaruv tizimiga kirish</p>

          <!-- Tabs -->
          <div class="flex p-1 rounded-xl bg-neutral-100 mb-6">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              :class="[
                'flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all',
                activeTab === tab.key ? 'bg-white text-primary-600 shadow-sm' : 'text-neutral-500',
              ]"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Login-password form -->
          <form v-if="activeTab === 'password'" class="space-y-4" @submit.prevent="handleLogin">
            <div>
              <label class="label">Login</label>
              <input v-model="form.login" class="input" placeholder="admin" />
            </div>
            <div>
              <label class="label">Parol</label>
              <input v-model="form.password" type="password" class="input" placeholder="••••••••" />
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-200"
                />
                <span class="text-neutral-500">Eslab qolish</span>
              </label>
              <a href="#" class="text-primary-600 font-medium hover:text-primary-700">Parolni unutdingizmi?</a>
            </div>
            <button type="submit" class="btn-primary w-full">Kirish</button>
          </form>

          <!-- ERI form -->
          <form v-if="activeTab === 'eri'" class="space-y-4" @submit.prevent="handleErI">
            <div>
              <label class="label">JShShIR (PINFL)</label>
              <input
                v-model="form.pinfl"
                class="input font-mono"
                placeholder="14 ta raqam"
                maxlength="14"
              />
            </div>
            <div class="flex items-center gap-2 text-xs text-neutral-500">
              <svg
                class="w-4 h-4 text-accent-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              ERI orqali elektron imzo bilan kirish
            </div>
            <button type="submit" class="btn-primary w-full">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              ERI bilan kirish
            </button>
          </form>
        </div>

        <p class="text-xs text-neutral-400 mt-8">© 2025 MAKON. Barcha huquqlar himoyalangan.</p>
      </div>

      <!-- Right: Hero -->
      <div class="flex-1 bg-neutral-950 p-10 flex flex-col justify-center relative overflow-hidden">
        <div
          class="absolute inset-0 opacity-20"
          :style="{
            background:
              'radial-gradient(circle at 30% 20%, rgb(99 102 241 0.5), transparent 50%), radial-gradient(circle at 80% 80%, rgb(20 184 166 0.3), transparent 50%)',
          }"
        />
        <div class="relative z-10">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 mb-6">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span class="text-xs text-white/80 font-medium">Tizim faol</span>
          </div>
          <h2 class="text-3xl font-bold font-display text-white leading-tight mb-4">
            Ko'chmulkingizni<br />bir platformada boshqaring
          </h2>
          <p class="text-white/60 text-sm leading-relaxed mb-8">
            Binolar, ijara, shartnomalar, invoyslar, servis va hisobotlar — barchasi yagona tizimda.
          </p>

          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="stat in heroStats"
              :key="stat.label"
              class="p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <p class="text-2xl font-bold text-white font-display">{{ stat.value }}</p>
              <p class="text-xs text-white/50 mt-0.5">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

definePageMeta({ layout: 'auth', middleware: 'guest' })

const activeTab = ref('password')
const tabs = [
  { key: 'password', label: 'Login-parol' },
  { key: 'eri', label: 'ERI' },
]

const form = reactive({ login: '', password: '', pinfl: '' })

const heroStats = [
  { value: '5', label: 'Bino' },
  { value: '60+', label: 'Unit' },
  { value: '12', label: 'Faol shartnoma' },
  { value: '99.9%', label: 'Uptime' },
]

function handleLogin() {
  if (form.login === 'admin' && form.password === 'admin123') {
    navigateTo('/dashboard/executive')
  }
}

function handleErI() {
  if (form.pinfl.length === 14) {
    navigateTo('/dashboard/executive')
  }
}
</script>
