const db = require("../models/index.js");
const DAO = require("../utils/dao.js");

const UserModel = db.user;
/**
 * 注册、新增用户
 */
exports.create = async (req, res) => {
	const singleUser = await UserModel.findOne({ where: { account: req.body.account}});
	if (singleUser?.id) {
		res.sendResult("用户已经存在", 605);
		return
	}
	DAO.create(UserModel, req.body, data => res.send(data));
}
