
const { DataTypes } = require("sequelize");
/**
 * 用户--角色--权限--菜单(多对多关系)
 * user--role-- permission
 * role--permission(N--M)
 * permission--menu、operation、interface、database、pages...
 * @name 权限model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionModel
 */
module.exports = (sequelize) => {
    return sequelize.define('Permission', {
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
            comment: "权限编码"
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: "权限名字"
        },
        remark: {
            type: DataTypes.STRING(100),
            comment: "权限说明"
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
    }, {
        tableName: "permissions"
    })
}