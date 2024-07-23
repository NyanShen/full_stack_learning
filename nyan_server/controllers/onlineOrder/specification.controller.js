const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const specificationSchema = require('../../schema/onlineOrder/specification');
// 菜品规格服务
const specificationService = require('../../services/onlineOrder/specification.service');

/* 
 * 新增菜品规格对象
 * @route GET /api/onlineOrder/categories/create
 * @group 菜品规格管理 - 新增
 * @param {object}
 * @returns {object} 0 - specification object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(specificationSchema.create_limit), specificationService.create);

/**
 * 修改菜品
 * @route PATCH /api/onlineOrder/categories/update
 * @group 在线订单-菜品规格
 * @returns {object} 200 - 
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(specificationSchema.update_limit), specificationService.update);

/**
 * 查询菜品规格
 * @route GET /api/onlineOrder/categories
 * @group 菜品规格管理 - list of specification
 * @param {string} - name - specification 
 * @returns {object} 200 - specification list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', specificationService.search);


/**
 * 查询菜品选项
 * @route GET /api/onlineOrder/categories/options
 * @group 菜品管理 - list of categories
 * @param {string} - name - specification 
 * @returns {object} 200 - categories list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/options', specificationService.searchOptions);

module.exports = router;