const { DataTypes } = require("sequelize");
/**
 * @name 点餐订单子项目表
 * @author NyanShen
 * @param {*} sequelize 
 * @returns OrderDetailModel
 * @description 订单项目
 * 订单项目 - 订单 一个订单可以有多个订单项目, 一个订单项目对应一个订单
 */
module.exports = (sequelize) => {
    return sequelize.define("OrderDetail", {
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
        dishId: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            comment: "菜品id"
        },
        quantity: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            comment: "数量"
        },
        uniPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: "价格"
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: "总价"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        tableName: "orderdetails"
    })
}