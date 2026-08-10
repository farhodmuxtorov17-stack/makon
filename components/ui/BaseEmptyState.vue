<template>
  <div class="text-center py-16">
    <div class="w-16 h-16 mx-auto rounded-2xl bg-ink-100 flex items-center justify-center mb-4">
      <slot name="icon">
        <Inbox :size="28" class="text-ink-300" />
      </slot>
    </div>
    <h3 class="font-semibold text-ink-700 mb-1">{{ title }}</h3>
    <p class="text-sm text-ink-400 max-w-sm mx-auto">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'
defineProps<{ title: string; description?: string }>()
