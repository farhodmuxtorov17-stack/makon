<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="font-display text-2xl font-bold tracking-tight">Bildirishnomalar</h1>
        <p class="text-ink-500 text-sm mt-0.5">Tizim xabarlari va ogohlantirishlar</p>
      </div>
      <button class="btn btn-outline btn-sm">Hammasini o'qilgan deb belgilash</button>
    </div>

    <div class="card overflow-hidden">
      <div class="divide-y divide-ink-50">
        <div v-for="n in financeStore.notifications" :key="n.id"
          class="flex items-start gap-4 px-5 py-4 hover:bg-ink-50/50 transition-colors cursor-pointer"
          :class="!n.isRead ? 'bg-brand-50/30' : ''">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :class="notifBg(n.type)">
            <component :is="notifIcon(n.type)" :size="18" :class="notifColor(n.type)" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-ink-900" :class="!n.isRead ? '' : 'text-ink-500'">{{ n.title }}</p>
            <p class="text-sm text-ink-400 mt-0.5">{{ n.body }}</p>
            <p class="text-xs text-ink-400 mt-1">{{ n.createdAt }}</p>
          </div>
          <div v-if="!n.isRead" class="w-2 h-2 rounded-full bg-brand-500 mt-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText, ShieldCheck, Receipt, Wrench, Package, Settings, Bell } from 'lucide-vue-next'

const financeStore = useFinanceStore()
onMounted(() => financeStore.initMockData())

function notifIcon(t: string) {
  const m: Record<string, any> = { APPLICATION: FileText, ERI: ShieldCheck, INVOICE: Receipt, SERVICE: Wrench, MATERIAL: Package, SYSTEM: Settings, CONTRACT: FileText }
  return m[t] || Bell
}
function notifBg(t: string) {
  const m: Record<string, string> = { APPLICATION: 'bg-brand-50', ERI: 'bg-amber-50', INVOICE: 'bg-emerald-50', SERVICE: 'bg-sky-50', MATERIAL: 'bg-rose-50', SYSTEM: 'bg-ink-100' }
  return m[t] || 'bg-ink-100'
}
function notifColor(t: string) {
  const m: Record<string, string> = { APPLICATION: 'text-brand-600', ERI: 'text-amber-600', INVOICE: 'text-emerald-600', SERVICE: 'text-sky-600', MATERIAL: 'text-rose-600', SYSTEM: 'text-ink-500' }
  return m[t] || 'text-ink-500'
}
</script>
