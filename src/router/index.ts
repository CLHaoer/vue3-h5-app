import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { useRouteStore } from '@/stores'
import { setTitle } from '@/composables/setTitle.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
if (import.meta.hot) handleHotUpdate(router)
console.log(routes)
// 全局路由拦截
router.beforeResolve((to) => {
  useRouteStore().setKeepAlivePage(to)
  setTitle(to.meta.title)
  return true
})
router.afterEach(() => {})

export default router
