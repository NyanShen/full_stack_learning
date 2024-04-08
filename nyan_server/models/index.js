const dbConfig = require("../config/db.config.js");
const {
	Sequelize,
	Op
} = require('sequelize');

/**
 * Option 3: Passing parameters separately (other dialects)
 */
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.pass, {
	host: dbConfig.host,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});
/**
 Testing the connection
 */
const testConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (e) {
		console.error('Unable to connect to the database:', e);
	}
}

const db = {};

db.Op = Op; //操作类型
db.Sequelize = Sequelize; //引入
db.sequelize = sequelize; //实例
db.testConnection = testConnection; //测试

// 角色菜单
db.role = require("./role.model.js")(sequelize, Sequelize);
db.menu = require("./menu.model.js")(sequelize, Sequelize);
db.rolemenu = require("./role_menu.model.js")(sequelize, Sequelize);
// 上传图片
db.image = require("./image.model.js")(sequelize, Sequelize);

// 用户-文章-标签(文章)-评论
db.user = require("./user.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.article = require("./article.model.js")(sequelize, Sequelize);
db.articleTag = require("./article_tag.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;