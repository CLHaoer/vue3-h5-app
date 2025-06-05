export {} // needed in .d.ts files
// route.meta 元数据类型重覆盖重新
// 主要排除掉插件‘unplugin-vue-router’中 route.meta.loaders类型
import { NavBarProps } from 'vant'
type NavBar = Partial<NavBarProps> & {
  onCLickLeft?: (ev?: MouseEvent) => void
  onCLickRight?: (ev?: MouseEvent) => void
}
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    keepAlive?: boolean
    navbar?: NavBar | boolean
    tabBar?: boolean
  }
}
