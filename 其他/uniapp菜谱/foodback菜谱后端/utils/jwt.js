const expressJwt=require('express-jwt');
const jwtAuth=expressJwt({
    secret:'PRIVATE_KEY', //为密码
    algorithms:['HS256'],//为jwt的算法
    credentialsRequired:true //如果为true，不管请求是否带token都要做验证，如果为false不做验证
}).unless({
    path:[
        '/user/wxLogin',
        '/categories',
        '/admin/login',
        '/admin/fileUpload',
        {url:/^\/search\/.*/,methods:['GET','POST']},
        {url:/^\/home\/.*/,methods:['GET','POST']},
        {url:/^\/vip\/.*/,methods:['GET','POST']}
    ]
});
//unless表示的是要放行的配置
module.exports=jwtAuth;