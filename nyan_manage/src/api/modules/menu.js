import $http from "../index";
/**
 * 查询树形结构菜单
 */
const fetchMenuTree = (data = {}) => {
	return $http({
		method: 'GET',
		url: '/menus/tree',
		data,
	})
}