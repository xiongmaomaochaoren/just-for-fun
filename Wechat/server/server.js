/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   Server入口类
 */

'use strict';

require('babel-register')({
    presets : ['es2015','react']
});

//服务端渲染时,require css less 图片等资源报错解决方法 http://stackoverflow.com/questions/27893448/rendering-react-components-with-styles-on-the-server/29358828#29358828
require.extensions['.css'] = require.extensions['.less'] = require.extensions['.png'] = require.extensions['.jpg'] = function(){
    //logMiddleware.getLog().info('.css required');
    return null;
};

require("./lib/rrd.js");

var cluster = require('cluster');

let rrdPath = rrd.path;
let express = require("express");
let swig = require('swig');
let bodyParser = require('body-parser');
let logMiddleware = require('./plugins/rrd-log-middleware.js');
var routerV1 = require('./routers/router-index.js');
var errorHandle = require('./plugins/rrd-error-middleware.js');


//swig configuration
swig.setDefaults({
    //禁止自动转义模板变量
    autoescape : false
});

//是否是线上环境
const IS_PRODUCTION = rrd.utils.isProduction();


const app = express();
const urlPrefix = "/node";

let logConfig = rrd.config.logConfig;
let finalLogConf;

//设置模板引擎为 swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

//Todo : http参数配置

console.log('is production:' + IS_PRODUCTION);

if( IS_PRODUCTION ){
    finalLogConf = logConfig.prod;

    app.use(urlPrefix + '/static', express.static(__dirname + '/public'));
    app.use(urlPrefix , express.static(__dirname + '/views'));
    app.set('views', rrdPath.VIEW_DIR);

}else{
    //debug 环境

    finalLogConf = logConfig.dev;
    app.set('view cache', false );
    swig.setDefaults({
        cache : false
    });

    app.use(urlPrefix + '/static', express.static(__dirname + '/../prebuild/public'));
    app.use(urlPrefix , express.static(__dirname + '/../prebuild/views'));
    app.set('views', rrdPath.DEV_VIEW_DIR);

}


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use( logMiddleware.configLog(finalLogConf) );

if( ! IS_PRODUCTION ){
    //测试环境,允许跨域
    app.use(function(req, res, next){
        res.set({
            'Access-Control-Allow-Origin' : '*'
        });
        next();
    });
}

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

