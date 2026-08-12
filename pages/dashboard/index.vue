<template>
  <div>
    <!-- Redirect handled by onMounted -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({ 
  roles: ['SUPER_HEAD', 'ADMIN', 'BUILDING_MANAGER', 'ACCOUNTANT', 'FACILITY', 'TENANT_OWNER', 'WAREHOUSE_OPERATOR', 'CONTENT_OPERATOR'], 
  layout: 'admin', 
  middleware: 'role' 
})

const currentRole = useState('currentRole', () => 'SUPER_HEAD')
const authStore = useAuthStore()

onMounted(() => {
  // Sync role from auth store
  if (authStore.user?.role) {
    currentRole.value = authStore.user.role
  }
  
  const role = currentRole.value
  
  if (role === 'TENANT_OWNER') {
    navigateTo('/cabinet')
  } else if (role === 'SUPER_HEAD' || role === 'ADMIN') {
    navigateTo('/dashboard/executive')
  } else if (role === 'BUILDING_MANAGER') {
    navigateTo('/dashboard/building')
  } else if (role === 'FACILITY') {
    navigateTo('/facility/work-orders')
  } else if (role === 'WAREHOUSE_OPERATOR') {
    navigateTo('/finance/inventory')
  } else if (role === 'CONTENT_OPERATOR') {
    navigateTo('/management/buildings')
  } else if (role === 'ACCOUNTANT') {
    navigateTo('/finance/invoices')
  } else {
    navigateTo('/dashboard/executive')
  }
})
</script>
