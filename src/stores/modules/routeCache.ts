import type { RouteRecordName, RouteLocationNormalized } from 'vue-router'
export const useRouteStore = defineStore('keepAlivePage', () => {
  const keepAlivePages = shallowRef<RouteRecordName[]>([])
  const setKeepAlivePage = (page: RouteLocationNormalized) => {
    if (!page.meta?.keepAlive || keepAlivePages.value.includes(page.name)) return
    return keepAlivePages.value.push(page.name)
  }
  return {
    keepAlivePages,
    setKeepAlivePage,
  }
})
