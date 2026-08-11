<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <div class="flex items-center gap-3">
      <NuxtLink to="/catalog" class="btn btn-ghost btn-sm"><ArrowLeft :size="16" /> Katalogga</NuxtLink>
    </div>

    <div>
      <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Ijara / sotib olish arizasi</h1>
      <p class="text-ink-500 text-sm mt-1">Tanlangan unit bo\'yicha ariza yuborish</p>
    </div>

    <!-- Pre-filled listing info -->
    <div class="card p-5">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-xl bg-brand-500/10 flex items-center justify-center">
          <Building2 :size="24" class="text-brand-500" />
        </div>
        <div class="flex-1">
          <div class="font-medium">{{ listing.unit }}</div>
          <div class="text-sm text-ink-500">{{ listing.building }} · {{ listing.area }} m² · {{ listing.floor }}-qavat</div>
        </div>
        <div class="text-right">
          <div class="font-medium">{{ formatUZS(listing.price) }}</div>
          <span class="badge badge-brand text-xs">{{ listing.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
        </div>
      </div>
    </div>

    <!-- Form steps -->
    <div class="flex items-center gap-2 mb-4">
      <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2 flex-1">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all"
          :class="currentStep >= i ? 'bg-brand-500 text-white' : 'bg-black/5 dark:bg-white/5 text-ink-500'">
          {{ i + 1 }}
        </div>
        <span class="text-xs hidden md:block" :class="currentStep >= i ? 'text-ink-900 dark:text-white' : 'text-ink-500'">{{ step }}</span>
        <div v-if="i < steps.length - 1" class="flex-1 h-px mx-1" :class="currentStep > i ? 'bg-brand-500' : 'bg-black/10 dark:bg-white/10'"></div>
      </div>
    </div>

    <!-- Step 1: Application type -->
    <div v-if="currentStep === 0" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Ariza turi va tijoriy parametrlar</h3>
      <div class="grid grid-cols-2 gap-3">
        <button @click="form.type = 'RENT'" class="p-4 rounded-xl border-2 transition-all text-left" :class="form.type === 'RENT' ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 dark:border-white/5'">
          <Building2 :size="20" class="mb-2" :class="form.type === 'RENT' ? 'text-brand-500' : 'text-ink-500'" />
          <div class="font-medium text-sm">Ijara</div>
          <div class="text-xs text-ink-500">Doimiy oylik to\'lov</div>
        </button>
        <button @click="form.type = 'SALE'" class="p-4 rounded-xl border-2 transition-all text-left" :class="form.type === 'SALE' ? 'border-brand-500 bg-brand-500/5' : 'border-black/5 dark:border-white/5'">
          <ShoppingBag :size="20" class="mb-2" :class="form.type === 'SALE' ? 'text-brand-500' : 'text-ink-500'" />
          <div class="font-medium text-sm">Sotib olish</div>
          <div class="text-xs text-ink-500">To\'liq mulk huquqi</div>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">Taklif qilingan narx</label>
          <input v-model="form.offeredPrice" type="number" class="input" placeholder="so\'m" />
        </div>
        <div>
          <label class="label">Boshlash sanasi</label>
          <input v-model="form.startDate" type="date" class="input" />
        </div>
        <div v-if="form.type === 'RENT'">
          <label class="label">Muddat (oy)</label>
          <input v-model="form.duration" type="number" class="input" placeholder="12" />
        </div>
      </div>
      <button @click="currentStep++" class="btn btn-primary w-full">Davom etish</button>
    </div>

    <!-- Step 2: Organization info -->
    <div v-if="currentStep === 1" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Tashkilot ma\'lumotlari (profile dan olindi)</h3>
      <div class="grid grid-cols-2 gap-4">
        <div><label class="label">Tashkilot nomi</label><input type="text" class="input" value="ABC Logistics MChJ" disabled /></div>
        <div><label class="label">STIR</label><input type="text" class="input" value="308745612" disabled /></div>
        <div><label class="label">Vakil</label><input type="text" class="input" value="Dilshod Ahmedov" disabled /></div>
        <div><label class="label">Email</label><input type="email" class="input" value="info@abclogistics.uz" disabled /></div>
        <div><label class="label">Telefon</label><input type="text" class="input" value="+998 71 200 80 90" /></div>
      </div>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" class="btn btn-primary flex-1">Davom etish</button>
      </div>
    </div>

    <!-- Step 3: Documents -->
    <div v-if="currentStep === 2" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">Hujjatlar yuklash</h3>
      <div class="border-2 border-dashed border-black/10 dark:border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-brand-500/30 transition-all">
        <Upload :size="24" class="text-ink-500 mx-auto mb-2" />
        <div class="text-sm text-ink-500">Hujjatlarni yuklang (pasport, guvohnoma, hujjatlar)</div>
        <div class="text-xs text-ink-500 mt-1">PDF, JPG, PNG · maks 10 MB</div>
      </div>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="currentStep++" class="btn btn-primary flex-1">Davom etish</button>
      </div>
    </div>

    <!-- Step 4: ERI confirm -->
    <div v-if="currentStep === 3" class="card p-6 space-y-4">
      <h3 class="font-semibold dark:text-white">ERI orqali tasdiqlash</h3>
      <div class="p-4 rounded-xl bg-brand-500/5 border border-brand-500/10 flex items-start gap-3">
        <FileSignature :size="20" class="text-brand-500 flex-shrink-0" />
        <div class="text-sm text-ink-500">
          Ariza yuborish uchun ERI orqali tasdiqlash talab qilinadi.
          Sertifikatingizni tanlang va imzolashni tasdiqlang.
        </div>
      </div>
      <button class="btn btn-primary w-full"><FileSignature :size="16" /> ERI sertifikatini tanlash</button>
      <div class="flex gap-3">
        <button @click="currentStep--" class="btn btn-secondary">Orqaga</button>
        <button @click="submit" class="btn btn-success flex-1" :disabled="submitting">
          {{ submitting ? 'Yuborilmoqda...' : 'Arizani yuborish' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Building2, ShoppingBag, Upload, FileSignature } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const currentStep = ref(0)
const submitting = ref(false)
const steps = ['Ariza turi', 'Tashkilot', 'Hujjatlar', 'ERI tasdiq']

const form = reactive({
  type: 'RENT',
  offeredPrice: '',
  startDate: '',
  duration: '',
})

const listing = {
  unit: 'A-301', building: 'Tashkent City', area: 85, floor: 3, price: 25000000, offerType: 'RENT'
}

function submit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    navigateTo('/cabinet/applications')
  }, 1500)
}


</script>
