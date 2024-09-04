import $http from "../index";

/**
 * 获取图形验证码
 */
export const getCaptcha = () => {
	return $http({
		url: "/auth/captcha",
		method: "GET",
	})
}
/**
 * 登录用户信息
 */
export const signin = (data) => {
	return $http({
		url: "/auth/signin",
		method: "POST",
		data
	})
}
/**
 * 获取用户信息
 */
export const fetchUser = () => {
	return $http({
		url: "/system/user/loginUser",
		method: "GET",
	})
}
/**
 * 获取用户信息
 */
export const fetchUserList = () => {
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
/**
 * 更新用户
 */
export const updateUser = (data) => {
	return $http({
		url: "/users/update",
		method: "PUT",
		data
	})
}

/**
 * 创建用户
 */
export const removeUser = (data) => {
	return $http({
		url: "/users/delete/" + data.id,
		method: "DELETE",
	})
}

/**
 * 获取用户角色
 */
export const fetchUserRoleList = (params) => {
	return $http({
		url: "/users/searchRolesByUserId",
		method: "GET",
		params
	})
}