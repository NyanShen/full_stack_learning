const path = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser'); // cookie
const logger = require('morgan'); // 日志模块
const cors = require("cors"); // 解决跨域

// 路由模块
const indexController = require('./controllers/index.controller');
const usersController = require('./controllers/user.controller');
// const rolesController = require('./controllers/role.controller');
// const menusController = require('./controllers/menu.controller');
// const filesController = require('./controllers/file.controller');

const app = express();

// 模版引擎view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 静态资源配置
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// 解析前端表单数据
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
// cookie中间件
app.use(cookieParser());

// jwt token配置
const { jwtSecretKey } = require('./config/jwt.config.js');
const { expressjwt: jwt } = require("express-jwt");

app.use(
	jwt({
		secret: jwtSecretKey,
		algorithms: ['HS256'], //加密算法
	}).unless({
		path: [/^\/api\//], //不需要token的路径, api开头的不需要token
	}))

// sequalize同步
const db = require("./models/index.js");
db.sequelize.sync(); // 数据库没有表则创建

// 解决跨域
app.use(cors())
// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // 允许任何源
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");
	next();
})

// error handler
app.use(function (req, res, next) {
	// status 0 正常, -1错误
	res.sendError = (err, status = -1) => {
		res.send({
			code: status,
			msg: err instanceof Error ? err.message : err,
			data: null
		})
	};
	next()
});


// 路由配置
app.use('/api', indexController);
app.use('/api/users', usersController);
// app.use('/api/roles', rolesController);
// app.use('/api/menus', menusController);
// app.use('/api/file', filesController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

const Joi = require('joi');
// 定义错误处理中间件--对joi数据校验失败(注意:需要放在最后面写, 否则err获取不到)
app.use(function (err, req, res, next) {
	if (err instanceof Joi.ValidationError) {
		return res.sendError(err)
	}
	next()
});

app.listen(8888, function() {
	console.log("app listen 8888 start");
})
module.exports = app;