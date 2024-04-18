import $http from "../index";
/**
 * 查询树形结构权限
 */
export const fetchPermissionList = (params) => {
    return $http({
        method: 'GET',
        url: '/permissions',
        params,
    })
}
/**
 * 查询树形结构权限
 */
export const fetchPermissionMenus = (params) => {
    return $http({
        method: 'GET',
        url: '/permissions/searchMenusByPermissionId',
        params,
    })
}
/**
 * 查询权限对应的路由
 */
export const fetchUserMenus = (params) => {
    return $http({
        method: 'GET',
        url: '/permissions/getMenus',
        params,
    })
}

/**
 * 创建权限
 */
export const createPermission = (data) => {
    return $http({
        method: 'POST',
        url: '/permissions/create',
        data,
    })
}

/**
 * 更新权限
 */
export const updatePermission = (data) => {
    return $http({
        method: 'PUT',
        url: '/permissions/update',
        data,
    })
}

/**
 * 删除权限
 */
export const deletePermission = (data) => {
    return $http({
        method: 'DELETE',
        url: '/permissions/delete/' + data.id,
        data: {},
    })
}

/**
 * 更新权限--分配菜单
 * id
 * menuIds
 */
export const assignMenus = (data) => {
    return $http({
        method: 'PATCH',
        url: '/permissions/assignMenus',
        data,
    })
}