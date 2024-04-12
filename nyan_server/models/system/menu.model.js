/**
 * permission--menu (N--M)
 * user--role--permission--menu
 * @name 菜单model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns MenuModel
 */
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Menu", {
		id: {
			type: Sequelize.INTEGER(10),
            autoIncrement: true,
			notNull: true,
			primaryKey: true
		},
		pid: {
			type: Sequelize.INTEGER(10),
			notNull: true,
			comment: '父级ID',
		},
		name: {
			type: Sequelize.STRING,
			notNull: true,
			unique: true,
			comment: '菜单标题',
		},
		path: {
			type: Sequelize.STRING(50),
			comment: '菜单路径',
		},
		icon: {
			type: Sequelize.STRING,
			comment: '菜单图标',
		},
		level: {
			type: Sequelize.INTEGER(1),
			comment: '菜单类型(1: 目录, 2: 菜单, 3: 按钮)', 
			defaultValue: 2
		},
		outpara1: {
			type: Sequelize.STRING,
			comment: '扩展字符',
		},
		status: {
			type: Sequelize.INTEGER(1),
			default: 1,
			comment: "是否有效(是否被删除)0无效,1有效"
		}
	}, {
		tableName: "menus"
	});
}