/**
 * @author wangcheng
 * @data   2015-12-10
 * @desc   定义 Node全局挂载对象 rrd
 */

'use strict';

//const RRDPath = require("./path.js");
const rpath = require('../constants/path.js');
const config = require('../config');
const rrdUtils = require('./rrd-utils.js');

class RRD{

}

Object.defineProperty(global, 'rrd', {
    enumerable: true,
    writable: true,
    value: new RRD()
});

Object.defineProperty(rrd, 'path', {
    enumerable: true,
    writable: true,
    value: rpath
});

Object.defineProperty(rrd, 'config', {
    enumerable: true,
    writable: false,
    value: config
});

Object.defineProperty(rrd, 'utils', {
    enumerable: false,
    writable: false,
    value: rrdUtils
});

module.exports = global.rrd;
