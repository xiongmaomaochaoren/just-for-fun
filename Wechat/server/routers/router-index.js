/**
 * Created by jess on 15/12/17.
 */


'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

var actionClassMap = {};

//操作系统目录分隔符
const DIR_SEP = '/';

const rrd = global.rrd;
const errorFactory = rrd.errorFactory;

const ACTION_DIR = rrd.path.ACTION_DIR;

router.use('/', function(req, res, next){

    var path = req.path;

    if( path[0] === '/' ){
        path = path.substring(1);
    }

    //根据path,切分出对应的action和method
    let arr = path.split('/');
    if( arr.length < 2 ){
        //非法的路由请求
        let err = new Error('请求URL格式错误,path:' + req.originalUrl);
        err.showMessage = '请求URL格式错误';
        err = errorFactory.e200(err);
        return next( err );
    }

    let methodName = arr.pop();
    let actionName = arr.pop();

    //actionName = actionName.charAt(0).toUpperCase() + actionName.substring(1) + 'Action';

    //因为action存在多层级目录,所以要加上目录来区分不同的action
    if( arr.length > 0 ){
        actionName = arr.join( DIR_SEP ) + DIR_SEP + actionName;
    }

    if( ! actionClassMap.hasOwnProperty(actionName) ){

        res.weLog.info('第一次尝试加载action:' + actionName);
        //未加载,需要动态require对应文件
        let filePath = ACTION_DIR + DIR_SEP + actionName + '.js';
        try{
            //fs.accessSync 如果成功,啥都不反悔,娘希匹
            let isFileExist = fs.accessSync( filePath, fs.R_OK );
            let actionClass = require(filePath);
            actionClassMap[actionName] = actionClass;
        }catch(e){
            e.showMessage = '请求URL格式错误';
            e = errorFactory.e404(e);
            actionClassMap[actionName] = null;
            return next( e );
        }
    }

    let actionClass = actionClassMap[actionName];
    if( ! actionClass ){
        //TODO 还应该判断对应的类,是否符合Action类的要求
        let err = new Error('找不到对应的action:' + actionName);
        err = errorFactory.e404( err );
        err.showMessage = '请求URL格式错误';
        return next( err );
    }
    let obj = new actionClass();
    if( typeof obj[methodName] === 'function' ){
        return obj[methodName].call( obj, req, res, next );
    }else{
        let err = new Error('action[' + actionName + ']找不到对应的方法[' + methodName + ']');
        err = errorFactory.e404( err );
        err.showMessage = '请求URL格式错误';
        return next(err );
    }

});


module.exports = router;