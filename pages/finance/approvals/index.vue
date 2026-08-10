<template>
  <div class="space-y-6">
    <PageHeader title="Tasdiqlash" subtitle="Tasdiqni kutayotgan hujjatlar va so'rovlar" />

    <div v-if="pendingItems.length === 0" class="card">
      <BaseEmptyState title="Tasdiqlashni kutayotgan hujjatlar yo'q" description="Barcha hujjatlar ko'rib chiqilgan">
        <template #icon><CheckCircle2 :size="28" class="text-emerald-500" /></template>
      </BaseEmptyState>
    </div>

    <div v-else class="space-y-4">
      <div v-for="item in pendingItems" :key="item.id" class="card p-5 hover:shadow-card-hover transition-shadow">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" :class="item.bg">
            <component :is="item.icon" :size="24" :class="item.color" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge" :class="item.badgeClass">{{ item.typeLabel }}</span>
              <span class="font-mono text-sm text-ink-500">{{ item.number }}</span>
            </div>
            <h3 class="font-semibold text-ink-900">{{ item.title }}</h3>
            <p class="text-sm text-ink-400 mt-1">{{ item.description }}</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 flex-shrink-0">
            <button class="btn btn-ghost btn-sm text-rose-600 hover:bg-rose-50" @click="reject(item.id)">
              <XCircle :size="16" /> Rad
            </button>
            <button class="btn btn-success btn-sm" @click="approve(item.id)">
              <Check :size="16" /> Tasdiqlash
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, FileText, ShieldCheck, Wrench, Check, XCircle } from 'lucide-vue-next'

const toast = useToast()

const pendingItems = ref([
  { id: 'ap1', type: 'CONTRACT', typeLabel: 'Shartnoma', number: 'CTR-2025-002', title: 'Aziz Karimov — ijara shartnomasi', description: '8.5 mln so\'m/oy · 12 oylik muddat · ERI imzolanmagan', icon: FileText, bg: 'bg-brand-50', color: 'text-brand-600', badgeClass: 'badge-info' },
  { id: 'ap2', type: 'ERI', typeLabel: 'ERI imzo', number: 'CTR-2025-003', title: 'Bekzod Toshmatov — elektron imzo', description: '4.5 mln so\'m/oy · 24 oylik muddat · Imzo kutilmoqda', icon: ShieldCheck, bg: 'bg-amber-50', color: 'text-amber-600', badgeClass: 'badge-warning' },
  { id: 'ap3', type: 'MATERIAL', typeLabel: 'Material so\'rovi', number: 'MR-2025-002', title: 'Rozetka ta\'minoti — 2 dona', description: 'WO-2025-004 uchun · Jami: 70,000 so\'m', icon: Wrench, bg: 'bg-emerald-50', color: 'text-emerald-600', badgeClass: 'badge-success' },
  { id: 'ap4', type: 'ERI', typeLabel: 'ERI imzo', number: 'CTR-2025-008', title: 'Lola Ahmadova — imzolanmagan', description: '4.5 mln so\'m/oy · 6 oylik muddat · 3 kun qoldi', icon: ShieldCheck, bg: 'bg-rose-50', color: 'text-rose-600', badgeClass: 'badge-danger' },
])

function approve(id: string) {
  pendingItems.value = pendingItems.value.filter(i => i.id !== id)
  toast.success('Tasdiqlandi', 'Hujjat muvaffaqiyatli tasdiqlandi')
}
function reject(id: string) {
  pendingItems.value = pendingItems.value.filter(i => i.id !== id)
  toast.warning('Rad etildi', 'Hujjat rad etildi')
}
</script>
