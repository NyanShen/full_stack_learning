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
db.sequelize = sequelize; //实例
db.testConnection = testConnection; //测试数据库连接

// 系统管理
db.user = require("./system/user.model.js")(sequelize); // 用户
db.role = require("./system/role.model.js")(sequelize); // 角色
db.menu = require("./system/menu.model.js")(sequelize); // 菜单
db.operation = require("./system/operation.model.js")(sequelize); // 操作
db.department = require("./system/department.model.js")(sequelize); // 部门
db.permission = require("./system/permission.model.js")(sequelize); // 权限
db.usersroles = require('./system/user_role.model.js')(sequelize); // 用户-角色
db.permissionsroles = require("./system/permission_role.model.js")(sequelize); // 权限-角色
db.permissionsmenus = require("./system/permission_menu.model.js")(sequelize); // 权限-菜单
db.permissionsoperations = require("./system/permission_operation.model.js")(sequelize); // 权限-操作

// 上传图片
db.image = require("./system/image.model.js")(sequelize);

// blog 文章-标签-评论-浏览

module.exports = db;