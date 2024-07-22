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
 * 查询菜品分类选项
 */
export const fetchCategoryOptions = () => {
	return $http({
		method: 'GET',
		url: '/onlineOrder/categories/options',
		params: {},
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
 * 删除菜品
 */
export const removeCategory = (data) => {
	return $http({
		method: 'DELETE',
		url: '/onlineOrder/categories/remove/' + data.id,
		data: {},
	})
}

/**
 * 查询菜品分类
 */
export const fetchDishList = (params) => {
	return $http({
		method: 'GET',
		url: '/onlineOrder/dishes',
		params,
	})
}

/**
 * 创建菜品分类
 */
export const createDish = (data) => {
	return $http({
		method: 'POST',
		url: '/onlineOrder/dishes/create',
		data,
	})
}


/**
 * 更新菜品分类
 */
export const updateDish = (data) => {
	return $http({
		method: 'PUT',
		url: '/onlineOrder/dishes/update',
		data,
	})
}

/**
 * 删除菜品
 */
export const removeDish = (data) => {
	return $http({
		method: 'DELETE',
		url: '/onlineOrder/dishes/remove/' + data.id,
		data: {},
	})
}