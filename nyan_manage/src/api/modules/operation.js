import $http from "../index";
/**
 * 查询树形结构菜单
 */
export const fetchOperationList = (params) => {
	return $http({
		method: 'GET',
		url: '/operations',
		params,
	})
}
/**
 * 查询角色权限
 */
export const fetchOperationPermissionList = (params) => {
	return $http({
		method: 'GET',
		url: '/operations/searchPermissionsByOperationId',
		params,
	})
}

/**
 * 创建菜单
 */
export const createOperation = (data) => {
	return $http({
		method: 'POST',
		url: '/operations/create',
		data,
	})
}

/**
 * 更新菜单
 */
export const updateOperation = (data) => {
	return $http({
		method: 'PUT',
		url: '/operations/update',
		data,
	})
}

/**
 * 删除菜单
 */
export const removeOperation = (data) => {
	return $http({
		method: 'DELETE',
		url: '/operations/remove/' + data.id,
		data: {},
	})
}