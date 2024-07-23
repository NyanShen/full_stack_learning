const db = require("../../models/index");
const specificationModel = db.specification;

/**
 * @name 点餐系统-新增菜品规格
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Option Object
 */
exports.create = async (req, res) => {
    try {
        let singleModel = await specificationModel.findOne({ where: { name: req.body.name } });
        if (singleModel?.id) {
            res.sendResult("菜品规格已存在", 605);
            return;
        }
        await specificationModel.create(req.body);
        res.sendResult("菜品规格创建成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
    }
}

/**
 * @name 更新菜品规格
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Option Object
 */
exports.update = async (req, res) => {
    try {
        let singleModel = await specificationModel.findByPk(req.body.id);
        if (!singleModel) {
            res.sendResult("不存在该菜品规格", 605);
            return;
        }
        singleModel.update(req.body);
        res.sendResult("更新成功", 0);
    } catch (error) {
        res.sendResult("更新失败", -1, error);
    }
}

/**
 * @name 点餐系统-菜品规格查询
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Option Object
 * 查询条件: 菜品规格名模糊查询, 菜品类型查询
 */
exports.search = async (req, res) => {
    try {
        const conditions = {
            where: {
                name: {
                    [db.Op.like]: `%${req.query.name || ''}%`
                }
            },
            limit: req.query.pageSize || 10,
            offset: req.query.pageIndex || 0,
            order: [
                ['id', 'DESC']
            ],
        }
        const result = await specificationModel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}

/**
 * @name 点餐系统-菜品规格查询
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Option List
 */
exports.searchOptions = async (req, res) => {
    try {
        const conditions = {
            where: {},
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'name']
        }
        const result = await specificationModel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}