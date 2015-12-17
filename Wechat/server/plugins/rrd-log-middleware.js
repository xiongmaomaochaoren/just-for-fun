/**
 * 封装日志功能
 * Created by jess on 15/12/15.
 */

'use strict';

let bunyan = require('bunyan');

let log = null;
let weLog = null;

class WeLog{

    constructor(){

    }

    fatal(){
        log.fatal.apply(log, arguments);
        return this;
    }

    error(){
        log.error.apply( log, arguments );
        return this;
    }

    warn(){
        log.warn.apply( log, arguments );
        return this;
    }

    info(){
        log.info.apply( log, arguments );
        return this;
    }

    debug(){
        log.debug.apply( log, arguments );
        return this;
    }

    trace(){
        log.trace.apply( log, arguments );
        return this;
    }

}



let singleton = {
    
    configLog : function configLog( conf ){
        
        log = bunyan.createLogger( conf );

        weLog = new WeLog();


        return function logMiddleware(req, res, next ){

            let weLog = new WeLog();

            res.weLog = weLog;

            next();
        };

    },

    getLog : function(){
        return weLog;
    }
};


module.exports = singleton;