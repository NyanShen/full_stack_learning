const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const MenuModel = db.menu;

/**
 * @name 新增菜单
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

/**
 * @name 删除菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns
 */
exports.delete = async (req, res) => {
    let key = { id: req.params.id }
    DAO.delete(MenuModel, key, data => res.send(data));
}

/**
 * @name 更新菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.update = async (req, res) => {
    let singleMenu = await MenuModel.findByPk(req.body.id);
    if (!singleMenu) {
        res.sendResult("不存在该菜单", 605);
        return;
    }
    let key = { id: req.body.id };
    DAO.update(MenuModel, req.body, key, data => res.send(data));
}

/**
 * @name 搜索菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Array
 */
exports.search = async (req, res) => {
    let conditions = {
        params: {
            name: {
                [db.Op.like]: `%${req.query.name || ''}%`
            }
        }
    }
    DAO.list(MenuModel, conditions, data => res.send(data));
}
