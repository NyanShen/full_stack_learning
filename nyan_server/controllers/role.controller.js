const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const schemaRole = require('../schema/role');
// 角色服务
const roleService = require('../services/role.service');
/**
 * 创建角色
 * @route POST /api/roles/create
 * @group 角色管理 - list of roles
 * @body {name: string, desc: string } 
 * @returns {object} 200 - An array of role
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(schemaRole.create_limit), roleService.create);

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
 * @body {name: string, desc: string } 
 * @returns {object} 200 - An array of role
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.patch('/update', expressJoi(schemaRole.update_limit), roleService.update);


/**
 * 查询用户
 * @route GET /api/roles
 * @group 用户管理 - list of roles
 * @param {string} name
 * @returns {object} 200 - An array of role info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', roleService.search);

module.exports = router
