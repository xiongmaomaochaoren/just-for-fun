/**
 * Created by wangcheng on 15/12/20.
 *
 * browser-sync : 基于chokidar模块开发
 * Node.js原生fs.watch、fs.watchFile 有太多问题无法使用, 详细参考 : https://github.com/paulmillr/chokidar#why
 * browser-sync参考文档 : https://www.browsersync.io/docs/options/
 */

'use strict';

let BUILD_DEST = require('./path-const.js');

let modRewrite = require('connect-modrewrite');
let browserSync = require('browser-sync').create();

/**
 * 将编译后代码部署到Node.js Server中
 * */
module.exports = function(gulp, gulpPlugin){
    return function() {
        let viewGlob = BUILD_DEST.prebuild_view + '/**/*.html';
        let cssGlob = BUILD_DEST.prebuild_public + '/css/**/*.css';
        let jsGlob = BUILD_DEST.prebuild_public + '/js/**/*.js';
        let imgGlob = BUILD_DEST.prebuild_public + '/img/**/**';
        browserSync.init({
            //proxy : '',
            open: false,
            port : 8889,
            files : [
                viewGlob,
                cssGlob,
                jsGlob,
                imgGlob
            ],
            server : {
                baseDir : BUILD_DEST.prebuild,
                middleware : [
                    modRewrite([
                        '^/static/(.*) /public/$1',
                        '(.*).html /views/$1.html'
                    ])
                ]
            }
        });
    }
}