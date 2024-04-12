module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Image",{
		name: Sequelize.STRING,
		path: Sequelize.STRING
	}, {
		tableName: "images"
	})
}