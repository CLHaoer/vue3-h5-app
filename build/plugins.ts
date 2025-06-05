import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite'

export default function createVitePlugins(env: Record<string, string>): PluginOption[] {
  console.log('Vite plugins loaded with environment', env)
  return [
    // https://uvr.esm.is/introduction.html
    VueRouter({
      routesFolder: 'src/views',
      dts: 'src/@types/typed-router.d.ts',
    }),
    // ⚠️ Vue must be placed after VueRouter()
    vue(),
    // https://devtools.vuejs.org/guide/vite-plugin
    env.VITE_OPEN_DEVTOOLS !== 'false' && vueDevTools(),
    // https://github.com/unplugin/unplugin-vue-components#readme
    Components({
      extensions: ['vue'],
      resolvers: [VantResolver()],
      dts: 'src/@types/components.d.ts',
    }),
    // https://github.com/unplugin/unplugin-auto-import#readme
    AutoImport({
      dirs: ['src/composables'],
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs'],
        },
      ],
      dts: 'src/@types/auto-imports.d.ts',
      resolvers: [VantResolver()],
    }),
    // https://tailwind.org.cn/docs/installation/using-vite
    tailwindcss(),
  ]
}
