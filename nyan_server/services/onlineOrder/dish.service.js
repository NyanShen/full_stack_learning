const db = require("../../models/index");
const utilsTools = require("../../utils/tools");
const dishModel = db.dish;
const categoryModel = db.category;
const optionModel = db.option;

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
 * dish与option多对多关系
 * dish与specification多对多关系
 */
dishModel.belongsToMany(optionModel, { through: db.dishoption, as: "options" });
optionModel.belongsToMany(dishModel, { through: db.dishoption, as: "dishes" });

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
 * @name 更新菜品-option
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Dish Option Object
 */
exports.updateOptions = async (req, res) => {
    try {
        const singleDish = await dishModel.findByPk(req.body.id);
        if (!singleDish) {
            res.sendResult("不存在该菜品", 605);
            return;
        }
        if (!req.body.optionIds) {
            res.sendResult("菜单选项不能为空", 605);
            return;
        }
        const optionIds = req.body.optionIds?.split(',');
        const options = await optionModel.findAll({ where: { id: optionIds } });
        await singleDish.addOptions(options); // 向菜品加入多个选项
        res.sendResult("更新成功", 0);
    } catch (error) {
        res.sendResult("更新失败", -1, error);
    }
}

/**
 * @name remove菜品-option
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Dish Option Object
 */
exports.removeOptions = async (req, res) => {
    try {
        const singleDish = await dishModel.findByPk(req.body.id);
        if (!singleDish) {
            res.sendResult("不存在该菜品", 605);
            return;
        }
        if (!req.body.optionIds) {
            res.sendResult("菜单选项不能为空", 605);
            return;
        }
        const optionIds = req.body.optionIds?.split(',');
        const options = await optionModel.findAll({ where: { id: optionIds } });
        // 删除菜品选项
        await singleDish.removeOptions(options);
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
/**
 * @name 点餐系统-菜品-菜品选项
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Dish-Options Object
 * @description 根据菜品ID查询关联的菜品选项
 */
exports.searchOptions = async (req, res) => {
    try {
        dishModel.findByPk(req.query.dishId, {
            include: [
                {
                    model: optionModel,
                    as: 'options',
                    attributes: ['id', 'name', 'priceAddition']
                }
            ]
        }).then(result => {
            res.sendResult("查询成功", 200, result.options);
        })
    } catch (error) {
        res.sendResult(error, 500);
    }
}
