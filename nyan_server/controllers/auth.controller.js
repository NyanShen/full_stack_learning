// 路由实例
const express = require('express');
const router = express.Router();
// 数据校验
const expressJoi = require('@escook/express-joi');
const { login_limit } = require('../validations/login');
// 授权服务
const authService = require('../services/auth.service');
/**
 * 登录
 * 对登录的数据进行校验
 */
router.post('/signin', expressJoi(login_limit), authService.singin);