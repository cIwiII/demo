//1.导入mongoose依赖包
var mongoose=require('mongoose');
//2.连接数据库
var dbURI="mongodb://localhost:27017/WNMallWechat";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{console.log('mongodb数据库连接成功');});