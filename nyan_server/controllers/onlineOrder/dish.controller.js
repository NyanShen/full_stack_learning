const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const dishSchema = require('../../schema/onlineOrder/dish');
// 菜品服务
const dishService = require('../../services/onlineOrder/dish.service');

/* 
 * 新增菜品对象
 * @route GET /api/onlineOrder/dish/create
 * @group 菜品管理 - 新增
 * @param {object}
 * @returns {object} 0 - menu object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(dishSchema.create_limit), dishService.create);

/**
 * 查询菜品
 * @route GET /api/menus
 * @group 菜品管理 - list of menus
 * @param {string} - name - category 
 * @returns {object} 200 - menu list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', dishService.search);

module.exports = router;