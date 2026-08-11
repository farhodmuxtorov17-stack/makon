<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Tizim sozlamalari</h1>
      <p class="text-ink-500 text-sm mt-1">Platforma konfiguratsiyasi va integratsiyalar</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- General -->
      <div class="card p-5">
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
              <option>UZS (so'm)</option>
              <option>UZS (so0027m)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ERI -->
      <div class="card p-5">
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
          <button class="btn btn-secondary btn-sm w-full"><RefreshCw :size="14" /> Bog'lanishni tekshirish</button>
        </div>
      </div>

      <!-- Notification channels -->
      <div class="card p-5">
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
      <div class="card p-5">
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
      <button class="btn btn-primary btn-md"><Save :size="16" /> Sozlamalarni saqlash</button>
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
.settings-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
.settings-input--disabled { opacity: 0.5; cursor: not-allowed; }
.settings-row { display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 12px; background: rgba(0,0,0,0.02); cursor: pointer; }
.dark .settings-row { background: rgba(255,255,255,0.02); }
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle__slider { position: absolute; cursor: pointer; inset: 0; background: rgba(0,0,0,0.1); border-radius: 22px; transition: 0.2s; }
.dark .toggle__slider { background: rgba(255,255,255,0.1); }
.toggle__slider::before { position: absolute; content: ''; height: 16px; width: 16px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.2s; }
.toggle input:checked + .toggle__slider { background: #6366f1; }
.toggle input:checked + .toggle__slider::before { transform: translateX(18px); }
</style>
