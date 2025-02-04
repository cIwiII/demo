//链接数据库
// 引入模块
let mongoose=require('mongoose');
let url='mongodb://127.0.0.1:27017/testMS';
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
//执行链接
mongoose.connection.on('connected',function(){
    console.log('数据库链接成功');
})