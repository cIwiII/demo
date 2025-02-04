let path=require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CssExtractPlugin=require('mini-css-extract-plugin');
let webpack = require('webpack');
let nameArr=['index','user'];
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
    mode:'production',
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
                        limit:1024*10,
                        outputPath:'./image/',
                        esModule:false                
                    }                
                }
            } ,        
            { 
                test:/\.html$/i,                
                use:['html-withimg-loader']            
            }       
        ]
    },
    devServer: {
        port: 8888,
        open: true,
        openPage: './html/index.html',
        hot: true ,     
        proxy:{
            "/":{
                target:'http://127.0.0.1:3000/'
             }       
         }
    }
}
// npx webpack执行