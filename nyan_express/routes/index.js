const express = require('express');
const router = express.Router();
const sequelize = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/**
 Testing the connection
 */
router.get('/testDBConnect', async function (req, res, next) {
  try {
    await sequelize.authenticate();
    res.json('Connection has been established successfully.')
  } catch (e) {
    res.json(`Unable to connect to the database:${e}`)
  }
});
// 用户注册
router.get('/system/user/register', function (req, res, next) {
  res.render('system/user_register', { title: "注册用户"});
});
// 角色创建
router.get('/system/role/create', function (req, res, next) {
  res.render('system/role_create', { title: ""});
});
// 用户更新
router.get('/system/user/update', function (req, res, next) {
  res.render('system/user_update', { title: ""});
});

module.exports = router;
