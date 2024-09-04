const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signin.controller');
/**
 * @api {post} /auth/signin 登陆
 */
router.post('/', signinController.signin);

module.exports = router;