<script setup lang="ts">
definePage({
  name: 'home',
  meta: {
    title: '首页',
    keepAlive: true,
  },
})

const githubRepoUrl = 'https://github.com/clhaoer/vue3-h5-app'

const techStack = ref([
  {
    icon: 'logos:vue',
    name: 'Vue 3',
    description: '渐进式 JavaScript 框架',
    url: 'https://cn.vuejs.org/',
  },
  {
    icon: 'logos:vitejs',
    name: 'Vite',
    description: '下一代前端构建工具',
    url: 'https://cn.vitejs.dev/',
  },
  {
    icon: 'logos:typescript-icon',
    name: 'TypeScript',
    description: 'JavaScript 的超集',
    url: 'https://www.typescriptlang.org/',
  },
  {
    icon: 'https://img01.yzcdn.cn/vant/logo.png',
    name: 'Vant 4',
    description: '轻量、可靠的移动端组件库',
    url: 'https://vant-ui.github.io/vant/',
  },
  {
    icon: 'logos:tailwindcss-icon',
    name: 'Tailwind CSS',
    description: '一个功能类优先的 CSS 框架',
    url: 'https://tailwindcss.com/',
  },
  {
    icon: 'logos:pinia',
    name: 'Pinia',
    description: '值得你喜欢的 Vue Store',
    url: 'https://pinia.vuejs.org/',
  },
])

function navigateTo(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="min-h-dvh">
    <!-- Header Section -->
    <div
      class="h-[280px] bg-gradient-to-br from-[#667eea] to-[#764ba2] dark:from-[#323f75] dark:to-[#3b2551] p-[24px] flex flex-col justify-center">
      <div class="flex items-center justify-between">
        <h1 class="text-[28px] font-bold text-white m-0">
          Vue3 H5 Template
        </h1>
        <div
          class="w-[40px] h-[40px] rounded-full bg-white/20 flex items-center justify-center active:scale-[0.95] cursor-pointer"
          @click="navigateTo(githubRepoUrl)">
          <r-icon icon="mdi:github" size="28px" class="text-white" />
        </div>
      </div>
      <p class="text-[14px] text-white/80 mt-[8px] leading-relaxed">
        一个开箱即用的 Vue3 移动端开发模板，助力您快速启动新项目。
      </p>
    </div>

    <!-- Content Section -->
    <div class="p-[16px] -mt-[60px] relative">
      <div class="space-y-[12px]">
        <div v-for="tech in techStack" :key="tech.name"
          class="bg-white dark:bg-gray-800 p-[16px] rounded-[12px] shadow-lg flex items-center gap-[16px] active:scale-[0.98] cursor-pointer transition-all duration-200 ease-in-out"
          @click="navigateTo(tech.url)">
          <r-icon :icon="tech.icon" size="36px" />
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800 dark:text-white">{{ tech.name }}</h3>
            <p class="text-[13px] text-gray-500 dark:text-gray-400 mt-[2px]">{{ tech.description }}</p>
          </div>
          <r-icon icon="mdi:chevron-right" size="24px" color="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>