const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const UserModel = db.user;
const RoleModel = db.role;
const MenuModel = db.menu;
// const RoleMenuModel = db.rolemenu;
/**
 * role与menu关系, 多对多关系, 使用联结表
 * roles--menus
 */
// RoleModel.belongsToMany(MenuModel, { through: { model: RoleMenuModel, unique: false }, foreignKey: 'roleId' })
// MenuModel.belongsToMany(RoleModel, { through: { model: RoleMenuModel, unique: false }, foreignKey: 'menuId' })
/**
 * @name 新增角色关联菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.create = async (req, res) => {
    // let singleRole = await RoleModel.findOne({ where: { name: req.body.name } });
    // if (singleRole?.id) {
    //     res.sendResult("角色已存在", 605);
    //     return;
    // }
    // const createdRole = await RoleModel.create({ name: req.body.name, desc: req.body.desc });
    // // 查询所有的菜单
    // let menuIds = req.body.menuIds?.split(',');
    // if (menuIds?.length > 0) {
    //     const menus = await MenuModel.findAll({ where: { id: menuIds } });
    //     createdRole.setMenus(menus);
    // }
    res.sendResult("创建成功", 0);
}
/**
 * @name 删除角色-考虑角色已被关联不能删?
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 0
 * 删除角色判断角色是否关联用户
 * 如果已关联用户提示不可删除, 解除关联在删除
 */
exports.delete = async (req, res) => {
    // let users = await UserModel.findAll({ where: { roleId: req.params.id } })
    // if (users?.length > 0) {
    //     res.sendResult("该角色已关联用户, 请解除关联再进行删除");
    //     return
    // }
    // let singleRole = await RoleModel.findByPk(req.params.id);
    // if (!singleRole) {
    //     res.sendResult("不存在该角色", 605);
    //     return;
    // }
    // let key = { id: req.params.id };
    // DAO.delete(RoleModel, key, data => res.send(data));
}

/**
 * @name 修改角色关联菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.update = async (req, res) => {
    // let singleRole = await RoleModel.findByPk(req.body.id);
    // if (!singleRole) {
    //     res.sendResult("不存在该角色", 605);
    //     return;
    // }
    // // 查询所有的菜单
    // let menuIds = req.body.menuIds?.split(',');
    // const menus = await MenuModel.findAll({ where: { id: menuIds } });
    // singleRole.update(req.body)
    // singleRole.setMenus(menus);
    // res.sendResult("修改成功", 0);
}


/**
 * @name 搜索角色
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Role Array
 */
exports.search = async (req, res) => {
    let conditions = {
        params: {
            name: {
                [db.Op.like]: `%${req.query.name || ''}%`
            }
        },
        attributes: {
            exclude: ['updatedAt', 'createdAt']
        }
    }
    DAO.list(RoleModel, conditions, data => res.send(data));
}
