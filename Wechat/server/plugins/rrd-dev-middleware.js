/**
 * 开发中,用的middleware
 * Created by jess on 15/12/23.
 */


'use strict';

function devMiddleware(){

    return function( req, res, next){

        res.set({
            'Access-Control-Allow-Origin' : '*'
        });
        next();

    };

}

module.exports = devMiddleware;