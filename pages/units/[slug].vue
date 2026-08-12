<template>
  <div class="space-y-6">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-ink-500">
      <NuxtLink to="/catalog" class="hover:text-brand-500">Katalog</NuxtLink>
      <ChevronRight :size="14" />
      <NuxtLink :to="`/buildings/${building.slug}`" class="hover:text-brand-500">{{ building.name }}</NuxtLink>
      <ChevronRight :size="14" />
      <span class="text-ink-900 dark:text-white">{{ unit.name }}</span>
    </div>

    <!-- Unit header -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Photos -->
      <div class="lg:col-span-2 space-y-4">
        <div class="card-premium overflow-hidden">
          <div class="h-80 relative flex items-center justify-center" style="background: radial-gradient(ellipse at center, rgba(37,99,235,0.06), transparent 70%);">
            <svg viewBox="0 0 400 200" class="w-full h-full p-8">
              <polygon :points="unit.planPoints" fill="rgba(37,99,235,0.08)" stroke="var(--accent)" stroke-width="2" />
              <text :x="200" :y="100" text-anchor="middle" class="text-lg fill-current text-brand-500 font-bold">{{ unit.name }}</text>
              <text :x="200" :y="120" text-anchor="middle" class="text-xs fill-current text-ink-500">{{ unit.area }} m²</text>
            </svg>
          </div>
        </div>

        <!-- Features -->
        <div class="card-premium p-6">
          <h3 class="font-semibold dark:text-white mb-4">Unit xususiyatlari</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div v-for="f in unit.features" :key="f.label" class="flex items-center gap-2">
              <component :is="f.icon" :size="16" class="text-brand-500" />
              <div>
                <div class="text-xs text-ink-500">{{ f.label }}</div>
                <div class="text-sm font-medium">{{ f.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: price & actions -->
      <div class="space-y-4">
        <div class="card-premium p-6 sticky top-20 glow-brand" style="background: linear-gradient(135deg, rgba(37,99,235,0.04), rgba(255,255,255,1));">
          <div class="mb-4">
            <div class="text-3xl font-extrabold text-brand-600">{{ formatUZS(unit.price) }}</div>
            <div class="text-sm text-ink-500">{{ unit.pricePerM2 }} so'm/m² oyiga</div>
          </div>

          <div class="space-y-3 mb-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Taklif turi</span>
              <span class="badge badge-brand">{{ unit.offerType === 'RENT' ? 'Ijara' : 'Sotuv' }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Bino</span>
              <span class="font-medium">{{ building.name }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Qavat</span>
              <span class="font-medium">{{ unit.floor }}-qavat</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ink-500">Maydon</span>
              <span class="font-medium">{{ unit.area }} m²</span>
            </div>
          </div>

          <!-- Action buttons -->
          <div v-if="!showApplyForm" class="space-y-2">
            <button @click="openApplyForm" class="btn btn-primary w-full btn-glow">
              <FileText :size="16" /> {{ unit.offerType === 'RENT' ? 'Ijaraga olish' : 'Sotib olish' }}
            </button>
            <button @click="viewDetails" class="btn btn-secondary w-full">
              <Eye :size="16" /> Batafsil ko'rish
            </button>
          </div>

          <!-- Inline application form (slides in when button clicked) -->
          <Transition name="apply-slide">
            <div v-if="showApplyForm" class="apply-form">
              <div class="apply-form__header">
                <h3 class="apply-form__title">Ariza yuborish</h3>
                <button @click="showApplyForm = false" class="apply-form__close">
                  <X :size="16" />
                </button>
              </div>

              <form @submit.prevent="submitApplication" class="space-y-3">
                <div class="apply-field">
                  <label class="apply-field__label">Ism familiya yoki firma nomi</label>
                  <input v-model="applyForm.name" type="text" placeholder="Akmal Karimov / MChJ «...»" class="apply-field__input" required />
                </div>

                <div class="apply-field">
                  <label class="apply-field__label">Telefon raqami</label>
                  <div class="apply-field__phone-wrap">
                    <span class="apply-field__prefix">+998</span>
                    <input v-model="applyForm.phone" type="tel" placeholder="90 123 45 67" class="apply-field__input apply-field__input--phone" maxlength="9" @input="formatApplyPhone" required />
                  </div>
                </div>

                <div class="apply-field">
                  <label class="apply-field__label">Email (ixtiyoriy)</label>
                  <input v-model="applyForm.email" type="email" placeholder="info@makon.uz" class="apply-field__input" />
                </div>

                <div class="apply-field">
                  <label class="apply-field__label">Izoh (ixtiyoriy)</label>
                  <textarea v-model="applyForm.notes" placeholder="Qo'shimcha ma'lumot..." class="apply-field__input apply-field__input--textarea" rows="2"></textarea>
                </div>

                <button type="submit" class="apply-submit" :disabled="!canSubmitApply || submitting">
                  <span v-if="!submitting">Arizani yuborish</span>
                  <span v-else>Yuborilmoqda...</span>
                  <Send v-if="!submitting" :size="15" />
                </button>

                <p v-if="applySubmitted" class="apply-success">
                  <CheckCircle :size="15" />
                  Arizangiz qabul qilindi! Operator siz bilan tez orada bog'lanadi.
                </p>
              </form>
            </div>
          </Transition>

          <div v-if="!showApplyForm" class="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
            <div class="text-xs text-ink-500 mb-2">Bu unit bilan bog'liq</div>
            <NuxtLink :to="`/buildings/${building.slug}`" class="block text-sm text-brand-500 hover:underline mb-1">Bino sahifasi</NuxtLink>
            <NuxtLink to="/catalog" class="block text-sm text-brand-500 hover:underline">Katalogga qaytish</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Eye, FileText, Maximize, Building2, Layers, Wind, Wifi, Car, Coffee, X, Send, CheckCircle } from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const { formatUZS, formatUZSShort, formatUZSCompact, formatPerM2, formatNumber, formatDate, timeAgo } = useFormat()

const route = useRoute()

const building = { slug: 'tashkent-city', name: 'Tashkent City' }
const unit = {
  name: 'A-301',
  area: 85,
  floor: 3,
  price: 25000000,
  pricePerM2: 294118,
  offerType: 'RENT',
  planPoints: '50,30 350,30 350,170 150,170 150,100 50,100',
  features: [
    { label: 'Maydon', value: '85 m²', icon: Maximize },
    { label: 'Qavat', value: '3', icon: Layers },
    { label: 'Konditsioner', value: 'Bor', icon: Wind },
    { label: 'Internet', value: 'Fiber', icon: Wifi },
    { label: 'Parkovka', value: '2 joy', icon: Car },
    { label: 'Panjara', value: 'Bor', icon: Coffee },
  ]
}

// Inline application form
const showApplyForm = ref(false)
const submitting = ref(false)
const applySubmitted = ref(false)
const applyForm = reactive({
  name: '',
  phone: '',
  email: '',
  notes: '',
})

const canSubmitApply = computed(() => {
  return applyForm.name.length >= 3 && applyForm.phone.length >= 9
})

function formatApplyPhone() {
  applyForm.phone = applyForm.phone.replace(/\D/g, '').slice(0, 9)
}

function openApplyForm() {
  showApplyForm.value = true
  applySubmitted.value = false
}

function viewDetails() {
  alert('Unit to\'liq tafsilotlari: ' + unit.name)
}

async function submitApplication() {
  if (!canSubmitApply.value) return
  submitting.value = true
  await new Promise(r => setTimeout(r, 800))
  submitting.value = false
  applySubmitted.value = true
  // Reset form after showing success
  setTimeout(() => {
    showApplyForm.value = false
    applyForm.name = ''
    applyForm.phone = ''
    applyForm.email = ''
    applyForm.notes = ''
    applySubmitted.value = false
  }, 3000)
}
</script>

<style scoped>
/* Inline application form */
.apply-form {
  margin-top: 4px;
  padding: 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(37,99,235,0.03), rgba(255,255,255,0.6));
  border: 1.5px solid rgba(37,99,235,0.15);
}
.dark .apply-form { background: linear-gradient(135deg, rgba(37,99,235,0.06), rgba(255,255,255,0.02)); border-color: rgba(59,130,246,0.2); }

.apply-form__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.apply-form__title { font-size: 15px; font-weight: 700; color: #18181b; }
.dark .apply-form__title { color: white; }
.apply-form__close { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; border: none; background: rgba(0,0,0,0.04); cursor: pointer; color: #71717a; transition: all 0.2s; }
.dark .apply-form__close { background: rgba(255,255,255,0.06); }
.apply-form__close:hover { background: rgba(0,0,0,0.08); color: #52525b; }

.apply-field { margin-bottom: 10px; }
.apply-field__label { display: block; font-size: 11px; font-weight: 600; color: #52525b; margin-bottom: 4px; }
.dark .apply-field__label { color: #a1a1aa; }
.apply-field__input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1.5px solid rgba(0,0,0,0.08); background: rgba(255,255,255,0.8); font-size: 13px; color: #18181b; transition: all 0.2s; outline: none; }
.dark .apply-field__input { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); color: white; }
.apply-field__input:focus { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
.dark .apply-field__input:focus { background: rgba(255,255,255,0.06); }
.apply-field__input--textarea { resize: none; }
.apply-field__phone-wrap { display: flex; align-items: center; position: relative; }
.apply-field__prefix { position: absolute; left: 12px; font-size: 13px; color: #71717a; font-weight: 600; pointer-events: none; }
.apply-field__input--phone { padding-left: 48px; }

.apply-submit { width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 11px; border-radius: 10px; border: none; background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%); color: white; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.25s; box-shadow: 0 3px 12px rgba(0,102,255,0.2); }
.apply-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,102,255,0.3); }
.apply-submit:disabled { opacity: 0.5; cursor: not-allowed; }

.apply-success { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #10b981; font-weight: 500; margin-top: 8px; }

/* Slide transition */
.apply-slide-enter-active, .apply-slide-leave-active { transition: all 0.35s cubic-bezier(0.4,0,0.2,1); overflow: hidden; }
.apply-slide-enter-from, .apply-slide-leave-to { opacity: 0; max-height: 0; margin-top: 0; padding: 0; }
.apply-slide-enter-to, .apply-slide-leave-from { opacity: 1; max-height: 500px; }
</style>
