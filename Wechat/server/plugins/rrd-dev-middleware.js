/**
 * 开发中,用的middleware
 * Created by jess on 15/12/23.
 */


'use strict';

function devMiddleware(){

    return function( req, res, next){

        res.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,GET",
            "Access-Control-Allow-Credentials": "true"
        });
        next();

    };

}

module.exports = devMiddleware;