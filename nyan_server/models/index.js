const dbConfig = require("../config/db.config.js");
const {
	Sequelize
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

db.Sequelize = Sequelize; //引入
db.sequelize = sequelize; //实例
db.testConnection = testConnection; //测试

// 角色
db.role = require("./role.model.js")(sequelize, Sequelize);
db.image = require("./image.model.js")(sequelize, Sequelize);

module.exports = db;