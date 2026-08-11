<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Profil</h1>
        <p class="text-ink-500 text-sm mt-1">Shaxsiy ma'lumotlar va sozlamalar</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Left: Profile card -->
      <div class="space-y-4">
        <div class="card p-5 text-center">
          <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white text-2xl mx-auto mb-3 shadow-lg shadow-brand-500/30">A</div>
          <div class="font-bold text-ink-900 dark:text-white">Alisher Qodirov</div>
          <div class="text-xs text-ink-500 mt-1">Super Rahbar · MAKON Management MChJ</div>
          <span class="badge badge-success text-xs mt-3">Faol</span>

          <div class="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2 text-left text-sm">
            <div class="flex items-center gap-2 text-ink-500"><Mail :size="14" /> a.qodirov@makon.uz</div>
            <div class="flex items-center gap-2 text-ink-500"><Phone :size="14" /> +998 90 123 45 67</div>
            <div class="flex items-center gap-2 text-ink-500"><Building2 :size="14" /> STIR: 300112233</div>
            <div class="flex items-center gap-2 text-ink-500"><ShieldCheck :size="14" /> ERI: 15.03.2027</div>
          </div>
        </div>

        <!-- Quick stats -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-3">Statistika</h3>
          <div class="grid grid-cols-2 gap-3">
            <div class="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div class="text-lg font-bold text-ink-900 dark:text-white">12</div>
              <div class="text-[10px] text-ink-500">Arizalar</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div class="text-lg font-bold text-ink-900 dark:text-white">8</div>
              <div class="text-[10px] text-ink-500">Shartnomalar</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div class="text-lg font-bold text-ink-900 dark:text-white">3</div>
              <div class="text-[10px] text-ink-500">Binolar</div>
            </div>
            <div class="text-center p-3 rounded-xl bg-black/5 dark:bg-white/5">
              <div class="text-lg font-bold text-ink-900 dark:text-white">156</div>
              <div class="text-[10px] text-ink-500">Kirishlar</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Settings forms -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Personal info -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Shaxsiy ma'lumotlar</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">To'liq ism</label>
              <input type="text" value="Alisher Qodirov" class="profile-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Email</label>
              <input type="email" value="a.qodirov@makon.uz" class="profile-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Telefon</label>
              <input type="tel" value="+998 90 123 45 67" class="profile-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Lavozim</label>
              <input type="text" value="Super Rahbar" disabled class="profile-input profile-input--disabled" />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button class="btn btn-primary btn-sm btn-glow"><Save :size="14" /> Saqlash</button>
          </div>
        </div>

        <!-- Password change -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Parolni o'zgartirish</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Joriy parol</label>
              <input type="password" placeholder="••••••••" class="profile-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Yangi parol</label>
              <input type="password" placeholder="••••••••" class="profile-input" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink-500 mb-1.5 block">Tasdiqlash</label>
              <input type="password" placeholder="••••••••" class="profile-input" />
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button class="btn btn-secondary btn-sm"><Key :size="14" /> Yangilash</button>
          </div>
        </div>

        <!-- Notifications settings -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Bildirishnoma sozlamalari</h3>
          <div class="space-y-3">
            <label v-for="s in notifSettings" :key="s.id" class="notif-setting">
              <div>
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ s.label }}</div>
                <div class="text-xs text-ink-500">{{ s.desc }}</div>
              </div>
              <label class="toggle">
                <input type="checkbox" v-model="s.enabled" />
                <span class="toggle__slider"></span>
              </label>
            </label>
          </div>
        </div>

        <!-- Sessions -->
        <div class="card-premium p-5">
          <h3 class="font-semibold text-ink-900 dark:text-white mb-4">Faol seanslar</h3>
          <div class="space-y-2">
            <div v-for="s in sessions" :key="s.id" class="session-row">
              <div class="session-row__icon"><component :is="s.icon" :size="16" class="text-brand-500" /></div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ s.device }}</div>
                <div class="text-xs text-ink-500">{{ s.location }} · {{ s.ip }}</div>
              </div>
              <span v-if="s.current" class="badge badge-success text-[10px]">Joriy</span>
              <button v-else class="btn btn-ghost btn-sm text-xs text-red-500">Chiqish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, Building2, ShieldCheck, Save, Key, Monitor, Smartphone, Tablet } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const notifSettings = ref([
  { id: '1', label: 'Email bildirishnomalar', desc: 'Arizalar, invoyslar va shartnomalar haqida', enabled: true },
  { id: '2', label: 'Push xabarlar', desc: 'Brauzer va mobil bildirishnomalar', enabled: true },
  { id: '3', label: 'ERI imzo eslatmalari', desc: 'Shartnoma imzolash kerak bo\'lganda', enabled: true },
  { id: '4', label: 'Qarzdorlik ogohlantirishlari', desc: 'Muddati o\'tgan invoyslar haqida', enabled: false },
  { id: '5', label: 'Servis yangilanishlari', desc: 'Work order statuslari o\'zgarsa', enabled: true },
])

const sessions = [
  { id: '1', device: 'Desktop · Chrome 126', location: 'Tashkent', ip: '85.17.12.34', current: true, icon: Monitor },
  { id: '2', device: 'iPhone 15 Pro · Safari', location: 'Tashkent', ip: '85.17.12.35', current: false, icon: Smartphone },
  { id: '3', device: 'iPad Air · Safari', location: 'Tashkent', ip: '85.17.12.36', current: false, icon: Tablet },
]
</script>

<style scoped>
.profile-input {
  width: 100%;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 14px;
  background: #ffffff;
  color: #18181b;
  outline: none;
  transition: border-color 0.15s;
}
.dark .profile-input { background: #09090b; color: #fafafa; border-color: rgba(255,255,255,0.1); }
.profile-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.profile-input--disabled { opacity: 0.5; cursor: not-allowed; }
.notif-setting {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px; border-radius: 12px;
  background: rgba(0,0,0,0.02); cursor: pointer;
}
.dark .notif-setting { background: rgba(255,255,255,0.02); }
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle__slider { position: absolute; cursor: pointer; inset: 0; background: rgba(0,0,0,0.1); border-radius: 22px; transition: 0.2s; }
.dark .toggle__slider { background: rgba(255,255,255,0.1); }
.toggle__slider::before { position: absolute; content: ''; height: 16px; width: 16px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s; }
.toggle input:checked + .toggle__slider { background: #6366f1; }
.toggle input:checked + .toggle__slider::before { transform: translateX(18px); }
.session-row { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: rgba(0,0,0,0.02); }
.dark .session-row { background: rgba(255,255,255,0.02); }
.session-row__icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
</style>
