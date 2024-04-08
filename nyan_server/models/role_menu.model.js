/**
 * @name 角色菜单多对多联结model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns RolesMenusModel
 */
const RolesMenus = (sequelize, Sequelize) => {
	return sequelize.define("RolesMenus", {
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
		menuId: {
			type: Sequelize.INTEGER(10),
			notNull: true,
			comment: "角色关联ID"
		}
	}, {
		tableName: "rolesmenus"
	});
}
module.exports = RolesMenus;