const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');

/**
 * @api {post} /api/system/role/create 创建角色
 * @apiGroup User
 */
router.post('/create', roleController.create);

module.exports = router;