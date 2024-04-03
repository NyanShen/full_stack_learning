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
// common css
import '@styles/common.scss'

/**
 * 图标库FontAwesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 将所需图标加入库中
library.add(fas)

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(ElementPlus)
app.use(router)
// 注册FontAwesomeIcon组件
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')