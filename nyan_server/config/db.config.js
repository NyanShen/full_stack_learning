module.exports =  {
	host: 'localhost',
	user: 'root',
	pass: 'passw0rD',
	db: 'sym', // 链接数据库
	dialect: "mysql", // 数据库方言
	pool: {
		max: 10, // 数据库最大链接数
		min: 0,
		acquire: 30000,
		idle: 10000
	},
}