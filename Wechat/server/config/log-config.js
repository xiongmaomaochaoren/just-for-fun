/**
 * 日志的配置
 * Created by jess on 15/12/15.
 */

'use strict';

var path = require('path');
var fs = require('fs');

const LOG_BASE_PATH = path.dirname(__dirname) + path.sep + 'log' + path.sep;
const errorLogFile = LOG_BASE_PATH + 'error.log';

let pathArray = [ errorLogFile ];

//判断日志文件是否存在,不存在则创建
pathArray.forEach(function( path ){
    try{
        fs.accessSync( path, fs.R_OK | fs.W_OK );
    }catch(e){
        //console.log('create log file:' + path );
        let fd = fs.openSync( path, 'w');
        fs.closeSync(fd);
    }
});

const NAME = 'wenode';

let logConfig = {
    //开发环境的配置
    dev : {
        name : NAME,
        streams : [
            {
                level : 'trace',
                stream : process.stdout
            }
        ]
    },
    //线上配置
    prod : {
        name : NAME,
        streams : [
            {
                level : 'error',
                path : errorLogFile
            }
        ]
    }
};


module.exports = logConfig;