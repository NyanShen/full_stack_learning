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
db.user = require("./system/user.model.js")(sequelize, Sequelize);
db.role = require("./system/role.model.js")(sequelize, Sequelize);
db.menu = require("./system/menu.model.js")(sequelize, Sequelize);
db.department = require("./system/department.model.js")(sequelize, Sequelize);
db.operation = require("./system/operation.model.js")(sequelize, Sequelize);
db.permission = require("./system/permission.model.js")(sequelize, Sequelize);
db.permissionsroles = require("./system/permission_role.model.js")(sequelize, Sequelize);
db.permissionsmenus = require("./system/permission_menu.model.js")(sequelize, Sequelize);
db.permissionsoperations = require("./system/permission_operation.model.js")(sequelize, Sequelize);
// 上传图片
db.image = require("./system/image.model.js")(sequelize, Sequelize);

// 用户-文章-标签(文章)-评论
db.tag = require("./tag.model.js")(sequelize, Sequelize);
db.article = require("./article.model.js")(sequelize, Sequelize);
db.articleTag = require("./article_tag.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;