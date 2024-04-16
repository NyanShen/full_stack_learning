
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
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Permission', {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: "权限编码"
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            comment: "权限名字"
        },
        desc: {
            type: Sequelize.STRING,
            comment: "权限说明"
        },
        status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
    }, {
        tableName: "permissions"
    })
}