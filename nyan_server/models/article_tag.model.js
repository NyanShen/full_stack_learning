//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//标签
module.exports = (sequelize, Sequelize) => {
	return sequelize.define("ArticleTag", {
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
		},
		article_id: {
			type: Sequelize.STRING,
			allowNull: false,
			comment: '文章id',
		},
		tag_id: {
			type: Sequelize.STRING,
			comment: '标签id',
			allowNull: false,
		},
	}, {
		tableName: 'articles_tags'
	});
};