'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'),resolve('test'),resolve('./node_modules/swiper/dist/'),resolve('./node_modules/dom7/dist/')] ,
        // 解决UglifyJsPlugin报错 
        // UglifyJsPlugin不支持Es6语法，vue-cli生成的项目中当引入的node_modules里有es6的的语法vue文件时,会报错如： 
        // ERROR in static/js/vendor.2de645693dea309ad3b2.js from UglifyJs 
        // Unexpected token: operator (>) [./~/vue-bulma-tooltip/src/index.js:14,0][static/js/vendor.2de645693dea309ad3b2.js:60880,24]
        //报哪里就resolve哪里
        // resolve('node_modules/vue-bulma-tooltip')
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 90000,//引入字体图标，比如font-awesome的图标路径出错， 在webpack.base.conf.js里面修改limit要改大，把10000改为90000
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
