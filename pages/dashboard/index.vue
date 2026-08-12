<template>
  <div>
    <!-- Redirect handled by middleware -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({ roles: ['SUPER_HEAD', 'ADMIN', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'],  layout: 'admin', middleware: 'role' })

const currentRole = useState('currentRole', () => 'SUPER_HEAD')

onMounted(() => {
  if (currentRole.value === 'TENANT_OWNER') {
    navigateTo('/cabinet')
  } else if (currentRole.value === 'SUPER_HEAD' || currentRole.value === 'ADMIN') {
    navigateTo('/dashboard/executive')
  } else if (currentRole.value === 'BUILDING_MANAGER') {
    navigateTo('/dashboard/building')
  } else {
    navigateTo('/dashboard/executive')
  }
})
</script>
