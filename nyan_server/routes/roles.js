const express = require('express');
const router = express.Router();
const db = require("../models/index.js")

/* GET users listing. */
router.get('/create', async function(req, res, next) {
	const role = await db.role.create({
		name: "admin",
		desc: "超级管理员"
	})
	res.send(`create role ${role.name}-${role.desc} succeefully`);
});

module.exports = router;