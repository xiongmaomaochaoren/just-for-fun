/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');


/**
 * js、css生成到一个map会导致resource-map错误,暂时只能分开生成,在这里合并为一个map
 */
module.exports = function(gulp, gulpPlugin){
    return function() {
        let mapGlob = BUILD_DEST.build_map + '/*.json';
        let finalResourceMap = 'all.json';
        return gulp.src(mapGlob)
            .pipe(gulpPlugin.extend(finalResourceMap))
            .pipe(gulp.dest(BUILD_DEST.build_map));
    }
}