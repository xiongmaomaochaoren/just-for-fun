/**
 * 日志的配置
 * Created by jess on 15/12/15.
 */

'use strict';

var path = require('path');

const LOG_BASE_PATH = '../log/';
const errorLogFile = LOG_BASE_PATH + 'error.log';

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