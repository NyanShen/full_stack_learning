const express = require('express');
const router = express.Router();
const db = require("../models/index.js")
const Roles = require("../controllers/roles.controller.js");

/* 
 * @param name
 * @param desc
 */
router.post('/create', async function(req, res, next) {
	const role = await db.role.create(req.body);
	res.send({
		code: 200,
		data: null,
		msg: `create role  succeefully`,
	});
});
/**
 * 创建角色菜单关联
 * @param name
 * @param desc
 * @param menuIds
 */
router.post('/createPemission', Roles.create);

/**
 * 创建角色菜单关联
 * @param name
 */
router.post('/findRole', Roles.findOne);


module.exports = router;