const db = require('../../models/index');
const tools = require('../../utils/tools');
const orderModel = db.order;
const payRecordModel = db.payrecord;
const payMethodModel = db.paymethod;
const customerModel = db.customer;
const orderDetailModel = db.orderdetail;

/**
 * @name 点餐系统-订单服务
 * @author NyanShen
 */
class orderService {
    // 新增支付方式
    async createPayMethod(req, res) {
        try {
            let singleModel = await payMethodModel.findOne({ where: { mode: req.body.mode } });
            if (singleModel?.id) {
                res.sendResult("支付模式已存在", 605);
                return;
            }
            await payMethodModel.create(req.body);
            res.sendResult("支付模式创建成功", 200);
        } catch (error) {
            res.sendResult(error, 500);
        }
    }
    // 创建订单
    async createBusinessOrder(req, res) {
        const t = await db.sequelize.transaction();
        const { customerId, orderDetail, payMode, totalAmount } = req.body;
        try {
            // 构建交易订单,wx开头+日期(20240725112234)+时间戳
            const singlePayMethod = await payMethodModel.findOne({ where: { mode: payMode } });
            if (!singlePayMethod) {
                res.sendResult("支付模式不存在", 605);
                return;
            }
            const orderId = singlePayMethod.type + new Date().Format("yyyyMMdd") + Date.now()
            // 保存订单
            const order = await orderModel.create({
                orderId,
                customerId,
                payMode,
                totalAmount,
                status: "pending"
            }, { transaction: t });

            // 订单详情过滤
            const orderDetailList = orderDetail?.map(item => {
                return {
                    orderId: order.orderId,
                    dishId: item.dishId,
                    quantity: item.quantity,
                    uniPrice: item.uniPrice,
                    totalPrice: parseInt(item.quantity) * parseFloat(item.uniPrice).toFixed(2)
                }
            })
            // 批量保存订单详情 transaction事务:原子性,一致性,隔离性,持久性
            await orderDetailModel.bulkCreate(orderDetailList, { transaction: t });
            await t.commit(); // 提交事务
            res.sendResult("创建订单成功", 0, { orderId: order.orderId });
        } catch (error) {
            await t.rollback(); // 回滚事务
            res.sendResult("创建订单失败", -1, error);
        }
    }
    // 创建支付订单-根据业务订单号
    async createPayOrder(req, res) {
        try {
            const { orderId } = req.body;
            const order = await orderModel.findOne({
                where: {
                    orderId
                }
            });
            if (!order) {
                return res.sendResult("订单不存在", -1, null);
            }
            // transactionId 20位随机数
            const transactionId = Date.now() + tools.randomString(20);
            await payRecordModel.create({
                orderId,
                amount: order.totalAmount,
                payStatus: "SUCCESS",
                transactionId
            })
            order.setDataValue("status", "success");
            res.sendResult("操作成功", 0, { orderId, status: order.status, remark: "其他唤起支付参数模拟" });
        } catch (error) {
            res.sendResult("操作失败", -1, error);
        }
    }
}

module.exports = new orderService();