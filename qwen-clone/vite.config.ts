import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    },
    // 预渲染首页
    ssr: false,
    target: 'esnext'
  },
  // 为了支持SSG，我们可以使用自定义插件或脚本
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})