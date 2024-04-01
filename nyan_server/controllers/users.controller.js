const db = require("../models/index.js");
const DAO = require("../utils/dao.js");
const {
	aes
} = require("../utils/crypto.js");
const Role = db.role;
const User = db.user;
const Op = db.Op;

User.hasOne(Role, {
	foreignKey: 'id',
	sourceKey: "roleId"
})
Role.belongsTo(User, {
	foreignKey: 'id',
	sourceKey: "roleId"
})
/**
 * 创建用户
 */
exports.create = (req, res) => {
	const param = req.body;
	if (!param.username) {
		return res.send({
			data: '',
			code: 605,
			msg: "用户名称不能为空!"
		});
	}
	if (!param.password) {
		return res.send({
			data: '',
			code: 605,
			msg: "用户密码不能为空!"
		});
	}
	if (!param.roleId) {
		return res.send({
			data: '',
			code: 605,
			msg: "关联角色不能为空!"
		});
	}
	// Create a user
	const user = {
		username: param.username,
		password: param.password,
		nickName: param.nickName,
		roleId: param.roleId,
		state: param.state || true,
	};
	User.findOne({
			where: {
				'username': param.username
			}
		})
		.then(singleUser => {
			if (singleUser?.id) {
				res.send({
					data: null,
					code: 605,
					msg: '用户名已存在！'
				})
				return
			}
			DAO.create(User, user, data => {
				res.send(data)
			})
		})
}