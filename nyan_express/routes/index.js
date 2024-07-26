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
module.exports = router;
