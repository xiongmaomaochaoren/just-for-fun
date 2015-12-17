/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   Server入口类
 */

'use strict';

require("./lib/rrd.js");

var cluster = require('cluster');

let rrdPath = rrd.path;
let express = require("express");
let bodyParser = require('body-parser');
let logMiddleware = require('./plugins/rrd-log-middleware.js');
let wxRouter = require(rrdPath.ROUTER_DIR + "/wechat");

const app = express();
const urlPrefix = "/node";

let logConfig = rrd.config.logConfig;
let finalLogConf;
if( rrd.utils.isProduction() ){
    finalLogConf = logConfig.prod;
}else{
    finalLogConf = logConfig.dev;
}

//Todo : http参数配置
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use( logMiddleware.configLog(finalLogConf) );


app.use(urlPrefix + '/wx', wxRouter);

app.use(urlPrefix + '/error_handle', function triggerErrorMid(req, res, next){
    setTimeout( function throwError(){
        throw new Error('async 主动throw错误,看看能捕获到么');
    }, 100 );
});

app.use(function(err, req, res, next){
    res.weLog.fatal({err : err}, err.message);
    res.end('出错啦');
});



process.on('uncaughtException', function uncaughtException(err){
    logMiddleware.getLog().fatal( err );

    var timer = setTimeout(function(){
        process.exit(1);
    }, 30000);

    timer.unref();

    server.close();

    if( cluster.worker ){
        //console.info('server is worker');
        cluster.worker.disconnect();
    }
    //process.exit(1);
} );

var server = app.listen(3000);

