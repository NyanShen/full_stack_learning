import $http from "../index";
/**
 * 获取用户信息
 */
export const fetchUsers = () => {
	return $http({
		url: "/users",
		method: "GET",
		data: {}
	})
}

/**
 * 创建用户
 */
export const createUser = (data) => {
	return $http({
		url: "/users/create",
		method: "POST",
		data
	})
}
export const fetchMenus = () => {
	return $http({
		url: "/menus",
		method: "GET",
		data: {}
	})
}
/**
 * 获取角色列表
 */
export const fetchRoles = () => {
	return $http({
		url: "/roles",
		method: "GET",
		data: {}
	})
}
/**
 * 创建角色
 */
export const createRole = (data) => {
	return $http({
		url: "/roles/create",
		method: "POST",
		data
	})
}