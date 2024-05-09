const path = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser'); // cookie
const session = require('express-session');
const logger = require('morgan'); // 日志模块
const cors = require("cors"); // 解决跨域

// 路由模块module.exports
const indexController = require('./controllers/index.controller');
const authController = require('./controllers/auth/auth.controller');
const userController = require('./controllers/system/user.controller');
const roleController = require('./controllers/system/role.controller');
const menuController = require('./controllers/system/menu.controller');
const operationController = require('./controllers/system/operation.controller');
const departmentController = require('./controllers/system/department.controller');
const permissionController = require('./controllers/system/permission.controller');
const fileController = require('./controllers/system/file.controller');

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
// session中间件
const { sessionSecryptKey } = require('./config/session.config')
app.use(session({
	secret: sessionSecryptKey,
	resave: false,
	saveUninitialized: true,
}));

// jwt token配置
// const { jwtMiddleware } = require('./middlewares/jwt');
// app.use(jwtMiddleware)

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

// 链接socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	console.log('a user connection');
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
	});
});


// error handler
app.use(function (req, res, next) {
	// status 0 正常, -1错误
	res.sendResult = (err, status = -1, data = null) => {
		res.send({
			code: status,
			msg: err instanceof Error ? err.message : err,
			data
		})
	};
	next()
});

// 路由配置
app.use('/api/auth', indexController);
app.use('/api/auth', authController);
app.use('/api/users', userController);
app.use('/api/roles', roleController);
app.use('/api/menus', menuController);
app.use('/api/operations', operationController);
app.use('/api/departments', departmentController);
app.use('/api/permissions', permissionController);
app.use('/api/file', fileController);

app.get('/api/test/socket', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// joi 官方文档 `https://joi.dev/api/?v=17.12.3`
const Joi = require('joi');
// 定义错误处理中间件--对joi数据校验失败(注意:需要放在最后面写, 否则err获取不到)
app.use(function (err, req, res, next) {
	if (err instanceof Joi.ValidationError) {
		return res.sendResult(err)
	}
	if (err.name === 'UnauthorizedError') {
		next(createError(401));
		return
	}
	next()
});

app.listen(8888, function () {
	console.log("服务运行http://localhost:8888/api");
})
module.exports = app;