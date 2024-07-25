const { DataTypes } = require("sequelize");
/**
 * @name 点餐订单表
 * @author NyanShen
 * @param {*} sequelize 
 * @returns OrderModel
 * @description 订单表
 * 订单--客户: 一个订单对应一个客户, 一个客户对应多个订单
 */
module.exports = (sequelize) => {
    return sequelize.define("Order", {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: "订单编号"
        },
        customerId: {
            type: DataTypes.INTEGER(10),
            comment: "下单客户",
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            comment: "订单总金额",
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "success", "fail", "cancelled"),
            comment: "订单状态: 待支付, 已付款, 付款失败, 已取消",
            allowNull: false,
            defaultValue: "pending",
        },
        payMode: {
            type: DataTypes.STRING(20),
            comment: "支付方式: wechat, alipay, cash....",
            allowNull: false,
            defaultValue: "",
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "创建时间即下单时间",
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                let value = this.getDataValue('updatedAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
    }, {
        tableName: "orders"
    })
}