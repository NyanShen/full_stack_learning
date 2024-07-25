const { DataTypes } = require("sequelize");
/**
 * @name 点餐订单支付记录表
 * @author NyanShen
 * @param {*} sequelize 
 * @returns PayRecordModel
 * @description 支付记录表
 * 订单--支付记录 一对一
 */
module.exports = (sequelize) => {
    return sequelize.define("PayRecord", {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        orderId: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            comment: "订单号"
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            comment: "订单总金额",
            allowNull: false,
        },
        payStatus: {
            type: DataTypes.ENUM("SUCCESS", "FAIL"),
            comment: "支付状态: 支付成功, 支付失败",
            allowNull: false,
        },
        transactionId: {
            type: DataTypes.INTEGER(50),
            allowNull: false,
            comment: "交易号"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "创建时间",
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            comment: "更新时间",
            get() {
                let value = this.getDataValue('updatedAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
    }, {
        tableName: "payrecords"
    })
}