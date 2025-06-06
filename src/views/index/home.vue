<script setup lang="ts">
import { useTheme } from '@/stores'
definePage({
  name: 'home',
  meta: {
    title: '首页',
    navbar: false,
    keepAlive: true,
  },
})

// 主题切换功能
const themeStore = useTheme()
const { ThemeIsDark } = storeToRefs(useTheme())

// 示例数据 - 实际使用时可替换为API调用
const stats = ref([
  { label: '用户数', value: '1,234', icon: 'friends-o' },
  { label: '订单数', value: '5,678', icon: 'orders-o' },
  { label: '收入', value: '¥12.3K', icon: 'gold-coin-o' },
  { label: '增长率', value: '+15%', icon: 'arrow-up' },
])

const quickActions = ref([
  { id: 1, title: '功能一', icon: 'setting-o', color: '#1989fa' },
  { id: 2, title: '功能二', icon: 'shop-o', color: '#07c160' },
  { id: 3, title: '功能三', icon: 'chart-trending-o', color: '#ff976a' },
  { id: 4, title: '功能四', icon: 'service-o', color: '#ed4014' },
])

// 处理快捷操作点击
const handleActionClick = (action: any) => {
  showToast(`点击了${action.title}`)
}

// 处理统计卡片点击
const handleStatClick = (stat: any) => {
  showToast(`查看${stat.label}详情`)
}

// 处理主题切换
const handleThemeToggle = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 欢迎区域 -->
    <div class="welcome-section relative">
      <div class="text-center text-white py-[40px] px-[20px]">
        <h1 class="text-[24px] font-semibold mb-[8px]">Vue3 H5 模板</h1>
        <p class="text-[14px] opacity-90 mb-[24px] leading-[1.4]">
          基于 Vue3 + Vite + Vant 的移动端开发模板
        </p>

        <!-- 主题切换按钮 -->
        <button @click="handleThemeToggle" class="theme-toggle-btn">
          <r-icon
            :icon="ThemeIsDark ? 'meteocons:moonset-fill' : 'meteocons:sunrise-fill'"
            class="size-[30px]"
          />
          <span class="ml-[4px] text-[14px]">{{ ThemeIsDark ? '浅色模式' : '深色模式' }}</span>
        </button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="p-[16px]">
      <div class="grid grid-cols-2 gap-[12px]">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white dark:bg-gray-800 rounded-[8px] p-[16px] flex items-center shadow-sm cursor-pointer active:scale-[0.98]"
          @click="handleStatClick(stat)"
        >
          <div
            class="w-[40px] h-[40px] bg-gray-100 dark:bg-gray-700 rounded-[50%] flex items-center justify-center mr-[12px]"
          >
            <van-icon :name="stat.icon" size="20" class="text-blue-500" />
          </div>
          <div class="flex-1">
            <div class="text-[18px] font-semibold text-gray-900 dark:text-white mb-[2px]">
              {{ stat.value }}
            </div>
            <div class="text-[12px] text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="px-[16px] pb-[16px]">
      <div class="py-[16px]">
        <h3 class="text-[16px] font-semibold text-gray-900 dark:text-white m-0">快捷操作</h3>
      </div>
      <van-grid :column-num="2" :border="false" class="gap-[12px]">
        <van-grid-item
          v-for="action in quickActions"
          :key="action.id"
          @click="handleActionClick(action)"
          class="bg-white dark:bg-gray-800 rounded-[8px] overflow-hidden !flex-[48%] active:scale-[0.98]"
        >
          <div class="p-[20px] flex flex-col items-center text-center">
            <van-icon :name="action.icon" :color="action.color" size="24" />
            <span class="mt-[8px] text-[14px] text-gray-900 dark:text-white font-medium">{{
              action.title
            }}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 模板说明 -->
    <div class="px-[16px] pb-[20px]">
      <van-cell-group class="rounded-[8px] overflow-hidden">
        <van-cell title="技术栈" value="Vue3 + Vite + TypeScript" />
        <van-cell title="UI组件" value="Vant 4.x" />
        <van-cell title="适配方案" value="postcss-mobile-forever" />
        <van-cell title="状态管理" value="Pinia" />
        <van-cell title="路由" value="Vue Router 4" />
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 欢迎区域渐变背景 - 复杂样式使用 SCSS
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  // 主题切换按钮样式 - 复杂的交互效果
  .theme-toggle-btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    color: white;
    font-weight: 500;
    font-size: 14px;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
    cursor: pointer;

    //&:active {
    //  transform: scale(0.95);
    //}

    // 图标动画效果
    .van-icon {
      transition: transform 0.3s ease;
    }
  }
}

// 深度样式修改 - Vant 组件样式定制
:deep(.van-cell-group) {
  .van-cell {
    padding: 12px 16px;

    .van-cell__title {
      font-weight: 500;
      color: var(--van-text-color);
    }

    .van-cell__value {
      color: #1989fa;
      font-size: 13px;
    }
  }
}

// 深色模式下的特殊处理
:deep(.van-grid-item) {
  .van-grid-item__content {
    background: transparent;
  }
}
</style>
