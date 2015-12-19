/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

let path = require('path');

const BASE_DIR = path.dirname(__dirname);

const BUILD_DEST = {
    base : BASE_DIR,
    client : BASE_DIR + '/client',
    prebuild : BASE_DIR + '/prebuild',
    prebuild_view : BASE_DIR + '/prebuild/views',
    prebuild_public : BASE_DIR + '/prebuild/public',
    build : BASE_DIR + '/build',
    build_view : BASE_DIR + '/build/views',
    build_map : BASE_DIR + '/build/resource_map',
    build_public : BASE_DIR + '/build/public',
    server : BASE_DIR + '/server',
    gulp_task : BASE_DIR + '/gulp-task'
};

module.exports = BUILD_DEST;