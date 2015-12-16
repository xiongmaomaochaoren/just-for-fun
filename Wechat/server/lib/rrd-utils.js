/**
 * 工具函数
 * Created by jess on 15/12/16.
 */


'use strict';

let isProduction = process.env.NODE_ENV === 'production';

let utils = {

    isProduction : function(){
        return isProduction;
    },

    isDebug : function(){
        return ! isProduction;
    }
};


module.exports = utils;