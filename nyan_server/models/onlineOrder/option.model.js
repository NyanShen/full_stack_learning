const { DataTypes } = require("sequelize");
/**
 * @name 点餐菜品选项model
 * @author NyanShen
 * @param {*} sequelize 
 * @returns OptionModel
 * 
 */
module.exports = (sequelize) => {
	return sequelize.define("Option", {
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
			comment: '菜品选项名字',
		},
		priceAddition: {
			type: DataTypes.DECIMAL(10, 2),
			comment: '菜品选项价格',
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
		tableName: "options"
	});
}