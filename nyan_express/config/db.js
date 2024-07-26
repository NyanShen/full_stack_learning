const { Sequelize } = require('sequelize');
const { database } = require('./index');
const dbConfig = {
	host: database.host,
	user: database.user,
	pass: database.pass,
	db: database.db, // 链接数据库
	dialect: database.dialect, // 数据库方言
	pool: {
		max: 10, // 数据库最大链接数
		min: 0,
		acquire: 30000, // 链接超时时间
		idle: 10000, // 链接空闲时间
	},
}

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

module.exports = sequelize;