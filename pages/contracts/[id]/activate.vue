<template>
  <div v-if="contract" class="max-w-2xl mx-auto space-y-6 py-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <NuxtLink :to="`/contracts/${contract.id}`" class="btn btn-ghost btn-sm p-2">
        <ArrowLeft :size="18" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Shartnomani Aktivlashtirish</h1>
        <p class="text-xs text-ink-500">Shartnoma: <b class="font-mono text-brand-500">{{ contract.number }}</b></p>
      </div>
    </div>

    <!-- Activation Readiness Checklist Card -->
    <div class="card p-6 space-y-5">
      <h3 class="font-bold text-base text-ink-900 dark:text-white pb-3 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
        <ShieldCheck :size="18" class="text-brand-500" /> Aktivlashtirish Shartlari Tekshiruvi
      </h3>

      <div class="space-y-3 text-xs">
        <!-- Check 1: Tenant ERI -->
        <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <div class="flex items-center gap-2.5">
            <CheckCircle :size="18" class="text-emerald-500" />
            <div>
              <div class="font-bold text-ink-900 dark:text-white">Ijarachi ERI Imzosi</div>
              <div class="text-[10px] text-ink-500">{{ contract.tenantName }} (STIR: {{ contract.tenantTin }})</div>
            </div>
          </div>
          <span class="badge badge-success text-[10px]">TASDIQLANGAN</span>
        </div>

        <!-- Check 2: Landlord ERI -->
        <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <div class="flex items-center gap-2.5">
            <CheckCircle :size="18" class="text-emerald-500" />
            <div>
              <div class="font-bold text-ink-900 dark:text-white">Bino Egasi ERI Imzosi</div>
              <div class="text-[10px] text-ink-500">MAKON Management MChJ</div>
            </div>
          </div>
          <span class="badge badge-success text-[10px]">TASDIQLANGAN</span>
        </div>

        <!-- Check 3: SHA-256 Hash -->
        <div class="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
          <div class="flex items-center gap-2.5">
            <ShieldCheck :size="18" class="text-purple-400" />
            <div>
              <div class="font-bold text-ink-900 dark:text-white">Hujjat Butunligi (SHA-256)</div>
              <div class="text-[10px] font-mono text-ink-500 truncate max-w-xs">{{ contract.sha256Hash }}</div>
            </div>
          </div>
          <span class="badge badge-success text-[10px]">OK</span>
        </div>
      </div>

      <!-- Automated Consequences Preview Box -->
      <div class="p-4 rounded-xl bg-brand-500/10 border border-brand-500/30 space-y-2 text-xs">
        <div class="font-bold text-brand-400 flex items-center gap-1.5">
          <Zap :size="14" /> Aktivlashtirish natijasida avtomatik bajariladigan amallar:
        </div>
        <ul class="list-disc pl-4 space-y-1 text-ink-700 dark:text-ink-300 text-[11px]">
          <li>Unit statusi <b>OCCUPIED (Band)</b> ga o'zgartiriladi.</li>
          <li>Ushbu unitga bog'langan ommaviy listing <b>Yashiriladi (Pause/Hidden)</b>.</li>
          <li>Ijarachi uchun <b>Shaxsiy Kabinet</b> va kirish hisobi yaratiladi.</li>
          <li>Moliya tizimida oylik ijara va depozit billing grafigi ishga tushadi.</li>
        </ul>
      </div>

      <!-- Activate Action Button -->
      <div class="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-end gap-3">
        <NuxtLink :to="`/contracts/${contract.id}`" class="btn btn-secondary">
          Bekor qilish
        </NuxtLink>
        <button @click="showConfirmModal = true" class="btn btn-primary flex items-center gap-2">
          <Zap :size="16" /> Shartnomani Aktivlashtirish
        </button>
      </div>
    </div>

    <!-- Success Confirmation Modal -->
    <Teleport to="body">
      <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="showConfirmModal = false"></div>
        <div class="relative w-full max-w-md bg-white dark:bg-ink-900 rounded-2xl border border-black/10 dark:border-white/10 p-6 z-10 space-y-4 text-center">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle :size="36" />
          </div>

          <h3 class="text-xl font-bold text-ink-900 dark:text-white">Shartnoma Muvaffaqiyatli Aktivlashtirildi!</h3>

          <p class="text-xs text-ink-500 leading-relaxed">
            Unit statusi <b>OCCUPIED</b> holatiga o'tkazildi. Ijarachi shaxsiy kabineti faollashtirildi.
          </p>

          <div class="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-3">
            <button @click="executeActivation" class="btn btn-primary w-full">
              Shartnomaga Qaytish
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ShieldCheck, CheckCircle, Zap } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const makonStore = useMakonStore()

const contractId = computed(() => route.params.id as string)
const contract = computed(() => makonStore.contracts.find(c => c.id === contractId.value) || makonStore.contracts[0])

const showConfirmModal = ref(false)

function executeActivation() {
  if (contract.value) {
    makonStore.activateContract(contract.value.id)
  }
  showConfirmModal.value = false
  router.push(`/contracts/${contract.value.id}`)
}
</script>
