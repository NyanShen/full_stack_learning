module.exports = (sequelize, Sequelize) => {
	return Sequelize.define('Test',{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			comment: "名称"
		},
		code: {
			type: Sequelize.INTEGER,
			allowNull: false,
			comment: "编码"
		},
		shelveDate: {
			type: Sequelize.DATE,
			comment: "上架时间"
		},
		price: {
			type: Sequelize.DECIMAL(10, 2),
			comment: "价格"
		},
		pictrue: {
			type: Sequelize.STRING.BINARY,
			comment: "图片"
		},
		vidio: {
			type: Sequelize.STRING.BINARY,
			comment: "视频文件"
		}
	})
}