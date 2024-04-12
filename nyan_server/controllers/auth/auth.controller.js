// 路由实例
const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const schemaAuth = require('../../schema/auth/login');
// 授权服务
const userService = require('../../services/system/user.service');
const authService = require('../../services/auth/auth.service');

/**
 * 注册用户
 * @route POST /api/users/create
 * @group 用户管理 
 * @body {account: string, password: string, name: string, state: } 
 * @returns {object} 200 - An array of user info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post('/register', expressJoi(schemaAuth.register_limit), userService.register);

/**
 * @name 登录
 * @route POST /api/auth/signin
 * @function 对登录的数据进行校验
 * @author NyanShen
 * @param {account, password}
 */
router.post('/signin', expressJoi(schemaAuth.login_limit), authService.singin);

/**
 * @name 生成图形验证码
 * @route POST /api/auth/captcha
 * @function 生成图形验证码给前端
 * @author NyanShen
 * @param captcha
 */
router.get('/captcha', authService.captcha);

module.exports = router;