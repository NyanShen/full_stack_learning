/**
 * 构造树型结构数据
 * @param {*} list 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function formatTree(list, id = 'id', parentId = 'parentId', children = 'children') {
	let config = {
		id,
		parentId,
		childrenList: children
	};

	let childrenListMap = {}; // 相同parentId的对象集合
	let nodeIds = {}; // 相同id的对象集合
	let tree = []; // 根结点列表

	for (let item of list) {
		let parentId = item[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		childrenListMap[parentId].push(item);

		let nodeId = item[config.id]
		nodeIds[nodeId] = item;
	}

	for (let item of list) {
		let parentId = item[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(item);
		}
	}

	for (let item of tree) {
		adaptToChildrenList(item);
	}

	function adaptToChildrenList(obj) {
		if (childrenListMap[obj[config.id]] !== null) {
			obj[config.childrenList] = childrenListMap[obj[config.id]];
		}
		if (obj[config.childrenList]) {
			for (let item of obj[config.childrenList]) {
				adaptToChildrenList(item);
			}
		}
	}
	return tree;
}
/**
 * 由菜单树转换成路由树动态路由
 * @param {*} menuData 
 */
export function generateRoutes(router, menuData, pname = '') {
	menuData.forEach((menuItem) => {
		let route = {}
		// 一级菜单
		if (menuItem.pid === 0 && menuItem.component) {
			route = {
				path: `/`,
				component: () => import(/* @vite-ignore */ `../layout/index.vue`),
				redirect: `${menuItem.path}`,
				meta: {
					title: menuItem.name,
					noCache: menuItem.noCache,
				},
				children: [
					{
						path: `${menuItem.path}`,
						name: menuItem.path,
						component: () => import(/* @vite-ignore */ `../views${menuItem.component}.vue`), // @vite-ignore 忽略 vite 的解析, 否则会报错, just for vite, 不然加载组件失败
						meta: {
							title: menuItem.name,
							noCache: menuItem.noCache,
						}
					}
				]
			};
			router.addRoute(route);
		} else {
			route = {
				path: `/${menuItem.path}`,
				name: pname ? `${pname}-${menuItem.path}` : menuItem.path,
				component: () => import(/* @vite-ignore */ `../views${menuItem.component}.vue`), // @vite-ignore 忽略 vite 的解析, 否则会报错, just for vite, 不然加载组件失败
				meta: {
					title: menuItem.name,
					noCache: menuItem.noCache,
				},
			};
			/**
			 * 如果是根菜单，使用layout组件作为父组件
			 */
			if (!menuItem.component) {
				route.component = () => import(/* @vite-ignore */ `../layout/index.vue`);
			}
			/**
			 * 如果是子菜单，使用父组件作为父组件
			 */
			if (pname) {
				route.path = menuItem.path;
				router.addRoute(pname, route);
			} else {
				router.addRoute(route);
			}
			// 递归
			if (menuItem.children && menuItem.children.length > 0) {
				// 如果有子菜单，构建嵌套路由
				generateRoutes(router, menuItem.children, menuItem.path);
			}
		}

	});
}

