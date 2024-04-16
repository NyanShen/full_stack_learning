/**
 * permission--menu (N--M)
 * user--role--permission--menu
 * @name 权限菜单model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionMenuModel
 */

module.exports= (sequelize, Sequelize) => {
	return sequelize.define("PermissionsMenus", {
		id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
		status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
	}, {
		tableName: "permissionsmenus"
	});
}