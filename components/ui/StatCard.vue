<template>
  <div class="bg-white rounded-2xl border border-ink-200/60 shadow-card p-5 transition-all hover:shadow-card-hover">
    <div class="flex items-start justify-between mb-3">
      <div class="w-11 h-11 rounded-xl flex items-center justify-center" :class="iconBg">
        <component :is="resolvedIcon" :size="22" :class="iconColor" />
      </div>
      <div v-if="trend" class="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg" :class="trendClass">
        <TrendingUp v-if="trendUp" :size="12" />
        <TrendingDown v-else :size="12" />
        {{ trend }}
      </div>
    </div>
    <p class="text-2xl font-bold font-display tracking-tight">{{ value }}</p>
    <p class="text-sm text-ink-400 mt-0.5">{{ label }}</p>
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
}>()

const iconMap: Record<string, Component> = {
  Wallet, Building2, FileText, Users, CreditCard, Shield, CheckCircle2, Clock,
  AlertTriangle, Cpu, MemoryStick, HardDrive, Server, Zap, Droplet, Flame,
  Thermometer, Package, Wrench, Layers, Maximize,
}
const resolvedIcon = computed(() => typeof props.icon === 'string' ? (iconMap[props.icon] || Building2) : props.icon)

const iconBg = computed(() => props.iconBg || 'bg-brand-50')
const iconColor = computed(() => props.iconColor || 'text-brand-600')
const trendClass = computed(() => props.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')
</script>
