import '@/assets/css/main.css'
import '@vant/touch-emulator'
import { createApp, type App as APP } from 'vue'
import { pinia } from '@/stores'
import App from '@/App.vue'
import router from '@/router'
/* --------------------------------
Vant 中有个别组件是以函数的形式提供的，
包括 Toast，Dialog，Notify 和 ImagePreview 组件。
在使用函数组件时，unplugin-vue-components
无法自动引入对应的样式，因此需要手动引入样式。
------------------------------------- */
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

const app = createApp(App)

export const loadPlugins = (instance: APP<Element>): APP<Element> => {
  return instance.use(router).use(pinia)
}

setTimeout(() => {
  loadPlugins(app).mount('#app')
}, 1000)
