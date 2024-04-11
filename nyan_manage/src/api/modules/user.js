import $http from "../index";

/**
 * 获取图形验证码
 */
export const getCaptcha = () => {
	return $http({
		url: "/auth/captcha",
		method: "GET",
		data: {}
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
		url: "/users/userInfo",
		method: "GET",
		data: {}
	})
}
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