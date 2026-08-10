<template>
  <div v-if="app" class="max-w-4xl mx-auto space-y-6 py-4">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/management/applications" class="btn btn-ghost btn-sm p-2">
        <ArrowLeft :size="18" />
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-ink-900 dark:text-white">Ariza Tarixi va Audit Izlari</h1>
        <p class="text-xs text-ink-500">Ariza <b>{{ app.number }}</b> bo'yicha barcha harakatlar, ERI va reviewer xulosalari kronologiyasi</p>
      </div>
    </div>

    <!-- Timeline & Audit Logs -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Left 2 Cols: Vertical Timeline -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card p-5 space-y-6">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/5">
            <History :size="18" class="text-brand-500" /> Barcha O'zgarishlar va Bosqichlar (Timeline)
          </h3>

          <div class="relative pl-6 border-l-2 border-brand-500/30 space-y-6">
            <div v-for="(event, idx) in timelineEvents" :key="idx" class="relative group">
              <!-- Timeline Dot -->
              <span
                class="absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-ink-900 flex items-center justify-center text-[10px]"
                :class="event.dotClass"
              ></span>

              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-sm text-ink-900 dark:text-white">{{ event.title }}</span>
                  <span class="text-[11px] font-mono text-ink-500">{{ event.timestamp }}</span>
                </div>

                <div class="text-xs text-ink-500 flex items-center gap-2">
                  <span class="font-medium text-ink-700 dark:text-ink-300">{{ event.actor }}</span>
                  <span>·</span>
                  <span>{{ event.role }}</span>
                </div>

                <!-- Reviewer Notes / Comments -->
                <div v-if="event.comment" class="p-3 rounded-xl bg-black/5 dark:bg-white/5 text-xs text-ink-700 dark:text-ink-300 mt-2 border border-black/5 dark:border-white/5">
                  <span class="font-semibold text-ink-900 dark:text-white block mb-0.5">Menejer Izohi:</span>
                  "{{ event.comment }}"
                </div>

                <!-- ERI Key Info -->
                <div v-if="event.eriDetails" class="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-300 mt-2 space-y-1">
                  <div class="font-bold flex items-center gap-1.5"><Key :size="12" /> ERI Tamg'a Tasdiqlandi:</div>
                  <div class="font-mono text-[10px]">Sertifikat: {{ event.eriDetails.serial }} | INN: {{ event.eriDetails.inn }}</div>
                  <div class="font-mono text-[10px]">SHA-256: {{ event.eriDetails.hash }}</div>
                </div>

                <!-- Attached Documents -->
                <div v-if="event.attachedDoc" class="flex items-center gap-2 text-xs text-brand-500 pt-1">
                  <Paperclip :size="12" /> <span class="hover:underline cursor-pointer">{{ event.attachedDoc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Col: Technical Audit Trace -->
      <div class="space-y-6">
        <div class="card p-5 space-y-4">
          <h3 class="font-bold text-base text-ink-900 dark:text-white flex items-center gap-2">
            <ShieldCheck :size="18" class="text-emerald-500" /> Texnik Audit Izlari (IP Trace)
          </h3>

          <div class="space-y-3">
            <div v-for="(log, idx) in auditTrace" :key="idx" class="p-3 rounded-xl bg-black/5 dark:bg-white/5 space-y-1 text-xs">
              <div class="flex items-center justify-between font-mono text-[11px]">
                <span class="text-brand-500 font-bold">{{ log.action }}</span>
                <span class="text-ink-500">{{ log.time }}</span>
              </div>
              <div class="text-ink-500 font-mono text-[10px]">IP: {{ log.ip }}</div>
              <div class="text-ink-400 text-[10px] truncate">{{ log.userAgent }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, History, Key, Paperclip, ShieldCheck } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const route = useRoute()
const makonStore = useMakonStore()

const appId = computed(() => route.params.id as string)
const app = computed(() => makonStore.applications.find(a => a.id === appId.value) || makonStore.applications[0])

const timelineEvents = ref([
  {
    title: 'Moliya bo\'limi tasdiqladi (FINANCE_APPROVED)',
    timestamp: '2026-08-05 16:30',
    actor: 'Madina Umarova',
    role: 'Bosh Hissobchi',
    comment: 'Tashkilotning so\'nggi 6 oylik bank oborotlari ko\'rib chiqildi va to\'lov qobiliyati yetarli deb baholandi.',
    dotClass: 'bg-emerald-500'
  },
  {
    title: 'Bino operatsiyasi ma\'qulladi (OPERATION_APPROVED)',
    timestamp: '2026-08-04 11:15',
    actor: 'Alisher Qodirov',
    role: 'Bino Menejeri',
    comment: 'Xonani topshirish grafigi va texnik talablar muvofiqlashtirildi.',
    dotClass: 'bg-purple-500'
  },
  {
    title: 'Ariza ERI kalit bilan imzolandi (SUBMITTED)',
    timestamp: '2026-08-02 10:15',
    actor: app.value?.applicantName || 'Grand Logistics LLC',
    role: 'Arizachi (Tenant)',
    dotClass: 'bg-brand-500',
    eriDetails: {
      serial: '71A49B01F223',
      inn: '305987123',
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    },
    attachedDoc: 'Guvohnoma_305987123.pdf'
  }
])

const auditTrace = [
  { action: 'FINANCE_DECISION_APPROVE', time: '2026-08-05 16:30:11', ip: '185.139.137.10', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
  { action: 'OPERATIONAL_CHECK_PASS', time: '2026-08-04 11:15:04', ip: '185.139.137.12', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
  { action: 'APPLICATION_SUBMIT_ERI', time: '2026-08-02 10:15:44', ip: '213.230.101.45', userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
]
</script>
