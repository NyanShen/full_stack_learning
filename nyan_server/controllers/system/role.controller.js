const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const roleSchema = require('../../schema/system/role');
// 角色服务
const roleService = require('../../services/system/role.service');
/**
 * 创建角色
 * @route POST /api/roles/create
 * @group 角色管理 - list of roles
 * @body {name: string, remark: string } 
 * @returns {object} 200 - An array of role
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(roleSchema.create_limit), roleService.create);

/**
 * 删除角色信息--考虑用户已关联的角色
 * @route POST /api/roles/delete
 * @group 菜单管理 - delete of role
 * @param {number} id - 请输入角色ID
 * @returns {object} 0 - menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.delete("/delete/:id", roleService.delete);

/**
 * 更新角色
 * @route POST /api/roles/update
 * @group 角色管理 - list of roles
 * @body {name: string, remark: string } 
 * @returns {object} 200 - An array of role
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(roleSchema.update_limit), roleService.update);


/**
 * 查询角色
 * @route GET /api/roles
 * @group 角色管理 - list of roles
 * @param {string} name
 * @returns {object} 200 - An array of role info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', roleService.search);

/**
 * 查询角色权限
//  * @route GET /api/roles/searchPermissionsByRoleId
 * @group 角色管理
 * @param {string} name
 * @returns {object} 200 - An array of role info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/searchPermissionsByRoleId', expressJoi(roleSchema.search_limit), roleService.searchPermissionsByRoleId);


module.exports = router
