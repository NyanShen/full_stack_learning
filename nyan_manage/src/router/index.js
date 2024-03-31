import {
	createRouter,
	createWebHistory
} from 'vue-router';
import Layout from "../layout/index.vue"; // 全局布局
import Hello from "@views/hello.vue";
import Login from "@views/login.vue";

const routes = [
	// Define your routes here
	{
		path: "/login",
		component: Login
	},
	{
		path: "/hello",
		component: Hello
	},
	{
		path: "/",
		component: Layout,
		name: "container",
		redirect: "home",
		meta: {
			requiresAuth: true, // 有一些页面是否登录才能进去
			name: "首页",
		},
		children: [{
			path: "/home",
			name: "home",
			component: () => import("@views/home.vue"),
			meta: {
				requiresAuth: true, //有一些页面是否登录才能进去
				name: "首页",
			},
		}, ],
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;