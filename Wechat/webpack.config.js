/**
 * webpack配置文件
 * Created by wangcheng on 15/12/10.
 */



/**
 * Todo : common组件抽取
 */

'use strict';


let path = require('path');
let glob = require('glob');

const BASE_DIR = __dirname;

/**
 * 获取client/page下所有的js入口文件
 * 计算相对webpack.config.js的相对路径  (value)
 * 获取js文件的basename (key)
 * 利用key和value返回entry数组
 */
function getPageEntry(){
    let ext = '.js';
    //采用glob方案,而非正则,跨语言文件匹配的标准方案 : https://github.com/isaacs/node-glob
    let entryPattern = BASE_DIR + '/client/page/**/*.js';
    let entrys = {};
    let entryFiles = glob.sync(entryPattern, {});
    entryFiles.forEach(function(file, index){
        let basename = path.basename(file, ext);
        let relativePath = path.relative(BASE_DIR, file);
        let fixRelativePath = './' + relativePath;
        entrys[basename] = fixRelativePath;
    });
    return entrys;
}

function getCommonEntry(){

}

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config  = {
    entry: getPageEntry(),
    //vendors: [ 'console-polyfill', 'object-assign', 'es5-shim/es5-shim', 'es5-shim/es5-sham', './src/utils/mobileRem' ],
    //common : './src/css/common.less'
    output: {
        //定义js、css、image等url的前缀以及cdn, 非常重要
        publicPath: '/static/',
        filename: 'js/[name].bundle.js'
        //path: BASE_DIR + '/prebuild/public/', path 在gulp中定义
    },
    module: {
        //webpack loader : http://webpack.github.io/docs/using-loaders.html
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader : 'babel',
                query : {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.woff$/,
                loader: 'url',
                query : {
                    limit : 512
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query : {
                    limit : 512,
                    name : 'img/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.woff', '.png', '.jpg', '.less', '.css']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("css/[name].bundle.css", {
            allChunks: true
        })
    ]
};

module.exports = config;
