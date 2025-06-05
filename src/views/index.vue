<script setup lang="ts">
import { useRouteStore } from '@/stores'
definePage({
  redirect: '/home',
})
const keepAlivePages = computed(() => useRouteStore().keepAlivePages)
</script>
<template>
  <div class="tabbar-page">
    <NuxtPage :include="keepAlivePages" />
  </div>
</template>
