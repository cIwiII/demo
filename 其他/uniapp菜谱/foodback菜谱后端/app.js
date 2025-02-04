var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./utils/dbutils');
//导入jwt.js文件
const jwtAuth=require('./utils/jwt');

var indexRouter = require('./routes/index');
var homeRouter=require('./routes/home');
var categoriesRouter=require('./routes/categories');
var searchRouter=require('./routes/search');
var vipRouter=require('./routes/vip');
var userRouter=require('./routes/users');
var adminRouter=require('./routes/admin');
var memberRouter=require('./routes/member');
var mealRouter=require('./routes/meal');

var app = express();
// 设置 CORS 允许跨域
var allowCrossDomain = function (req, res, next) {
  // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
  res.header("Access-Control-Allow-Origin", "*");
  // 设置允许跨域访问的请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
  // 设置允许跨域访问的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置jwtAuth必须要放在所有的一级路由之前

// app.use(jwtAuth);
// app.use(allowCrossDomain); 

app.use('/', indexRouter);
app.use('/home',homeRouter);
app.use('/categories',categoriesRouter);
app.use('/search',searchRouter);
app.use('/vip',vipRouter);
app.use('/user',userRouter);
app.use("/admin",adminRouter);
// 后端接口（会员管理）
app.use("/member",memberRouter);
// 后端接口（套餐管理）
app.use("/meal",mealRouter);

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
app.listen(4001,()=>{console.log('giles在线商城后台服务已启动，切勿关闭，关闭4001');});

module.exports = app;
