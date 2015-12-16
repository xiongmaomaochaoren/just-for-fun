/**
 * webpack配置文件
 * Created by wangcheng on 15/11/10.
 */

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config  = {
    entry: {
        "fund-party-20151116" : './src/js/fund-party-20151116.js',
        vendors: [ 'console-polyfill', 'object-assign', 'es5-shim/es5-shim', 'es5-shim/es5-sham', './src/utils/mobileRem' ],
        common : './src/css/common.less'
    },
    output: {
        path: __dirname + '/prebuild',
        publicPath: '', //'http://127.0.0.1:9000/build',
        filename: 'js/[name].bundle.js'
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
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=20460'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.woff', '.png', '.jpg', '.less', '.css']
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.js'),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("css/[name].bundle.css", {
            allChunks: true,
            publicPath : "/css/"
        })
    ],
    stats: {

    }
};

module.exports = config;
