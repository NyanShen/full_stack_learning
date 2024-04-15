const db = require("../../models/index");
const DAO = require("../../utils/dao.js");
const OperationModel = db.operation

/**
 * @name 新增菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 */
exports.create = async (req, res) => {
    let singleOperation = await OperationModel.findOne({ where: { name: req.body.name } });
    if (singleOperation?.id) {
        res.sendResult("操作对象已存在", 605);
        return;
    }
     OperationModel.create(req.body);
    
    res.sendResult('创建成功', 0);
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
    DAO.delete(OperationModel, key, data => res.send(data));
}

/**
 * @name 更新菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.update = async (req, res) => {
    let singleOperation = await OperationModel.findByPk(req.body.id);
    if (!singleOperation) {
        res.sendResult("不存在该菜单", 605);
        return;
    }
    let key = { id: req.body.id };
    DAO.update(OperationModel, req.body, key, data => res.send(data));
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
    DAO.list(OperationModel, conditions, data => res.send(data));
}
