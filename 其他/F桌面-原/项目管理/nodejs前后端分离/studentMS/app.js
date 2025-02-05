var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//数据库连接
require('./mongoose/dbdata');
//模型关联导入
require('./db/modelclass')
require('./db/modelstudent')
require('./db/modeluser')
require('./db/modelgrades')
require('./db/modelteacher')


var app = express();

// 设置 CORS 允许跨域
var allowCrossDomain = function (req, res, next) {   
  // 设置允许哪一个源（域）可以进行跨域访问，* 表示所有源    
  res.header("Access-Control-Allow-Origin", "*");    
  // 设置允许跨域访问的请求头    
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");    
  // 设置允许跨域访问的请求类型   
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");   
  // 设置允许 cookie 发送到服务器    
  res.header('Access-Control-Allow-Credentials', 'true');    
  next();
};
app.use(allowCrossDomain); // 运用,放在一级路由配置前

//鉴权配置引入
let s=require('./db/token');
app.use(s);

//对应文件路径
// var indexRouter = require('./routes/index');
var classRouter = require('./routes/class');
var stuRouter = require('./routes/students');
var usersRouter = require('./routes/users');
var gradesRouter = require('./routes/grades');
var teacherRouter = require('./routes/teacher');
var persettingRouter = require('./routes/persetting');
//var mongodbRouter = require('./routes/mongodb');

//一级路由，网站开始地址，连接后面对象地址
// app.use('/index', indexRouter);
app.use('/class', classRouter);
app.use('/students', stuRouter);
app.use('/users', usersRouter);
app.use('/grades', gradesRouter);
app.use('/teacher', teacherRouter);
app.use('/persetting', persettingRouter);
//app.use('/mongodb', mongodbRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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

app.listen(3000,function(){
  console.log("服务器3000启动成功")
})
