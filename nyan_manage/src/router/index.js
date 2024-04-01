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
			},
			{
				path: "/role",
				name: "role",
				component: () => import("@views/role/index.vue"),
				meta: {
					requiresAuth: true, //有一些页面是否登录才能进去
					name: "角色管理",
				},
			},
			{
				path: "/user",
				name: "user",
				component: () => import("@views/user/index.vue"),
				meta: {
					requiresAuth: true, //有一些页面是否登录才能进去
					name: "用户管理",
				},
			},
			{
				path: "/menu",
				name: "menu",
				component: () => import("@views/menu/index.vue"),
				meta: {
					requiresAuth: true, //有一些页面是否登录才能进去
					name: "菜单管理",
				},
			},
		],
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;