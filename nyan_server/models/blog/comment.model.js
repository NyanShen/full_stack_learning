//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2
const { DataTypes } = require("sequelize");
/**
 * @author nyan
 * @date 2024/03/31 08:09
 * @dec:评论模型
 */
module.exports = (sequelize) => {
	return sequelize.define("Comment", {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
		},
		article_id: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文章ID',
		},
		article_title: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '文章标题',
		},
		pid: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '父级评论Id',
		},
		from_userId: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '评论来源Id',
		},
		from_username: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '评论来源',
		},
		from_user_logo: {
			type: DataTypes.TEXT("long"),
			allowNull: false,
			comment: '来源评论用户头像',
		},
		to_userId: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '回复评论用户Id',
		},
		to_username: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '回复评论名称',
		},
		to_user_logo: {
			type: DataTypes.TEXT("long"),
			allowNull: false,
			comment: '回复评论用户头像',
		},
		content: {
			type: DataTypes.TEXT("long"),
			comment: '回复评论内容',
		}
	}, {
		tableName: 'comments'
	});
};