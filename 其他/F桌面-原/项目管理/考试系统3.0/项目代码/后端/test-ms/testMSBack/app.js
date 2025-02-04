var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//工具-鉴权配置引入
let s = require('./util/token');

app.use(s);
//工具-数据库链接
require('./util/mgdbdata');
require('./util/handleFile')
// 引入mongoose模型对象
require('./db/collectionsModel')
require('./db/errorsModel')
require('./db/exercisesModel')
require('./db/pointsModel');
require('./db/studentsModel');
require('./db/testedsModel');
require('./db/testsModel');
require('./db/typesModel');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//接口引入
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var errorsRouter = require('./routes/errors');
var exercisesRouter = require('./routes/exercises');
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
let testDetailRouter = require('./routes/testDetail');
let testAnalysisRouter = require('./routes/testAnalysis');
let testEndRouter = require('./routes/testEnd');
let collectionsRouter = require('./routes/collections');
let testsRouter = require('./routes/tests');
let typesRouter = require('./routes/types');
let testedsRouter = require('./routes/testeds');

// 一级路由配置
app.use('/index', indexRouter);
app.use('/errors', errorsRouter);
app.use('/exercises', exercisesRouter);
app.use('/collections',collectionsRouter)
app.use('/user', userRouter);
app.use('/tests', testsRouter);
app.use('/types', typesRouter);
app.use('/testeds', testedsRouter);

app.use('/testDetail', testDetailRouter)
app.use('/testAnalysis', testAnalysisRouter);
app.use('/testEnd', testEndRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('端口3000testMS启动成功')
})
