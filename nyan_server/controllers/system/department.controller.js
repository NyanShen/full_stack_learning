const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const deparmentSchema = require('../../schema/system/deparment');
// 部门服务
const deparmentService = require('../../services/system/department.service');

/* 
 * 新增部门对象
 * @route GET /api/departments/create
 * @group 部门管理 - 新增
 * @param {object}
 * @returns {object} 0 - menu object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(deparmentSchema.create_limit), deparmentService.create);

/**
 * 删除部门信息
 * @route POST /api/departments/delete
 * @group 部门管理 - delete of departments
 * @param {number} id - 请输入部门ID
 * @returns {object} 0 - menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
// router.delete("/delete/:id", deparmentService.delete);

/**
 * 更新部门信息列表
 * @route POST /api/departments/update
 * @group 部门管理 - list of departments
 * @param {object} 
 * @returns {object} 0 - menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(deparmentSchema.update_limit), deparmentService.update);

/**
 * 查询部门
 * @route GET /api/departments
 * @group 部门管理 - list of departments
 * @param {string} - title - remark
 * @returns {object} 200 - menu list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', deparmentService.search);

/* 
 * 分页查询
 * query?param=
 * params/:param
 * body{param}
 */


module.exports = router;