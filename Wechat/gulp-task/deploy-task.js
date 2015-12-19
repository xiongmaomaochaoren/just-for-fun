/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');


/**
 * 将编译后代码部署到Node.js Server中
 * */
module.exports = function(gulp, gulpPlugin){
    return function() {
        var copyFilesGlob = [
            BUILD_DEST.build + '/**/*.*',
            '!' + BUILD_DEST.build_map + '/**/*.*'
        ];
        gulp.src(copyFilesGlob)
            .pipe(gulp.dest(BUILD_DEST.server));
    }
}