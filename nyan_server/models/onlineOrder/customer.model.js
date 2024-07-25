const { DataTypes } = require("sequelize");
/**
 * @name 点餐客户表
 * @author NyanShen
 * @param {*} sequelize 
 * @returns CustomerModel
 */
module.exports = (sequelize) => {
    return sequelize.define("Customer", {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        openId: {
            type: DataTypes.STRING(50),
            comment: '客户标识',
            unique: true,
            defaultValue: '',
        },
        name: {
            type: DataTypes.STRING(50),
            comment: '姓名',
            defaultValue: '',
        },
        sex: {
            type: DataTypes.INTEGER(1),
            comment: '性别',
        },
        avatar: {
            type: DataTypes.STRING,
            comment: '头像',
            defaultValue: '',
        },
        phone: {
            type: DataTypes.STRING(20),
            comment: '手机号码',
        },
        email: {
            type: DataTypes.STRING(50),
            comment: '邮箱',
            defaultValue: '',
        },
        remark: {
            type: DataTypes.STRING(100),
            comment: '描述',
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
        tableName: "customers"
    })
}