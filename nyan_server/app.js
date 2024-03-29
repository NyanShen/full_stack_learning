const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // 日志
const cors = require("cors"); // 解决跨域

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rolesRouter = require('./routes/roles');
const menusRouter = require('./routes/menus');
const filesRouter = require('./routes/files');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// sequalize同步
const db = require("./models/index.js");
db.sequelize.sync(); // 数据库没有表则创建

// 解决跨域
app.use(cors())
// 设置跨域和相应数据格式
app.all('/api/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // 允许任何源
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");
	next();
})

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/menus', menusRouter);
app.use('/api/file', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen("8080", () => {
	console.log("项目启动成功, 端口:", "8080");
})

module.exports = app;