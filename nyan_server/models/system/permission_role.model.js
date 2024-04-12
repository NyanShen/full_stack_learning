/**
 * permission--role (N--M)
 * user--role--permission--menu
 * @name 权限菜单model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionMenuModel
 */

module.exports = (sequelize, Sequelize) => {
	return sequelize.define("PermissionsRoles", {
		id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
		roleId: {
			type: Sequelize.INTEGER(10),
			notNull: true,
			comment: "角色关联ID"
		},
		permissionId: {
			type: Sequelize.INTEGER(10),
			notNull: true,
			comment: "权限关联ID"
		},
		status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
	}, {
		tableName: "permissionsroles"
	});
}