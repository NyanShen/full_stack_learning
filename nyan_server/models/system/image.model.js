const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	return sequelize.define("Image",{
		name: DataTypes.STRING,
		path: DataTypes.STRING
	}, {
		tableName: "images"
	})
}