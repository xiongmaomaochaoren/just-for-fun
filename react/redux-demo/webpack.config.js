
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry : "./index.js",
    output : {
        filename : "./bundle.js"
    },
    module : {
        loaders : [
            {
                test : /\.js[x]?$/,
                loader : "babel",
                exclude : /node_modules/,
                query : {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            }
        ]
    },
    plugins : [
        new ExtractTextPlugin("bundle.css", {
            allChunks: true
        })
    ]
};

module.exports = config;
