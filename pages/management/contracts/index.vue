<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Shartnomalar</h1>
        <p class="text-ink-500 text-sm mt-1">{{ data?.contracts.length || 0 }} shartnoma</p>
      </div>
      <button class="btn btn-primary btn-sm">
        <Plus :size="16" /> Yangi shartnoma
      </button>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <div v-else-if="data" class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-white/5 text-ink-500 text-xs uppercase tracking-widest">
            <th class="text-left font-medium px-4 py-3">Nomer</th>
            <th class="text-left font-medium px-4 py-3">Ijachi</th>
            <th class="text-left font-medium px-4 py-3 hidden md:table-cell">STIR</th>
            <th class="text-right font-medium px-4 py-3">Oylik ijara</th>
            <th class="text-left font-medium px-4 py-3 hidden lg:table-cell">Davr</th>
            <th class="text-center font-medium px-4 py-3">Status</th>
            <th class="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in data.contracts" :key="c.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
            <td class="px-4 py-3 font-mono text-xs">{{ c.number }}</td>
            <td class="px-4 py-3 font-medium">{{ c.tenantName }}</td>
            <td class="px-4 py-3 hidden md:table-cell font-mono text-xs text-ink-500">{{ c.tenantTin }}</td>
            <td class="px-4 py-3 text-right font-semibold">{{ formatPrice(c.monthlyRent, c.currency) }}</td>
            <td class="px-4 py-3 hidden lg:table-cell text-ink-400 text-xs">
              {{ formatDate(c.startDate) }} — {{ formatDate(c.endDate) }}
            </td>
            <td class="px-4 py-3 text-center">
              <span class="badge" :class="contractBadge(c.status)">{{ contractLabel(c.status) }}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <button v-if="c.pdfUrl" class="btn btn-ghost btn-sm">
                <FileText :size="14" /> PDF
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, FileText } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const { fetchAdminData } = useApi()
const { data, pending } = await useAsyncData('admin-contracts', () => fetchAdminData('contracts'))

function formatPrice(price: number, currency: string) {
  if (!price) return '—'
  const formatted = new Intl.NumberFormat('ru-RU').format(price)
  return currency === 'USD' ? `$${formatted}` : `${(formatted / 1000000).toFixed(1)}M`
}

function formatDate(date: string) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function contractBadge(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'badge-success', EXPIRED: 'badge-neutral', TERMINATED: 'badge-danger', DRAFT: 'badge-warning', PENDING_SIGNATURE: 'badge-brand',
  }
  return map[status] || 'badge-neutral'
}

function contractLabel(status: string) {
  const map: Record<string, string> = {
    ACTIVE: 'Faol', EXPIRED: 'Muddati o\'tgan', TERMINATED: 'Bekor qilingan', DRAFT: 'Qoralama', PENDING_SIGNATURE: 'Imzo kutilmoqda',
  }
  return map[status] || status
}
</script>
