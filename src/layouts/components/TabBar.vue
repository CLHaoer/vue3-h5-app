<script setup lang="ts">
import { useTabbar } from '@/stores'
const { tabbarConfig, tabbarList, isShow } = storeToRefs(useTabbar())
</script>

<template>
  <van-tabbar v-show="isShow" v-bind="tabbarConfig">
    <van-tabbar-item v-for="item in tabbarList" :key="item.name" v-bind="item">
      {{ item.name }}
      <template #icon="{ active }">
        <RIcon :id="item.icon" :icon="`${item.iconPrefix}${item.icon}`" :class="{ active }" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped lang="scss"></style>
