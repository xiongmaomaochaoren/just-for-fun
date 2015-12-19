/**
 * Created by wangcheng on 15/12/20.
 */

'use strict';

module.exports = function(gulp, gulpPlugin){
    return function() {
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
    }
}