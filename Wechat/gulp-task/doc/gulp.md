
## 参考资料

* [start gulp kit](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js)

## gulp + webpack

* [webpack-stream 二进制文件处理bug](https://www.bountysource.com/issues/28799679-image-files-required-through-url-loader-file-loader-are-corrupt)

* [gulp编译系统拆分](http://macr.ae/article/splitting-gulpfile-multiple-files.html)

##

### Task的顺序

    gulp task 保证顺序执行的要求
    task和它所依赖的task的关系 : Make sure your dependency tasks are correctly using the async run hints: take in a callback or return a promise or event stream.
    依赖的task之间的关系 : The tasks will run in parallel (all at once), so don't assume that the tasks will start/finish in order
