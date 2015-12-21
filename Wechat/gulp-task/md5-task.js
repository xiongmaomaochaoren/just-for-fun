/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');


/**
 * 替换js和css中的md5
 * */
//Todo : 删除merge-map-task 迁移到md5 task中实现
module.exports = function(gulp, gulpPlugin){
    return function() {
        let mapFile = gulp.src(BUILD_DEST.build_map + "/assets.json");
        let pageGlob = BUILD_DEST.prebuild_view + '/**/*.html';
        return gulp.src(pageGlob)
            .pipe(gulpPlugin.revReplace({manifest: mapFile}))
            .pipe(gulp.dest(BUILD_DEST.build_view));
    }
}