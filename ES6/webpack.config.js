var webpack = require("webpack");

var config = {
    entry : {
        es6 : ["babel-polyfill", "./es6.js"] //babel-polyfill 增加generator支持
    },
    output : {
        path : __dirname,
        filename : "static/js/[name].js"
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
                loader: 'style-loader!css-loader!less-loader'
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

    ]
};

module.exports = config;
