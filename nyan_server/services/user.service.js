const db = require("../models/index");
const DAO = require("../utils/dao");

const UserModel = db.user;
const RoleModel = db.role;

UserModel.belongsTo(RoleModel, { foreignKey: "roleId" });
RoleModel.hasMany(UserModel, { foreignKey: "roleId" });

/**
 * @name 注册、新增用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.create = async (req, res) => {
	const singleUser = await UserModel.findOne({ where: { account: req.body.account } });
	if (singleUser?.id) {
		res.sendResult("用户已经存在", 605);
		return
	}
	DAO.create(UserModel, req.body, data => res.send(data));
}

/**
 * @name 删除用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 0
 */
exports.delete = async (req, res) => {
	let key = { id: req.params.id }
	DAO.delete(UserModel, key, data => res.send(data));
}

/**
 * @name 更新用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 * 查询要更新的用户
 * 更新用户, 设置所属角色
 * 注意: 没有传的不会修改数据库现有的值
 */
exports.update = async (req, res) => {
	let singleUser = await UserModel.findByPk(req.body.id);
	if (!singleUser) {
		res.sendResult("不存在该用户", 605);
		return;
	}
	singleUser.update(req.body);
	if (req.body.roleId) {
		let singleRole = await RoleModel.findByPk(req.body.roleId);
		singleUser.setRole(singleRole);
	}
	res.sendResult("更新成功", 0);
}

/**
 * @name 搜索用户(排除密码)
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Array
 */
exports.search = async (req, res) => {
	let conditions = {
		params: {
			account: {
				[db.Op.like]: `%${req.query.account || ''}%`
			},
			name: {
				[db.Op.like]: `%${req.query.name || ''}%`
			},
			state: req.query.state,
		},
		attributes: {
			exclude: ['password', 'updatedAt', 'createdAt']
		}
	}
	DAO.list(UserModel, conditions, data => res.send(data));
}
