const { DataTypes } = require("sequelize");
/**
 * @name 点餐菜品分类model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns MenuCategoryModel
 */
module.exports = (sequelize) => {
	return sequelize.define("MenuCategory", {
		id: {
			type: DataTypes.INTEGER(10), // 类型
			allowNull: false, // 不允许为空
			autoIncrement: true, // 自增
			primaryKey: true, // 主键
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false, // 不允许为空
			unique: true,
			comment: '菜品分类名字',
		},
		description: {
			type: DataTypes.STRING(500),
			comment: '菜品分类描述',
		},
		status: {
			type: DataTypes.INTEGER(1),
			comment: "1启用, 2禁用, 3删除",
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
				let value = this.getDataValue('createdAt');
				return value.Format('yyyy-MM-dd hh:mm:ss')
			}
		},
	}, {
		tableName: "categories"
	});
}