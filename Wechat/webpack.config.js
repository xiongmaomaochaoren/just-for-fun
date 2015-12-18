/**
 * webpack配置文件
 * Created by wangcheng on 15/12/10.
 */

/**
 * Todo : 多文件多入口支持
 * Todo : common组件抽取
 */

function getEntry(){
    
}

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config  = {
    entry: {
        "redux-todo" : './client/page/redux-todo/redux-todo.js'
        //vendors: [ 'console-polyfill', 'object-assign', 'es5-shim/es5-shim', 'es5-shim/es5-sham', './src/utils/mobileRem' ],
        //common : './src/css/common.less'
    },
    output: {
        path: __dirname + '/prebuild',
        publicPath: '',
        filename: 'public/js/[name].bundle.js'
    },
    module: {
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
                loader: 'url?limit=100000'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=20460'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.woff', '.png', '.jpg', '.less', '.css']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("public/css/[name].bundle.css", {
            allChunks: true,
            publicPath : "/css/"
        })
    ]
};

module.exports = config;
