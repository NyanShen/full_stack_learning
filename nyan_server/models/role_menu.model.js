/**
 * role-menu
 * manyToMany
 */
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("RoleMenu", {
		id: {
			type: Sequelize.UUID,
			notNull: true,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		roleId: {
			type: Sequelize.STRING,
			notNull: true,
			allowNull: false,
			comment: '角色ID',
		},
		menuIds: {
			type: Sequelize.STRING,
			comment: '菜单ID',
			allowNull: false,
		},
	}, {
		tableName: "role_menu"
	})
}