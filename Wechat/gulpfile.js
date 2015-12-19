/**
 * gulp配置文件
 * Created by wangcheng on 15/12/10.
 */
'use strict';

/**
 * Todo : product 和 dev 两种模式支持 , 通过GULP_ENV参数控制两种开发模式
 * Todo : 调试流程
 * Todo : 静态资源Url变换
 * Todo : resource map功能添加
 * Todo : 增加gulp缓存
 */

/**
 * gulp 提供四个Api : src、dest、task、watch
 */
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    gulpPlugin = gulpLoadPlugins();

//webpackDevMiddleware = require('webpack-dev-middleware'),
//webpackHotMiddleware = require('webpack-hot-middleware');

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

gulp.task('webpack', ['clean'], getTask('webpack'));

gulp.task('image', ['webpack'], getTask('image'));

gulp.task('js', ['webpack'], getTask('js'));

gulp.task('css', ['webpack'], getTask('css'));

gulp.task('_merge-map', ['css', 'js'] , getTask('_merge-map'));

gulp.task('md5', ['_merge-map'], getTask('md5'));

gulp.task('build', ['webpack', 'image', 'js', 'css', 'md5']);

gulp.task('deploy', ['build'],  getTask('deploy'));

/**
 * gulp watch基于 gaze开发, 兼容三大操作系统平台 https://github.com/shama/gaze
 */
gulp.task('watch', function(){
    let clientGlob = BUILD_DEST.client + '/**/**';
    gulp.watch(clientGlob, ['webpack']);
});

gulp.task('server', ['watch'], getTask('server'));

gulp.task('help', getTask('help'));

// gulp.task('hot', function() {
//   var bundler = webpack(webpackConfig);
//   browserSync({
//     proxy: {
//       target: 'localhost:3000',
//       middleware: [
//         webpackDevMiddleware(bundler, {
//           publicPath: webpackConfig.output.publicPath,
//           // stats: webpackConfig.stats,
//           hot: true,
//           historyApiFallback: true
//         }),
//         webpackHotMiddleware(bundler),
//       ]
//     },
//     files: [
//       'src/*.*',
//       'src/templates/*.*',
//       'src/components/**/*.*',
//       'src/css/**/*.*',
//       'src/js/**/*.*'
//     ]
//   });
// });
