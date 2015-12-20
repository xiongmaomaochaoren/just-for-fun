/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

const del = require('del');

const BUILD_DEST = require('./path-const.js');

/**
 * 相比rimraf官方推荐使用del,并且支持同步,
 * gulp 依赖的task可以并行执行, 为了避免clean和其他task出现冲突, clean task必须保持同步
 * del : https://github.com/sindresorhus/del
 * rimraf : https://github.com/isaacs/rimraf
 */

module.exports = function(gulp, gulpPlugin){
    return function (){
        let buildGlob = BUILD_DEST.build + '/*';
        let prebuildGlob = BUILD_DEST.prebuild + '/*';

        return del.sync([buildGlob, prebuildGlob]);
    }
}