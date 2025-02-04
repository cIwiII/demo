var express = require('express');
var router = express.Router();

let userArr=[
  {
    account:'admin',
    password:'ad123'

  }
]
/* GET users listing. */
router.get('/:acc/:pwd', function(req, res, next) {
  let {acc,pwd}=req.params;
  let a=userArr.filter(val=>val.account=acc)
  if(a.length!=0){
    if(a[0].password==pwd){
      res.send({
        code:200,
        message:"登陆成功"
      })
    }else{
      res.send({
        code:250,
        message:"密码错误"
      })
    }
    
  }else{
    res.send({
      code:250,
      message:"账号不存在"
    })
  }
  res.send('respond with a resource');
});

module.exports = router;
