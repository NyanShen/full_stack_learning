const express = require('express');
const router = express.Router();
// api/system/user
router.use('/user', require('./user.route'));

// api/system/role
router.use('/role', require('./role.route'));

// api/system/permission
router.use('/permission', require('./permission.route'));

module.exports = router;