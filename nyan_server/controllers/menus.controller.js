const db = require("../models/index.js");
const DAO = require("../utils/dao.js");
const Role = db.role;
const Menu = db.menu;
/**
 * 查询菜单
 */
exports.search = (req, res) => {
	let key = {
		title: {
			[db.Op.like]: `%${req.query.title}%`
		}
	}
	DAO.list(Menu, key, data => {
		res.send(data);
	})
}
/**
 * 编辑菜单
 */
exports.update = (req, res) => {
	if (!req.body.id) {
		res.send({
			data: null,
			code: "605",
			msg: "角色Id不能为空"
		});
		return
	}
	DAO.update(Menu, req.body, {
		id: req.body.id
	}, data => {
		res.send(data);
	})
}

/**
 * 编辑菜单
 */
exports.delete = (req, res) => {
	if (!req.params.id) {
		res.send({
			data: null,
			code: "605",
			msg: "角色Id不能为空"
		});
		return
	}
	DAO.delete(Menu, {
		id: req.params.id
	}, data => {
		res.send(data);
	})
}