const express = require('express');
const router = express.Router();
const db = require("../models/index");
const DAO = require("../utils/dao.js");
const menuService = require("../services/menu.service.js");

/**
 * 查询菜单
 * @route GET /api/menus
 * @group 菜单管理 - list of menus
 * @param {string} - title - 
 * @returns {object} 200 - menu list
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
// router.get('/', menuService.search);
/* 
 * 新增菜单对象
 */

/**
 * 更新菜单信息列表
 * @route POST /api/menus/update
 * @group 菜单管理 - list of menus
 * @param {string} id.query.required - 请输入菜单ID
 * @returns {object} 200 - menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
// router.post('/update', menuService.update);
/**
 * 删除菜单信息
 * @route POST /api/menus/delete
 * @group 菜单管理 - delete of menus
 * @param {number} id - 请输入菜单ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - menu info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
// router.delete("/delete/:id", menuService.delete);
/* 
 * 分页查询
 * query?param=
 * params/:param
 * body{param}
 */


module.exports = router;