const router = require('express').Router();
const permissionController = require('../controllers/permission.controller');

router.post('/create', permissionController.create)

module.exports = router
