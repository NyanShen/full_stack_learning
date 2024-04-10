import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import Layout from "../layout/index.vue"; // 全局布局
import Hello from "@views/hello.vue";
import Login from "@views/login/index.vue";

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

/**
 * 路由监听
 */
import NProgress from "nprogress";
import { getToken } from "@common/cookies";
import { useUserStore } from "@store/userStore";
NProgress.configure({ showSpinner: false });
const whiteList = ['/login', '/register'];
router.beforeEach(async (to, from, next) => {
	console.log("to path", to.path)
	// 如果有token
	if (getToken()) {
		if (to.path === '/login') {
			next({ path: '/' });
			NProgress.done();
			return
		}
		// 白名单内页面直接进入
		if (whiteList.indexOf(to.path) !== -1) {
			next();
			return
		}
		// 需要使用时获取, 不能在顶部获取否则pinia未引入app应用程序中
		const userStore = useUserStore();
		// 判断是否有缓存, 没有缓存重新请求, 有没有对应的权限
		if (userStore.roles.length === 0) {
			// 获取用户信息
			await userStore.loadUser();
			next();
		}
		// 有缓存直接进入
		else {
			next();
		}
	}
	// 如果没有token, 白名单内页面直接进入, 否则全部重定向到登录页
	else {
		if (whiteList.indexOf(to.path) !== -1) {
			next();
		} else {
			next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
			NProgress.done();
		}
	}

})

export default router;