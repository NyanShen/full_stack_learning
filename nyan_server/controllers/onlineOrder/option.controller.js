const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const optionSchema = require('../../schema/onlineOrder/option');
// 菜品选项服务
const optionService = require('../../services/onlineOrder/option.service');

/* 
 * 新增菜品选项对象
 * @route GET /api/onlineOrder/categories/create
 * @group 菜品选项管理 - 新增
 * @param {object}
 * @returns {object} 0 - option object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(optionSchema.create_limit), optionService.create);

/**
 * 修改菜品
 * @route PATCH /api/onlineOrder/categories/update
 * @group 在线订单-菜品选项
 * @returns {object} 200 - 
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.put('/update', expressJoi(optionSchema.update_limit), optionService.update);

/**
 * 查询菜品选项
 * @route GET /api/onlineOrder/categories
 * @group 菜品选项管理 - list of option
 * @param {string} - name - option 
 * @returns {object} 200 - option list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', optionService.search);


/**
 * 查询菜品选项
 * @route GET /api/onlineOrder/categories/options
 * @group 菜品管理 - list of categories
 * @param {string} - name - option 
 * @returns {object} 200 - categories list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/options', optionService.searchOptions);

module.exports = router;