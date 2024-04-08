const db = require("../models/index");
const DAO = require("../utils/dao.js");

const RoleModel = db.role;
const MenuModel = db.menu;
const RoleMenuModel = db.rolemenu;
/**
 * role与menu关系, 多对多关系, 使用联结表
 * roles--menus
 */
RoleModel.belongsToMany(MenuModel, { through: { model: RoleMenuModel, unique: false }, foreignKey: 'roleId' })
MenuModel.belongsToMany(RoleModel, { through: { model: RoleMenuModel, unique: false }, foreignKey: 'menuId' })
/**
 * @name 新增角色关联菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.create = async (req, res) => {
    let singleRole = await RoleModel.findOne({ where: { name: req.body.name } });
    if (singleRole?.id) {
        res.sendResult("角色已存在", 605);
        return;
    }

    const createdRole = await RoleModel.create({ name: req.body.name, desc: req.body.desc });
    // 查询所有的菜单
    let menuIds = req.body.menuIds?.split(',');
    if (menuIds?.length > 0) {
        const menus = await MenuModel.findAll({ where: { id: menuIds } });
        createdRole.setMenus(menus);
    }


    res.sendResult("创建成功", 0);
}

/**
 * @name 修改角色关联菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.update = async (req, res) => {
    let singleRole = await RoleModel.findByPk(req.body.id);
    if (!singleRole) {
        res.sendResult("不存在该角色", 605);
        return;
    }
    // 查询所有的菜单
    let menuIds = req.body.menuIds?.split(',');
    const menus = await MenuModel.findAll({ where: { id: menuIds } });
    console.log("menuids>>>>", menuIds, menus)
    singleRole.update(req.body)
    singleRole.setMenus(menus);
    res.sendResult("修改成功", 0);
}