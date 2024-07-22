const db = require("../../models/index");
const utilsTools = require("../../utils/tools");
const dishModel = db.dish;
const categoryModel = db.category;

/**
 * 一个category有多个dish关联关系
 */
dishModel.belongsTo(categoryModel, {
    foreignKey: 'categoryId',
    as: 'category'
});
categoryModel.hasMany(dishModel, {
    foreignKey: 'categoryId',
    as: 'dish'
});

/**
 * @name 点餐系统-新增菜品
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 */
exports.create = async (req, res) => {
    try {
        let singleDish = await dishModel.findOne({ where: { name: req.body.name } });
        if (singleDish?.id) {
            res.sendResult("菜品已存在", 605);
            return;
        }
        await dishModel.create(req.body);
        res.sendResult("菜品创建成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
    }
}

/**
 * @name 更新菜品
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns User Object
 */
exports.update = async (req, res) => {
    try {
        let singleDish = await dishModel.findByPk(req.body.id);
        if (!singleDish) {
            res.sendResult("不存在该菜品", 605);
            return;
        }
        singleDish.update(req.body);
        res.sendResult("更新成功", 0);
    } catch (error) {
        res.sendResult("更新失败", -1, error);
    }
}

/**
 * @name 点餐系统-菜品查询
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 * 查询条件: 菜品名模糊查询, 菜品类型查询
 */
exports.search = async (req, res) => {
    const params = {
        categoryId: req.query.categoryId,
        name: {
            [db.Op.like]: `%${req.query.name || ''}%`
        }
    }
    try {
        const conditions = {
            where: utilsTools.deleteNullObj(params),
            limit: req.query.pageSize || 10,
            offset: req.query.pageIndex || 0,
            order: [
                ['id', 'DESC']
            ],
            include: [
                {
                    model: categoryModel,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        }
        const result = await dishModel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}
