import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export const pinia = createPinia()
const persistedstate = createPersistedState({
  key: (k) => `vue-h5-demo_${k}`,
  storage: localStorage,
})
pinia.use(persistedstate)

export * from './modules/routeCache.ts'
export * from './modules/useTheme.ts'
export * from './modules/useNavbar.ts'
export * from './modules/useTabbar.ts'

// const modulesFiles = import.meta.glob('./modules/*.ts', {
//   eager: true,
// })
// console.log(modulesFiles)
// const modules = Object.values(modulesFiles).reduce((acc, module) => {
//   return { ...acc, ...module }
// }, {})
// export default modules
