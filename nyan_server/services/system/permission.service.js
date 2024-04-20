const db = require("../../models/index");
const DAO = require("../../utils/dao.js");

const MenuModel = db.menu;
const RoleModel = db.role;
const OperationModel = db.operation
const PermissionModel = db.permission;
const PermissionsMenusModel = db.permissionsmenus;
const PermissionsRolesModel = db.permissionsroles;
const PermissionsOperationsModel = db.permissionsoperations;
/**
 * 权限--菜单
 * 权限--角色
 * 权限--操作
 */
PermissionModel.belongsToMany(MenuModel, { through: PermissionsMenusModel })
PermissionModel.belongsToMany(RoleModel, { through: PermissionsRolesModel })
PermissionModel.belongsToMany(OperationModel, { through: PermissionsOperationsModel })

MenuModel.belongsToMany(PermissionModel, { through: PermissionsMenusModel })
RoleModel.belongsToMany(PermissionModel, { through: PermissionsRolesModel })
OperationModel.belongsToMany(PermissionModel, { through: PermissionsOperationsModel })
/**
 * 权限--菜单
 */

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
    const createdPermission = await PermissionModel.create(req.body);
    // 查询所有的权限
    if (req.body.menuIds) {
        const menuIds = req.body.menuIds?.split(',');
        const menus = await MenuModel.findAll({ where: { id: menuIds } });
        createdPermission.setMenus(menus);
    }
    if (req.body.roleIds) {
        const roleIds = req.body.roleIds?.split(',');
        const roles = await RoleModel.findAll({ where: { id: roleIds } });
        createdPermission.setRoles(roles);
    }
    if (req.body.operationIds) {
        const operationIds = req.body.operationIds?.split(',');
        const operations = await OperationModel.findAll({ where: { id: operationIds } });
        createdPermission.setOperations(operations);
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
        const menuIds = req.body.menuIds?.split(',');
        const menus = await MenuModel.findAll({ where: { id: menuIds } });
        singlePermission.setMenus(menus);
    }
    if (req.body.roleIds) {
        const roleIds = req.body.roleIds?.split(',');
        const roles = await RoleModel.findAll({ where: { id: roleIds } });
        singlePermission.setRoles(roles);
    }
    if (req.body.operationIds) {
        const operationIds = req.body.operationIds?.split(',');
        const operations = await OperationModel.findAll({ where: { id: operationIds } });
        singlePermission.setOperations(operations);
    }
    res.sendResult("更新成功", 0);
}

/**
 * @name 修改权限-分配菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Object
 */
exports.assignMenus = async (req, res) => {
    const singlePermission = await PermissionModel.findByPk(req.body.id);
    if (!singlePermission?.id) {
        res.sendResult("权限不存在", 605);
        return
    }
    const menuIds = req.body.menuIds?.split(',');
    const menus = await MenuModel.findAll({ where: { id: menuIds } });
    singlePermission.setMenus(menus);
    res.sendResult("更新成功", 0);
}


/**
 * @name 搜索权限
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Array
 */
exports.search = async (req, res) => {
    let conditions = {
        params: {
            code: {
                [db.Op.like]: `%${req.query.code || ''}%`
            },
            name: {
                [db.Op.like]: `%${req.query.name || ''}%`
            }
        },
        attributes: {
            exclude: ['updatedAt']
        }
    }
    DAO.list(PermissionModel, conditions, data => res.send(data));
}

/**
 * @name 搜索权限-菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Menu Array
 */
exports.searchMenusByPermissionId = async (req, res) => {
    try {
        let permission = await PermissionModel.findByPk(req.query.id, {
            include: {
                model: MenuModel,
                attributes: ['id'],
                through: {
                    attributes: []
                } // 不返回中间表数据
            }
        })
        res.sendResult('查询成功!', 0, permission.Menus.map(item => item.id));
    } catch (error) {
        res.sendResult('查询失败!', -1, error)
    }
}

/**
 * @name 搜索权限-菜单-返回路由格式
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Permission Menu Route Tree
 */
exports.searchMenusByPermissionCode = async (req, res) => {
    try {
        if (!req.query?.codes) {
            res.sendResult("权限编码不能为空", -1);
            return
        }
        // 根据权限编码查询所有的菜单
        const conditions = {
            where: {
                code: req.query.codes.split(',')
            },
            attributes: [],
            include: {
                model: MenuModel,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                through: {
                    attributes: []
                },
                order: [
                    ['sort', 'ASC']
                ]
            },
        }
        const permissions = await PermissionModel.findAll(conditions);
        // 获取权限下的菜单
        let targetMenus = [];
        permissions?.forEach(permission => {
            const menus = permission.Menus?.reduce((prev, curr) => {
                // 不存在且类型不是按钮(按钮另外查询还是根据操作权限控制)
                if (!prev.includes(curr.code)) {
                    prev.push(curr)
                }
                return prev
            }, []);
            targetMenus = [...targetMenus, ...menus];
        });
        // 形成路由对象(添加父级菜单)
        const pids = targetMenus.map(item => item.pid);
        const menuConditions = {
            where: { id: pids },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
        const pmenus = await MenuModel.findAll(menuConditions);
        targetMenus = [...targetMenus, ...pmenus];
        res.sendResult('查询成功!', 0, targetMenus);
    } catch (error) {
        res.sendResult('查询失败!', -1, error)
    }
}