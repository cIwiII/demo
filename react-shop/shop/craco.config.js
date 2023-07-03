//按需打包，主题色更改
const CracoLessPlugin = require("craco-less");
const WebpackBar = require("webpackbar");
const path = require("path");
const HappyPack = require('happypack');

var happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  webpack: {
    mode: "development",
    context: {
      env: "development"
    },

    alias: {
      "@": path.resolve(__dirname, "src"),
      "@scss": path.resolve(__dirname, "src", "assets", "styles")
    },

    plugins: [
      new WebpackBar(),
      new HappyPack({
        id: "babel",
        // 共享线程池
        threadPool: happyThreadPool,
        loaders: ["babel-loader"],
        // 日志输出
        verbose: true
      }),
      new HappyPack({
        id: "babel2",
        // 共享线程池
        threadPool: happyThreadPool,
        loaders: ["babel-loader"],
        // 日志输出
        verbose: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "happypack/loader?id=babel",
          exclude: /node_modules/
        }
      ]
    },
    // devtool: "inline-source-map",
    configure: {
      devtool: "inline-source-map",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
        // filename: "js/[name].js",
      }
    },

    // devServer: {
    //   proxy: {
    //     "/api": {
    //       target: "https://music.163.com",
    //       changeOrigin: true,
    //       secure: false
    //     }
    //   }
    // }
  },

  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }], //按需打包装饰器
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true
        }
      ]
    ]
  },

  plugins: [
    //主题色更改
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "rgb(77, 148, 61)" },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
