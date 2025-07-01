<script setup lang="ts">
import { useTheme } from '@/stores'
import avatar from '@/assets/img/test.png'

const themeStore = useTheme()
const { ThemeIsDark } = storeToRefs(themeStore)

const user = {
  avatar,
  name: '陈小美',
  id: 'dy888666',
  bg: 'https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}

const actions = [
  { label: '我的作品', icon: 'ph:camera-bold' },
  { label: '收藏', icon: 'ph:bookmark-simple-bold' },
  { label: '喜欢', icon: 'ph:heart-bold' },
  { label: '历史', icon: 'ph:clock-counter-clockwise-bold' },
]

const works = [
  'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/2088169/pexels-photo-2088169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
]

const handleThemeToggle = () => themeStore.toggleTheme()
const handleSettingsClick = () => showToast('点击了设置')

// 吸顶标题透明度逻辑
const mainRef = useTemplateRef<HTMLElement | null>('mainRef')
const { y: mainY } = useElementBounding(mainRef)
const navTitleOpacity = computed(() => {
  if (mainY.value > 0) return 0
  return Math.min(1, Math.abs(mainY.value) / 60)
})
const showNavBgc = computed(() => {
  if (mainY.value > 0) return 'transparent'
  const opacity = Math.min(1, Math.abs(mainY.value) / 30)
  return ThemeIsDark.value
    ? `rgba(16,24,40,${opacity})` // dark:bg-gray-900
    : `rgba(251,249,250,${opacity})` // bg-gray-50
})
// 用户背景图片放大效果逻辑
const html = document.documentElement
const pullDistance = ref(0)
let startY = 0
let isTouching = false
useTouch({
  touchstart(e) {
    if (html && html.scrollTop <= 0) {
      isTouching = true
      startY = e.touches[0].clientY
    }
  },
  touchmove(e) {
    if (!isTouching) return
    const deltaY = e.touches[0].clientY - startY
    if (deltaY > 0) {
      pullDistance.value = Math.min(deltaY / 3, 150) // 阻尼为3 最大下拉150px
      if (e.cancelable) e.preventDefault() // 阻止浏览器下拉刷新
    }
  },
  touchend() {
    isTouching = false
    pullDistance.value = 0
  },
})
const userAreaHeight = computed(() => {
  return `${(220 + pullDistance.value) / 100}rem`
})
</script>

<template>
  <!-- 整体 -->
  <div class="h-dvh">
    <!-- 吸顶导航栏 -->
    <div
      :style="{ backgroundColor: showNavBgc }"
      class="van-nav-bar--fixed top-0 left-0 w-full h-[46px] flex items-center px-[20px] z-20 pointer-events-none"
    >
      <span
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-bold text-gray-800 dark:text-gray-200 pointer-events-auto select-none"
        :style="{ opacity: navTitleOpacity }"
        >{{ user.name }}</span
      >
      <div
        :class="{ 'text-gray-800': !ThemeIsDark && navTitleOpacity }"
        class="flex items-center text-gray-200 gap-[10px] pointer-events-auto ml-auto"
      >
        <r-icon
          @click="handleThemeToggle"
          :icon="
            ThemeIsDark
              ? 'line-md:moon-alt-to-sunny-outline-loop-transition'
              : 'line-md:sunny-outline-to-moon-alt-loop-transition'
          "
          :class="{ 'bg-transparent': navTitleOpacity }"
          class="cursor-pointer"
        />
        <r-icon
          @click="handleSettingsClick"
          icon="ph:gear-six-bold"
          :class="{ 'bg-transparent': navTitleOpacity }"
          class="cursor-pointer"
        />
      </div>
    </div>
    <!-- 顶部用户区域 -->
    <div
      :style="{ height: userAreaHeight }"
      :class="{ 'duration-[0s]': isTouching }"
      class="relative h-[220px] transition-[height] ease-[ease] duration-[.3s] text-white"
    >
      <!-- 背景 -->
      <div class="absolute inset-0 overflow-hidden">
        <img :src="user.bg" class="w-full h-full object-cover blur-[1px]" alt="background" />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
        ></div>
      </div>
      <!-- 内容 -->
      <div class="absolute w-fit left-[24px] flex items-center bottom-[60px]">
        <img
          :src="user.avatar"
          class="w-[88px] h-[88px] rounded-full border-[3px] border-white/80"
          alt="avatar"
        />
        <div class="ml-[16px] flex flex-col justify-center">
          <h1 class="text-[22px] font-bold">{{ user.name }}</h1>
          <p class="text-[14px] text-white/80">id: {{ user.id }}</p>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div
      ref="mainRef"
      class="relative h-[3000px] bg-gray-50 dark:bg-gray-900 rounded-t-[10px] -mt-[32px] p-[20px]"
    >
      <!-- 操作区 -->
      <div class="grid grid-cols-4 gap-[16px]">
        <div
          v-for="action in actions"
          :key="action.label"
          class="flex flex-col items-center gap-[8px]"
        >
          <div
            class="w-[56px] h-[56px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-[16px]"
          >
            <r-icon :icon="action.icon" class="text-[28px] text-gray-700 dark:text-gray-300" />
          </div>
          <p class="text-[12px] text-gray-800 dark:text-gray-200">{{ action.label }}</p>
        </div>
      </div>
      <!-- 作品区 -->
      <div class="mt-[24px]">
        <div class="flex justify-between items-center mb-[16px]">
          <h2 class="text-[18px] font-bold text-gray-900 dark:text-white">我的作品</h2>
          <span class="text-[14px] text-gray-500 dark:text-gray-400">查看全部 ></span>
        </div>
        <div class="grid grid-cols-3 gap-[8px]">
          <img
            v-for="(work, index) in works"
            :key="index"
            :src="work"
            class="w-full h-auto aspect-[3/4] object-cover rounded-[12px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
