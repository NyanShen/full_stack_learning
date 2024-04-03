import $http from "../index";
/**
 * 查询树形结构菜单
 */
export const fetchMenuList = (params) => {
	console.log("fetchMenuList", params);
	return $http({
		method: 'GET',
		url: '/menus',
		params,
	})
}

/**
 * 创建菜单
 */
export const createMenu = (data ) => {
	return $http({
		method: 'POST',
		url: '/menus/create',
		data,
	})
}

/**
 * 更新菜单
 */
export const updateMenu = (data ) => {
	return $http({
		method: 'POST',
		url: '/menus/update',
		data,
	})
}

/**
 * 删除菜单
 */
export const deleteMenu = (data ) => {
	return $http({
		method: 'DELETE',
		url: '/menus/delete/' + data.id,
		data: {},
	})
}