import type { TabbarProps, TabbarItemProps } from 'vant'
export type TabbarPropsPlus = TabbarProps & {
  onChange?: ((active: number | string) => unknown) | undefined
  'onUpdate:modelValue'?: ((value: string | number) => unknown) | undefined
}
export const useTabbar = defineStore('tabbar', () => {
  const route = useRoute()
  const tabbarList = ref<TabbarItemProps[]>([
    {
      name: '首页',
      iconPrefix: 'line-md:',
      icon: 'home',
      to: '/home',
      replace: false,
      dot: true,
    },
    {
      name: '我的',
      iconPrefix: 'line-md:',
      icon: 'account',
      to: '/mine',
      replace: false,
      dot: false,
      badge: 101,
    },
  ])
  type TabbarItemName = (typeof tabbarList.value)[number]['name']
  const setTabbarItem = (name: TabbarItemName, options: Partial<TabbarItemProps>) => {
    const currentItem = tabbarList.value.find((item) => item.name === name)
    if (currentItem) Object.assign(currentItem, options)
  }

  const isShow = ref(false)
  const tabbarConfig = ref<TabbarPropsPlus>({
    route: true,
    fixed: true,
    border: true,
    placeholder: true,
    safeAreaInsetBottom: true,
    zIndex: 999,
    modelValue: '',
    'onUpdate:modelValue': (e) => {
      tabbarConfig.value.modelValue = e
    },
  })
  const setTabbarConfig = (options: Partial<TabbarPropsPlus>) => {
    tabbarConfig.value = Object.assign(unref(tabbarConfig), options)
  }
  watchEffect(() => {
    const isInTabPage = tabbarList.value.some((item) => item.to === route.path)
    isShow.value = !!route.meta?.tabBar || isInTabPage
  })
  return {
    tabbarList,
    setTabbarItem,
    tabbarConfig,
    isShow,
    setTabbarConfig,
  }
})
