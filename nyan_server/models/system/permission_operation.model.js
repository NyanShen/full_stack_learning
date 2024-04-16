const { DataTypes } = require("sequelize");
/**
 * permission--operation (N--M)
 * @name 权限操作model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionOperationModel
 */

module.exports = (sequelize) => {
	return sequelize.define("PermissionsOperations", {
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
		tableName: "permissionsoperations"
	});
}