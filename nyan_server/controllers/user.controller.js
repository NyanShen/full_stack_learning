const express = require('express');
const router = express.Router();
const userService = require("../services/user.service.js");

// 数据校验
const expressJoi = require('@escook/express-joi');
const { user_limit } = require('../validations/user');
/**
 * 创建用户
 * @route POST /api/users/create
 * @group 用户管理 - list of users
 * @body {account: string, password: string, name: string, state: } 
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/create', expressJoi(user_limit), userService.create);

module.exports = router;