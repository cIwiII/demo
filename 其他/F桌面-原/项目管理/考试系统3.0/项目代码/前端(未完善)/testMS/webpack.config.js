// "webpack-dev-server": "^3.11.2"

let path=require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CssExtractPlugin=require('mini-css-extract-plugin');
let webpack = require('webpack');
let nameArr=['collections','errors','index','login','reg','answers','exercises','tests','tests-basic-info','tests-end'];
let fESA='192.168.11.17'   //前端地址
let bESA='http://192.168.11.17:3000/'   //后端地址



function getEntry(){
    let obj={};
    nameArr.forEach(valname=>{
        obj[valname]=`./src/js/${valname}.js`
    })
    return obj
}
function getHtml(){
    let htmlArr=[];
    nameArr.forEach(function(valname){
        htmlArr.push(
            new HtmlWebpackPlugin({
                template:`./src/html/${valname}.html`,
                filename:`./html/${valname}.html`,
                chunks:[valname]
            })
        )
    })
    return htmlArr
}
module.exports={
    mode:'development',
    entry:getEntry(),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].js'
    },
    plugins:[
        ...getHtml(),
        new CssExtractPlugin({
            filename:'./css/[name].css'
        }),
        new webpack.ProvidePlugin({
            "$": "jquery"
            //bootstrap应用，参照node_modules放主js文件中
            // import 'bootstrap/dist/css/bootstrap.min.css';
            // import 'bootstrap/dist/js/bootstrap.min.js';
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[CssExtractPlugin.loader,'css-loader']
            },
            {  
                test:/\.scss$/i,              
                use:[CssExtractPlugin.loader,'css-loader','sass-loader'] 
            },   
            {
                test:/\.(jpg|png|jpeg|gif|svg|psd|tif|bmp|webp)$/i,
                use:{
                    loader:'url-loader',  
                    options:{  
                        limit:0,//b,1024*10,10kb
                        //打包后放置位置
                        outputPath:'./image',
                        //愿名字
                        name: '[name].[ext]',
                        // loader:'file-loader',
                        //图片格式改变设为false
                        esModule:false                
                    }                
                },
                //禁止匿名重复打包
                type:'javascript/auto'
            } ,        
            { 
                test:/\.html$/i,                
                use:['html-withimg-loader']            
            }       
        ]
    },
    devServer: {
        host:fESA,
        port: 8888,
        open: true,
        openPage: './html/index.html',
        hot: true,
        proxy:{
            "/":{
                target:bESA
             }       
         }
    },
    // 没什么用
    // performance: {
    //     hints: false
    // }
}
// npx webpack执行