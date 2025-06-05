<script setup lang="ts">
import { useNavbar } from '@/stores'
const { navbarConfig, isShow, slots } = storeToRefs(useNavbar())
</script>

<template>
  <van-nav-bar v-show="isShow" v-bind="navbarConfig">
    <template v-for="slot in slots" :key="slot?.name" #[slot?.name]>
      <component :is="slot?.()" />
    </template>
  </van-nav-bar>
</template>
