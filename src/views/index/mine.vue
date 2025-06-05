<script setup lang="ts">
import { useTheme } from '@/stores'
import logo from '@/assets/img/test.png'

definePage({
  name: 'mine',
  meta: {
    title: '我的',
    navbar: {
      leftArrow: false,
    },
  },
})

// 主题切换功能
const themeStore = useTheme()
const { ThemeIsDark } = storeToRefs(themeStore)

// 用户信息
const userInfo = ref({
  avatar: logo,
  nickname: 'Vue3开发者',
  level: 'VIP会员',
  phone: '138****8888',
  points: 2580,
  balance: 1299.5,
})

// 统计数据
const userStats = ref([
  { label: '收藏', value: 128, icon: 'star-o', path: '/favorites' },
  { label: '足迹', value: 56, icon: 'clock-o', path: '/history' },
  { label: '关注', value: 23, icon: 'like-o', path: '/following' },
  { label: '粉丝', value: 89, icon: 'friends-o', path: '/followers' },
])

// 菜单列表
const menuList = ref([
  {
    title: '账户管理',
    items: [
      { title: '个人信息', icon: 'contact', path: '/profile', desc: '完善个人资料' },
      { title: '账户安全', icon: 'shield-o', path: '/security', desc: '密码、手机号' },
      {
        title: '实名认证',
        icon: 'certificate',
        path: '/verification',
        desc: '未认证',
        status: 'warning',
      },
    ],
  },
  {
    title: '我的服务',
    items: [
      { title: '我的订单', icon: 'orders-o', path: '/orders', desc: '查看全部订单' },
      { title: '地址管理', icon: 'location-o', path: '/address', desc: '收货地址' },
      { title: '优惠券', icon: 'coupon-o', path: '/coupons', desc: '3张可用', status: 'success' },
      { title: '积分商城', icon: 'gift-o', path: '/points-mall', desc: '兑换好礼' },
    ],
  },
  {
    title: '设置',
    items: [
      { title: '消息通知', icon: 'bell', path: '/notifications', desc: '推送设置' },
      { title: '隐私设置', icon: 'eye-o', path: '/privacy', desc: '隐私保护' },
      { title: '关于我们', icon: 'info-o', path: '/about', desc: '版本信息' },
    ],
  },
])

// 处理菜单点击
const handleMenuClick = (item: any) => {
  showToast(`点击了${item.title}`)
}

// 处理统计点击
const handleStatClick = (stat: any) => {
  showToast(`查看${stat.label}`)
}

// 处理头像点击
const handleAvatarClick = () => {
  showToast('点击头像')
}

// 处理主题切换
const handleThemeToggle = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 用户信息头部 -->
    <div class="user-header">
      <div class="relative px-[20px] pt-[40px] pb-[20px]">
        <!-- 主题切换按钮 -->
        <button
          @click="handleThemeToggle"
          class="absolute top-[40px] right-[20px] theme-toggle-btn"
        >
          <r-icon
            :icon="ThemeIsDark ? 'meteocons:moonset-fill' : 'meteocons:sunrise-fill'"
            class="size-[30px]"
          />
        </button>

        <!-- 用户基本信息 -->
        <div class="flex items-center mb-[20px]">
          <div class="relative" @click="handleAvatarClick">
            <van-image
              :src="userInfo.avatar"
              round
              width="60"
              height="60"
              class="border-2 border-white/20"
            />
            <div
              class="absolute -bottom-[-4px] -right-[4px] w-[20px] h-[20px] bg-green-500 rounded-full border-2 border-white"
            ></div>
          </div>

          <div class="ml-[16px] flex-1">
            <div class="flex items-center mb-[4px]">
              <h2 class="text-[20px] font-semibold text-white mr-[8px]">{{ userInfo.nickname }}</h2>
              <van-tag type="warning">{{ userInfo.level }}</van-tag>
            </div>
            <p class="text-[14px] text-white/80">{{ userInfo.phone }}</p>
          </div>
        </div>

        <!-- 积分余额 -->
        <div class="grid grid-cols-2 gap-[12px] mb-[10px]">
          <div class="bg-white/10 backdrop-blur-sm rounded-[12px] p-[16px] text-center">
            <div class="text-[20px] font-bold text-white">{{ userInfo.points }}</div>
            <div class="text-[12px] text-white/80 mt-[4px]">积分</div>
          </div>
          <div class="bg-white/10 backdrop-blur-sm rounded-[12px] p-[16px] text-center">
            <div class="text-[20px] font-bold text-white">¥{{ userInfo.balance }}</div>
            <div class="text-[12px] text-white/80 mt-[4px]">余额</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户统计 -->
    <div
      class="bg-white dark:bg-gray-800 mx-[16px] rounded-[12px] p-[16px] -mt-[20px] relative z-10 shadow-sm"
    >
      <div class="grid grid-cols-4 gap-[16px]">
        <div
          v-for="stat in userStats"
          :key="stat.label"
          class="text-center cursor-pointer"
          @click="handleStatClick(stat)"
        >
          <van-icon :name="stat.icon" size="24" class="text-blue-500 mb-[8px]" />
          <div class="text-[16px] font-semibold text-gray-900 dark:text-white">
            {{ stat.value }}
          </div>
          <div class="text-[12px] text-gray-500 dark:text-gray-400 mt-[2px]">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <!-- 菜单列表 -->
    <div class="px-[16px] mt-[16px] pb-[20px]">
      <div v-for="(group, groupIndex) in menuList" :key="groupIndex" class="mb-[16px]">
        <!-- 分组标题 -->
        <div class="text-[14px] font-medium text-gray-500 dark:text-gray-400 mb-[8px] px-[4px]">
          {{ group.title }}
        </div>

        <!-- 菜单项 -->
        <div class="bg-white dark:bg-gray-800 rounded-[12px] overflow-hidden">
          <div
            v-for="(item, itemIndex) in group.items"
            :key="itemIndex"
            class="flex items-center p-[16px] cursor-pointer active:bg-gray-50 dark:active:bg-gray-700 transition-colors"
            :class="{
              'border-b border-gray-100 dark:border-gray-700': itemIndex < group.items.length - 1,
            }"
            @click="handleMenuClick(item)"
          >
            <!-- 图标 -->
            <div
              class="w-[40px] h-[40px] bg-blue-50 dark:bg-blue-900/30 rounded-[10px] flex items-center justify-center mr-[12px]"
            >
              <van-icon :name="item.icon" size="20" class="text-blue-500" />
            </div>

            <!-- 内容 -->
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="text-[16px] font-medium text-gray-900 dark:text-white">{{
                  item.title
                }}</span>
                <div class="flex items-center">
                  <!-- 状态标签 -->
                  <van-tag v-if="item.status" :type="item.status" class="mr-[8px]">
                    {{ item.desc }}
                  </van-tag>
                  <span
                    v-else-if="item.desc"
                    class="text-[12px] text-gray-500 dark:text-gray-400 mr-[8px]"
                  >
                    {{ item.desc }}
                  </span>
                  <van-icon name="arrow" size="16" class="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 用户信息头部 - 复杂渐变背景
.user-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;

  // 添加装饰性背景图案
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  // 主题切换按钮样式
  .theme-toggle-btn {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

// 头像点击效果
.van-image {
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }
}

// 统计卡片悬停效果
.grid > div {
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }
}

// 菜单项样式优化
:deep(.van-cell) {
  &:active {
    background-color: var(--van-gray-1);
  }
}

// 状态标签样式
//:deep(.van-tag) {
//  &--warning {
//    background: linear-gradient(45deg, #ff9800, #ff5722);
//    color: white;
//    border: none;
//  }
//
//  &--success {
//    background: linear-gradient(45deg, #4caf50, #2196f3);
//    color: white;
//    border: none;
//  }
//}
</style>
