import { Rollup } from 'vite'
export default function rollupOptions(): Rollup.RollupOptions {
  return {
    output: {
      entryFileNames: 'js/[name]-[hash].[format].js',
      chunkFileNames: 'js/[name]-[hash].[format].js',
      assetFileNames(chunkInfo) {
        const name = chunkInfo.names[0]
        if (name.endsWith('.css')) return 'css/[name]-[hash][extname]'
        const imgExt = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico', 'avif']
        if (imgExt.some((ext) => name.endsWith(`.${ext}`))) return 'img/[name]-[hash][extname]'
        return 'assets/[name]-[hash][extname]'
      },
    },
  }
}
