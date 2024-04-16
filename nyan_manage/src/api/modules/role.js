import $http from "../index";
/**
 * 查询树形结构菜单
 */
export const fetchRoleList = (params) => {
	return $http({
		method: 'GET',
		url: '/roles',
		params,
	})
}
/**
 * 查询角色权限
 */
export const fetchRolePermissionList = (params) => {
	return $http({
		method: 'GET',
		url: '/roles/searchPermissionsByRoleId',
		params,
	})
}

/**
 * 创建菜单
 */
export const createRole = (data) => {
	return $http({
		method: 'POST',
		url: '/roles/create',
		data,
	})
}

/**
 * 更新菜单
 */
export const updateRole = (data) => {
	return $http({
		method: 'PUT',
		url: '/roles/update',
		data,
	})
}

/**
 * 删除菜单
 */
export const removeRole = (data) => {
	return $http({
		method: 'DELETE',
		url: '/roles/remove/' + data.id,
		data: {},
	})
}