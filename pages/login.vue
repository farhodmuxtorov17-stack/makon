<template>
  <div class="min-h-screen admin-bg text-ink-900 dark:text-white relative overflow-hidden flex flex-col lg:flex-row">

    <!-- Background effects -->
    <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"></div>

    <!-- Theme toggle -->
    <div class="absolute top-4 right-4 z-20">
      <ThemeToggle />
    </div>

    <!-- LEFT: Login form + device mockups -->
    <div class="relative flex-1 flex flex-col items-center justify-center px-4 py-12 lg:py-0 z-10">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center justify-center gap-2.5 mb-8 lg:mb-10">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-xl shadow-xl shadow-brand-500/30">M</div>
        <div>
          <div class="font-bold text-xl tracking-tight">MAKON</div>
          <div class="text-[10px] text-ink-500 uppercase tracking-widest">Real Estate Platform</div>
        </div>
      </NuxtLink>

      <!-- Login card -->
      <div class="w-full max-w-sm">
        <div class="card p-7 animate-fade-in">
          <h1 class="text-xl font-bold mb-1">Tizimga kirish</h1>
          <p class="text-sm text-ink-500 mb-5">MAKON platformasiga kiring</p>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
              <label class="label">Email yoki STIR</label>
              <input v-model="form.login" type="text" class="input" placeholder="admin@makon.uz" />
            </div>

            <div>
              <label class="label">Parol</label>
              <input v-model="form.password" type="password" class="input" placeholder="••••••••" />
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-ink-400 cursor-pointer">
                <input type="checkbox" v-model="form.remember" class="rounded border-black/10" />
                Eslab qolish
              </label>
              <a href="#" class="text-brand-500 hover:text-brand-600">Parolni unutdingizmi?</a>
            </div>

            <button type="submit" class="btn btn-primary w-full" :disabled="loading">
              {{ loading ? 'Kirilmoqda...' : 'Kirish' }}
            </button>
          </form>

          <div class="relative my-5">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-black/5 dark:border-white/5"></div></div>
            <div class="relative flex justify-center text-xs"><span class="px-3 bg-white dark:bg-ink-900 text-ink-500">yoki</span></div>
          </div>

          <button @click="handleEriLogin" class="btn btn-secondary w-full mb-3">
            <ShieldCheck :size="18" />
            ERI orqali kirish
          </button>

          <!-- Telegram Mini App button -->
          <button @click="openTelegramApp" class="btn w-full mb-3 relative overflow-hidden" style="background: linear-gradient(135deg, #2AABEE 0%, #229ED9 100%); color: white; box-shadow: 0 4px 14px rgba(34, 158, 217, 0.4);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Telegram Mini App
          </button>

          <p class="text-sm text-ink-500 text-center mt-5">
            Hisobingiz yo'qmi?
            <NuxtLink to="/register/eri" class="text-brand-500 hover:text-brand-600 font-medium">Ro'yxatdan o'ting</NuxtLink>
          </p>
        </div>

        <p class="text-center text-xs text-ink-500 mt-6">© 2026 MAKON — ERI orqali xavfsiz platforma</p>
      </div>
    </div>

    <!-- RIGHT: Device mockups (desktop only) -->
    <div class="hidden lg:flex relative items-center justify-center px-12 py-8 gap-8 z-10">

      <!-- iPhone 17 Pro Max (vertical) -->
      <div class="phone-mockup">
        <div class="phone-mockup__frame">
          <div class="phone-mockup__screen">
            <!-- Status bar -->
            <StatusBar device="phone" :dark="false" time="9:41" :battery-level="87" />

            <!-- App content -->
            <div class="phone-mockup__app">
              <!-- App header -->
              <div class="phone-app__header">
                <div class="phone-app__logo">M</div>
                <div>
                  <div class="phone-app__title">MAKON</div>
                  <div class="phone-app__subtitle">Mening kabinetim</div>
                </div>
                <div class="phone-app__bell">
                  <Bell :size="16" />
                </div>
              </div>

              <!-- KPI cards -->
              <div class="phone-app__kpis">
                <div class="phone-kpi">
                  <div class="phone-kpi__value">3</div>
                  <div class="phone-kpi__label">Unitlarim</div>
                </div>
                <div class="phone-kpi">
                  <div class="phone-kpi__value">2</div>
                  <div class="phone-kpi__label">Shartnomalar</div>
                </div>
                <div class="phone-kpi phone-kpi--accent">
                  <div class="phone-kpi__value">12.5M</div>
                  <div class="phone-kpi__label">Qarz (so'm)</div>
                </div>
              </div>

              <!-- Active contract -->
              <div class="phone-card">
                <div class="phone-card__title">Faol shartnoma</div>
                <div class="phone-card__row">
                  <span>CTR-2026-001</span>
                  <span class="phone-badge phone-badge--success">Faol</span>
                </div>
                <div class="phone-card__row">
                  <span class="phone-card__sub">A-301 · Tashkent City</span>
                </div>
                <div class="phone-card__progress">
                  <div class="phone-card__progress-fill" style="width: 45%"></div>
                </div>
                <div class="phone-card__row">
                  <span class="phone-card__sub">15.03.26 → 15.03.27</span>
                  <span class="phone-card__sub">45%</span>
                </div>
              </div>

              <!-- Invoice -->
              <div class="phone-card">
                <div class="phone-card__title">So'nggi invoys</div>
                <div class="phone-card__row">
                  <span>INV-2026-045</span>
                  <span class="phone-badge phone-badge--warning">Qisman</span>
                </div>
                <div class="phone-card__row">
                  <span class="phone-card__sub">Iyul 2026</span>
                  <span class="phone-card__amount">25M so'm</span>
                </div>
              </div>
            </div>

            <!-- Navigation bar -->
            <div class="phone-mockup__nav">
              <div class="phone-nav__item phone-nav__item--active">
                <Home :size="18" />
                <span>Bosh</span>
              </div>
              <div class="phone-nav__item">
                <FileText :size="18" />
                <span>Unit</span>
              </div>
              <div class="phone-nav__item">
                <ScrollText :size="18" />
                <span>Shartnoma</span>
              </div>
              <div class="phone-nav__item">
                <Bell :size="18" />
                <span>Hab</span>
              </div>
            </div>

            <!-- Home indicator -->
            <div class="phone-mockup__home"></div>
          </div>
        </div>
        <div class="phone-mockup__label">iPhone 17 Pro Max</div>
      </div>

      <!-- Tablet (horizontal) -->
      <div class="tablet-mockup">
        <div class="tablet-mockup__frame">
          <div class="tablet-mockup__screen">
            <!-- Status bar -->
            <StatusBar device="tablet" :dark="false" time="9:41" :battery-level="92" />

            <!-- Tablet app content -->
            <div class="tablet-app">
              <!-- Sidebar -->
              <div class="tablet-sidebar">
                <div class="tablet-sidebar__logo">M</div>
                <div class="tablet-sidebar__items">
                  <div class="tablet-sidebar__item tablet-sidebar__item--active"><LayoutDashboard :size="16" /></div>
                  <div class="tablet-sidebar__item"><Building2 :size="16" /></div>
                  <div class="tablet-sidebar__item"><FileText :size="16" /></div>
                  <div class="tablet-sidebar__item"><Receipt :size="16" /></div>
                  <div class="tablet-sidebar__item"><Bell :size="16" /></div>
                </div>
              </div>

              <!-- Main content -->
              <div class="tablet-content">
                <div class="tablet-header">
                  <div>
                    <div class="tablet-header__title">Executive Dashboard</div>
                    <div class="tablet-header__sub">MAKON · 2026</div>
                  </div>
                  <div class="tablet-header__avatar">FM</div>
                </div>

                <div class="tablet-kpis">
                  <div class="tablet-kpi">
                    <div class="tablet-kpi__label">Daromad (oy)</div>
                    <div class="tablet-kpi__value">380M</div>
                    <div class="tablet-kpi__trend tablet-kpi__trend--up">↑ 12%</div>
                  </div>
                  <div class="tablet-kpi">
                    <div class="tablet-kpi__label">Ishg'ollik</div>
                    <div class="tablet-kpi__value">89%</div>
                    <div class="tablet-kpi__trend tablet-kpi__trend--up">↑ 3%</div>
                  </div>
                  <div class="tablet-kpi">
                    <div class="tablet-kpi__label">Qarzdorlik</div>
                    <div class="tablet-kpi__value">85M</div>
                    <div class="tablet-kpi__trend tablet-kpi__trend--down">↓ 5%</div>
                  </div>
                  <div class="tablet-kpi">
                    <div class="tablet-kpi__label">SLA</div>
                    <div class="tablet-kpi__value">94%</div>
                    <div class="tablet-kpi__trend tablet-kpi__trend--up">↑ 2%</div>
                  </div>
                </div>

                <!-- Mini chart -->
                <div class="tablet-chart">
                  <div class="tablet-chart__title">Daromad dinamikasi</div>
                  <div class="tablet-chart__bars">
                    <div class="tablet-bar" style="height: 40%"></div>
                    <div class="tablet-bar" style="height: 55%"></div>
                    <div class="tablet-bar" style="height: 48%"></div>
                    <div class="tablet-bar" style="height: 70%"></div>
                    <div class="tablet-bar" style="height: 65%"></div>
                    <div class="tablet-bar" style="height: 82%"></div>
                    <div class="tablet-bar" style="height: 75%"></div>
                    <div class="tablet-bar tablet-bar--active" style="height: 95%"></div>
                  </div>
                </div>

                <!-- Recent activity -->
                <div class="tablet-activity">
                  <div class="tablet-activity__title">So'nggi arizalar</div>
                  <div class="tablet-activity__row">
                    <span class="tablet-activity__num">APP-012</span>
                    <span class="tablet-badge tablet-badge--warning">Taklif</span>
                  </div>
                  <div class="tablet-activity__row">
                    <span class="tablet-activity__num">APP-008</span>
                    <span class="tablet-badge tablet-badge--success">Tasdiqlandi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tablet-mockup__label">iPad Pro 11"</div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Bell, Home, FileText, ScrollText, LayoutDashboard, Building2, Receipt } from 'lucide-vue-next'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const loading = ref(false)

const form = reactive({
  login: '',
  password: '',
  remember: false,
})

async function handleLogin() {
  if (!form.login || !form.password) return
  loading.value = true

  setTimeout(() => {
    authStore.setUser({
      id: 'demo-user',
      fullName: 'Admin User',
      email: form.login,
      role: 'SUPER_HEAD',
    })
    loading.value = false
    navigateTo('/dashboard')
  }, 800)
}

function handleEriLogin() {
  navigateTo('/register/eri')
}

function openTelegramApp() {
  // In production, this would open the Telegram Mini App
  // For demo, navigate with telegram layout
  navigateTo('/cabinet')
}
</script>

<style scoped>
/* ============================================
   iPhone 17 Pro Max Mockup
   ============================================ */
.phone-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.phone-mockup__frame {
  width: 290px;
  height: 600px;
  background: linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%);
  border-radius: 48px;
  padding: 6px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.05), inset 0 0 2px rgba(255,255,255,0.1);
  position: relative;
}
.phone-mockup__frame::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 120px;
  width: 3px;
  height: 32px;
  background: #2a2a2e;
  border-radius: 2px 0 0 2px;
}
.phone-mockup__frame::after {
  content: '';
  position: absolute;
  left: -3px;
  top: 170px;
  width: 3px;
  height: 60px;
  background: #2a2a2e;
  border-radius: 2px 0 0 2px;
}
.phone-mockup__screen {
  width: 100%;
  height: 100%;
  background: #f4f4f5;
  border-radius: 42px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}
.phone-mockup__app {
  flex: 1;
  overflow-y: auto;
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.phone-mockup__nav {
  display: flex;
  justify-content: space-around;
  padding: 8px 8px 6px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0,0,0,0.06);
}
.phone-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: #a1a1aa;
  font-size: 9px;
  font-weight: 500;
}
.phone-nav__item--active {
  color: #6366f1;
}
.phone-mockup__home {
  width: 120px;
  height: 5px;
  background: #18181b;
  border-radius: 3px;
  margin: 4px auto 8px;
}
.phone-mockup__label {
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
}

/* Phone app content */
.phone-app__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 4px 8px;
}
.phone-app__logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
}
.phone-app__title {
  font-weight: 700;
  font-size: 14px;
}
.phone-app__subtitle {
  font-size: 11px;
  color: #71717a;
}
.phone-app__bell {
  margin-left: auto;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: #f4f4f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #71717a;
}
.phone-app__kpis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.phone-kpi {
  background: white;
  border-radius: 14px;
  padding: 10px 12px;
  border: 1px solid rgba(0,0,0,0.05);
}
.phone-kpi__value {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.phone-kpi__label {
  font-size: 10px;
  color: #71717a;
  margin-top: 2px;
}
.phone-kpi--accent {
  grid-column: span 2;
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border-color: rgba(239,68,68,0.15);
}
.phone-kpi--accent .phone-kpi__value {
  color: #dc2626;
}
.phone-card {
  background: white;
  border-radius: 14px;
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.phone-card__title {
  font-size: 11px;
  font-weight: 600;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.phone-card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}
.phone-card__sub {
  font-size: 10px;
  color: #71717a;
}
.phone-card__amount {
  font-size: 12px;
  font-weight: 700;
}
.phone-card__progress {
  height: 4px;
  background: #f4f4f5;
  border-radius: 2px;
  overflow: hidden;
}
.phone-card__progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #4f46e5);
  border-radius: 2px;
}
.phone-badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
}
.phone-badge--success {
  background: rgba(16,185,129,0.1);
  color: #059669;
}
.phone-badge--warning {
  background: rgba(245,158,11,0.1);
  color: #d97706;
}

/* ============================================
   Tablet Mockup (landscape)
   ============================================ */
.tablet-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.tablet-mockup__frame {
  width: 440px;
  height: 340px;
  background: linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%);
  border-radius: 24px;
  padding: 5px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.05);
  position: relative;
}
.tablet-mockup__frame::after {
  content: '';
  position: absolute;
  left: -3px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 40px;
  background: #2a2a2e;
  border-radius: 2px 0 0 2px;
}
.tablet-mockup__screen {
  width: 100%;
  height: 100%;
  background: #f4f4f5;
  border-radius: 19px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.tablet-mockup__label {
  font-size: 13px;
  font-weight: 600;
  color: #71717a;
}
.tablet-app {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.tablet-sidebar {
  width: 48px;
  background: white;
  border-right: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 8px;
  flex-shrink: 0;
}
.tablet-sidebar__logo {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 8px;
}
.tablet-sidebar__items {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.tablet-sidebar__item {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1a1aa;
}
.tablet-sidebar__item--active {
  background: rgba(99,102,241,0.1);
  color: #6366f1;
}
.tablet-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}
.tablet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
.tablet-header__title {
  font-size: 15px;
  font-weight: 700;
}
.tablet-header__sub {
  font-size: 10px;
  color: #71717a;
}
.tablet-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}
.tablet-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}
.tablet-kpi {
  background: white;
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid rgba(0,0,0,0.05);
}
.tablet-kpi__label {
  font-size: 9px;
  color: #71717a;
}
.tablet-kpi__value {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-top: 2px;
}
.tablet-kpi__trend {
  font-size: 9px;
  font-weight: 600;
}
.tablet-kpi__trend--up {
  color: #059669;
}
.tablet-kpi__trend--down {
  color: #dc2626;
}
.tablet-chart {
  background: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.05);
  margin-bottom: 8px;
}
.tablet-chart__title {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 8px;
}
.tablet-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 60px;
}
.tablet-bar {
  flex: 1;
  background: #e4e4e7;
  border-radius: 3px 3px 0 0;
  min-height: 4px;
}
.tablet-bar--active {
  background: linear-gradient(180deg, #818cf8, #6366f1);
}
.tablet-activity {
  background: white;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.05);
}
.tablet-activity__title {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 6px;
}
.tablet-activity__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 11px;
}
.tablet-activity__num {
  font-weight: 600;
}
.tablet-badge {
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
}
.tablet-badge--success {
  background: rgba(16,185,129,0.1);
  color: #059669;
}
.tablet-badge--warning {
  background: rgba(245,158,11,0.1);
  color: #d97706;
}
</style>
