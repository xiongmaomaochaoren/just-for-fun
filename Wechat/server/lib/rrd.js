/**
 * @author wangcheng
 * @data   2015-12-10
 * @desc   定义 Node全局挂载对象 rrd
 */

'use strict';

const rpath = require('../constants/path.js');
const config = require('../config');
const rrdUtils = require('./rrd-utils.js');
const errorFactory = require('./error-factory.js');

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

//配置文件
Object.defineProperty(rrd, 'config', {
    enumerable: true,
    writable: false,
    value: config
});

//工具函数
Object.defineProperty(rrd, 'utils', {
    enumerable: false,
    writable: false,
    value: rrdUtils
});

//错误工厂
Object.defineProperty(rrd, 'errorFactory', {
   enumerable : true,
    writable : false,
    value : errorFactory
});

module.exports = global.rrd;
