import $http from "../index";

export const fetchUsers = () => {
	return $http({
		url: "/users",
		method: "GET",
		data: {}
	})
}

export const fetchMenus = () => {
	return $http({
		url: "/menus",
		method: "GET",
		data: {}
	})
}

export const createRole = (data) => {
	return $http({
		url: "/roles/create",
		method: "POST",
		data
	})
}