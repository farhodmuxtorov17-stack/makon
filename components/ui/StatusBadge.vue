<template>
  <span :class="['badge', badgeClass]">
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    status: string
    type?: string
    dot?: boolean
  }>(),
  {
    dot: false,
  }
)

const config: Record<string, { label: string; class: string; dot: string }> = {
  // Unit
  DRAFT: { label: 'Qoralama', class: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  VACANT: { label: "Bo'sh", class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  RENTED: { label: 'Ijarada', class: 'bg-primary-50 text-primary-700', dot: 'bg-primary-500' },
  SOLD: { label: 'Sotilgan', class: 'bg-accent-50 text-accent-700', dot: 'bg-accent-500' },
  MAINTENANCE: {
    label: "Ta'mirda",
    class: 'bg-warning-50 text-warning-700',
    dot: 'bg-warning-500',
  },
  RESERVED: { label: 'Bron', class: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  // Application
  SUBMITTED: { label: 'Yuborilgan', class: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  FINANCE_REVIEW: {
    label: 'Finance review',
    class: 'bg-warning-50 text-warning-700',
    dot: 'bg-warning-500',
  },
  OFFER_SENT: {
    label: 'Taklif yuborildi',
    class: 'bg-primary-50 text-primary-700',
    dot: 'bg-primary-500',
  },
  CONTRACT_SIGNING: {
    label: 'Shartnoma imzolash',
    class: 'bg-accent-50 text-accent-700',
    dot: 'bg-accent-500',
  },
  ERI_SIGNING: {
    label: 'ERI imzolash',
    class: 'bg-accent-50 text-accent-700',
    dot: 'bg-accent-500',
  },
  APPROVED: {
    label: 'Tasdiqlangan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
  REJECTED: { label: 'Rad etilgan', class: 'bg-danger-50 text-danger-700', dot: 'bg-danger-500' },
  CANCELLED: {
    label: 'Bekor qilingan',
    class: 'bg-neutral-100 text-neutral-600',
    dot: 'bg-neutral-400',
  },
  // Contract
  PENDING_SIGN: {
    label: 'Imzolash kutilmoqda',
    class: 'bg-warning-50 text-warning-700',
    dot: 'bg-warning-500',
  },
  SIGNED: { label: 'Imzolangan', class: 'bg-primary-50 text-primary-700', dot: 'bg-primary-500' },
  ACTIVE: { label: 'Faol', class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  EXPIRED: {
    label: "Muddati o'tgan",
    class: 'bg-neutral-100 text-neutral-600',
    dot: 'bg-neutral-400',
  },
  TERMINATED: {
    label: 'Bekor qilingan',
    class: 'bg-danger-50 text-danger-700',
    dot: 'bg-danger-500',
  },
  // Invoice
  PENDING: { label: 'Kutilmoqda', class: 'bg-warning-50 text-warning-700', dot: 'bg-warning-500' },
  PARTIAL: { label: "Qisman to'langan", class: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  PAID: { label: "To'langan", class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  OVERDUE: { label: "Muddati o'tgan", class: 'bg-danger-50 text-danger-700', dot: 'bg-danger-500' },
  // Listing
  PUBLISHED: {
    label: 'Nashr etilgan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
  PAUSED: { label: "To'xtatilgan", class: 'bg-warning-50 text-warning-700', dot: 'bg-warning-500' },
  ARCHIVED: { label: 'Arxiv', class: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  // Work order
  CREATED: { label: 'Yaratilgan', class: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  ASSIGNED: { label: 'Tayinlangan', class: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  IN_PROGRESS: {
    label: 'Jarayonda',
    class: 'bg-warning-50 text-warning-700',
    dot: 'bg-warning-500',
  },
  INSPECTION: { label: 'Inspeksiya', class: 'bg-accent-50 text-accent-700', dot: 'bg-accent-500' },
  COMPLETED: {
    label: 'Tugatilgan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
  DONE: { label: 'Bajarilgan', class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  CLOSED: { label: 'Yopilgan', class: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  // Material
  PENDING: { label: 'Kutilmoqda', class: 'bg-warning-50 text-warning-700', dot: 'bg-warning-500' },
  APPROVED: {
    label: 'Tasdiqlangan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
  // Open/Closed
  OPEN: { label: 'Ochiq', class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  CLOSED: { label: 'Yopilgan', class: 'bg-neutral-100 text-neutral-600', dot: 'bg-neutral-400' },
  // Payment
  COMPLETED: {
    label: 'Tugatilgan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
  FAILED: { label: 'Xatolik', class: 'bg-danger-50 text-danger-700', dot: 'bg-danger-500' },
  REFUNDED: { label: 'Qaytarilgan', class: 'bg-info-50 text-info-700', dot: 'bg-info-500' },
  READY: { label: 'Tayyor', class: 'bg-success-50 text-success-700', dot: 'bg-success-500' },
  VERIFIED: {
    label: 'Tasdiqlangan',
    class: 'bg-success-50 text-success-700',
    dot: 'bg-success-500',
  },
}

const item = computed(
  () =>
    config[props.status] || {
      label: props.status,
      class: 'bg-neutral-100 text-neutral-600',
      dot: 'bg-neutral-400',
    }
)
const badgeClass = computed(() => item.value.class)
const dotClass = computed(() => item.value.dot)
const label = computed(() => item.value.label)
</script>
