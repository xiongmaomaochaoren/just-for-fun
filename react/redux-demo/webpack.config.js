
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry : {
        reduxDemo : ["./reduxDemo.js"]
    },
    output : {
        path : __dirname,
        filename : "static/pkg/js/[name].js"
    },
    module : {
        loaders : [
            //增加es6支持
            {
                test : /\.js[x]?$/,
                loader : "babel-loader",
                exclude : /node_modules/,
                query : {
                    presets: ['es2015','react']
                }
            },
            //增加less支持
            {
                test: /\.less/,
                //loader: 'style-loader!css-loader!less-loader'
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            //base64\图片加载  ： https://github.com/webpack/url-loader
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                query: {
                    limit : 1,
                    name : "./static/[path][name].[ext]"
                }
            }
        ]
    },
    plugins : [
        new ExtractTextPlugin("static/pkg/css/[name].css", {
            allChunks: true
        })
    ]
};

module.exports = config;
