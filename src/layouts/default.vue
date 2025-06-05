<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TabBar from './components/TabBar.vue'
import { useTheme } from '@/stores'
defineOptions({ name: 'layout-default' })
const theme = computed(() => (useTheme().ThemeIsDark ? 'dark' : 'light'))
</script>

<template>
  <van-config-provider :theme>
    <div class="min-h-dvh w-full flex flex-col">
      <nav-bar />
      <main class="flex-1">
        <slot />
      </main>
      <tab-bar />
    </div>
  </van-config-provider>
</template>
