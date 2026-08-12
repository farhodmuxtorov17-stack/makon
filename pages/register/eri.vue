<script setup lang="ts">
// Redirect old Raqamli imzo registration to new phone-based registration
definePageMeta({ layout: 'blank' })
onMounted(() => navigateTo('/register', { replace: true }))
</script>
<template><div /></template>
