const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const DepartmentModel = db.department;

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
		await DepartmentModel.create(req.body);
		res.sendResult("新增成功", 0);
	} catch (error) {
		res.sendResult("新增失败", -1, error);
	}
}


/**
 * @name 搜索部门
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Department Array
 */
exports.search = async (req, res) => {
	let conditions = {
		params: {
			name: {
				[db.Op.like]: `%${req.query.name || ''}%`
			}
		},
		attributes: {
			exclude: ['updatedAt']
		}
	}
	DAO.list(DepartmentModel, conditions, data => res.send(data));
}