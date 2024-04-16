const { DataTypes } = require("sequelize");
//标签
module.exports = (sequelize) => {
	return sequelize.define("Tag", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '标签名称',
		},
		remark: {
			type: DataTypes.STRING,
			comment: '标签描述',
		},
	}, {
		tableName: 'tags'
	});
};