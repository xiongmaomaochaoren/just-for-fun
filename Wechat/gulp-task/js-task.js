/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');

/**
 * js压缩、md5生成
 * */
module.exports = function(gulp, gulpPlugin){
    return function() {
        let jsGlob = BUILD_DEST.prebuild_public + '/js/**/*.js';
        let buildJsDir = BUILD_DEST.build_public + '/js';
        let jsResourceMap = BUILD_DEST.build_map + '/js.json';
        return gulp.src(jsGlob)
            .pipe(gulpPlugin.uglify())
            .pipe(gulpPlugin.rev())
            .pipe(gulp.dest(buildJsDir))
            .pipe(gulpPlugin.rev.manifest(jsResourceMap, {
                base: BUILD_DEST.build
            }))
            .pipe(gulp.dest(BUILD_DEST.build));
    }
}