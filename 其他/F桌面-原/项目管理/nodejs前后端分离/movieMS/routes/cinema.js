let express=require('express');
let router=express.Router();
//引入mongoose模块
let mgs = require('mongoose');

router.get('/',async function(req,res,next){
    let re=await mgs.model('cinemamodel').find({}).populate('movieIdList');
    res.send({
        code:200,
        data:re
    })
})

router.delete('/:id',async function(req,res){
    console.log('delete执行')
    let re1=await mgs.model('cinemamodel').deleteMany(
        {_id:req.params.id}
    )
    let re=await mgs.model('cinemamodel').find({}).populate('movieIdList');
    if(re1.deletedCount!=0){
        res.send({
            code:200,
            message:'影院删除成功',
            data:re
        })
    }else{
        res.send({
            code:250,
            message:'删除失败',
        })
    }
    
})


module.exports=router;