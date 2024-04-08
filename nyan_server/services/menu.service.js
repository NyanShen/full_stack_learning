const db = require("../models/index");
const DAO = require("../utils/dao.js");
const MenuModel = db.menu;

/**
 * @name 搜索菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Array
 */
exports.search = async (req, res) => {
    let key = {
		name: {
			[db.Op.like]: `%${req.query.name}%`
		},
		desc: {
			[db.Op.like]: `%${req.query.desc}%`
		}
	}
    DAO.list(MenuModel, key, data => res.send(data));
}

/**
 * @name 创建菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 */
exports.create = async (req, res) => {
    let singleMenu = await MenuModel.findOne({ where: { name: req.body.name } });
    if (singleMenu?.id) {
        res.sendResult("菜单已存在", 605);
        return;
    }
    DAO.create(MenuModel, req.body, data => res.send(data));
}
