<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Sozlamalar</h1>
      <p class="text-ink-500 text-sm mt-1">Tizim konfiguratsiyasi va parametrlar</p>
    </div>

    <!-- Tabs -->
    <div class="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-white/5 w-fit overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
        class="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-all"
        :class="activeTab === tab.value ? 'bg-brand-500/10 text-brand-500' : 'text-ink-500'">
        {{ tab.label }}
      </button>
    </div>

    <!-- General settings -->
    <div v-if="activeTab === 'general'" class="card p-6 max-w-2xl space-y-5">
      <div>
        <label class="label">Tashkilot nomi</label>
        <input type="text" v-model="settings.orgName" class="input" />
      </div>
      <div>
        <label class="label">Email</label>
        <input type="email" v-model="settings.email" class="input" />
      </div>
      <div>
        <label class="label">Telefon</label>
        <input type="text" v-model="settings.phone" class="input" />
      </div>
      <div>
        <label class="label">Valyuta</label>
        <select v-model="settings.currency" class="input">
          <option value="UZS">UZS (so'm)</option>
          <option value="USD">USD (dollar)</option>
        </select>
      </div>
      <div>
        <label class="label">Til</label>
        <select v-model="settings.lang" class="input">
          <option value="uz">O'zbekcha</option>
          <option value="ru">Русский</option>
        </select>
      </div>
      <div>
        <label class="label">Vaqt zonasi</label>
        <select v-model="settings.timezone" class="input">
          <option value="Asia/Tashkent">Asia/Tashkent (GMT+5)</option>
        </select>
      </div>
      <button class="btn btn-primary">Saqlash</button>
    </div>

    <!-- SLA settings -->
    <div v-if="activeTab === 'sla'" class="card p-6 max-w-2xl space-y-4">
      <div v-for="sla in slas" :key="sla.priority" class="flex items-center justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5">
        <div>
          <div class="font-medium text-ink-900 dark:text-white">{{ sla.label }}</div>
          <div class="text-xs text-ink-500">{{ sla.desc }}</div>
        </div>
        <div class="flex items-center gap-2">
          <input type="number" v-model="sla.hours" class="input w-20 text-center" />
          <span class="text-sm text-ink-500">soat</span>
        </div>
      </div>
      <button class="btn btn-primary">Saqlash</button>
    </div>

    <!-- ERI settings -->
    <div v-if="activeTab === 'eri'" class="card p-6 max-w-2xl space-y-5">
      <div class="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
        <div class="flex items-center gap-3">
          <ShieldCheck :size="20" class="text-emerald-500" />
          <div>
            <div class="font-medium text-ink-900 dark:text-white">ERI integratsiyasi faol</div>
            <div class="text-xs text-ink-500">Elektron raqamli imzo tizimi ulangan</div>
          </div>
        </div>
        <span class="badge badge-success">Faol</span>
      </div>
      <div>
        <label class="label">ERI endpoint URL</label>
        <input type="text" v-model="eri.endpoint" class="input font-mono text-xs" />
      </div>
      <div>
        <label class="label">API kalit</label>
        <input type="password" v-model="eri.apiKey" class="input font-mono text-xs" />
      </div>
      <div>
        <label class="label">Imzo formati</label>
        <select v-model="eri.format" class="input">
          <option value="PKCS7">PKCS#7</option>
          <option value="CMS">CMS</option>
        </select>
      </div>
      <button class="btn btn-primary">Saqlash</button>
    </div>

    <!-- Notifications settings -->
    <div v-if="activeTab === 'notifications'" class="card p-6 max-w-2xl space-y-4">
      <div v-for="n in notifSettings" :key="n.key" class="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5 last:border-0">
        <div>
          <div class="font-medium text-sm text-ink-900 dark:text-white">{{ n.label }}</div>
          <div class="text-xs text-ink-500">{{ n.desc }}</div>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="n.enabled" class="sr-only peer">
          <div class="w-11 h-6 bg-black/10 dark:bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
        </label>
      </div>
    </div>

    <!-- Appearance settings -->
    <div v-if="activeTab === 'appearance'" class="card p-6 max-w-2xl space-y-5">
      <div>
        <label class="label">Standart mavzu</label>
        <div class="grid grid-cols-2 gap-3">
          <button @click="setDefaultTheme('light')" class="p-4 rounded-xl border-2 transition-all" :class="defaultTheme === 'light' ? 'border-brand-500 bg-brand-500/5' : 'border-black/10 dark:border-white/10'">
            <Sun :size="24" class="text-amber-500 mb-2 mx-auto" />
            <div class="text-sm font-medium text-ink-900 dark:text-white">Yorug'</div>
          </button>
          <button @click="setDefaultTheme('dark')" class="p-4 rounded-xl border-2 transition-all" :class="defaultTheme === 'dark' ? 'border-brand-500 bg-brand-500/5' : 'border-black/10 dark:border-white/10'">
            <Moon :size="24" class="text-ink-500 mb-2 mx-auto" />
            <div class="text-sm font-medium text-ink-900 dark:text-white">Qorong'i</div>
          </button>
        </div>
      </div>
      <div>
        <label class="label">Brand rangi</label>
        <div class="flex gap-3">
          <button v-for="c in brandColors" :key="c" @click="selectedColor = c" class="w-10 h-10 rounded-xl transition-all" :style="{ background: c }" :class="selectedColor === c ? 'ring-2 ring-offset-2 ring-brand-500' : ''"></button>
        </div>
      </div>
      <button class="btn btn-primary">Saqlash</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, Sun, Moon } from 'lucide-vue-next'
import { useColorMode } from '#imports'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const colorMode = useColorMode()

const activeTab = ref('general')
const tabs = [
  { value: 'general', label: 'Umumiy' },
  { value: 'sla', label: 'SLA' },
  { value: 'eri', label: 'ERI' },
  { value: 'notifications', label: 'Bildirishnomalar' },
  { value: 'appearance', label: 'Mavzu' },
]

const settings = reactive({
  orgName: 'MAKON Real Estate',
  email: 'info@makon.uz',
  phone: '+998 71 200 00 00',
  currency: 'UZS',
  lang: 'uz',
  timezone: 'Asia/Tashkent',
})

const slas = reactive([
  { priority: 'URGENT', label: 'Shoshilinch', desc: 'Maksimal javob vaqti', hours: 1 },
  { priority: 'HIGH', label: 'Yuqori', desc: 'Maksimal javob vaqti', hours: 4 },
  { priority: 'MEDIUM', label: 'O\'rta', desc: 'Maksimal javob vaqti', hours: 24 },
  { priority: 'LOW', label: 'Past', desc: 'Maksimal javob vaqti', hours: 72 },
])

const eri = reactive({
  endpoint: 'https://eri.gov.uz/api/v2',
  apiKey: '••••••••••••••••',
  format: 'PKCS7',
})

const notifSettings = reactive([
  { key: 'email', label: 'Email bildirishnomalar', desc: 'Muhim voqealar uchun email yuborish', enabled: true },
  { key: 'push', label: 'Push bildirishnomalar', desc: 'Brauzer push xabarlari', enabled: true },
  { key: 'app_status', label: 'Ariza statusi', desc: 'Ariza statusi ozgarganda xabar berish', enabled: true },
  { key: 'invoice', label: 'Invoys eslatma', desc: 'To\'lov muddati yaqinlashganda eslatma', enabled: true },
  { key: 'sla', label: 'SLA ogohlantirish', desc: 'SLA buzilishidan oldin ogohlantirish', enabled: false },
])

const defaultTheme = ref(colorMode.preference)
const brandColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
const selectedColor = ref('#6366f1')

function setDefaultTheme(t: string) {
  defaultTheme.value = t
  colorMode.preference = t
}
</script>
