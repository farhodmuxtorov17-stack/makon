
<template>
  <div class="space-y-6">
    <PageHeader title="Hisob davrlari" subtitle="Oylik invoys generatsiyasi va davrni yopish">
      <template #actions>
        <button class="btn btn-primary btn-sm" :disabled="!hasOpenPeriod" @click="showGenerate = true">
          <Sparkles :size="16" /> Generatsiya
        </button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="bp in financeStore.billingPeriods" :key="bp.id" class="card p-6">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-semibold text-lg text-ink-900">{{ monthName(bp.month) }} {{ bp.year }}</h3>
            <p class="text-sm text-ink-400 mt-0.5">{{ bp.invoiceCount }} invoys · {{ formatPrice(bp.totalAmount) }} so'm</p>
          </div>
          <StatusBadge :status="bp.status" :variant="bp.status === 'OPEN' ? 'info' : 'neutral'"
            :label="bp.status === 'OPEN' ? 'Ochiq' : 'Yopilgan'" dot />
        </div>
        <div class="grid grid-cols-3 gap-3 text-sm">
          <div>
            <p class="text-ink-400 text-xs">Generatsiya</p>
            <p class="font-medium text-ink-700">{{ formatDate(bp.generatedAt) }}</p>
          </div>
          <div>
            <p class="text-ink-400 text-xs">Yaratildi</p>
            <p class="font-medium text-ink-700">{{ formatDate(bp.createdAt) }}</p>
          </div>
          <div>
            <p class="text-ink-400 text-xs">Yopildi</p>
            <p class="font-medium text-ink-700">{{ bp.closedAt ? formatDate(bp.closedAt) : '—' }}</p>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-ink-100">
          <button v-if="bp.status === 'OPEN'" class="btn btn-outline btn-sm w-full" @click="showCloseConfirm = true; closePeriodId = bp.id">
            <Lock :size="16" /> Davrni yopish
          </button>
          <button v-else class="btn btn-ghost btn-sm w-full">
            <Eye :size="16" /> Invoyslarni ko'rish
          </button>
        </div>
      </div>
    </div>

    <BaseModal v-model="showGenerate" title="Invoys generatsiyasi">
      <div class="space-y-4">
        <div class="rounded-xl bg-brand-50 border border-brand-100 p-4 text-sm">
          <p class="text-brand-700 font-medium">Joriy ochiq davr uchun barcha aktiv shartnomalar bo'yicha invoyslar avtomatik yaratiladi.</p>
        </div>
        <div>
          <label class="label">Davr</label>
          <select class="input"><option>Iyul 2026</option></select>
        </div>
      </div>
      <template #footer>
        <button class="btn btn-ghost btn-lg" @click="showGenerate = false">Bekor</button>
        <button class="btn btn-primary btn-lg" @click="doGenerate">Generatsiya qilish</button>
      </template>
    </BaseModal>

    <BaseConfirm v-model="showCloseConfirm" title="Davrni yopishni tasdiqlang"
      message="Yopilgan davrni qayta ochish mumkin emas. Barcha invoyslar yakuniy holatga o'tadi."
      confirmText="Yopish" :danger="true" @confirm="closePeriod" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth" })
import { Sparkles, Lock, Eye } from 'lucide-vue-next'

const financeStore = useFinanceStore()
const toast = useToast()
onMounted(() => financeStore.initMockData())

const showGenerate = ref(false)
const showCloseConfirm = ref(false)
const closePeriodId = ref('')

const hasOpenPeriod = computed(() => financeStore.billingPeriods.some(bp => bp.status === 'OPEN'))
const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
function monthName(m: number) { return months[m - 1] || '' }
function formatDate(d: string) { return d ? d.split('T')[0] : '—' }
function formatPrice(v: number) { return v >= 1000000 ? (v / 1000000).toFixed(1) + ' mln' : v.toLocaleString('ru') }

function doGenerate() {
  showGenerate.value = false
  toast.success('Generatsiya boshlandi', 'Invoyslar avtomatik yaratilmoqda')
}

function closePeriod() {
  showCloseConfirm.value = false
  toast.success('Davr yopildi', 'Barcha invoyslar yakuniy holatga o\'tdi')
}
</script>
