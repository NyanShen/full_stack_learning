const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @api {post} /api/system/user/register 注册用户信息
 * @apiGroup User
 */
router.post('/register', userController.register);

/**
 * @api {get} /api/system/user/loginUser 查询用户信息
 * @apiGroup User
 */
router.get('/loginuser', userController.getLoginUser);

/**
 * @api {get} /api/system/user/list 查询用户信息
 * @apiGroup User
 */
router.get('/list', userController.findUsers);

module.exports = router;