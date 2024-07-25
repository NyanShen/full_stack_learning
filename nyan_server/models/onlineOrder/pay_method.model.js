const { DataTypes } = require("sequelize");
/**
 * @name 点餐订单支付方法表
 * @author NyanShen
 * @param {*} sequelize 
 * @returns PayMethodModel
 * @description 支付方法表
 */
module.exports = (sequelize) => {
    return sequelize.define("PayMethod", {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(10),
            comment: "支付类型: wx, ali, ca",
            allowNull: false,
            unique: true,
        },
        mode: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: "支付方式: wechat, alipay, cash"
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "支付方式中文名字: 微信, 支付宝, 现金"
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
        tableName: "paymethods"
    })
}