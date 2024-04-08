const Menu = (sequelize, Sequelize) => {
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
		authority: {
			type: Sequelize.STRING,
			comment: '操作标识',
		},
	}, {
		tableName: "menus"
	});
}
module.exports = Menu;