//链接数据库
// 引入模块
let a=require('mongoose');
let url='mongodb://127.0.0.1:27017/movieMS';
a.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//执行链接
a.connection.on('connected',function(){
    console.log('数据库链接成功');
})