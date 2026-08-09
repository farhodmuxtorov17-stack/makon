<template>
  <div class="min-h-screen flex bg-ink-50">
    <!-- ═══ Left: Form ═══ -->
    <div class="flex-1 flex flex-col lg:max-w-[640px] bg-white relative">
      <!-- Top nav -->
      <div class="px-8 py-6 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
          </div>
          <div>
            <div class="font-display font-bold text-ink-900 text-lg leading-none">MAKON</div>
            <div class="text-[10px] text-ink-400 font-medium tracking-wide uppercase mt-0.5">Real Estate</div>
          </div>
        </NuxtLink>
        <NuxtLink to="/" class="text-sm text-ink-500 hover:text-ink-900 transition-colors font-medium flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Bosh sahifa
        </NuxtLink>
      </div>

      <!-- Form -->
      <div class="flex-1 flex items-center justify-center px-8 pb-8">
        <div class="w-full max-w-[420px]">
          <!-- Heading -->
          <div class="mb-8 animate-fade-in-up">
            <div class="badge badge-info mb-4 px-3 py-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
              Enterprise · v2.0
            </div>
            <h1 class="font-display text-3xl font-bold text-ink-900 mb-2">Xush kelibsiz</h1>
            <p class="text-ink-500 text-sm">Boshqaruv paneliga kirish uchun tizimga kiring</p>
          </div>

          <!-- Tab toggle -->
          <div class="flex p-1 bg-ink-100 rounded-xl mb-6">
            <button
              class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ease-premium flex items-center justify-center gap-2"
              :class="activeTab === 'eri' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'"
              @click="activeTab = 'eri'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4" /><path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" /></svg>
              ERI orqali
            </button>
            <button
              class="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ease-premium flex items-center justify-center gap-2"
              :class="activeTab === 'password' ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500'"
              @click="activeTab = 'password'"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              Login — parol
            </button>
          </div>

          <!-- ERI form -->
          <div v-if="activeTab === 'eri'" class="space-y-4 animate-fade-in">
            <div class="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <div>
                <div class="text-emerald-900 text-sm font-semibold">Eng xavfsiz usul</div>
                <div class="text-emerald-700 text-xs">Elektron raqamli imzo yordamida tizimga kiring</div>
              </div>
            </div>

            <div>
              <label class="label">Tashkilot nomi</label>
              <select v-model="form.organization" class="input appearance-none cursor-pointer">
                <option>Urban Office MCHJ</option>
                <option>Business Plaza Group</option>
                <option>Makon Properties</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="label">STIR</label>
                <input v-model="form.stir" class="input" placeholder="305 123 456" />
              </div>
              <div>
                <label class="label">Telefon</label>
                <input v-model="form.phone" class="input" placeholder="+998 90 123 45 67" />
              </div>
            </div>
            <div>
              <label class="label">Foydalanuvchi</label>
              <input v-model="form.user" class="input" placeholder="Azizbek Karimov" />
            </div>
            <button class="btn btn-primary w-full btn-lg mt-2" @click="login">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4" /><path d="M12 3l8 4v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" /></svg>
              ERI orqali tasdiqlash
            </button>
          </div>

          <!-- Password form -->
          <div v-else class="space-y-4 animate-fade-in">
            <div>
              <label class="label">Email yoki login</label>
              <input v-model="form.email" class="input" placeholder="admin@makon.uz" />
            </div>
            <div>
              <label class="label">Parol</label>
              <div class="relative">
                <input v-model="form.password" class="input pr-10" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" />
                <button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="form.remember" type="checkbox" class="w-4 h-4 rounded border-ink-300 text-brand-600 focus:ring-brand-400" />
                <span class="text-sm text-ink-600">Eslab qolish</span>
              </label>
              <a class="text-sm text-brand-600 hover:text-brand-700 font-medium cursor-pointer">Parolni unutdingizmi?</a>
            </div>
            <button class="btn btn-primary w-full btn-lg mt-2" @click="login">
              Tizimga kirish
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-ink-100"></div>
            <span class="text-xs text-ink-400 font-medium">yoki</span>
            <div class="flex-1 h-px bg-ink-100"></div>
          </div>

          <!-- Telegram mini-app CTA -->
          <button class="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-ink-200 hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.164.164-.302.302-.617.302l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" /></svg>
            <span class="text-sm font-semibold text-ink-700 group-hover:text-ink-900">Telegram Mini-App orqali kirish</span>
          </button>

          <!-- Footer -->
          <div class="mt-8 flex items-center justify-center gap-4 text-xs text-ink-400">
            <span>© 2026 MAKON</span>
            <span>·</span>
            <a class="hover:text-ink-600 cursor-pointer">Maxfiylik</a>
            <span>·</span>
            <a class="hover:text-ink-600 cursor-pointer">Shartlar</a>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ Right: Showcase (iPhone + Tablet) ═══ -->
    <div class="hidden lg:flex flex-1 mesh-gradient noise-overlay relative overflow-hidden items-center justify-center">
      <!-- Background grid -->
      <div class="absolute inset-0 bg-grid-dark opacity-40"></div>

      <!-- Glow orbs -->
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-800/15 rounded-full blur-[100px]"></div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center gap-8 px-12">
        <!-- Heading -->
        <div class="text-center mb-2 animate-fade-in-down">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-white/60 text-xs font-medium">Telegram Mini-App · iOS · Android · Web</span>
          </div>
          <h2 class="font-display text-3xl font-bold text-white mb-3">Bir tizim — barcha qurilmalarda</h2>
          <p class="text-white/40 text-sm max-w-md">iPhone, planshet va kompyuterda — MAKON boshqaruvi doim qoʻlingizda</p>
        </div>

        <!-- Devices -->
        <div class="relative flex items-end justify-center gap-4 scale-[0.85]">
          <!-- Tablet (behind, left) -->
          <div class="mb-16 opacity-80" style="transform: perspective(800px) rotateY(12deg) rotateX(-5deg);">
            <TabletMockup width="320px" height="220px" />
          </div>

          <!-- iPhone (front, right) -->
          <div class="relative z-10" style="transform: perspective(800px) rotateY(-8deg) rotateX(3deg);">
            <PhoneMockup />
          </div>
        </div>

        <!-- Platform badges -->
        <div class="flex items-center gap-6 mt-4">
          <div class="flex items-center gap-2 text-white/40 text-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C1.3 16.42-.21 11.45 1.71 8.03c.93-1.66 2.62-2.72 4.45-2.75 1.3-.03 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.42-1.37 2.74zM12 3.74c.7-.84 1.85-1.47 2.84-1.51.12 1.17-.35 2.34-.99 3.16-.66.85-1.77 1.51-2.85 1.42-.14-1.16.49-2.35 1.2-3.07z" /></svg>
            iOS
          </div>
          <div class="w-px h-4 bg-white/10"></div>
          <div class="flex items-center gap-2 text-white/40 text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341c-.487.169-.79.226-.79.226s-.302-.057-.789-.226c-1.225-.403-2.454-1.169-3.45-2.215-.169-.169-.339-.339-.487-.508v3.45c0 .113-.057.226-.169.339-.226.226-.508.339-.79.339s-.564-.113-.79-.339c-.112-.113-.169-.226-.169-.339v-3.45c-.148.169-.318.339-.487.508-.996 1.046-2.225 1.812-3.45 2.215-.487.169-.79.226-.79.226s-.302-.057-.789-.226c-1.225-.403-2.454-1.169-3.45-2.215.14.14.28.28.42.42.169.169.339.339.487.508v5.78c0 .113.057.226.169.339.226.226.508.339.79.339s.564-.113.79-.339c.112-.113.169-.226.169-.339v-2.74c1.4.403 2.8.403 4.2 0v2.74c0 .113.057.226.169.339" /></svg>
            Android
          </div>
          <div class="w-px h-4 bg-white/10"></div>
          <div class="flex items-center gap-2 text-white/40 text-xs">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
            Web
          </div>
          <div class="w-px h-4 bg-white/10"></div>
          <div class="flex items-center gap-2 text-white/40 text-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#229ED9"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.164.164-.302.302-.617.302l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" /></svg>
            Telegram
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest', layout: 'auth' })

const activeTab = ref<'eri' | 'password'>('eri')
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  organization: 'Urban Office MCHJ',
  stir: '305 123 456',
  phone: '+998 90 123 45 67',
  user: 'Azizbek Karimov',
  email: '',
  password: '',
  remember: true,
})

function login() {
  authStore.login({
    name: form.user || 'Admin User',
    email: form.email || 'admin@makon.uz',
    role: 'executive',
    organization: form.organization,
  })
  router.push('/dashboard/executive')
}
</script>
