import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type UserConfig } from 'vite'
import createVitePlugins from './build/plugins'
import rollupOptions from './build/rollup'

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const Root = process.cwd()
  const Env = loadEnv(mode, Root)

  return {
    base: Env.VITE_BASE_URL,
    plugins: createVitePlugins(Env),
    // envPrefix: 'RY',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/variables.scss";',
        },
      },
    },
    build: {
      outDir: Env.VITE_OUT_DIR,
      rollupOptions: rollupOptions(),
    },
  }
})
