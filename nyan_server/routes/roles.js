const express = require('express');
const router = express.Router();
const db = require("../models/index.js")

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

module.exports = router;