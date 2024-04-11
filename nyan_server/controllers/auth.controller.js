// 路由实例
const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const { login_limit } = require('../schema/login');
// 授权服务
const authService = require('../services/auth.service');
/**
 * @name 登录
 * @route POST /api/auth/signin
 * @function 对登录的数据进行校验
 * @author NyanShen
 * @param {account, password}
 */
router.post('/signin', expressJoi(login_limit), authService.singin);

/**
 * @name 生成图形验证码
 * @route POST /api/auth/captcha
 * @function 生成图形验证码给前端
 * @author NyanShen
 * @param captcha
 */
router.get('/captcha', authService.captcha);

module.exports = router;