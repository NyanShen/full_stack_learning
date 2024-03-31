//标签
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("Tags", {
		id: {
			type: Sequelize.UUID,
			notNull: true,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		name: {
			type: Sequelize.STRING,
			notNull: true,
			notEmpty: true,
			comment: '标签名称',
		},
		desc: {
			type: Sequelize.STRING,
			comment: '标签描述',
		},
	}, {
		tableName: 'tag'
	});
};