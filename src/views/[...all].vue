<script setup lang="ts">
definePage({
  name: 'NotFound',
  meta: {
    title: '页面未找到',
    navbar: false,
  },
})

// 路由信息
const route = useRoute()
const router = useRouter()

// 错误信息
const errorInfo = ref({
  code: '404',
  title: '页面走丢了',
  message: '抱歉，您访问的页面不存在或已被移除',
  currentPath: route.fullPath,
})

// 建议操作
const suggestions = ref([
  {
    title: '返回首页',
    desc: '回到首页重新开始',
    icon: 'home-o',
    action: () => router.push('/'),
    primary: true,
  },
  {
    title: '返回上页',
    desc: '回到上一个页面',
    icon: 'arrow-left',
    action: () => router.back(),
    primary: false,
  },
  {
    title: '刷新页面',
    desc: '重新加载当前页面',
    icon: 'replay',
    action: () => window.location.reload(),
    primary: false,
  },
])

// 常用页面链接
const quickLinks = ref([
  { title: '首页', path: '/', icon: 'home-o' },
  { title: '我的', path: '/mine', icon: 'user-o' },
])

// 处理建议操作点击
const handleSuggestionClick = (suggestion: (typeof suggestions.value)[number]) => {
  suggestion.action()
}

// 处理快速链接点击
const handleQuickLinkClick = (link: (typeof quickLinks.value)[number]) => {
  router.push(link.path)
}

// 自动倒计时返回首页
const countdown = shallowRef(10)
useCountdown(countdown, {
  onComplete() {
    router.push('/')
  },
  onTick() {
    countdown.value--
  },
  immediate: true,
})
</script>

<template>
  <div class="min-h-dvh bg-gray-50 dark:bg-gray-900 flex flex-col">
    <!-- 主要内容区域 -->
    <div class="flex-1 flex flex-col items-center justify-center px-[20px] py-[40px]">
      <!-- 404 动画图标 -->
      <div class="error-animation mb-[32px]">
        <div class="text-[120px] font-bold text-blue-500 dark:text-blue-400 leading-none">
          {{ errorInfo.code }}
        </div>
        <div class="floating-elements">
          <div class="floating-dot"></div>
          <div class="floating-dot"></div>
          <div class="floating-dot"></div>
        </div>
      </div>

      <!-- 错误信息 -->
      <div class="text-center mb-[32px]">
        <h1 class="text-[24px] font-bold text-gray-900 dark:text-white mb-[8px]">
          {{ errorInfo.title }}
        </h1>
        <p class="text-[16px] text-gray-600 dark:text-gray-400 mb-[16px] leading-[1.5]">
          {{ errorInfo.message }}
        </p>

        <!-- 当前路径 -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-[8px] p-[12px] inline-block">
          <span class="text-[14px] text-gray-500 dark:text-gray-400">当前路径：</span>
          <code class="text-[14px] text-red-500 dark:text-red-400 font-mono">{{
            errorInfo.currentPath
          }}</code>
        </div>
      </div>

      <!-- 倒计时提示 -->
      <div class="bg-blue-50 dark:bg-blue-900/20 rounded-[12px] p-[16px] mb-[32px] text-center">
        <p class="text-[14px] text-blue-600 dark:text-blue-400">
          <van-icon name="clock-o" class="mr-[4px]" />
          {{ countdown }} 秒后自动返回首页
        </p>
      </div>

      <!-- 建议操作 -->
      <div class="w-full max-w-[320px] mb-[32px]">
        <h3 class="text-[16px] font-semibold text-gray-900 dark:text-white mb-[16px] text-center">
          您可以尝试
        </h3>
        <div class="space-y-[12px]">
          <button
            v-for="(suggestion, index) in suggestions"
            :key="index"
            @click="handleSuggestionClick(suggestion)"
            :class="[
              'w-full flex items-center p-[16px] rounded-[12px] transition-all active:scale-[0.98]',
              suggestion.primary
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700',
            ]"
          >
            <div
              :class="[
                'w-[40px] h-[40px] rounded-[10px] flex items-center justify-center mr-[12px]',
                suggestion.primary ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/30',
              ]"
            >
              <van-icon
                :name="suggestion.icon"
                size="20"
                :class="suggestion.primary ? 'text-white' : 'text-blue-500'"
              />
            </div>
            <div class="flex-1 text-left">
              <div class="text-[16px] font-medium">{{ suggestion.title }}</div>
              <div
                :class="[
                  'text-[12px] mt-[2px]',
                  suggestion.primary ? 'text-white/80' : 'text-gray-500 dark:text-gray-400',
                ]"
              >
                {{ suggestion.desc }}
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- 快速链接 -->
      <div class="w-full max-w-[320px]">
        <h3 class="text-[16px] font-semibold text-gray-900 dark:text-white mb-[16px] text-center">
          快速导航
        </h3>
        <div class="grid grid-cols-2 gap-[12px]">
          <button
            v-for="(link, index) in quickLinks"
            :key="index"
            @click="handleQuickLinkClick(link)"
            class="flex flex-col items-center p-[16px] bg-white dark:bg-gray-800 rounded-[12px] border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
          >
            <div
              class="w-[40px] h-[40px] bg-blue-50 dark:bg-blue-900/30 rounded-[10px] flex items-center justify-center mb-[8px]"
            >
              <van-icon :name="link.icon" size="20" class="text-blue-500" />
            </div>
            <span class="text-[14px] font-medium text-gray-900 dark:text-white">{{
              link.title
            }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="text-center pb-[20px] px-[20px]">
      <p class="text-[12px] text-gray-400 dark:text-gray-500">如果问题持续存在，请联系技术支持</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 404 动画效果 - 复杂动画使用 SCSS
.error-animation {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  // 404 数字动画
  > div:first-child {
    animation: bounce 2s ease-in-out infinite;
    text-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  // 浮动元素容器
  .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;

    .floating-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      opacity: 0.6;

      &:nth-child(1) {
        top: 20%;
        left: 10%;
        animation: float 3s ease-in-out infinite;
      }

      &:nth-child(2) {
        top: 60%;
        right: 15%;
        animation: float 3s ease-in-out infinite 1s;
      }

      &:nth-child(3) {
        bottom: 30%;
        left: 20%;
        animation: float 3s ease-in-out infinite 2s;
      }
    }
  }
}

// 动画关键帧
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

// 按钮悬停效果增强
button {
  &:hover {
    .floating-dot {
      animation-duration: 1.5s;
    }
  }
}

// 深色模式下的特殊效果
:global(.dark) {
  .error-animation > div:first-child {
    text-shadow: 0 4px 8px rgba(96, 165, 250, 0.4);
  }

  .floating-elements .floating-dot {
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
  }
}
</style>
