const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const DepartmentModel = db.Department;

/**
 * @name 新增部门
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Department Object
 */
exports.create = async (req, res) => {
	try {
		const singleDepartment = await DepartmentModel.findOne({ where: { name: req.body.name } });
		if (singleDepartment?.id) {
			res.sendResult("部门已经存在", 605);
			return
		}
		DepartmentModel.create(req.body);
		res.sendResult("新增成功", 0);
	} catch (error) {
		res.sendResult("新增失败", -1, error);
	}
}