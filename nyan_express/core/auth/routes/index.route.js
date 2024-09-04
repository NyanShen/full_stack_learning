const express = require('express');
const router = express.Router();

router.use('/captcha', require('./captcha.route'));
router.use('/signin', require('./signin.route'));

module.exports = router;