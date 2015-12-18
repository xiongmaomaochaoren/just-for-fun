/**
 * 错误判断/处理的工厂
 * Created by jess on 15/12/18.
 */


'use strict';

//错误类型的枚举
const ERROR_TYPES = {
    E200 : '200',
    E404 : '404',
    E500 : '500'
};


const errorTypeKey = 'weErrorType';
const httpStatusKey = 'httpStatus';

var singleton = {

    e200 : function(error){
        error[errorTypeKey] = ERROR_TYPES.E404;
        error[httpStatusKey] = 200;
        return error;
    },

    is200 : function(error){
        return error[errorTypeKey] === ERROR_TYPES.E200;
    },

    e404 : function( error ){
        error[errorTypeKey] = ERROR_TYPES.E404;
        error[httpStatusKey] = 404;
        return error;
    },

    is404 : function( error ){
        return error[errorTypeKey] === ERROR_TYPES.E404;
    },

    e500 : function( error ){
        error[errorTypeKey] = ERROR_TYPES.E500;
        error[httpStatusKey] = 500;
        return error;
    },

    is500 : function( error ){
        return error[errorTypeKey] === ERROR_TYPES.E500;
    }


};

Object.defineProperty( singleton, 'ERROR_TYPES', {
    enumerable: true,
    writable: false,
    value: ERROR_TYPES
} );


module.exports = singleton;


