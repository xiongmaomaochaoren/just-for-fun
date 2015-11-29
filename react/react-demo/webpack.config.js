
var webpack = require("webpack");

var config = {
    entry : "./index.js",
    output : {
        filename : "./reactDemo.js"
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
            }
        ]
    }
};

module.exports = config;
