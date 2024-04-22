const db = require("../../models/index");
const DAO = require("../../utils/dao");

const UserModel = db.user;
const RoleModel = db.role;
const UsersRolesModel = db.usersroles;
const PermissionModel = db.permission;

UserModel.belongsToMany(RoleModel, { through: UsersRolesModel });
RoleModel.belongsToMany(UserModel, { through: UsersRolesModel });

/**
 * @name 注册用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.register = async (req, res) => {
	if (req.body.password !== req.body.confirmPassword) {
		res.sendResult("密码和确认密码不一致,请重新输入", 605);
		return
	}
	const singleUser = await UserModel.findOne({ where: { account: req.body.account } });
	if (singleUser?.id) {
		res.sendResult("用户已经存在, 请直接登录", 605);
		return
	}
	DAO.create(UserModel, req.body, data => res.send(data));
}
/**
 * @name 注册、新增用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.create = async (req, res) => {
	try {
		const singleUser = await UserModel.findOne({ where: { account: req.body.account } });
		if (singleUser?.id) {
			res.sendResult("用户已经存在", 605);
			return
		}
		const createdUser = await UserModel.create(req.body);
		if (req.body.roleIds) {
			const roles = await RoleModel.findAll({ where: { id: req.body.roleIds.split(',') } });
			createdUser.setRoles(roles);
		}
		res.sendResult("新增成功", 0);
	} catch (error) {
		res.sendResult("新增失败", -1, error);
	}
}

/**
 * @name 删除用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 0
 */
exports.delete = async (req, res) => {
	// let key = { id: req.params.id }
	// DAO.delete(UserModel, key, data => res.send(data));
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
	try {
		let singleUser = await UserModel.findByPk(req.body.id);
		if (!singleUser) {
			res.sendResult("不存在该用户", 605);
			return;
		}
		singleUser.update(req.body);
		if (req.body.roleIds) {
			const roles = await RoleModel.findAll({ where: { id: req.body.roleIds.split(',') } });
			singleUser.setRoles(roles);
		}
		res.sendResult("更新成功", 0);
	} catch (error) {
		res.sendResult("更新失败", -1, error);
	}
}

/**
 * @name 搜索用户(排除密码)
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Array
 */
exports.search = async (req, res) => {
	const token = req.headers.authorization.replace('Bearer ', '');
	const tokenUser = unsignToken(token);
	
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
			exclude: ['password', 'updatedAt']
		}
	}
	// 如果不是超级管理员, 查询除超级管理员之外的用户
	if (tokenUser.id !== 1) {
		conditions.params.id = {
			[db.Op.ne]: 1, // != 1
		}
	}
	DAO.listByPage(UserModel, conditions, data => res.send(data));
}
/**
 * @name 搜索用户所关联角色
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Role Array
 */
exports.searchRolesByUserId = async (req, res) => {
	try {
		const singleUser = await UserModel.findByPk(req.query.id, {
			include: {
				model: RoleModel,
				attributes: ['id'],
				through: {
					attributes: []
				}
			}
		});
		if (!singleUser) {
			res.sendResult("不存在该用户", 605);
			return;
		}
		res.sendResult('查询成功', 0, singleUser.Roles.map(item => item.id))
	} catch (error) {
		res.sendResult("查询失败", -1, error);
	}
}

/**
 * @name 通过获取登录用户信息
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 * 解析token, 获取token所存用户信息
 * 通过用户信息查询角色及权限
 */
const { unsignToken } = require('../../middlewares/jwt');
exports.getUser = async (req, res) => {
	const token = req.headers.authorization.replace('Bearer ', '');
	const tokenUser = unsignToken(token);
	try {
		// 通过user获取角色
		const user = await UserModel.findByPk(tokenUser.id, {
			include: {
				model: RoleModel,
				attributes: ['id', 'code'],
				through: {
					attributes: []
				}
			}
		})
		const roleIds = user.Roles.map(item => item.id);
		if (roleIds?.length > 0) {
			// 根据角色获取对应权限
			const conditions = {
				where: { id: roleIds },
				include: {
					model: PermissionModel,
					attributes: ['code'],
					through: {
						attributes: []
					}
				}
			}
			const roles = await RoleModel.findAll(conditions);
			// 循环角色获取每个角色所有的权限,然后去重
			let targetPermissions = [];
			roles?.forEach(role => {
				const permissions = role.Permissions?.reduce((prev, curr) => {
					if (!prev.includes(curr.code)) {
						prev.push(curr.code)
					}
					return prev;
				}, [])
				targetPermissions = [...targetPermissions, ...permissions]
			});

			tokenUser.roles = user.Roles.map(item => item.code);
			tokenUser.permissions = targetPermissions;
		}
		res.sendResult("操作成功", 0, tokenUser);
	} catch (error) {
		res.sendResult("查询用户失败", -1, error);
	}
}