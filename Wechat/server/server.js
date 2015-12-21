/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   Server入口类
 */

'use strict';

require('babel-core/register');

require("./lib/rrd.js");

var cluster = require('cluster');

let rrdPath = rrd.path;
let express = require("express");
let swig = require('swig');
let bodyParser = require('body-parser');
let logMiddleware = require('./plugins/rrd-log-middleware.js');
var routerV1 = require('./routers/router-index.js');
var errorHandle = require('./plugins/rrd-error-middleware.js');


const app = express();
const urlPrefix = "/node";

let logConfig = rrd.config.logConfig;
let finalLogConf;
if( rrd.utils.isProduction() ){
    finalLogConf = logConfig.prod;
}else{
    finalLogConf = logConfig.dev;
    app.set('view cache', false );
    swig.setDefaults({
        cache : false
    });
}

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', rrdPath.VIEW_DIR);

//Todo : http参数配置

app.use(urlPrefix + '/static', express.static(__dirname + '/public'));
app.use(urlPrefix , express.static(__dirname + '/views'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use( logMiddleware.configLog(finalLogConf) );

app.use( urlPrefix, routerV1);

app.use( errorHandle() );

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

