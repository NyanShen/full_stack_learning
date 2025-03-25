import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import path from 'path'

export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern", "legacy"
        // 关键配置项
        additionalData: `
          @use "abstracts/_globals.scss" as *;
          @use "abstracts/_mixins" as mix;
        `, // 全局注入
        includePaths: [path.resolve(__dirname, 'src/styles'), "node_modules"] // 简化路径
      }
    }
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  }
})
