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
 * 查询菜品类别
 * @route GET /api/onlineOrder/categories
 * @group 菜品类别管理 - list of category
 * @param {string} - name - category 
 * @returns {object} 200 - category list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', categoryService.search);

module.exports = router;