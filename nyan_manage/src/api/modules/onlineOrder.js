import $http from "../index";
/**
 * 查询菜品分类
 */
export const fetchCategoryList = (params) => {
	return $http({
		method: 'GET',
		url: '/onlineOrder/categories',
		params,
	})
}
/**
 * 查询菜品分类角色权限
 */
export const fetchCategoryPermissionList = (params) => {
	return $http({
		method: 'GET',
		url: '/onlineOrder/categories/searchPermissionsByCategoryId',
		params,
	})
}

/**
 * 创建菜品分类
 */
export const createCategory = (data) => {
	return $http({
		method: 'POST',
		url: '/onlineOrder/categories/create',
		data,
	})
}

/**
 * 更新菜品分类
 */
export const updateCategory = (data) => {
	return $http({
		method: 'PUT',
		url: '/onlineOrder/categories/update',
		data,
	})
}

/**
 * 删除菜品分类
 */
export const removeCategory = (data) => {
	return $http({
		method: 'DELETE',
		url: '/onlineOrder/categories/remove/' + data.id,
		data: {},
	})
}