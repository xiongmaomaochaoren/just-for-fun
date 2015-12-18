/**
 * gulp配置文件
 * Created by wangcheng on 15/12/10.
 */
'use strict';

/**
 * Todo : product 和 dev 两种模式支持
 * Todo : 调试流程
 * Todo : 静态资源Url变换
 * Todo : 重构拆分gulpfile.js 和 webpack.config.js
 * Todo : resource map功能添加
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    //browserSync = require ('browser-sync'),
    pngquant = require('imagemin-pngquant'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config');
//webpackDevMiddleware = require('webpack-dev-middleware'),
//webpackHotMiddleware = require('webpack-hot-middleware');

const BUILD_DEST = {
    client : './client',
    prebuild : './prebuild',
    prebuild_view : './prebuild/views',
    prebuild_public : './prebuild/public',
    build : './build',
    build_view : './build/views',
    build_map : './build/resource_map',
    build_public : './build/public',
    server : './server'
};

gulp.task('clean', function(){
    let buildGlob = BUILD_DEST.build + '/*';
    let prebuildGlob = BUILD_DEST.prebuild + '/*';
    return gulp.src([buildGlob, prebuildGlob], {read: false})
        .pipe(plugins.rimraf({force : true}));
});

/**
 * webpack 只能处理js、css,无法处理html, 需要gulp copy编译html
 * */
gulp.task('_html-copy', ['clean'], function(){
    let pageGlob = BUILD_DEST.client  + '/page/**/*.html';
    return gulp.src(pageGlob)
        .pipe(gulp.dest(BUILD_DEST.prebuild_view));
});


gulp.task('webpack', ['_html-copy'], function(){
    return gulp.src('./client/page/redux-todo/redux-todo.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest(BUILD_DEST.prebuild_public));
});



gulp.task('_img', ['webpack'], function(){
    //Todo : 只匹配图片
    let imgGlob = BUILD_DEST.prebuild_public + '/img/**/**';
    let buildImgDir = BUILD_DEST.build_public + '/img';
    return gulp.src(imgGlob)
        .pipe(plugins.imagemin({
            progressive: true,
            use: [pngquant({quality: '70-80'})]
        }))
        .pipe(gulp.dest(buildImgDir));
});


gulp.task('_js', ['webpack'],  function() {
    let jsGlob = BUILD_DEST.prebuild_public + '/js/**/*.js';
    let buildJsDir = BUILD_DEST.build_public + '/js';
    let jsResourceMap = BUILD_DEST.build_map + '/js.json';
    return gulp.src(jsGlob)
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest(buildJsDir))
        .pipe(plugins.rev.manifest(jsResourceMap, {
            base: BUILD_DEST.build
        }))
        .pipe(gulp.dest(BUILD_DEST.build));
});


gulp.task('_css', ['webpack', '_img'], function() {
    let cssGlob = BUILD_DEST.prebuild_public + '/css/**/*.css';
    let buildCssDir = BUILD_DEST.build_public + '/css';
    let cssResourceMap = BUILD_DEST.build_map + '/css.json';
    return gulp.src(cssGlob)
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev())
        .pipe(gulp.dest(buildCssDir))
        .pipe(plugins.rev.manifest(cssResourceMap, {
            base: BUILD_DEST.build
        }))
        .pipe(gulp.dest(BUILD_DEST.build));
});

/**
 * js、css生成到一个map会导致resource-map错误,暂时只能分开生成,在这里合并为一个map
 */
gulp.task('_merge-resource-map', ['_css', '_js', '_img'] , function(){
    let mapGlob = BUILD_DEST.build_map + '/*.json';
    let finalResourceMap = 'all.json';
    return gulp.src(mapGlob)
        .pipe(plugins.extend(finalResourceMap))
        .pipe(gulp.dest(BUILD_DEST.build_map));
});

/**
 * gulp task 保证顺序执行的要求 :
 *   task和它所依赖的task的关系 : Make sure your dependency tasks are correctly using the async run hints: take in a callback or return a promise or event stream.
 *   依赖的task之间的关系 : The tasks will run in parallel (all at once), so don't assume that the tasks will start/finish in order
 * */
gulp.task('_replace-md5', ['webpack', '_css', '_js', '_img', '_merge-resource-map'], function(){
    let mapFile = gulp.src(BUILD_DEST.build_map + "/all.json");
    let pageGlob = BUILD_DEST.prebuild_view + '/**/*.html';
    return gulp.src(pageGlob)
        .pipe(plugins.revReplace({manifest: mapFile}))
        .pipe(gulp.dest(BUILD_DEST.build_view));
});



gulp.task('build', ['webpack', '_img', '_js', '_css', '_merge-resource-map', '_replace-md5']);

gulp.task('deploy', ['build'],  function(){
    var copyFiles = [
        BUILD_DEST.build + '/**/*.*',
        '!' + BUILD_DEST.build_map + '/**/*.*'
    ];
    gulp.src(copyFiles)
        .pipe(gulp.dest(BUILD_DEST.server));
});



//gulp.task('server', function(){
//    browserSync({
//        server: {
//            baseDir: './prebuild'
//        },
//        files: [
//            'prebuild/*.html',
//            'prebuild/css/*.css',
//            'prebuild/js/*.js'
//        ]
//    });
//});

//gulp.task('watch', function(){
//    gulp.watch('src/**/*.*', ['webpack']);
//});

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

gulp.task('help', function(){
    console.log('---------------------------------------------------------------');
    console.log('gulp [command]  --- with gulp installed globally');
    console.log('Command List:');
    console.log('  webpack  #use webpack to pack all files src/ ---> prebuild/');
    //console.log('  js       #build all js files /prebuild ---> build/ ');
    //console.log('  css      #build all css files /prebuild ---> build/');
    //console.log('  img      #build all picture files /prebuild ---> build/ ');
    console.log('  build    #do all the works');
    console.log('  clean    #clear directories such as prebuild/ & build/');
    console.log('  deploy   #build and deploy from build/ ---> server/ ')
    console.log('---------------------------------------------------------------');
});
