<script setup lang="ts">
import type { Component } from 'vue'
defineOptions({
  name: 'layout-index',
})
const { name = 'default' } = defineProps<{
  name?: string
}>()
const layoutComps = import.meta.glob<Component>('./*.vue', {
  eager: true,
  import: 'default',
})
const Comp = computed(() => {
  return layoutComps[`./${name}.vue`]
})
</script>

<template>
  <component v-if="Comp" :is="Comp" v-bind="$attrs">
    <slot />
  </component>
  <slot v-else />
</template>
