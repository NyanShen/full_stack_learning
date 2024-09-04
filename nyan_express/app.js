const express = require('express');
const path = require('path');
const createError = require('http-errors'); // 请求错误模块
const cookieParser = require('cookie-parser'); // 客户端cookie
const session = require('express-session'); // 服务端session 
const logger = require('morgan'); // 日志模块
const cors = require("cors"); // 解决跨域

const config = require('./config/index');
const app = express();
require('./common/utils/tools'); // 工具函数

/**
 * 路由引入
 */
const indexRouter = require('./routes/index');
const authRouter = require('./core/auth/routes/index.route');
const systemRouter = require('./core/system/routes/index.route');

/**
 * 配置模板引擎
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * 加载中间件(日志,json数据,表单数据,静态资源,cookie)
 */
app.use(logger('dev')); // 日志
app.use(express.json()); // json数据
app.use(express.urlencoded({ extended: false })); // 表单数据
app.use(cookieParser()); // cookie
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源
/**
 * 加载session
 */
app.use(session({
  secret: config.session.secret, // 加密秘钥
  resave: false, // 是否每次都重新保存session
  saveUninitialized: true, // 是否保存未初始化的session
}));
/**
 * 解决跨域
 */
app.use(cors());
app.all('/api/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // 允许任何源
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-CSRF-Token");
  next();
})
/**
 * 格式化返回数据格式中间件
 */
const responseFormatter = require('./common/middlewares/response_formatter');
app.use(responseFormatter());
/**
 * 加载路由
 */
app.use('/indexejs', indexRouter); // /indexejs/system
app.use('/api/auth', authRouter);
app.use('/api/system', systemRouter);

/**
 * 404错误处理
 */
app.use(function (req, res, next) {
  next(createError(404));
});
/**
 * 数据校验
 * joi 官方文档 `https://joi.dev/api/?v=17.12.3`
 * 定义错误处理中间件--对joi数据校验失败(注意:需要放在最后面写, 否则err获取不到)
 */
const Joi = require('joi');
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
/**
 * 错误处理
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/**
 * 连接数据库
 */
const sequelize = require('./config/db');
sequelize.sync().then(() => {
  console.log('Database connected...');
});
module.exports = app;
