const { DataTypes } = require("sequelize");
/**
 * @name 菜品与选项model
 * @author NyanShen
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns  DishesOptionsModel
 * ManyToMany 关系
 */

module.exports= (sequelize) => {
	return sequelize.define("DishesOptions", {
		id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
        },
		quantity: {
			type: DataTypes.INTEGER(10),
			comment: "数量,用于多选的时候",
			defaultValue: 1,
		},
		status: {
			type: DataTypes.INTEGER(1),
			comment: "0禁用 1启用 3删除",
			defaultValue: 1,
		},
	}, {
		tableName: "dishesoptions"
	});
}