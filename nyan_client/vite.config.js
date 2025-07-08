import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// for dicom-parser
    	viteCommonjs(),
	],
	// seems like only required in dev mode
	optimizeDeps: {
		exclude: ['@cornerstonejs/dicom-image-loader'],
		include: ['dicom-parser'],
	},
	worker: {
		format: 'es',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // 将'@'设置为项目src目录的别名
			'@api': path.resolve(__dirname, './src/api'), // 为组件目录设置别名
			'@store': path.resolve(__dirname, './src/store'), // 为组件目录设置别名
			'@common': path.resolve(__dirname, './src/common'), // 为组件目录设置别名
			'@views': path.resolve(__dirname, './src/views'), // 为组件目录设置别名
			'@components': path.resolve(__dirname, './src/components'), // 为组件目录设置别名
			'@styles': path.resolve(__dirname, './src/styles'), // 为样式目录设置别名
			// 你可以根据需要继续添加别名
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@styles/variables.scss";` // 这里可以指定全局样式文件
			}
		}
	},
	build: {
		chunkSizeWarningLimit: 1024, // 增大块大小限制
		rollupOptions: {
			output: {
				manualChunks: {
					markdown: ['markdown-it', 'highlight.js'] // 第三方库单独分包
				}
			}
		}
	},
	server: {
		// ...其他服务器配置...
		proxy: {
			'/api': {
				target: 'http://localhost:8000', // 目标服务器地址 => http://localhost:8000/api
				changeOrigin: true, // 改变源到目标服务器
				// rewrite: (path) => path.replace(/^\/api/, '')
				// 其他可选配置...
			}
		}
	}

})