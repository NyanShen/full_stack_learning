import $http from "../index";
/**
 * 查询部门
 */
export const fetchDeparmentList = (params) => {
    return $http({
        method: 'GET',
        url: '/departments',
        params,
    })
}

/**
 * 创建部门
 */
export const createDeparment = (data) => {
    return $http({
        method: 'POST',
        url: '/departments/create',
        data,
    })
}

/**
 * 更新部门
 */
export const updateDeparment = (data) => {
    return $http({
        method: 'PUT',
        url: '/departments/update',
        data,
    })
}

/**
 * 删除部门
 */
export const removeDeparment = (data) => {
    return $http({
        method: 'DELETE',
        url: '/departments/delete/' + data.id,
        data: {},
    })
}
/**
 * 查询部门角色
 */
export const fetchDeparmentRoleList = (data) => {
    return $http({
        method: 'GET',
        url: '/departments/delete/' + data.id,
        data: {},
    })
}