import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import Layout from "../layout/index.vue"; // 全局布局
/**
 * 
/**
 * Note: 路由配置项
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
	noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
	tile: 'name'                  // 设置该路由在侧边栏和面包屑中展示的名字
  }
 * 普通用户路由,不需权限控制的路由
 * 登录、401, 404, error, 403
 * 首页, 个人中心
 */
const commonRoutes = [
	// Define your routes here
	{
		path: "/login",
		name: "login",
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/401',
		name: "401",
		component: () => import('@/views/error/401.vue'),
		hidden: true
	},
	{
		path: "/",
		component: () => import('@/layout/index.vue'),
		redirect: "home",
		meta: {
			tile: "首页",
		},
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@views/home/index.vue"),
				meta: {
					tile: "首页",
				},
			},
			{
				path: "calls",
				name: "calls",
				component: () => import("@views/calls/index.vue"),
				meta: {
					tile: "推理与答案分离输出",
				},
			}
		],
	},
	// {
	// 	path: "/user",
	// 	component: Layout,
	// 	redirect: "noredirect",
	// 	meta: {
	// 		tile: "用户中心",
	// 	},
	// 	children: [
	// 		{
	// 			path: "profile",
	// 			name: "profile",
	// 			component: () => import("@views/user/profile.vue"),
	// 			meta: {
	// 				tile: "用户中心"
	// 			}
	// 		}
	// 	]
	// },
	/**
	 * 
	{
		path: "/system",
		component: Layout,
		redirect: "noredirect",
		meta: {
			tile: "系统管理",
		},
		children: [
			{
				path: "permission",
				component: () => import("@views/system/permission/index.vue"),
				meta: {
					tile: "权限管理",
				},
			},
			{
				path: "department",
				component: () => import("@views/system/department/index.vue"),
				meta: {
					tile: "部门管理",
				},
			},
			{
				path: "user",
				component: () => import("@views/system/user/index.vue"),
				meta: {
					tile: "用户管理",
					icon: ""
				},
			},
			{
				path: "role",
				component: () => import("@views/system/role/index.vue"),
				meta: {
					tile: "角色管理",
				},
			},
			{
				path: "menu",
				component: () => import("@views/system/menu/index.vue"),
				meta: {
					tile: "菜单管理",
				},
			},

			{
				path: "operation",
				component: () => import("@views/system/operation/index.vue"),
				meta: {
					tile: "操作管理",
				},
			},
		]
	},
	*/
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/error/404.vue'),
	},

];

const router = createRouter({
	history: createWebHistory(),
	routes: commonRoutes,
});


router.afterEach(() => {
	// NProgress.done();
});

export default router;