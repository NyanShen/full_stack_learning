import $http from "../index";
/**
 * 查询部门
 */
export const fetchPermissionList = (params) => {
    return $http({
        method: 'GET',
        url: '/departments',
        params,
    })
}

/**
 * 创建部门
 */
export const createPermission = (data) => {
    return $http({
        method: 'POST',
        url: '/departments/create',
        data,
    })
}

/**
 * 更新部门
 */
export const updatePermission = (data) => {
    return $http({
        method: 'PUT',
        url: '/departments/update',
        data,
    })
}

/**
 * 删除部门
 */
export const deletePermission = (data) => {
    return $http({
        method: 'DELETE',
        url: '/departments/delete/' + data.id,
        data: {},
    })
}