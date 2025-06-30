/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_URL: string
  readonly VITE_OPEN_DEVTOOLS?: boolean
  readonly VITE_SOURCEMAP?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
