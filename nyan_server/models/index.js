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
db.Sequelize = Sequelize; //
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

// 点餐系统--菜单
db.category = require("./onlineOrder/category.model.js")(sequelize); // 菜品分类
db.dish = require("./onlineOrder/dish.model.js")(sequelize); // 菜品
db.option = require("./onlineOrder/option.model.js")(sequelize); // 菜品选项(加辣、调料类)
db.specification = require("./onlineOrder/specification.model.js")(sequelize); // 菜品规格(大、中、小)
db.dishoption = require("./onlineOrder/dish_option.model.js")(sequelize); // 菜品-选项
db.dishspecification = require("./onlineOrder/dish_specification.model.js")(sequelize); // 菜品-规格

// 点餐系统--订单
db.customer = require("./onlineOrder/customer.model.js")(sequelize);
db.order = require("./onlineOrder/order.model.js")(sequelize);
db.orderdetail = require("./onlineOrder/order_detail.model.js")(sequelize);
db.paymethod= require("./onlineOrder/pay_method.model.js")(sequelize);
db.payrecord= require("./onlineOrder/pay_record.model.js")(sequelize);

// 聊天消息
db.chat = require("./chat/chat.model.js")(sequelize);
db.chatMsg = require("./chat/msg.model.js")(sequelize);

// blog 文章-标签-评论-浏览

module.exports = db;