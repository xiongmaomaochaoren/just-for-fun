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
let wxRouter = require(rrdPath.ROUTER_DIR + "/wechat");

const app = express();
const urlPrefix = "/node";

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
app.use(urlPrefix + '/wx', wxRouter);

app.listen(8080);
