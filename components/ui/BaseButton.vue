<template>
  <component :is="tag" :class="classes" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'warning'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    tag?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    disabled: false,
    tag: 'button',
  }
)

defineEmits(['click'])

const variantClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  success: 'btn-success',
  warning: 'btn-warning',
}

const sizeClass = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

const classes = computed(() => [variantClass[props.variant], sizeClass[props.size]])
</script>
