/**
 * permission--operation (N--M)
 * @name 权限操作model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns PermissionOperationModel
 */

module.exports = (sequelize, Sequelize) => {
	return sequelize.define("PermissionsOperations", {
		id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
		status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
	}, {
		tableName: "permissionsoperations"
	});
}