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

module.exports = router;