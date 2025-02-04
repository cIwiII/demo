var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//
//鉴权配置引入
let s=require('./db/movietoken');

//数据库引入
require('./db/mgdbdata')

//对象引入
require('./db/usermodel')
require('./db/moviemodel')
require('./db/cinemamodel')


var movieRouter = require('./routes/movie');
var usersRouter = require('./routes/user');
var cinemaRouter = require('./routes/cinema');

var app = express();
//鉴权使用
app.use(s);

app.use('/movie', movieRouter);
app.use('/user', usersRouter);
app.use('/cinema', cinemaRouter);

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

app.listen(3001,function(){
  console.log('端口3001movieMS启动成功')
})
