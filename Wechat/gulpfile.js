/**
 * gulp配置文件
 * Created by wangcheng on 15/12/10.
 * gulp 提供四个Api : src、dest、task、watch
 */
'use strict';

/**
 * Todo : resource map功能添加
 * Todo : 增加缓存
 */

const gulp = require('gulp'),
      gulpPlugin = require('gulp-load-plugins')();

let BUILD_DEST = require('./gulp-task/path-const.js');

/**
 * 获取gulp task任务
 * @param taskName
 * @returns {*}
 */
function getTask(taskName){
    let taskFile = BUILD_DEST.gulp_task + '/' + taskName + '-task';
    return require(taskFile)(gulp, gulpPlugin);
}

gulp.task('clean', getTask('clean'));

gulp.task('webpack', getTask('webpack'));

gulp.task('image', ['webpack'], getTask('image'));

gulp.task('js', ['webpack'], getTask('js'));

gulp.task('css', ['webpack'], getTask('css'));

gulp.task('_merge-map', ['css', 'js'] , getTask('_merge-map'));

gulp.task('md5', ['_merge-map'], getTask('md5'));

gulp.task('build', ['webpack', 'image', 'js', 'css', 'md5']);

//前端代码编译发布task, 提测、上线使用
gulp.task('deploy', ['clean', 'build'],  getTask('deploy'));
//前端代码快速发布task, 本地调试使用
gulp.task('deploy:dev', ['build'], getTask('deploy'));

gulp.task('server:dev', ['webpack:dev'], getTask('server'));

gulp.task('watch:pro', function(){
    let clientGlob = BUILD_DEST.client + '/**/**';
    gulp.watch(clientGlob, ['deploy:dev']);
});


gulp.task('help', getTask('help'));

