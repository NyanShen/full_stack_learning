/**
 * @name 角色model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns RoleModel
 */
const Role = (sequelize, Sequelize) => {
	return sequelize.define("Role", {
		id: {
			type: Sequelize.INTEGER(10),
            autoIncrement: true,
			notNull: true,
			primaryKey: true
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
		}
	}, {
		tableName: "roles"
	});
}
module.exports = Role;