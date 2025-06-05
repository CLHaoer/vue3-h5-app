import type { NavBarProps } from 'vant'
import { isObject } from '@vueuse/core'
import { useRouter } from 'vue-router'
export type NavbarPropsPlus = NavBarProps & {
  onClickLeft?: ((event: MouseEvent) => unknown) | undefined
  onClickRight?: ((event: MouseEvent) => unknown) | undefined
}
export type NavBarSlots = {
  title?: () => VNode | Component
  left?: () => VNode | Component
  right?: () => VNode | Component
}
export const useNavbar = defineStore('navbar', () => {
  const route = useRoute()
  const router = useRouter()
  const appTitle = import.meta.env.VITE_APP_TITLE
  const [navbarConfig, resetConfig] = resetRef<NavbarPropsPlus>({
    fixed: true,
    border: true,
    leftDisabled: false,
    rightDisabled: false,
    leftArrow: true,
    placeholder: true,
    safeAreaInsetTop: true,
    clickable: true,
    zIndex: 999,
    onClickLeft() {
      router.back()
    },
  })
  const isShow = ref(false)
  const setNavConfig = (options: Partial<NavbarPropsPlus>) => {
    navbarConfig.value = Object.assign(unref(navbarConfig), options)
  }
  const [slots, resetSlots] = resetRef<NavBarSlots>({})
  const setSlots = (options: NavBarSlots) => {
    slots.value = Object.assign(unref(slots), options)
  }
  watchEffect((onCleanup) => {
    const cleanup = () => {
      resetConfig()
      resetSlots()
    }
    onCleanup(cleanup)

    const navbar = route.meta?.navbar
    if (isObject(navbar) && navbar)
      setNavConfig({
        ...navbar,
        title: navbar?.title ?? route.meta?.title ?? appTitle,
      })
    else
      setNavConfig({
        title: route.meta?.title ?? appTitle,
      })
    isShow.value = !!navbar
  })
  return {
    isShow,
    navbarConfig,
    setNavConfig,
    resetConfig,
    slots,
    setSlots,
  }
})
