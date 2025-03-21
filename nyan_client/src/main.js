
/**
 * 创建app实例
 */
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

/**
 * 状态库pinia
 */
import { createPinia } from 'pinia'
app.use(createPinia())

/**
 * 路由router
 */
import router from "./router/index"
app.use(router)

/**
 * UI组件 ElementPlus, 引入ICON
 */
import ElementPlus from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale: zhCn })

/**
 * 图标库 FontAwesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 将所需图标加入库中
library.add(fas)
// 注册FontAwesomeIcon组件
app.component('font-awesome-icon', FontAwesomeIcon)

/**
 * 引入自定义插件 plugin
 */
import { plugins } from './plugins/index'
app.use(plugins)
/**
 * 引入自定义指令 directives
 */
import { directives } from './directives/index'
app.use(directives)
/**
 * 引入全局组件
 */
// import DictTag from "@components/DictTag.vue";
// app.component('dict-tag', DictTag);
/**
 * 挂载app
 */
app.mount('#app')

/**
 * 引入相关样式
 */
// reset css
import '@styles/reset.css'
// element plus css
import 'element-plus/dist/index.css'
// reset element css
import '@styles/resetElement.css'
// common css
import '@styles/index.scss'