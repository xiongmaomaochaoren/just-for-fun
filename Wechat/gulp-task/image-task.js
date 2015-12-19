/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');

let pngquant = require('imagemin-pngquant');

/**
 * 图片压缩
 * */
module.exports = function(gulp, gulpPlugin){
    return function() {
        //Todo : 只匹配图片
        let imgGlob = BUILD_DEST.prebuild_public + '/img/**/**';
        let buildImgDir = BUILD_DEST.build_public + '/img';
        return gulp.src(imgGlob)
            .pipe(gulpPlugin.imagemin({
                progressive: true,
                use: [pngquant({quality: '70-80'})]
            }))
            .pipe(gulp.dest(buildImgDir));
    }
}