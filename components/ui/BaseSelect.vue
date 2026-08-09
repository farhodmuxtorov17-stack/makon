<template>
  <div>
    <label v-if="label" class="label">{{ label }}<span v-if="required" class="text-danger-500 ml-0.5">*</span></label>
    <select
      v-model="model"
      :disabled="disabled"
      :class="[
        'input appearance-none cursor-pointer bg-no-repeat pr-9',
        size === 'sm' ? '!py-2 !text-xs' : '',
      ]"
      :style="{
        backgroundImage: `url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22none%22%20viewBox=%220%200%2024%2024%22%20stroke=%22%2394a3b8%22%3E%3Cpath%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22%20stroke-width=%222%22%20d=%22M19%209l-7%207-7-7%22/%3E%3C/svg%3E')`,
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1.1rem',
      }"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    options: Option[]
    placeholder?: string
    required?: boolean
    disabled?: boolean
    hint?: string
    size?: 'sm' | 'md'
  }>(),
  {
    size: 'md',
  }
)

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
})
</script>
