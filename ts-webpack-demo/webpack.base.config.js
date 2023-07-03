// 两个环境的公共配置
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MineCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HappyPack = require('happypack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpack = require('webpack');

//多页面打包，文件过多采用数组 自动生成,数组存放文件名,需要对应html和js文件
const nameArr=['index','login'];

/** 入口，遍历函数方法 */
function getEntry(){
    //entry是个对象，创建对象
    let obj={};
    nameArr.forEach(valname=>{
        obj[valname]=`./src/js/${valname}.js`
    })
    return obj
}

/** 动态打包函数 */
function getHtml(){
    let htmlArr=[];
    nameArr.forEach(function(valname){
        htmlArr.push(
            new HtmlWebpackPlugin({
                //参照项目根目录
                template:`./src/html/${valname}.html`,
                //参照dist文件目录，打包后的文件地址和名字
                filename:`./html/${valname}.html`,
                //<script defer="defer">异步加载js文件,
                chunks:[valname]
            })
        )
        
    })
    return htmlArr
}

// 构造出共享进程池，进程池中包含5个子进程
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const { NODE_ENV } = process.env;

module.exports = {
    mode: NODE_ENV,

    entry: {
        index: './js/index.js',
        // index:'./src/js/index.js',//打包单个文件路径
        // login:'./src/js/login.js'
    },
    //函数方法动态生成
    entry: getEntry(),

    // 出口文件位置
    output: {
        // 出口文件的路径(__dirname 获取项目的绝对路径)
        path: path.resolve(__dirname, 'dist'),
        // 出口文件的名称,[]动态填充文件名，name原文件名
        filename: 'js/[name].js'
    },
    // module打包规则配置, 配置 loader
    module: {
        rules: [
            {
                test:/\.css$/i,//规则
                use:[MineCssExtractPlugin.loader,'css-loader']//根据配置自动打包css
            },
            {
                test: /\.s[ac]ss$/i,     // 需要匹配的文件后缀名
                exclude: /node_modules/, // 排除 node_modules 目录
                //指定以什么插件进行打包 
                use: [
                    MineCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                // 将.js文件交给id为babel的 happypack 实例来执行
                // 1) 用 happypack/loader 代原始的 loaders 列表
                use: 'happypack/loader?id=babel',
                include: /js/,
                // 排除 node_modules 目录下的文件，
                // node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: [/node_modules/, /src/],
            },
            //img规则 
            {
                test:/\.(jpg|png|jpeg|gif|svg|psd|tif|bmp|webp)$/i,
                //转为base64字符串格式,无法正常显示，取消↓行代码注释
                // type:'javascript/auouto',
                use:{
                    loader:'url-loader',         
                    options:{  
                        //将10KB以下的图片自动转为base64字符串格式放在页面中 
                        limit:0,//1024*10,
                        //输出，参照(dist)中的路径，根目录为dist
                        outputPath:'./image/',
                        //打包原名字，（有无）
                        name: '[name].[ext]',
                        esModule:false//用于解决兼容问题 图片格式不改变                   
                    }                
                },
                //禁止匿名重复打包（会在dist更目下额外生成文件，使用也是这个文件）
                type:'javascript/auto'
                
            } ,
            //对html文件中的图片的打包规则配置            
            { 
                test:/\.html$/i,                
                use:['html-withimg-loader']            
            },
            //字体加载处理(未验证有效性)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            //csv,tsv文件数据打包处理(未验证有效性)
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            //xml文件数据打包处理(未验证有效性)
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // 多页面打包自动生成，数组解构
        // ...getHtml(),
        // 每次打包前自动清理dist下的文件, 参数可选，默认删除无用文件，
        new CleanWebpackPlugin(),

        //创建HtmlWebpackPlugin对象和内部配置
        new HtmlWebpackPlugin({
            //参照项目根目录,源文件路径
            template:'./src/html/index.html',
            //参照dist文件目录，打包后的文件地址和名字
            filename:'./html/index.html',
            //<script defer="defer">异步加载js文件, 对应的入口 js 文件
            chunks:['index']
        }),

        new MineCssExtractPlugin({
            // 配置打包后的 CSS 文件的存储位置, dist开始
            filename: 'css/[name].css'  
        }),

        new CopyPlugin({
            patterns: [
                // from：原文件的位置，to：复制后的位置dist/static
                { from: "./src/static", to: "./static" },
            ]
        }),

        new webpack.ProvidePlugin({
            "$": "jquery"
            //bootstrap应用，参照node_modules放主js文件中
            // import 'bootstrap/dist/css/bootstrap.min.css';
            // import 'bootstrap/dist/js/bootstrap.min.js';
        }),

        // 多进程打包
        new HappyPack({
            // id 标识 happypack 处理那一类文件
            id: 'babel',
            // 共享线程池
            threadPool: happyThreadPool,
            // 3) 配置一个替代步骤 1) 中的loader
            loaders: ['babel-loader'],
            // 日志输出
            verbose: true
        }),
        new HappyPack({
            // id 标识 happypack 处理那一类文件
            id: 'babel2',
            // 共享线程池
            threadPool: happyThreadPool,
            // 3) 配置一个替代步骤 1) 中的loader
            loaders: ['babel-loader'],
            // 日志输出
            verbose: true
        })
    ],
    // 没什么用
    // performance: {
    //     hints: false
    // }
    //非全局命令执行npx 模块名

    // contentBase: './dist',//(self-将dist设置为可访问文件)
}


//-- npx webpack执行  自动打包命令

// 依赖下载
/* 
"devDependencies": {
    "css-loader": "^5.1.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "html-withimg-loader": "^0.1.16",
    "mini-css-extract-plugin": "^2.6.0",
    "node-sass": "^7.0.1",
    "sass-loader": "^13.0.0",
    "url-loader": "^4.1.1",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^3.11.2",
    
    "@babel/core": "^7.19.3",
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.7.1",
    "happypack": "^5.0.1",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.6.1",
    "node-sass": "^7.0.3",
    "sass-loader": "^13.0.2",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1",
    "webpack-merge": "^5.8.0",
    "webpack-parallel-uglify-plugin": "^2.0.0"
},
"dependencies": {
    "bootstrap": "^4.6.1",
    "jquery": "^3.6.0",
    "popper.js": "^1.16.1"
}
*/

/* 
移除5 main,加"private":true,确保我们安装包是私有的（private）;

lodash:library依赖包，npm install --save lodash，或者npm i lodash;
import _ from 'lodash',（要使用的js文件）导入；

原本执行的时npx webpack，在scripts加属性"build": "webpack"，
可以使用npm run build,替代npx命令；

"watch": "webpack --watch",（观察者模式）等同于下载
"webpack-dev-server ": "^3.11.2"的自动打包功能，放置于scripts中
运行 npm run watch，就会看到 webpack 编译代码，
然而却不会退出命令行。这是因为 script 脚本还在观察文件。

"start": "webpack-dev-server --open",添加一个 script 脚本，
可以直接运行开发服务器(dev server)：命令行中运行 npm start运行
类似与npx webpack serve命令

*/