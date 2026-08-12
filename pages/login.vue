<template>
  <div class="auth">
    <!-- ═══ Visual Side ═══ -->
    <div class="auth__visual">
      <img :src="img('/buildings/real_tashkent-night.jpg')" alt="Tashkent City" class="auth__visual-img" />
      <div class="auth__visual-grad"></div>
      <div class="auth__visual-content">
        <NuxtLink to="/" class="auth__logo">
          <div class="auth__logo-icon">M</div>
          <span class="text-white font-bold text-lg tracking-tight">MAKON</span>
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

    <!-- ═══ Form Side ═══ -->
    <div class="auth__form-side">
      <div class="auth__form-wrap">
        <!-- Password Recovery Overlay -->
        <transition name="scale">
          <div v-if="showRecovery" class="auth__forgot-overlay" @click.self="showRecovery = false">
            <div class="auth__forgot-box">
              <h3 class="auth__forgot-title">Parolni tiklash</h3>
              <p class="auth__forgot-text">Telefon raqamingizni kiriting — yangi parol yuboriladi.</p>
              <div class="auth__field" style="margin-bottom: 16px">
                <div class="auth__input-wrap">
                  <Phone :size="17" class="auth__input-icon" />
                  <input v-model="recoveryPhone" type="tel" placeholder="+998 90 123 45 67" class="auth__input" />
                </div>
              </div>
              <button class="auth__submit" @click="sendRecovery">
                Yuborish <ArrowRight :size="16" />
              </button>
              <button class="auth__back" @click="showRecovery = false" style="margin-top: 12px; justify-content: center">
                <ArrowLeft :size="15" /> Bekor qilish
              </button>
            </div>
          </div>
        </transition>

        <!-- Form Header -->
        <div class="auth__form-head">
          <h1 class="auth__form-title">Xush kelibsiz</h1>
          <p class="auth__form-sub">Tizimga kirish uchun login va parolingizni kiriting</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="auth__form">
          <div class="auth__field">
            <label class="auth__label">Login</label>
            <div class="auth__input-wrap">
              <UserRound :size="17" class="auth__input-icon" />
              <input v-model="form.login" type="text" placeholder="login@makon.uz" class="auth__input" />
            </div>
          </div>

          <div class="auth__field">
            <label class="auth__label">Parol</label>
            <div class="auth__input-wrap">
              <Lock :size="17" class="auth__input-icon" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="auth__input"
              />
              <button type="button" @click="showPassword = !showPassword" class="auth__input-toggle">
                <Eye v-if="!showPassword" :size="17" />
                <EyeOff v-else :size="17" />
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="loginError" class="auth__error">
            <AlertCircle :size="15" />
            <span>Login yoki parol noto'g'ri</span>
          </div>

          <!-- Options -->
          <div class="auth__row">
            <label class="auth__check">
              <input v-model="form.remember" type="checkbox" class="auth__checkbox" />
              <span>Eslab qolish</span>
            </label>
            <button type="button" class="auth__link" @click="showRecovery = true">Parolni unutdingizmi?</button>
          </div>

          <!-- Submit -->
          <button type="submit" class="auth__submit" :disabled="loading">
            <span v-if="loading">Kirilmoqda...</span>
            <span v-else>Tizimga kirish</span>
            <ArrowRight v-if="!loading" :size="17" />
          </button>



          <!-- Signup Link -->
          <p class="auth__signup">
            Yangi foydalanuvchi?
            <NuxtLink to="/register" class="auth__link auth__link--bold">Ro'yxatdan o'ting</NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft,
  Info, Phone, Lock, UserRound,
  ShieldCheck, Zap
} from 'lucide-vue-next'

const { img } = useImg()
const form = reactive({ login: '', password: '', remember: false })
const loading = ref(false)
const loginError = ref(false)
const showPassword = ref(false)
const showRecovery = ref(false)
const recoveryPhone = ref('')
const authStore = useAuthStore()

onMounted(() => {
  const saved = localStorage.getItem('makon-remembered-login')
  if (saved) { form.login = saved; form.remember = true }
})


async function handleLogin() {
  loading.value = true
  loginError.value = false
  await new Promise(r => setTimeout(r, 600))
  loading.value = false
  if (authStore.loginWithCredentials(form.login, form.password)) {
    if (form.remember) localStorage.setItem('makon-remembered-login', form.login)
    else localStorage.removeItem('makon-remembered-login')
    navigateTo('/dashboard')
  } else {
    loginError.value = true
  }
}

function sendRecovery() {
  if (recoveryPhone.value.length > 0) {
    showRecovery.value = false
    navigateTo('/register')
  }
}
</script>
