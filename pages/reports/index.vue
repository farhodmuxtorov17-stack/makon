<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold">Hisobotlar</h1>
        <p class="text-ink-500 text-sm mt-1">Tizim analitikasi va ko'rsatkichlar</p>
      </div>
      <div class="flex gap-2">
        <select v-model="period" class="input w-auto">
          <option value="month">Oylik</option>
          <option value="quarter">Choraklik</option>
          <option value="year">Yillik</option>
        </select>
        <button class="btn btn-secondary btn-sm"><Download :size="14" /> PDF</button>
      </div>
    </div>

    <div v-if="pending" class="text-center py-20 text-ink-500">Yuklanmoqda...</div>

    <template v-else-if="data">
      <!-- Summary cards -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="card p-4">
          <div class="text-xs text-ink-500 mb-1">Konversiya</div>
          <div class="text-2xl font-bold text-emerald-400">{{ data.summary.conversionRate }}%</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-ink-500 mb-1">O'rtacha ijava</div>
          <div class="text-2xl font-bold">{{ formatPrice(data.summary.avgRent) }}</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-ink-500 mb-1">O'rtacha hal qilish</div>
          <div class="text-2xl font-bold">{{ data.summary.avgResolutionTime }}</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-ink-500 mb-1">Mamnunlik</div>
          <div class="text-2xl font-bold text-emerald-400">{{ data.summary.satisfactionRate }}%</div>
        </div>
        <div class="card p-4">
          <div class="text-xs text-ink-500 mb-1">Binolar</div>
          <div class="text-2xl font-bold">{{ data.summary.totalBuildings }}</div>
        </div>
      </div>

      <!-- Revenue cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card p-5 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <div class="flex items-center gap-2 mb-2"><TrendingUp :size="16" class="text-emerald-400" /><span class="text-xs text-ink-500">Jami daromad</span></div>
          <div class="text-2xl font-bold text-emerald-400">{{ formatPrice(data.revenue.totalRevenue) }}</div>
        </div>
        <div class="card p-5 bg-gradient-to-br from-red-500/5 to-transparent">
          <div class="flex items-center gap-2 mb-2"><AlertTriangle :size="16" class="text-red-400" /><span class="text-xs text-ink-500">Qarzdorlik</span></div>
          <div class="text-2xl font-bold text-red-400">{{ formatPrice(data.revenue.outstandingDebt) }}</div>
        </div>
        <div class="card p-5 bg-gradient-to-br from-brand-500/5 to-transparent">
          <div class="flex items-center gap-2 mb-2"><FileCheck2 :size="16" class="text-brand-400" /><span class="text-xs text-ink-500">Shartnoma qiymati</span></div>
          <div class="text-2xl font-bold text-brand-400">{{ formatPrice(data.revenue.totalContractValue) }}</div>
        </div>
      </div>

      <!-- Monthly trend chart -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Oylik dinamika</h3>
        <div class="flex items-end justify-between h-48 gap-1">
          <div v-for="t in data.trend" :key="t.month" class="flex-1 flex flex-col items-center gap-1 group">
            <div class="w-full flex flex-col items-center gap-0.5">
              <div class="w-full rounded-t bg-brand-500/60 group-hover:bg-brand-500 transition-all" :style="{ height: barHeight(t.revenue, maxRevenue) + 'px' }" :title="formatPrice(t.revenue)"></div>
              <div class="w-full rounded-t bg-emerald-500/40 group-hover:bg-emerald-500/60 transition-all" :style="{ height: barHeight(t.contracts, maxContracts) + 'px' }" :title="t.contracts + ' shartnoma'"></div>
            </div>
            <span class="text-xs text-ink-600">{{ t.month }}</span>
          </div>
        </div>
        <div class="flex items-center gap-4 mt-3 text-xs">
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm bg-brand-500/60"></span> Daromad</span>
          <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-sm bg-emerald-500/40"></span> Shartnomalar</span>
        </div>
      </div>

      <!-- Applications funnel -->
      <div class="card p-6">
        <h3 class="font-semibold mb-4">Arizalar voronkasi</h3>
        <div class="space-y-2">
          <div v-for="f in data.funnel" :key="f.stage" class="flex items-center gap-3">
            <div class="w-28 text-sm text-ink-400 flex-shrink-0">{{ f.stage }}</div>
            <div class="flex-1 h-8 rounded-lg bg-white/5 overflow-hidden">
              <div class="h-full rounded-lg flex items-center px-2 transition-all duration-700"
                :style="{ width: Math.max((f.count / maxFunnel) * 100, f.count > 0 ? 6 : 0) + '%', backgroundColor: f.color }">
                <span class="text-xs font-medium text-white" v-if="f.count > 0">{{ f.count }}</span>
              </div>
            </div>
            <div class="w-10 text-right text-sm font-medium">{{ f.count }}</div>
          </div>
        </div>
      </div>

      <!-- Occupancy by type + Request categories -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="card p-6">
          <h3 class="font-semibold mb-4">Bandlik bo'yicha turlar</h3>
          <div class="space-y-3">
            <div v-for="o in data.occupancyByType" :key="o.type" class="flex items-center gap-3">
              <div class="w-32 text-sm text-ink-400 flex-shrink-0">{{ typeLabel(o.type) }}</div>
              <div class="flex-1 h-6 rounded-lg bg-white/5 overflow-hidden">
                <div class="h-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 transition-all duration-700" :style="{ width: o.rate + '%' }"></div>
              </div>
              <div class="w-10 text-right text-sm font-medium">{{ o.rate }}%</div>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="font-semibold mb-4">Xizmat so'rovlari kategoriyalari</h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="r in data.requestsByCategory" :key="r.category" class="p-3 rounded-xl bg-white/5">
              <div class="text-xs text-ink-500 mb-1">{{ categoryLabel(r.category) }}</div>
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold">{{ r.count }}</span>
                <span v-if="r.open > 0" class="text-xs text-amber-400">{{ r.open }} ochiq</span>
              </div>
            </div>
            <div v-if="data.requestsByCategory.length === 0" class="col-span-2 text-center text-ink-500 text-sm py-4">Ma'lumot yo'q</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, AlertTriangle, FileCheck2, Download } from 'lucide-vue-next'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const config = useRuntimeConfig()
const { data, pending } = await useAsyncData('reports', () =>
  $fetch<any>(`${config.public.apiBase}/modulesApi?action=reports`)
)

const period = ref('month')

const maxRevenue = computed(() => Math.max(...(data.value?.trend || []).map((t: any) => t.revenue), 1))
const maxContracts = computed(() => Math.max(...(data.value?.trend || []).map((t: any) => t.contracts), 1))
const maxFunnel = computed(() => Math.max(...(data.value?.funnel || []).map((f: any) => f.count), 1))

function barHeight(val: number, max: number) { return Math.max((val / max) * 140, 2) }
function typeLabel(t: string) { return { BUSINESS_CENTER: 'Biznes markaz', OFFICE: 'Ofis', SHOPPING: 'Savdo', WAREHOUSE: 'Ombor', RESIDENTIAL: 'Turar joy', MIXED: 'Aralash' }[t] || t }
function categoryLabel(c: string) { return { PLUMBING: 'Sanitariya', ELECTRICAL: 'Elektrika', HVAC: 'Konditsioner', CLEANING: 'Tozalash', STRUCTURAL: 'Konstruksiya', SECURITY: 'Xavfsizlik', OTHER: 'Boshqa' }[c] || c }
function formatPrice(p: number) { if (!p) return '0'; return (p / 1000000).toFixed(1) + 'M so\'m' }
</script>
