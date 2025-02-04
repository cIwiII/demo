var express = require('express');
var router = express.Router();
//引入mongoose模块
let mgs = require('mongoose');
//引入文件接收模块multer插件工具包。handleFile.js（自备js文件使用）,返回对象解构赋值
let { uploadFiles } = require('../db/handleFile');

/* GET home page. */
router.post('/:name/:des/:img', async function (req, res) {
  console.log('post电影请求成功')
  let { name, des, img } = req.params
  let amoviedata = await mgs.model('moviemodel').find({
    name: name
  });
  if (amoviedata == 0) {
    //上传文件的配置要求
    let uploadMethod = uploadFiles({
      path: './public/images',
      key: 'imgna',//前端指定的存文件对应的属性名字
      size: 1024
    });
    // console.log(req.body)
    uploadMethod(req, res, async function (error) {
      //有结果时执行的回调函数
      if (error) {//没有参数接收失败转为boolean为false
        res.send({
          code: 250,
          message: '上传失败'
        })
      } else {
        //存入数据库
        let addacc = await mgs.model('moviemodel').create(
          { name, description: des, img: req.files[0].filename }
        );
        res.send({
          code: 200,
          message: '上传成功',
          data: `http://127.0.0.1:3000/images/${req.files[0].filename}`
        })
      }
    });
  } else {
    res.send({
      code: 250,
      message: '电影已存在'
    })
  }


});

//get
router.get('/', async function (req, res,) {
  let re = await mgs.model('moviemodel').find({});
  // console.log(re)
  res.send({
    code: 200, message: '查询成功', data: re
  });
});
//delete//删除
router.delete('/:id', async function (req, res, next) {
  console.log('delete请求成功')

  let re = await mgs.model('moviemodel').deleteMany(
    { _id: req.params.id });

  // console.log(re);
  if (re.deletedCount > 0) {
    let re2 = await mgs.model('moviemodel').find({});
    res.send({
      code: 200, message: '删除成功', data: re2
    });
  } else {
    res.send({
      code: 200, message: '删除失败'
    });
  }

});
router.put('/:id/:name/:description/:img', async function (req, res) {
  console.log('修改请求');
  let { id, name, description, img } = req.params;

  let uploadMethod = uploadFiles({
    path: './public/images',
    key: 'imgna',//前端指定的存文件对应的属性名字
    size: 1024
  });
  uploadMethod(req, res, async function (error) {
    //有结果时执行的回调函数
    if (error) {//没有参数接收失败转为boolean为false
      res.send({
        code: 250,
        message: '上传失败'
      })
    } else {
      if (!req.files[0]) {//未修改图片
        let re = await mgs.model('moviemodel').updateMany(
          { _id: id },
          { name,description,img}
        );
        res.send({
          code: 200,
          message: '修改成功'
        })
      } else {//修改了图片
        let re = await mgs.model('moviemodel').updateMany(
          { _id: id },
          { name,description,img:req.files[0].filename}
        );
        res.send({
          code: 200,
          message: '修改并上传图片成功',
          data: `http://127.0.0.1:3000/images/${req.files[0].filename}`
        })
      }

    }
  });

});


module.exports = router;
