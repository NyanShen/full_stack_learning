const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const orderMenuSchema = require('../../schema/orderSystem/menu');
// 菜单服务
const orderMenuService = require('../../services/orderSystem/menu.service');

/* 
 * 新增菜单对象
 * @route GET /api/menus/create
 * @group 菜单管理 - 新增
 * @param {object}
 * @returns {object} 0 - menu object
 * @returns {object} 605 | -1 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(orderMenuSchema.create_limit), orderMenuService.create);

/**
 * 查询菜单
 * @route GET /api/menus
 * @group 菜单管理 - list of menus
 * @param {string} - name - category 
 * @returns {object} 200 - menu list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', orderMenuService.search);

module.exports = router;