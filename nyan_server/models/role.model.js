
const Role = (sequelize, Sequelize) => {
	return sequelize.define("Role", {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			comment: "角色名称"
		},
		desc: {
			type: Sequelize.STRING,
			comment: "角色描述"
		}
	}, {
		tableName: "Roles"
	});
}
module.exports = Role;