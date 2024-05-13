const { DataTypes } = require("sequelize");
/**
 * @name 菜单与分类model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns MenuCategoryModel
 * @description 菜单与分类model
 * 一个分类多个菜单, 一个菜单只有一种分类
 */

module.exports= (sequelize) => {
	return sequelize.define("MenuCategory", {
		id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
        },
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
	}, {
		tableName: "menuscategory"
	});
}