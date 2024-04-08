const db = require("../models/index.js");
const DAO = require("../utils/dao.js");

const UserModel = db.user;
/**
 * @name 搜索用户
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Array
 */
exports.search = async (req, res) => {
	let key = {
		name: {
			[db.Op.like]: `%${req.query.name}%`
		},
		state: req.query.state
	}
	DAO.list(UserModel, key, data => res.send(data));
}

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
