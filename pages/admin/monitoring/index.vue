<template>
  <div>
    <h1 class="text-xl font-bold text-ink-900 dark:text-white mb-6">Monitoring</h1>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Server</div><div class="text-sm font-medium text-emerald-500">Online</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">API</div><div class="text-sm font-medium text-emerald-500">142ms</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">DB</div><div class="text-sm font-medium text-emerald-500">8ms</div></div>
      <div class="card-premium p-4"><div class="text-xs text-ink-400 mb-1">Uptime</div><div class="text-sm font-medium text-ink-900 dark:text-white">99.98%</div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
</script>
