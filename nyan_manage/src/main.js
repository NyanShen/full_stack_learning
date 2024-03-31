import {
	createApp
} from 'vue'
import {
	createPinia
} from 'pinia'
import ElementPlus from "element-plus"
import App from './App.vue'
// 路由
import router from "./router/index"
// reset css
import '@styles/reset.css'
// element plus css
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')