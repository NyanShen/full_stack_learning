const db = require("../../models/index");
const DAO = require("../../utils/dao.js");

const PermissionModel = db.permission;
const MenuModel = db.menu;
const PermissionsMenusModel = db.permissionsmenus;
/**
 * 权限--菜单
 */
PermissionModel.belongsToMany(MenuModel, { through: { model: PermissionsMenusModel, unique: false }, foreignKey: "permissionId" })
MenuModel.belongsToMany(PermissionModel, { through: { model: PermissionsMenusModel, unique: false }, foreignKey: "menuId" })

/**
 * @name 新增权限
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Object
 */
exports.create = async (req, res) => {
    const singlePermission = await PermissionModel.findOne({ where: { code: req.body.code } });
    if (singlePermission?.id) {
        res.sendResult("权限已经存在", 605);
        return
    }
    const createPermission = PermissionModel.create(req.body);
    if (req.body.menuIds) {
        let menuIds = req.body.menuIds?.split(',');
        let menus = MenuModel.findAll({ where: { id: menuIds } });
        createPermission.setMenus(menus);
    }
    res.sendResult("创建成功", 0);
}

/**
 * @name 修改权限
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Object
 */
exports.update = async (req, res) => {
    const singlePermission = await PermissionModel.findByPk(req.body.id);
    if (!singlePermission?.id) {
        res.sendResult("权限不存在", 605);
        return
    }
    singlePermission.update(req.body);
    if (req.body.menuIds) {
        let menuIds = req.body.menuIds?.split(',');
        const menus = await MenuModel.findAll({ where: { id: menuIds } });
        singlePermission.setMenus(menus);
    }
    res.sendResult("更新成功", 0);
}