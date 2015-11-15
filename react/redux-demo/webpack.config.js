
var webpack = require("webpack");

var config = {
    entry : "./tests/reduxTest.js",
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
            }
        ]
    }
};

module.exports = config;
