const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const categorySchema = require('../../schema/onlineOrder/category');
// 菜品类别服务
const categoryService = require('../../services/onlineOrder/category.service');

/* 
 * 新增菜品类别对象
 * @route GET /api/onlineOrder/categories/create
 * @group 菜品类别管理 - 新增
 * @param {object}
 * @returns {object} 0 - category object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(categorySchema.create_limit), categoryService.create);

/**
 * 修改菜品
 * @route PATCH /api/onlineOrder/categories/update
 * @group 在线订单-菜品类别
 * @returns {object} 200 - 
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(categorySchema.update_limit), categoryService.update);

/**
 * 查询菜品类别
 * @route GET /api/onlineOrder/categories
 * @group 菜品类别管理 - list of category
 * @param {string} - name - category 
 * @returns {object} 200 - category list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', categoryService.search);


/**
 * 查询菜品选项
 * @route GET /api/onlineOrder/categories/options
 * @group 菜品管理 - list of categories
 * @param {string} - name - category 
 * @returns {object} 200 - categories list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/options', categoryService.searchOptions);

module.exports = router;