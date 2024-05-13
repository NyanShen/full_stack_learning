const db = require("../../models/index");
const orderMenuMedel = db.ordermenu;

/**
 * @name 点餐系统-新增菜单
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 */
exports.create = async (req, res) => {
    try {
        let singleOrderMenu = await orderMenuMedel.findOne({ where: { name: req.body.name } });
        if (singleOrderMenu?.id) {
            res.sendResult("菜单已存在", 605);
            return;
        }
        await singleOrderMenu.create(req.body);
        res.sendResult("菜单创建成功", 200);
    } catch (error) {
        res.sendResult(error, 500);
    }
}


/**
 * @name 点餐系统-菜单查询
 * @author NyanShen
 * @param {*} req 
 * @param {*} res 
 * @returns Menu Object
 * 查询条件: 菜单名模糊查询, 菜单类型查询
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
        const result = await orderMenuMedel.findAll(conditions);
        res.sendResult("查询成功", 200, result);
    } catch (error) {
        res.sendResult(error, 500);
    }
}