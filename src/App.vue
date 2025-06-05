<script setup lang="ts">
import Layout from '@/layouts/index.vue'
import { useRouteStore } from '@/stores'
const routeStore = useRouteStore()
const keepAlivePages = computed(() => routeStore.keepAlivePages)
</script>

<template>
  <Layout>
    <NuxtPage :include="keepAlivePages" />
  </Layout>
</template>
