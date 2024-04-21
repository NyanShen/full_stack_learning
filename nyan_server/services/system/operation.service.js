const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const OperationModel = db.operation;
const PermissionModel = db.permission;

/**
 * @name 新增操作
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Operation Object
 */
exports.create = async (req, res) => {
    let singleOperation = await OperationModel.findOne({ where: { name: req.body.name } });
    if (singleOperation?.id) {
        res.sendResult("操作对象已存在", 605);
        return;
    }
    // 新增并绑定权限
    const createdOperation = await OperationModel.create(req.body);
    if (req.body.permissionIds) {
        const permissionIds = req.body.permissionIds?.split(',');
        const permissions = await PermissionModel.findAll({ where: { id: permissionIds } });
        createdOperation.setPermissions(permissions);
    }
    res.sendResult('更新成功', 0);
}

/**
 * @name 删除操作
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns
 */
exports.delete = async (req, res) => {
    let key = { id: req.params.id }
    DAO.delete(OperationModel, key, data => res.send(data));
}

/**
 * @name 更新操作
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.update = async (req, res) => {
    let singleOperation = await OperationModel.findByPk(req.body.id);
    if (!singleOperation) {
        res.sendResult("不存在该操作", 605);
        return;
    }
   // 修改并绑定权限
   singleOperation.update(req.body);
   if (req.body.permissionIds) {
       const permissionIds = req.body.permissionIds?.split(',');
       const permissions = await PermissionModel.findAll({ where: { id: permissionIds } });
       singleOperation.setPermissions(permissions);
   }
   res.sendResult('创建成功', 0);
}

/**
 * @name 搜索操作
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Operation Array
 */
exports.search = async (req, res) => {
    let conditions = {
        params: {
            name: {
                [db.Op.like]: `%${req.query.name || ''}%`
            }
        }
    }
    DAO.list(OperationModel, conditions, data => res.send(data));
}

/**
 * @name 搜索操作权限
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns OperationPermission Array
 */
exports.searchPermissionsByOperationId = async (req, res) => {
    try {
        const operation = await OperationModel.findByPk(req.query.id, {
            include: {
                model: PermissionModel,
                attributes: ['id'],
                through: {
                    attributes: []
                }
            }
        });
        res.sendResult('查询成功!', 0, operation?.Permissions?.map(item => item.id));
    } catch (error) {
        res.sendResult('查询失败!', -1, error)
    }
}