const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const dishSchema = require('../../schema/onlineOrder/dish');
// 菜品服务
const dishService = require('../../services/onlineOrder/dish.service');

/* 
 * 新增菜品对象
 * @route GET /api/onlineOrder/dishes/create
 * @group 菜品管理 - 新增
 * @param {object}
 * @returns {object} 0 - menu object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(dishSchema.create_limit), dishService.create);


/**
 * 修改菜品
 * @route PATCH /api/onlineOrder/dishes/update
 * @group 在线订单-菜品
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(dishSchema.update_limit), dishService.update);

/**
 * 查询菜品
 * @route GET /api/onlineOrder/dishes
 * @group 菜品管理 - list of menus
 * @param {string} - name - category 
 * @returns {object} 200 - menu list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', dishService.search);

module.exports = router;