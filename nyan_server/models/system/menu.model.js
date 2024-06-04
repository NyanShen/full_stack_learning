const { DataTypes } = require("sequelize");
/**
 * permission--menu (N--M)
 * user--role--permission--menu
 * @name 菜单model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns MenuModel
 */
module.exports = (sequelize) => {
	return sequelize.define("Menu", {
		id: {
			type: DataTypes.INTEGER(10),
			allowNull: false,
            autoIncrement: true,
			primaryKey: true
		},
		pid: {
			type: DataTypes.INTEGER(10),
			comment: '父级ID',
		},
		name: {
			type: DataTypes.STRING(50),
			unique: true,
			comment: '名称或标题',
		},
		path: {
			type: DataTypes.STRING(50),
			comment: '访问路径',
		},
		params: {
			type: DataTypes.STRING(100),
			comment: '访问路径携带参数',
		},
		component: {
			type: DataTypes.STRING(100),
			comment: '页面组件路径',
		},
		icon: {
			type: DataTypes.STRING(100),
			comment: '图标',
		},
		level: {
			type: DataTypes.INTEGER(1),
			comment: '类型(1: 目录, 2: 菜单, 3: 详情, 4:按钮)', 
			defaultValue: 2
		},
		sort: {
			type: DataTypes.INTEGER(3),
			comment: '显示排序',
			defaultValue: 1
		},
		outlink: {
			type: DataTypes.STRING,
			comment: '是否外链',
			defaultValue: 'tag'
		},
		noCache: {
			type: DataTypes.BOOLEAN,
			comment: '是否使用缓存',
			defaultValue: false
		},
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
        createdAt: {
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                let value = this.getDataValue('createdAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        updatedAt: {
            type: DataTypes.DATE, 
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                let value = this.getDataValue('updatedAt');
                return value.Format('yyyy-MM-dd hh:mm:ss')
            }
        },
	}, {
		tableName: "menus"
	});
}