const Image = (sequelize, Sequelize) => {
	return sequelize.define("Image",{
		name: Sequelize.STRING,
		path: Sequelize.STRING
	}, {
		tableName: "image"
	})
}
module.exports = Image