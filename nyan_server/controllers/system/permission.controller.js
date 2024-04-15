const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const permissionSchema = require('../../schema/system/permission');
// 服务
const permissionService = require('../../services/system/permission.service');

/**
 * 新增权限
 * @route POST /api/permissions/create
 * @group 权限管理 
 * @body {object } 
 * @returns {object} 200 - An array of permission info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(permissionSchema.create_limit), permissionService.create);


/**
 * 修改权限
 * @route PUT /api/permissions/update
 * @group 权限管理 
 * @body {object } 
 * @returns {object} 200 - An array of permission info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(permissionSchema.update_limit), permissionService.update);

/**
 * 修改权限-分配菜单
 * @route PUT /api/permissions/assignMenus
 * @group 权限管理 
 * @body {object } 
 * @returns {object} 200 - An array of permission info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.patch('/assignMenus', expressJoi(permissionSchema.update_menu_limit), permissionService.assignMenus);

/**
 * 查询权限
 * @route GET /api/permissions
 * @group 权限管理
 * @param {string} name
 * @returns {object} 200 - An array of permission info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', permissionService.search);
/**
 * 查询权限
//  * @route GET /api/permissions/searchMenusByPermissionId
 * @group 权限管理
 * @param {string} name
 * @returns {object} 200 - An array of permission info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/searchMenusByPermissionId', expressJoi(permissionSchema.search_limit), permissionService.searchMenusByPermissionId);

module.exports = router;