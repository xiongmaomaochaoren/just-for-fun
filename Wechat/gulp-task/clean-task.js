/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let BUILD_DEST = require('./path-const.js');

module.exports = function(gulp, gulpPlugin){
    return function (){
        let buildGlob = BUILD_DEST.build + '/*';
        let prebuildGlob = BUILD_DEST.prebuild + '/*';

        return gulp.src([buildGlob, prebuildGlob], {read: false})
            .pipe(gulpPlugin.rimraf({force : true}));
    }
}