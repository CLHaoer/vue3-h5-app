<script setup lang="ts">
const { msg } = defineProps<{
  msg?: string
}>()
</script>

<template>
  <div>{{ msg }}</div>
</template>

<style scoped lang="scss"></style>
