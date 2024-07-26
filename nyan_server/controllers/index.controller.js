const express = require('express');
const db = require("../models/index.js");

const router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	db.testConnection()
		.then(() => {
			res.render('index', {
				title: 'Express and Squelize, test mysql connection ok!'
			});
		})
		.catch((error) => {
			res.render('error', {
				message: "connect mysql error!",
				error: {
					status: "400",
					stack: error
				}
			});
		})

});

router.get('/order', function(req, res, next) {
	res.render('orderform', {
		title: "创建订单"
	});
})

router.get('/paymethod', function(req, res, next) {
	res.render('paymethod', { });
})

router.get('/customer', function(req, res, next) {
	res.render('customer', { });
})

module.exports = router;