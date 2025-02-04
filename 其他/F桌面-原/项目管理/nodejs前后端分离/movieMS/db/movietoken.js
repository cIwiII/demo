
//----------------
//引入鉴权插件
let {expressjwt}=require('express-jwt');
let jwtAuth=expressjwt({
  //解密是否合法，值和生成的密钥一致
  secret:'movielog',
  //配置鉴权算法，算法名（'HS256'）,其中一种
  algorithms:['HS256'],
  //false:不带token的请求不进行鉴权验证，
  //true：无论是否带token都要鉴权，没有token直接失败401
  credentialsRequired:false

//链式调用，白名单
}).unless({
  path:['/user','/index.html','/log.html','/reg.html']//请求路径或方式，一二级路由
});//返回一个对象165
//暴露对象,在入口app.js中变量接收=require引入
//app.use(),使用
module.exports=jwtAuth;
//前端请求
/* headers:{
  Authorization:'Bearer '+本地或临时存储
} */