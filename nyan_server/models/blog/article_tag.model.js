//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2
const { DataTypes } = require("sequelize");
//标签
module.exports = (sequelize) => {
	return sequelize.define("ArticleTag", {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
		},
		article_id: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文章id',
		},
		tag_id: {
			type: DataTypes.STRING,
			comment: '标签id',
			allowNull: false,
		},
	}, {
		tableName: 'articles_tags'
	});
};