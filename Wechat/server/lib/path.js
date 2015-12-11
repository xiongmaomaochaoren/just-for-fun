/**
 * @author wangcheng
 * @data   2015-12-10
 * @desc   定义 Node路径 rrd.path
 */


'use strict';

//废弃使用
let path = require("path");

class RRDPath{
    constructor(){
        const DS =  "/";
        const baseDir = path.dirname(__dirname);
        this.paths = new Map([
            [
                'base' : baseDir,
                'action' : baseDir + DS + 'actions',
                'config' : baseDir + DS + 'config',
                'lib' : baseDir + DS + 'lib',
                'model' : baseDir + DS + 'models',
                'router' : baseDir + DS + 'routers'
            ]
        ]);
    }
    get(key){
        return this.paths.get(key);
    }
}

Object.defineProperty(rrd, 'path', {
    enumerable: true,
    writable: true,
    value: new RRDPath()
});

module.exports = rrd.path;
