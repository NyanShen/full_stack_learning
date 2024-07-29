const express = require('express');
const router = express.Router();

router.use('/captcha', require('./captcha.route'));

module.exports = router;