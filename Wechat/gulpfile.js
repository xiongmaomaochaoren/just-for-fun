/**
 * gulp配置文件
 * Created by wangcheng on 15/12/10.
 */

/**
 * Todo : 多文件多入口支持
 * Todo : 图片的产出测试
 */

/**
 * Todo : 内部task私有化
 * Todo : 依赖关系简化
 * Todo : help 补充添加
 * Todo : product 和 dev 两种模式支持
 * Todo : 调试流程
 * Todo : 静态资源Url变换
 * Todo : 重构拆分gulpfile.js 和 webpack.config.js \ 路径抽取出来做成变量
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


//use webpack to manage all the resources in src/
gulp.task('webpack', function(){
    return gulp.src('./client/page/redux-todo/redux-todo.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest('./prebuild/'));
});

gulp.task('html', ['webpack'], function(){
    return gulp.src('./client/page/redux-todo/redux-todo.html')
        .pipe(gulp.dest('./prebuild/views/redux-todo'));
});

//TODO : 图片的自动md5工作
gulp.task('img', ['webpack'], function(){
    return gulp.src('./prebuild/*.*')
        .pipe(plugins.imagemin({
            progressive: true,
            use: [pngquant({quality: '70-80'})]
        }))
        //.pipe(plugins.rev())
        .pipe(gulp.dest('build'))
        //.pipe(plugins.rev.manifest('build/rev-manifest.json', {
        //    base: process.cwd() + '/build',
        //    merge: true
        //}))
        .pipe(gulp.dest('build'));
});


//process all the js file in prebuild/ (using minify/uglify)
gulp.task('js', ['webpack'],  function() {
    console.log("gulp js task");
    return gulp.src('./prebuild/public/js/*.js')
        //.pipe(plugins.jshint())
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(gulp.dest('build/public/js'))
        .pipe(plugins.rev.manifest('build/resource-map/js.json', {
            base: process.cwd() + '/build'
        }))
        .pipe(gulp.dest('./build'));
});

//process all the css file in prebuild/
gulp.task('css', ['webpack', 'img'], function() {
    console.log("gulp css task");
    //var mapFile = gulp.src("./build/rev-manifest.json");
    return gulp.src('./prebuild/public/css/*.css')
        .pipe(plugins.minifyCss())
        //.pipe(plugins.revReplace({manifest: mapFile}))
        .pipe(plugins.rev())
        .pipe(gulp.dest('build/public/css'))
        .pipe(plugins.rev.manifest('build/resource-map/css.json', {
            base: process.cwd() + '/build',
            merge: true
        }))
        .pipe(gulp.dest('./build'));
});


gulp.task('merge-resource-map', ['html', 'css', 'js', 'img'] , function(){
    return gulp.src('./build/resource-map/*.json')
        .pipe(plugins.extend('all.json'))
        .pipe(gulp.dest('./build/resource-map'));
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


/**
 * gulp task 保证顺序执行的要求 :
 *   task和它所依赖的task的关系 : Make sure your dependency tasks are correctly using the async run hints: take in a callback or return a promise or event stream.
 *   依赖的task之间的关系 : The tasks will run in parallel (all at once), so don't assume that the tasks will start/finish in order
 * */
gulp.task('replace', ['webpack', 'html', 'css', 'js', 'img', 'merge-resource-map'], function(){
    var mapFile = gulp.src("./build/resource-map/all.json");

    return gulp.src('./prebuild/views/redux-todo/redux-todo.html')
        .pipe(plugins.revReplace({manifest: mapFile}))
        .pipe(gulp.dest('build/views/redux-todo'));
});

gulp.task('clean', function(){
    console.log('gulp clean task');
    return gulp.src(['build/*', 'prebuild/*'], {read: false})
        .pipe(plugins.rimraf({force : true}));
});

gulp.task('build', ['clean', 'webpack', 'html', 'img', 'js', 'css', 'merge-resource-map', 'replace']);

gulp.task('deploy', ['build'],  function(){
    var copyFiles = [
        './build/**/*.*',
        '!./build/resource-map/**/*.*'
    ];

    gulp.src(copyFiles)
        .pipe(gulp.dest('server/'));
});

gulp.task('help', function(){
    console.log('---------------------------------------------------------------');
    console.log('gulp [command]  --- with gulp installed globally');
    console.log('Command List:');
    console.log('  webpack  #use webpack to pack all files src/ ---> prebuild/');
    console.log('  js       #build all js files /prebuild ---> build/ ');
    console.log('  css      #build all css files /prebuild ---> build/');
    console.log('  img       #build all picture files /prebuild ---> build/ ');
    console.log('  build    #do all the works');
    console.log('  clean    #clear directories such as prebuild/ & build/');
    console.log('---------------------------------------------------------------');
});
