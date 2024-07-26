const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/**
 * @api {get} /user/register 注册用户信息
 * @apiGroup User
 */
router.post('/register', userController.register);

/**
 * @api {get} /user/list 查询用户信息
 * @apiGroup User
 */
router.get('/list', userController.findUsers);

module.exports = router;