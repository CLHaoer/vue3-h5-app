<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  /** 图标名称，支持：
   * 1. van-icon 的图标名称（如 'chat-o'）
   * 2. 图片链接（以 http 或 https 开头）
   * 3. iconify 图标（包含冒号，如 'mdi:github'）
   */
  icon: string
  /** 图标大小，如 20px 2em，默认单位为px */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 类名前缀 */
  classPrefix?: string
  /** 是否显示图标右上角小红点 */
  dot?: boolean
  /** 图标右上角徽标的内容 */
  badge?: number | string
  /** 自定义元素标签 */
  tag?: keyof HTMLElementTagNameMap
}
const props = withDefaults(defineProps<Props>(), {
  size: 18,
})

// 判断图标类型
const iconType = computed(() => {
  const icon = props.icon
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return 'url'
  }
  if (icon.includes(':')) {
    return 'iconify'
  }
  return 'vant'
})

// 处理尺寸，确保带有单位
const sizeWithUnit = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size / 100}rem`
  }
  return props.size
})

// 定义点击事件
const emit = defineEmits(['click'])

const onClick = (event: Event) => {
  emit('click', event)
}
</script>

<template>
  <van-icon
    v-if="iconType !== 'iconify'"
    v-bind="{
      ...props,
      name: props.icon,
      ...$attrs,
    }"
    :style="{
      fontSize: sizeWithUnit,
    }"
    @click="onClick"
  />
  <Icon
    v-else
    :icon="props.icon"
    v-bind="$attrs"
    :style="{ width: sizeWithUnit, height: sizeWithUnit }"
    @click="onClick"
  />
</template>

<style scoped></style>
