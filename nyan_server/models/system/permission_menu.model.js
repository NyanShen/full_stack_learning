const { DataTypes } = require("sequelize");
/**
 * permission--menu (N--M)
 * user--role--permission--menu
 * @name 权限菜单model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionMenuModel
 */

module.exports= (sequelize) => {
	return sequelize.define("PermissionsMenus", {
		id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
        },
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
	}, {
		tableName: "permissionsmenus"
	});
}