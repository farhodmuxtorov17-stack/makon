<template>
  <client-only>
    <apexchart
      :type="type"
      :options="chartOptions"
      :series="chartSeries"
      :height="height"
    />
    <template #fallback>
      <div :style="{ height: height + 'px' }" class="flex items-center justify-center text-ink-400 text-sm">Yuklanmoqda...</div>
    </template>
  </client-only>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type: 'area' | 'bar' | 'line' | 'donut' | 'radialBar' | 'pie'
  series: any[]
  categories?: string[]
  height?: number
  colors?: string[]
  horizontal?: boolean
  stacked?: boolean
  donutLabels?: string[]
}>(), {
  height: 280,
  colors: () => ['#6366f1'],
  horizontal: false,
  stacked: false,
})

const isDark = computed(() => {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark')
  }
  return false
})

const chartSeries = computed(() => props.series)

const chartOptions = computed(() => {
  const base = {
    chart: {
      type: props.type,
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
      background: 'transparent',
      stacked: props.stacked,
    },
    colors: props.colors,
    grid: {
      borderColor: isDark.value ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
      strokeDashArray: 4,
      padding: { left: 8, right: 8 },
    },
    legend: {
      show: props.type === 'bar' || props.type === 'area' ? true : false,
      fontSize: '12px',
      labels: { colors: isDark.value ? '#a1a1aa' : '#71717a' },
      markers: { size: 6, strokeWidth: 0 },
    },
    tooltip: {
      theme: isDark.value ? 'dark' : 'light',
      style: { fontSize: '12px', fontFamily: 'Inter, sans-serif' },
    },
    dataLabels: {
      enabled: false,
    },
  }

  if (props.type === 'donut' || props.type === 'pie') {
    return {
      ...base,
      labels: props.donutLabels || [],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { fontSize: '14px', color: isDark.value ? '#a1a1aa' : '#71717a' },
              value: { fontSize: '22px', fontWeight: 700, color: isDark.value ? '#fafafa' : '#18181b' },
            },
          },
        },
      },
      stroke: { show: false },
    }
  }

  if (props.type === 'radialBar') {
    return {
      ...base,
      plotOptions: {
        radialBar: {
          hollow: { size: '60%' },
          track: { background: isDark.value ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' },
          dataLabels: {
            name: { fontSize: '13px', color: isDark.value ? '#a1a1aa' : '#71717a' },
            value: { fontSize: '28px', fontWeight: 700, color: isDark.value ? '#fafafa' : '#18181b' },
          },
        },
      },
    }
  }

  return {
    ...base,
    plotOptions: {
      bar: {
        horizontal: props.horizontal,
        borderRadius: 6,
        columnWidth: '60%',
        barHeight: '70%',
      },
    },
    xaxis: {
      categories: props.categories || [],
      labels: {
        style: { fontSize: '11px', colors: isDark.value ? '#a1a1aa' : '#71717a', fontFamily: 'Inter' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: '11px', colors: isDark.value ? '#a1a1aa' : '#71717a', fontFamily: 'Inter' },
      },
    },
    fill: props.type === 'area' ? {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] },
    } : { type: 'solid' },
    stroke: { curve: 'smooth', width: props.type === 'area' ? 2.5 : 0 },
  }
})
</script>
