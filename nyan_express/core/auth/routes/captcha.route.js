const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captcha.controller');
/**
 * @api {get} /auth/captcha 获取验证码
 */
router.get('/', captchaController.generateCaptcha);

module.exports = router;