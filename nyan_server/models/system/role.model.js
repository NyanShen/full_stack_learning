/**
 * @name 角色model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns RoleModel
 */
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Role", {
		id: {
			type: Sequelize.INTEGER(10),
            autoIncrement: true,
			notNull: true,
			primaryKey: true
		},
		code: {
			type: Sequelize.STRING,
			notNull: true,
			unique: true,
			comment: "角色编码"
		},
		name: {
			type: Sequelize.STRING,
			notNull: true,
			unique: true,
			comment: "角色名称"
		},
		desc: {
			type: Sequelize.STRING,
			comment: "角色描述"
		},
		status: {
			type: Sequelize.INTEGER(1),
			comment: "是否有效(是否被删除)0无效,1有效",
			defaultValue: 1,
		},
	}, {
		tableName: "roles"
	});
}