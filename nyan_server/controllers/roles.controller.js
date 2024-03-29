const db = require("../models/index.js");
const DAO = require("../utils/dao.js");
const Role = db.role;
const Menu = db.menu;
const RoleMenu = db.rolemenu;
const Op = db.Op;

Role.belongsToMany(Menu, {
	through: {
		model: RoleMenu,
		unique: false
	},
	foreignKey: 'roleId'
})

Menu.belongsToMany(Role, {
	through: {
		model: RoleMenu,
		unique: false
	},
	foreignKey: "menuIds"
})
/**
 * 创建角色
 */
exports.create = async (req, res) => {
	const param = req.body;
	if (!param.name) {
		return res.send({
			data: '',
			code: 605,
			msg: "角色名称不能为空!"
		});
	}
	const role = {
		name: param.name,
		desc: param.desc,
		menuIds: param.menuIds, // ?怎么传多个?
	}
	await Role.findOne({
			where: {
				'name': param.name
			}
		})
		.then(singleRole => {
			if (singleRole?.id) {
				res.send({
					data: null,
					code: 605,
					msg: '角色已存在!'
				})
			}

		})
	const idList = param.menuIds.split(',').map(id => parseInt(id, 10)); // 将字符串转为整数数组
	let menus = await Menu.findAll({
		where: {
			id: {
				[Op.in]: idList, // 使用in操作符进行查询
			}
		}
	})
	//查询所有菜单
	let newRole = await Role.create(role);
	newRole.setMenus(menus)
	res.send({
		data: role,
		code: 200,
		msg: '创建成功'
	})
}

/**
 * 
 */
exports.findOne = (req, res) => {
	const param = {
		params: req.body
	};
	param.raw = false //是否开启原生查询   true 结果：tag.tag_name  false 结果：'tag':{"tag_name": "标签",}
	param.include = [{
		model: Menu
	}, ]
	DAO.findOne(Role, param, data => {
		res.send(data.data, 200, '查询成功')
	})
};