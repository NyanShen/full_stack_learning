const Menu = (sequelize, Sequelize) => {
	return sequelize.define("Menu", {
		pid: {
			type: Sequelize.INTEGER,
			comment: '父级ID',
		},
		path: {
			type: Sequelize.STRING,
			comment: '菜单路径',
		},
		title: {
			type: Sequelize.STRING,
			comment: '菜单标题',
			// validate: {
			// 	isIn: {
			// 		args: [
			// 			['en', 'zh']
			// 		],
			// 		msg: "必须为英文或中文"
			// 	}
			// }
		},
		icon: {
			type: Sequelize.STRING,
			comment: '菜单图标',
		},
		lever: {
			type: Sequelize.INTEGER,
			comment: '菜单类型(1: 目录, 2: 菜单, 3: 按钮)', 
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