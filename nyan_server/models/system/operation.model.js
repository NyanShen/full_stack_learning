const { DataTypes } = require("sequelize");
/**
 * permission--operation (N--M)
 * @name 操作model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns OperationModel
 */
module.exports = (sequelize) => {
    return sequelize.define('Operation', {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            comment: "操作编码"
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "操作名称"
        },
        remark: {
            type: DataTypes.STRING(100),
            comment: "操作描述"
        },
        status: {
            type: DataTypes.INTEGER(1),
            comment: "0禁用 1启用 3删除",
            defaultValue: 1,
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
    }, { tableName: 'operations' })
}