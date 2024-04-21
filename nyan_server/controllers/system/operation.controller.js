const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const operationSchema = require('../../schema/system/operation');
// 操作服务
const operationService = require('../../services/system/operation.service');

/* 
 * 新增操作对象
 * @route GET /api/operations/create
 * @group 操作管理 - 新增
 * @param {object}
 * @returns {object} 0 - operation object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(operationSchema.create_limit), operationService.create);

/**
 * 删除操作信息
 * @route POST /api/operations/delete
 * @group 操作管理 - delete of operations
 * @param {number} id - 请输入操作ID
 * @returns {object} 0 - operation info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.delete("/delete/:id", operationService.delete);

/**
 * 更新操作信息列表
 * @route POST /api/operations/update
 * @group 操作管理 - list of operations
 * @param {object} 
 * @returns {object} 0 - operation info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(operationSchema.update_limit), operationService.update);

/**
 * 查询操作
 * @route GET /api/operations
 * @group 操作管理 - list of operations
 * @param {string} - title - remark
 * @returns {object} 200 - operation list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', operationService.search);


/**
 * 查询操作权限
//  * @route GET /api/roles/searchPermissionsByOperationId
 * @group 操作管理
 * @param {string} name
 * @returns {object} 200 - An array of operation info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/searchPermissionsByOperationId', expressJoi(operationSchema.search_limit), operationService.searchPermissionsByOperationId);

/* 
 * 分页查询
 * query?param=
 * params/:param
 * body{param}
 */


module.exports = router;