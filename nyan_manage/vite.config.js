import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // 将'@'设置为项目src目录的别名
			'@api': path.resolve(__dirname, './src/api'), // 为组件目录设置别名
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
	server: {
		// ...其他服务器配置...
		proxy: {
			'/sym': {
				target: 'http://localhost:8888', // 目标服务器地址 => http://localhost:8888/sym
				changeOrigin: true, // 改变源到目标服务器
				// 其他可选配置...
			}
		}
	}

})