//建立数据库连接代码
//引入mongoose模块
let s=require('mongoose');
//数据库的url
let rul='mongodb://127.0.0.1:27017/stuMS';
//连接数据库
s.connect(rul,{
    //使用新路径分析册程序
    useNewUrlParser:true,
    //使用同一端口
    useUnifiedTopology:true
});
//连接执行事件
s.connection.on('connected',function(){
    console.log('数据库连接成功');
});


