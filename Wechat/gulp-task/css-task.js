/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');

/**
 * css压缩、md5生成
 **/

module.exports = function(gulp, gulpPlugin){
    return function() {
        let cssGlob = BUILD_DEST.prebuild_public + '/css/**/*.css';
        let buildCssDir = BUILD_DEST.build_public + '/css';
        let cssResourceMap = BUILD_DEST.build_map + '/css.json';
        return gulp.src(cssGlob)
            .pipe(gulpPlugin.minifyCss())
            .pipe(gulpPlugin.rev())
            .pipe(gulp.dest(buildCssDir))
            .pipe(gulpPlugin.rev.manifest(cssResourceMap, {
                base: BUILD_DEST.build
            }))
            .pipe(gulp.dest(BUILD_DEST.build));
    }
}