const db = require("../../models/index");
const categoryModel = db.category;

/**
 * @name 点餐系统-新增菜品类别
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 */
exports.create = async (req, res) => {
    try {
        let singleModel = await categoryModel.findOne({ where: { name: req.body.name } });
        if (singleModel?.id) {
            res.sendResult("菜品类别已存在", 605);
            return;
        }
        await singleModel.create(req.body);
        res.sendResult("菜品类别创建成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
    }
}


/**
 * @name 点餐系统-菜品类别查询
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 * 查询条件: 菜品类别名模糊查询, 菜品类型查询
 */
exports.search = async (req, res) => {
    try {
        const conditions = {
            where: {
                name: {
                    $like: `%${req.body.name}%`
                }
            },
            limit: req.body.pageSize || 10,
            offset: req.body.pageIndex || 0,
            order: [
                ['id', 'DESC']
            ],
        }
        const result = await categoryModel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}