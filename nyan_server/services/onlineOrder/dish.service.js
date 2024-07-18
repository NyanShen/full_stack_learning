const db = require("../../models/index");
const dishModel = db.dish;

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
        await singleDish.create(req.body);
        res.sendResult("菜品创建成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
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
    try {
        const conditions = {
            where: {
                name: {
                    $like: `%${req.body.name}%`
                },
                category: req.body.category
            },
            limit: req.body.pageSize || 10,
            offset: req.body.pageIndex || 0,
            order: [
                ['id', 'DESC']
            ],
        }
        const result = await dishModel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}