const express = require('express');
const router = express.Router();
const db = require("../models/index.js");
const DAO = require("../utils/dao.js");

/**
 * 查询菜单
 */
router.get('/', async function(req, res, next) {
	const menus = await db.menu.findAll();
	res.send({
		code: 200,
		data: menus,
		msg: `操作成功`,
	});
});
/* 
 * 新增菜单对象
 */
router.post('/create', async function(req, res, next) {
	DAO.create(db.menu, req.body, (data) => {
		res.send(data);
	})
});
/* 
 * 分页查询
 * query?
 * params:
 * body{}
 */
router.get('/list', async function(req, res, next) {
	DAO.list(db.menu, req.query, (data) => {
		res.send(data);
	})
});

module.exports = router;