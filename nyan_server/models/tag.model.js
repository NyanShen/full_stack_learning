//标签
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Tag", {
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			comment: '标签名称',
		},
		desc: {
			type: Sequelize.STRING,
			comment: '标签描述',
		},
	}, {
		tableName: 'tags'
	});
};