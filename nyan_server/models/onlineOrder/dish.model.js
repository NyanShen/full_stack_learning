const { DataTypes } = require("sequelize");
/**
 * @name 点餐菜品model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns DishModel
 */
module.exports = (sequelize) => {
	return sequelize.define("Dish", {
		id: {
			type: DataTypes.INTEGER(10), // 类型
			allowNull: false, // 不允许为空
			autoIncrement: true, // 自增
			primaryKey: true, // 主键
		},
		categoryId: {
			type: DataTypes.INTEGER(10),
			comment: '菜品分类',
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false, // 不允许为空
			unique: true,
			comment: '菜品名字',
		},
		description: {
			type: DataTypes.STRING(500),
			comment: '菜品描述',
		},
		price: {
			type: DataTypes.DECIMAL(10, 2), // 10 位整数部分，2 位小数部分
			allowNull: false, // 不允许为空
			comment: '菜品价格',
			defaultValue: 0.00
		},
		sort: {
			type: DataTypes.INTEGER(3),
			comment: '显示排序',
			defaultValue: 1
		},
		imageUrl: {
			type: DataTypes.STRING,
			comment: "菜品图片",
		},
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0上架 1下架 3删除",
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
		tableName: "dishes"
	});
}