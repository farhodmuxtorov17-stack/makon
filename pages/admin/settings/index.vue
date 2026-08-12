<template>
  <div class="space-y-5">
    <div>
      <div class="text-xs font-bold tracking-widest text-brand-500 uppercase">ADMIN / SETTINGS</div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white mt-1">Tizim sozlamalari</h1>
      <p class="text-ink-500 text-sm mt-1">Platforma konfiguratsiyasi va integratsiyalar</p>
    </div>

    <!-- 3D KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div class="kpi-strip kpi-strip--teal">
        <div class="kpi-strip__icon"><KpiScene3D type="buildings" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">{{ totalUsers }}</div>
          <div class="kpi-strip__label">Foydalanuvchilar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--emerald">
        <div class="kpi-strip__icon"><KpiScene3D type="paid" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">99.9<span class="text-sm">%</span></div>
          <div class="kpi-strip__label">Uptime</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--amber">
        <div class="kpi-strip__icon"><KpiScene3D type="overdue" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">2</div>
          <div class="kpi-strip__label">Integratsiyalar</div>
        </div>
      </div>
      <div class="kpi-strip kpi-strip--blue">
        <div class="kpi-strip__icon"><KpiScene3D type="contract" :size="38" /></div>
        <div class="kpi-strip__body">
          <div class="kpi-strip__value">v2.1</div>
          <div class="kpi-strip__label">Versiya</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- General -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2"><Settings :size="18" class="text-brand-500" /> Umumiy</h3>
        <div class="space-y-3">
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Platforma nomi</label>
            <input type="text" value="MAKON" class="settings-input" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Tashkilot nomi</label>
            <input type="text" value="MAKON Management MChJ" class="settings-input" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">STIR</label>
            <input type="text" value="300112233" disabled class="settings-input settings-input--disabled" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Til</label>
            <select class="settings-input">
              <option>O'zbekcha (Lotin)</option>
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Valyuta</label>
            <select class="settings-input">
              <option>UZS (UZS)</option>
              <option>UZS (so0027m)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ERI -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2"><ShieldCheck :size="18" class="text-purple-500" /> ERI integratsiyasi</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
            <div>
              <div class="text-sm font-medium text-emerald-500">Ulangan</div>
              <div class="text-xs text-ink-500">Provayder: UZDPI</div>
            </div>
            <CheckCircle2 :size="20" class="text-emerald-500" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">ERI provayder URL</label>
            <input type="text" value="https://eri.uz/api/v2" class="settings-input" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Sertifikat muddati</label>
            <input type="text" value="15.03.2027" disabled class="settings-input settings-input--disabled" />
          </div>
          <button class="btn btn-secondary btn-sm w-full" @click="() => {}"><RefreshCw :size="14" /> Bog'lanishni tekshirish</button>
        </div>
      </div>

      <!-- Notification channels -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2"><Bell :size="18" class="text-amber-500" /> Bildirishnoma kanallari</h3>
        <div class="space-y-3">
          <label v-for="ch in channels" :key="ch.id" class="settings-row">
            <div class="flex items-center gap-3">
              <component :is="ch.icon" :size="18" :class="ch.color" />
              <div>
                <div class="text-sm font-medium text-ink-900 dark:text-white">{{ ch.label }}</div>
                <div class="text-xs text-ink-500">{{ ch.desc }}</div>
              </div>
            </div>
            <label class="toggle">
              <input type="checkbox" v-model="ch.enabled" />
              <span class="toggle__slider"></span>
            </label>
          </label>
        </div>
      </div>

      <!-- Security -->
      <div class="card-premium p-5">
        <h3 class="font-semibold text-ink-900 dark:text-white mb-4 flex items-center gap-2"><Lock :size="18" class="text-red-500" /> Xavfsizlik</h3>
        <div class="space-y-3">
          <label class="settings-row">
            <div>
              <div class="text-sm font-medium text-ink-900 dark:text-white">2FA majburiy</div>
              <div class="text-xs text-ink-500">Ikki faktorli autentifikatsiya</div>
            </div>
            <label class="toggle"><input type="checkbox" checked /><span class="toggle__slider"></span></label>
          </label>
          <label class="settings-row">
            <div>
              <div class="text-sm font-medium text-ink-900 dark:text-white">IP cheklovlari</div>
              <div class="text-xs text-ink-500">Faqat ruxsat etilgan IP dan kirish</div>
            </div>
            <label class="toggle"><input type="checkbox" /><span class="toggle__slider"></span></label>
          </label>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Sessiya muddati (daqiqa)</label>
            <input type="number" value="60" class="settings-input" />
          </div>
          <div>
            <label class="text-xs font-medium text-ink-500 mb-1.5 block">Parol murakkabligi</label>
            <select class="settings-input">
              <option>O'rtacha (8+ belgi)</option>
              <option>Kuchli (12+ belgi, raqam, belgi)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <button class="btn btn-primary btn-md" @click="() => {}"><Save :size="16" /> Sozlamalarni saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Settings, ShieldCheck, Bell, Lock, CheckCircle2, RefreshCw, Save, Mail, MessageSquare, Smartphone, Send } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const channels = ref([
  { id: '1', label: 'Email', desc: 'SMTP orqali xatlar', icon: Mail, color: 'text-blue-500', enabled: true },
  { id: '2', label: 'SMS', desc: 'SMS provayder orqali', icon: Smartphone, color: 'text-emerald-500', enabled: true },
  { id: '3', label: 'Push', desc: 'Brauzer va mobil push', icon: Send, color: 'text-purple-500', enabled: true },
  { id: '4', label: 'Telegram', desc: 'Telegram bot orqali', icon: MessageSquare, color: 'text-blue-500', enabled: false },
])
const totalUsers = computed(() => 24)

</script>

<style scoped>
.settings-input {
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
.dark .settings-input { background: #09090b; color: #fafafa; border-color: rgba(255,255,255,0.1); }
.settings-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.settings-input--disabled { opacity: 0.5; cursor: not-allowed; }
.settings-row { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 12px; background: rgba(0,0,0,0.02); cursor: pointer; }
.dark .settings-row { background: rgba(255,255,255,0.02); }
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle__slider { position: absolute; cursor: pointer; inset: 0; background: rgba(0,0,0,0.1); border-radius: 22px; transition: 0.2s; }
.dark .toggle__slider { background: rgba(255,255,255,0.1); }
.toggle__slider::before { position: absolute; content: ''; height: 16px; width: 16px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s; }
.toggle input:checked + .toggle__slider { background: var(--accent); }
.toggle input:checked + .toggle__slider::before { transform: translateX(18px); }
</style>

<style scoped>
.kpi-strip {
  display: flex; align-items: center; gap: 14px;
  padding: 16px 18px;
  border-radius: 16px;
  background: var(--card-bg, rgba(255,255,255,0.9));
  border: 1px solid rgba(0,0,0,0.06);
  position: relative; overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}
.kpi-strip:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.kpi-strip::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
.kpi-strip--emerald::before { background: #10b981; }
.kpi-strip--teal::before { background: var(--accent, #2563EB); }
.kpi-strip--amber::before { background: #f59e0b; }
.kpi-strip--blue::before { background: #3b82f6; }
.kpi-strip--emerald .kpi-strip__icon { background: rgba(16,185,129,0.1); }
.kpi-strip--teal .kpi-strip__icon { background: rgba(37,99,235,0.1); }
.kpi-strip--amber .kpi-strip__icon { background: rgba(245,158,11,0.1); }
.kpi-strip--blue .kpi-strip__icon { background: rgba(59,130,246,0.1); }
.kpi-strip__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.kpi-strip__body { flex: 1; min-width: 0; }
.kpi-strip__value { font-size: 22px; font-weight: 800; line-height: 1; color: var(--text, #1a1a2e); }
.kpi-strip__label { font-size: 11px; color: var(--text-muted, #71717a); margin-top: 4px; }
</style>