const express = require('express');
const router = express.Router();

// 数据校验
const expressJoi = require('@escook/express-joi');
const schemaUser = require('../schema/user');
// 服务
const userService = require('../services/user.service');

/**
 * 新增注册用户
 * @route POST /api/users/create
 * @group 用户管理 
 * @body {account: string, password: string, name: string, state: } 
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(schemaUser.create_limit), userService.create);

/**
 * 删除用户信息
 * @route POST /api/users/delete
 * @group 用户管理
 * @param {number} id - 请输入USERID
 * @returns {object} 0 - user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.delete("/delete/:id", userService.delete);

/**
 * 修改用户
 * @route PATCH /api/users/update
 * @group 用户管理
 * @body {account: string, password: string, name: string, state: } 
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.patch('/update', expressJoi(schemaUser.update_limit), userService.update);

/**
 * 查询用户
 * @route GET /api/users
 * @group 用户管理
 * @param {string} name
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/', userService.search);


/**
 * 查询用户
 * @route GET /api/users/userInfo
 * @group 用户管理
 * @param {string} name
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get('/userInfo', userService.getUser);

module.exports = router;