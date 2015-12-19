/**
 * Created by wangcheng on 15/12/20.
 */
"use strict";

let BUILD_DEST = require('./path-const.js');

let webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require(BUILD_DEST.base + '/webpack.config');

module.exports = function(gulp, gulpPlugin){
    return function(){

        let pageGlob = BUILD_DEST.client  + '/page/**/*.html';

        //webpack 只能处理js、css, 无法处理html, 需要gulp copy编译html
        gulp.src(pageGlob)
            .pipe(gulp.dest(BUILD_DEST.prebuild_view));

        return gulp.src('./client/page/redux-todo/redux-todo.js')
                   .pipe(webpackStream(webpackConfig, webpack))
                   .pipe(gulp.dest(BUILD_DEST.prebuild_public));
    }
}