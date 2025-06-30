import { Rollup } from 'vite'
export default function rollupOptions(): Rollup.RollupOptions {
  return {
    output: {
      entryFileNames: 'js/[name]-[hash].js',
      chunkFileNames: 'js/[name]-[hash].js',
      assetFileNames(chunkInfo) {
        const name = chunkInfo.names[0]
        if (name.endsWith('.css')) return 'css/[name]-[hash][extname]'
        const imgExt = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'avif']
        if (imgExt.some((ext) => name.endsWith(`.${ext}`))) return 'img/[name]-[hash][extname]'
        return 'assets/[name]-[hash][extname]'
      },
      // 分包策略优化
      manualChunks: {
        'vue-vendor': ['vue', 'vue-router', 'pinia'],
        'ui-vendor': ['vant'],
        'utils': ['@vueuse/core'],
      },
    },
  }
}
