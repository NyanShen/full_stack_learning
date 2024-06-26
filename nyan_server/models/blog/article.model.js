//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2
const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define("Article", {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4 // 或 DataTypes.UUIDV1
        },
        sort_id: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '分类ID',
        },
        article_title: {
            type: DataTypes.STRING,
            
            allowNull: false,
            comment: '文章标题',
        },
        article_summary: {
            type: DataTypes.STRING,
            
            allowNull: false,
            comment: '文章摘要',
        },
        article_content: {
            type: DataTypes.TEXT("long"),
            allowNull: false,
            comment: '文章内容',
        },
        article_cover: {
            type: DataTypes.STRING,
            comment: '文章封面',
            defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3rMMTNtwMeiHwh3ZBJ-dHyg84iWK04GGyA&usqp=CAU'
        },
        isPublish: {
            type: DataTypes.BOOLEAN,
            comment: '是否发布',
            defaultValue: true
        },
        viewsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '文章浏览量',
        },
        commentsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '文章评论数',
        },
        isTop: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否顶置',
        },
        isHot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否火热',
        },
        isRecommend: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: '是否推荐',
        },
        reprint: {
            type: DataTypes.STRING,
            comment: '转载地址',
        },
        editType: {
            type: DataTypes.STRING,
            comment: 'md',
        },
    }, {
		tableName: "articles"
	});
};
