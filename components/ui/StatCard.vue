<template>
  <div class="card card-hover hover-lift p-5 group relative overflow-hidden">
    <!-- Subtle gradient glow on hover -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      :class="glowClass" />

    <div class="relative z-10">
      <div class="flex items-start justify-between mb-3">
        <div class="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          :class="iconBg">
          <component :is="resolvedIcon" :size="22" :class="iconColor" />
        </div>
        <div v-if="trend" class="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
          :class="trendClass">
          <TrendingUp v-if="trendUp" :size="12" />
          <TrendingDown v-else :size="12" />
          {{ trend }}
        </div>
      </div>

      <div class="flex items-end justify-between">
        <div>
          <p class="text-2xl font-bold font-display tracking-tight">{{ value }}</p>
          <p class="text-sm text-ink-400 mt-0.5">{{ label }}</p>
        </div>
        <!-- Mini sparkline -->
        <svg v-if="sparkline" :width="60" :height="32" viewBox="0 0 60 32" class="opacity-60 group-hover:opacity-100 transition-opacity">
          <defs>
            <linearGradient :id="`spark-${uid}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="sparkColor" stop-opacity="0.3" />
              <stop offset="100%" :stop-color="sparkColor" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="sparkPath" :stroke="sparkColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
          <path :d="sparkPath + ` L60,32 L0,32 Z`" :fill="`url(#spark-${uid})`" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TrendingUp, TrendingDown, Wallet, Building2, FileText, Users, CreditCard,
  Shield, CheckCircle2, Clock, AlertTriangle, Cpu, MemoryStick, HardDrive,
  Server, Zap, Droplet, Flame, Thermometer, Package, Wrench, Layers, Maximize,
} from 'lucide-vue-next'
import type { Component } from 'vue'

const props = defineProps<{
  icon: string | Component
  value: string | number
  label: string
  iconBg?: string
  iconColor?: string
  trend?: string
  trendUp?: boolean
  sparkline?: number[]
  sparkColor?: string
}>()

const uid = Math.random().toString(36).slice(2, 8)

const iconMap: Record<string, Component> = {
  Wallet, Building2, FileText, Users, CreditCard, Shield, CheckCircle2, Clock,
  AlertTriangle, Cpu, MemoryStick, HardDrive, Server, Zap, Droplet, Flame,
  Thermometer, Package, Wrench, Layers, Maximize,
}
const resolvedIcon = computed(() => typeof props.icon === 'string' ? (iconMap[props.icon] || Building2) : props.icon)

const iconBg = computed(() => props.iconBg || 'bg-brand-50')
const iconColor = computed(() => props.iconColor || 'text-brand-600')
const trendClass = computed(() => props.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')
const sparkColor = computed(() => props.sparkColor || '#6366f1')
const glowClass = computed(() => {
  const c = props.iconColor || 'text-brand-600'
  return c.includes('brand') ? 'bg-gradient-to-br from-brand-50 to-transparent' :
    c.includes('emerald') ? 'bg-gradient-to-br from-emerald-50 to-transparent' :
    c.includes('amber') ? 'bg-gradient-to-br from-amber-50 to-transparent' :
    c.includes('rose') ? 'bg-gradient-to-br from-rose-50 to-transparent' :
    c.includes('sky') ? 'bg-gradient-to-br from-sky-50 to-transparent' :
    'bg-gradient-to-br from-ink-50 to-transparent'
})

const sparkPath = computed(() => {
  if (!props.sparkline || props.sparkline.length < 2) return ''
  const data = props.sparkline
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60
    const y = 32 - ((v - min) / range) * 28 - 2
    return `${x},${y}`
  })
  return 'M' + points.join(' L')
})
</script>
