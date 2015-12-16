/**
 * @author wangcheng
 * @data   2015-11-24
 * @desc   Server入口类
 */

'use strict';

require("./lib/rrd.js");

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

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use( logMiddleware.configLog(finalLogConf) );
app.use(urlPrefix + '/wx', wxRouter);

app.listen(3000);
