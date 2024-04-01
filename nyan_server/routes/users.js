const express = require('express');
const router = express.Router();
const db = require("../models/index.js");
const Users = require("../controllers/users.controller.js");

/* GET users listing. */
router.get('/', async function(req, res, next) {
	const result = await db.user.findAll();
	res.send({
		data: result,
		code: 200,
		msg: "操作成功"
	});
});
/**
 * 创建用户
 */
router.post('/create', Users.create);

module.exports = router;